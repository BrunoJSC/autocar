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
  startYear?: number;
  endYear?: number;
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
  startYear: undefined,
  endYear: undefined,
};

export default function Page() {
  const [filters, setFilters] = useState<Filters>(initialFilters);
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const [debouncedFilters] = useDebounce(filters, 500);
  const CACHE_EXPIRATION_TIME = 600000;

  const saveToCache = (key: string, data: Car[]) => {
    const cacheData = {
      timestamp: new Date().getTime(),
      data,
    };
    localStorage.setItem(key, JSON.stringify(cacheData));
  };

  const getFromCache = (key: string): Car[] | null => {
    const cacheData = localStorage.getItem(key);
    if (!cacheData) return null;

    const parsedCache = JSON.parse(cacheData);
    const currentTime = new Date().getTime();

    if (currentTime - parsedCache.timestamp > CACHE_EXPIRATION_TIME) {
      localStorage.removeItem(key);
      return null;
    }

    return parsedCache.data;
  };

  const fetchData = useCallback(async (filters: Filters) => {
    const cacheKey = JSON.stringify(filters);
    const cachedCars = getFromCache(cacheKey);

    if (cachedCars) {
      setCars(cachedCars);
      return;
    }

    setLoading(true);
    try {
      const data = await fetchFilterCars(filters);
      if (data && data.length > 0) {
        setCars(data);
        saveToCache(cacheKey, data);
      } else {
        setCars([]);
      }
    } catch (error) {
      console.error("Erro ao buscar carros:", error);
      setCars([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleSearch = useCallback(() => {
    fetchData(debouncedFilters); // Usa os filtros com debounce para evitar requisições constantes
  }, [debouncedFilters, fetchData]);

  const handleClearFilters = useCallback(() => {
    // Resetando todos os filtros, incluindo 'startYear' e 'endYear'
    setFilters(initialFilters);
    fetchData(initialFilters);
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
      fetchData(debouncedFilters);
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
