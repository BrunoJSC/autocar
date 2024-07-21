"use client";

import React from "react";
import { Button } from "@/components/ui/button";

interface FilterButtonsProps {
  onSearch: () => void;
  clearSearch: () => void;
}

const FilterButtons: React.FC<FilterButtonsProps> = ({
  onSearch,
  clearSearch,
}) => (
  <div className="flex flex-col justify-end gap-2 mt-4 p-4">
    <Button onClick={onSearch}>Buscar</Button>
    <Button variant="outline" onClick={clearSearch}>
      Limpar Filtros
    </Button>
  </div>
);

export default FilterButtons;
