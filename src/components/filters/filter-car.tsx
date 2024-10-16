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
  accessoriesType,
  motorsType,
  mechanics,
} from "@/constants";
import FilterRangeSelect from "./km-select";

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

    onSearch();
  }, [setFilters, clearSearch, onSearch]);

  const brandOptions = useMemo(
    () =>
      brandCars.map((car) => ({
        ...car,
        id: car.id.toString(),
        value: car.value.toString(),
        title: car.title.toString(),
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

  const exchangeOptions = useMemo(
    () =>
      exchange.map((ex) => ({
        ...ex,
        id: ex.id.toString(),
        value: ex.value.toString(),
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

  const doorsOptions = useMemo(
    () =>
      doorsQty.map((door) => ({
        ...door,
        id: door.id.toString(),
        value: door.value.toString(),
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

  const motorsOptions = useMemo(
    () =>
      motorsType.map((motor) => ({
        ...motor,
        id: motor.id.toString(),
        value: motor.value.toString(),
      })),
    []
  );

  const mechanicOptions = useMemo(
    () =>
      mechanics.map((mechanic) => ({
        ...mechanic,
        id: mechanic.id.toString(),
        value: mechanic.value.toString(),
      })),
    []
  );

  return (
    <div className="space-y-4 md:space-y-0 sticky">
      <div className="md:hidden h-auto">
        <MobileFilter
          filters={filters}
          setFilters={setFilters}
          onSearch={onSearch}
          clearSearch={clearSearch}
          handleChange={handleChange}
          handleClearFilters={handleClearFilters}
          i18nIsDynamicList
        />
      </div>

      {/* Filtro Desktop */}
      <div className="hidden md:block space-y-4 md:space-y-0">
        <Card className="max-w-sm sticky top-0/ overflow-scroll">
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

            <div>
              <Label>Motor</Label>
              <Select
                value={filters.motors?.toString() || ""}
                onValueChange={(value) => handleChange("motors", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o tipo de motor" />
                </SelectTrigger>
                <SelectContent>
                  {motorsOptions.map((motor) => (
                    <SelectItem key={motor.id} value={motor.value}>
                      {motor.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Tipo de carroceria</Label>
              <Select
                value={filters.bodyType || ""}
                onValueChange={(value) => handleChange("bodyType", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o tipo de carroceria" />
                </SelectTrigger>
                <SelectContent>
                  {bodyTypes.map((bodyType) => (
                    <SelectItem key={bodyType.id} value={bodyType.value}>
                      {bodyType.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

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

            <div>
              <Label>Portas</Label>
              <Select
                value={filters.doors?.toString() || ""}
                onValueChange={(value) => handleChange("doors", Number(value))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o número de portas" />
                </SelectTrigger>
                <SelectContent>
                  {doorsOptions.map((door) => (
                    <SelectItem key={door.id} value={door.value}>
                      {door.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

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

export default React.memo(FilterCar);
