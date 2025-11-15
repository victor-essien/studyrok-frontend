import { create } from 'zustand';
import { devtools, persist, subscribeWithSelector } from 'zustand/middleware';
import { createUISlice } from './slices/uiSlice';
import type { UISlice } from './slices/uiSlice';
import { createUserSlice } from './slices/userSlice';
import type { UserSlice } from './slices/userSlice';
import { createModalSlice } from './slices/modalSlice';
import type { ModalSlice } from './slices/modalSlice';
import { createNotificationSlice } from './slices/notificationSlice';
import type { NotificationSlice } from './slices/notificationSlice';

// Combined store type
export type StoreState = UISlice & UserSlice & ModalSlice & NotificationSlice;

// Create the store with all slices
export const useStore = create<StoreState>()(
  devtools(
    persist(
      subscribeWithSelector((...a) => ({
        ...createUISlice(...a),
        ...createUserSlice(...a),
        ...createModalSlice(...a),
        ...createNotificationSlice(...a),
      })),
      {
        name: 'studyrok-storage',
        // Only persist specific slices
        partialize: (state) => ({
          theme: state.theme,
          sidebarOpen: state.sidebarOpen,
          preferences: state.preferences,
          user: state.user,
        }),
      }
    ),
    {
      name: 'StudyRok Store',
      enabled: import.meta.env.DEV,
    }
  )
);
