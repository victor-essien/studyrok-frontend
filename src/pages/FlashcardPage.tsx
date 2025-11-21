import React, { useState, useEffect } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import SidebarDesk from '@/components/layout/Sidebar/SidebarDesk';
import Header from '@/components/layout/Header/Header';
import { BookOpen, Plus, ChevronLeft, ChevronRight, RotateCcw, X } from 'lucide-react';
import { motion } from 'framer-motion';
type flashcard = {
  id: number;
  question: string;
  answer: string;
  noteId: number;
  noteTitle: string;
};
const mockStudyBoard = {
  id: 'board-1',
  title: 'Comp',
  icon: '🧬',
  colorTheme: '#c4b5fd',
  quizzesCount: 0,
  flashcardsCount: 0,
  explainersCount: 0,
  materialsCount: 0,
  arcadeCount: 0,
  tutorMeCount: 0,
  audioRecapCount: 0,
  topics: [
    { id: 1, title: 'Cellular Development', progress: 0 },
    { id: 2, title: 'Cellular Communication', progress: 0 },
    { id: 3, title: 'Cellular Development and Specialization', progress: 0 },
  ],
  materials: [
    { id: 1, title: 'Cell Fate and Development', date: 'OCT 31 2025', icon: '📄' },
    { id: 2, title: 'Cell Fate and Development', date: 'OCT 31 2025', icon: '📄' },
    { id: 3, title: 'Cell Fate and Development', date: 'OCT 31 2025', icon: '📄' },
  ],
  completionPercentage: 0,
};

const flashcardss: flashcard[] = [
  {
    id: 1,
    question: 'What is a variable in programming?',
    answer: 'A storage location used to hold data that can change during program execution.',
    noteId: 101,
    noteTitle: 'Intro to Programming',
  },
  {
    id: 2,
    question: 'What does HTML stand for?',
    answer: 'HyperText Markup Language.',
    noteId: 102,
    noteTitle: 'Web Development Basics',
  },
  {
    id: 3,
    question: 'What is an array?',
    answer: 'A data structure that stores multiple values in a single variable.',
    noteId: 103,
    noteTitle: 'Data Structures',
  },
  {
    id: 4,
    question: 'What is a function?',
    answer: 'A block of reusable code that performs a specific task.',
    noteId: 101,
    noteTitle: 'Intro to Programming',
  },
  {
    id: 5,
    question: 'What is React?',
    answer: 'A JavaScript library for building user interfaces.',
    noteId: 104,
    noteTitle: 'React Fundamentals',
  },
  {
    id: 6,
    question: 'What is an API?',
    answer: 'A set of rules that allows software applications to communicate with each other.',
    noteId: 105,
    noteTitle: 'Backend Concepts',
  },
  {
    id: 7,
    question: 'What does CSS control?',
    answer: 'The layout, design, and appearance of web pages.',
    noteId: 102,
    noteTitle: 'Web Development Basics',
  },
  {
    id: 8,
    question: 'What is a loop?',
    answer: 'A programming construct that repeats a block of code until a condition is met.',
    noteId: 101,
    noteTitle: 'Intro to Programming',
  },
  {
    id: 9,
    question: 'What is TypeScript?',
    answer: 'A superset of JavaScript that adds static typing.',
    noteId: 104,
    noteTitle: 'React Fundamentals',
  },
  {
    id: 10,
    question: 'What is a compiler?',
    answer: 'A program that translates source code into machine code.',
    noteId: 106,
    noteTitle: 'Computer Systems',
  },
];

const FlashcardPage = () => {
  // Sample notes for the studyboard
  const [notes] = useState([
    {
      id: 1,
      title: 'Introduction to Computer Science',
      content:
        'Computer science is the study of computation, information, and automation. It encompasses both theoretical and practical aspects...',
    },
    {
      id: 2,
      title: 'Data Structures Overview',
      content:
        'Data structures are ways of organizing and storing data efficiently. Common types include arrays, linked lists, stacks, queues, trees, and graphs...',
    },
    {
      id: 3,
      title: 'Algorithms Fundamentals',
      content:
        'An algorithm is a step-by-step procedure for solving a problem. Key characteristics include correctness, efficiency, and clarity...',
    },
  ]);
  // Check if flashcards exist for this studyboard
  //   useEffect(() => {
  //     loadFlashcards();
  //   }, [activeStudyboard]);

  //   const loadFlashcards = async () => {
  // try {
  //   const result = await window.Storage.get(`flashcards:${activeStudyboard}`);
  //   if (result && result.value) {
  //     setFlashcards(JSON.parse(result.value));
  //   } else {
  //     setFlashcards([]);
  //   }
  // } catch (error) {
  //   setFlashcards([]);
  // }
  //};
  // useEffect(() => {
  //     setFlashcards(fla)
  // }, [activeStudyboard]);

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-800 flex">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <SidebarDesk />

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:ml-64   min-h-screen">
        {/* Header */}
        <Header onOpen={() => setSidebarOpen(true)} />
        <div className="flex-1 p-4 lg:p-8">
          {/* Study Boards */}
          <div className="flex flex-wrap items-center mb-7  gap-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              className="flex items-center gap-3 px-4 lg:px-6 py-3 lg:py-4 bg-purple-100 dark:bg-gray-800  border-gray-200 dark:border-gray-700 rounded-2xl"
            >
              <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gray-700 dark:bg-purple-300 rounded-lg flex items-center justify-center text-xl lg:text-2xl">
                {mockStudyBoard.icon}
              </div>
              <span className="font-semibold text-gray-900 dark:text-white">
                {mockStudyBoard.title}
              </span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              className="flex items-center gap-2 px-4 lg:px-6 py-3 lg:py-4 border-2 border-dashed border-gray-300 rounded-2xl text-gray-600 dark:text-gray-200 "
            >
              <Plus className="w-5 h-5" />
              <span className="font-semibold">Add new Set</span>
            </motion.button>
          </div>
          {flashcardss.length === 0 ? (
            // Empty State
            <div className="bg-white  dark:bg-gray-700 rounded-2xl  shadow-lg p-12 text-center">
              <div className="bg-purple-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <BookOpen className="w-10 h-10 text-purple-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-50 mb-3">
                No Flashcards Yet
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-md mx-auto">
                Create your first set of flashcards from your notes to start studying
              </p>
              <button
                // onClick={() => setShowCreateModal(true)}
                className="bg-purple-600  text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition inline-flex items-center gap-2 font-medium"
              >
                <Plus className="w-5 h-5" />
                Create Flashcards
              </button>
            </div>
          ) : (
            // Flashcard Sets
            <div className="flex flex-col items-center">
              <p>Created flashcard sets appear here</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FlashcardPage;
