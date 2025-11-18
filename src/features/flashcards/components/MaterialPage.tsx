import React, { useState, useEffect } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import SidebarDesk from '@/components/layout/Sidebar/SidebarDesk';
import HeaderMobile from '@/components/layout/Header/HeaderMobile';
import { motion } from 'framer-motion';

const mockStudyBoard = {
  id: 'board-1',
  title: 'Comp',
  icon: '🧬',
  materials: [
    { id: 1, title: 'Cell Fate and Development', date: 'OCT 31 2025', icon: '📄' },
    { id: 2, title: 'Band theory of solids', date: 'OCT 31 2025', icon: '📄' },
    { id: 3, title: 'Semiconductors Fundamental', date: 'OCT 31 2025', icon: '📄' },
    { id: 4, title: 'Cell Theory', date: 'OCT 31 2025', icon: '📄' },
    { id: 5, title: 'Solids and Liquid', date: 'OCT 31 2025', icon: '📄' },
    { id: 6, title: 'Conductors and diodes', date: 'OCT 31 2025', icon: '📄' },
  ],
};

const MaterialPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [isDisabled, setIsDisabled] = useState(true);

  const toggleSelect = (id: number) => {
    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  // Prevent rerender loops
  useEffect(() => {
    setIsDisabled(selectedIds.length === 0);
  }, [selectedIds]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <SidebarDesk />

      {/* Main Area */}
      <div className="flex-1 flex flex-col lg:ml-64 min-h-screen">
        <HeaderMobile onOpen={() => setSidebarOpen(true)} />

        <div className="flex-1 p-4 sm:p-6 lg:p-10 w-full max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Create From Materials
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Select materials you want to create the flashcard set from
            </p>
          </div>

          {/* Materials Grid */}
          <div
            className="
              grid 
              grid-cols-2 
             
              lg:grid-cols-3 
              gap-4 
              mt-4
            "
          >
            {mockStudyBoard.materials.map((material) => {
              const isSelected = selectedIds.includes(material.id);

              return (
                <motion.div
                  key={material.id}
                  whileHover={{ y: -2 }}
                  onClick={() => toggleSelect(material.id)}
                  className={`
                    flex items-center gap-3 p-4 rounded-xl cursor-pointer transition border
                    bg-white dark:bg-gray-800
                    ${
                      isSelected
                        ? 'border-purple-600 bg-purple-50 dark:bg-purple-900/20'
                        : 'border-gray-200 dark:border-gray-700'
                    }
                    hover:bg-gray-100 dark:hover:bg-gray-700
                  `}
                >
                  <span className="text-2xl">{material.icon}</span>

                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 dark:text-white text-sm ">
                      {material.title}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Footer Buttons */}
          <div className="flex gap-4 mt-8">
            <button
              className="
                flex-1 rounded-xl py-3 border
                bg-gray-100 dark:bg-gray-800
                border-gray-300 dark:border-gray-700
                text-gray-700 dark:text-gray-400
              "
            >
              Cancel
            </button>

            <button
              disabled={isDisabled}
              className={`flex-1 rounded-xl py-3 text-white transition
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

export default MaterialPage;
