"use client";

import React, { useEffect, useMemo, useState } from "react";
import { MaxWrapper } from "@/components/max-wrapper";
import { fetchFilterMotorbike } from "@/fetch/motorbike-filter";
import { ListMotorbike } from "@/components/list-bikes";
import { FilterMotorbike } from "@/components/filters/filter-motorbike";

export default function Page() {
  const [filters, setFilters] = useState({
    brandCar: "",
    modelCar: "",
    location: "",
  });

  const [motorbike, setMotorbike] = useState<Motorbike[]>([]);

  const handleSearch = async () => {
    const data = await fetchFilterMotorbike(filters);
    setMotorbike(data);
  };

  const fetchData = useMemo(
    () => async () => {
      const data: Motorbike[] = await fetchFilterMotorbike({});
      setMotorbike(data);
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
          <FilterMotorbike
            filters={filters}
            setFilters={setFilters}
            onSearch={handleSearch}
          />
        </div>

        <div className="flex-1">
          <ListMotorbike motorbikes={motorbike as Motorbike[]} />
        </div>
      </section>
    </MaxWrapper>
  );
}
