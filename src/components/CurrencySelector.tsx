// src/components/CurrencySelector.tsx
import React, { useEffect, useState } from 'react';
import { fetchAllSymbols } from '../api/marketApi';
import styled from 'styled-components';

interface CurrencySelectorProps {
  onSelect: (symbol: string) => void;
}

const Selector = styled.select`
  padding: 0.5em;
  font-size: 1em;
  margin: 0.5em 0;
`;

const CurrencySelector: React.FC<CurrencySelectorProps> = ({ onSelect }) => {
  const [symbols, setSymbols] = useState<string[]>([]);
  const [selectedSymbol, setSelectedSymbol] = useState('');

  useEffect(() => {
    const getSymbols = async () => {
      const allSymbols = await fetchAllSymbols();
      setSymbols(allSymbols);
      setSelectedSymbol(allSymbols[0]);
    };
    getSymbols();
  }, []);

  useEffect(() => {
    if (selectedSymbol) {
      onSelect(selectedSymbol);
    }
  }, [selectedSymbol, onSelect]);

  return (
    <Selector value={selectedSymbol} onChange={(e) => setSelectedSymbol(e.target.value)}>
      {symbols.map((symbol) => (
        <option key={symbol} value={symbol}>
          {symbol}
        </option>
      ))}
    </Selector>
  );
};

export default CurrencySelector;
