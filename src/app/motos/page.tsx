"use client";

import React, { useEffect, useState, useCallback } from "react";
import { MaxWrapper } from "@/components/max-wrapper";
import { ListMotorbike } from "@/components/list-bikes";
import { fetchFilterMotorbikes } from "@/fetch/motorbike-filter";
import { Skeleton } from "@/components/ui/skeleton";
import { useSearchParams } from "next/navigation";
import FilterMotorbike from "@/components/filters/filter-motorbike";
import { useDebounce } from "use-debounce";

type Filters = {
  motorbikeBrand: string;
  motorbikeModel: string;
  location: string;
  fuel: string;
  cylinders: number;
  minPrice?: number;
  maxPrice?: number;
  color: string;
  announce: string;
};

const initialFilters: Filters = {
  motorbikeBrand: "",
  motorbikeModel: "",
  location: "",
  fuel: "",
  cylinders: 0,
  minPrice: undefined,
  maxPrice: undefined,
  color: "",
  announce: "",
};

export default function Page() {
  const [filters, setFilters] = useState<Filters>(initialFilters);
  const [motorbikes, setMotorbikes] = useState<Motorbike[]>([]);
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const [debouncedFilters] = useDebounce(filters, 500);

  const fetchData = useCallback(async (filters: Filters) => {
    setLoading(true);
    try {
      const data = await fetchFilterMotorbikes(filters);
      setMotorbikes(data && data.length > 0 ? data : []);
    } catch (error) {
      console.error("Erro ao buscar motos:", error);
      setMotorbikes([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleSearch = useCallback(() => {
    fetchData(debouncedFilters); // Use debounced filters to avoid frequent requests
  }, [debouncedFilters, fetchData]);

  const handleClearFilters = useCallback(() => {
    setFilters(initialFilters);
    fetchData(initialFilters);
  }, [fetchData]);

  // Update filters from URL search parameters
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

  // Refetch data when the window gains focus
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
        <div className="sticky top-0 z-10 overflow-x-auto md:h-[calc(100vh-6rem)]">
          <FilterMotorbike
            filters={filters}
            setFilters={setFilters as any}
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
