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

interface FilterSelectProps {
  label: string;
  value: string;
  onValueChange: (value: string) => void;
  options: { id: string | number; value: string | number; title: string }[];
  placeholder: string;
  id?: string | number;
}

const FilterSelect: React.FC<FilterSelectProps> = ({
  label,
  value,
  onValueChange,
  options,
  placeholder,
  id,
}) => (
  <div>
    <Label htmlFor={id?.toString()}>{label}</Label>
    <Select value={value} onValueChange={onValueChange}>
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

export default FilterSelect;
