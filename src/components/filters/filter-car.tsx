"use client";

import React, { Dispatch, SetStateAction } from "react";
import {
  Select,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
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
import { SortAsc } from "lucide-react";
import { locations } from "@/constants/location";
import { brandCars } from "@/constants/brand-cars";
import { fuel } from "@/constants/fuel";
import { exchange } from "@/constants/exchange";
import { maxPrice, minPrice } from "@/constants/prices";
import FilterSelect from "./FilterSelect";
import { colors } from "@/constants/colors";
import { doorsQty } from "@/constants/doors-qty";
import { announceType } from "@/constants/announce-type";

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

  const handleColorChange = (value: string) => {
    setFilters({ ...filters, color: value });
  };

  const handleDoorsChange = (value: string) => {
    setFilters({ ...filters, doors: Number(value) });
  };

  const handleAnnounceChange = (value: string) => {
    setFilters({ ...filters, announce: value });
  };

  return (
    <div className="space-y-4 md:space-y-0 sticky">
      <div className="md:hidden h-auto">
        <Drawer>
          <DrawerTrigger asChild>
            <Button variant="outline">
              <SortAsc className="h-5 w-5" />
            </Button>
          </DrawerTrigger>
          <DrawerOverlay />
          <DrawerContent className="overflow-scroll fixed inset-0 h-auto">
            <CardHeader>
              <CardTitle>Carros</CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              <div>
                <FilterSelect
                  label="Marca"
                  value={filters.brandCar || ""}
                  onValueChange={handleBrandChange}
                  options={brandCars}
                  key={brandCars[0]?.id}
                  placeholder="Selecione uma marca"
                  id={brandCars[0]?.id}
                />
              </div>

              <div>
                <Label>Modelo</Label>
                <Input
                  placeholder="Digite o modelo"
                  value={filters.modelCar}
                  onChange={handleModelChange}
                />
              </div>

              <div>
                <FilterSelect
                  label="Localidade"
                  value={filters.location || ""}
                  onValueChange={handleLocationChange}
                  options={locations}
                  key={locations[0]?.id}
                  placeholder="Selecione a localidade"
                  id={locations[0]?.id}
                />
              </div>

              <div>
                <FilterSelect
                  label="Tipo de Combustível"
                  value={filters.fuel || ""}
                  onValueChange={handleFuelChange}
                  options={fuel}
                  key={fuel[0]?.id}
                  placeholder="Selecione o combustível"
                  id={fuel[0]?.id}
                />
              </div>

              <div>
                <FilterSelect
                  label="Tipo de câmbio"
                  value={filters.exchange || ""}
                  onValueChange={handleExchangeChange}
                  options={exchange}
                  key={exchange[0]?.id}
                  placeholder="Selecione o tipo de troca"
                  id={exchange[0]?.id}
                />
              </div>

              <div className="flex items-center gap-2">
                <div className="w-full">
                  <Label>Preço minimo</Label>
                  <Select
                    value={Number(filters.minPrice).toString()}
                    onValueChange={handleMinPriceChange}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o preço inicial" />
                    </SelectTrigger>
                    <SelectContent>
                      {minPrice.map((minPrice) => (
                        <SelectItem
                          key={minPrice.id}
                          value={Number(minPrice.value).toString()}
                        >
                          {minPrice.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="w-full">
                  <Label>Preço maximo</Label>
                  <Select
                    value={Number(filters.maxPrice).toString()}
                    onValueChange={handleMaxPriceChange}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o preço maximo" />
                    </SelectTrigger>
                    <SelectContent>
                      {maxPrice.map((maxPrice) => (
                        <SelectItem
                          key={maxPrice.id}
                          value={Number(maxPrice.value).toString()}
                        >
                          {maxPrice.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <FilterSelect
                  label="Cor do carro"
                  value={filters.color || ""}
                  onValueChange={handleColorChange}
                  options={colors}
                  key={exchange[0]?.id}
                  placeholder="Selecione o tipo de troca"
                  id={colors[0]?.id}
                />
              </div>

              <div>
                <Label>Portas</Label>
                <Select
                  value={Number(filters.doors).toString()}
                  onValueChange={handleDoorsChange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o preço maximo" />
                  </SelectTrigger>
                  <SelectContent>
                    {doorsQty.map((door) => (
                      <SelectItem
                        key={door.id}
                        value={Number(door.value).toString()}
                      >
                        {door.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col justify-end gap-2 mt-4 p-4">
                <Button onClick={onSearch}>Buscar</Button>
                <Button variant="outline" onClick={clearSearch}>
                  Limpar Filtros
                </Button>
              </div>
            </CardContent>
          </DrawerContent>
        </Drawer>
      </div>

      <div className="hidden md:block space-y-4 md:space-y-0">
        <Card className="max-w-xl">
          <CardHeader>
            <CardTitle>Carros</CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            <div>
              <FilterSelect
                label="Marca"
                value={filters.brandCar || ""}
                onValueChange={handleBrandChange}
                options={brandCars}
                key={brandCars[0]?.id}
                placeholder="Selecione uma marca"
                id={brandCars[0]?.id}
              />
            </div>

            <div>
              <Label>Modelo</Label>
              <Input
                placeholder="Digite o modelo"
                value={filters.modelCar}
                onChange={handleModelChange}
              />
            </div>

            <div>
              <FilterSelect
                label="Localidade"
                value={filters.location || ""}
                onValueChange={handleLocationChange}
                options={locations}
                key={locations[0]?.id}
                placeholder="Selecione a localidade"
                id={locations[0]?.id}
              />
            </div>

            <div>
              <FilterSelect
                label="Combustível"
                value={filters.fuel || ""}
                onValueChange={handleFuelChange}
                options={fuel}
                key={fuel[0]?.id}
                placeholder="Selecione o combustível"
                id={fuel[0]?.id}
              />
            </div>

            <div>
              <FilterSelect
                label="Tipo de Cambio"
                value={filters.exchange}
                onValueChange={handleExchangeChange}
                options={exchange}
                key={exchange[0]?.id}
                placeholder="Selecione o cambio"
                id={exchange[0]?.id}
              />
            </div>

            <div className="flex items-center gap-2">
              <div className="w-full">
                <Label>Preço minimo</Label>
                <Select
                  value={Number(filters.minPrice).toString()}
                  onValueChange={handleMinPriceChange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o preço inicial" />
                  </SelectTrigger>
                  <SelectContent>
                    {minPrice.map((minPrice) => (
                      <SelectItem
                        key={minPrice.id}
                        value={Number(minPrice.value).toString()}
                      >
                        {minPrice.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="w-full">
                <Label>Preço maximo</Label>
                <Select
                  value={Number(filters.maxPrice).toString()}
                  onValueChange={handleMaxPriceChange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o preço maximo" />
                  </SelectTrigger>
                  <SelectContent>
                    {maxPrice.map((maxPrice) => (
                      <SelectItem
                        key={maxPrice.id}
                        value={Number(maxPrice.value).toString()}
                      >
                        {maxPrice.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <FilterSelect
                label="Cor do carro"
                value={filters.color || ""}
                onValueChange={handleColorChange}
                options={colors}
                key={exchange[0]?.id}
                placeholder="Selecione o tipo de troca"
                id={colors[0]?.id}
              />
            </div>

            <div>
              <Label>Portas</Label>
              <Select
                value={Number(filters.doors).toString()}
                onValueChange={handleDoorsChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o preço maximo" />
                </SelectTrigger>
                <SelectContent>
                  {doorsQty.map((door) => (
                    <SelectItem
                      key={door.id}
                      value={Number(door.value).toString()}
                    >
                      {door.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <FilterSelect
                label="Anunciante"
                value={filters.announce || ""}
                onValueChange={handleAnnounceChange}
                options={announceType}
                key={announceType[0]?.id}
                placeholder="Selecione o anunciante"
                id={announceType[0]?.id}
              />
            </div>
          </CardContent>

          <div className="flex flex-col justify-end gap-2 mt-4 p-4">
            <Button onClick={onSearch}>Buscar</Button>
            <Button variant="outline" onClick={clearSearch}>
              Limpar Filtros
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};
