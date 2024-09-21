"use client";

import React, { Dispatch, SetStateAction, useCallback, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

import FilterSelect from "./FilterSelect";
import FilterPriceSelect from "./filter-price-select";
import FilterButtons from "./filter-buttons";
import YearFilter from "@/constants/year-filter";
import AccessoriesFilter from "./accessories-filter";
import { accessoriesMotorbikesType } from "@/constants/accessories";
import { announceType } from "@/constants/announce-type";
import { brandBikes } from "@/constants/brand-bikes";
import { colors } from "@/constants/colors";
import { cylindersType } from "@/constants/cylinders";
import { exchange } from "@/constants/exchange";
import { fuel } from "@/constants/fuel";
import { kms } from "@/constants/kms";
import { locations } from "@/constants/location";
import { minPrice, maxPrice } from "@/constants/prices";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

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
  accessories?: string[];
  startYear?: number;
  endYear?: number;
};

interface FilterProps {
  filters: Filters;
  setFilters: Dispatch<SetStateAction<Filters>>;
  onSearch: () => void;
  clearSearch: () => void;
}

export const FilterBike: React.FC<FilterProps> = ({
  filters,
  setFilters,
  onSearch,
  clearSearch,
}) => {
  // Memoized handler functions to prevent unnecessary re-renders
  const handleBrandChange = useCallback(
    (value: string) =>
      setFilters((prev) => ({ ...prev, motorbikeBrand: value })),
    [setFilters]
  );

  const handleModelChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setFilters((prev) => ({ ...prev, motorbikeModel: e.target.value || "" })),
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

  const handleCylindersChange = useCallback(
    (value: string) =>
      setFilters((prev) => ({ ...prev, cylinders: Number(value) })),
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

  const handleColorChange = useCallback(
    (value: string) => setFilters((prev) => ({ ...prev, color: value })),
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
      brandBikes.map((bike) => ({
        ...bike,
        id: bike.id.toString(),
        value: bike.value.toString(),
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

  const cylindersOptions = useMemo(
    () =>
      cylindersType.map((cylinder) => ({
        ...cylinder,
        id: cylinder.id.toString(),
        value: cylinder.value.toString(),
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
              <CardTitle>Motos</CardTitle>
            </CardHeader>
            <ScrollArea className="h-full w-full">
              <CardContent className="space-y-4">
                <FilterSelect
                  label="Marca"
                  value={filters.motorbikeBrand || ""}
                  onValueChange={handleBrandChange}
                  options={brandOptions}
                  placeholder="Selecione uma marca"
                />
                <div>
                  <Label>Modelo</Label>
                  <Input
                    placeholder="Digite o modelo"
                    value={filters.motorbikeModel}
                    onChange={handleModelChange}
                  />
                </div>

                <div>
                  <Label>Cilindradas</Label>
                  <Select
                    value={Number(filters.cylinders).toString()}
                    onValueChange={handleCylindersChange}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione as cilindradas" />
                    </SelectTrigger>
                    <SelectContent>
                      {cylindersOptions.map((cylinder) => (
                        <SelectItem key={cylinder.id} value={cylinder.value}>
                          {cylinder.title}
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
                    label="Preço mínimo"
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
                    label="Preço máximo"
                    value={filters.maxPrice}
                    onValueChange={handleMaxPriceChange}
                    options={maxPrice.map((price) => ({
                      ...price,
                      id: price.id.toString(),
                      value: price.value.toString(),
                    }))}
                    placeholder="Selecione o preço máximo"
                  />
                </div>

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
                />

                <FilterSelect
                  label="Localidade"
                  value={filters.location || ""}
                  onValueChange={handleLocationChange}
                  options={locationOptions}
                  placeholder="Selecione a localidade"
                />

                <FilterSelect
                  label="Cor"
                  value={filters.color || ""}
                  onValueChange={handleColorChange}
                  options={colorOptions}
                  placeholder="Selecione a cor"
                />

                <FilterSelect
                  label="Tipo de câmbio"
                  value={filters.exchange || ""}
                  onValueChange={handleExchangeChange}
                  options={exchangeOptions}
                  placeholder="Selecione o câmbio"
                />

                <FilterSelect
                  label="Anunciante"
                  value={filters.announce || ""}
                  onValueChange={handleAnnounceChange}
                  options={announceOptions}
                  placeholder="Selecione o anunciante"
                />

                <AccessoriesFilter
                  accessories={accessoriesMotorbikesType}
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
            <CardTitle>Motos</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <FilterSelect
              label="Marca"
              value={filters.motorbikeBrand || ""}
              onValueChange={handleBrandChange}
              options={brandOptions}
              placeholder="Selecione uma marca"
            />
            <div>
              <Label>Modelo</Label>
              <Input
                placeholder="Digite o modelo"
                value={filters.motorbikeModel}
                onChange={handleModelChange}
              />
            </div>

            <div>
              <Label>Cilindradas</Label>
              <Select
                value={Number(filters.cylinders).toString()}
                onValueChange={handleCylindersChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione as cilindradas" />
                </SelectTrigger>
                <SelectContent>
                  {cylindersOptions.map((cylinder) => (
                    <SelectItem key={cylinder.id} value={cylinder.value}>
                      {cylinder.title}
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
                label="Preço mínimo"
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
                label="Preço máximo"
                value={filters.maxPrice}
                onValueChange={handleMaxPriceChange}
                options={maxPrice.map((price) => ({
                  ...price,
                  id: price.id.toString(),
                  value: price.value.toString(),
                }))}
                placeholder="Selecione o preço máximo"
              />
            </div>

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
            />

            <FilterSelect
              label="Localidade"
              value={filters.location || ""}
              onValueChange={handleLocationChange}
              options={locationOptions}
              placeholder="Selecione a localidade"
            />

            <FilterSelect
              label="Cor"
              value={filters.color || ""}
              onValueChange={handleColorChange}
              options={colorOptions}
              placeholder="Selecione a cor"
            />

            <FilterSelect
              label="Tipo de câmbio"
              value={filters.exchange || ""}
              onValueChange={handleExchangeChange}
              options={exchangeOptions}
              placeholder="Selecione o câmbio"
            />

            <FilterSelect
              label="Anunciante"
              value={filters.announce || ""}
              onValueChange={handleAnnounceChange}
              options={announceOptions}
              placeholder="Selecione o anunciante"
            />

            <AccessoriesFilter
              accessories={accessoriesMotorbikesType}
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

export default React.memo(FilterBike);
