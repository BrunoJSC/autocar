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
  isLate: string; // Mantém como string para uso com o Select
  onChange: (isLate: boolean) => void;
  onSearch: (isLateBoolean: boolean) => void; // Adiciona uma função para realizar a busca
}

const DocumentsLateFilter: React.FC<DocumentsLateFilterProps> = ({
  isLate,
  onChange,
  onSearch,
}) => {
  const handleSelectChange = (value: string) => {
    const isLateBoolean = value === "sim";
    onChange(isLateBoolean);
    onSearch(isLateBoolean); // Realiza a busca com o valor booleano convertido
  };

  return (
    <div>
      <Label htmlFor="documentsLate">Documentos Atrasados</Label>
      <Select onValueChange={handleSelectChange} value={isLate}>
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
