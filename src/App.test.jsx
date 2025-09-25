import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import { describe, test, expect } from 'vitest';

// Mock CustomerList to isolate App testing
vi.mock('./components/CustomerList', () => ({
  default: () => <div data-testid="customer-list">CustomerList Component</div>
}));

test('renders header and login form initially', () => {
  render(<App />);
  expect(screen.getByText('Customer Management System')).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: /login/i })).toBeInTheDocument(); // h2
  expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument(); // button
});


  test('shows error on invalid login', () => {
    render(<App />);
    fireEvent.change(screen.getByLabelText(/username/i), {
      target: { value: 'wrong' },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'credentials' },
    });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));
    expect(screen.getByText('Invalid username or password')).toBeInTheDocument();
  });

  test('logs in and renders CustomerList', async () => {
    render(<App />);
    fireEvent.change(screen.getByLabelText(/username/i), {
      target: { value: 'admin' },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'admin' },
    });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));
    expect(await screen.findByTestId('customer-list')).toBeInTheDocument();
  });

  test('has correct structure and class names', () => {
    render(<App />);
    expect(screen.getByRole('banner')).toHaveClass('App-header');
    expect(screen.getByRole('main')).toBeInTheDocument();
  });

