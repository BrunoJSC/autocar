"use client";

import React, {
  useEffect,
  useState,
  useRef,
  useMemo,
  useCallback,
} from "react";
import { MaxWrapper } from "@/components/max-wrapper";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchFilterMotorbikes } from "@/fetch/motorbike-filter";
import FilterBike from "@/components/filters/filter-motorbike";
import { ListMotorbike } from "@/components/list-bikes";
import { useDebounce } from "use-debounce";

type Filters = {
  motorbikeBrand: string;
  motorbikeModel: string;
  location: string;
  fuel: string;
  color: string;
  minPrice?: number;
  maxPrice?: number;
  km?: number;
  cylinders?: number;
  announce?: string;
  accessories?: string[];
  startYear?: number;
  endYear?: number;
};

const initialFilters: Filters = {
  motorbikeBrand: "",
  motorbikeModel: "",
  location: "",
  fuel: "",
  minPrice: undefined,
  maxPrice: undefined,
  color: "",
  km: undefined,
  announce: "",
  cylinders: 0,
};

export default function Page() {
  const [filters, setFilters] = useState<Filters>(initialFilters);
  const [motorbikes, setMotorbikes] = useState<Motorbike[]>([]);
  const [loading, setLoading] = useState(false);
  const previousFilters = useRef<Filters>(initialFilters);
  const cache = useRef<{ [key: string]: Motorbike[] }>({});
  const [debouncedFilters] = useDebounce(filters, 500);
  // useMemo para calcular o cacheKey com base nos filtros atuais
  const cacheKey = useMemo(
    () => JSON.stringify(debouncedFilters),
    [debouncedFilters]
  );

  const fetchData = useCallback(
    async (filters: Filters) => {
      if (cache.current[cacheKey]) {
        setMotorbikes(cache.current[cacheKey]);
        return;
      }

      setLoading(true);
      try {
        const data = await fetchFilterMotorbikes(filters);
        setMotorbikes(data);
        cache.current[cacheKey] = data; // Cacheia os resultados
      } catch (error) {
        console.error("Erro ao buscar motos:", error);
      } finally {
        setLoading(false);
      }
    },
    [cacheKey]
  );

  const updateUrlWithFilters = useCallback((updatedFilters: Filters) => {
    const params = new URLSearchParams();
    Object.entries(updatedFilters).forEach(([key, value]) => {
      if (value !== undefined && value !== "") {
        params.set(key, value.toString());
      }
    });
    window.history.replaceState(null, "", `?${params.toString()}`);
  }, []);

  const handleSearch = useCallback(() => {
    updateUrlWithFilters(debouncedFilters);
    fetchData(debouncedFilters);
  }, [debouncedFilters, fetchData, updateUrlWithFilters]);

  const handleClearFilters = useCallback(() => {
    const clearedFilters = { ...initialFilters };
    setFilters(clearedFilters);
    updateUrlWithFilters(clearedFilters);
    fetchData(clearedFilters);
  }, [fetchData, updateUrlWithFilters]);

  useEffect(() => {
    const handleFocus = () => {
      if (
        JSON.stringify(debouncedFilters) !==
        JSON.stringify(previousFilters.current)
      ) {
        console.log("Filtros mudaram. Atualizando dados...");
        fetchData(debouncedFilters);
        previousFilters.current = debouncedFilters;
      }
    };

    window.addEventListener("focus", handleFocus);
    return () => window.removeEventListener("focus", handleFocus);
  }, [debouncedFilters, fetchData]);

  return (
    <MaxWrapper>
      <section className="flex flex-col md:flex-row gap-4 mt-5 p-4 min-h-screen">
        <div>
          <FilterBike
            filters={filters}
            setFilters={setFilters}
            onSearch={handleSearch}
            clearSearch={handleClearFilters}
          />
        </div>
        <div className="flex-1">
          {loading ? (
            <div className="flex flex-col justify-center items-center h-full">
              <Skeleton className="w-32 h-12" />
              <Skeleton className="w-16 h-16" />
            </div>
          ) : motorbikes.length === 0 ? (
            <div className="flex justify-center items-center h-full">
              <p className="text-gray-500">Nenhuma moto encontrada.</p>
            </div>
          ) : (
            <ListMotorbike motorbikes={motorbikes as Motorbike[]} />
          )}
        </div>
      </section>
    </MaxWrapper>
  );
}
