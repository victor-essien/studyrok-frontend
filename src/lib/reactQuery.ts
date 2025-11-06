import { QueryClient} from '@tanstack/react-query';
import type {  DefaultOptions } from '@tanstack/react-query';

const queryConfig: DefaultOptions = {
  queries: {
    // Refetch on window focus
    refetchOnWindowFocus: false,
    
    // Refetch on reconnect
    refetchOnReconnect: true,
    
    // Retry failed requests
    retry: 1,
    
    // Stale time (5 minutes)
    staleTime: 5 * 60 * 1000,
    
    // Cache time (10 minutes)
    gcTime: 10 * 60 * 1000,
    
    // Show errors by default
    throwOnError: false,
  },
  mutations: {
    // Don't retry mutations
    retry: false,
    
    // Show errors by default
    throwOnError: false,
  },
};

export const queryClient = new QueryClient({
  defaultOptions: queryConfig,
});

// Query keys factory
export const queryKeys = {
  // Auth
  auth: {
    me: ['auth', 'me'] as const,
  },
  
  // User
  user: {
    profile: ['user', 'profile'] as const,
    stats: ['user', 'stats'] as const,
    preferences: ['user', 'preferences'] as const,
  },
  
  // Boards
  boards: {
    all: ['boards'] as const,
    list: (filters?: Record<string, any>) => ['boards', 'list', filters] as const,
    detail: (id: string) => ['boards', 'detail', id] as const,
    progress: (id: string) => ['boards', 'progress', id] as const,
    public: ['boards', 'public'] as const,
  },
  
  // Notes
  notes: {
    all: ['notes'] as const,
    list: (boardId: string) => ['notes', 'list', boardId] as const,
    detail: (id: string) => ['notes', 'detail', id] as const,
    search: (query: string) => ['notes', 'search', query] as const,
  },
  
  // Flashcards
  flashcards: {
    all: ['flashcards'] as const,
    list: (boardId?: string) => ['flashcards', 'list', boardId] as const,
    byNote: (noteId: string) => ['flashcards', 'note', noteId] as const,
    detail: (id: string) => ['flashcards', 'detail', id] as const,
    dueForReview: ['flashcards', 'due'] as const,
  },
  
  // Quizzes
  quizzes: {
    all: ['quizzes'] as const,
    list: (boardId?: string) => ['quizzes', 'list', boardId] as const,
    detail: (id: string) => ['quizzes', 'detail', id] as const,
    results: (id: string) => ['quizzes', 'results', id] as const,
  },
  
  // Videos
  videos: {
    list: (boardId: string) => ['videos', 'list', boardId] as const,
    detail: (id: string) => ['videos', 'detail', id] as const,
  },
  
  // Analytics
  analytics: {
    overview: ['analytics', 'overview'] as const,
    studyTime: (period?: string) => ['analytics', 'studyTime', period] as const,
    performance: ['analytics', 'performance'] as const,
    insights: ['analytics', 'insights'] as const,
  },
} as const;