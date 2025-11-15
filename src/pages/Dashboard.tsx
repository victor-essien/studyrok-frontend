import { useState } from 'react';
import { ROKIE } from '@/assets';
import { motion } from 'framer-motion';
import {
  Plus,
  Layers,
  Edit3,
  Upload,
  Flame,
  PlayCircle,
  Bookmark,
  Video,
  Settings,
  FileText,
} from 'lucide-react';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header/Header';
import SidebarDesk from '@/components/layout/Sidebar/SidebarDesk';
import { Link } from 'react-router-dom';

// Mock Data
const mockUser = {
  name: 'Victor',
  avatar: 'V',
  streak: 0,
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

export const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-800 flex">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <SidebarDesk />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Header */}
        <Header onOpen={() => setSidebarOpen(true)} />

        <main className="flex-1 p-4 lg-p-8">
          <div className="max-w-7xl mx-auto">
            {/*Mobile  Greeting */}
            <div className="lg:hidden mb-6 flex gap-2">
              <motion.img
                src={ROKIE}
                alt="ROKIE image"
                className="w-14 h-14"
                animate={{
                  y: [0, -6, 0], // moves up by 10px, then back
                }}
                transition={{
                  duration: 2, // speed of one full levitation cycle
                  repeat: Infinity, // loop forever
                  ease: 'easeInOut', // smooth motion
                }}
              />
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  Hi, {mockUser.name}!
                </h1>
                <p className="text-gray-600 dark:text-gray-400">What are you working on today?</p>
              </div>
            </div>
          </div>
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Left Column - Study board */}
            <div className="lg:col-span-2 spac-y-6">
              {/* Study Boards */}
              <div className="flex flex-wrap items-center mb-3  gap-3">
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
                  <span className="font-semibold">Add Set</span>
                </motion.button>
              </div>
              {/* Study Board Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-purple-100 dark:bg-gray-800 border dark:border-gray-600 rounded-3xl p-4 lg:p-6"
              >
                <div className="flex items-center justify-between mb-4 lg:mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gray-700 dark:bg-purple-300 rounded-lg flex items-center justify-center text-xl lg:text-2xl">
                      {mockStudyBoard.icon}
                    </div>
                    <div>
                      <span className="text-lg lg:text-xl font-bold text-gray-900 dark:text-white block">
                        {mockStudyBoard.title}
                      </span>
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {mockStudyBoard.materialsCount} materials
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="p-2 hover:bg-white/30 text-gray-700 dark:text-gray-200 rounded-lg transition">
                      <Bookmark className="w-5 h-5" />
                    </button>
                    <button className="p-2 hover:bg-white/30 text-gray-700 dark:text-gray-200 rounded-lg transition">
                      <Settings className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 mb-4 lg:mb-6">
                  <div className="bg-white/50 dark:bg-gray-600  rounded-xl p-3 lg:p-4 flex items-center gap-3">
                    <Edit3 className="w-5 h-5 text-red-500" />
                    <div>
                      <div className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-gray-200 ">
                        {mockStudyBoard.quizzesCount}
                      </div>
                      <div className="text-xs lg:text-sm text-gray-600 dark:text-gray-300">
                        Tests/Quizzes
                      </div>
                    </div>
                  </div>
                  <div className="bg-white/50 dark:bg-gray-600 rounded-xl p-3 lg:p-4 flex items-center gap-3">
                    <Video className="w-5 h-5 text-blue-500" />
                    <div>
                      <div className="text-xl lg:text-2xl font-bold dark:text-gray-200 text-gray-900">
                        {mockStudyBoard.explainersCount}
                      </div>
                      <div className="text-xs lg:text-sm text-gray-600 dark:text-gray-300">
                        Explainers
                      </div>
                    </div>
                  </div>
                  {/* <div className="bg-white/40 rounded-xl p-3 lg:p-4 flex items-center gap-3">
                    <GraduationCap className="w-5 h-5 text-purple-500" />
                    <div>
                      <div className="text-xl lg:text-2xl font-bold text-gray-900">
                        {mockStudyBoard.tutorMeCount}
                      </div>
                      <div className="text-xs lg:text-sm text-gray-600">Tutor Me</div>
                    </div>
                  </div> */}
                  {/* <div className="bg-white/50 rounded-xl p-3 lg:p-4 flex items-center gap-3">
                    <Gamepad2 className="w-5 h-5 text-pink-500" />
                    <div>
                      <div className="text-xl lg:text-2xl font-bold text-gray-900">
                        {mockStudyBoard.arcadeCount}
                      </div>
                      <div className="text-xs lg:text-sm text-gray-600">Arcade</div>
                    </div>
                  </div> */}
                  <div className="bg-white/50 dark:bg-gray-600 rounded-xl p-3 lg:p-4 flex items-center gap-3">
                    <Layers className="w-5 h-5 text-green-500" />
                    <div>
                      <div className="text-xl lg:text-2xl font-bold dark:text-gray-200 text-gray-900">
                        {mockStudyBoard.flashcardsCount}
                      </div>
                      <div className="text-xs lg:text-sm text-gray-600 dark:text-gray-300">
                        Flashcards
                      </div>
                    </div>
                  </div>
                  <div className="bg-white/50 dark:bg-gray-600 rounded-xl p-3 lg:p-4 flex items-center gap-3">
                    <FileText className="w-5 h-5 text-indigo-500" />
                    <div>
                      <div className="text-xl lg:text-2xl font-bold dark:text-gray-200 text-gray-900">
                        {mockStudyBoard.materialsCount}
                      </div>
                      <div className="text-xs lg:text-sm text-gray-600 dark:text-gray-300">
                        Materials
                      </div>
                    </div>
                  </div>
                </div>

                {/* Continue Learning Button */}
                <Link to={'/space/studyboard'}>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    // onClick={onContinueLearning}
                    className="w-full bg-purple-600 text-white py-3 lg:py-4 rounded-2xl font-semibold flex items-center justify-center gap-2 shadow-lg mb-4 lg:mb-6"
                  >
                    <PlayCircle className="w-5 h-5" />
                    Continue Learning
                  </motion.button>
                </Link>

                {/* Topics Progress */}
                <div className="space-y-3">
                  {mockStudyBoard.topics.map((topic) => (
                    <div key={topic.id}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-900 dark:text-gray-300">
                          {topic.title}
                        </span>
                        <span className="text-sm font-bold text-gray-900 dark:text-white">
                          {topic.progress}%
                        </span>
                      </div>
                      <div className="w-full h-3 bg-white/60 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gray-900 dark:bg-gray-700  rounded-full transition-all"
                          style={{ width: `${topic.progress}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
            {/* Right Column - Sidebar Content */}
            <div className="space-y-6">
              {/* Streak Card */}
              <div className="bg-white rounded-2xl  p-4 lg:p-6 shadow-sm  dark:bg-gray-800 border dark:border-gray-600  border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Flame className="w-6 h-6 text-orange-500" />
                    <span className="text-xl font-bold text-gray-900  dark:text-gray-200">
                      {mockUser.streak} day streak!
                    </span>
                  </div>
                  {/* <button className="text-blue-600 font-semibold text-sm">View Leaderboard</button> */}
                </div>
              </div>
              {/* Materials Section */}
              <div className="bg-white rounded-2xl p-4 lg:p-6 dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-600 ">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">Materials</h2>
                  <button className="flex items-center gap-2 px-3 py-1.5 border dark:text-gray-200 border-gray-300 dark:border-gray-700 rounded-lg text-sm font-semibold hover:bg-gray-50 dark:hover:bg-gray-500">
                    <Upload className="w-4 h-4" />
                    Upload
                  </button>
                </div>
                <div className="space-y-3">
                  {mockStudyBoard.materials.map((material) => (
                    <motion.div
                      key={material.id}
                      whileHover={{ x: 4 }}
                      className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700  rounded-xl hover:bg-gray-100 transition cursor-pointer"
                    >
                      <span className="text-2xl">{material.icon}</span>
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-gray-900 dark:text-white text-sm truncate">
                          {material.title}
                        </div>
                        <div className="text-xs text-gray-600 dark:text-gray-300">
                          {material.date}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <button className="w-full mt-4 text-purple-600 font-semibold text-sm hover:underline">
                  View All
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
