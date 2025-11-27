import { useState } from 'react';
import { NotebookText, ArrowLeft, BookOpenText, BookMarked, Lightbulb } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { ROKIE_AID } from '@/assets';

export default function StudyObjectives({ onNext, onBack }: any) {
  const [selected, setSelected] = useState<string | null>(null);

  const studyObjectives = [
    {
      id: 'stay_consistent',
      label: 'Stay consistent with studying',
      icon: <BookMarked className="w-5 h-5 text-purple-600" />,
    },
    {
      id: 'catch_up',
      label: 'Catch up on missed topics',
      icon: <NotebookText className="w-5 h-5 text-purple-600" />,
    },
    {
      id: 'prepare_exam',
      label: 'Prepare for an upcoming exam',
      icon: <BookOpenText className="w-5 h-5 text-purple-600" />,
    },
    // { id: 'prepare_note', label: 'Help me prepare notes for class', icon: <NotebookPen className="w-5 h-5" /> },
    {
      id: 'build_understanding',
      label: 'Build long-term understanding',
      icon: <Lightbulb className="w-5 h-5 text-purple-600" />,
    },
  ];

  const handleSelect = (objectiveId: string) => {
    setSelected(objectiveId);
    const selectedObjective = studyObjectives.find((level) => level.id === objectiveId);
    onNext(selectedObjective?.label); // ✅ pass value directly
  };

  // Animation variants
  const variants = {
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 },
  };

  return (
    <div className="min-h-screen flex flex-col  items-center px-4 md:px-0 relative">
      {/* Top bar */}
      <div className="absolute top-14 right-6 flex items-center justify-between w-[90%] md:w-full">
        <button
          onClick={onBack}
          className="text-gray-800 rounded-full p-2 hover:bg-neutral-800 hover:text-gray-100 transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
      </div>

      {/* Question */}
      <AnimatePresence mode="wait">
        <motion.div
          key="education-step"
          variants={variants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.4, ease: 'easeInOut' }}
          //    className="w-full max-w-md md:max-w-3xl mt-20"
        >
          <div className="w-full mt-32 md:mt-52 ">
            <div className="flex flex-row items-center justify-center">
              <motion.img
                src={ROKIE_AID}
                alt="ROKIE image"
                className="w-44 h-45 mb-11"
                animate={{
                  y: [0, -10, 0], // moves up by 10px, then back
                }}
                transition={{
                  duration: 2, // speed of one full levitation cycle
                  repeat: Infinity, // loop forever
                  ease: 'easeInOut', // smooth motion
                }}
              />
              <h2 className="text-2xl md:text-3xl mb-6  md:mb-16  text-left md:text-center font-bold text-gray-900 ">
                What is your goal studying right now?
              </h2>
            </div>
            <div
              className="  grid gap-4 
              grid-cols-1 
              md:grid-cols-2 md:gap-6"
            >
              {studyObjectives.map((level) => (
                <button
                  key={level.id}
                  onClick={() => handleSelect(level.id)}
                  className={`flex items-center gap-3 border border-purple-500 rounded-xl px-4 md:px-20 py-4 w-full transition-colors ${
                    selected === level.id
                      ? 'border-purple-600 bg-purple-50 text-purple-700'
                      : 'border-gray-200 hover:border-gray-400'
                  }`}
                >
                  {level.icon}
                  <span className="font-medium">{level.label}</span>
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
    // <div>
    //   {data?.data.map((board) => (
    //     <div key={board.id}>{board.title}</div>
    //   ))}
    // </div>
  );
}
