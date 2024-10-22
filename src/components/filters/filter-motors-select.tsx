"use client";

import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

// Tipagem das props que serão passadas para o componente
interface FilterMotorsSelectProps {
  label: string;
  value: string | number;
  onValueChange: (value: number) => void; // Modificado para receber um número
  options: Array<{ id: number; title: string; value: number }>;
  placeholder: string;
}

const FilterMotorsSelect: React.FC<FilterMotorsSelectProps> = ({
  label,
  value,
  onValueChange,
  options,
  placeholder,
}) => {
  return (
    <div>
      <Label>{label}</Label>
      {/* Conversão do value para string, pois o Select espera string */}
      <Select
        // Ao mudar o valor, converta-o de volta para número antes de passar para o callback
        onValueChange={(val) => onValueChange(Number(val))}
        value={value?.toString() || ""}
      >
        <SelectTrigger>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            // Garanta que o valor passado seja string
            <SelectItem key={option.id} value={option.value.toString()}>
              {option.title}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default FilterMotorsSelect;
