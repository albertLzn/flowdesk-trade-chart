// src/components/tests/App.test.tsx

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

// Mocking the CurrencySelector component to simulate user interaction
jest.mock('./components/CurrencySelector', () => ({
  __esModule: true,
  default: function MockCurrencySelector({ onSelect }: { onSelect: (symbol: string) => void }) {
    return (
      <select data-testid="currency-selector" onChange={(e) => onSelect(e.target.value)}>
        <option value="BTCUSDT">BTCUSDT</option>
        <option value="ETHUSDT">ETHUSDT</option>
      </select>
    );
  },
}));

// Mocking the MarketData component
jest.mock('./components/MarketData', () => ({
  __esModule: true,
  default: function MockMarketData({ symbol }: { symbol: string }) {
    return <div data-testid="mock-market-data">{symbol}</div>;
  },
}));

// Mocking the RecentTrades component
jest.mock('./components/RecentTrades', () => ({
  __esModule: true,
  default: function MockRecentTrades({ symbol }: { symbol: string }) {
    return <div data-testid="mock-recent-trades">{symbol}</div>;
  },
}));

describe('App Component', () => {
  test('renders App component with initial BTCUSDT symbol', () => {
    render(<App />);
    
    // Expectations for initial rendering with BTCUSDT selected
    expect(screen.getByText('BTCUSDT')).toBeInTheDocument(); // MarketData
    expect(screen.getByText('BTCUSDT')).toBeInTheDocument(); // RecentTrades
  });

  test('changes symbol when CurrencySelector changes', () => {
    render(<App />);

    // Change the selected currency to ETHUSDT
    fireEvent.change(screen.getByTestId('currency-selector'), { target: { value: 'ETHUSDT' } });

    // Expectations after selecting ETHUSDT
    expect(screen.getByText('ETHUSDT')).toBeInTheDocument(); // MarketData
    expect(screen.getByText('ETHUSDT')).toBeInTheDocument(); // RecentTrades
  });
});
