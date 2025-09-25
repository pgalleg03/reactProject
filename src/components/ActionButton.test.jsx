import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ActionButton from './ActionButton';
import { vi, describe, test, expect } from 'vitest';

// Mock child components
vi.mock('./FormPopUp', () => ({
  default: ({ children, onClose }) => (
    <div data-testid="modal">
      <button onClick={onClose}>Close</button>
      {children}
    </div>
  )
}));

vi.mock('./AddCustomerForm', () => ({
  default: ({ onCancel, onSubmit }) => (
    <div data-testid="add-form">
      <button onClick={() => onSubmit({ first_name: 'New' })}>Submit Add</button>
      <button onClick={onCancel}>Cancel Add</button>
    </div>
  )
}));

vi.mock('./UpdateCustomerForm', () => ({
  default: ({ selectedCustomer, onCancel, onSubmit }) => (
    <div data-testid="update-form">
      <button onClick={() => onSubmit({ first_name: 'Updated' })}>Submit Update</button>
      <button onClick={onCancel}>Cancel Update</button>
    </div>
  )
}));

describe('ActionButton Component', () => {
  test('renders Add button when no customer is selected', () => {
    render(<ActionButton selectedId={null} selectedCustomer={null} />);
    expect(screen.getByText('Add')).toBeInTheDocument();
    expect(screen.queryByText('Delete')).not.toBeInTheDocument();
  });

  test('renders Update and Delete buttons when customer is selected', () => {
    render(<ActionButton selectedId={1} selectedCustomer={{ id: 1 }} />);
    expect(screen.getByText('Update')).toBeInTheDocument();
    expect(screen.getByText('Delete')).toBeInTheDocument();
  });

  test('opens AddCustomerForm modal on Add click', () => {
    render(<ActionButton selectedId={null} selectedCustomer={null} />);
    fireEvent.click(screen.getByText('Add'));
    expect(screen.getByTestId('modal')).toBeInTheDocument();
    expect(screen.getByTestId('add-form')).toBeInTheDocument();
  });

  test('opens UpdateCustomerForm modal on Update click', () => {
    render(<ActionButton selectedId={1} selectedCustomer={{ id: 1 }} />);
    fireEvent.click(screen.getByText('Update'));
    expect(screen.getByTestId('modal')).toBeInTheDocument();
    expect(screen.getByTestId('update-form')).toBeInTheDocument();
  });

  test('calls onDelete when Delete is clicked', () => {
    const onDelete = vi.fn();
    render(<ActionButton selectedId={1} selectedCustomer={{ id: 1 }} onDelete={onDelete} />);
    fireEvent.click(screen.getByText('Delete'));
    expect(onDelete).toHaveBeenCalledWith(1);
  });

  test('calls onAdd and closes modal on Add form submit', () => {
    const onAdd = vi.fn();
    render(<ActionButton selectedId={null} selectedCustomer={null} onAdd={onAdd} />);
    fireEvent.click(screen.getByText('Add'));
    fireEvent.click(screen.getByText('Submit Add'));
    expect(onAdd).toHaveBeenCalledWith({ first_name: 'New' });
    expect(screen.queryByTestId('modal')).not.toBeInTheDocument();
  });

  test('calls onUpdate and closes modal on Update form submit', () => {
    const onUpdate = vi.fn();
    render(<ActionButton selectedId={1} selectedCustomer={{ id: 1 }} onUpdate={onUpdate} />);
    fireEvent.click(screen.getByText('Update'));
    fireEvent.click(screen.getByText('Submit Update'));
    expect(onUpdate).toHaveBeenCalledWith(1, { first_name: 'Updated' });
    expect(screen.queryByTestId('modal')).not.toBeInTheDocument();
  });
});
