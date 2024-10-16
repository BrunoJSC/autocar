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
import { years } from "@/constants/years";

interface YearFilterProps {
  startYear: number | undefined;
  endYear: number | undefined;
  onStartYearChange: (year: number | undefined) => void;
  onEndYearChange: (year: number | undefined) => void;
}

const YearFilter: React.FC<YearFilterProps> = ({
  startYear,
  endYear,
  onStartYearChange,
  onEndYearChange,
}) => {
  return (
    <div className="flex space-x-4 items-center">
      {/* Ano Inicial */}
      <div className="w-1/2">
        <Label>Ano Inicial</Label>
        <Select
          value={startYear?.toString() ?? ""}
          onValueChange={(value) =>
            onStartYearChange(value ? Number(value) : undefined)
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Selecione o ano inicial" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="null">Selecione o ano inicial</SelectItem>
            {years.map((year) => (
              <SelectItem key={year.id} value={year.value.toString()}>
                {year.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Ano Final */}
      <div className="w-1/2">
        <Label>Ano Final</Label>
        <Select
          value={endYear?.toString() ?? ""}
          onValueChange={(value) =>
            onEndYearChange(value ? Number(value) : undefined)
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Selecione o ano final" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="null">Selecione o ano final</SelectItem>
            {years
              ?.filter((year) => !startYear || year.value >= startYear)
              .map((year) => (
                <SelectItem key={year.id} value={year.value.toString()}>
                  {year.title}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default YearFilter;
