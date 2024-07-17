"use client";

import React from "react";
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

interface FilterProps {
  filters: any;
  setFilters: (filters: any) => void;
  onSearch: () => void;
}

export const FilterCar: React.FC<FilterProps> = ({
  filters,
  setFilters,
  onSearch,
}) => {
  const handleBrandChange = (value: string) => {
    setFilters((prevFilters: any) => ({
      ...prevFilters,
      brandCar: value,
    }));
  };

  const handleModelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters((prevFilters: any) => ({
      ...prevFilters,
      modelCar: e.target.value || "",
    }));
  };

  const handleLocationChange = (value: string) => {
    setFilters((prevFilters: any) => ({
      ...prevFilters,
      location: value,
    }));
  };

  const handleClearFilters = () => {
    setFilters({
      brandCar: "",
      modelCar: "",
      location: "",
    });
  };

  return (
    <div>
      <div className="md:hidden">
        <Drawer>
          <DrawerTrigger asChild>
            <Button variant="outline">
              <SortAsc className="h-5 w-5" />
            </Button>
          </DrawerTrigger>
          <DrawerOverlay />
          <DrawerContent>
            <Card>
              <CardHeader>
                <CardTitle>Carros</CardTitle>
              </CardHeader>

              <CardContent className="space-y-4">
                <div>
                  <Label>Marca</Label>
                  <Select
                    value={filters.brandCar}
                    onValueChange={handleBrandChange}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione uma marca" />
                    </SelectTrigger>
                    <SelectContent>
                      {brandCars.map((brand) => (
                        <SelectItem key={brand.id} value={brand.value}>
                          {brand.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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
                  <Label>Localização</Label>
                  <Select
                    value={filters.location}
                    onValueChange={handleLocationChange}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione uma localização" />
                    </SelectTrigger>
                    <SelectContent>
                      {locations.map((location) => (
                        <SelectItem key={location.id} value={location.value}>
                          {location.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex flex-col justify-end gap-2 mt-4 p-4">
                  <Button onClick={onSearch}>Buscar</Button>
                  <Button variant="outline" onClick={handleClearFilters}>
                    Limpar Filtros
                  </Button>
                </div>
              </CardContent>
            </Card>
          </DrawerContent>
        </Drawer>
      </div>

      <div className="hidden md:block">
        <Card className="max-w-xl">
          <CardHeader>
            <CardTitle>Carros</CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            <div>
              <Label>Marca</Label>
              <Select
                value={filters.brandCar}
                onValueChange={handleBrandChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione uma marca" />
                </SelectTrigger>
                <SelectContent>
                  {brandCars.map((brand) => (
                    <SelectItem key={brand.id} value={brand.value}>
                      {brand.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
              <Label>Localização</Label>
              <Select
                value={filters.location}
                onValueChange={handleLocationChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione uma localização" />
                </SelectTrigger>
                <SelectContent>
                  {locations.map((location) => (
                    <SelectItem key={location.id} value={location.value}>
                      {location.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>

          <div className="flex flex-col justify-end gap-2 mt-4 p-4">
            <Button onClick={onSearch}>Buscar</Button>
            <Button variant="outline" onClick={handleClearFilters}>
              Limpar Filtros
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};
