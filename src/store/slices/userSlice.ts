import type { StateCreator } from 'zustand';
import type { User, UserPreferences } from '@/types';


// UserState interface defines the shape of user-related state in the application
export interface UserState {
  user: User | null;
  preferences: UserPreferences;
  isAuthenticated: boolean;
}


// UserActions interface defines all available user-related actions in the store
export interface UserActions {
  setUser: (user: User | null) => void;
  updateUser: (updates: Partial<User>) => void;
  setPreferences: (preferences: Partial<UserPreferences>) => void;
  updatePreference: <K extends keyof UserPreferences>(
    key: K,
    value: UserPreferences[K]
  ) => void;
  logout: () => void;
  incrementStreak: () => void;
  addStudyTime: (minutes: number) => void;
}

export type UserSlice = UserState & UserActions;

// Default user preferences used when initializing or resetting state
const defaultPreferences: UserPreferences = {
  theme: 'light',
  emailNotifications: true,
  studyReminders: true,
  defaultDifficulty: 'medium',
};

const initialState: UserState = {
  user: null,
  preferences: defaultPreferences,
  isAuthenticated: false,
};

export const createUserSlice: StateCreator<UserSlice, [['zustand/devtools', never]]> = (set, get) => ({
  ...initialState,

  setUser: (user) => {
    set(
      {
        user,
        isAuthenticated: !!user,
      },
      false,
      'user/setUser'
    );
  },

  updateUser: (updates) => {
    set(
      (state) => ({
        user: state.user ? { ...state.user, ...updates } : null,
      }),
      false,
      'user/updateUser'
    );
  },

  setPreferences: (preferences) => {
    set(
      (state) => ({
        preferences: { ...state.preferences, ...preferences },
      }),
      false,
      'user/setPreferences'
    );
  },

  updatePreference: (key, value) => {
    set(
      (state) => ({
        preferences: {
          ...state.preferences,
          [key]: value,
        },
      }),
      false,
      `user/updatePreference/${key}`
    );
  },

  logout: () => {
    set(
      {
        user: null,
        isAuthenticated: false,
        preferences: defaultPreferences,
      },
      false,
      'user/logout'
    );
    
    // Clear auth token
    localStorage.removeItem('auth_token');
  },

  incrementStreak: () => {
    set(
      (state) => ({
        user: state.user
          ? {
              ...state.user,
              streak: state.user.streak + 1,
            }
          : null,
      }),
      false,
      'user/incrementStreak'
    );
  },

  addStudyTime: (minutes) => {
    set(
      (state) => ({
        user: state.user
          ? {
              ...state.user,
              totalStudyTime: state.user.totalStudyTime + minutes,
            }
          : null,
      }),
      false,
      'user/addStudyTime'
    );
  },
});


