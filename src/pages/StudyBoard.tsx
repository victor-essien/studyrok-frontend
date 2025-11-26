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
import StudyBoardCard from '@/features/study-boards/components/StudyBoardCard';
import Header from '@/components/layout/Header/Header';
import SidebarDesk from '@/components/layout/Sidebar/SidebarDesk';
import Sidebar from '@/components/layout/Sidebar';
import HeaderMobile from '@/components/layout/Header/HeaderMobile';
import { mockStudyBoards } from '@/mocks';
import { useNavigate } from 'react-router-dom';

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

  // Use mock data
  const allBoards = mockStudyBoards;

  // Filter and search boards
  const filteredBoards = allBoards.filter((board) => {
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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-800 ">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <SidebarDesk />
      {/* Main Content */}
      <div className="flex-1  flex flex-col lg:ml-64 min-h-screen">
        {/* Header */}
        <HeaderMobile onOpen={() => setSidebarOpen(true)} />

        <main className="flex-1 p-2 lg:8">
          <div className="max-w-6xl mx-auto">
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
      relative bg-white dark:bg-gray-900 rounded-xl border p-3 md:p-4 lg:p-6 
      transition-all cursor-pointer
      ${
        currentBoardId === board.id
          ? 'border-purple-500 shadow-md shadow-purple-200 dark:shadow-purple-800'
          : 'border-purple-300 dark:border-purple-700'
      }
    `}
                  >
                    {/* --- CURRENT BOARD BADGE (compact on mobile) --- */}
                    {currentBoardId === board.id && (
                      <span className="absolute top-2 right-2 bg-purple-600 text-white text-[10px] md:text-xs font-semibold px-2 py-0.5 rounded-lg">
                        Current
                      </span>
                    )}

                    {/* Use justify-between so items can size themselves; ensure shrink behavior */}
                    <div className="flex items-center gap-3 md:gap-4">
                      {/* Icon */}
                      <div
                        className="w-12 h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: board.colorTheme + '20' }}
                      >
                        <BookOpen
                          className="w-7 h-7 md:w-8 md:h-8"
                          style={{ color: board.colorTheme }}
                        />
                      </div>

                      {/* Content: allow it to shrink with min-w-0 so truncate works */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white truncate">
                          {board.title}
                        </h3>

                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          {currentBoardId === board.id
                            ? 'Active studyboard'
                            : 'Click to view board'}
                        </p>
                      </div>

                      {/* Action (Dropdown Button) - shrink-0 so it doesn't collapse */}
                      <div className="flex-shrink-0">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedBoard(selectedBoard === board.id ? null : board.id);
                          }}
                          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                          aria-label="Board actions"
                        >
                          <MoreVertical className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                        </button>
                      </div>
                    </div>

                    {/* DROPDOWN MENU (keeps its own width, doesn't affect layout) */}
                    {selectedBoard === board.id && (
                      <div className="mt-3 bg-gray-50 dark:bg-gray-800 border dark:border-gray-700 rounded-lg p-2 w-full md:w-52">
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

            {/* List View */}
            {viewMode === 'list' && sortedBoards.length > 0 && (
              <StudyBoardCard
                sortedBoards={sortedBoards}
                selectedBoard={selectedBoard}
                setSelectedBoard={setSelectedBoard}
              />
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default StudyBoards;
