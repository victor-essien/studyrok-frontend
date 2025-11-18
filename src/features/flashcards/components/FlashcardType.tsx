import React, { useState, useEffect } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import SidebarDesk from '@/components/layout/Sidebar/SidebarDesk';
import HeaderMobile from '@/components/layout/Header/HeaderMobile';
import { motion } from 'framer-motion';
import { CreditCard, ListChecks, Equal } from 'lucide-react';

const flashcardType = [
  {
    id: 'terms_definition',
    label: 'Terms & Definitions',
    icon: <CreditCard className="w-5 h-5" />,
  },
  {
    id: 'multiple_choice',
    label: 'Multiple Choice',
    icon: <ListChecks className="w-5 h-5" />,
  },
  {
    id: 'fill_blank',
    label: 'Fill in the Blank',
    icon: <Equal className="w-5 h-5" />,
  },
];

const FlashcardType = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selected, setSelected] = useState('');
  const [numFlashcards, setNumFlashcards] = useState(1);
  const [isDisabled, setIsDisabled] = useState(true);

  // Fix re-render issue
  useEffect(() => {
    setIsDisabled(selected === '');
  }, [selected]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <SidebarDesk />

      {/* Main Area */}
      <div className="flex-1 flex flex-col lg:ml-64 min-h-screen">
        <HeaderMobile onOpen={() => setSidebarOpen(true)} />

        <div className="flex-1 p-4 sm:p-6 lg:p-10 max-w-3xl mx-auto w-full">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Select Flashcard Type
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Choose the type of flashcards and the amount you want to create.
          </p>

          {/* Flashcard Type Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
            {flashcardType.map((type) => {
              const isSelected = selected === type.id;

              return (
                <motion.div
                  key={type.id}
                  whileHover={{ y: -3 }}
                  onClick={() => setSelected(type.id)}
                  className={`
                    flex flex-col gap-4 p-4 rounded-xl border cursor-pointer transition
                    bg-white dark:bg-gray-800
                    ${
                      isSelected
                        ? 'border-purple-600 shadow-lg shadow-purple-300/20 dark:shadow-purple-900/20'
                        : 'border-gray-200 dark:border-gray-700'
                    }
                    hover:bg-gray-100 dark:hover:bg-gray-700
                  `}
                >
                  {/* Icon + Label */}
                  <div className="flex items-center gap-3">
                    <span className="text-gray-900 dark:text-gray-200">{type.icon}</span>
                    <p className="font-semibold text-gray-900 dark:text-white text-sm">
                      {type.label}
                    </p>
                  </div>

                  {/* Number Input */}
                  <input
                    type="number"
                    min="1"
                    max="20"
                    value={numFlashcards}
                    onChange={(e) => setNumFlashcards(Number(e.target.value))}
                    className="
                      w-full px-3 py-2 rounded-lg border
                      border-gray-300 dark:border-gray-600
                      bg-white dark:bg-gray-800 
                      text-gray-900 dark:text-gray-100
                      focus:ring-2 focus:ring-purple-500 focus:border-transparent
                    "
                  />
                </motion.div>
              );
            })}
          </div>

          {/* Buttons */}
          <div className="flex gap-4 mt-10">
            <button
              className="
                flex-1 py-3 rounded-xl border
                bg-gray-100 dark:bg-gray-800
                border-gray-300 dark:border-gray-700
                text-gray-700 dark:text-gray-400
              "
            >
              Cancel
            </button>

            <button
              disabled={isDisabled}
              className={`
                flex-1 py-3 rounded-xl text-white transition
                ${
                  isDisabled
                    ? 'bg-purple-400 cursor-not-allowed'
                    : 'bg-purple-600 hover:bg-purple-700'
                }
              `}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlashcardType;
