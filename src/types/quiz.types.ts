export type QuestionType = 'multiple_choice' | 'true_false' | 'short_answer' | 'fill_blank';
export type QuizDifficulty = 'easy' | 'medium' | 'hard';

export interface Quiz {
  id: string;
  studyBoardId: string;
  studyNoteId?: string;
  userId: string;
  title: string;
  description?: string;
  difficulty: QuizDifficulty;
  questionCount: number;
  timeLimitMinutes?: number;
  passingScore: number;
  isCompleted: boolean;
  score?: number;
  completedAt?: string;
  createdAt: string;
}

export interface QuizQuestion {
  id: string;
  quizId: string;
  questionType: QuestionType;
  questionText: string;
  options?: QuestionOption[];
  correctAnswer: string;
  userAnswer?: string;
  isCorrect?: boolean;
  explanation?: string;
  points: number;
  orderIndex: number;
}

export interface QuestionOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface GenerateQuizPayload {
  studyNoteId?: string;
  studyBoardId?: string;
  questionCount?: number;
  difficulty?: QuizDifficulty;
  questionTypes?: QuestionType[];
  timeLimitMinutes?: number;
}

export interface SubmitQuizPayload {
  quizId: string;
  answers: {
    questionId: string;
    answer: string;
  }[];
}

export interface QuizResult {
  quizId: string;
  score: number;
  correctAnswers: number;
  totalQuestions: number;
  timeSpentMinutes: number;
  passingScore: number;
  passed: boolean;
  questions: QuizQuestion[];
}
