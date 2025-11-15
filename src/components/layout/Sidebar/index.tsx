import { motion } from 'framer-motion';
import { LOGO } from '@/assets';
import {
  Home,
  Clock,
  GalleryVerticalEnd,
  Calendar,
  X,
  CreditCard,
  Edit3,
  FileText,
  Upload,
  Search,
} from 'lucide-react';
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

const Sidebar = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={onClose} />}

      {/* Sidebar */}
      <motion.aside
        initial={{ x: -300 }}
        animate={{ x: isOpen ? 0 : -300 }}
        transition={{ type: 'tween' }}
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex lg:hidden  flex-col lg:translate-x-0`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
              <img src={LOGO} alt="Studyrok logo" />
            </div>
            <span className="font-bold text-lg text-gray-700 dark:text-gray-200 ">StudyRok</span>
          </div>
          <button onClick={onClose} className="lg:hidden">
            <X className="w-5 h-5 text-gray-700 dark:text-gray-200 " />
          </button>
        </div>

        {/* Search */}
        <div className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400  dark:text-gray-200" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:text-gray-200 dark:bg-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
          </div>
        </div>
        <ThemeToggleButton />
        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 pt-2">
          <div className="space-y-1">
            {sidebarItems.map((item, index) => (
              <button
                key={index}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                  item.active
                    ? 'bg-purple-100 text-purple-600'
                    : 'text-gray-700 dark:text-gray-100 dark:hover:bg-gray-700 hover:bg-gray-100'
                }`}
              >
                <item.icon className="w-5 h-5" style={{ color: item.color }} />

                <span className="text-sm font-medium">{item.label}</span>
              </button>
            ))}
          </div>
          {/* Upload Button */}
          <div className="p-4 border-t mt-16  border-gray-200 dark:border-gray-700">
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

export default Sidebar;
