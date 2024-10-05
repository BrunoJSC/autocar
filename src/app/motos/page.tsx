"use client";

import React, { useEffect, useState } from "react";
import { MaxWrapper } from "@/components/max-wrapper";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchFilterMotorbikes } from "@/fetch/motorbike-filter";
import FilterBike from "@/components/filters/filter-motorbike";
import { ListMotorbike } from "@/components/list-bikes";
import { useSearchParams, useRouter } from "next/navigation";

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
  const searchParams = useSearchParams();
  const router = useRouter();

  const fetchData = async (filters: Filters) => {
    setLoading(true);
    try {
      const data = await fetchFilterMotorbikes(filters);
      setMotorbikes(data);
    } catch (error) {
      console.error("Erro ao buscar motos:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateUrlWithFilters = (updatedFilters: Filters) => {
    const params = new URLSearchParams();
    Object.entries(updatedFilters).forEach(([key, value]) => {
      if (value !== undefined && value !== "") {
        params.set(key, value.toString());
      }
    });
    router.push(`?${params.toString()}`);
  };

  const handleSearch = () => {
    updateUrlWithFilters(filters);
    fetchData(filters);
  };

  const handleClearFilters = () => {
    setFilters(initialFilters);
    updateUrlWithFilters(initialFilters);
    fetchData(initialFilters);
  };

  useEffect(() => {
    const filtersFromUrl: Filters = {
      ...initialFilters,
      motorbikeBrand: searchParams.get("motorbikeBrand") || "",
      motorbikeModel: searchParams.get("motorbikeModel") || "",
      location: searchParams.get("location") || "",
      fuel: searchParams.get("fuel") || "",
      color: searchParams.get("color") || "",
      minPrice: searchParams.get("minPrice")
        ? parseFloat(searchParams.get("minPrice")!)
        : undefined,
      maxPrice: searchParams.get("maxPrice")
        ? parseFloat(searchParams.get("maxPrice")!)
        : undefined,
      km: searchParams.get("km")
        ? parseFloat(searchParams.get("km")!)
        : undefined,
      cylinders: searchParams.get("cylinders")
        ? parseInt(searchParams.get("cylinders")!)
        : 0,
      announce: searchParams.get("announce") || "",
    };

    setFilters(filtersFromUrl);
    fetchData(filtersFromUrl);
  }, [searchParams]);

  useEffect(() => {
    const handleFocus = () => {
      console.log("Aplicação em foco novamente. Atualizando dados...");
      fetchData(filters);
    };

    window.addEventListener("focus", handleFocus);
    return () => window.removeEventListener("focus", handleFocus);
  }, [filters]);

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
