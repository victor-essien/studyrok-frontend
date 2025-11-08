export type UserTier = 'free' | 'premium' | 'pro';


export interface User {
    id: string;
    name:string;
    email: string;
    avatar?: string;
    tier: UserTier;
    studyGoal: number;
    studyObjective?: string;
    totalStudyTime: number;
    streak: number;
    aiRequestsUsed: number;
    aiRequestLimit: number;
    stripeId?: string;
    createdAt: string;
    updatedAt: string;
}


export interface UserStats {
    totalBoards: number;
    totalNotes: number;
    totalFlashcards: number;
    totalQuizzes: number;
    averageScore: number;
    studyStreak: number;
    lastStudyDate?: string;
}

export interface UserPreferences {
    theme: 'light' | 'dark';
    emailNotifications: boolean;
    studyReminders: boolean;
    defaultDifficulty: 'easy' | 'medium' | 'hard';
}