// import { render, screen, fireEvent } from '@testing-library/react';
// import { describe, it, expect, vi } from 'vitest';
// import Card from './Card';

// describe('Card Component', () => {
//   it('renders card with children', () => {
//     render(<Card>Card content</Card>);
//     expect(screen.getByText('Card content')).toBeInTheDocument();
//   });

//   it('applies default variant styles', () => {
//     const { container } = render(<Card>Content</Card>);
//     expect(container.firstChild).toHaveClass('bg-white');
//   });

//   it('applies outlined variant styles', () => {
//     const { container } = render(<Card variant="outlined">Content</Card>);
//     expect(container.firstChild).toHaveClass('border-2', 'border-gray-200');
//   });

//   it('applies elevated variant styles', () => {
//     const { container } = render(<Card variant="elevated">Content</Card>);
//     expect(container.firstChild).toHaveClass('shadow-lg');
//   });

//   it('applies hoverable styles', () => {
//     const { container } = render(<Card hoverable>Content</Card>);
//     expect(container.firstChild).toHaveClass('hover:shadow-xl');
//   });

//   it('handles click events', () => {
//     const handleClick = vi.fn();
//     render(<Card onClick={handleClick}>Clickable Card</Card>);
//     fireEvent.click(screen.getByText('Clickable Card'));
//     expect(handleClick).toHaveBeenCalledTimes(1);
//   });

//   it('renders with header, body, and footer', () => {
//     render(
//       <Card>
//         <Card.Header>Header</Card.Header>
//         <Card.Body>Body</Card.Body>
//         <Card.Footer>Footer</Card.Footer>
//       </Card>
//     );
//     expect(screen.getByText('Header')).toBeInTheDocument();
//     expect(screen.getByText('Body')).toBeInTheDocument();
//     expect(screen.getByText('Footer')).toBeInTheDocument();
//   });

//   it('applies different padding sizes', () => {
//     const { container } = render(<Card padding="lg">Content</Card>);
//     expect(container.firstChild).toHaveClass('p-8');
//   });
// });