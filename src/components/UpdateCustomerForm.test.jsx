import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import UpdateCustomerForm from './UpdateCustomerForm';
import { vi, describe, test, expect } from 'vitest';

const mockCustomer = {
  first_name: 'Alice',
  last_name: 'Smith',
  email: 'alice@example.com',
  password: 'secure123'
};

describe('UpdateCustomerForm Component', () => {
  test('renders form with pre-filled customer data', () => {
    render(<UpdateCustomerForm selectedCustomer={mockCustomer} onCancel={() => {}} onSubmit={() => {}} />);
    
    expect(screen.getByLabelText(/First Name/i)).toHaveValue('Alice');
    expect(screen.getByLabelText(/Last Name/i)).toHaveValue('Smith');
    expect(screen.getByLabelText(/Email/i)).toHaveValue('alice@example.com');
    expect(screen.getByLabelText(/Password/i)).toHaveValue('secure123');
  });

  test('updates form state on input change', () => {
    render(<UpdateCustomerForm selectedCustomer={mockCustomer} onCancel={() => {}} onSubmit={() => {}} />);
    
    const firstNameInput = screen.getByLabelText(/First Name/i);
    fireEvent.change(firstNameInput, { target: { value: 'Bob' } });
    expect(firstNameInput.value).toBe('Bob');
  });

  test('calls onSubmit with updated data when Save Changes is clicked', () => {
    const handleSubmit = vi.fn();
    render(<UpdateCustomerForm selectedCustomer={mockCustomer} onCancel={() => {}} onSubmit={handleSubmit} />);
    
    fireEvent.change(screen.getByLabelText(/Last Name/i), { target: { value: 'Johnson' } });
    fireEvent.click(screen.getByText(/Save Changes/i));

    expect(handleSubmit).toHaveBeenCalledWith({
      first_name: 'Alice',
      last_name: 'Johnson',
      email: 'alice@example.com',
      password: 'secure123'
    });
  });

  test('calls onCancel when Cancel is clicked', () => {
    const handleCancel = vi.fn();
    render(<UpdateCustomerForm selectedCustomer={mockCustomer} onCancel={handleCancel} onSubmit={() => {}} />);
    
    fireEvent.click(screen.getByText(/Cancel/i));
    expect(handleCancel).toHaveBeenCalled();
  });
});
