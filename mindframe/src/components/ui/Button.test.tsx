import { render, screen, fireEvent } from '@testing-library/react';
import Button from './Button';

describe('Button Component', () => {
  // Grundlegende Rendering-Tests
  test('rendert Button mit korrektem Text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
  });

  // Klick-Handler-Test
  test('ruft onClick auf, wenn geklickt', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    fireEvent.click(screen.getByRole('button', { name: /click me/i }));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  // Disabled-Zustand
  test('rendert disabled Button, wenn disabled prop true ist', () => {
    render(<Button disabled>Click me</Button>);
    expect(screen.getByRole('button', { name: /click me/i })).toBeDisabled();
  });

  // Loading-Zustand
  test('rendert Loading-Zustand, wenn isLoading prop true ist', () => {
    render(<Button isLoading>Click me</Button>);
    
    // Prüft auf den Spinner (SVG-Element)
    const button = screen.getByRole('button');
    expect(button).toContainElement(screen.getByText(''));
    expect(button).toBeDisabled();
  });

  // Varianten-Tests
  test('rendert verschiedene Varianten mit korrekten Klassen', () => {
    const { rerender } = render(<Button variant="primary">Primary</Button>);
    expect(screen.getByRole('button')).toHaveClass('bg-primary');
    
    rerender(<Button variant="accent">Accent</Button>);
    expect(screen.getByRole('button')).toHaveClass('bg-accent');
    
    rerender(<Button variant="secondary">Secondary</Button>);
    expect(screen.getByRole('button')).toHaveClass('bg-secondary-light');
    
    rerender(<Button variant="outline">Outline</Button>);
    expect(screen.getByRole('button')).toHaveClass('border-primary');
    
    rerender(<Button variant="ghost">Ghost</Button>);
    expect(screen.getByRole('button')).toHaveClass('bg-transparent');
  });

  // Größen-Tests
  test('rendert verschiedene Größen mit korrekten Klassen', () => {
    const { rerender } = render(<Button size="sm">Small</Button>);
    expect(screen.getByRole('button')).toHaveClass('text-sm');
    
    rerender(<Button size="md">Medium</Button>);
    expect(screen.getByRole('button')).toHaveClass('text-base');
    
    rerender(<Button size="lg">Large</Button>);
    expect(screen.getByRole('button')).toHaveClass('text-lg');
  });

  // Icons-Tests
  test('rendert Button mit Start-Icon', () => {
    const startIcon = <span data-testid="start-icon">🏠</span>;
    render(<Button startIcon={startIcon}>Home</Button>);
    
    expect(screen.getByTestId('start-icon')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /home/i })).toContainElement(screen.getByTestId('start-icon'));
  });

  test('rendert Button mit End-Icon', () => {
    const endIcon = <span data-testid="end-icon">➡️</span>;
    render(<Button endIcon={endIcon}>Next</Button>);
    
    expect(screen.getByTestId('end-icon')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /next/i })).toContainElement(screen.getByTestId('end-icon'));
  });

  // Full-Width-Test
  test('rendert Button mit voller Breite, wenn fullWidth true ist', () => {
    render(<Button fullWidth>Full Width</Button>);
    expect(screen.getByRole('button')).toHaveClass('w-full');
  });
});