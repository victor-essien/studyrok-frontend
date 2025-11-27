import { motion, AnimatePresence } from 'framer-motion';
import { ROKIE } from '@/assets';
import { useModal } from '@/hooks/hooks';
import {
  useCreateBoardFromFiles,
  useCreateBoardFromTopic,
} from '@/features/study-boards/hooks/useBoards';
import { CreateStudyBoardModal } from '@/features/study-boards/components/CreateStudyBoardModal';
const variants = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -30 },
};

export default function CreateFirstStudyboardPage() {
  const { openModal, activeModal, closeModal } = useModal();
  const createFromTopic = useCreateBoardFromTopic();
  const createFromFiles = useCreateBoardFromFiles();

  const handleCreateBoard = async (data: any) => {
    try {
      if (data.sourceType === 'topic') {
        await createFromTopic.mutateAsync({
          topic: data.topic,
          title: data.title,
          description: data.description,
          subject: data.subject,
          sourceType: 'topic',
          colorTheme: data.colorTheme,
        });
      } else {
        await createFromFiles.mutateAsync({
          payload: {
            topic: data.title,
            title: data.title,
            colorTheme: data.colorTheme,
            description: data.description,
            sourceType: 'files',
            files: data.files,
          },
        });
      }
      closeModal();
    } catch (error) {
      console.error('Failed to create board:', error);
    }
  };

  const handleClick = () => {
    openModal('createBoard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex flex-col items-center px-4 md:px-6">
      <AnimatePresence mode="wait">
        <motion.div
          key="create"
          variants={variants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.45, ease: 'easeOut' }}
          className="w-full max-w-lg mt-32 md:mt-40 text-center"
        >
          {/* Illustration */}
          <div className="w-44 h-44 mx-auto mb-10">
            <img src={ROKIE} alt="rocket mascot" className="w-full h-full object-contain" />
          </div>

          {/* Header Text */}
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">All Set! 🚀</h2>

          <p className="text-slate-600 text-lg md:text-base leading-relaxed mb-8 px-2">
            You’re ready to begin! Create your first{' '}
            <span className="font-semibold text-purple-600">StudyBoard</span> to organize your{' '}
            <span className="font-medium">materials, quizzes, flashcards</span> and
            <span className="font-medium"> study sessions</span>.
          </p>

          {/* Call-to-action */}
          <button
            onClick={handleClick}
            className="w-full py-3 bg-gradient-to-br from-purple-600 to-blue-600 text-white rounded-2xl text-lg font-semibold shadow-md hover:shadow-lg hover:bg-indigo-700 transition-all"
          >
            Get Started ✨
          </button>
        </motion.div>
      </AnimatePresence>
      {/* Modal */}
      <CreateStudyBoardModal
        isOpen={activeModal === 'createBoard'}
        onClose={closeModal}
        onSubmit={handleCreateBoard}
        isLoading={createFromTopic.isPending || createFromFiles.isPending}
      />
    </div>
  );
}
