"use client";

import React, { Dispatch, SetStateAction, useCallback, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Button } from "@/components/ui/button";
import { Filter, SortAsc } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

import { locations } from "@/constants/location";
import { brandCars } from "@/constants/brand-cars";
import { fuel } from "@/constants/fuel";
import { exchange } from "@/constants/exchange";
import { maxPrice, minPrice } from "@/constants/prices";
import { colors } from "@/constants/colors";
import { doorsQty } from "@/constants/doors-qty";
import { announceType } from "@/constants/announce-type";
import { kms } from "@/constants/kms";
import { bodyTypes } from "@/constants/body-type";

import FilterSelect from "./FilterSelect";
import FilterPriceSelect from "./filter-price-select";
import FilterButtons from "./filter-buttons";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import AccessoriesFilter from "./accessories-filter";
import { accessoriesType } from "@/constants/accessories";
import YearFilter from "@/constants/year-filter";
import { motorsType } from "@/constants/motors";

type Filters = {
  brandCar: string;
  modelCar: string;
  location: string;
  fuel: string;
  exchange: string;
  doors: number;
  color: string;
  minPrice?: number;
  maxPrice?: number;
  announce: string;
  km?: number;
  bodyType?: string;
  accessories?: string[];
  startYear?: number;
  endYear?: number;
  motors?: number;
};

interface FilterProps {
  filters: Filters;
  setFilters: Dispatch<SetStateAction<Filters>>;
  onSearch: () => void;
  clearSearch: () => void;
}

export const FilterCar: React.FC<FilterProps> = ({
  filters,
  setFilters,
  onSearch,
  clearSearch,
}) => {
  // Memoized handler functions to prevent unnecessary re-renders
  const handleBrandChange = useCallback(
    (value: string) => setFilters((prev) => ({ ...prev, brandCar: value })),
    [setFilters]
  );

  const handleModelChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setFilters((prev) => ({ ...prev, modelCar: e.target.value || "" })),
    [setFilters]
  );

  const handleLocationChange = useCallback(
    (value: string) => setFilters((prev) => ({ ...prev, location: value })),
    [setFilters]
  );

  const handleFuelChange = useCallback(
    (value: string) => setFilters((prev) => ({ ...prev, fuel: value })),
    [setFilters]
  );

  const handleExchangeChange = useCallback(
    (value: string) => setFilters((prev) => ({ ...prev, exchange: value })),
    [setFilters]
  );

  const handleMinPriceChange = useCallback(
    (value: string) =>
      setFilters((prev) => ({
        ...prev,
        minPrice: value ? Number(value) : undefined,
      })),
    [setFilters]
  );

  const handleMaxPriceChange = useCallback(
    (value: string) =>
      setFilters((prev) => ({
        ...prev,
        maxPrice: value ? Number(value) : undefined,
      })),
    [setFilters]
  );

  const handleKmChange = useCallback(
    (value: string) =>
      setFilters((prev) => ({
        ...prev,
        km: value ? Number(value) : undefined,
      })),
    [setFilters]
  );

  const handleBodyTypeChange = useCallback(
    (value: string) => setFilters((prev) => ({ ...prev, bodyType: value })),
    [setFilters]
  );

  const handleColorChange = useCallback(
    (value: string) => setFilters((prev) => ({ ...prev, color: value })),
    [setFilters]
  );

  const handleDoorsChange = useCallback(
    (value: string) =>
      setFilters((prev) => ({ ...prev, doors: Number(value) })),
    [setFilters]
  );

  const handleMotorsChange = useCallback(
    (value: string) =>
      setFilters((prev) => ({ ...prev, motors: Number(value) })),
    [setFilters]
  );

  const handleAnnounceChange = useCallback(
    (value: string) => setFilters((prev) => ({ ...prev, announce: value })),
    [setFilters]
  );

  const handleAccessoriesChange = useCallback(
    (selected: string[]) =>
      setFilters((prev) => ({ ...prev, accessories: selected })),
    [setFilters]
  );

  const handleStartYearChange = useCallback(
    (year: number) => setFilters((prev) => ({ ...prev, startYear: year })),
    [setFilters]
  );

  const handleEndYearChange = useCallback(
    (year: number) => setFilters((prev) => ({ ...prev, endYear: year })),
    [setFilters]
  );

  // Memoizing options to avoid unnecessary re-renders
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

  return (
    <div className="space-y-4 md:space-y-0 sticky">
      <div className="md:hidden h-auto">
        <Sheet>
          <SheetTrigger asChild>
            <div className="w-full flex items-center justify-between">
              <h2 className="text-lg font-bold">Filtro</h2>
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" />
              </Button>
            </div>
          </SheetTrigger>
          <SheetContent>
            <CardHeader>
              <CardTitle>Carros</CardTitle>
            </CardHeader>
            <ScrollArea className="h-full w-full mb-[100px]">
              <CardContent className="space-y-4">
                <FilterSelect
                  label="Marca"
                  value={filters.brandCar || ""}
                  onValueChange={handleBrandChange}
                  options={brandOptions}
                  placeholder="Selecione uma marca"
                  id={brandCars[0]?.id.toString()}
                />
                <div>
                  <Label>Modelo</Label>
                  <Input
                    placeholder="Digite o modelo"
                    value={filters.modelCar}
                    onChange={handleModelChange}
                  />
                </div>

                <div>
                  <Label>Motor</Label>
                  <Select
                    value={Number(filters.motors).toString()}
                    onValueChange={handleMotorsChange}
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
                    onValueChange={handleBodyTypeChange}
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
                  startYear={filters.startYear || 1990}
                  endYear={filters.endYear || new Date().getFullYear()}
                  onStartYearChange={handleStartYearChange}
                  onEndYearChange={handleEndYearChange}
                />

                <div className="flex items-center gap-2">
                  <FilterPriceSelect
                    label="Preço minimo"
                    value={filters.minPrice}
                    onValueChange={handleMinPriceChange}
                    options={minPrice.map((price) => ({
                      ...price,
                      id: price.id.toString(),
                      value: price.value.toString(),
                    }))}
                    placeholder="Selecione o preço inicial"
                  />
                  <FilterPriceSelect
                    label="Preço maximo"
                    value={filters.maxPrice}
                    onValueChange={handleMaxPriceChange}
                    options={maxPrice.map((price) => ({
                      ...price,
                      id: price.id.toString(),
                      value: price.value.toString(),
                    }))}
                    placeholder="Selecione o preço maximo"
                  />
                </div>

                <FilterSelect
                  label="Tipo de câmbio"
                  value={filters.exchange || ""}
                  onValueChange={handleExchangeChange}
                  options={exchangeOptions}
                  placeholder="Selecione o tipo de troca"
                  id={exchange[0]?.id.toString()}
                />

                <div>
                  <Label>Quilometragem</Label>
                  <Select
                    value={Number(filters.km).toString()}
                    onValueChange={handleKmChange}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a quilometragem" />
                    </SelectTrigger>
                    <SelectContent>
                      {kmOptions.map((km) => (
                        <SelectItem key={km.id} value={km.value}>
                          {km.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <FilterSelect
                  label="Tipo de Combustível"
                  value={filters.fuel || ""}
                  onValueChange={handleFuelChange}
                  options={fuelOptions}
                  placeholder="Selecione o combustível"
                  id={fuel[0]?.id.toString()}
                />

                <FilterSelect
                  label="Localidade"
                  value={filters.location || ""}
                  onValueChange={handleLocationChange}
                  options={locationOptions}
                  placeholder="Selecione a localidade"
                  id={locations[0]?.id.toString()}
                />

                <div>
                  <Label>Portas</Label>
                  <Select
                    value={Number(filters.doors).toString()}
                    onValueChange={handleDoorsChange}
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
                  onValueChange={handleColorChange}
                  options={colorOptions}
                  placeholder="Selecione o tipo de troca"
                  id={colors[0]?.id.toString()}
                />

                <FilterSelect
                  label="Anunciante"
                  value={filters.announce || ""}
                  onValueChange={handleAnnounceChange}
                  options={announceOptions}
                  placeholder="Selecione o anunciante"
                  id={announceType[0]?.id.toString()}
                />

                <AccessoriesFilter
                  accessories={accessoriesType}
                  selectedAccessories={filters.accessories || []}
                  onChange={handleAccessoriesChange}
                />
                <FilterButtons onSearch={onSearch} clearSearch={clearSearch} />
              </CardContent>
            </ScrollArea>
          </SheetContent>
        </Sheet>
      </div>
      <div className="hidden md:block space-y-4 md:space-y-0">
        <Card className="max-w-sm">
          <CardHeader>
            <CardTitle>Carros</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <FilterSelect
              label="Marca"
              value={filters.brandCar || ""}
              onValueChange={handleBrandChange}
              options={brandOptions}
              placeholder="Selecione uma marca"
              id={brandCars[0]?.id.toString()}
            />
            <div>
              <Label>Modelo</Label>
              <Input
                placeholder="Digite o modelo"
                value={filters.modelCar}
                onChange={handleModelChange}
              />
            </div>

            <div>
              <Label>Motor</Label>
              <Select
                value={Number(filters.motors).toString()}
                onValueChange={handleMotorsChange}
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
                onValueChange={handleBodyTypeChange}
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
              startYear={filters.startYear || 1990}
              endYear={filters.endYear || new Date().getFullYear()}
              onStartYearChange={handleStartYearChange}
              onEndYearChange={handleEndYearChange}
            />

            <div className="flex items-center gap-2">
              <FilterPriceSelect
                label="Preço minimo"
                value={filters.minPrice}
                onValueChange={handleMinPriceChange}
                options={minPrice.map((price) => ({
                  ...price,
                  id: price.id.toString(),
                  value: price.value.toString(),
                }))}
                placeholder="Selecione o preço inicial"
              />
              <FilterPriceSelect
                label="Preço maximo"
                value={filters.maxPrice}
                onValueChange={handleMaxPriceChange}
                options={maxPrice.map((price) => ({
                  ...price,
                  id: price.id.toString(),
                  value: price.value.toString(),
                }))}
                placeholder="Selecione o preço maximo"
              />
            </div>

            <FilterSelect
              label="Tipo de câmbio"
              value={filters.exchange || ""}
              onValueChange={handleExchangeChange}
              options={exchangeOptions}
              placeholder="Selecione o tipo de troca"
              id={exchange[0]?.id.toString()}
            />

            <div>
              <Label>Quilometragem</Label>
              <Select
                value={Number(filters.km).toString()}
                onValueChange={handleKmChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a quilometragem" />
                </SelectTrigger>
                <SelectContent>
                  {kmOptions.map((km) => (
                    <SelectItem key={km.id} value={km.value}>
                      {km.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <FilterSelect
              label="Tipo de Combustível"
              value={filters.fuel || ""}
              onValueChange={handleFuelChange}
              options={fuelOptions}
              placeholder="Selecione o combustível"
              id={fuel[0]?.id.toString()}
            />

            <FilterSelect
              label="Localidade"
              value={filters.location || ""}
              onValueChange={handleLocationChange}
              options={locationOptions}
              placeholder="Selecione a localidade"
              id={locations[0]?.id.toString()}
            />

            <div>
              <Label>Portas</Label>
              <Select
                value={Number(filters.doors).toString()}
                onValueChange={handleDoorsChange}
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
              onValueChange={handleColorChange}
              options={colorOptions}
              placeholder="Selecione o tipo de troca"
              id={colors[0]?.id.toString()}
            />

            <FilterSelect
              label="Anunciante"
              value={filters.announce || ""}
              onValueChange={handleAnnounceChange}
              options={announceOptions}
              placeholder="Selecione o anunciante"
              id={announceType[0]?.id.toString()}
            />

            <AccessoriesFilter
              accessories={accessoriesType}
              selectedAccessories={filters.accessories || []}
              onChange={handleAccessoriesChange}
            />

            <FilterButtons onSearch={onSearch} clearSearch={clearSearch} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default React.memo(FilterCar);
