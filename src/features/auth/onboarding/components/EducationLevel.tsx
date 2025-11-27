import { useState } from 'react';
import { Building2, GraduationCap, School } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { ROKIE_STUDY } from '@/assets';

export default function EducationLevel({ onNext }: { onNext: (value: string) => void }) {
  const [selected, setSelected] = useState<string | null>(null);

  const educationLevels = [
    {
      id: 'high_school',
      label: 'High School',
      icon: <School className="w-5 h-5 text-purple-600" />,
    },
    { id: 'college', label: 'College', icon: <Building2 className="w-5 h-5 text-purple-600" /> },
    {
      id: 'grad_school',
      label: 'Grad School',
      icon: <GraduationCap className="w-5 h-5 text-purple-600" />,
    },
  ];

  const handleSelect = (levelId: string) => {
    setSelected(levelId);
    onNext(levelId); // ✅ pass directly to parent
  };

  // Animation variants
  const variants = {
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 },
  };

  return (
    <div className="min-h-screen flex flex-col  items-center px-4 md:px-0 relative">
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
          <div className="w-full  mt-40 md:mt-56 ">
            <div className="flex flex-row items-center justify-center">
              <motion.img
                src={ROKIE_STUDY}
                alt="ROKIE image"
                className="w-36 h-36 mb-11"
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
                What is your level of education?
              </h2>
            </div>
            <div
              className="  grid gap-4 
              grid-cols-1 
              md:grid-cols-3 md:gap-6"
            >
              {educationLevels.map((level) => (
                <button
                  key={level.id}
                  onClick={() => handleSelect(level.id)}
                  className={`flex items-center gap-3 border border-purple-500 rounded-lg px-4 md:px-20 py-4 w-full transition-colors ${
                    selected === level.id
                      ? 'border-purple-600 bg-purple-50 text-purple-700'
                      : 'border-gray-200 hover:border-purple-400'
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
  );
}
