"use client";

import React, { Dispatch, SetStateAction, useCallback, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import FilterSelect from "./FilterSelect";
import FilterPriceSelect from "./filter-price-select";
import FilterButtons from "./filter-buttons";
import AccessoriesFilter from "./accessories-filter";
import YearFilter from "@/constants/year-filter";
import MobileFilter from "../mobile-filter";
import {
  locations,
  fuel,
  maxPrice,
  minPrice,
  colors,
  announceType,
  accessoriesType,
  kms,
} from "@/constants";
import { cylindersType } from "@/constants/cylinders";
import { brandBikes } from "@/constants/brand-bikes";
import CylinderSelect from "./cylinder-select";
import FilterRangeSelect from "./km-select";
import MobileFilterMotorbike from "../mobile-filter-motorbike";
import { accessoriesMotorbikesType } from "@/constants/accessories";

interface FilterProps {
  filters: FiltersMotorbike;
  setFilters: Dispatch<SetStateAction<FiltersMotorbike>>;
  onSearch: () => void;
  clearSearch: () => void;
}

export const FilterMotorbike: React.FC<FilterProps> = ({
  filters,
  setFilters,
  onSearch,
  clearSearch,
}) => {
  const handleChange = useCallback(
    (field: keyof FiltersMotorbike, value: any) => {
      setFilters((prev) => ({ ...prev, [field]: value }));
    },
    [setFilters]
  );

  const handleClearFilters = useCallback(() => {
    setFilters({
      motorbikeBrand: "",
      motorbikeModel: "",
      cylinders: 0,
      location: "",
      minPrice: 0,
      maxPrice: 0,
      fuel: "",
      color: "",
      announce: "",
      kmStart: 0,
      kmEnd: 0,
      accessories: [],
      startYear: 0,
      endYear: 0,
    });

    clearSearch();
  }, [setFilters, clearSearch]);

  const brandOptions = useMemo(() => brandBikes, []);
  const locationOptions = useMemo(() => locations, []);
  const fuelOptions = useMemo(() => fuel, []);
  const colorOptions = useMemo(() => colors, []);
  const announceOptions = useMemo(() => announceType, []);
  const kmOptions = useMemo(() => kms, []);

  return (
    <div className="space-y-4 md:space-y-0 sticky">
      {/* Mobile Filter */}
      <div className="md:hidden h-auto">
        <MobileFilterMotorbike
          filters={filters}
          setFilters={setFilters}
          onSearch={onSearch}
          clearSearch={clearSearch}
          handleChange={handleChange}
        />
      </div>

      {/* Desktop Filter */}
      <div className="hidden md:block space-y-4 md:space-y-0">
        <Card className="max-w-sm sticky top-0 overflow-scroll">
          <CardHeader>
            <CardTitle>Motos</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <FilterSelect
              label="Marca"
              value={filters.motorbikeBrand || ""}
              onValueChange={(value) => handleChange("motorbikeBrand", value)}
              options={brandOptions}
              placeholder="Selecione uma marca"
            />

            <div>
              <Label>Modelo</Label>
              <Input
                placeholder="Digite o modelo"
                value={filters.motorbikeModel}
                onChange={(e) => handleChange("motorbikeModel", e.target.value)}
              />
            </div>

            <CylinderSelect
              value={filters.cylinders}
              onValueChange={(value) => handleChange("cylinders", value)}
              cylindersType={cylindersType}
            />

            <YearFilter
              startYear={filters.startYear}
              endYear={filters.endYear}
              onStartYearChange={(year) => handleChange("startYear", year)}
              onEndYearChange={(year) => handleChange("endYear", year)}
            />

            <div className="flex items-center gap-2">
              <FilterPriceSelect
                label="Preço mínimo"
                value={filters.minPrice}
                onValueChange={(value) => handleChange("minPrice", value)}
                options={minPrice}
                placeholder="Selecione o preço inicial"
              />
              <FilterPriceSelect
                label="Preço máximo"
                value={filters.maxPrice}
                onValueChange={(value) => handleChange("maxPrice", value)}
                options={maxPrice}
                placeholder="Selecione o preço máximo"
              />
            </div>

            <FilterSelect
              label="Combustível"
              value={filters.fuel || ""}
              onValueChange={(value) => handleChange("fuel", value)}
              options={fuelOptions}
              placeholder="Selecione o combustível"
            />

            <FilterSelect
              label="Localidade"
              value={filters.location || ""}
              onValueChange={(value) => handleChange("location", value)}
              options={locationOptions}
              placeholder="Selecione a localidade"
            />

            <FilterRangeSelect
              label="Km"
              kmStart={filters.kmStart}
              kmEnd={filters.kmEnd}
              onStartValueChange={(value) => handleChange("kmStart", value)}
              onEndValueChange={(value) => handleChange("kmEnd", value)}
              options={kmOptions}
              startPlaceholder="Selecione o km inicial"
              endPlaceholder="Selecione o km final"
            />

            <FilterSelect
              label="Cor da moto"
              value={filters.color || ""}
              onValueChange={(value) => handleChange("color", value)}
              options={colorOptions}
              placeholder="Selecione a cor"
            />

            <FilterSelect
              label="Anunciante"
              value={filters.announce || ""}
              onValueChange={(value) => handleChange("announce", value)}
              options={announceOptions}
              placeholder="Selecione o anunciante"
            />

            <AccessoriesFilter
              accessories={accessoriesMotorbikesType}
              selectedAccessories={filters.accessories || []}
              onChange={(selected) => handleChange("accessories", selected)}
            />

            <FilterButtons
              onSearch={onSearch}
              clearSearch={handleClearFilters}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default React.memo(FilterMotorbike);
