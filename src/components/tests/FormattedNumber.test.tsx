// src/components/tests/FormattedNumber.test.tsx

import React from 'react';
import { render, screen } from '@testing-library/react';
import FormattedNumber from '../FormattedNumber';

describe('FormattedNumber Component', () => {
  test('renders with the correct formatted number', () => {
    const value = 12345.6789;
    const decimals = 2;
    render(<FormattedNumber value={value} decimals={decimals} />);
    
    // Example: Get the span element that should contain the formatted number
    const formattedNumberElement = screen.getByTestId('formatted-number');
    
    // Extract the text content from the span
    const formattedText = formattedNumberElement.textContent;
    
    // Assert that the formatted text matches the expected format
    expect(formattedText).toContain('12,345.68'); // Adjust based on your formatNumber function

    // Alternatively, you can directly match the entire text content
    // expect(formattedText).toBe('12,345.68');
  });
});
