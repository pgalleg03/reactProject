import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AddCustomerForm from './AddCustomerForm';
import { vi, describe, test, expect } from 'vitest';

describe('AddCustomerForm Component', () => {
  test('renders form fields and buttons', () => {
    render(<AddCustomerForm onCancel={() => {}} onSubmit={() => {}} />);
    
    expect(screen.getByLabelText(/First Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Last Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByText(/Save/i)).toBeInTheDocument();
    expect(screen.getByText(/Cancel/i)).toBeInTheDocument();
  });

  test('updates form state on input change', () => {
    render(<AddCustomerForm onCancel={() => {}} onSubmit={() => {}} />);
    
    const firstNameInput = screen.getByLabelText(/First Name/i);
    fireEvent.change(firstNameInput, { target: { value: 'John' } });
    expect(firstNameInput.value).toBe('John');

    const emailInput = screen.getByLabelText(/Email/i);
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
    expect(emailInput.value).toBe('john@example.com');
  });

  test('calls onSubmit with form data when Save is clicked', () => {
    const handleSubmit = vi.fn();
    render(<AddCustomerForm onCancel={() => {}} onSubmit={handleSubmit} />);

    fireEvent.change(screen.getByLabelText(/First Name/i), { target: { value: 'Jane' } });
    fireEvent.change(screen.getByLabelText(/Last Name/i), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'jane@example.com' } });
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'securepass' } });

    fireEvent.click(screen.getByText(/Save/i));

    expect(handleSubmit).toHaveBeenCalledWith({
      first_name: 'Jane',
      last_name: 'Doe',
      email: 'jane@example.com',
      password: 'securepass',
    });
  });

  test('calls onCancel when Cancel is clicked', () => {
    const handleCancel = vi.fn();
    render(<AddCustomerForm onCancel={handleCancel} onSubmit={() => {}} />);
    
    fireEvent.click(screen.getByText(/Cancel/i));
    expect(handleCancel).toHaveBeenCalled();
  });
});
