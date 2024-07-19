"use client";

import React, { useEffect, useMemo, useState } from "react";
import { FilterCar } from "@/components/filters/filter-car";
import { MaxWrapper } from "@/components/max-wrapper";
import { ListCar } from "@/components/list-car";
import { fetchFilterCars } from "@/fetch/car-filter";
export default function Page() {
  const [filters, setFilters] = useState({
    brandCar: "",
    modelCar: "",
    location: "",
  });

  const [cars, setCars] = useState<Car[]>([]);

  const handleSearch = async () => {
    const data = await fetchFilterCars(filters);
    setCars(data);
  };

  const fetchData = useMemo(
    () => async () => {
      const data: Car[] = await fetchFilterCars({});
      setCars(data);
    },
    []
  );

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <MaxWrapper>
      <section className="flex flex-col md:flex-row gap-4 mt-5 p-4 min-h-screen">
        <div>
          <FilterCar
            filters={filters}
            setFilters={setFilters}
            onSearch={handleSearch}
          />
        </div>

        <div className="flex-1">
          <ListCar cars={cars as Car[]} />
        </div>
      </section>
    </MaxWrapper>
  );
}
