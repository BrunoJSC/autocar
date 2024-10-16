"use client";

import React from "react";
import {
  Select,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface FilterPriceSelectProps {
  label: string;
  value?: number;
  onValueChange: (value: number) => void; // Expect a number here, not string
  options: { id: string | number; value: string | number; title: string }[];
  placeholder: string;
}

const FilterPriceSelect: React.FC<FilterPriceSelectProps> = ({
  label,
  value,
  onValueChange,
  options,
  placeholder,
}) => {
  return (
    <div className="w-full">
      <Label>{label}</Label>
      <Select
        value={value ? value.toString() : ""}
        onValueChange={(selectedValue) => onValueChange(Number(selectedValue))}
      >
        <SelectTrigger>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem
              key={option.id.toString()}
              value={option.value.toString()}
            >
              {option.title}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default FilterPriceSelect;
