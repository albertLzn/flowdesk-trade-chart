import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import FormattedNumber from '../FormattedNumber';
import { formatNumber } from '../../utils/helpers';

describe('FormattedNumber Component', () => {
  it('renders formatted number with default decimals', () => {
    render(<FormattedNumber value={1000} />);
    expect(screen.getByText('1000.00')).toBeInTheDocument();
  });
});