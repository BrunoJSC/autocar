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

interface FilterRangeSelectProps {
  label: string;
  kmStart?: number;
  kmEnd?: number;
  onStartValueChange: (value: number) => void;
  onEndValueChange: (value: number) => void;
  options: { id: string | number; value: string | number; title: string }[];
  startPlaceholder: string;
  endPlaceholder: string;
}

const FilterRangeSelect: React.FC<FilterRangeSelectProps> = ({
  label,
  kmStart,
  kmEnd,
  onStartValueChange,
  onEndValueChange,
  options,
  startPlaceholder,
  endPlaceholder,
}) => {
  return (
    <div className="space-y-4">
      <Label>{label}</Label>
      <div className="flex space-x-4">
        <div className="w-1/2">
          <Select
            value={kmStart?.toString() ?? ""}
            onValueChange={(selectedValue) =>
              onStartValueChange(Number(selectedValue))
            }
          >
            <SelectTrigger>
              <SelectValue placeholder={startPlaceholder} />
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
        <div className="w-1/2">
          <Select
            value={kmEnd?.toString() ?? ""}
            onValueChange={(selectedValue) =>
              onEndValueChange(Number(selectedValue))
            }
          >
            <SelectTrigger>
              <SelectValue placeholder={endPlaceholder} />
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
      </div>
    </div>
  );
};

export default FilterRangeSelect;
