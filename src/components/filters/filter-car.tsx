"use client";

import React, { useCallback, useMemo, useState, useRef } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { debounce } from "lodash";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import FilterSelect from "./FilterSelect";
import FilterPriceSelect from "./filter-price-select";
import FilterButtons from "./filter-buttons";
import AccessoriesFilter from "./accessories-filter";
import YearFilter from "@/constants/year-filter";
import MobileFilter from "../mobile-filter";
import {
  locations,
  brandCars,
  fuel,
  exchange,
  maxPrice,
  minPrice,
  colors,
  doorsQty,
  announceType,
  kms,
  bodyTypes,
  accessoriesType,
  motorsType,
} from "@/constants";
import FilterRangeSelect from "./km-select";

interface FilterProps {
  filters: FiltersCar;
  setFilters: React.Dispatch<React.SetStateAction<FiltersCar>>;
  onSearch: () => void;
  clearSearch: () => void;
}

export const FilterCar: React.FC<FilterProps> = React.memo(
  ({ filters, setFilters, onSearch, clearSearch }) => {
    const [localFilters, setLocalFilters] = useState<FiltersCar>(filters);
    const [isOpen, setIsOpen] = useState(true);
    const filterRef = useRef<HTMLDivElement>(null);

    const handleChange = useCallback((field: keyof FiltersCar, value: any) => {
      setLocalFilters((prev) => ({ ...prev, [field]: value }));
    }, []);

    const debouncedSetFilters = useMemo(
      () => debounce((newFilters: FiltersCar) => setFilters(newFilters), 300),
      [setFilters]
    );

    const handleClearFilters = useCallback(() => {
      const clearedFilters = {
        brandCar: "",
        modelCar: "",
        motors: 0,
        bodyType: "",
        startYear: 0,
        endYear: 0,
        minPrice: 0,
        maxPrice: 0,
        exchange: "",
        km: 0,
        fuel: "",
        location: "",
        doors: 0,
        color: "",
        announce: "",
        accessories: [],
      };
      setLocalFilters(clearedFilters);
      setFilters(clearedFilters);
      clearSearch();
      onSearch();
    }, [setFilters, clearSearch, onSearch]);

    const handleSearch = useCallback(() => {
      setFilters(localFilters);
      onSearch();
    }, [localFilters, setFilters, onSearch]);

    const toggleFilter = useCallback(() => {
      setIsOpen((prev) => !prev);
    }, []);

    const optionsMap = useMemo(
      () => ({
        brandOptions: brandCars.map((car) => ({
          ...car,
          id: car.id.toString(),
          value: car.value.toString(),
          title: car.title.toString(),
        })),
        locationOptions: locations.map((loc) => ({
          ...loc,
          id: loc.id.toString(),
          value: loc.value.toString(),
        })),
        fuelOptions: fuel.map((f) => ({
          ...f,
          id: f.id.toString(),
          value: f.value.toString(),
        })),
        exchangeOptions: exchange.map((ex) => ({
          ...ex,
          id: ex.id.toString(),
          value: ex.value.toString(),
        })),
        colorOptions: colors.map((color) => ({
          ...color,
          id: color.id.toString(),
          value: color.value.toString(),
        })),
        announceOptions: announceType.map((announce) => ({
          ...announce,
          id: announce.id.toString(),
          value: announce.value.toString(),
        })),
        doorsOptions: doorsQty.map((door) => ({
          ...door,
          id: door.id.toString(),
          value: door.value.toString(),
        })),
        kmOptions: kms.map((km) => ({
          ...km,
          id: km.id.toString(),
          value: km.value.toString(),
        })),
        motorsOptions: motorsType.map((motor) => ({
          ...motor,
          id: motor.id.toString(),
          title: motor.title,
          value: motor.value,
        })),
      }),
      []
    );

    const rowVirtualizer = useVirtualizer({
      count: optionsMap.brandOptions.length,
      getScrollElement: () => filterRef.current,
      estimateSize: () => 35,
      overscan: 5,
    });

    return (
      <div className="space-y-4 md:space-y-0 sticky">
        <div className="md:hidden h-auto">
          <MobileFilter
            filters={localFilters}
            setFilters={handleChange}
            onSearch={handleSearch}
            clearSearch={handleClearFilters}
            handleChange={handleChange}
          />
        </div>

        <div className="hidden md:block space-y-4 md:space-y-0">
          <button onClick={toggleFilter} className="mb-4">
            {isOpen ? "Fechar Filtros" : "Abrir Filtros"}
          </button>
          {isOpen && (
            <Card
              className="max-w-sm overflow-auto max-h-[80vh]"
              ref={filterRef}
            >
              <CardHeader>
                <CardTitle>Carros</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div
                  style={{
                    height: `${rowVirtualizer.getTotalSize()}px`,
                    width: "100%",
                    position: "relative",
                  }}
                >
                  {rowVirtualizer.getVirtualItems().map((virtualRow) => (
                    <div
                      key={virtualRow.index}
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: `${virtualRow.size}px`,
                        transform: `translateY(${virtualRow.start}px)`,
                      }}
                    >
                      <FilterSelect
                        label="Marca"
                        value={localFilters.brandCar || ""}
                        onValueChange={(value) =>
                          handleChange("brandCar", value)
                        }
                        options={optionsMap.brandOptions}
                        placeholder="Selecione uma marca"
                      />
                    </div>
                  ))}
                </div>

                <div>
                  <Label>Modelo</Label>
                  <Input
                    placeholder="Digite o modelo"
                    value={localFilters.modelCar}
                    onChange={(e) => {
                      handleChange("modelCar", e.target.value);
                      debouncedSetFilters({
                        ...localFilters,
                        modelCar: e.target.value,
                      });
                    }}
                  />
                </div>

                <FilterSelect
                  label="Motor"
                  value={localFilters.motors?.toString() || ""}
                  onValueChange={(value) => handleChange("motors", value)}
                  options={optionsMap.motorsOptions}
                  placeholder="Selecione o tipo de motor"
                />

                <FilterSelect
                  label="Tipo de carroceria"
                  value={localFilters.bodyType || ""}
                  onValueChange={(value) => handleChange("bodyType", value)}
                  options={bodyTypes.map((bodyType) => ({
                    ...bodyType,
                    id: bodyType.id.toString(),
                    value: bodyType.value.toString(),
                  }))}
                  placeholder="Selecione o tipo de carroceria"
                />

                <YearFilter
                  startYear={localFilters.startYear}
                  endYear={localFilters.endYear}
                  onStartYearChange={(year) => handleChange("startYear", year)}
                  onEndYearChange={(year) => handleChange("endYear", year)}
                />

                <div className="flex items-center gap-2">
                  <FilterPriceSelect
                    label="Preço mínimo"
                    value={localFilters.minPrice}
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
                    value={localFilters.maxPrice}
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
                  value={localFilters.exchange || ""}
                  onValueChange={(value) => handleChange("exchange", value)}
                  options={optionsMap.exchangeOptions}
                  placeholder="Selecione o tipo de troca"
                />

                <FilterRangeSelect
                  label="Km inicial"
                  kmStart={localFilters.kmStart}
                  kmEnd={localFilters.kmEnd}
                  onStartValueChange={(value) => handleChange("kmStart", value)}
                  onEndValueChange={(value) => handleChange("kmEnd", value)}
                  options={optionsMap.kmOptions}
                  startPlaceholder="Selecione o km inicial"
                  endPlaceholder="Selecione o km final"
                />

                <FilterSelect
                  label="Combustível"
                  value={localFilters.fuel || ""}
                  onValueChange={(value) => handleChange("fuel", value)}
                  options={optionsMap.fuelOptions}
                  placeholder="Selecione o combustível"
                />

                <FilterSelect
                  label="Localidade"
                  value={localFilters.location || ""}
                  onValueChange={(value) => handleChange("location", value)}
                  options={optionsMap.locationOptions}
                  placeholder="Selecione a localidade"
                />

                <FilterSelect
                  label="Portas"
                  value={localFilters.doors?.toString() || ""}
                  onValueChange={(value) =>
                    handleChange("doors", Number(value))
                  }
                  options={optionsMap.doorsOptions}
                  placeholder="Selecione o número de portas"
                />

                <FilterSelect
                  label="Cor do carro"
                  value={localFilters.color || ""}
                  onValueChange={(value) => handleChange("color", value)}
                  options={optionsMap.colorOptions}
                  placeholder="Selecione a cor"
                />

                <FilterSelect
                  label="Anunciante"
                  value={localFilters.announce || ""}
                  onValueChange={(value) => handleChange("announce", value)}
                  options={optionsMap.announceOptions}
                  placeholder="Selecione o anunciante"
                />

                <AccessoriesFilter
                  accessories={accessoriesType}
                  selectedAccessories={localFilters.accessories || []}
                  onChange={(selected) => handleChange("accessories", selected)}
                />

                <FilterButtons
                  onSearch={handleSearch}
                  clearSearch={handleClearFilters}
                />
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    );
  }
);

FilterCar.displayName = "FilterCar";

export default FilterCar;
