import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Clock, BookOpen } from 'lucide-react';

interface SessionCompleteProps {
  sessionTime: number;
  highlights: number; // or string[] if they are strings
  //   setSessionState: (state: "select" | "start" | "active" | "review") => void;
  //   setSessionTime: React.Dispatch<React.SetStateAction<number>>;
  //   setHighlights: React.Dispatch<React.SetStateAction<any[]>>;
  //   setExplanation: React.Dispatch<React.SetStateAction<string>>;
}

const formatTime = (seconds: number) => {
  const hours = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  if (hours > 0) {
    return `${hours}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};
export default function SessionComplete({ sessionTime, highlights }: SessionCompleteProps) {
  // Scroll to top when component loads
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div
      className="min-h-screen 
      bg-gradient-to-br from-purple-50 to-blue-50 
      dark:bg-gray-900 
      p-4 md:p-6 flex items-center justify-center"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl 
        p-8 md:p-12 max-w-2xl w-full text-center"
      >
        {/* Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring' }}
          className="w-24 h-24 bg-green-100 dark:bg-green-900/40 
          rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <CheckCircle2 className="w-12 h-12 text-green-600 dark:text-green-400" />
        </motion.div>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Session Complete!
        </h1>
        <p className="text-gray-600 dark:text-gray-300 text-lg mb-8">
          Great work! You've completed your study session.
        </p>

        {/* Stats */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-purple-50 dark:bg-purple-900/30 rounded-2xl p-6">
            <Clock className="w-8 h-8 text-purple-600 dark:text-purple-400 mx-auto mb-3" />
            <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
              {formatTime(sessionTime)}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Time Studied</div>
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/30 rounded-2xl p-6">
            <BookOpen className="w-8 h-8 text-blue-600 dark:text-blue-400 mx-auto mb-3" />
            <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
              {highlights}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Highlights</div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            // onClick={() => {
            //   setSessionState("select");
            //   setSessionTime(0);
            //   setHighlights([]);
            //   setExplanation("");
            // }}
            className="flex-1 px-8 py-4 
            bg-gradient-to-r from-purple-600 to-blue-600 
            text-white rounded-xl font-bold shadow-lg 
            hover:shadow-xl transition"
          >
            Start New Session
          </button>

          <button
            // onClick={() => setSessionState("select")}
            className="flex-1 px-8 py-4 border-2 
            border-gray-300 dark:border-gray-600 
            text-gray-700 dark:text-gray-300 
            rounded-xl font-bold hover:bg-gray-50 
            dark:hover:bg-gray-700 transition"
          >
            Back to Materials
          </button>
        </div>
      </motion.div>
    </div>
  );
}
