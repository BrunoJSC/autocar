import React, { useMemo } from "react";
import {
  accessoriesType,
  announceType,
  bodyTypes,
  brandCars,
  colors,
  doorsQty,
  exchange,
  fuel,
  kms,
  locations,
  maxPrice,
  mechanics,
  minPrice,
  motorsType,
} from "@/constants";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Button } from "./ui/button";
import { CardContent, CardHeader, CardTitle } from "./ui/card";
import { ScrollArea } from "./ui/scroll-area";
import FilterSelect from "./filters/FilterSelect";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import FilterButtons from "./filters/filter-buttons";
import { Filter } from "lucide-react";
import AccessoriesFilter from "./filters/accessories-filter";
import FilterPriceSelect from "./filters/filter-price-select";
import YearFilter from "@/constants/year-filter";

interface MobileFilterProps {
  filters: FiltersCar;
  setFilters: (filters: FiltersCar) => void;
  onSearch: () => void;
  clearSearch: () => void;
  handleChange: (field: keyof FiltersCar, value: any) => void;
}

const MobileFilter: React.FC<MobileFilterProps> = ({
  filters,
  setFilters,
  onSearch,
  clearSearch,
  handleChange,
}) => {
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

            <FilterSelect
              label="Motor"
              value={filters.motors?.toString() || ""}
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

            <FilterSelect
              label="Quilometragem"
              value={filters.km?.toString() || ""}
              onValueChange={(value) => handleChange("km", value)}
              options={kmOptions}
              placeholder="Selecione a quilometragem"
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

            <AccessoriesFilter
              accessories={accessoriesType}
              selectedAccessories={filters.accessories || []}
              onChange={(selected) => handleChange("accessories", selected)}
            />

            <FilterSelect
              label="Mecânico"
              value={filters.mechanic || ""}
              onValueChange={(value) => handleChange("mechanic", value)}
              options={mechanicOptions}
              placeholder="Selecione o mecânico"
            />

            <FilterButtons onSearch={onSearch} clearSearch={clearSearch} />
          </CardContent>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};

MobileFilter.displayName = "MobileFilter";

export default React.memo(MobileFilter);
