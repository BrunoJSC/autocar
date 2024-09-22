"use client";

import React, { useEffect, useState } from "react";
import { MaxWrapper } from "@/components/max-wrapper";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchFilterMotorbike } from "@/fetch/motorbike-filter";
import FilterBike from "@/components/filters/filter-motorbike";
import { ListMotorbike } from "@/components/list-bikes";

type Filters = {
  motorbikeBrand: string;
  motorbikeModel: string;
  location: string;
  fuel: string;
  exchange: string;
  color: string;
  minPrice?: number;
  maxPrice?: number;
  km?: number;
  cylinders?: number;
  announce?: string;
};

const initialFilters: Filters = {
  motorbikeBrand: "",
  motorbikeModel: "",
  location: "",
  fuel: "",
  exchange: "",
  minPrice: undefined,
  maxPrice: undefined,
  color: "",
  km: undefined,
  announce: "",
};

export default function Page() {
  const [filters, setFilters] = useState<Filters>(initialFilters);
  const [motorbikes, setMotorbikes] = useState<Motorbike[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async (filters: Filters) => {
    setLoading(true);
    try {
      const data = await fetchFilterMotorbike(filters);
      setMotorbikes(data);
    } catch (error) {
      console.error("Erro ao buscar carros:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    fetchData(filters);
  };

  const handleClearFilters = () => {
    const clearedFilters = { ...initialFilters };
    setFilters(clearedFilters);
    fetchData(clearedFilters);
  };

  useEffect(() => {
    fetchData(initialFilters);
  }, []);

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
