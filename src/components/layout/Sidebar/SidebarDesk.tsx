import { motion } from 'framer-motion';
import { LOGO } from '@/assets';
import {
  Home,
  Calendar,
  Clock,
  GalleryVerticalEnd,
  X,
  CreditCard,
  Edit3,
  FileText,
  Upload,
  Search,
} from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { ThemeToggleButton } from '@/components/ThemeToggleButton';
const sidebarItems = [
  { icon: Home, label: 'Home', active: true, color: '' },
  { icon: GalleryVerticalEnd, label: 'My Boards', active: false, color: '#42C696' },
  { icon: Clock, label: 'My Sessions', active: false, color: '#689BF4' },
  { icon: Calendar, label: 'Planner', active: false, color: '8D7EEC' },
  { icon: CreditCard, label: 'Flashcards', active: false, color: '60A0F7' },
  { icon: Edit3, label: 'RokQuiz', active: false, color: '8022B6' },
  { icon: FileText, label: 'Notes & Materials', active: false, color: '' },
];

const SidebarDesk = () => {
  return (
    <>
      {/* Mobile Overlay
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )} */}

      {/* Sidebar */}
      <motion.aside
        className={`fixed  inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 hidden lg:flex  flex-col lg:translate-x-0`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700  flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
              <img src={LOGO} alt="Studyrok logo" />
            </div>
            <span className="font-bold text-lg text-gray-700 dark:text-gray-200  ">StudyRok</span>
          </div>
          <button className="lg:hidden">
            <X className="w-5 h-5" />
          </button>
        </div>
        <ThemeToggleButton />

        {/* Search */}
        <div className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-700 : rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-2">
          <div className="space-y-1">
            {/* Home */}
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                  isActive
                    ? 'bg-purple-100 text-purple-600'
                    : 'text-gray-700 dark:text-gray-100 dark:hover:bg-gray-700 hover:bg-gray-100'
                }`
              }
            >
              <Home className="w-5 h-5" style={{ color: '#fb923c' }} />
              <span className="text-sm font-medium">Dashboard</span>
            </NavLink>

            {/* My Boards */}
            <NavLink
              to="/boards"
              className={({ isActive }) =>
                `w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                  isActive
                    ? 'bg-purple-100 text-purple-600'
                    : 'text-gray-700 dark:text-gray-100 dark:hover:bg-gray-700 hover:bg-gray-100'
                }`
              }
            >
              <GalleryVerticalEnd className="w-5 h-5" style={{ color: '#42C696' }} />
              <span className="text-sm font-medium">My Boards</span>
            </NavLink>

            {/* My Sessions */}
            <NavLink
              to="/session"
              className={({ isActive }) =>
                `w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                  isActive
                    ? 'bg-purple-100 text-purple-600'
                    : 'text-gray-700 dark:text-gray-100 dark:hover:bg-gray-700 hover:bg-gray-100'
                }`
              }
            >
              <Clock className="w-5 h-5" style={{ color: '#689BF4' }} />
              <span className="text-sm font-medium">My Sessions</span>
            </NavLink>

            {/* Planner */}
            <NavLink
              to="/planner"
              className={({ isActive }) =>
                `w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                  isActive
                    ? 'bg-purple-100 text-purple-600'
                    : 'text-gray-700 dark:text-gray-100 dark:hover:bg-gray-700 hover:bg-gray-100'
                }`
              }
            >
              <Calendar className="w-5 h-5" style={{ color: '#8D7EEC' }} />
              <span className="text-sm font-medium">Planner</span>
            </NavLink>

            {/* Flashcards */}
            <NavLink
              to="/flashcards"
              className={({ isActive }) =>
                `w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                  isActive
                    ? 'bg-purple-100 text-purple-600'
                    : 'text-gray-700 dark:text-gray-100 dark:hover:bg-gray-700 hover:bg-gray-100'
                }`
              }
            >
              <CreditCard className="w-5 h-5" style={{ color: '#60A0F7' }} />
              <span className="text-sm font-medium">Flashcards</span>
            </NavLink>

            {/* RokQuiz */}
            <NavLink
              to="/rokquiz"
              className={({ isActive }) =>
                `w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                  isActive
                    ? 'bg-purple-100 text-purple-600'
                    : 'text-gray-700 dark:text-gray-100 dark:hover:bg-gray-700 hover:bg-gray-100'
                }`
              }
            >
              <Edit3 className="w-5 h-5" style={{ color: '#8022B6' }} />
              <span className="text-sm font-medium">RokQuiz</span>
            </NavLink>

            {/* Notes & Materials */}
            <NavLink
              to="/materials"
              className={({ isActive }) =>
                `w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                  isActive
                    ? 'bg-purple-100 text-purple-600'
                    : 'text-gray-700 dark:text-gray-100 dark:hover:bg-gray-700 hover:bg-gray-100'
                }`
              }
            >
              <FileText className="w-5 h-5" />
              <span className="text-sm font-medium">Notes & Materials</span>
            </NavLink>
          </div>

          {/* Upload Button */}
          <div className="p-4 border-t mt-16 border-gray-200 dark:border-gray-700">
            <button className="w-full flex items-center justify-center gap-2 py-3 bg-purple-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition">
              <Upload className="w-5 h-5" />
              Upload
            </button>
          </div>
        </nav>
      </motion.aside>
    </>
  );
};

export default SidebarDesk;
