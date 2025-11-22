import CreateFlashcard from '@/features/flashcards/components/CreateFlashcard';
import FlashcardType from '@/features/flashcards/components/FlashcardType';
import MaterialPage from '@/features/flashcards/components/FlashcardMaterial';
import FlashCard from '@/features/flashcards/components/FlashCard';
import FlashcardLayout from '@/features/flashcards/components/FlashcardLayout';
import FlashcardPage from '@/pages/FlashcardPage';

export const flashcardRoutes = [
  {
    id: '1',
    title: 'Dashboard',
    path: 'flashcards/create',
    component: FlashcardLayout,
    alt: '',
  },
];
