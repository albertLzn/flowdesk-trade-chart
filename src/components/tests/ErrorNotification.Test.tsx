// src/components/__tests__/ErrorNotification.test.tsx

import { render, screen } from '@testing-library/react';
import ErrorNotification from '../ErrorNotification';

describe('ErrorNotification Component', () => {
  test('renders with the correct message', () => {
    const errorMessage = 'Error: Network request failed';
    render(<ErrorNotification message={errorMessage} />);

    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  test('renders with the correct styles', () => {
    const errorMessage = 'Error: Network request failed';
    render(<ErrorNotification message={errorMessage} />);

    const errorWrapper = screen.getByText(errorMessage).parentElement;
    expect(errorWrapper).toHaveStyle(`
      color: red;
      font-weight: bold;
      margin: 1em 0;
    `);
  });
});
