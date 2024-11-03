import React, { useMemo } from "react";
import {
  accessoriesType,
  announceType,
  brandCars,
  colors,
  fuel,
  kms,
  locations,
  maxPrice,
  mechanics,
  minPrice,
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
import FilterRangeSelect from "./filters/km-select";
import FilterMotorsSelect from "./filters/filter-motors-select";
import { cylindersType } from "@/constants/cylinders";
import CylinderSelect from "./filters/cylinder-select";

interface MobileFilterProps {
  filters: FiltersMotorbike;
  setFilters: (filters: FiltersMotorbike) => void;
  onSearch: () => void;
  clearSearch: () => void;
  handleChange: (field: keyof FiltersMotorbike, value: any) => void;
}

const MobileFilterMotorbike: React.FC<MobileFilterProps> = ({
  filters,
  setFilters,
  onSearch,
  clearSearch,
  handleChange,
}) => {
  const brandOptions = useMemo(() => brandCars, []);
  const locationOptions = useMemo(() => locations, []);
  const fuelOptions = useMemo(() => fuel, []);
  const colorOptions = useMemo(() => colors, []);
  const announceOptions = useMemo(() => announceType, []);
  const kmOptions = useMemo(() => kms, []);

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
          <CardTitle>Motos</CardTitle>
        </CardHeader>
        <ScrollArea className="h-full w-full mb-[100px]">
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
              label="Km"
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
              text="Acessórios"
              accessories={accessoriesType}
              selectedAccessories={filters.accessories || []}
              onChange={(selected) => handleChange("accessories", selected)}
            />

            <FilterButtons onSearch={onSearch} clearSearch={clearSearch} />
          </CardContent>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};

MobileFilterMotorbike.displayName = "MobileFilterMotorbike";

export default React.memo(MobileFilterMotorbike);
