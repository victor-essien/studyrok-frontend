export interface DailyAnalytics {
  date: string;
  totalMinutes: number;
  sessionsCount: number;
  flashcardsReviewed: number;
  notesCreated: number;
  focusScore?: number;
  productivityScore?: number;
}

export interface StudyTimeChart {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
  }[];
}

export interface PerformanceMetrics {
  averageQuizScore: number;
  flashcardMasteryRate: number;
  studyConsistency: number; // 0-100
  improvementRate: number; // percentage
}

export interface AIInsight {
  title: string;
  description: string;
  type: 'positive' | 'warning' | 'suggestion';
  priority: 'high' | 'medium' | 'low';
  actionable?: boolean;
  actionText?: string;
}

export interface AnalyticsOverview {
  totalStudyTime: number;
  currentStreak: number;
  longestStreak: number;
  boardsCompleted: number;
  averageSessionLength: number;
  mostStudiedSubjects: SubjectBreakdown[];
  recentActivity: DailyAnalytics[];
}

export interface SubjectBreakdown {
  subject: string;
  timeSpent: number;
  percentage: number;
}