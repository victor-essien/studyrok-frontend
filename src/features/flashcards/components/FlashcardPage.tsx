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
  const [activeStudyboard, setActiveStudyBoard] = useState('Comp');
  const [flashcards, setFlashcards] = useState<flashcard[]>([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedNote, setSelectedNote] = useState('');
  const [numFlashcards, setNumFlashcards] = useState(5);
  const [isGenerating, setIsGenerating] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
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

  const generateFlashcards = async () => {
    if (!selectedNote) return;

    setIsGenerating(true);
    const note = notes.find((n) => n.id.toString() === selectedNote);
    if (!note) return;
    // Simulate AI generation with sample flashcards
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const newFlashcards = Array.from({ length: numFlashcards }, (_, i) => ({
      id: Date.now() + i,
      question: `Sample Question ${i + 1} from ${note.title}`,
      answer: `This is the answer to question ${i + 1}. It contains detailed information extracted from the note content.`,
      noteId: note.id,
      noteTitle: note.title,
    }));

    setFlashcards(newFlashcards);

    setIsGenerating(false);
    setShowCreateModal(false);
    setCurrentCardIndex(0);
  };

  const handleNextCard = () => {
    if (currentCardIndex < flashcards.length - 1) {
      setCurrentCardIndex((prev) => prev + 1);
      setIsFlipped(false);
    }
  };

  const handlePrevCard = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex((prev) => prev - 1);
      setIsFlipped(false);
    }
  };

  const handleReset = () => {
    setCurrentCardIndex(0);
    setIsFlipped(false);
  };

  const currentCard = flashcards[currentCardIndex];
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
          {flashcards.length === 0 ? (
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
                onClick={() => setShowCreateModal(true)}
                className="bg-purple-600  text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition inline-flex items-center gap-2 font-medium"
              >
                <Plus className="w-5 h-5" />
                Create Flashcards
              </button>
            </div>
          ) : (
            // Flashcard Display
            <div className="space-y-6">
              {/* Progress Bar */}
              <div className="bg-white dark:bg-gray-700 rounded-xl shadow-md p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-400">
                    Card {currentCardIndex + 1} of {flashcards.length}
                  </span>
                  <button
                    onClick={handleReset}
                    className="text-purple-600 hover:text-purple-700 flex items-center gap-1 text-sm"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Reset
                  </button>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-400 rounded-full h-2">
                  <div
                    className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${((currentCardIndex + 1) / flashcards.length) * 100}%` }}
                  />
                </div>
              </div>

              {/* Flashcard */}
              <div className="perspective-1000">
                <div
                  onClick={() => setIsFlipped(!isFlipped)}
                  className={`relative w-full h-96 cursor-pointer transition-transform duration-500 transform-style-3d ${
                    isFlipped ? 'rotate-y-180' : ''
                  }`}
                  style={{
                    transformStyle: 'preserve-3d',
                    transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                  }}
                >
                  {/* Front */}
                  <div
                    className="absolute w-full h-full bg-white dark:bg-gray-700 rounded-2xl shadow-2xl p-8 backface-hidden flex flex-col items-center justify-center"
                    style={{ backfaceVisibility: 'hidden' }}
                  >
                    <div className="text-sm font-medium text-purple-600 mb-4">QUESTION</div>
                    <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100 text-center">
                      {currentCard?.question}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-200 mt-8">Click to flip</p>
                  </div>

                  {/* Back */}
                  <div
                    className="absolute w-full h-full bg-gradient-to-br from-purple-200 to-purple-600 rounded-2xl shadow-2xl p-8 backface-hidden flex flex-col items-center justify-center"
                    style={{
                      backfaceVisibility: 'hidden',
                      transform: 'rotateY(180deg)',
                    }}
                  >
                    <div className="text-sm font-medium text-purple-200 mb-4">ANSWER</div>
                    <p className="text-xl text-white dark:text-gray-800 text-center">
                      {currentCard?.answer}
                    </p>
                    <p className="text-sm text-purple-200 mt-8">Click to flip back</p>
                  </div>
                </div>
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-center gap-4">
                <button
                  onClick={handlePrevCard}
                  disabled={currentCardIndex === 0}
                  className="bg-white dark:bg-gray-700 p-3 rounded-lg shadow-md hover:shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="w-6 h-6 text-gray-700 dark:text-gray-400" />
                </button>
                <div className="text-gray-600 dark:text-gray-300 font-medium">
                  {currentCardIndex + 1} / {flashcards.length}
                </div>
                <button
                  onClick={handleNextCard}
                  disabled={currentCardIndex === flashcards.length - 1}
                  className="bg-white dark:bg-gray-700 p-3 rounded-lg shadow-md hover:shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronRight className="w-6 h-6 text-gray-700 dark:text-gray-400" />
                </button>
              </div>

              {/* Source Note Info */}
              <div className="bg-white dark:bg-dark-700 rounded-xl shadow-md p-4 text-center">
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Generated from:{' '}
                  <span className="font-medium text-gray-900 dark:text-gray-100">
                    {currentCard?.noteTitle}
                  </span>
                </p>
              </div>
            </div>
          )}

          {/* Create Flashcards Modal */}
          {showCreateModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
              <div className="bg-white dark:bg-gray-700 rounded-2xl shadow-2xl max-w-md w-full p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    Create Flashcards
                  </h2>
                  <button
                    onClick={() => setShowCreateModal(false)}
                    className="text-gray-400 dark:text-gray-200 dark:hover:text-gray-300 hover:text-gray-600"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="space-y-4">
                  {/* Select Note */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                      Select Note
                    </label>
                    <select
                      value={selectedNote}
                      onChange={(e) => setSelectedNote(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 dark:hover:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    >
                      <option value="">Choose a note...</option>
                      {notes.map((note) => (
                        <option key={note.id} value={note.id}>
                          {note.title}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Number of Flashcards */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                      Number of Flashcards
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="20"
                      value={numFlashcards}
                      onChange={(e) => setNumFlashcards(parseInt(e.target.value) || 5)}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    />
                  </div>

                  {/* Generate Button */}
                  <button
                    onClick={generateFlashcards}
                    disabled={!selectedNote || isGenerating}
                    className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                  >
                    {isGenerating ? (
                      <span className="flex items-center justify-center gap-2">
                        <div className="w-5 h-5 border-2 border-white dark:border-gray-800 border-t-transparent rounded-full animate-spin" />
                        Generating...
                      </span>
                    ) : (
                      'Generate Flashcards'
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FlashcardPage;
