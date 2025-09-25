import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import { describe, test, expect, vi } from 'vitest';

// Mock CustomerList
vi.mock('./components/CustomerList', () => ({
  default: () => <div data-testid="customer-list">CustomerList Component</div>
}));

// Mock Login
vi.mock('./components/login', () => ({
  default: ({ onLogin }) => (
    <div>
      <h2>Login</h2>
      <form onSubmit={(e) => { e.preventDefault(); onLogin(); }}>
        <label>
          Username:
          <input type="text" />
        </label>
        <label>
          Password:
          <input type="password" />
        </label>
        <button type="submit">Login</button>
      </form>
    </div>
  )
}));

describe('App Component', () => {
  test('renders header and login form initially', () => {
    render(<App />);
    expect(screen.getByText('Customer Management System')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /login/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  test('logs in and renders CustomerList', async () => {
    render(<App />);
    fireEvent.click(screen.getByRole('button', { name: /login/i }));
    expect(await screen.findByTestId('customer-list')).toBeInTheDocument();
  });

  test('has correct structure and class names', () => {
    render(<App />);
    expect(screen.getByRole('banner')).toHaveClass('App-header');
    expect(screen.getByRole('main')).toBeInTheDocument();
  });
});
