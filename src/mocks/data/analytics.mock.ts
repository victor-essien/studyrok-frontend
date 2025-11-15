import type { DailyAnalytics, AnalyticsOverview, SubjectBreakdown, AIInsight } from '@/types';

export const mockDailyAnalytics: DailyAnalytics[] = [
  {
    date: '2024-03-04',
    totalMinutes: 45,
    sessionsCount: 2,
    flashcardsReviewed: 15,
    notesCreated: 1,
    focusScore: 0.82,
    productivityScore: 0.75,
  },
  {
    date: '2024-03-05',
    totalMinutes: 60,
    sessionsCount: 3,
    flashcardsReviewed: 25,
    notesCreated: 2,
    focusScore: 0.88,
    productivityScore: 0.85,
  },
  {
    date: '2024-03-06',
    totalMinutes: 30,
    sessionsCount: 1,
    flashcardsReviewed: 10,
    notesCreated: 0,
    focusScore: 0.65,
    productivityScore: 0.6,
  },
  {
    date: '2024-03-07',
    totalMinutes: 75,
    sessionsCount: 4,
    flashcardsReviewed: 35,
    notesCreated: 3,
    focusScore: 0.92,
    productivityScore: 0.9,
  },
  {
    date: '2024-03-08',
    totalMinutes: 50,
    sessionsCount: 2,
    flashcardsReviewed: 20,
    notesCreated: 1,
    focusScore: 0.78,
    productivityScore: 0.72,
  },
  {
    date: '2024-03-09',
    totalMinutes: 90,
    sessionsCount: 5,
    flashcardsReviewed: 40,
    notesCreated: 4,
    focusScore: 0.95,
    productivityScore: 0.93,
  },
  {
    date: '2024-03-10',
    totalMinutes: 55,
    sessionsCount: 3,
    flashcardsReviewed: 22,
    notesCreated: 2,
    focusScore: 0.85,
    productivityScore: 0.8,
  },
];

export const mockSubjectBreakdown: SubjectBreakdown[] = [
  { subject: 'Biology', timeSpent: 450, percentage: 35 },
  { subject: 'Mathematics', timeSpent: 380, percentage: 29 },
  { subject: 'History', timeSpent: 250, percentage: 19 },
  { subject: 'Literature', timeSpent: 150, percentage: 12 },
  { subject: 'Chemistry', timeSpent: 70, percentage: 5 },
];

export const mockAIInsights: AIInsight[] = [
  {
    title: 'Your best study time is 2-4 PM',
    description:
      'Based on your focus scores, you perform 23% better during afternoon sessions. Consider scheduling difficult topics during this time.',
    type: 'positive',
    priority: 'high',
    actionable: true,
    actionText: 'Schedule afternoon study sessions',
  },
  {
    title: 'Biology flashcards need review',
    description:
      '12 flashcards are overdue for review. Regular review helps maintain long-term retention.',
    type: 'warning',
    priority: 'medium',
    actionable: true,
    actionText: 'Review flashcards now',
  },
  {
    title: 'Consistent study streak!',
    description:
      "You've studied for 15 consecutive days! Consistency is key to academic success. Keep up the great work!",
    type: 'positive',
    priority: 'low',
  },
  {
    title: 'Try shorter study sessions',
    description:
      'Your focus drops after 45 minutes. Consider using the Pomodoro technique (25-min sessions with 5-min breaks).',
    type: 'suggestion',
    priority: 'medium',
    actionable: true,
    actionText: 'Learn about Pomodoro',
  },
];

export const mockAnalyticsOverview: AnalyticsOverview = {
  totalStudyTime: 2340,
  currentStreak: 15,
  longestStreak: 28,
  boardsCompleted: 8,
  averageSessionLength: 47,
  mostStudiedSubjects: mockSubjectBreakdown,
  recentActivity: mockDailyAnalytics,
};
