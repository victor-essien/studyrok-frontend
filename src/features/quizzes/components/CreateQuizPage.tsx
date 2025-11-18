import React, { useState, useEffect } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import SidebarDesk from '@/components/layout/Sidebar/SidebarDesk';
import HeaderMobile from '@/components/layout/Header/HeaderMobile';
import { Clock } from 'lucide-react';

const CreateQuizPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [name, setName] = useState('');
  const [questionCount, setQuestionCount] = useState(10);
  const [timer, setTimer] = useState(5);
  const [isDisabled, setIsDisabled] = useState(true);

  // Prevent re-render loops
  useEffect(() => {
    setIsDisabled(name.trim().length === 0);
  }, [name]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <SidebarDesk />

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:ml-64 min-h-screen">
        <HeaderMobile onOpen={() => setSidebarOpen(true)} />

        <div className="flex-1 p-4 sm:p-6 lg:p-10 max-w-3xl mx-auto w-full">
          {/* Page Title */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Create a RokQuiz Set
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Create a quiz set to study your materials
            </p>
          </div>

          {/* Inputs */}
          <div className="flex flex-col gap-6">
            {/* Quiz Set Name */}
            <div className="flex flex-col">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Name your quiz set
              </label>
              <input
                type="text"
                name="setName"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 
              bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 
              focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none"
              />
            </div>

            {/* Number of Questions */}
            <div className="flex flex-col">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Number of questions
              </label>
              <input
                type="number"
                name="questionCount"
                value={questionCount}
                min={1}
                onChange={(e) => setQuestionCount(Number(e.target.value))}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 
              bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 
              focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none"
              />
            </div>

            {/* Timer in Minutes */}
            <div className="flex flex-col">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Timer (minutes)
              </label>
              <input
                type="number"
                name="timer"
                value={timer}
                min={1}
                onChange={(e) => setTimer(Number(e.target.value))}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 
              bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 
              focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none"
              />
            </div>

            {/* Create from Material */}
            <button
              className="w-full text-left bg-white dark:bg-gray-800 border border-purple-600 rounded-xl p-5 lg:p-7 
          shadow hover:shadow-md transition flex justify-between items-center"
            >
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Create from material</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Generate your flashcard set from your current study material
                </p>
              </div>

              <div className="p-3 rounded-md bg-orange-200 dark:bg-orange-300">
                <Clock className="w-6 h-6 text-orange-600" />
              </div>
            </button>

            {/* Buttons */}
            <div className="flex gap-4 mt-4">
              <button
                className="flex-1 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 
            text-gray-700 dark:text-gray-400 rounded-xl py-3"
              >
                Cancel
              </button>

              <button
                disabled={isDisabled}
                className={`flex-1 rounded-xl py-3 text-white transition 
              ${isDisabled ? 'bg-purple-400 cursor-not-allowed' : 'bg-purple-600 hover:bg-purple-700'}`}
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateQuizPage;
