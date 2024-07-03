import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import RecentTrades from '../RecentTrades';
import { useFetchMarketData } from '../../hooks/useFetchMarketData';

// Mock des dépendances
jest.mock('../../hooks/useFetchMarketData');
jest.mock('../LoadingSpinner', () => () => <div data-testid="loading-spinner">Loading...</div>);
jest.mock('../ErrorNotification', () => ({ message }: { message: string }) => <div data-testid="error-notification">{message}</div>);
jest.mock('../SortableTable', () => ({ columns, data }: { columns: string[], data: any[] }) => (
  <div data-testid="sortable-table">
    <span>Columns: {columns.join(', ')}</span>
    <span>Rows: {data.length}</span>
  </div>
));
jest.mock('../Statistics', () => ({ data }: { data: any[] }) => (
  <div data-testid="statistics">
    <span>Data points: {data.length}</span>
  </div>
));

describe('RecentTrades Component', () => {
  const mockMarketData = {
    recentTrades: [
      { time: 1625097600000, price: '100', qty: '10' },
      { time: 1625184000000, price: '101', qty: '20' },
    ],
  };

  beforeEach(() => {
    (useFetchMarketData as jest.Mock).mockClear();
  });

  it('renders loading spinner when loading', () => {
    (useFetchMarketData as jest.Mock).mockReturnValue({ loading: true, error: null, marketData: null });
    render(<RecentTrades symbol="BTCUSDT" />);
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
  });

  it('renders error notification when there is an error', () => {
    (useFetchMarketData as jest.Mock).mockReturnValue({ loading: false, error: 'Error message', marketData: null });
    render(<RecentTrades symbol="BTCUSDT" />);
    expect(screen.getByTestId('error-notification')).toBeInTheDocument();
    expect(screen.getByText('Error message')).toBeInTheDocument();
  });

  it('renders recent trades data when loaded successfully', () => {
    (useFetchMarketData as jest.Mock).mockReturnValue({ loading: false, error: null, marketData: mockMarketData });
    render(<RecentTrades symbol="BTCUSDT" />);
    
    expect(screen.getByText('Recent Trade Statistics')).toBeInTheDocument();
    expect(screen.getByTestId('statistics')).toBeInTheDocument();
    expect(screen.getByText('Data points: 2')).toBeInTheDocument();

    expect(screen.getByText('Recent Trades Table')).toBeInTheDocument();
    expect(screen.getByTestId('sortable-table')).toBeInTheDocument();
    expect(screen.getByText('Columns: time, price, quantity')).toBeInTheDocument();
    expect(screen.getByText('Rows: 2')).toBeInTheDocument();
  });

  it('calls useFetchMarketData with correct symbol', () => {
    (useFetchMarketData as jest.Mock).mockReturnValue({ loading: false, error: null, marketData: mockMarketData });
    render(<RecentTrades symbol="ETHUSDT" />);
    expect(useFetchMarketData).toHaveBeenCalledWith('ETHUSDT');
  });
});