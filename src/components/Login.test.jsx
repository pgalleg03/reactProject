import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import Login from './Login.jsx';

describe('Login Component', () => {
  const mockLogin = vi.fn();

  beforeEach(() => {
    mockLogin.mockClear();
  });
  
it('renders login form with inputs and button', () => {
  render(<Login onLogin={mockLogin} />);
  expect(screen.getByRole('heading', { name: /login/i })).toBeInTheDocument();
  expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
});


  it('updates username and password fields', () => {
    render(<Login onLogin={mockLogin} />);
    const usernameInput = screen.getByLabelText(/username/i);
    const passwordInput = screen.getByLabelText(/password/i);

    fireEvent.change(usernameInput, { target: { value: 'admin' } });
    fireEvent.change(passwordInput, { target: { value: 'admin' } });

    expect(usernameInput.value).toBe('admin');
    expect(passwordInput.value).toBe('admin');
  });

  it('calls onLogin on correct credentials', () => {
    render(<Login onLogin={mockLogin} />);
    fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'admin' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'admin' } });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    expect(mockLogin).toHaveBeenCalled();
    expect(screen.queryByText(/invalid username or password/i)).not.toBeInTheDocument();
  });

  it('shows error message on incorrect credentials', () => {
    render(<Login onLogin={mockLogin} />);
    fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'user' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'wrong' } });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    expect(mockLogin).not.toHaveBeenCalled();
    expect(screen.getByText(/invalid username or password/i)).toBeInTheDocument();
  });
});
