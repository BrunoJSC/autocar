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
import { SortAsc, Filter } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

import { locations } from "@/constants/location";
import { brandBikes } from "@/constants/brand-bikes";
import { fuel } from "@/constants/fuel";
import { exchange } from "@/constants/exchange";
import { maxPrice, minPrice } from "@/constants/prices";
import { colors } from "@/constants/colors";
import { bodyTypes } from "@/constants/body-type";
import { kms } from "@/constants/kms";
import YearFilter from "@/constants/year-filter";

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
import { cylindersType } from "@/constants/cylinders";
import { announceType } from "@/constants/announce-type";
import AccessoriesFilter from "./accessories-filter";
import { accessoriesMotorbikesType } from "@/constants/accessories";

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
  const handleBrandChange = (value: string) => {
    setFilters({ ...filters, motorbikeBrand: value });
  };

  const handleModelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, motorbikeModel: e.target.value || "" });
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

  const handleAnnounceChange = (value: string) => {
    setFilters({ ...filters, announce: value });
  };

  const handleAccessoriesChange = (selected: string[]) => {
    setFilters({ ...filters, accessories: selected });
  };

  const handleColorChange = (value: string) => {
    setFilters({ ...filters, color: value });
  };

  const handleStartYearChange = (year: number) => {
    setFilters({ ...filters, startYear: year });
  };

  const handleEndYearChange = (year: number) => {
    setFilters({ ...filters, endYear: year });
  };

  const handleCylindersChange = (value: string) => {
    setFilters({ ...filters, cylinders: value ? Number(value) : undefined });
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
              <CardTitle>Motos</CardTitle>
            </CardHeader>
            <ScrollArea className="h-72 w-full">
              <CardContent className="space-y-4">
                <FilterSelect
                  label="Marca"
                  value={filters.motorbikeBrand || ""}
                  onValueChange={handleBrandChange}
                  options={brandBikes.map((bike) => ({
                    ...bike,
                    id: bike.id.toString(),
                    value: bike.value.toString(),
                  }))}
                  placeholder="Selecione uma marca"
                  id={brandBikes[0]?.id.toString()}
                />
                <div>
                  <Label>Modelo</Label>
                  <Input
                    placeholder="Digite o modelo"
                    value={filters.motorbikeModel}
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
                  placeholder="Selecione o tipo de câmbio"
                  id={exchange[0]?.id.toString()}
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
                <FilterSelect
                  label="Cor"
                  value={filters.color || ""}
                  onValueChange={handleColorChange}
                  options={colors.map((color) => ({
                    ...color,
                    id: color.id.toString(),
                    value: color.value.toString(),
                  }))}
                  placeholder="Selecione a cor"
                  id={colors[0]?.id.toString()}
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

                <div>
                  <Label>Cilindradas</Label>
                  <Select
                    value={Number(filters.cylinders).toString()}
                    onValueChange={handleCylindersChange}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a quilometragem" />
                    </SelectTrigger>
                    <SelectContent>
                      {cylindersType.map((cylinder) => (
                        <SelectItem
                          key={cylinder.id.toString()}
                          value={cylinder.value.toString()}
                        >
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

                <AccessoriesFilter
                  accessories={accessoriesMotorbikesType}
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
            <CardTitle>Motos</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <FilterSelect
              label="Marca"
              value={filters.motorbikeBrand || ""}
              onValueChange={handleBrandChange}
              options={brandBikes.map((bike) => ({
                ...bike,
                id: bike.id.toString(),
                value: bike.value.toString(),
              }))}
              placeholder="Selecione uma marca"
              id={brandBikes[0]?.id.toString()}
            />
            <div>
              <Label>Modelo</Label>
              <Input
                placeholder="Digite o modelo"
                value={filters.motorbikeModel}
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
              placeholder="Selecione o tipo de câmbio"
              id={exchange[0]?.id.toString()}
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
            <FilterSelect
              label="Cor"
              value={filters.color || ""}
              onValueChange={handleColorChange}
              options={colors.map((color) => ({
                ...color,
                id: color.id.toString(),
                value: color.value.toString(),
              }))}
              placeholder="Selecione a cor"
              id={colors[0]?.id.toString()}
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

            <div>
              <Label>Cilindradas</Label>
              <Select
                value={Number(filters.cylinders).toString()}
                onValueChange={handleCylindersChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a quilometragem" />
                </SelectTrigger>
                <SelectContent>
                  {cylindersType.map((cylinder) => (
                    <SelectItem
                      key={cylinder.id.toString()}
                      value={cylinder.value.toString()}
                    >
                      {cylinder.title}
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

            <YearFilter
              startYear={filters.startYear || 1990}
              endYear={filters.endYear || new Date().getFullYear()}
              onStartYearChange={handleStartYearChange}
              onEndYearChange={handleEndYearChange}
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

export default FilterBike;
