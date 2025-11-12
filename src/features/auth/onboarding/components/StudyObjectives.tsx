import { useState } from 'react';
import { NotebookText, ArrowLeft, BookOpenText, BookMarked, Lightbulb } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';


export default function StudyObjectives({ onNext, onBack } : any) {
  const [selected, setSelected] = useState<string | null>(null);

  const studyObjectives = [
    {
      id: 'stay_consistent',
      label: 'Stay consistent with studying',
      icon: <BookMarked className="w-5 h-5" />,
    },
    {
      id: 'catch_up',
      label: 'Catch up on missed topics',
      icon: <NotebookText className="w-5 h-5" />,
    },
    {
      id: 'prepare_exam',
      label: 'Prepare for an upcoming exam',
      icon: <BookOpenText className="w-5 h-5" />,
    },
    // { id: 'prepare_note', label: 'Help me prepare notes for class', icon: <NotebookPen className="w-5 h-5" /> },
    {
      id: 'build_understanding',
      label: 'Build long-term understanding',
      icon: <Lightbulb className="w-5 h-5" />,
    },
  ];

  // const handleSelected = (levelId: string) => {
  //   // set selected level and trigger the next step if a callback was provided
  //   const selectedObjective = studyObjectives.find((level) => level.id === levelId);

  //   setSelected(levelId);
  //   if (onDataChange && selectedObjective) {
  //     onDataChange('studyObjective', selectedObjective.label);
  //   }
  //   if (onNext) onNext();
  // };


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
            <h2 className="text-2xl md:text-3xl mb-6  md:mb-16  text-left md:text-center font-bold text-gray-900 ">
              Where could you use the most aid studying right now?
            </h2>

            <div
              className="  grid gap-4 
              grid-cols-1 
              md:grid-cols-2 md:gap-6"
            >
              {studyObjectives.map((level) => (
                <button
                  key={level.id}
                  onClick={() => handleSelect(level.id)}
                  className={`flex items-center gap-3 border rounded-xl px-4 md:px-20 py-4 w-full transition-colors ${
                    selected === level.id
                      ? 'border-blue-600 bg-blue-50 text-blue-700'
                      : 'border-gray-200 hover:border-gray-400'
                  }`}
                >
                  {level.icon}
                  <span className="font-medium">{level.label}</span>
                </button>
              ))}
            </div>

            {/* Continue button */}
            {/* <button
          onClick={onNext}
          disabled={!selected}
          className={`mt-8 w-full py-3 rounded-lg text-white font-medium transition ${
            selected
              ? "bg-blue-600 hover:bg-blue-700"
              : "bg-gray-300 cursor-not-allowed"
          }`}
        >
          Continue
        </button> */}
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
