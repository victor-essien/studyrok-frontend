import type { StateCreator } from 'zustand';

export type Theme = 'light' | 'dark' | 'system';

export interface UIState {
  theme: Theme;
  sidebarOpen: boolean;
  sidebarCollapsed: boolean;
  mobileMenuOpen: boolean;
  isFullscreen: boolean;
  showThemeModal: boolean;
}

export interface UIActions {
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  setShowThemeModal: (show: boolean) => void;
  toggleSidebarCollapsed: () => void;
  setMobileMenuOpen: (open: boolean) => void;
  toggleMobileMenu: () => void;
  toggleFullscreen: () => void;
  resetUI: () => void;
}

export type UISlice = UIState & UIActions;

const initialState: UIState = {
  theme: 'light',
  sidebarOpen: true,
  sidebarCollapsed: false,
  mobileMenuOpen: false,
  isFullscreen: false,
  showThemeModal: false,
};

const applyTheme = (theme: Theme) => {
  if (theme === 'dark') {
    document.documentElement.classList.add('dark');
  } else if (theme === 'light') {
    document.documentElement.classList.remove('dark');
  } else {
    // System preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    document.documentElement.classList.toggle('dark', prefersDark);
  }
};

export const createUISlice: StateCreator<UISlice, [['zustand/devtools', never]]> = (set, get) => ({
  ...initialState,

  setTheme: (theme) => {
    set({ theme }, false, 'ui/setTheme');
    applyTheme(theme);
  },

  toggleTheme: () => {
    // Open theme modal instead of directly toggling
    set({ showThemeModal: true }, false, 'ui/toggleTheme');
  },

  toggleSidebar: () => {
    set((state) => ({ sidebarOpen: !state.sidebarOpen }), false, 'ui/toggleSidebar');
  },

  setSidebarOpen: (open) => {
    set({ sidebarOpen: open }, false, 'ui/setSidebarOpen');
  },

  toggleSidebarCollapsed: () => {
    set(
      (state) => ({ sidebarCollapsed: !state.sidebarCollapsed }),
      false,
      'ui/toggleSidebarCollapsed'
    );
  },

  setMobileMenuOpen: (open) => {
    set({ mobileMenuOpen: open }, false, 'ui/setMobileMenuOpen');
  },

  toggleMobileMenu: () => {
    set((state) => ({ mobileMenuOpen: !state.mobileMenuOpen }), false, 'ui/toggleMobileMenu');
  },

  toggleFullscreen: () => {
    set(
      (state) => {
        const newFullscreen = !state.isFullscreen;

        if (newFullscreen) {
          document.documentElement.requestFullscreen?.();
        } else {
          document.exitFullscreen?.();
        }

        return { isFullscreen: newFullscreen };
      },
      false,
      'ui/toggleFullscreen'
    );
  },
  setShowThemeModal: (show) => {
    set({ showThemeModal: show }, false, 'ui/setShowThemeModal');
  },
  resetUI: () => {
    set(initialState, false, 'ui/reset');
  },
});
