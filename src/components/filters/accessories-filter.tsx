"use client";

import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "../ui/label";

interface Accessory {
  id: number;
  title: string;
  value: string;
}

interface AccessoriesFilterProps {
  accessories: Accessory[];
  selectedAccessories: string[];
  onChange: (selected: string[]) => void;
}

const AccessoriesFilter: React.FC<AccessoriesFilterProps> = ({
  accessories,
  selectedAccessories,
  onChange,
}) => {
  const handleCheckboxChange = (value: string) => {
    onChange(
      selectedAccessories.includes(value)
        ? selectedAccessories.filter((item) => item !== value)
        : [...selectedAccessories, value]
    );
  };

  return (
    <div>
      <Label htmlFor="accessories">Acessórios</Label>
      <div>
        {accessories.map((accessory) => (
          <div key={accessory.id} className="flex items-center space-x-2">
            <Checkbox
              id={accessory.value}
              checked={selectedAccessories.includes(accessory.value)}
              onCheckedChange={() => handleCheckboxChange(accessory.value)}
            />
            <label htmlFor={accessory.value}>{accessory.title}</label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AccessoriesFilter;
