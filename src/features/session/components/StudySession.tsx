import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from '@/components/layout/Sidebar';
import SidebarDesk from '@/components/layout/Sidebar/SidebarDesk';
import HeaderMobile from '@/components/layout/Header/HeaderMobile';
import { BookOpen, Play, Clock, Highlighter, Brain } from 'lucide-react';

// Mock data
const mockMaterials = [
  {
    id: 'note-1',
    title: 'Introduction to Photosynthesis',
    type: 'markdown',
    icon: '📄',
    readTime: 5,
  },
  {
    id: 'note-2',
    title: 'Light-Dependent Reactions',
    type: 'markdown',
    icon: '📄',
    readTime: 7,
  },
  {
    id: 'note-3',
    title: 'Cellular Building Blocks',
    type: 'pdf',
    icon: '📑',
    readTime: 10,
    content: 'PDF content would be rendered here',
  },
];
const StudySession = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <SidebarDesk />
      {/* Main Content */}
      <div className="flex-1  flex flex-col lg:ml-64 min-h-screen">
        <HeaderMobile onOpen={() => setSidebarOpen(true)} />
        <div className="flex-1 p-4 lg:p-8 ">
          <div className="max-w-6xl mx-auto">
            {/* Header Section */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-5 md:p-7 mb-8">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                    Start Study Session
                  </h1>
                  <p className="text-gray-600 dark:text-gray-300 mt-1">
                    Select a material to begin your session
                  </p>
                </div>
              </div>
            </div>
            <main className="space-y-8">
              {/* Session Info Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className=" rounded-3xl p-2  shadow-lg"
              >
                {/* <div className="flex items-center gap-4  mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl flex items-center justify-center">
                    <BookOpen className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                      Focus Time
                    </h2>
                     <p className="text-gray-600">Select a material to begin your session</p> 
                  </div>
                </div> */}

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                  <div className="bg-purple-100 dark:bg-purple-300 rounded-xl p-6 text-center">
                    <Clock className="w-8 h-8 text-purple-600  mx-auto mb-2" />
                    <div className="text-sm text-gray-600 dark:text-gray-800">Track your time</div>
                  </div>
                  <div className="bg-blue-100 dark:bg-blue-300 rounded-xl p-6 text-center">
                    <Highlighter className="w-8 h-8 text-blue-600  mx-auto mb-2" />
                    <div className="text-sm text-gray-600 dark:text-gray-800">
                      Highlight key points
                    </div>
                  </div>
                  <div className="bg-green-100 dark:bg-green-300 rounded-xl p-6 text-center">
                    <Brain className="w-8 h-8 text-green-600 mx-auto mb-2" />
                    <div className="text-sm text-gray-600 dark:text-gray-800">AI explanations</div>
                  </div>
                </div>
              </motion.div>
              {/* Materials List */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                  Available Materials
                </h3>
                <div className="grid gap-4">
                  {mockMaterials.map((material, index) => (
                    <motion.button
                      key={material.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      //   onClick={() => handleStartSession(material)}
                      className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition text-left flex items-center gap-4 group"
                    >
                      <div className="w-16 h-16 bg-purple-100 dark:bg-purple-300 rounded-xl flex items-center justify-center text-3xl flex-shrink-0">
                        {material.icon}
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-1">
                          {material.title}
                        </h4>
                        <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-300">
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {material.readTime} min read
                          </span>
                          <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-semibold capitalize">
                            {material.type}
                          </span>
                        </div>
                      </div>
                      <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center group-hover:bg-purple-700 transition">
                        <Play className="w-6 h-6 text-white" />
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudySession;
