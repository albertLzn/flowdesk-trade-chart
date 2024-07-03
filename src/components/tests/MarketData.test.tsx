import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import MarketData from '../MarketData';
import { useFetchMarketData } from '../../hooks/useFetchMarketData';

jest.mock('../../hooks/useFetchMarketData');
jest.mock('../LoadingSpinner', () => () => <div data-testid="loading-spinner">Loading...</div>);
jest.mock('../ErrorNotification', () => ({ message }: { message: string }) => <div data-testid="error-notification">{message}</div>);
jest.mock('../FormattedNumber', () => ({ value, decimals }: { value: number | string, decimals?: number }) => (
  <span data-testid="formatted-number">
    {typeof value === 'number' ? value.toFixed(decimals || 2) : value}
  </span>
));

describe('MarketData Component', () => {
  const mockMarketData = {
    tickerPrice: { price: '50000.12' },
    ticker24h: {
      priceChangePercent: '5.23',
      volume: '1000000'
    }
  };

  beforeEach(() => {
    (useFetchMarketData as jest.Mock).mockClear();
  });

  it('renders loading spinner when loading', () => {
    (useFetchMarketData as jest.Mock).mockReturnValue({ loading: true, error: null, marketData: null });
    render(<MarketData symbol="BTCUSDT" />);
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
  });

  it('renders error notification when there is an error', () => {
    (useFetchMarketData as jest.Mock).mockReturnValue({ loading: false, error: 'Error message', marketData: null });
    render(<MarketData symbol="BTCUSDT" />);
    expect(screen.getByTestId('error-notification')).toBeInTheDocument();
    expect(screen.getByText('Error message')).toBeInTheDocument();
  });

  it('renders market data when loaded successfully', () => {
    (useFetchMarketData as jest.Mock).mockReturnValue({ loading: false, error: null, marketData: mockMarketData });
    render(<MarketData symbol="BTCUSDT" />);
    
    expect(screen.getByText('Last Price:')).toBeInTheDocument();
    expect(screen.getByText('24h Change:')).toBeInTheDocument();
    expect(screen.getByText('24h Volume:')).toBeInTheDocument();

    const formattedNumbers = screen.getAllByTestId('formatted-number');
    expect(formattedNumbers).toHaveLength(3);
    expect(formattedNumbers[0]).toHaveTextContent('50000.12');
    expect(formattedNumbers[1]).toHaveTextContent('5.23');
    expect(formattedNumbers[2]).toHaveTextContent('1000000');
  });

  it('calls useFetchMarketData with correct symbol', () => {
    (useFetchMarketData as jest.Mock).mockReturnValue({ loading: false, error: null, marketData: mockMarketData });
    render(<MarketData symbol="ETHUSDT" />);
    expect(useFetchMarketData).toHaveBeenCalledWith('ETHUSDT');
  });
});