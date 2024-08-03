"use client";

import React, { Dispatch, SetStateAction } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Drawer,
  DrawerContent,
  DrawerOverlay,
  DrawerTrigger,
} from "@/components/ui/drawer";
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
  const handleBrandChange = (value: string) => {
    setFilters({ ...filters, brandCar: value });
  };

  const handleModelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, modelCar: e.target.value || "" });
  };

  const handleLocationChange = (value: string) => {
    setFilters({ ...filters, location: value });
  };

  const handleFuelChange = (value: string) => {
    setFilters({ ...filters, fuel: value });
  };

  const handleExchangeChange = (value: string) => {
    setFilters({ ...filters, exchange: value });
  };

  const handleMinPriceChange = (value: string) => {
    setFilters({
      ...filters,
      minPrice: value ? Number(value) : undefined,
    });
  };

  const handleMaxPriceChange = (value: string) => {
    setFilters({
      ...filters,
      maxPrice: value ? Number(value) : undefined,
    });
  };

  const handleKmChange = (value: string) => {
    setFilters({ ...filters, km: value ? Number(value) : undefined });
  };

  const handleBodyTypeChange = (value: string) => {
    setFilters({ ...filters, bodyType: value });
  };

  const handleColorChange = (value: string) => {
    setFilters({ ...filters, color: value });
  };

  const handleDoorsChange = (value: string) => {
    setFilters({ ...filters, doors: Number(value) });
  };

  const handleMotorsChange = (value: string) => {
    setFilters({ ...filters, motors: Number(value) });
  };

  const handleAnnounceChange = (value: string) => {
    setFilters({ ...filters, announce: value });
  };

  const handleAccessoriesChange = (selected: string[]) => {
    setFilters({ ...filters, accessories: selected });
  };

  const handleStartYearChange = (year: number) => {
    setFilters({ ...filters, startYear: year });
  };

  const handleEndYearChange = (year: number) => {
    setFilters({ ...filters, endYear: year });
  };

  return (
    <div className="space-y-4 md:space-y-0 sticky">
      <div className="md:hidden h-auto">
        <Drawer>
          <DrawerTrigger asChild>
            <div className="w-full flex items-center justify-between">
              <h2 className="text-lg font-bold">Filtro</h2>
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" />
              </Button>
            </div>
          </DrawerTrigger>
          <DrawerOverlay />
          <DrawerContent>
            <CardHeader>
              <CardTitle>Carros</CardTitle>
            </CardHeader>
            <ScrollArea className="h-72 w-full">
              <CardContent className="space-y-4">
                <FilterSelect
                  label="Marca"
                  value={filters.brandCar || ""}
                  onValueChange={handleBrandChange}
                  options={brandCars.map((car) => ({
                    ...car,
                    id: car.id.toString(),
                    value: car.value.toString(),
                  }))}
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
                <FilterSelect
                  label="Localidade"
                  value={filters.location || ""}
                  onValueChange={handleLocationChange}
                  options={locations.map((loc) => ({
                    ...loc,
                    id: loc.id.toString(),
                    value: loc.value.toString(),
                  }))}
                  placeholder="Selecione a localidade"
                  id={locations[0]?.id.toString()}
                />
                <FilterSelect
                  label="Tipo de Combustível"
                  value={filters.fuel || ""}
                  onValueChange={handleFuelChange}
                  options={fuel.map((f) => ({
                    ...f,
                    id: f.id.toString(),
                    value: f.value.toString(),
                  }))}
                  placeholder="Selecione o combustível"
                  id={fuel[0]?.id.toString()}
                />
                <FilterSelect
                  label="Tipo de câmbio"
                  value={filters.exchange || ""}
                  onValueChange={handleExchangeChange}
                  options={exchange.map((ex) => ({
                    ...ex,
                    id: ex.id.toString(),
                    value: ex.value.toString(),
                  }))}
                  placeholder="Selecione o tipo de troca"
                  id={exchange[0]?.id.toString()}
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
                  label="Cor do carro"
                  value={filters.color || ""}
                  onValueChange={handleColorChange}
                  options={colors.map((color) => ({
                    ...color,
                    id: color.id.toString(),
                    value: color.value.toString(),
                  }))}
                  placeholder="Selecione o tipo de troca"
                  id={colors[0]?.id.toString()}
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
                      {doorsQty.map((door) => (
                        <SelectItem
                          key={door.id.toString()}
                          value={door.value.toString()}
                        >
                          {door.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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
                      {motorsType.map((motor) => (
                        <SelectItem
                          key={motor.id.toString()}
                          value={motor.value.toString()}
                        >
                          {motor.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <FilterSelect
                  label="Anunciante"
                  value={filters.announce || ""}
                  onValueChange={handleAnnounceChange}
                  options={announceType.map((announce) => ({
                    ...announce,
                    id: announce.id.toString(),
                    value: announce.value.toString(),
                  }))}
                  placeholder="Selecione o anunciante"
                  id={announceType[0]?.id.toString()}
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
                      {kms.map((km) => (
                        <SelectItem
                          key={km.id.toString()}
                          value={km.value.toString()}
                        >
                          {km.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <FilterSelect
                  label="Selecione a carroceria"
                  value={filters.bodyType || ""}
                  onValueChange={handleBodyTypeChange}
                  options={bodyTypes.map((bodyType) => ({
                    ...bodyType,
                    id: bodyType.id.toString(),
                    value: bodyType.value.toString(),
                  }))}
                  placeholder="Selecione uma marca"
                  id={bodyTypes[0]?.id.toString()}
                />

                <YearFilter
                  startYear={filters.startYear || 1990}
                  endYear={filters.endYear || new Date().getFullYear()}
                  onStartYearChange={handleStartYearChange}
                  onEndYearChange={handleEndYearChange}
                />

                <AccessoriesFilter
                  accessories={accessoriesType}
                  selectedAccessories={filters.accessories || []}
                  onChange={handleAccessoriesChange}
                />
                <FilterButtons onSearch={onSearch} clearSearch={clearSearch} />
              </CardContent>
            </ScrollArea>
          </DrawerContent>
        </Drawer>
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
              options={brandCars.map((car) => ({
                ...car,
                id: car.id.toString(),
                value: car.value.toString(),
              }))}
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
            <FilterSelect
              label="Localidade"
              value={filters.location || ""}
              onValueChange={handleLocationChange}
              options={locations.map((loc) => ({
                ...loc,
                id: loc.id.toString(),
                value: loc.value.toString(),
              }))}
              placeholder="Selecione a localidade"
              id={locations[0]?.id.toString()}
            />
            <FilterSelect
              label="Combustível"
              value={filters.fuel || ""}
              onValueChange={handleFuelChange}
              options={fuel.map((f) => ({
                ...f,
                id: f.id.toString(),
                value: f.value.toString(),
              }))}
              placeholder="Selecione o combustível"
              id={fuel[0]?.id.toString()}
            />
            <FilterSelect
              label="Tipo de Cambio"
              value={filters.exchange}
              onValueChange={handleExchangeChange}
              options={exchange.map((ex) => ({
                ...ex,
                id: ex.id.toString(),
                value: ex.value.toString(),
              }))}
              placeholder="Selecione o cambio"
              id={exchange[0]?.id.toString()}
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
              label="Cor do carro"
              value={filters.color || ""}
              onValueChange={handleColorChange}
              options={colors.map((color) => ({
                ...color,
                id: color.id.toString(),
                value: color.value.toString(),
              }))}
              placeholder="Selecione o tipo de troca"
              id={colors[0]?.id.toString()}
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
                  {doorsQty.map((door) => (
                    <SelectItem
                      key={door.id.toString()}
                      value={door.value.toString()}
                    >
                      {door.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
                  {motorsType.map((motor) => (
                    <SelectItem
                      key={motor.id.toString()}
                      value={motor.value.toString()}
                    >
                      {motor.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <FilterSelect
              label="Anunciante"
              value={filters.announce || ""}
              onValueChange={handleAnnounceChange}
              options={announceType.map((announce) => ({
                ...announce,
                id: announce.id.toString(),
                value: announce.value.toString(),
              }))}
              placeholder="Selecione o anunciante"
              id={announceType[0]?.id.toString()}
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
                  {kms.map((km) => (
                    <SelectItem
                      key={km.id.toString()}
                      value={km.value.toString()}
                    >
                      {km.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <FilterSelect
              label="Selecione a carroceria"
              value={filters.bodyType || ""}
              onValueChange={handleBodyTypeChange}
              options={bodyTypes.map((bodyType) => ({
                ...bodyType,
                id: bodyType.id.toString(),
                value: bodyType.value.toString(),
              }))}
              placeholder="Selecione uma marca"
              id={bodyTypes[0]?.id.toString()}
            />

            <YearFilter
              startYear={filters.startYear || 1990}
              endYear={filters.endYear || new Date().getFullYear()}
              onStartYearChange={handleStartYearChange}
              onEndYearChange={handleEndYearChange}
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

export default FilterCar;
