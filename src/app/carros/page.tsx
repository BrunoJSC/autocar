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
  mechanic: "",
  kmStart: undefined,
  kmEnd: undefined,
};

export default function Page() {
  const [filters, setFilters] = useState<FiltersCar>(initialFilters);
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const [debouncedFilters] = useDebounce(filters, 500);

  // Fetch data based on filters directly from API
  const fetchData = useCallback(async (filters: FiltersCar) => {
    setLoading(true);
    try {
      const data = await fetchFilterCars(filters);
      if (data && data.length > 0) {
        setCars(data);
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
    fetchData(debouncedFilters);
  }, [debouncedFilters, fetchData]);

  const handleClearFilters = useCallback(() => {
    setFilters(initialFilters);
    fetchData(initialFilters); // Fetch data with initial filters after clearing
    console.log("Clear filters");
  }, [fetchData]);

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
        <div className="sticky top-0 z-10 overflow-x-auto h-[calc(100vh-6rem)]">
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
            <ListCar cars={cars} />
          )}
        </div>
      </section>
    </MaxWrapper>
  );
}
