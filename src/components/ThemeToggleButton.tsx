// components/ThemeToggleButton.tsx
import React from 'react';
import { Moon, Sun, Monitor } from 'lucide-react';
import { useStore } from '@/store/store';

export const ThemeToggleButton: React.FC = () => {
  // ❌ WRONG - Creates new object on every render
  // const { theme, setShowThemeModal } = useStore((state) => ({
  //   theme: state.theme,
  //   setShowThemeModal: state.setShowThemeModal,
  // }));

  // ✅ CORRECT - Use separate selectors
  const theme = useStore((state) => state.theme);
  const setShowThemeModal = useStore((state) => state.setShowThemeModal);

  const getIcon = () => {
    switch (theme) {
      case 'dark':
        return <Moon className="w-5 h-5" />;
      case 'light':
        return <Sun className="w-5 h-5" />;
      case 'system':
        return <Monitor className="w-5 h-5" />;
    }
  };

  return (
    <button
      onClick={() => setShowThemeModal(true)}
      className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      aria-label="Toggle theme"
      title="Change theme"
    >
      {getIcon()}
    </button>
  );
};
