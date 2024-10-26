"use client";
import React from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"; // Importa o Select do ShadCN UI
import { Label } from "../ui/label";

interface DocumentsLateFilterProps {
  isLate: string;
  onChange: (isLate: boolean) => void;
}

const DocumentsLateFilter: React.FC<DocumentsLateFilterProps> = ({
  isLate,
  onChange,
}) => {
  const handleSelectChange = (value: string) => {
    onChange(value === "sim");
  };

  return (
    <div>
      <Label htmlFor="documentsLate">Documentos Atrasados</Label>
      <Select onValueChange={handleSelectChange} value={isLate ? "sim" : "não"}>
        <SelectTrigger id="documentsLate" className="mt-2">
          <SelectValue placeholder="Selecione uma opção" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="sim">Sim</SelectItem>
          <SelectItem value="não">Não</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default DocumentsLateFilter;
