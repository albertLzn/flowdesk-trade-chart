import React from 'react';
import { render, screen } from '@testing-library/react';
import ErrorNotification from '../ErrorNotification';

describe('ErrorNotification', () => {
  it('displays correct error message', () => {
    const errorMessage = 'ErrorTestMessage';
    render(<ErrorNotification message={errorMessage} />);
    
    const errorElement = screen.getByText(errorMessage);
    expect(errorElement).toBeInTheDocument();
    expect(errorElement).toHaveStyle('color: red');
    expect(errorElement).toHaveStyle('font-weight: bold');
  });
});