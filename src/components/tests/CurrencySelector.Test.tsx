import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import CurrencySelector from '../CurrencySelector';
import { fetchAllSymbols } from '../../api/marketApi';

jest.mock('../../api/marketApi');

describe('CurrencySelector', () => {
  const mockSymbols = ['USD', 'EUR', 'GBP'];
  const mockOnSelect = jest.fn();

  beforeEach(() => {
    (fetchAllSymbols as jest.Mock).mockResolvedValue(mockSymbols);
  });

  it('Load and display symbols correctly', async () => {
    render(<CurrencySelector onSelect={mockOnSelect} />);

    await waitFor(() => {
      mockSymbols.forEach(symbol => {
        expect(screen.getByText(symbol)).toBeInTheDocument();
      });
    });
  });

  it('calls onSelect method with correct symbol', async () => {
    render(<CurrencySelector onSelect={mockOnSelect} />);

    await waitFor(() => {
      expect(mockOnSelect).toHaveBeenCalledWith(mockSymbols[0]);
    });
  });


  it('apply styles to selector', async () => {
    render(<CurrencySelector onSelect={mockOnSelect} />);

    const select = await screen.findByRole('combobox');
    expect(select).toHaveStyle('padding: 0.5em');
    expect(select).toHaveStyle('font-size: 1em');
    expect(select).toHaveStyle('margin: 0.5em 0');
  });
});