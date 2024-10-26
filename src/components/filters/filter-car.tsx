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
  brandCars,
  fuel,
  exchange,
  maxPrice,
  minPrice,
  colors,
  doorsQty,
  announceType,
  kms,
  bodyTypes,
  motorsType,
  mechanics,
  accessoriesType,
} from "@/constants";
import FilterRangeSelect from "./km-select";
import FilterMotorsSelect from "./filter-motors-select";
import { documents } from "@/constants/documents";
import DocumentsLateFilter from "./documents-late-filter";

// Filter Props definition
interface FilterProps {
  filters: FiltersCar;
  setFilters: Dispatch<SetStateAction<FiltersCar>>;
  onSearch: () => void;
  clearSearch: () => void;
}

export const FilterCar: React.FC<FilterProps> = ({
  filters,
  setFilters,
  onSearch,
  clearSearch,
}) => {
  const handleChange = useCallback(
    (field: keyof FiltersCar, value: any) => {
      setFilters((prev) => ({ ...prev, [field]: value }));
    },
    [setFilters]
  );

  const handleClearFilters = useCallback(() => {
    setFilters({
      brandCar: "",
      modelCar: "",
      motors: 0,
      bodyType: "",
      startYear: 0,
      endYear: 0,
      minPrice: 0,
      maxPrice: 0,
      exchange: "",
      km: 0,
      fuel: "",
      location: "",
      doors: 0,
      color: "",
      announce: "",
      accessories: [],
    });

    clearSearch();
  }, [setFilters, clearSearch]);

  const brandOptions = useMemo(() => brandCars, []);
  const locationOptions = useMemo(() => locations, []);
  const fuelOptions = useMemo(() => fuel, []);
  const exchangeOptions = useMemo(() => exchange, []);
  const colorOptions = useMemo(() => colors, []);
  const announceOptions = useMemo(() => announceType, []);
  const doorsOptions = useMemo(() => doorsQty, []);
  const kmOptions = useMemo(() => kms, []);
  const motorsOptions = useMemo(() => motorsType, []);
  const mechanicOptions = useMemo(() => mechanics, []);

  return (
    <div className="space-y-4 md:space-y-0 sticky">
      {/* Mobile Filter */}
      <div className="md:hidden h-auto">
        <MobileFilter
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
            <CardTitle>Carros</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <FilterSelect
              label="Marca"
              value={filters.brandCar || ""}
              onValueChange={(value) => handleChange("brandCar", value)}
              options={brandOptions}
              placeholder="Selecione uma marca"
            />

            <div>
              <Label>Modelo</Label>
              <Input
                placeholder="Digite o modelo"
                value={filters.modelCar}
                onChange={(e) => handleChange("modelCar", e.target.value)}
              />
            </div>

            <FilterMotorsSelect
              label="Motor"
              value={filters.motors ?? ""}
              onValueChange={(value) => handleChange("motors", value)}
              options={motorsOptions}
              placeholder="Selecione o tipo de motor"
            />

            <FilterSelect
              label="Tipo de carroceria"
              value={filters.bodyType || ""}
              onValueChange={(value) => handleChange("bodyType", value)}
              options={bodyTypes}
              placeholder="Selecione o tipo de carroceria"
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
              label="Tipo de câmbio"
              value={filters.exchange || ""}
              onValueChange={(value) => handleChange("exchange", value)}
              options={exchangeOptions}
              placeholder="Selecione o tipo de troca"
            />

            <FilterRangeSelect
              label="Km inicial"
              kmStart={filters.kmStart}
              kmEnd={filters.kmEnd}
              onStartValueChange={(value) => handleChange("kmStart", value)}
              onEndValueChange={(value) => handleChange("kmEnd", value)}
              options={kmOptions}
              startPlaceholder="Selecione o km inicial"
              endPlaceholder="Selecione o km final"
            />

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

            <FilterSelect
              label="Portas"
              value={filters.doors?.toString() || ""}
              onValueChange={(value) => handleChange("doors", Number(value))}
              options={doorsOptions}
              placeholder="Selecione o número de portas"
            />

            <FilterSelect
              label="Cor do carro"
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

            <FilterSelect
              label="Mecânico"
              value={filters.mechanic || ""}
              onValueChange={(value) => handleChange("mechanic", value)}
              options={mechanicOptions}
              placeholder="Selecione o mecanico"
            />

            <AccessoriesFilter
              accessories={accessoriesType}
              selectedAccessories={filters.accessories || []}
              onChange={(selected) => handleChange("accessories", selected)}
            />

            <DocumentsLateFilter
              isLate={filters.isLate || undefined}
              onChange={(selected) => handleChange("isLate", selected)}
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

export default React.memo(FilterCar);
