import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from './App';

describe('App', () => {
  it('renders the App component', () => {
    render(<App />);
  
  });

  it('increments the count when the button is clicked', () => {
    render(<App />);
    
    const button = screen.getByRole('button', { name: /count is/i });
    
    fireEvent.click(button);
  });
});
