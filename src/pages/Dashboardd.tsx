import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Plus,
  BookOpen,
  Clock,
  Target,
  TrendingUp,
  ChevronRight,
  Sparkles,
  Play,
  ArrowRight,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { useStore } from '@/store/store';
import { useBoards } from '@/features/study-boards/hooks/useBoards';
import SidebarDesk from '@/components/layout/Sidebar/SidebarDesk';
import Header from '@/components/layout/Header/Header';
import Sidebar from '@/components/layout/Sidebar';

// src/mocks/data/dashboard.mock.ts
import type { CreateBoardPayload, StudyBoard } from '@/types';
import { CreateStudyBoardModal } from '@/features/study-boards/components/CreateStudyBoardModal';
import { useModal, useCurrentUser } from '@/hooks/hooks';
import {
  useCreateBoardFromTopic,
  useCreateBoardFromFiles,
} from '@/features/study-boards/hooks/useBoards';

const mockDashboardBoards: StudyBoard[] = [
  {
    id: 'board-1',
    userId: 'user-1',
    title: 'Photosynthesis in Plants',
    description:
      'Complete study guide for understanding photosynthesis process, stages, and importance',
    topic: 'Photosynthesis',
    sourceType: 'files',
    sourceFiles: [],
    status: 'completed',
    aiModel: 'gemini-1.5-pro',
    tokensUsed: 12543,
    thumbnail: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=400',
    colorTheme: '#10b981',
    tags: ['biology', 'plants', 'science'],
    isPublic: false,
    createdAt: '2024-03-10T10:30:00Z',
    updatedAt: '2024-03-10T10:45:00Z',
    notesCount: 4,
    flashcardsCount: 28,
    quizzesCount: 2,
  },
  {
    id: 'board-2',
    userId: 'user-1',
    title: 'World War 2 History',
    description: 'Comprehensive study materials on WW2 causes, major events, and consequences',
    topic: 'World War 2',
    sourceType: 'topic',
    status: 'completed',
    aiModel: 'gemini-1.5-flash',
    tokensUsed: 8934,
    thumbnail: 'https://images.unsplash.com/photo-1577689687200-c8eb4b5e65e1?w=400',
    colorTheme: '#ef4444',
    tags: ['history', 'war', 'politics'],
    isPublic: true,
    createdAt: '2024-03-08T09:00:00Z',
    updatedAt: '2024-03-08T09:20:00Z',
    notesCount: 5,
    flashcardsCount: 35,
    quizzesCount: 3,
  },
  {
    id: 'board-3',
    userId: 'user-1',
    title: 'Calculus Fundamentals',
    description: 'Limits, derivatives, and integrals explained with examples',
    topic: 'Calculus',
    sourceType: 'files',
    status: 'completed',
    aiModel: 'gpt-4-turbo',
    tokensUsed: 15678,
    thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400',
    colorTheme: '#3b82f6',
    tags: ['math', 'calculus', 'advanced'],
    isPublic: false,
    createdAt: '2024-03-09T14:20:00Z',
    updatedAt: '2024-03-09T14:50:00Z',
    notesCount: 6,
    flashcardsCount: 42,
    quizzesCount: 4,
  },
  {
    id: 'board-4',
    userId: 'user-1',
    title: 'JavaScript ES6+ Features',
    description:
      'Modern JavaScript features including arrow functions, destructuring, and async/await',
    topic: 'JavaScript',
    sourceType: 'topic',
    status: 'completed',
    aiModel: 'gemini-1.5-pro',
    tokensUsed: 10234,
    thumbnail: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400',
    colorTheme: '#f59e0b',
    tags: ['programming', 'javascript', 'web-development'],
    isPublic: false,
    createdAt: '2024-03-07T16:00:00Z',
    updatedAt: '2024-03-07T16:30:00Z',
    notesCount: 8,
    flashcardsCount: 56,
    quizzesCount: 5,
  },
  {
    id: 'board-5',
    userId: 'user-1',
    title: 'Shakespeare: Hamlet Analysis',
    description: 'Deep dive into themes, characters, and literary devices in Hamlet',
    topic: 'Hamlet',
    sourceType: 'topic',
    status: 'completed',
    aiModel: 'gemini-1.5-pro',
    tokensUsed: 11234,
    thumbnail: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400',
    colorTheme: '#8b5cf6',
    tags: ['literature', 'shakespeare', 'drama'],
    isPublic: true,
    createdAt: '2024-03-05T11:00:00Z',
    updatedAt: '2024-03-05T11:30:00Z',
    notesCount: 5,
    flashcardsCount: 30,
    quizzesCount: 2,
  },
];
const Dashboardd: React.FC = () => {
  const navigate = useNavigate();
  //  const { data: boards, isLoading } = useBoards();
  // const user = useStore((state) => state.user);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  //  const { data: boardsData, isLoading } = useBoards();
  const { activeModal, closeModal, openModal } = useModal();
  const { logout, user } = useCurrentUser();

  const createFromTopic = useCreateBoardFromTopic();
  const createFromFiles = useCreateBoardFromFiles();
  console.log('useeeeeeeeeeeeeeeee', user);
  // Use mock data directly
  const boardss = mockDashboardBoards;
  const hasBoards = boardss.length > 0;
  const activeBoard = boardss.length > 0 ? boardss[0] : null;
  //   const boards = boardsData?.data || [];
  //   console.log('boards',boards)
  //   const hasBoards = boards.length > 0;

  //   // Get most recently accessed board
  //   const activeBoard = boards.length > 0 ? boards[0] : null;
  //   console.log(activeBoard)

  // Mock data
  const weeklyData = [
    { day: 'M', minutes: 45 },
    { day: 'T', minutes: 60 },
    { day: 'W', minutes: 30 },
    { day: 'T', minutes: 75 },
    { day: 'F', minutes: 50 },
    { day: 'S', minutes: 90 },
    { day: 'S', minutes: 55 },
  ];
  const handleCreateBoard = async (data: any) => {
    try {
      if (data.sourceType === 'topic') {
        await createFromTopic.mutateAsync({
          topic: data.topic,
          title: data.title,
          description: data.description,
          subject: data.subject,
          sourceType: 'topic',
          colorTheme: data.colorTheme,
        });
      } else {
        await createFromFiles.mutateAsync({
          payload: {
            topic: data.title,
            title: data.title,
            colorTheme: data.colorTheme,
            description: data.description,
            sourceType: 'files',
            files: data.files,
          },
        });
      }
      closeModal();
    } catch (error) {
      console.error('Failed to create board:', error);
    }
  };

  const handleClick = () => {
    logout();
    // openModal('createBoard');
  };

  const stats = {
    studyTime: 405,
    streak: user?.streak || 0,
    completed: 12,
  };

  //   // Empty State
  //   if (!hasBoards && !isLoading) {
  //     return (
  //       <div className="min-h-screen bg-white dark:bg-gray-950 flex items-center justify-center p-6">
  //         <div className="max-w-md w-full text-center">
  //           <motion.div
  //             initial={{ opacity: 0, scale: 0.9 }}
  //             animate={{ opacity: 1, scale: 1 }}
  //             className="mb-8"
  //           >
  //             <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-blue-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-purple-500/30">
  //               <Sparkles className="w-12 h-12 text-white" />
  //             </div>
  //             <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
  //               Welcome to StudyRok
  //             </h1>
  //             <p className="text-gray-500 dark:text-gray-400 mb-8 text-lg">
  //               Create your first study board to get started
  //             </p>
  //           </motion.div>

  //           <motion.button
  //             initial={{ opacity: 0, y: 20 }}
  //             animate={{ opacity: 1, y: 0 }}
  //             transition={{ delay: 0.1 }}
  //             whileHover={{ scale: 1.02 }}
  //             whileTap={{ scale: 0.98 }}
  //             onClick={() => navigate('/boards/create')}
  //             className="w-full py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-2xl font-semibold shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/40 transition-all flex items-center justify-center gap-2"
  //           >
  //             <Plus className="w-5 h-5" />
  //             Create Study Board
  //           </motion.button>

  //           <motion.div
  //             initial={{ opacity: 0 }}
  //             animate={{ opacity: 1 }}
  //             transition={{ delay: 0.2 }}
  //             className="mt-8 text-sm text-gray-400 dark:text-gray-600"
  //           >
  //             Upload files or enter a topic • AI generates materials • Start learning
  //           </motion.div>
  //         </div>
  //       </div>
  //     );
  //   }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-800 flex ">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <SidebarDesk />
      {/* Main Content */}
      <div className="flex-1  flex flex-col lg:ml-64 min-h-screen">
        {/* Header */}
        <Header onOpen={() => setSidebarOpen(true)} />

        <main className="flex-1 p-4 lg:p-8">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8 lg:hidden block"
            >
              <h1 className="text-2xl md:text-3xl font-bold truncate text-gray-900 dark:text-white mb-2">
                Welcome, {user?.name}
              </h1>
              <p className="text-gray-500 dark:text-gray-400">
                {new Date().toLocaleDateString('en-US', {
                  weekday: 'long',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            </motion.div>

            {/* Resume Studying Widget */}
            {activeBoard && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 }}
                className="mb-8"
              >
                <div className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl p-6 md:p-8 text-white relative overflow-hidden">
                  {/* Background decorations */}
                  <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
                  <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />

                  <div className="relative z-10">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                      <div className="flex-1">
                        <div className="text-sm font-medium opacity-90 mb-2">
                          Continue where you left off
                        </div>
                        <h2 className="text-2xl md:text-3xl font-bold mb-3">{activeBoard.title}</h2>
                        <div className="flex items-center gap-4 text-sm opacity-90 mb-4 md:mb-0">
                          <span>{activeBoard.notesCount} notes</span>
                          <span>•</span>
                          <span>{activeBoard.flashcardsCount} flashcards</span>
                          <span>•</span>
                          <span>{activeBoard.quizzesCount} quizzes</span>
                        </div>

                        {/* Progress bar */}
                        <div className="mt-4">
                          <div className="flex items-center justify-between text-xs mb-2">
                            <span className="opacity-90">Overall Progress</span>
                            <span className="font-semibold">65%</span>
                          </div>
                          <div className="w-full bg-white/20 rounded-full h-2 overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: '65%' }}
                              transition={{ delay: 0.3, duration: 1 }}
                              className="bg-white h-full rounded-full"
                            />
                          </div>
                        </div>
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => navigate(`/boards/${activeBoard.id}`)}
                        className="flex items-center gap-2 px-6 py-4 bg-white text-purple-600 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all whitespace-nowrap"
                      >
                        <Play className="w-5 h-5" />
                        Resume Studying
                        <ArrowRight className="w-5 h-5" />
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-gray-100 dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800"
              >
                <div className="flex items-center gap-3 mb-2">
                  <Clock className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  <span className="text-sm text-gray-500 dark:text-gray-400">Study Time</span>
                </div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white">
                  {stats.studyTime}m
                </div>
                <div className="text-xs text-gray-400 dark:text-gray-600 mt-1">This week</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="bg-gray-100 dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800"
              >
                <div className="flex items-center gap-3 mb-2">
                  <Target className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  <span className="text-sm text-gray-500 dark:text-gray-400">Completed</span>
                </div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white">
                  {stats.completed}
                </div>
                <div className="text-xs text-gray-400 dark:text-gray-600 mt-1">Materials</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl p-6 text-white"
              >
                <div className="flex items-center gap-3 mb-2">
                  <TrendingUp className="w-5 h-5" />
                  <span className="text-sm opacity-90">Day Streak</span>
                </div>
                <div className="text-3xl font-bold">{stats.streak}</div>
                <div className="text-xs opacity-75 mt-1">Keep it up!</div>
              </motion.div>
            </div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="mb-12"
            >
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Quick Actions
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  // onClick={() => navigate('/boards/create')}
                  onClick={handleClick}
                  className="p-5 bg-gradient-to-br from-purple-600 to-blue-600 text-white rounded-2xl text-left hover:shadow-lg hover:shadow-purple-500/30 transition-all group"
                >
                  <Plus className="w-6 h-6 mb-3" />
                  <div className="font-semibold mb-1">Create Study Board</div>
                  <div className="text-sm opacity-90">Start learning something new</div>
                </button>

                <button
                  onClick={() => navigate('/flashcards/review')}
                  className="p-5 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl text-left hover:border-purple-300 dark:hover:border-purple-700 transition-all group"
                >
                  <BookOpen className="w-6 h-6 text-gray-700 dark:text-gray-300 mb-3" />
                  <div className="font-semibold text-gray-900 dark:text-white mb-1">
                    Review Flashcards
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Practice what you've learned
                  </div>
                </button>
              </div>
            </motion.div>
            {/* Modal */}
            <CreateStudyBoardModal
              isOpen={activeModal === 'createBoard'}
              onClose={closeModal}
              onSubmit={handleCreateBoard}
              isLoading={createFromTopic.isPending || createFromFiles.isPending}
            />
            {/* Weekly Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800 mb-12"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">This Week</h3>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {stats.studyTime} minutes
                </span>
              </div>
              <ResponsiveContainer width="100%" height={180}>
                <LineChart data={weeklyData}>
                  <XAxis
                    dataKey="day"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#9ca3af', fontSize: 12 }}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#9ca3af', fontSize: 12 }}
                    width={30}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      border: 'none',
                      borderRadius: '12px',
                      boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                      fontSize: '12px',
                    }}
                    formatter={(value) => [`${value} min`, '']}
                  />
                  <Line
                    type="monotone"
                    dataKey="minutes"
                    stroke="url(#gradient)"
                    strokeWidth={3}
                    dot={false}
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#8b5cf6" />
                      <stop offset="100%" stopColor="#3b82f6" />
                    </linearGradient>
                  </defs>
                </LineChart>
              </ResponsiveContainer>
            </motion.div>

            {/* Recent Boards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Recent Boards
                </h2>
                <button
                  onClick={() => navigate('/boards')}
                  className="text-sm text-purple-600 dark:text-purple-400 hover:underline flex items-center gap-1"
                >
                  View all
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-3">
                {boardss.slice(0, 3).map((board, index) => (
                  <motion.button
                    key={board.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.05 }}
                    onClick={() => navigate(`/boards/${board.id}`)}
                    className="w-full p-4 bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl text-left hover:border-purple-300 dark:hover:border-purple-700 transition-all group"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: board.colorTheme + '20' }}
                      >
                        <BookOpen className="w-6 h-6" style={{ color: board.colorTheme }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 dark:text-white truncate group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                          {board.title}
                        </h3>
                        <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400 mt-1">
                          <span>{board.notesCount} notes</span>
                          <span>•</span>
                          <span>{board.flashcardsCount} cards</span>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors flex-shrink-0" />
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboardd;
