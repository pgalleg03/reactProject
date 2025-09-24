import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import Footer from './Footer';

describe('Footer Component', () => {
  const mockNextPage = vi.fn();
  const mockPreviousPage = vi.fn();

  it('renders current page and total pages', () => {
    render(
      <Footer
        currentPage={2}
        totalPages={5}
        nextPage={mockNextPage}
        previousPage={mockPreviousPage}
      />
    );
    expect(screen.getByText('Page 2 of 5')).toBeInTheDocument();
  });

  it('disables previous button on first page', () => {
    render(
      <Footer
        currentPage={1}
        totalPages={5}
        nextPage={mockNextPage}
        previousPage={mockPreviousPage}
      />
    );
    expect(screen.getByText('<')).toBeDisabled();
    expect(screen.getByText('>')).not.toBeDisabled();
  });

  it('disables next button on last page', () => {
    render(
      <Footer
        currentPage={5}
        totalPages={5}
        nextPage={mockNextPage}
        previousPage={mockPreviousPage}
      />
    );
    expect(screen.getByText('>')).toBeDisabled();
    expect(screen.getByText('<')).not.toBeDisabled();
  });

  it('calls nextPage and previousPage handlers', () => {
    render(
      <Footer
        currentPage={3}
        totalPages={5}
        nextPage={mockNextPage}
        previousPage={mockPreviousPage}
      />
    );
    fireEvent.click(screen.getByText('<'));
    fireEvent.click(screen.getByText('>'));
    expect(mockPreviousPage).toHaveBeenCalled();
    expect(mockNextPage).toHaveBeenCalled();
  });

  it('displays copyright and disclaimer', () => {
    render(
      <Footer
        currentPage={1}
        totalPages={1}
        nextPage={mockNextPage}
        previousPage={mockPreviousPage}
      />
    );
    expect(screen.getByText(/Customer Management System/i)).toBeInTheDocument();
    expect(screen.getByText(/Unauthorized access or distribution is prohibited/i)).toBeInTheDocument();
  });
});
