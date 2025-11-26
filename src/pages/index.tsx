import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus,
  Search,
  Filter,
  Grid3x3,
  List,
  BookOpen,
  Clock,
  MoreVertical,
  Trash2,
  Edit,
  Share2,
  Copy,
  FileText,
  Video,
  X,
  ChevronDown,
  CheckCircle2,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
// import { mockDashboardBoards } from '@/mocks/data/dashboard.mock';
import type { StudyBoard } from '@/types';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header/Header';
import SidebarDesk from '@/components/layout/Sidebar/SidebarDesk';
import HeaderMobile from '@/components/layout/Header/HeaderMobile';
const mockDashboardBoards: StudyBoard[] = [
  {
    id: 'board-1',
    userId: 'user-1',
    title: 'Photosynthesis in Plants',
    description:
      'Complete study guide for understanding photosynthesis process, stages, and importance',
    topic: 'Photosynthesis',
    sourceType: 'pdf',
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
    sourceType: 'doc',
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
const board = {
  id: 'board-3',
  userId: 'user-1',
  title: 'Calculus Fundamentals',
  description: 'Limits, derivatives, and integrals explained with examples',
  topic: 'Calculus',
  sourceType: 'doc',
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
};

type ViewMode = 'grid' | 'list';
type FilterType = 'all' | 'recent' | 'completed' | 'in-progress';
type SortType = 'recent' | 'oldest' | 'name' | 'progress';

const StudyBoards: React.FC = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<FilterType>('all');
  const [sortType, setSortType] = useState<SortType>('recent');
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [selectedBoard, setSelectedBoard] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentBoardId, setCurrentBoardId] = useState<string>('board-3');
  const [showBoardSwitch, setShowBoardSwitch] = useState(false);

  // Use mock data
  const allBoards = mockDashboardBoards;

  // Filter and search boards
  const filteredBoards = allBoards.filter((board: any) => {
    const matchesSearch =
      board.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      board.topic.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilter =
      filterType === 'all'
        ? true
        : filterType === 'recent'
          ? new Date(board.createdAt).getTime() > Date.now() - 7 * 24 * 60 * 60 * 1000
          : filterType === 'completed'
            ? board.status === 'completed'
            : filterType === 'in-progress'
              ? board.status === 'processing'
              : true;

    return matchesSearch && matchesFilter;
  });

  // Sort boards
  const sortedBoards = [...filteredBoards].sort((a, b) => {
    switch (sortType) {
      case 'recent':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case 'oldest':
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      case 'name':
        return a.title.localeCompare(b.title);
      case 'progress':
        return b.notesCount! + b.flashcardsCount! - (a.notesCount! + a.flashcardsCount!);
      default:
        return 0;
    }
  });

  const handleDeleteBoard = (boardId: string) => {
    console.log('Delete board:', boardId);
    // Implement delete logic
  };

  const handleDuplicateBoard = (boardId: string) => {
    console.log('Duplicate board:', boardId);
    // Implement duplicate logic
  };

  const handleShareBoard = (boardId: string) => {
    console.log('Share board:', boardId);
    // Implement share logic
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-800 flex">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <SidebarDesk />
      {/* Main Content */}
      <div className="flex-1  flex flex-col lg:ml-64 min-h-screen">
        {/* Header */}
        <HeaderMobile onOpen={() => setSidebarOpen(true)} />
        <main className="flex-1  lg:p-8">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="mb-8  ">
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6"
              >
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                    Study Boards
                  </h1>
                  <p className="text-gray-600 dark:text-gray-400">
                    {sortedBoards.length} {sortedBoards.length === 1 ? 'board' : 'boards'} in total
                  </p>
                </div>
                <div className="flex justify-between lg:block">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => navigate('/boards/create')}
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
                  >
                    <Plus className="w-5 h-5" />
                    Create Board
                  </motion.button>

                  <div className="flex-shrink-0 relative block md:hidden">
                    <button
                      onClick={() => setShowFilterMenu(!showFilterMenu)}
                      className="flex items-center gap-2 px-4 py-3 bg-gray-50 dark:bg-gray-900 
      border border-gray-200 dark:border-gray-800 rounded-xl hover:bg-gray-100 
      dark:hover:bg-gray-800 transition-colors text-gray-700 dark:text-gray-300"
                    >
                      <Filter className="w-5 h-5" />
                      <span className="hidden sm:inline">
                        {filterType === 'all'
                          ? 'All Boards'
                          : filterType === 'recent'
                            ? 'Recent'
                            : filterType === 'completed'
                              ? 'Completed'
                              : 'In Progress'}
                      </span>
                      <ChevronDown className="w-4 h-4" />
                    </button>

                    <AnimatePresence>
                      {showFilterMenu && (
                        <>
                          <div
                            className="fixed inset-0 z-10"
                            onClick={() => setShowFilterMenu(false)}
                          />
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-xl shadow-lg 
            border border-gray-200 dark:border-gray-700 overflow-hidden z-20"
                          >
                            {['all', 'recent', 'completed', 'in-progress'].map((f) => (
                              <button
                                key={f}
                                onClick={() => {
                                  setFilterType(f as FilterType);
                                  setShowFilterMenu(false);
                                }}
                                className={`w-full px-4 py-3 text-left hover:bg-gray-50 
                  dark:hover:bg-gray-700 transition-colors ${
                    filterType === f
                      ? 'text-purple-600 dark:text-purple-400 font-semibold'
                      : 'text-gray-700 dark:text-gray-300'
                  }`}
                              >
                                {f === 'all'
                                  ? 'All Boards'
                                  : f === 'recent'
                                    ? 'Recent'
                                    : f === 'completed'
                                      ? 'Completed'
                                      : 'In Progress'}
                              </button>
                            ))}
                          </motion.div>
                        </>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>

              {/* Search and Filters */}
              <div className="flex flex-col md:flex-row items-start md:items-center gap-4 ">
                {/* Board Card */}
                <div className="space-y-3">
                  <motion.div
                    key={board.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1 * 0.03 }}
                    onClick={() => navigate(`/boards/${board.id}`)}
                    className={`
      relative bg-white dark:bg-gray-900 rounded-xl border p-6 
      transition-all cursor-pointer 
      ${
        currentBoardId === board.id
          ? 'border-purple-500 shadow-md shadow-purple-200 dark:shadow-purple-800'
          : 'border-purple-300 dark:border-purple-700'
      }
    `}
                  >
                    {/* --- CURRENT BOARD BADGE --- */}
                    {currentBoardId === board.id && (
                      <span className="absolute top-2 right-2 bg-purple-600 text-white text-xs font-semibold px-2 py-1 rounded-lg">
                        Current Board
                      </span>
                    )}

                    <div className="flex items-center justify-center gap-3">
                      {/* Icon */}
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: board.colorTheme + '20' }}
                      >
                        <BookOpen className="w-8 h-8" style={{ color: board.colorTheme }} />
                      </div>

                      {/* Content */}
                      <div>
                        <h3 className="text-xl font-bold w-56 text-gray-900 dark:text-white truncate mb-1">
                          {board.title}
                        </h3>

                        {/* Small subtext to guide user */}
                        {currentBoardId === board.id ? (
                          <p className="text-xs text-purple-600 dark:text-purple-300">
                            This is your active studyboard
                          </p>
                        ) : (
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            Click to view board
                          </p>
                        )}
                      </div>

                      {/* Action (Dropdown Button) */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedBoard(selectedBoard === board.id ? null : board.id);
                        }}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors flex-shrink-0"
                      >
                        <MoreVertical className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                      </button>
                    </div>

                    {/* DROPDOWN MENU */}
                    {selectedBoard === board.id && (
                      <div className="mt-3 bg-gray-50 dark:bg-gray-800 border dark:border-gray-700 rounded-lg p-2">
                        <button
                          className="w-full text-left px-2 py-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            setCurrentBoardId(board.id);
                            setSelectedBoard(null);
                          }}
                        >
                          Set as Current Board
                        </button>
                      </div>
                    )}
                  </motion.div>
                </div>

                {/* Filter Dropdown */}
                <div className="flex-shrink-0 hidden md:block relative">
                  <button
                    onClick={() => setShowFilterMenu(!showFilterMenu)}
                    className="flex items-center gap-2 px-4 py-3 bg-gray-50 dark:bg-gray-900 
      border border-gray-200 dark:border-gray-800 rounded-xl hover:bg-gray-100 
      dark:hover:bg-gray-800 transition-colors text-gray-700 dark:text-gray-300"
                  >
                    <Filter className="w-5 h-5" />
                    <span className="hidden sm:inline">
                      {filterType === 'all'
                        ? 'All Boards'
                        : filterType === 'recent'
                          ? 'Recent'
                          : filterType === 'completed'
                            ? 'Completed'
                            : 'In Progress'}
                    </span>
                    <ChevronDown className="w-4 h-4" />
                  </button>

                  <AnimatePresence>
                    {showFilterMenu && (
                      <>
                        <div
                          className="fixed inset-0 z-10"
                          onClick={() => setShowFilterMenu(false)}
                        />
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-xl shadow-lg 
            border border-gray-200 dark:border-gray-700 overflow-hidden z-20"
                        >
                          {['all', 'recent', 'completed', 'in-progress'].map((f) => (
                            <button
                              key={f}
                              onClick={() => {
                                setFilterType(f as FilterType);
                                setShowFilterMenu(false);
                              }}
                              className={`w-full px-4 py-3 text-left hover:bg-gray-50 
                  dark:hover:bg-gray-700 transition-colors ${
                    filterType === f
                      ? 'text-purple-600 dark:text-purple-400 font-semibold'
                      : 'text-gray-700 dark:text-gray-300'
                  }`}
                            >
                              {f === 'all'
                                ? 'All Boards'
                                : f === 'recent'
                                  ? 'Recent'
                                  : f === 'completed'
                                    ? 'Completed'
                                    : 'In Progress'}
                            </button>
                          ))}
                        </motion.div>
                      </>
                    )}
                  </AnimatePresence>
                </div>

                {/* View Mode Toggle */}
                <div
                  className="flex-shrink-0 hidden md:flex items-center gap-2 bg-gray-50 dark:bg-gray-900 
      border border-gray-200 dark:border-gray-800 rounded-xl p-1"
                >
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-lg transition-colors ${
                      viewMode === 'grid'
                        ? 'bg-white dark:bg-gray-800 text-purple-600 dark:text-purple-400 shadow-sm'
                        : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                    }`}
                  >
                    <Grid3x3 className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-lg transition-colors ${
                      viewMode === 'list'
                        ? 'bg-white dark:bg-gray-800 text-purple-600 dark:text-purple-400 shadow-sm'
                        : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                    }`}
                  >
                    <List className="w-5 h-5" />
                  </button>
                </div>
              </div>
              {/* <div className='border-b border-white mt-4'></div> */}
            </div>

            {/* Empty State */}
            {sortedBoards.length === 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-20"
              >
                <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-3xl flex items-center justify-center mb-6">
                  <BookOpen className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {searchQuery ? 'No boards found' : 'No study boards yet'}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-8 text-center max-w-md">
                  {searchQuery
                    ? 'Try adjusting your search or filters'
                    : 'Create your first study board to start learning with AI-powered materials'}
                </p>
                {!searchQuery && (
                  <button
                    onClick={() => navigate('/boards/create')}
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
                  >
                    <Plus className="w-5 h-5" />
                    Create Your First Board
                  </button>
                )}
              </motion.div>
            )}

            {/* Grid View */}
            {viewMode === 'grid' && sortedBoards.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
                {sortedBoards.map((board, index) => (
                  <motion.div
                    key={board.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ y: -4 }}
                    className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden hover:border-purple-300 dark:hover:border-purple-700 transition-all group cursor-pointer"
                    onClick={() => navigate(`/boards/${board.id}`)}
                  >
                    {/* Thumbnail */}
                    <div
                      className="h-40 flex items-center justify-center relative"
                      style={{ backgroundColor: board.colorTheme + '20' }}
                    >
                      <BookOpen className="w-16 h-16" style={{ color: board.colorTheme }} />

                      {/* Status Badge */}
                      <div className="absolute top-3 right-3">
                        {board.status === 'completed' ? (
                          <div className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full text-xs font-semibold flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" />
                            Completed
                          </div>
                        ) : (
                          <div className="px-3 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400 rounded-full text-xs font-semibold">
                            Processing
                          </div>
                        )}
                      </div>

                      {/* Actions Menu */}
                      <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedBoard(selectedBoard === board.id ? null : board.id);
                          }}
                          className="p-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                        >
                          <MoreVertical className="w-4 h-4 text-gray-700 dark:text-gray-300" />
                        </button>

                        {selectedBoard === board.id && (
                          <div className="absolute top-full left-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden z-10">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleShareBoard(board.id);
                              }}
                              className="w-full px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center gap-3 text-gray-700 dark:text-gray-300"
                            >
                              <Share2 className="w-4 h-4" />
                              Share
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDuplicateBoard(board.id);
                              }}
                              className="w-full px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center gap-3 text-gray-700 dark:text-gray-300"
                            >
                              <Copy className="w-4 h-4" />
                              Duplicate
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                navigate(`/boards/${board.id}/edit`);
                              }}
                              className="w-full px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center gap-3 text-gray-700 dark:text-gray-300"
                            >
                              <Edit className="w-4 h-4" />
                              Edit
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteBoard(board.id);
                              }}
                              className="w-full px-4 py-3 text-left hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors flex items-center gap-3 text-red-600 dark:text-red-400"
                            >
                              <Trash2 className="w-4 h-4" />
                              Delete
                            </button>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                        {board.title}
                      </h3>
                      {/* <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                        {board.description}
                      </p> */}

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {board.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-md text-xs"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Stats */}
                      <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 pt-4 border-t border-gray-100 dark:border-gray-800">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1">
                            <FileText className="w-4 h-4" />
                            <span>{board.notesCount}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <BookOpen className="w-4 h-4" />
                            <span>{board.flashcardsCount}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Video className="w-4 h-4" />
                            <span>{board.quizzesCount}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 text-xs">
                          <Clock className="w-3 h-3" />
                          {new Date(board.updatedAt).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                          })}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {/* List View */}
            {/* List View */}
            {viewMode === 'list' && sortedBoards.length > 0 && (
              <div className="grid grid-cols-1  md:grid-cols-3">
                {sortedBoards.map((board, index) => (
                  <motion.div
                    key={board.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.03 }}
                    onClick={() => navigate(`/boards/${board.id}`)}
                    className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 
          p-4 md:p-6 hover:border-purple-300 dark:hover:border-purple-700 transition-all cursor-pointer group"
                  >
                    <div className="flex items-center gap-3 md:gap-6 min-w-0">
                      {/* Icon */}
                      <div
                        className="w-12 h-12 md:w-16 md:h-16 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: board.colorTheme + '20' }}
                      >
                        <BookOpen
                          className="w-7 h-7 md:w-8 md:h-8"
                          style={{ color: board.colorTheme }}
                        />
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-1 min-w-0">
                          <div className="flex-1 min-w-0">
                            <h3
                              className="text-lg md:text-xl font-bold text-gray-900 dark:text-white 
                  group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors truncate"
                            >
                              {board.title}
                            </h3>
                          </div>

                          {/* Actions */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedBoard(selectedBoard === board.id ? null : board.id);
                            }}
                            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 
                  rounded-lg transition-colors flex-shrink-0 opacity-100 md:opacity-0 md:group-hover:opacity-100"
                          >
                            <MoreVertical className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default StudyBoards;
