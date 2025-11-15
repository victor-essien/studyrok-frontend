import React from 'react';
import { Menu, Upload, MessageSquare, Bell } from 'lucide-react';
import { ROKIE } from '@/assets';
import { motion } from 'framer-motion';
interface HeaderProps {
  onOpen: () => void;
}

// Mock Data
const mockUser = {
  name: 'Victor',
  avatar: 'V',
  streak: 0,
};

const Header: React.FC<HeaderProps> = ({ onOpen }) => {
  return (
    <header className="bg-white dark:bg-gray-800 px-4 lg:px-8  py-4 flex items-center justify-between border-b border-gray-200 dark:border-gray-700 sticky top-0 z-30">
      <div className="flex items-center gap-4">
        <button onClick={onOpen} className="lg:hidden p-2">
          <Menu className="w-6 h-6 text-gray-700 dark:text-gray-200 " />
        </button>
        <div className="hidden lg:flex items-center gap-3">
          <motion.img
            src={ROKIE}
            alt="ROKIE image"
            className="w-14 h-14"
            animate={{
              y: [0, -10, 0], // moves up by 10px, then back
            }}
            transition={{
              duration: 2, // speed of one full levitation cycle
              repeat: Infinity, // loop forever
              ease: 'easeInOut', // smooth motion
            }}
          />
          <div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">Hi,{mockUser.name}!</h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              What are you working on today?
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* <button className="hidden lg:flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition">
              <Upload className="w-4 h-4" />
              Upgrade
            </button>
            <button className="hidden lg:flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg font-semibold hover:bg-gray-50 transition">
              <MessageSquare className="w-4 h-4" />
              Feedback
            </button> */}
        <button className="p-2 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 rounded-lg">
          <Bell className="w-5 h-5" />
        </button>
        <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold">
          {mockUser.avatar}
        </div>
      </div>
    </header>
  );
};

export default Header;
