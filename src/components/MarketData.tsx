// src/components/MarketData.tsx
import React from 'react';
import styled from 'styled-components';
import { useFetchMarketData } from '../hooks/useFetchMarketData';
import LoadingSpinner from './LoadingSpinner';
import ErrorNotification from './ErrorNotification';
import FormattedNumber from './FormattedNumber';

interface MarketDataProps {
  symbol: string;
}

const DataContainer = styled.div`
  margin: 1em 0;
`;

const DataRow = styled.div`
  margin-bottom: 0.5em;
  font-size: 1em;
`;

const MarketData: React.FC<MarketDataProps> = ({ symbol }) => {
  const { marketData, loading, error } = useFetchMarketData(symbol);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorNotification message={error} />;

  return (
    <DataContainer>
      <DataRow>
        <strong>Last Price:</strong> <FormattedNumber value={marketData.tickerPrice?.price} />
      </DataRow>
      <DataRow>
        <strong>24h Change:</strong> <FormattedNumber value={marketData.ticker24h?.priceChangePercent} decimals={2} />%
      </DataRow>
      <DataRow>
        <strong>24h Volume:</strong> <FormattedNumber value={marketData.ticker24h?.volume} />
      </DataRow>
    </DataContainer>
  );
};

export default MarketData;
