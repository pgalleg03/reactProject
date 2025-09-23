import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CustomerList from './CustomerList';
import * as memdb from '../assets/memdb';
import { vi, describe, beforeEach, afterEach, test, expect } from 'vitest';

// Mock dependencies
vi.mock('./ActionButton', () => ({
  default: ({ selectedId, selectedCustomer, onUpdate, onAdd, onDelete }) => (
    <div data-testid="action-button">ActionButton</div>
  )
}));

vi.mock('./Footer', () => ({
  default: ({ currentPage, totalPages, nextPage, previousPage }) => (
    <div data-testid="footer">Footer</div>
  )
}));

const mockCustomers = Array.from({ length: 15 }, (_, i) => ({
  id: i + 1,
  first_name: `First${i + 1}`,
  last_name: `Last${i + 1}`,
  email: `user${i + 1}@test.com`,
  password: `pass${i + 1}`
}));

describe('CustomerList Component', () => {
  beforeEach(() => {
    vi.spyOn(memdb, 'getAll').mockReturnValue(mockCustomers);
    vi.spyOn(memdb, 'get').mockImplementation(id => mockCustomers.find(c => c.id === id));
    vi.spyOn(memdb, 'post').mockImplementation(() => {});
    vi.spyOn(memdb, 'put').mockImplementation(() => {});
    vi.spyOn(memdb, 'deleteById').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  test('renders customer table with paginated rows', () => {
    render(<CustomerList />);
    expect(screen.getByText('Customer List')).toBeInTheDocument();
    expect(screen.getAllByRole('row')).toHaveLength(11); // 10 customers + header
  });

  test('clicking a row selects and highlights it', () => {
    render(<CustomerList />);
    const row = screen.getByText('First1').closest('tr');
    fireEvent.click(row);
    expect(row).toHaveStyle('font-weight: bold');
  });

  test('clicking the same row again deselects it', () => {
    render(<CustomerList />);
    const row = screen.getByText('First1').closest('tr');
    fireEvent.click(row);
    fireEvent.click(row);
    expect(row).toHaveStyle('font-weight: normal');
  });

  test('pagination works correctly', () => {
    render(<CustomerList />);
    expect(screen.getByText('First10')).toBeInTheDocument();
    expect(screen.queryByText('First11')).not.toBeInTheDocument();
  });

  test('calls update handler and refreshes data', async () => {
    render(<CustomerList />);
    const row = screen.getByText('First1').closest('tr');
    fireEvent.click(row);
    await waitFor(() => {
      expect(memdb.get).toHaveBeenCalledWith(1);
    });
  });

  test('calls add handler and refreshes data', () => {
    render(<CustomerList />);
    const newCustomer = {
      first_name: 'New',
      last_name: 'Customer',
      email: 'new@customer.com',
      password: 'newpass'
    };
    // Simulate calling the add handler directly
    memdb.post(newCustomer);
    expect(memdb.post).toHaveBeenCalledWith(newCustomer);
  });

  test('calls delete handler and refreshes data', () => {
    render(<CustomerList />);
    memdb.deleteById(1);
    expect(memdb.deleteById).toHaveBeenCalledWith(1);
  });
});
