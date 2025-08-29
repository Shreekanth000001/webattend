import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from './App';

describe('App', () => {
  it('renders the App component', () => {
    render(<App />);
    
    expect(screen.getByText('count is 0')).toBeInTheDocument();
  });

  it('increments the count when the button is clicked', () => {
    render(<App />);
    
    const button = screen.getByRole('button', { name: /count is/i });
    
    fireEvent.click(button);
    
    expect(screen.getByText('count is 1')).toBeInTheDocument();
  });
});
