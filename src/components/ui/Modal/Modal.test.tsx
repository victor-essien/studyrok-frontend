// import { render, screen, fireEvent } from '@testing-library/react';
// import { describe, it, expect, vi } from 'vitest';
// import Modal from './Modal';

// describe('Modal Component', () => {
//   it('renders modal when isOpen is true', () => {
//     render(
//       <Modal isOpen={true} onClose={() => {}}>
//         Modal content
//       </Modal>
//     );
//     expect(screen.getByText('Modal content')).toBeInTheDocument();
//   });

//   it('does not render when isOpen is false', () => {
//     render(
//       <Modal isOpen={false} onClose={() => {}}>
//         Modal content
//       </Modal>
//     );
//     expect(screen.queryByText('Modal content')).not.toBeInTheDocument();
//   });

//   it('renders with title', () => {
//     render(
//       <Modal isOpen={true} onClose={() => {}} title="Test Modal">
//         Content
//       </Modal>
//     );
//     expect(screen.getByText('Test Modal')).toBeInTheDocument();
//   });

//   it('calls onClose when close button is clicked', () => {
//     const handleClose = vi.fn();
//     render(
//       <Modal isOpen={true} onClose={handleClose}>
//         Content
//       </Modal>
//     );
//     fireEvent.click(screen.getByLabelText('Close modal'));
//     expect(handleClose).toHaveBeenCalledTimes(1);
//   });

//   it('calls onClose when overlay is clicked', () => {
//     const handleClose = vi.fn();
//     render(
//       <Modal isOpen={true} onClose={handleClose}>
//         Content
//       </Modal>
//     );
//     const overlay = screen.getByRole('dialog');
//     fireEvent.click(overlay);
//     expect(handleClose).toHaveBeenCalledTimes(1);
//   });

//   it('does not close when overlay is clicked if closeOnOverlayClick is false', () => {
//     const handleClose = vi.fn();
//     render(
//       <Modal isOpen={true} onClose={handleClose} closeOnOverlayClick={false}>
//         Content
//       </Modal>
//     );
//     const overlay = screen.getByRole('dialog');
//     fireEvent.click(overlay);
//     expect(handleClose).not.toHaveBeenCalled();
//   });

//   it('closes on Escape key press', () => {
//     const handleClose = vi.fn();
//     render(
//       <Modal isOpen={true} onClose={handleClose}>
//         Content
//       </Modal>
//     );
//     fireEvent.keyDown(document, { key: 'Escape' });
//     expect(handleClose).toHaveBeenCalledTimes(1);
//   });

//   it('hides close button when showCloseButton is false', () => {
//     render(
//       <Modal isOpen={true} onClose={() => {}} showCloseButton={false}>
//         Content
//       </Modal>
//     );
//     expect(screen.queryByLabelText('Close modal')).not.toBeInTheDocument();
//   });
// });
