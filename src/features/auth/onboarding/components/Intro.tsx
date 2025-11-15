import { motion } from 'framer-motion';

interface Props {
  onNext?: () => void;
  onBack?: () => void;
}

export const Intro = ({ onNext }: Props) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        className="bg-white rounded-3xl p-12 w-full max-w-2xl shadow-2xl"
      >
        <div className="text-center">
          {/* {React.createElement(steps[step].icon, { className: "w-20 h-20 text-purple-600 mx-auto mb-6" })} */}
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Welcome to StudyRok!</h2>
          <p className="text-xl text-gray-600 mb-8">Let's personalize your study experience",</p>

          <div className="flex gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onNext}
              className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition"
            >
              Continue
            </motion.button>
          </div>
        </div>

        {/* <div className="flex justify-center gap-2 mt-8">
          {steps.map((_, i) => (
            <div
              key={i}
              className={`h-2 rounded-full transition-all ${
                i === step ? 'w-8 bg-purple-600' : 'w-2 bg-gray-300'
              }`}
            />
          ))}
        </div> */}
      </motion.div>
    </div>
  );
};
