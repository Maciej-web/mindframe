import { render, screen, fireEvent } from '@testing-library/react';
import Button from './Button';

describe('Button Component', () => {
  test('renders button with correct text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
  });

  test('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    fireEvent.click(screen.getByRole('button', { name: /click me/i }));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('renders disabled button when disabled prop is true', () => {
    render(<Button disabled>Click me</Button>);
    expect(screen.getByRole('button', { name: /click me/i })).toBeDisabled();
  });

  test('renders loading state when isLoading prop is true', () => {
    render(<Button isLoading>Click me</Button>);
    
    // Check for the loading spinner (circle SVG element)
    expect(screen.getByRole('button')).toContainElement(screen.getByText(''));
    expect(screen.getByRole('button')).toBeDisabled();
  });

  test('renders with different variants', () => {
    const { rerender } = render(<Button variant="primary">Primary</Button>);
    expect(screen.getByRole('button')).toHaveClass('bg-primary-600');
    
    rerender(<Button variant="secondary">Secondary</Button>);
    expect(screen.getByRole('button')).toHaveClass('bg-secondary-600');
    
    rerender(<Button variant="outline">Outline</Button>);
    expect(screen.getByRole('button')).toHaveClass('border-neutral-300');
  });

  test('renders with different sizes', () => {
    const { rerender } = render(<Button size="sm">Small</Button>);
    expect(screen.getByRole('button')).toHaveClass('px-3 py-1.5 text-sm');
    
    rerender(<Button size="md">Medium</Button>);
    expect(screen.getByRole('button')).toHaveClass('px-4 py-2 text-base');
    
    rerender(<Button size="lg">Large</Button>);
    expect(screen.getByRole('button')).toHaveClass('px-5 py-2.5 text-lg');
  });

  test('renders with start icon', () => {
    const startIcon = <span data-testid="start-icon">🏠</span>;
    render(<Button startIcon={startIcon}>Home</Button>);
    
    expect(screen.getByTestId('start-icon')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /home/i })).toContainElement(screen.getByTestId('start-icon'));
  });

  test('renders with end icon', () => {
    const endIcon = <span data-testid="end-icon">➡️</span>;
    render(<Button endIcon={endIcon}>Next</Button>);
    
    expect(screen.getByTestId('end-icon')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /next/i })).toContainElement(screen.getByTestId('end-icon'));
  });
});