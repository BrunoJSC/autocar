"use client";

import React, { useEffect, useState } from "react";
import { MaxWrapper } from "@/components/max-wrapper";
import { ListCar } from "@/components/list-car";
import { fetchFilterCars } from "@/fetch/car-filter";
import { Skeleton } from "@/components/ui/skeleton";
import { useSearchParams } from "next/navigation";
import FilterCar from "@/components/filters/filter-car";

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

  useEffect(() => {
    const tokenExpiryTime = Date.now() + 60 * 60 * 1000;
    const interval = setInterval(() => {
      const timeLeft = tokenExpiryTime - Date.now();
      if (timeLeft < 5 * 60 * 1000) {
        console.log("Renovando token...");
      }
    }, 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  const fetchData = async (filters: Filters) => {
    setLoading(true);
    try {
      const data = await fetchFilterCars(filters);
      setCars(data);
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

  // Atualiza filtros com base nos parâmetros da URL
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
  }, [searchParams]);

  // Atualiza estado ao retomar foco da aba
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
