// import { render, screen, fireEvent } from '@testing-library/react';
// import { describe, it, expect, vi } from 'vitest';
// import Input from './Input';
// import { Mail } from 'lucide-react';

// describe('Input Component', () => {
//   it('renders input with label', () => {
//     render(<Input label="Email Address" />);
//     expect(screen.getByText('Email Address')).toBeInTheDocument();
//   });

//   it('shows required indicator when required', () => {
//     render(<Input label="Email" required />);
//     expect(screen.getByText('*')).toBeInTheDocument();
//   });

//   it('displays error message', () => {
//     render(<Input error="Invalid email" id="email" />);
//     expect(screen.getByText('Invalid email')).toBeInTheDocument();
//   });

//   it('displays helper text', () => {
//     render(<Input helperText="We'll never share your email" />);
//     expect(screen.getByText("We'll never share your email")).toBeInTheDocument();
//   });

//   it('handles onChange event', () => {
//     const handleChange = vi.fn();
//     render(<Input onChange={handleChange} />);
//     const input = screen.getByRole('textbox');
//     fireEvent.change(input, { target: { value: 'test@example.com' } });
//     expect(handleChange).toHaveBeenCalled();
//   });

//   it('applies disabled state', () => {
//     render(<Input disabled />);
//     expect(screen.getByRole('textbox')).toBeDisabled();
//   });

//   it('renders with left icon', () => {
//     render(<Input leftIcon={<Mail data-testid="mail-icon" />} />);
//     expect(screen.getByTestId('mail-icon')).toBeInTheDocument();
//   });

//   it('applies full width style', () => {
//     const { container } = render(<Input fullWidth />);
//     const wrapper = container.firstChild;
//     expect(wrapper).toHaveClass('w-full');
//   });

//   it('sets aria-invalid when error exists', () => {
//     render(<Input error="Error message" />);
//     expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true');
//   });
// });
