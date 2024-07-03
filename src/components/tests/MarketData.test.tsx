
import { render, screen } from '@testing-library/react';
import MarketData from '../MarketData';

const mockMarketData = {
  tickerPrice: { price: 100 },
  ticker24h: { priceChangePercent: 5, volume: 200 },
};

jest.mock('../hooks/useFetchMarketData', () => ({
  useFetchMarketData: (symbol: string) => ({
    marketData: mockMarketData,
    loading: false,
    error: null,
  }),
}));

describe('MarketData Component', () => {
  test('renders without crashing', () => {
    render(<MarketData symbol="BTC" />);
    expect(screen.getByText('Last Price:')).toBeInTheDocument();
    expect(screen.getByText('24h Change:')).toBeInTheDocument();
    expect(screen.getByText('24h Volume:')).toBeInTheDocument();
  });

  test('renders data correctly', () => {
    render(<MarketData symbol="BTC" />);
    expect(screen.getByText('Last Price:')).toHaveTextContent('100');
    expect(screen.getByText('24h Change:')).toHaveTextContent('5%');
    expect(screen.getByText('24h Volume:')).toHaveTextContent('200');
  });

  test('does not render loading spinner', () => {
    render(<MarketData symbol="BTC" />);
    expect(screen.queryByTestId('loading-spinner')).toBeNull();
  });

  test('does not render error notification', () => {
    render(<MarketData symbol="BTC" />);
    expect(screen.queryByTestId('error-notification')).toBeNull();
  });
});
