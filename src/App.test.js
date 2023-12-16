import { render, screen } from '@testing-library/react';
import App from './App';

test('renders ArcStore App title', () => {
  render(<App />);
  const titleElement = screen.getByText(/ArcStore App/i);
  expect(titleElement).toBeInTheDocument();
});
