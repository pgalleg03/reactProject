import { render, screen, fireEvent } from '@testing-library/react';
import CustomerSearchBar from './SearchBar';

describe('CustomerSearchBar Component', () => {
  const mockSearchChange = vi.fn();

  it('renders input with correct placeholder and value', () => {
    render(<CustomerSearchBar searchTerm="Alice" onSearchChange={mockSearchChange} />);
    const input = screen.getByPlaceholderText(/search by id, first name, last name, or email/i);
    expect(input).toBeInTheDocument();
    expect(input.value).toBe('Alice');
  });

  it('calls onSearchChange when input value changes', () => {
    render(<CustomerSearchBar searchTerm="" onSearchChange={mockSearchChange} />);
    const input = screen.getByPlaceholderText(/search by id, first name, last name, or email/i);
    fireEvent.change(input, { target: { value: 'Bob' } });
    expect(mockSearchChange).toHaveBeenCalledWith('Bob');
  });

  it('renders the magnifying glass icon', () => {
    render(<CustomerSearchBar searchTerm="" onSearchChange={mockSearchChange} />);
    const icon = screen.getByTestId('search-icon');
    expect(icon).toBeInTheDocument();
  });
});
