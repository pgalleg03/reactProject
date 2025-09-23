import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { vi, describe, test, expect } from 'vitest';

// Mock CustomerList to isolate App testing
vi.mock('./components/CustomerList', () => ({
  default: () => <div data-testid="customer-list">CustomerList Component</div>
}));

describe('App Component', () => {
  test('renders header and main content', () => {
    render(<App />);
    expect(screen.getByText('Customer Management System')).toBeInTheDocument();
    expect(screen.getByTestId('customer-list')).toBeInTheDocument();
  });

  test('has correct structure and class names', () => {
    render(<App />);
    expect(screen.getByRole('banner')).toHaveClass('App-header');
    expect(screen.getByRole('main')).toBeInTheDocument();
  });
});
