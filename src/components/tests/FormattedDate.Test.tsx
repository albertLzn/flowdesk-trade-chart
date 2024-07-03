import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import FormattedDate from '../FormattedDate';
import { formatDate } from '../../utils/helpers';

jest.mock('../../utils/helpers', () => ({
  formatDate: jest.fn((timestamp) => `Formatted: ${timestamp}`),
}));

describe('FormattedDate Component', () => {
  it('renders formatted date', () => {
    const testTimestamp = 1625097600000; // July 1, 2021
    render(<FormattedDate timestamp={testTimestamp} />);
    expect(screen.getByText(`Formatted: ${testTimestamp}`)).toBeInTheDocument();
  });

  it('calls formatDate with correct timestamp', () => {
    const testTimestamp = 1625097600000; // July 1, 2021
    render(<FormattedDate timestamp={testTimestamp} />);
    expect(formatDate).toHaveBeenCalledWith(testTimestamp);
  });
});