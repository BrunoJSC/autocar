"use client";

import React, { useEffect, useState, useCallback } from "react";
import { MaxWrapper } from "@/components/max-wrapper";
import { ListCar } from "@/components/list-car";
import { fetchFilterCars } from "@/fetch/car-filter";
import { Skeleton } from "@/components/ui/skeleton";
import { useSearchParams } from "next/navigation";
import FilterCar from "@/components/filters/filter-car";
import { useDebounce } from "use-debounce";

const initialFilters: FiltersCar = {
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
  km: 0,
  bodyType: "",
  accessories: [],
  motors: 0,
};

export default function Page() {
  const [filters, setFilters] = useState<FiltersCar>(initialFilters);
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const [debouncedFilters] = useDebounce(filters, 500);
  const CACHE_EXPIRATION_TIME = 600000; // Cache expiration time

  // Save fetched data in localStorage cache
  const saveToCache = (key: string, data: Car[]) => {
    const cacheData = {
      timestamp: new Date().getTime(),
      data,
    };
    localStorage.setItem(key, JSON.stringify(cacheData));
  };

  // Retrieve data from localStorage cache
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

  // Fetch data based on filters (either cached or from API)
  const fetchData = useCallback(
    async (filters: FiltersCar, bypassCache: boolean = false) => {
      const cacheKey = JSON.stringify(filters);
      const cachedCars = bypassCache ? null : getFromCache(cacheKey);

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
    },
    []
  );

  // Search with the debounced filters
  const handleSearch = useCallback(() => {
    fetchData(debouncedFilters);
  }, [debouncedFilters, fetchData]);

  // Clear filters and return to original car state
  const handleClearFilters = useCallback(() => {
    setFilters(initialFilters);
    fetchData(initialFilters, true); // Bypass cache when clearing filters
    console.log("Clear filters");
  }, [fetchData]);

  // Initialize filters from URL search params on mount
  useEffect(() => {
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");

    const updatedFilters: FiltersCar = {
      ...initialFilters,
      minPrice: minPrice ? parseFloat(minPrice) : undefined,
      maxPrice: maxPrice ? parseFloat(maxPrice) : undefined,
    };

    setFilters(updatedFilters);
    fetchData(updatedFilters); // Fetch cars based on URL params
  }, [searchParams, fetchData]);

  // Re-fetch data when the window regains focus (e.g., when returning to the tab)
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
            clearSearch={handleClearFilters} // Clear filters handler
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
            <ListCar cars={cars} />
          )}
        </div>
      </section>
    </MaxWrapper>
  );
}
