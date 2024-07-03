import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import FormattedNumber from '../FormattedNumber';
import { formatNumber } from '../../utils/helpers';

jest.mock('../../utils/helpers', () => ({
  formatNumber: jest.fn((value, decimals) => `Formatted: ${value}, Decimals: ${decimals}`),
}));

describe('FormattedNumber Component', () => {
  it('renders formatted number with default decimals', () => {
    render(<FormattedNumber value={1000} />);
    expect(screen.getByText('Formatted: 1000, Decimals: 2')).toBeInTheDocument();
  });

  it('renders formatted number with custom decimals', () => {
    render(<FormattedNumber value={1000} decimals={3} />);
    expect(screen.getByText('Formatted: 1000, Decimals: 3')).toBeInTheDocument();
  });

  it('calls formatNumber with correct value and decimals', () => {
    render(<FormattedNumber value={1000} decimals={3} />);
    expect(formatNumber).toHaveBeenCalledWith(1000, 3);
  });

  it('handles string values', () => {
    render(<FormattedNumber value="1000" />);
    expect(screen.getByText('Formatted: 1000, Decimals: 2')).toBeInTheDocument();
  });
});