
import { render, screen, waitFor } from '@testing-library/react';
import RecentTrades from '../RecentTrades';

jest.mock('../hooks/useFetchMarketData', () => ({
  useFetchMarketData: (symbol: string) => ({
    marketData: {
      recentTrades: [
        { time: Date.now(), price: 100.0, qty: 10 },
        { time: Date.now(), price: 105.0, qty: 15 },
        { time: Date.now(), price: 95.0, qty: 8 }
      ]
    },
    loading: false,
    error: null
  })
}));

describe('RecentTrades Component', () => {
  test('renders loading spinner initially', () => {
    jest.spyOn(require('../hooks/useFetchMarketData'), 'useFetchMarketData').mockImplementation(() => ({
      marketData: {},
      loading: true,
      error: null
    }));

    render(<RecentTrades symbol="BTC" />);
    const loadingSpinner = screen.getByTestId('loading-spinner');
    expect(loadingSpinner).toBeInTheDocument();
  });

  test('renders error notification if there is an error', async () => {
    jest.spyOn(require('../hooks/useFetchMarketData'), 'useFetchMarketData').mockImplementation(() => ({
      marketData: {},
      loading: false,
      error: 'Failed to fetch data'
    }));

    render(<RecentTrades symbol="BTC" />);
    const errorNotification = await screen.findByText('Failed to fetch data');
    expect(errorNotification).toBeInTheDocument();
  });

  test('renders recent trades table and statistics chart after loading', async () => {
    render(<RecentTrades symbol="BTC" />);

    const recentTradesTable = await screen.findByText('Recent Trades');
    expect(recentTradesTable).toBeInTheDocument();

    const recentTradeStatistics = await screen.findByText('Recent Trade Statistics');
    expect(recentTradeStatistics).toBeInTheDocument();
  });
});
