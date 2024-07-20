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
  id: number;
  label: string;
  value: string | undefined; // Permitindo que o valor possa ser undefined
  onValueChange: (value: string) => void;
  options: { id: number; value: string; title: string }[];
  placeholder: string;
}

const FilterSelect: React.FC<FilterSelectProps> = ({
  id,
  label,
  value,
  onValueChange,
  options,
  placeholder,
}) => {
  const safeValue = value || "";

  const handleValueChange = (newValue: string) => {
    onValueChange(newValue);
  };

  return (
    <div key={id}>
      <Label>{label}</Label>
      <Select value={safeValue} onValueChange={handleValueChange}>
        <SelectTrigger>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.id} value={option.value}>
              {option.title}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default FilterSelect;
