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
import React, { useMemo } from "react";
import { Filter } from "lucide-react";
import AccessoriesFilter from "./filters/accessories-filter";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import FilterPriceSelect from "./filters/filter-price-select";
import YearFilter from "@/constants/year-filter";

interface MobileFilterProps {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
  onSearch: () => void;
  clearSearch: () => void;
  handleClearFilters: () => void;
  handleChange: (key: keyof Filters, value: any) => void; // Atualizado
}

const MobileFilter: React.FC<MobileFilterProps> = ({
  filters,
  setFilters,
  onSearch,
  clearSearch,
  handleChange,
}) => {
  const brandOptions = brandCars.map((car) => ({
    ...car,
    id: car.id.toString(),
    value: car.value.toString(),
    title: car.title.toString(),
  }));

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
              onValueChange={(value) => handleChange("brandCar", value)} // Atualizado
              options={brandOptions}
              placeholder="Selecione uma marca"
            />
            <div>
              <Label>Modelo</Label>
              <Input
                placeholder="Digite o modelo"
                value={filters.modelCar}
                onChange={(e) => handleChange("modelCar", e.target.value)} // Atualizado
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

            <div>
              <Label>Quilometragem</Label>
              <Select
                value={filters.km?.toString() || ""}
                onValueChange={(value) => handleChange("km", value)}
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

            <FilterButtons onSearch={onSearch} clearSearch={clearSearch} />
          </CardContent>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};

export default React.memo(MobileFilter);
