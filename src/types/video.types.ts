export type VideoGenerationStatus = 'pending' | 'generating' | 'completed' | 'failed';

export interface VideoExplainer {
  id: string;
  studyBoardId: string;
  studyNoteId: string;
  userId: string;
  title: string;
  description?: string;
  script: string;
  videoUrl?: string;
  thumbnailUrl?: string;
  durationSeconds: number;
  generationStatus: VideoGenerationStatus;
  generationProvider?: string;
  viewCount: number;
  lastWatchedPosition: number;
  createdAt: string;
}

export interface VideoScript {
  description: string;
  script: string;
  segments: ScriptSegment[];
  visualCues: string[];
}

export interface ScriptSegment {
  title: string;
  duration: number;
  text: string;
}

export interface GenerateVideoScriptPayload {
  studyNoteId: string;
  targetDuration?: number; // in seconds
  style?: 'educational' | 'conversational' | 'professional';
}