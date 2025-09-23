import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import FormPopUp from './FormPopUp';
import { vi, describe, test, expect } from 'vitest';

describe('FormPopUp Component', () => {
  test('renders children inside modal', () => {
    render(
      <FormPopUp onClose={() => {}}>
        <div data-testid="modal-content">Hello Modal</div>
      </FormPopUp>
    );
    expect(screen.getByTestId('modal-content')).toBeInTheDocument();
  });

  test('calls onClose when overlay is clicked', () => {
    const handleClose = vi.fn();
    render(
      <FormPopUp onClose={handleClose}>
        <div>Modal Body</div>
      </FormPopUp>
    );
    const overlay = screen.getByText('Modal Body').parentElement.parentElement;
    fireEvent.click(overlay);
    expect(handleClose).toHaveBeenCalled();
  });

  test('does not call onClose when modal content is clicked', () => {
    const handleClose = vi.fn();
    render(
      <FormPopUp onClose={handleClose}>
        <div>Modal Body</div>
      </FormPopUp>
    );
    const content = screen.getByText('Modal Body');
    fireEvent.click(content);
    expect(handleClose).not.toHaveBeenCalled();
  });
});
