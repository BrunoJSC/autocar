"use client";

import React, {
  useEffect,
  useRef,
  useState,
  useMemo,
  useCallback,
} from "react";
import { MaxWrapper } from "@/components/max-wrapper";
import { ListCar } from "@/components/list-car";
import { fetchFilterCars } from "@/fetch/car-filter";
import { Skeleton } from "@/components/ui/skeleton";
import { useSearchParams } from "next/navigation";
import FilterCar from "@/components/filters/filter-car";
import { useDebounce } from "use-debounce";

type Filters = {
  brandCar: string;
  modelCar: string;
  location: string;
  fuel: string;
  exchange: string;
  minPrice?: number;
  maxPrice?: number;
  color: string;
  doors: number;
  announce: string;
};

const initialFilters: Filters = {
  brandCar: "",
  modelCar: "",
  location: "",
  fuel: "",
  exchange: "",
  minPrice: undefined,
  maxPrice: undefined,
  color: "",
  doors: 0,
  announce: "",
};

export default function Page() {
  const [filters, setFilters] = useState<Filters>(initialFilters);
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const previousFilters = useRef<Filters>(initialFilters);
  const cache = useRef<{ [key: string]: Car[] }>({});
  const [debouncedFilters] = useDebounce(filters, 500);

  const fetchData = useCallback(async (filters: Filters) => {
    const cacheKey = JSON.stringify(filters);

    if (cache.current[cacheKey]) {
      setCars(cache.current[cacheKey]);
      return;
    }

    setLoading(true);
    try {
      const data = await fetchFilterCars(filters);
      setCars(data);
      cache.current[cacheKey] = data; // Cacheia o resultado para esses filtros
    } catch (error) {
      console.error("Erro ao buscar carros:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleSearch = useCallback(() => {
    fetchData(debouncedFilters); // Usa os filtros com debounce para evitar requisições constantes
  }, [debouncedFilters, fetchData]);

  const handleClearFilters = useCallback(() => {
    const clearedFilters = { ...initialFilters };
    setFilters(clearedFilters);
    fetchData(clearedFilters);
  }, [fetchData]);

  useEffect(() => {
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");

    const updatedFilters: Filters = {
      ...initialFilters,
      minPrice: minPrice ? parseFloat(minPrice) : undefined,
      maxPrice: maxPrice ? parseFloat(maxPrice) : undefined,
    };

    setFilters(updatedFilters);
    fetchData(updatedFilters);
  }, [searchParams, fetchData]);

  useEffect(() => {
    const handleFocus = () => {
      if (
        JSON.stringify(debouncedFilters) !==
        JSON.stringify(previousFilters.current)
      ) {
        console.log("Filtros mudaram. Atualizando dados...");
        fetchData(debouncedFilters);
        previousFilters.current = debouncedFilters; // Atualiza a referência dos filtros antigos
      }
    };

    window.addEventListener("focus", handleFocus);
    return () => window.removeEventListener("focus", handleFocus);
  }, [debouncedFilters, fetchData]);

  return (
    <MaxWrapper>
      <section className="flex flex-col md:flex-row gap-4 mt-5 p-4 min-h-screen">
        <div>
          <FilterCar
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
          ) : cars.length === 0 ? (
            <div className="flex justify-center items-center h-full">
              <p className="text-gray-500">Nenhum carro encontrado.</p>
            </div>
          ) : (
            <ListCar cars={cars as Car[]} />
          )}
        </div>
      </section>
    </MaxWrapper>
  );
}
