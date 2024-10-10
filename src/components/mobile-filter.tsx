import React from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CardHeader, CardTitle, CardContent } from "@/components/ui/card";

import YearFilter from "@/constants/year-filter";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
import { accessoriesType } from "@/constants/accessories";
import { motorsType } from "@/constants/motors";
import { mechanics } from "@/constants/mechanic";
import FilterPriceSelect from "./filters/filter-price-select";
import FilterSelect from "./filters/FilterSelect";
import AccessoriesFilter from "./filters/accessories-filter";
import FilterButtons from "./filters/filter-buttons";

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
  mechanic?: string;
};

interface MobileFilterProps {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
  onSearch: () => void;
  clearSearch: () => void;
  handleBrandChange: (value: string) => void;
  handleModelChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleLocationChange: (value: string) => void;
  handleFuelChange: (value: string) => void;
  handleExchangeChange: (value: string) => void;
  handleMinPriceChange: (value: string) => void;
  handleMaxPriceChange: (value: string) => void;
  handleKmChange: (value: string) => void;
  handleBodyTypeChange: (value: string) => void;
  handleColorChange: (value: string) => void;
  handleDoorsChange: (value: string) => void;
  handleMotorsChange: (value: string) => void;
  handleAnnounceChange: (value: string) => void;
  handleAccessoriesChange: (selected: string[]) => void;
  handleStartYearChange: (year: number) => void;
  handleEndYearChange: (year: number | undefined) => void;
  handleMechanicChange: (value: string) => void;
}

const MobileFilter: React.FC<MobileFilterProps> = ({
  filters,
  setFilters,
  onSearch,
  clearSearch,
  handleBrandChange,
  handleModelChange,
  handleLocationChange,
  handleFuelChange,
  handleExchangeChange,
  handleMinPriceChange,
  handleMaxPriceChange,
  handleKmChange,
  handleBodyTypeChange,
  handleColorChange,
  handleDoorsChange,
  handleMotorsChange,
  handleAnnounceChange,
  handleAccessoriesChange,
  handleStartYearChange,
  handleEndYearChange,
  handleMechanicChange,
}) => {
  const brandOptions = brandCars.map((car) => ({
    ...car,
    id: car.id.toString(),
    value: car.value.toString(),
    title: car.title.toString(),
  }));

  const locationOptions = locations.map((loc) => ({
    ...loc,
    id: loc.id.toString(),
    value: loc.value.toString(),
  }));

  const fuelOptions = fuel.map((f) => ({
    ...f,
    id: f.id.toString(),
    value: f.value.toString(),
  }));

  const exchangeOptions = exchange.map((ex) => ({
    ...ex,
    id: ex.id.toString(),
    value: ex.value.toString(),
  }));

  const colorOptions = colors.map((color) => ({
    ...color,
    id: color.id.toString(),
    value: color.value.toString(),
  }));

  const announceOptions = announceType.map((announce) => ({
    ...announce,
    id: announce.id.toString(),
    value: announce.value.toString(),
  }));

  const doorsOptions = doorsQty.map((door) => ({
    ...door,
    id: door.id.toString(),
    value: door.value.toString(),
  }));

  const kmOptions = kms.map((km) => ({
    ...km,
    id: km.id.toString(),
    value: km.value.toString(),
  }));

  const motorsOptions = motorsType.map((motor) => ({
    ...motor,
    id: motor.id.toString(),
    value: motor.value.toString(),
  }));

  const mechanicOptions = mechanics.map((mechanic) => ({
    ...mechanic,
    id: mechanic.id.toString(),
    value: mechanic.value.toString(),
  }));

  return (
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
                value={filters.motors?.toString() || ""}
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
              endYear={filters.endYear}
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
                value={filters.km?.toString() || ""}
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
                value={filters.doors?.toString() || ""}
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
              placeholder="Selecione a cor"
              id={colors[0]?.id.toString()}
            />

            <FilterSelect
              label="Parte mecânica"
              value={filters.mechanic || ""}
              onValueChange={handleMechanicChange}
              options={mechanicOptions}
              placeholder="Selecione a parte mecânica"
              id={mechanics[0]?.id.toString()}
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
  );
};

export default React.memo(MobileFilter);
