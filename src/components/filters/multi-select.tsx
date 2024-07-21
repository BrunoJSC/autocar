import React from "react";
import Select, { ActionMeta, MultiValue } from "react-select";

export interface OptionType {
  value: string;
  label: string;
}

interface MultiSelectProps {
  selectedOptions: OptionType[];
  onChange: (
    selected: MultiValue<OptionType>,
    actionMeta?: ActionMeta<OptionType>
  ) => void;
  options: OptionType[];
  placeholder: string;
}

const MultiSelect: React.FC<MultiSelectProps> = ({
  selectedOptions,
  onChange,
  options,
  placeholder,
}) => (
  <Select
    isMulti
    value={selectedOptions}
    onChange={(selected, actionMeta) => onChange(selected, actionMeta)}
    options={options}
    placeholder={placeholder}
    classNamePrefix="react-select"
  />
);

export default MultiSelect;
