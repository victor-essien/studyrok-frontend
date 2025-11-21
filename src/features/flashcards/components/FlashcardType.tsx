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
  const [numFlashcards, setNumFlashcards] = useState(1);
  const [isDisabled, setIsDisabled] = useState(true);
  const [selected, setSelected] = useState<string>('');
  const [multipleCount, setMultipleCount] = useState<number>(1);
  const [definitionCount, setDefinitionCount] = useState<number>(1);
  const [fillCount, setFillCount] = useState<number>(1);

  // const isSelected = selected === type.id;

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
          <div className="grid grid-cols-1 sm:grid-cols-2 px-0 md:px-4 lg:grid-cols-1 gap-4 mt-6">
            <motion.div
              whileHover={{ y: -3 }}
              onClick={() => setSelected('terms_definition')}
              className={`
                    flex flex-col gap-4 p-4 rounded-xl border-2 cursor-pointer transition
                    bg-white dark:bg-gray-800
                    ${
                      selected === 'terms_definition'
                        ? 'border-purple-600 '
                        : 'border-gray-200 dark:border-gray-700'
                    }
                    hover:bg-gray-100 dark:hover:bg-gray-700
                  `}
            >
              {/* Icon + Label */}
              <div className="flex items-center gap-3">
                <span className="text-gray-900 dark:text-gray-200">
                  <CreditCard className="w-5 h-5" />
                </span>
                <p className="font-semibold text-gray-900 dark:text-white text-sm">
                  Terms & Definition
                </p>
              </div>

              {/* Number Input */}
              <div className="relative flex items-center w-full">
                {/* Decrement Button */}
                <button
                  type="button"
                  onClick={() => setDefinitionCount((prev) => Math.max(1, prev - 1))}
                  className="
      absolute left-2 z-10 px-2 py-1 rounded-md
      text-gray-600 dark:text-gray-300
      hover:bg-gray-200 dark:hover:bg-gray-700
    "
                >
                  −
                </button>

                {/* Number Input */}
                <input
                  type="number"
                  min="1"
                  max="20"
                  value={definitionCount}
                  onChange={(e) => setDefinitionCount(Number(e.target.value))}
                  className="
      w-full text-center px-10 py-2 rounded-lg border
      border-gray-300 dark:border-gray-600
      bg-white dark:bg-gray-800
      text-gray-900 dark:text-gray-100
      focus:ring-2 focus:ring-purple-500 focus:border-transparent
      appearance-none
    "
                />

                {/* Increment Button */}
                <button
                  type="button"
                  onClick={() => setDefinitionCount((prev) => Math.min(20, prev + 1))}
                  className="
      absolute right-2 z-10 px-2 py-1 rounded-md
      text-gray-600 dark:text-gray-300
      hover:bg-gray-200 dark:hover:bg-gray-700
    "
                >
                  +
                </button>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ y: -3 }}
              onClick={() => setSelected('multiple_choice')}
              className={`
                    flex flex-col gap-4 p-4 rounded-xl border-2 cursor-pointer transition
                    bg-white dark:bg-gray-800
                    ${
                      selected === 'multiple_choice'
                        ? 'border-purple-600 '
                        : 'border-gray-200 dark:border-gray-700'
                    }
                    hover:bg-gray-100 dark:hover:bg-gray-700
                  `}
            >
              {/* Icon + Label */}
              <div className="flex items-center gap-3">
                <span className="text-gray-900 dark:text-gray-200">
                  <ListChecks className="w-5 h-5" />
                </span>
                <p className="font-semibold text-gray-900 dark:text-white text-sm">
                  Multiple Choice
                </p>
              </div>

              {/* Number Input */}
              <div className="relative flex items-center w-full">
                {/* Decrement Button */}
                <button
                  type="button"
                  onClick={() => setMultipleCount((prev) => Math.max(1, prev - 1))}
                  className="
      absolute left-2 z-10 px-2 py-1 rounded-md
      text-gray-600 dark:text-gray-300
      hover:bg-gray-200 dark:hover:bg-gray-700
    "
                >
                  −
                </button>

                {/* Number Input */}
                <input
                  type="number"
                  min="1"
                  max="20"
                  value={multipleCount}
                  onChange={(e) => setMultipleCount(Number(e.target.value))}
                  className="
      w-full text-center px-10 py-2 rounded-lg border
      border-gray-300 dark:border-gray-600
      bg-white dark:bg-gray-800
      text-gray-900 dark:text-gray-100
      focus:ring-2 focus:ring-purple-500 focus:border-transparent
      appearance-none
    "
                />

                {/* Increment Button */}
                <button
                  type="button"
                  onClick={() => setMultipleCount((prev) => Math.min(20, prev + 1))}
                  className="
      absolute right-2 z-10 px-2 py-1 rounded-md
      text-gray-600 dark:text-gray-300
      hover:bg-gray-200 dark:hover:bg-gray-700
    "
                >
                  +
                </button>
              </div>
            </motion.div>
            <motion.div
              whileHover={{ y: -3 }}
              onClick={() => setSelected('fill_blank')}
              className={`
                    flex flex-col gap-4 p-4 rounded-xl  border-2 cursor-pointer transition
                    bg-white dark:bg-gray-800
                    ${
                      selected === 'fill_blank'
                        ? 'border-purple-600 '
                        : 'border-gray-200 dark:border-gray-700'
                    }
                    hover:bg-gray-100 dark:hover:bg-gray-700
                  `}
            >
              {/* Icon + Label */}
              <div className="flex items-center gap-3">
                <span className="text-gray-900 dark:text-gray-200">
                  <Equal className="w-5 h-5" />
                </span>
                <p className="font-semibold text-gray-900 dark:text-white text-sm">
                  Fill in the Blank
                </p>
              </div>

              {/* Number Input */}
              <div className="relative flex items-center w-full">
                {/* Decrement Button */}
                <button
                  type="button"
                  onClick={() => setFillCount((prev) => Math.max(1, prev - 1))}
                  className="
      absolute left-2 z-10 px-2 py-1 rounded-md
      text-gray-600 dark:text-gray-300
      hover:bg-gray-200 dark:hover:bg-gray-700
    "
                >
                  −
                </button>

                {/* Number Input */}
                <input
                  type="number"
                  min="1"
                  max="20"
                  value={fillCount}
                  onChange={(e) => setFillCount(Number(e.target.value))}
                  className="
      w-full text-center px-10 py-2 rounded-lg border
      border-gray-300 dark:border-gray-600
      bg-white dark:bg-gray-800
      text-gray-900 dark:text-gray-100
      focus:ring-2 focus:ring-purple-500 focus:border-transparent
      appearance-none
    "
                />

                {/* Increment Button */}
                <button
                  type="button"
                  onClick={() => setFillCount((prev) => Math.min(20, prev + 1))}
                  className="
      absolute right-2 z-10 px-2 py-1 rounded-md
      text-gray-600 dark:text-gray-300
      hover:bg-gray-200 dark:hover:bg-gray-700
    "
                >
                  +
                </button>
              </div>
            </motion.div>
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
