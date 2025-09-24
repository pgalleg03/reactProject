import { render, screen } from '@testing-library/react';
import AddLogo from './AddLogo';

describe('AddLogo Component', () => {
  it('renders the logo image with correct attributes', () => {
    render(<AddLogo />);
    const logoImg = screen.getByAltText('Logo');
    expect(logoImg).toBeInTheDocument();
    expect(logoImg).toHaveAttribute('src', expect.stringContaining('logo.png'));
    expect(logoImg).toHaveStyle({ width: '150px' });
  });

  it('wraps the image in a styled div', () => {
    render(<AddLogo />);
    const wrapperDiv = screen.getByAltText('Logo').parentElement;
    expect(wrapperDiv).toHaveStyle({ textAlign: 'left', padding: '20px' });
  });
});
