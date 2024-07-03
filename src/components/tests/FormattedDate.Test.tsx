import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import FormattedDate from '../FormattedDate';
import { formatDate } from '../../utils/helpers';

describe('FormattedDate Component', () => {
  it('renders formatted date', () => {
    const testTimestamp = 1625097600000;
    const formattedDateString = formatDate(testTimestamp);
    
    render(<FormattedDate timestamp={testTimestamp} />);
    
    expect(screen.getByText(formattedDateString)).toBeInTheDocument();
  });
});