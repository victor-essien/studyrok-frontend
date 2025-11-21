import { Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import WelcomeScreen from './features/auth/components/Welcome';
import AuthForm from './features/auth/components/AuthForm';
import Onboarding from './features/auth/onboarding/Onboarding';
import LoginForm from './features/auth/components/LoginForm';
import { Dashboard } from './pages/Dashboard';
import { StudyBoardDetailPage } from './features/study-boards/components/StudyBoardDetailPage';
import { useStore } from '@/store/store';
import { ThemeModal } from './components/ThemeModal';
import ReadingNotesPage from './features/notes/components/ReadingNotesPage';
import { useEffect } from 'react';
import FlashcardPage from './pages/FlashcardPage';
import FlashcardType from './features/flashcards/components/FlashcardType';
import CreateFlashcard from './features/flashcards/components/CreateFlashcard';
import MaterialPage from './features/flashcards/components/MaterialPage';
import RokQuizPage from './features/quizzes/components/RokquizPage';
import StudyPlanner from './features/planner/components/PlannerPage';
import StudySessionPage from './features/session/components/SessionPage';
import StudySession from './features/session/components/StudySession';
import DocumentViewer from './features/session/components/DocumentViewer';
import FlashCard from './features/flashcards/components/FlashCard';
function App() {
  const theme = useStore((state) => state.theme);

  // Initialize theme on mount
  useEffect(() => {
    const applyTheme = (currentTheme: 'light' | 'dark' | 'system') => {
      if (currentTheme === 'dark') {
        document.documentElement.classList.add('dark');
      } else if (currentTheme === 'light') {
        document.documentElement.classList.remove('dark');
      } else {
        // System preference
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        document.documentElement.classList.toggle('dark', prefersDark);
      }
    };

    applyTheme(theme);
  }, [theme]);

  // Listen for system theme changes when theme is set to 'system'
  useEffect(() => {
    if (theme !== 'system') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      document.documentElement.classList.toggle('dark', e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme]);

  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/welcome" element={<WelcomeScreen />} />
        <Route path="/signup" element={<AuthForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/space" element={<Dashboard />} />
        <Route path="/space/studyboard" element={<StudyBoardDetailPage />} />
        <Route path="/space/notes" element={<ReadingNotesPage />} />
        <Route path="/flashcard" element={<FlashcardPage />} />
        <Route path="/flashcard/material" element={<MaterialPage />} />
        <Route path="/flashcard/type" element={<FlashcardType />} />
        <Route path="/flashcard/create" element={<CreateFlashcard />} />
        <Route path="/rokquiz" element={<RokQuizPage />} />
        <Route path="/planner" element={<StudyPlanner />} />
        <Route path="/session" element={<StudySessionPage />} />
        <Route path="/test" element={<StudySession />} />
        <Route path="/document-viewer" element={<DocumentViewer />} />
        <Route path="/flash-card" element={<FlashCard />} />
      </Routes>
      {/* Theme Modal */}
      <ThemeModal />
    </>
  );
}

export default App;
