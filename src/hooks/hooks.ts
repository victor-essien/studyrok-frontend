import { useStore } from "@/store/store";
import {useShallow} from 'zustand/react/shallow'


// UI Hooks
export const useTheme = () => {
  return useStore(
    useShallow((state) => ({
      theme: state.theme,
      setTheme: state.setTheme,
      toggleTheme: state.toggleTheme,
    }))
  );
};

export const useSidebar = () => {
  return useStore(
    useShallow((state) => ({
      sidebarOpen: state.sidebarOpen,
      sidebarCollapsed: state.sidebarCollapsed,
      toggleSidebar: state.toggleSidebar,
      setSidebarOpen: state.setSidebarOpen,
      toggleSidebarCollapsed: state.toggleSidebarCollapsed,
    }))
  );
};

export const useMobileMenu = () => {
  return useStore(
    useShallow((state) => ({
      mobileMenuOpen: state.mobileMenuOpen,
      setMobileMenuOpen: state.setMobileMenuOpen,
      toggleMobileMenu: state.toggleMobileMenu,
    }))
  );
};

// User Hooks
export const useCurrentUser = () => {
  return useStore(
    useShallow((state) => ({
      user: state.user,
      isAuthenticated: state.isAuthenticated,
      setUser: state.setUser,
      updateUser: state.updateUser,
      logout: state.logout,
    }))
  );
};

export const useUserPreferences = () => {
  return useStore(
    useShallow((state) => ({
      preferences: state.preferences,
      setPreferences: state.setPreferences,
      updatePreference: state.updatePreference,
    }))
  );
};

export const useUserStats = () => {
  return useStore(
    useShallow((state) => ({
      streak: state.user?.streak ?? 0,
      totalStudyTime: state.user?.totalStudyTime ?? 0,
      incrementStreak: state.incrementStreak,
      addStudyTime: state.addStudyTime,
    }))
  );
};

// Modal Hooks
export const useModal = () => {
  return useStore(
    useShallow((state) => ({
      activeModal: state.activeModal,
      modalData: state.modalData,
      isModalOpen: state.isModalOpen,
      openModal: state.openModal,
      closeModal: state.closeModal,
      updateModalData: state.updateModalData,
    }))
  );
};

// Notification Hooks
export const useNotifications = () => {
  return useStore(
    useShallow((state) => ({
      notifications: state.notifications,
      unreadCount: state.unreadCount,
      addNotification: state.addNotification,
      removeNotification: state.removeNotification,
      markAsRead: state.markAsRead,
      markAllAsRead: state.markAllAsRead,
      clearNotifications: state.clearNotifications,
      clearOldNotifications: state.clearOldNotifications,
    }))
  );
};

// Convenience notification helpers
export const useToast = () => {
  const { addNotification } = useNotifications();

  return {
    success: (title: string, message?: string) =>
      addNotification({ type: 'success', title, message, duration: 3000 }),
    
    error: (title: string, message?: string) =>
      addNotification({ type: 'error', title, message, duration: 5000 }),
    
    warning: (title: string, message?: string) =>
      addNotification({ type: 'warning', title, message, duration: 4000 }),
    
    info: (title: string, message?: string) =>
      addNotification({ type: 'info', title, message, duration: 3000 }),
  };
};