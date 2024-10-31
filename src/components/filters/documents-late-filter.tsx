"use client";

import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "../ui/label";

interface DocumentsLateFilterProps {
  isLate: boolean | undefined;
  onChange: (isLate: boolean | undefined) => void;
}

const DocumentsLateFilter: React.FC<DocumentsLateFilterProps> = ({
  isLate,
  onChange,
}) => {
  const handleCheckboxChange = (value: boolean) => {
    onChange(value);
  };

  return (
    <div>
      <Label htmlFor="documentsLate">Documentos Atrasados</Label>
      <div className="flex items-center space-x-2">
        {/* Opção "Sim" */}
        <div className="flex items-center space-x-2">
          <Checkbox
            id="documentsLateYes"
            checked={isLate === true}
            onCheckedChange={() => handleCheckboxChange(true)}
          />
          <label htmlFor="documentsLateYes">Sim</label>
        </div>
        {/* Opção "Não" */}
        <div className="flex items-center space-x-2">
          <Checkbox
            id="documentsLateNo"
            checked={isLate === false}
            onCheckedChange={() => handleCheckboxChange(false)}
          />
          <label htmlFor="documentsLateNo">Não</label>
        </div>
      </div>
    </div>
  );
};

export default DocumentsLateFilter;
