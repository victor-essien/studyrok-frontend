import type { StateCreator } from 'zustand';

export type NotificationType = 'success' | 'error' | 'warning' | 'info';

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message?: string;
  duration?: number;
  timestamp: number;
  read?: boolean;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export interface NotificationState {
  notifications: Notification[];
  unreadCount: number;
}

export interface NotificationActions {
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp'>) => void;
  removeNotification: (id: string) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  clearNotifications: () => void;
  clearOldNotifications: (maxAge: number) => void;
}

export type NotificationSlice = NotificationState & NotificationActions;

const initialState: NotificationState = {
  notifications: [],
  unreadCount: 0,
};

export const createNotificationSlice: StateCreator<
  NotificationSlice,
  [['zustand/devtools', never]]
> = (set, get) => ({
  ...initialState,

  addNotification: (notification) => {
    const newNotification: Notification = {
      ...notification,
      id: `notification-${Date.now()}-${Math.random()}`,
      timestamp: Date.now(),
      read: false,
    };

    set(
      (state) => ({
        notifications: [newNotification, ...state.notifications],
        unreadCount: state.unreadCount + 1,
      }),
      false,
      'notification/add'
    );

    // Auto-remove after duration
    if (notification.duration) {
      setTimeout(() => {
        get().removeNotification(newNotification.id);
      }, notification.duration);
    }
  },

  removeNotification: (id) => {
    set(
      (state) => {
        const notification = state.notifications.find((n) => n.id === id);
        return {
          notifications: state.notifications.filter((n) => n.id !== id),
          unreadCount:
            notification && !notification.read ? state.unreadCount - 1 : state.unreadCount,
        };
      },
      false,
      'notification/remove'
    );
  },

  markAsRead: (id) => {
    set(
      (state) => {
        const notification = state.notifications.find((n) => n.id === id);
        if (!notification || notification.read) return state;

        return {
          notifications: state.notifications.map((n) => (n.id === id ? { ...n, read: true } : n)),
          unreadCount: Math.max(0, state.unreadCount - 1),
        };
      },
      false,
      'notification/markAsRead'
    );
  },

  markAllAsRead: () => {
    set(
      (state) => ({
        notifications: state.notifications.map((n) => ({ ...n, read: true })),
        unreadCount: 0,
      }),
      false,
      'notification/markAllAsRead'
    );
  },

  clearNotifications: () => {
    set(
      {
        notifications: [],
        unreadCount: 0,
      },
      false,
      'notification/clear'
    );
  },

  clearOldNotifications: (maxAge) => {
    const now = Date.now();
    set(
      (state) => {
        const filtered = state.notifications.filter((n) => now - n.timestamp < maxAge);
        const unreadFiltered = filtered.filter((n) => !n.read).length;

        return {
          notifications: filtered,
          unreadCount: unreadFiltered,
        };
      },
      false,
      'notification/clearOld'
    );
  },
});
