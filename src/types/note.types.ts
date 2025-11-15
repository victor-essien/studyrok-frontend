export interface StudyNote {
  id: string;
  studyBoardId: string;
  userId: string;
  title: string;
  content: string;
  segmentOrder: number;
  summary?: string;
  keyConcepts?: KeyConcept[];
  learningObjectives?: string[];
  readTimeMinutes: number;
  aiGenerated: boolean;
  confidenceScore?: number;
  isCompleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface KeyConcept {
  term: string;
  definition: string;
  examples?: string[];
}

export interface GenerateNotePayload {
  studyBoardId: string;
  topic: string;
  segmentTitle?: string;
  detailLevel?: 'basic' | 'intermediate' | 'advanced';
  tone?: 'formal' | 'casual' | 'academic';
}
