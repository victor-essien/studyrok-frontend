import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from '@/components/layout/Sidebar';
import SidebarDesk from '@/components/layout/Sidebar/SidebarDesk';
import HeaderMobile from '@/components/layout/Header/HeaderMobile';
import { X, Clock, Trophy, Target } from 'lucide-react';
import { useOutletContext, useNavigate } from 'react-router-dom';
import type { QuizContextType } from '@/types';
const QuizInfo = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { formData, setFormData } = useOutletContext<QuizContextType>();
  const navigate = useNavigate();

  return (
    <div className=" bg-gray-50 dark:bg-gray-900 flex">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <SidebarDesk />
      {/* Main Area */}
      <div className="flex-1 flex flex-col lg:ml-64 min-h-screen">
        <HeaderMobile onOpen={() => setSidebarOpen(true)} />

        <div className="flex-1 p-4 sm:p-6 lg:p-10 w-full max-w-5xl mx-auto">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{formData.name}</h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Take a breath and start the quiz
            </p>
          </div>

          {/* QUIZ STATS GRID */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8"
          >
            <div className="rounded-2xl p-6 text-center bg-purple-100 dark:bg-purple-300 border border-purple-200 dark:border-purple-800">
              <Target className="w-8 h-8 text-purple-600 dark:text-purple-600 mx-auto mb-3" />
              <div className="text-3xl font-bold text-foreground mb-1">{formData.questionNo}</div>
              <div className="text-sm text-muted-foreground">Questions</div>
            </div>

            {formData.timer && (
              <div className="rounded-2xl p-6 text-center bg-blue-100 dark:bg-blue-300 border border-blue-200 dark:border-blue-800">
                <Clock className="w-8 h-8 text-blue-600 dark:text-blue-600 mx-auto mb-3" />
                <div className="text-3xl font-bold text-foreground mb-1">{formData.timer}</div>
                <div className="text-sm text-muted-foreground">Minutes</div>
              </div>
            )}

            <div className="rounded-2xl p-6 text-center bg-green-100 dark:bg-green-300 border border-green-200 dark:border-green-800">
              <Trophy className="w-8 h-8 text-green-600 dark:text-green-600 mx-auto mb-3" />
              <div className="text-3xl font-bold text-foreground mb-1">75%</div>
              <div className="text-sm text-muted-foreground">Passing Score</div>
            </div>
          </motion.div>

          {/* DIFFICULTY TAG */}
          <div className="flex items-center justify-center gap-3 mb-6">
            {/* <span
            className={`px-4 py-2 rounded-full text-sm font-semibold capitalize border border-border bg-accent text-accent-foreground`}
          >
            {mockQuiz.difficulty} Difficulty
          </span> */}
            <span
              className={`px-4 py-2 rounded-full text-sm font-semibold capitalize bg-yellow-100 text-yellow-700 
                    // difficultyColors[mockQuiz.difficulty]
                  `}
            >
              {/* {mockQuiz.difficulty} Difficulty */}
              Medium Difficulty
            </span>
          </div>

          {/* START BTN */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            // onClick={handleStartQuiz}
            className="w-full py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition
                    bg-gradient-to-r from-purple-600 to-blue-600 text-white"
          >
            Start Quiz
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default QuizInfo;
