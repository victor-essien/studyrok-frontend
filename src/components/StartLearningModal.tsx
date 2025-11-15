import { motion, AnimatePresence } from 'framer-motion';
import { X, BookOpen, Clock, CreditCard, Edit3 } from 'lucide-react';

interface StartLearningModalProps {
  open: boolean;
  onClose: () => void;
}

export const StartLearningModal: React.FC<StartLearningModalProps> = ({ open, onClose }) => {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />

          {/* Modal */}
          <motion.div
            className="relative z-10 w-[90%] max-w-md rounded-2xl bg-white dark:bg-gray-800 shadow-xl p-6"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: 'spring', stiffness: 200, damping: 25 }}
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-lg font-semibold text-gray-900 flex items-center  dark:text-white gap-2">
                  <span className="text-blue-600  px-2 py-3  text-2xl">
                    <BookOpen className="w-10 h-10" />
                  </span>
                  Start Learning
                </h2>
                <p className="text-sm text-gray-500 ml-5  dark:text-gray-400">
                  Cellular Foundations and Energetics
                </p>
              </div>

              <button
                onClick={onClose}
                className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition"
              >
                <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              </button>
            </div>

            {/* Options */}
            <div className="space-y-3">
              {/* Card 1 */}
              <button className="w-full text-left bg-white dark:bg-gray-800 dark:border-gray-700 border rounded-xl p-4 shadow hover:shadow-md transition flex justify-between items-start">
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Start a new Session</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    Stay focused while reading and learning materials to understand concepts
                  </p>
                </div>

                <div>
                  <div className="p-2 rounded-md bg-orange-200 ">
                    <Clock className="w-6 h-6 text-orange-500" />
                  </div>
                </div>
              </button>

              {/* Card 2 */}
              <button className="w-full text-left bg-white  dark:bg-gray-800 dark:border-gray-700 border rounded-xl p-4 shadow hover:shadow-md transition flex justify-between items-start">
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Review Flashcards</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    Understand concepts with smart spaced repetition
                  </p>
                </div>

                <div className="p-2 rounded-md bg-purple-200">
                  <CreditCard className="w-6 h-6 text-purple-500" />
                </div>
              </button>

              {/* Card 3 */}
              <button className="w-full text-left bg-white dark:bg-gray-800 dark:border-gray-700 border rounded-xl p-4 shadow hover:shadow-md transition flex justify-between items-start">
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Start Quiz</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    RokQuizzes help you adapt to what you need to learn
                  </p>
                </div>

                <div className="p-2 rounded-md bg-green-200">
                  <Edit3 className="w-6 h-6 text-green-500" />
                </div>
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
