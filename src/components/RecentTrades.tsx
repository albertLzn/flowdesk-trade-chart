import React from 'react';
import styled from 'styled-components';
import { useFetchMarketData } from '../hooks/useFetchMarketData';
import LoadingSpinner from './LoadingSpinner';
import ErrorNotification from './ErrorNotification';
import SortableTable from './SortableTable';
import FormattedNumber from './FormattedNumber';
import FormattedDate from './FormattedDate';
import Statistics from './Statistics';

interface RecentTradesProps {
  symbol: string;
}

const TradesContainer = styled.div`
  margin-top: 1em;
  max-height: 400px;
  overflow-y: auto;
  border: 1px solid #ddd;
  padding: 0.5em;
  border-radius: 5px; 
  background-color: #f9f9f9; 
`;

const ChartContainer = styled.div`
  margin-top: 2em;
`;

const RecentTrades: React.FC<RecentTradesProps> = ({ symbol }) => {
  const { marketData, loading, error } = useFetchMarketData(symbol);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorNotification message={error} />;

  const formattedTrades = marketData.recentTrades.map((trade: any) => ({
    time: <FormattedDate timestamp={trade.time} />,
    price: <FormattedNumber value={trade.price} />,
    quantity: <FormattedNumber value={trade.qty} />,
  }));

  const columns = ['time', 'price', 'quantity'];

  const tradesForChart = marketData.recentTrades.map((trade: any) => ({
    time: new Date(trade.time),
    price: parseFloat(trade.price)
  }));
  
  return (
    <>
      <ChartContainer>
        <h2>Recent Trade Statistics</h2>
        <Statistics data={tradesForChart} width={800} height={400} />
      </ChartContainer>
      <TradesContainer>
        <h2>Recent Trades Table</h2>
        <SortableTable columns={columns} data={formattedTrades} />
      </TradesContainer>
    </>
  );
};

export default RecentTrades;
