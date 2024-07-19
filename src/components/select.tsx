// ExchangeSelector.tsx

import React from "react";

interface Select {
  id: string;
  value: string;
  title: string;
}

interface SelectorProps {
  exchange: Select[];
  selectedValue: string;
  onValueChange: (value: string) => void;
}

const ExchangeSelector: React.FC<SelectorProps> = ({
  exchange,
  selectedValue,
  onValueChange,
}) => {
  return (
    <div>
      <label htmlFor="exchange">Tipo de câmbio</label>
      <select
        id="exchange"
        value={selectedValue}
        onChange={(e) => onValueChange(e.target.value)}
      >
        <option value="" disabled>
          Selecione o combustível
        </option>
        {exchange.map((item) => (
          <option key={item.id} value={item.value}>
            {item.title}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ExchangeSelector;
