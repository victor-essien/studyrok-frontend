import FlashcardLayout from '@/features/flashcards/components/FlashcardLayout';
import CreateFlashcard from '@/features/flashcards/components/CreateFlashcard';
import FlashcardType from '@/features/flashcards/components/FlashcardType';
import { Route, Routes } from 'react-router-dom';
import FlashcardMaterial from '@/features/flashcards/components/FlashcardMaterial';
import QuizLayout from '@/features/quizzes/components/QuizLayout';
import CreateQuizPage from '@/features/quizzes/components/CreateQuizPage';
import MaterialPage from '@/features/quizzes/components/ChooseMaterial';
import QuizInfo from '@/features/quizzes/components/QuizInfo';

function MainRoutes() {
  return (
    <>
      <Routes>
        <Route path="flashcards/create" element={<FlashcardLayout />}>
          <Route index element={<CreateFlashcard />} />
          <Route path="type" element={<FlashcardType />} />
          <Route path="material" element={<FlashcardMaterial />} />
        </Route>
        {/* Quiz Route */}
        <Route path="rokquiz/create" element={<QuizLayout />}>
          <Route index element={<CreateQuizPage />} />
          <Route path="material" element={<MaterialPage />} />
          <Route path="info" element={<QuizInfo />} />
        </Route>
      </Routes>
    </>
  );
}

export default MainRoutes;
