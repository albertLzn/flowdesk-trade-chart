// src/components/tests/CurrencySelector.test.tsx
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CurrencySelector from '../CurrencySelector';
import { fetchAllSymbols } from '../../api/marketApi';

// Mock de l'API fetchAllSymbols
jest.mock('../../api/marketApi', () => ({
  fetchAllSymbols: jest.fn(),
}));

describe('CurrencySelector Component', () => {
  beforeEach(() => {
    // Mock la réponse de fetchAllSymbols
    (fetchAllSymbols as jest.Mock).mockResolvedValue(['USD', 'EUR', 'JPY']);
  });

  test('renders without crashing', async () => {
    render(<CurrencySelector onSelect={() => {}} />);
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  test('displays currency options correctly', async () => {
    render(<CurrencySelector onSelect={() => {}} />);
    const options = await screen.findAllByRole('option');
    expect(options).toHaveLength(3); // USD, EUR, JPY
    expect(options[0]).toHaveTextContent('USD');
    expect(options[1]).toHaveTextContent('EUR');
    expect(options[2]).toHaveTextContent('JPY');
  });

  test('calls onSelect when an option is selected', async () => {
    const mockOnSelect = jest.fn();
    render(<CurrencySelector onSelect={mockOnSelect} />);

    await waitFor(() => screen.getByText('USD'));

    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'EUR' } });
    expect(mockOnSelect).toHaveBeenCalledWith('EUR');
  });
});
