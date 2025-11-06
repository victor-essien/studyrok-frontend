export type BoardStatus = 'pending' | 'processing' | 'completed' | 'failed';
export type SourceType = 'topic' | 'pdf' | 'doc' | 'text';

export interface StudyBoard {
  id: string;
  userId: string;
  title: string;
  description?: string;
  topic: string;
  sourceType: SourceType;
  sourceFiles?: SourceFile[];
  status: BoardStatus;
  aiModel?: string;
  tokensUsed?: number;
  thumbnail?: string;
  colorTheme: string;
  tags: string[];
  isPublic: boolean;
  createdAt: string;
  updatedAt: string;
  notesCount?: number;
  flashcardsCount?: number;
  quizzesCount?: number;
}

export interface SourceFile {
  id: string;
  filename: string;
  originalFilename: string;
  fileSize: number;
  fileType: string;
  storageUrl: string;
  uploadedAt: string;
}

export interface CreateBoardPayload {
  title?: string;
  description?: string;
  topic: string;
  sourceType: SourceType;
  files?: File[];
}

export interface BoardProgress {
  boardId: string;
  notesCompleted: number;
  totalNotes: number;
  flashcardsMastered: number;
  totalFlashcards: number;
  quizzesCompleted: number;
  completionPercentage: number;
  timeSpentMinutes: number;
}