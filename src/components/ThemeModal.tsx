// components/ThemeModal.tsx
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Sun, Monitor, Check, X } from 'lucide-react';
import { useStore } from '@/store/store';
import type { Theme } from '@/store/slices/uiSlice';

export const ThemeModal: React.FC = () => {
  const theme = useStore((state) => state.theme);
  const showThemeModal = useStore((state) => state.showThemeModal);
  const setTheme = useStore((state) => state.setTheme);
  const setShowThemeModal = useStore((state) => state.setShowThemeModal);

  const themes: Array<{ value: Theme; label: string; icon: typeof Sun; description: string }> = [
    {
      value: 'light',
      label: 'Light',
      icon: Sun,
      description: 'Bright and clean interface',
    },
    {
      value: 'dark',
      label: 'Dark',
      icon: Moon,
      description: 'Easy on your eyes in low light',
    },
    {
      value: 'system',
      label: 'System',
      icon: Monitor,
      description: 'Matches your device settings',
    },
  ];

  const handleSelectTheme = (selectedTheme: Theme) => {
    setTheme(selectedTheme);
    // Optional: Auto-close after selection
    setTimeout(() => {
      setShowThemeModal(false);
    }, 300);
  };

  return (
    <AnimatePresence>
      {showThemeModal && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowThemeModal(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={() => setShowThemeModal(false)}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md p-6"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Choose Theme</h2>
                <button
                  onClick={() => setShowThemeModal(false)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition"
                >
                  <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                </button>
              </div>

              {/* Theme Options */}
              <div className="space-y-3">
                {themes.map((themeOption) => (
                  <motion.button
                    key={themeOption.value}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleSelectTheme(themeOption.value)}
                    className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all ${
                      theme === themeOption.value
                        ? 'border-purple-600 bg-purple-50 dark:bg-purple-900/20'
                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                    }`}
                  >
                    {/* Icon */}
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        theme === themeOption.value
                          ? 'bg-purple-600 text-white'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                      }`}
                    >
                      <themeOption.icon className="w-6 h-6" />
                    </div>

                    {/* Label and Description */}
                    <div className="flex-1 text-left">
                      <div className="font-semibold text-gray-900 dark:text-white">
                        {themeOption.label}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {themeOption.description}
                      </div>
                    </div>

                    {/* Check Icon */}
                    {theme === themeOption.value && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center"
                      >
                        <Check className="w-4 h-4 text-white" />
                      </motion.div>
                    )}
                  </motion.button>
                ))}
              </div>

              {/* Info Text */}
              <p className="mt-6 text-sm text-gray-600 dark:text-gray-400 text-center">
                Your preference will be saved automatically
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
