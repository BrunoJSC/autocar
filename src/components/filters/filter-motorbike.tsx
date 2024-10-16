"use client";

import React, { Dispatch, SetStateAction, useCallback, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import FilterSelect from "./FilterSelect";
import FilterPriceSelect from "./filter-price-select";
import FilterButtons from "./filter-buttons";
import AccessoriesFilter from "./accessories-filter";
import YearFilter from "@/constants/year-filter";
import MobileFilter from "../mobile-filter";
import {
  locations,
  fuel,
  exchange,
  maxPrice,
  minPrice,
  colors,
  kms,
  announceType,
  accessoriesType,
} from "@/constants";
import { cylindersType } from "@/constants/cylinders";
import { brandBikes } from "@/constants/brand-bikes";
import CylinderSelect from "./cylinder-select";
import FilterRangeSelect from "./km-select";

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
      km: 0,
      accessories: [],
      startYear: 0,
      endYear: 0,
    });

    clearSearch();
    onSearch();
  }, [setFilters, clearSearch, onSearch]);

  const brandOptions = useMemo(
    () =>
      brandBikes.map((bike) => ({
        ...bike,
        id: bike.id.toString(),
        value: bike.value.toString(),
        title: bike.title.toString(),
      })),
    []
  );

  const locationOptions = useMemo(
    () =>
      locations.map((loc) => ({
        ...loc,
        id: loc.id.toString(),
        value: loc.value.toString(),
      })),
    []
  );

  const fuelOptions = useMemo(
    () =>
      fuel.map((f) => ({
        ...f,
        id: f.id.toString(),
        value: f.value.toString(),
      })),
    []
  );

  const colorOptions = useMemo(
    () =>
      colors.map((color) => ({
        ...color,
        id: color.id.toString(),
        value: color.value.toString(),
      })),
    []
  );

  const announceOptions = useMemo(
    () =>
      announceType.map((announce) => ({
        ...announce,
        id: announce.id.toString(),
        value: announce.value.toString(),
      })),
    []
  );

  const kmOptions = useMemo(
    () =>
      kms.map((km) => ({
        ...km,
        id: km.id.toString(),
        value: km.value.toString(),
      })),
    []
  );

  return (
    <div className="space-y-4 md:space-y-0 sticky">
      <div className="md:hidden h-auto">
        {/* <MobileFilter
          filters={filters}
          setFilters={setFilters}
          onSearch={onSearch}
          clearSearch={clearSearch}
          handleChange={handleChange}
          handleClearFilters={handleClearFilters}
          i18nIsDynamicList
        /> */}
      </div>

      <div className="hidden md:block space-y-4 md:space-y-0">
        <Card className="max-w-sm sticky top-0/ overflow-scroll">
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
              onStartYearChange={(year) =>
                setFilters((prev) => ({ ...prev, startYear: year }))
              }
              onEndYearChange={(year) =>
                setFilters((prev) => ({ ...prev, endYear: year }))
              }
            />

            <div className="flex items-center gap-2">
              <FilterPriceSelect
                label="Preço mínimo"
                value={filters.minPrice}
                onValueChange={(value) => handleChange("minPrice", value)}
                options={minPrice.map((price) => ({
                  ...price,
                  id: price.id.toString(),
                  value: price.value,
                }))}
                placeholder="Selecione o preço inicial"
              />
              <FilterPriceSelect
                label="Preço máximo"
                value={filters.maxPrice}
                onValueChange={(value) => handleChange("maxPrice", value)}
                options={maxPrice.map((price) => ({
                  ...price,
                  id: price.id.toString(),
                  value: price.value,
                }))}
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
              accessories={accessoriesType}
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
