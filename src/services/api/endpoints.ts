export const ENDPOINTS = {
  // Authentication
  auth: {
    login: '/auth/login',
    signup: '/auth/signup',
    logout: '/auth/logout',
    onboarding: '/auth/onboarding',
    refreshToken: '/auth/refresh-token',
    forgotPassword: '/auth/forgot-password',
    resetPassword: '/auth/reset-password',
    verifyEmail: '/auth/verify-email',
    me: '/auth/me',
  },

  // User
  user: {
    profile: '/users/profile',
    updateProfile: '/users/profile',
    settings: '/users/settings',
    stats: '/users/stats',
    preferences: '/users/preferences',
  },

  // Study Boards
  boards: {
    list: '/boards',
    create: '/boards',
    createFromTopic: '/boards/create-from-topic',
    createFromFiles: '/boards/create-from-files',
    detail: (id: string) => `/boards/${id}`,
    update: (id: string) => `/boards/${id}`,
    delete: (id: string) => `/boards/${id}`,
    duplicate: (id: string) => `/boards/${id}/duplicate`,
    share: (id: string) => `/boards/${id}/share`,
    public: '/boards/public',
    progress: (id: string) => `/boards/${id}/progress`,
  },

  // Notes
  notes: {
    list: (boardId: string) => `/boards/${boardId}/notes`,
    detail: (id: string) => `/notes/${id}`,
    create: '/notes',
    update: (id: string) => `/notes/${id}`,
    delete: (id: string) => `/notes/${id}`,
    generate: '/notes/generate',
    markRead: (id: string) => `/notes/${id}/mark-read`,
    search: '/notes/search',
  },

  // Flashcards
  flashcards: {
    list: '/flashcards',
    byBoard: (boardId: string) => `/boards/${boardId}/flashcards`,
    byNote: (noteId: string) => `/notes/${noteId}/flashcards`,
    detail: (id: string) => `/flashcards/${id}`,
    create: '/flashcards',
    update: (id: string) => `/flashcards/${id}`,
    delete: (id: string) => `/flashcards/${id}`,
    generate: '/flashcards/generate',
    generateFromNote: (noteId: string) => `/notes/${noteId}/generate-flashcards`,
    dueForReview: '/flashcards/due-for-review',
    review: (id: string) => `/flashcards/${id}/review`,
  },

  // Quizzes
  quizzes: {
    list: '/quizzes',
    byBoard: (boardId: string) => `/boards/${boardId}/quizzes`,
    detail: (id: string) => `/quizzes/${id}`,
    create: '/quizzes',
    delete: (id: string) => `/quizzes/${id}`,
    generate: '/quizzes/generate',
    generateFromNote: (noteId: string) => `/notes/${noteId}/generate-quiz`,
    generateFromBoard: (boardId: string) => `/boards/${boardId}/generate-quiz`,
    submit: (id: string) => `/quizzes/${id}/submit`,
    results: (id: string) => `/quizzes/${id}/results`,
  },

  // Videos
  videos: {
    list: (boardId: string) => `/boards/${boardId}/videos`,
    detail: (id: string) => `/videos/${id}`,
    generateScript: '/videos/generate-script',
    generateFromNote: (noteId: string) => `/notes/${noteId}/generate-video-script`,
    delete: (id: string) => `/videos/${id}`,
  },

  // Analytics
  analytics: {
    overview: '/analytics/overview',
    studyTime: '/analytics/study-time',
    performance: '/analytics/performance',
    insights: '/analytics/insights',
    streak: '/analytics/streak',
    trends: '/analytics/trends',
  },

  // File Upload
  upload: {
    file: '/upload/file',
    multiple: '/upload/multiple',
    avatar: '/upload/avatar',
  },

  // Search
  search: {
    global: '/search',
    boards: '/search/boards',
    notes: '/search/notes',
    flashcards: '/search/flashcards',
  },

  // Subscription/Payments
  subscription: {
    plans: '/subscription/plans',
    current: '/subscription/current',
    checkout: '/subscription/checkout',
    portal: '/subscription/portal',
    cancel: '/subscription/cancel',
    upgrade: '/subscription/upgrade',
  },
} as const;