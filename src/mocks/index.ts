export * from './data/users.mock';
export * from './data/studyBoards.mock';
export * from './data/notes.mock';
export * from './data/flashcards.mock';
export * from './data/quizzes.mock';
export * from './data/videos.mock';
export * from './data/analytics.mock';

import { mockUsers } from './data/users.mock';
import { mockStudyBoards } from './data/studyBoards.mock';
import { mockNotes } from './data/notes.mock';
import { mockFlashcards } from './data/flashcards.mock';
import { mockQuizzes } from './data/quizzes.mock';
import { mockQuizQuestions } from './data/quizzes.mock';
import { mockVideos } from './data/videos.mock';
import { mockAnalyticsOverview } from './data/analytics.mock';
// Helper function to get all mock data
export const getAllMockData = () => ({
  users: mockUsers,
  studyBoards: mockStudyBoards,
  notes: mockNotes,
  flashcards: mockFlashcards,
  quizzes: mockQuizzes,
  quizQuestions: mockQuizQuestions,
  videos: mockVideos,
  analytics: mockAnalyticsOverview,
});
