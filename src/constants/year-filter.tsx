"use client";

import React from "react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface YearFilterProps {
  startYear: number;
  endYear: number;
  onStartYearChange: (year: number) => void;
  onEndYearChange: (year: number) => void;
}

const YearFilter: React.FC<YearFilterProps> = ({
  startYear,
  endYear,
  onStartYearChange,
  onEndYearChange,
}) => {
  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - 1990 + 1 },
    (_, i) => 1990 + i
  );

  return (
    <div className="flex space-x-4 items-center">
      <div className="w-1/2">
        <Label>Ano Inicial</Label>
        <Select
          value={startYear.toString()}
          onValueChange={(value) => onStartYearChange(Number(value))}
        >
          <SelectTrigger>
            <SelectValue placeholder="Selecione o ano inicial" />
          </SelectTrigger>
          <SelectContent>
            {years.map((year) => (
              <SelectItem key={year} value={year.toString()}>
                {year}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="w-1/2">
        <Label>Ano Final</Label>
        <Select
          value={endYear.toString()}
          onValueChange={(value) => onEndYearChange(Number(value))}
        >
          <SelectTrigger>
            <SelectValue placeholder="Selecione o ano final" />
          </SelectTrigger>
          <SelectContent>
            {years.map((year) => (
              <SelectItem key={year} value={year.toString()}>
                {year}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default YearFilter;
