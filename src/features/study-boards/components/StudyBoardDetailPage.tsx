import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header/Header';
import {
  ArrowLeft,
  PlayCircle,
  FileText,
  Edit3,
  Layers,
  Plus,
  Clock,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { CircularProgress } from '@/components/CircularProgress';
import { useState } from 'react';
import SidebarDesk from '@/components/layout/Sidebar/SidebarDesk';
import { useNavigate } from 'react-router-dom';
import { StartLearningModal } from '@/components/StartLearningModal';
const mockDetailedBoard = {
  title: 'Comp',
  description:
    'Welcome to your new study board! You can add materials, create flashcards start a session and continue learning.',
  stats: {
    materials: 5,
    flashcards: 0,
    rokQuiz: 0,
    sessions: 0,
  },
  sections: [
    {
      id: 1,
      title: 'Cellular Foundations and Energetics',
      topics: 5,
      materials: 1,
      items: [{ title: 'Cellular building blocks', icon: '📄' }],
      progress: 0,
    },
    {
      id: 2,
      title: 'Cellular Foundations and Energetics',
      topics: 5,
      materials: 1,
      items: [{ title: 'Cellular building blocks', icon: '📄' }],
      progress: 0,
    },
    {
      id: 3,
      title: 'Cellular Foundations and Energetics',
      topics: 5,
      materials: 1,
      items: [{ title: 'Cellular building blocks', icon: '📄' }],
      progress: 0,
    },
  ],
};

export const StudyBoardDetailPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [learningModalOpen, setLearningModalOpen] = useState(false);
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-800 flex ">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <SidebarDesk />

      {/* StartLearningModal */}
      <StartLearningModal open={learningModalOpen} onClose={() => setLearningModalOpen(false)} />
      {/* Main Content */}
      <div className="flex-1  flex flex-col lg:ml-64 min-h-screen">
        {/* Header */}
        <Header onOpen={() => setSidebarOpen(true)} />

        {/* Main Content */}
        <main className="flex-1 p-4 lg:p-8">
          <div className="max-w-6xl mx-auto">
            <div className=" flex items-center my-1  justify-between w-[90%] md:w-full">
              <button
                onClick={() => navigate(-1)}
                className="text-gray-800 dark:text-gray-200 rounded-full p-2 hover:text-purple-400 transition-colors"
              >
                <ArrowLeft className="w-6 h-6" />
              </button>
            </div>
            {/* Board Header */}
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 lg:w-16 lg:h-16 bg-purple-400 dark:bg-purple-300 rounded-2xl flex items-center justify-center">
                <span className="text-2xl lg:text-3xl">🧬</span>
              </div>
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
                {mockDetailedBoard.title}
              </h1>
            </div>

            {/* New Study Board Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              className="flex items-center gap-2 px-4 py-2 border-2 border-gray-300 dark:border-gray-700 bg-purple-200  dark:bg-purple-900/50 text-gray-700 dark:text-gray-300 font-semibold mb-6"
            >
              <Plus className="w-5 h-5" />
              New study board
            </motion.button>

            {/* Description */}
            <p className="text-gray-600 dark:text-gray-400   text-center lg:text-left mb-8 px-4 lg:px-0">
              {mockDetailedBoard.description}
            </p>

            <div className="grid lg:grid-cols-3 gap-6">
              {/* Stats Card with Completion Circle */}
              <div className="lg:col-span-1">
                <div className="bg-purple-100 dark:bg-gray-700 rounded-3xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 sticky top-24">
                  <div className="flex items-center justify-center mb-6">
                    <CircularProgress percentage={mockDetailedBoard.sections[0].progress} />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <FileText className="w-5 h-5 text-gray-900 dark:text-white" />
                        <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                          Materials
                        </span>
                      </div>
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">
                        {mockDetailedBoard.stats.materials}
                      </div>
                    </div>

                    <div className="text-center">
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <Layers className="w-5 h-5 text-[#60A0F7]" />
                        <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                          Flashcards
                        </span>
                      </div>
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">
                        {mockDetailedBoard.stats.flashcards}
                      </div>
                    </div>

                    <div className="text-center ">
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <Edit3 className="w-5 h-5 text-[#8022B6]" />
                        <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                          RokQuiz
                        </span>
                      </div>
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">
                        {mockDetailedBoard.stats.rokQuiz}
                      </div>
                    </div>

                    <div className="text-center">
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <Clock className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                        <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                          Sessions
                        </span>
                      </div>
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">
                        {mockDetailedBoard.stats.sessions}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sections List */}
              <div className="lg:col-span-2 space-y-4">
                {mockDetailedBoard.sections.map((section, index) => (
                  <motion.div
                    key={section.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white dark:bg-gray-800 rounded-2xl p-4 lg:p-6 shadow-sm border border-gray-200 dark:border-gray-700 "
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                          {section.title}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                          {section.topics} topics
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Materials ({section.materials})
                        </p>
                      </div>
                      <button className="p-3 bg-gray-200 rounded-full dark:bg-gray-700 hover:bg-gray-300 dark:hover:border-gray-600 transition">
                        <PlayCircle
                          className="w-6 h-6 text-gray-700 dark:text-gray-300"
                          onClick={() => setLearningModalOpen(true)}
                        />
                      </button>
                    </div>

                    {/* Items */}
                    <div className="space-y-2 mb-4">
                      {section.items.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 p-2 bg-gray-50 dark:bg-purple-900/50 rounded-lg"
                        >
                          <span>{item.icon}</span>
                          <span>{item.title}</span>
                        </div>
                      ))}
                    </div>

                    {/* Progress Bar */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Progress
                        </span>
                        <span className="text-sm font-bold text-gray-900 dark:text-white">
                          {section.progress}%
                        </span>
                      </div>
                      <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-purple-600 rounded-full transition-all"
                          style={{ width: `${section.progress}%` }}
                        />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
