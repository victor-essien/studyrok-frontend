import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, MoreVertical } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { StudyBoard } from '@/types';

interface StudyBoardCardProps {
  sortedBoards: StudyBoard[];
  selectedBoard: string | null;
  setSelectedBoard: (value: string | null) => void;
}

const StudyBoardCard = ({ sortedBoards, selectedBoard, setSelectedBoard }: StudyBoardCardProps) => {
  const navigate = useNavigate();
  return (
    <div className="grid grid-cols-1 gap-2  md:grid-cols-2">
      {sortedBoards.map((board: any, index: any) => (
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
              <BookOpen className="w-7 h-7 md:w-8 md:h-8" style={{ color: board.colorTheme }} />
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
  );
};

export default StudyBoardCard;
