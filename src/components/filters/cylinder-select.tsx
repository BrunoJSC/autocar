import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type CylinderOption = {
  id: number;
  value: number;
  title: string;
};

interface CylinderSelectProps {
  value: number | null;
  onValueChange: (value: number | null) => void;
  cylindersType: CylinderOption[];
}

const CylinderSelect: React.FC<CylinderSelectProps> = ({
  value,
  onValueChange,
  cylindersType,
}) => {
  return (
    <Select
      value={value !== null ? value.toString() : ""}
      onValueChange={(selectedValue) => {
        const numValue = selectedValue ? Number(selectedValue) : null;
        onValueChange(numValue);
      }}
    >
      <SelectTrigger>
        <SelectValue placeholder="Selecione a cilindrada" />
      </SelectTrigger>
      <SelectContent>
        {cylindersType.map((cylinder) => (
          <SelectItem key={cylinder.id} value={cylinder.value.toString()}>
            {cylinder.title}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default CylinderSelect;
