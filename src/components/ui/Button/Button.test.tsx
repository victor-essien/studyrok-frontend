// import { render, screen, fireEvent } from '@testing-library/react';
// import { describe, it, expect, vi } from 'vitest';
// import Button from './Button';
// import { Mail } from 'lucide-react';

// describe('Button Component', () => {
//   it('renders button with text', () => {
//     render(<Button>Click me</Button>);
//     expect(screen.getByText('Click me')).toBeInTheDocument();
//   });

//   it('handles click events', () => {
//     const handleClick = vi.fn();
//     render(<Button onClick={handleClick}>Click me</Button>);
//     fireEvent.click(screen.getByText('Click me'));
//     expect(handleClick).toHaveBeenCalledTimes(1);
//   });

//   it('applies primary variant styles by default', () => {
//     render(<Button>Primary</Button>);
//     const button = screen.getByText('Primary');
//     expect(button).toHaveClass('bg-[#1E1B4B]');
//   });

//   it('applies correct size styles', () => {
//     render(<Button size="lg">Large Button</Button>);
//     const button = screen.getByText('Large Button');
//     expect(button).toHaveClass('px-8', 'py-4', 'text-lg');
//   });

//   it('shows loading spinner when isLoading is true', () => {
//     render(<Button isLoading>Loading</Button>);
//     const spinner = screen.getByRole('button').querySelector('svg');
//     expect(spinner).toHaveClass('animate-spin');
//   });

//   it('disables button when disabled prop is true', () => {
//     render(<Button disabled>Disabled</Button>);
//     expect(screen.getByText('Disabled')).toBeDisabled();
//   });

//   it('renders with left icon', () => {
//     render(
//       <Button leftIcon={<Mail data-testid="mail-icon" />}>
//         Email
//       </Button>
//     );
//     expect(screen.getByTestId('mail-icon')).toBeInTheDocument();
//   });

//   it('applies full width when fullWidth is true', () => {
//     render(<Button fullWidth>Full Width</Button>);
//     expect(screen.getByText('Full Width')).toHaveClass('w-full');
//   });

//   it('does not trigger onClick when disabled', () => {
//     const handleClick = vi.fn();
//     render(<Button onClick={handleClick} disabled>Disabled</Button>);
//     fireEvent.click(screen.getByText('Disabled'));
//     expect(handleClick).not.toHaveBeenCalled();
//   });
// });
