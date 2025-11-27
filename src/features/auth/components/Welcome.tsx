import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ROKIE_STUDY } from '@/assets';

const WelcomeScreen: React.FC = () => {
  return (
    <div className="flex min-h-screen  flex-col items-center justify-center bg-gradient-to-b from-white to-gray-50 px-6 md:px-12">
      {/* Rookie Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center text-center"
      >
        <motion.img
          src={ROKIE_STUDY}
          alt="ROKIE image"
          className="w-80 h-80"
          animate={{
            y: [0, -10, 0], // moves up by 10px, then back
          }}
          transition={{
            duration: 2, // speed of one full levitation cycle
            repeat: Infinity, // loop forever
            ease: 'easeInOut', // smooth motion
          }}
        />

        <h1 className="text-lg md:text-2xl font-medium text-gray-800 ">
          Studying is a daily action,
          <br className="hidden md:block" />{' '}
          <span className="font-semibold text-purple-600 ">StudyRok</span> helps you stay consistent
        </h1>
      </motion.div>

      {/* Buttons Section */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex flex-col items-center w-full max-w-sm mt-10 space-y-4"
      >
        {/* Continue with Google */}
        <button className="flex items-center justify-center w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 py-3 text-gray-700 dark:text-gray-100 font-medium shadow-sm hover:bg-gray-50 dark:hover:bg-gray-800 transition">
          <FcGoogle size={22} className="mr-2" />
          Continue with Google
        </button>

        {/* Continue with Email */}

        <button className="w-full rounded-xl bg-gradient-to-b from-purple-500 to-purple-700 py-3 text-white font-semibold shadow-md hover:from-indigo-600 hover:to-indigo-800 transition">
          <Link to={'/signup'}>Continue with Email</Link>
        </button>

        {/* Divider */}
        <div className="flex items-center w-full gap-2 text-gray-500 dark:text-gray-400">
          <span className="flex-1 h-px bg-gray-300 dark:bg-gray-700" />
          <span className="text-xs uppercase">or</span>
          <span className="flex-1 h-px bg-gray-300 dark:bg-gray-700" />
        </div>

        {/* Login link */}
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Already have an account?{' '}
          <a
            href="/login"
            className="font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            Login
          </a>
        </p>
      </motion.div>
    </div>
  );
};

export default WelcomeScreen;
