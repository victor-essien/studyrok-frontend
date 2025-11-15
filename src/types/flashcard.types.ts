export type CardDifficulty = 'easy' | 'medium' | 'hard';
export type CardType = 'basic' | 'cloze' | 'image';
export type ReviewRating = 0 | 1 | 2 | 3; // Again, Hard, Good, Easy

export interface Flashcard {
  id: string;
  studyBoardId: string;
  studyNoteId?: string;
  userId: string;
  front: string;
  back: string;
  hint?: string;
  masteryLevel: number; // 0-100
  easeFactor: number;
  interval: number;
  nextReviewDate: string;
  reviewCount: number;
  difficulty: CardDifficulty;
  cardType: CardType;
  createdAt: string;
  lastReviewedAt?: string;
}

export interface FlashcardDeck {
  id: string;
  studyBoardId: string;
  name: string;
  description?: string;
  cardCount: number;
  masteredCount: number;
}

export interface GenerateFlashcardsPayload {
  studyNoteId: string;
  count?: number;
  difficulty?: 'mixed' | CardDifficulty;
}

export interface ReviewFlashcardPayload {
  flashcardId: string;
  rating: ReviewRating;
  timeSpentSeconds: number;
}

export interface FlashcardReviewSession {
  id: string;
  studyBoardId: string;
  cardsReviewed: number;
  correctAnswers: number;
  averageTime: number;
  startedAt: string;
  completedAt?: string;
}
