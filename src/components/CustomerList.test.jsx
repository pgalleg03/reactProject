import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import CustomerList from './CustomerList';
import * as memdb from '../assets/memdb';

// Mock data
const mockCustomers = [
  { id: 1, first_name: 'Alice', last_name: 'Smith', email: 'alice@example.com', password: 'pass1' },
  { id: 2, first_name: 'Bob', last_name: 'Jones', email: 'bob@example.com', password: 'pass2' },
];

// Mock implementations
vi.mock('../assets/memdb', () => ({
  getAll: vi.fn(),
  get: vi.fn(),
  deleteById: vi.fn(),
  post: vi.fn(),
  put: vi.fn(),
}));

afterEach(() => {
  vi.clearAllMocks();
});


describe('CustomerList Component', () => {
  beforeEach(() => {
    memdb.getAll.mockResolvedValue(mockCustomers);
    memdb.get.mockResolvedValue(mockCustomers[0]);
    memdb.deleteById.mockResolvedValue({});
    memdb.post.mockResolvedValue({});
    memdb.put.mockResolvedValue({});
  });

  it('renders customer list table', async () => {
    render(<CustomerList />);
    await waitFor(() => {
      expect(screen.getByText('Customer List')).toBeInTheDocument();
      expect(screen.getByText('Alice')).toBeInTheDocument();
      expect(screen.getByText('Bob')).toBeInTheDocument();
    });
  });

  it('filters customers by search term', async () => {
    render(<CustomerList />);
    await waitFor(() => screen.getByText('Alice'));
    fireEvent.change(screen.getByPlaceholderText(/search/i), {
      target: { value: 'bob' },
    });
    expect(screen.queryByText('Alice')).not.toBeInTheDocument();
    expect(screen.getByText('Bob')).toBeInTheDocument();
  });

  it('selects and deselects a customer row', async () => {
    render(<CustomerList />);
    await waitFor(() => screen.getByText('Alice'));
    const row = screen.getByText('Alice').closest('tr');
    fireEvent.click(row);
    expect(row).toHaveStyle('font-weight: bold');
    fireEvent.click(row);
    expect(row).toHaveStyle('font-weight: normal');
  });

  it('calls delete handler and refreshes data', async () => {
    render(<CustomerList />);
    await waitFor(() => screen.getByText('Alice'));
    const row = screen.getByText('Alice').closest('tr');
    fireEvent.click(row);
    const deleteButton = screen.getByText(/delete/i);
    fireEvent.click(deleteButton);
    await waitFor(() => {
      expect(memdb.deleteById).toHaveBeenCalledWith(1);
      expect(memdb.getAll).toHaveBeenCalledTimes(2); // initial + after delete
    });
  });

  it('navigates between pages', async () => {
    const manyCustomers = Array.from({ length: 25 }, (_, i) => ({
      id: i + 1,
      first_name: `First${i + 1}`,
      last_name: `Last${i + 1}`,
      email: `user${i + 1}@example.com`,
      password: `pass${i + 1}`,
    }));
    memdb.getAll.mockResolvedValue(manyCustomers);
    render(<CustomerList />);
    await waitFor(() => screen.getByText('First1'));
    fireEvent.click(screen.getByText('>'));
    expect(screen.getByText('First11')).toBeInTheDocument();
    fireEvent.click(screen.getByText('<'));
    expect(screen.getByText('First1')).toBeInTheDocument();
  });
});
