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
import { useEffect } from 'react';
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
      </Routes>
      {/* Theme Modal */}
      <ThemeModal />
    </>
  );
}

export default App;

// // export default App
// import React, { useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import {
//   Menu,
//   Plus,
//   FileText,
//   Layers,
//   Edit3,
//   Clock,
//   Bookmark,
//   Settings,
//   Calendar,
//   PlayCircle,
//   ChevronRight,
//   Flame,
//   Book,
//   CreditCard,
//   Video,
// } from 'lucide-react';

// // Mock Data
// const mockUser = {
//   name: 'Victor',
//   avatar: 'V',
//   streak: 0,
// };

// const mockStudyBoard = {
//   id: 'board-1',
//   title: 'Comp',
//   icon: '🧬',
//   colorTheme: '#c4b5fd',
//   quizzesCount: 0,
//   flashcardsCount: 0,
//   explainersCount: 0,
//   materialsCount: 0,
//   topics: [
//     { id: 1, title: 'Cellular Development', progress: 0 },
//     { id: 2, title: 'Cellular Communication', progress: 0 },
//     { id: 3, title: 'Cellular Development and Specialization', progress: 0 },
//   ],
//   materials: [
//     { id: 1, title: 'Cell Fate and Development', date: 'OCT 31 2025', icon: '📄' },
//     { id: 2, title: 'Cell Fate and Development', date: 'OCT 31 2025', icon: '📄' },
//     { id: 3, title: 'Cell Fate and Development', date: 'OCT 31 2025', icon: '📄' },
//   ],
//   completionPercentage: 0,
// };

// const mockDetailedBoard = {
//   title: 'Comp',
//   description: 'Welcome to your new study board! You can add materials, create flashcards start a session and continue learning.',
//   stats: {
//     materials: 5,
//     flashcards: 0,
//     rokQuiz: 0,
//     sessions: 0,
//   },
//   sections: [
//     {
//       id: 1,
//       title: 'Cellular Foundations and Energetics',
//       topics: 5,
//       materials: 1,
//       items: [{ title: 'Cellular building blocks', icon: '📄' }],
//       progress: 0,
//     },
//     {
//       id: 2,
//       title: 'Cellular Foundations and Energetics',
//       topics: 5,
//       materials: 1,
//       items: [{ title: 'Cellular building blocks', icon: '📄' }],
//       progress: 0,
//     },
//     {
//       id: 3,
//       title: 'Cellular Foundations and Energetics',
//       topics: 5,
//       materials: 1,
//       items: [{ title: 'Cellular building blocks', icon: '📄' }],
//       progress: 0,
//     },
//   ],
// };

// // Circular Progress Component
// const CircularProgress = ({ percentage, size = 120 }: { percentage: number; size?: number }) => {
//   const radius = (size - 10) / 2;
//   const circumference = 2 * Math.PI * radius;
//   const offset = circumference - (percentage / 100) * circumference;

//   return (
//     <div className="relative" style={{ width: size, height: size }}>
//       <svg width={size} height={size} className="transform -rotate-90">
//         {/* Background circle */}
//         <circle
//           cx={size / 2}
//           cy={size / 2}
//           r={radius}
//           fill="none"
//           stroke="#e5e7eb"
//           strokeWidth="8"
//         />
//         {/* Progress circle */}
//         <circle
//           cx={size / 2}
//           cy={size / 2}
//           r={radius}
//           fill="none"
//           stroke="#8b5cf6"
//           strokeWidth="8"
//           strokeDasharray={circumference}
//           strokeDashoffset={offset}
//           strokeLinecap="round"
//           className="transition-all duration-500"
//         />
//       </svg>
//       <div className="absolute inset-0 flex items-center justify-center">
//         <span className="text-2xl font-bold text-gray-800">{percentage}%</span>
//       </div>
//     </div>
//   );
// };

// // Dashboard Page (Second Image)
// const DashboardPage = ({ onContinueLearning }: { onContinueLearning: () => void }) => {
//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <header className="bg-white px-6 py-4 flex items-center justify-between border-b">
//         <button className="p-2">
//           <Menu className="w-6 h-6" />
//         </button>
//         <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold">
//           {mockUser.avatar}
//         </div>
//       </header>

//       {/* Main Content */}
//       <main className="px-6 py-8">
//         {/* Greeting */}
//         <div className="mb-8">
//           <h1 className="text-3xl font-bold text-gray-900 mb-2">Hi, {mockUser.name}!</h1>
//           <p className="text-gray-600">What are you working on today?</p>
//         </div>

//         {/* Study Boards */}
//         <div className="flex items-center gap-4 mb-6">
//           <motion.button
//             whileHover={{ scale: 1.02 }}
//             className="flex items-center gap-3 px-6 py-4 bg-purple-200 rounded-2xl"
//           >
//             <div className="w-12 h-12 bg-gray-700 rounded-lg flex items-center justify-center text-2xl">
//               {mockStudyBoard.icon}
//             </div>
//             <span className="font-semibold text-gray-900">{mockStudyBoard.title}</span>
//           </motion.button>

//           <motion.button
//             whileHover={{ scale: 1.02 }}
//             className="flex items-center gap-2 px-6 py-4 border-2 border-dashed border-gray-300 rounded-2xl text-gray-600"
//           >
//             <Plus className="w-5 h-5" />
//             <span className="font-semibold">Add new</span>
//           </motion.button>
//         </div>

//         {/* Streak */}
//         <div className="flex items-center justify-end gap-2 mb-8">
//           <Flame className="w-5 h-5 text-orange-500" />
//           <span className="font-bold text-gray-900">{mockUser.streak} Day Streak!</span>
//         </div>

//         {/* Study Board Card */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="bg-purple-200 rounded-3xl p-6 mb-8"
//         >
//           <div className="flex items-center justify-between mb-6">
//             <div className="flex items-center gap-3">
//               <div className="w-12 h-12 bg-gray-700 rounded-lg flex items-center justify-center text-2xl">
//                 {mockStudyBoard.icon}
//               </div>
//               <span className="text-xl font-bold text-gray-900">{mockStudyBoard.title}</span>
//             </div>
//             <div className="flex items-center gap-3">
//               <button className="p-2">
//                 <Bookmark className="w-5 h-5" />
//               </button>
//               <button className="p-2">
//                 <Settings className="w-5 h-5" />
//               </button>
//             </div>
//           </div>

//           {/* Stats Grid */}
//           <div className="grid grid-cols-2 gap-3 mb-6">
//             <div className="bg-white/50 rounded-xl p-4 flex items-center gap-3">
//               <Edit3 className="w-5 h-5 text-purple-600" />
//               <div>
//                 <div className="text-2xl font-bold text-gray-900">{mockStudyBoard.quizzesCount}</div>
//                 <div className="text-sm text-gray-600">Quizzes</div>
//               </div>
//             </div>
//             <div className="bg-white/50 rounded-xl p-4 flex items-center gap-3">
//               <CreditCard className="w-5 h-5 text-blue-600" />
//               <div>
//                 <div className="text-2xl font-bold text-gray-900">{mockStudyBoard.flashcardsCount}</div>
//                 <div className="text-sm text-gray-600">Flashcards</div>
//               </div>
//             </div>
//             <div className="bg-white/50 rounded-xl p-4 flex items-center gap-3">
//               <Video className="w-5 h-5 text-red-600" />
//               <div>
//                 <div className="text-2xl font-bold text-gray-900">{mockStudyBoard.explainersCount}</div>
//                 <div className="text-sm text-gray-600">Explainers</div>
//               </div>
//             </div>
//             <div className="bg-white/50 rounded-xl p-4 flex items-center gap-3">
//               <FileText className="w-5 h-5 text-pink-600" />
//               <div>
//                 <div className="text-2xl font-bold text-gray-900">{mockStudyBoard.materialsCount}</div>
//                 <div className="text-sm text-gray-600">Materials</div>
//               </div>
//             </div>
//           </div>

//           {/* Continue Learning Button */}
//           <motion.button
//             whileHover={{ scale: 1.02 }}
//             whileTap={{ scale: 0.98 }}
//             onClick={onContinueLearning}
//             className="w-full bg-purple-600 text-white py-4 rounded-2xl font-semibold flex items-center justify-center gap-2 shadow-lg"
//           >
//             <PlayCircle className="w-5 h-5" />
//             Continue Learning
//           </motion.button>

//           {/* Topics Progress */}
//           <div className="mt-6 space-y-3">
//             {mockStudyBoard.topics.map((topic) => (
//               <div key={topic.id}>
//                 <div className="flex items-center justify-between mb-2">
//                   <span className="text-sm font-medium text-gray-900">{topic.title}</span>
//                   <span className="text-sm font-bold text-gray-900">{topic.progress}%</span>
//                 </div>
//                 <div className="w-full h-2 bg-white/50 rounded-full overflow-hidden">
//                   <div
//                     className="h-full bg-purple-600 rounded-full transition-all"
//                     style={{ width: `${topic.progress}%` }}
//                   />
//                 </div>
//               </div>
//             ))}
//           </div>
//         </motion.div>

//         {/* Materials Section */}
//         <div className="flex items-center justify-between mb-4">
//           <h2 className="text-xl font-bold text-gray-900">Materials</h2>
//           <button className="text-purple-600 font-semibold">View all</button>
//         </div>

//         <div className="space-y-3 mb-6">
//           {mockStudyBoard.materials.map((material) => (
//             <motion.div
//               key={material.id}
//               whileHover={{ x: 4 }}
//               className="flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-200"
//             >
//               <span className="text-2xl">{material.icon}</span>
//               <div className="flex-1">
//                 <div className="font-semibold text-gray-900">{material.title}</div>
//                 <div className="text-sm text-gray-600">{material.date}</div>
//               </div>
//             </motion.div>
//           ))}
//         </div>

//         {/* Upcoming Section */}
//         <div className="flex items-center justify-between mb-4">
//           <div className="flex items-center gap-2">
//             <Calendar className="w-5 h-5" />
//             <h2 className="text-xl font-bold text-gray-900">Upcoming</h2>
//           </div>
//           <button className="text-purple-600 font-semibold">View all</button>
//         </div>

//         <div className="bg-white rounded-xl p-6 text-center text-gray-500">
//           No upcoming events
//         </div>
//       </main>
//     </div>
//   );
// };

// // Study Board Detail Page (First Image)
// const StudyBoardDetailPage = ({ onBack }: { onBack: () => void }) => {
//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <header className="bg-white px-6 py-4 flex items-center justify-between border-b">
//         <button onClick={onBack} className="p-2">
//           <Menu className="w-6 h-6" />
//         </button>
//         <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold">
//           V
//         </div>
//       </header>

//       {/* Main Content */}
//       <main className="px-6 py-8">
//         {/* Board Header */}
//         <div className="flex items-center gap-4 mb-4">
//           <div className="w-16 h-16 bg-purple-200 rounded-2xl flex items-center justify-center">
//             <span className="text-3xl">🧬</span>
//           </div>
//           <h1 className="text-3xl font-bold text-gray-900">{mockDetailedBoard.title}</h1>
//         </div>

//         {/* New Study Board Button */}
//         <motion.button
//           whileHover={{ scale: 1.02 }}
//           className="flex items-center gap-2 px-4 py-2 border-2 border-gray-300 rounded-xl text-gray-700 font-semibold mb-6"
//         >
//           <Plus className="w-5 h-5" />
//           New study board
//         </motion.button>

//         {/* Description */}
//         <p className="text-gray-600 text-center mb-8 px-4">
//           {mockDetailedBoard.description}
//         </p>

//         {/* Stats Card with Completion Circle */}
//         <div className="bg-white rounded-3xl p-6 shadow-sm mb-8">
//           <div className="flex items-center justify-center mb-6">
//             <CircularProgress percentage={mockDetailedBoard.sections[0].progress} />
//           </div>

//           <div className="grid grid-cols-2 gap-4">
//             <div className="text-center">
//               <div className="flex items-center justify-center gap-2 mb-2">
//                 <FileText className="w-5 h-5 text-gray-600" />
//                 <span className="text-sm font-medium text-gray-600">Materials</span>
//               </div>
//               <div className="text-2xl font-bold text-gray-900">{mockDetailedBoard.stats.materials}</div>
//             </div>

//             <div className="text-center">
//               <div className="flex items-center justify-center gap-2 mb-2">
//                 <Layers className="w-5 h-5 text-gray-600" />
//                 <span className="text-sm font-medium text-gray-600">Flashcards</span>
//               </div>
//               <div className="text-2xl font-bold text-gray-900">{mockDetailedBoard.stats.flashcards}</div>
//             </div>

//             <div className="text-center">
//               <div className="flex items-center justify-center gap-2 mb-2">
//                 <Edit3 className="w-5 h-5 text-gray-600" />
//                 <span className="text-sm font-medium text-gray-600">RokQuiz</span>
//               </div>
//               <div className="text-2xl font-bold text-gray-900">{mockDetailedBoard.stats.rokQuiz}</div>
//             </div>

//             <div className="text-center">
//               <div className="flex items-center justify-center gap-2 mb-2">
//                 <Clock className="w-5 h-5 text-gray-600" />
//                 <span className="text-sm font-medium text-gray-600">Sessions</span>
//               </div>
//               <div className="text-2xl font-bold text-gray-900">{mockDetailedBoard.stats.sessions}</div>
//             </div>
//           </div>
//         </div>

//         {/* Sections List */}
//         <div className="space-y-4">
//           {mockDetailedBoard.sections.map((section, index) => (
//             <motion.div
//               key={section.id}
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: index * 0.1 }}
//               className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200"
//             >
//               <div className="flex items-start justify-between mb-4">
//                 <div className="flex-1">
//                   <h3 className="text-lg font-bold text-gray-900 mb-2">{section.title}</h3>
//                   <p className="text-sm text-gray-600 mb-1">{section.topics} topics</p>
//                   <p className="text-sm text-gray-600">Materials ({section.materials})</p>
//                 </div>
//                 <button className="p-3 bg-gray-200 rounded-full">
//                   <PlayCircle className="w-6 h-6 text-gray-700" />
//                 </button>
//               </div>

//               {/* Items */}
//               <div className="space-y-2 mb-4">
//                 {section.items.map((item, idx) => (
//                   <div key={idx} className="flex items-center gap-2 text-sm text-gray-700">
//                     <span>{item.icon}</span>
//                     <span>{item.title}</span>
//                   </div>
//                 ))}
//               </div>

//               {/* Progress Bar */}
//               <div>
//                 <div className="flex items-center justify-between mb-2">
//                   <span className="text-sm font-medium text-gray-700">Progress</span>
//                   <span className="text-sm font-bold text-gray-900">{section.progress}%</span>
//                 </div>
//                 <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
//                   <div
//                     className="h-full bg-purple-600 rounded-full transition-all"
//                     style={{ width: `${section.progress}%` }}
//                   />
//                 </div>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       </main>
//     </div>
//   );
// };

// // Main App Component
// const App = () => {
//   const [currentPage, setCurrentPage] = useState<'dashboard' | 'detail'>('dashboard');

//   return (
//     <div className="max-w-md mx-auto bg-white shadow-2xl min-h-screen">
//       <AnimatePresence mode="wait">
//         {currentPage === 'dashboard' ? (
//           <motion.div
//             key="dashboard"
//             initial={{ opacity: 0, x: -20 }}
//             animate={{ opacity: 1, x: 0 }}
//             exit={{ opacity: 0, x: 20 }}
//           >
//             <DashboardPage onContinueLearning={() => setCurrentPage('detail')} />
//           </motion.div>
//         ) : (
//           <motion.div
//             key="detail"
//             initial={{ opacity: 0, x: 20 }}
//             animate={{ opacity: 1, x: 0 }}
//             exit={{ opacity: 0, x: -20 }}
//           >
//             <StudyBoardDetailPage onBack={() => setCurrentPage('dashboard')} />
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// };

// export default App;

// import React, { useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import {
//   Menu,
//   Plus,
//   FileText,
//   Layers,
//   Edit3,
//   Clock,
//   Bookmark,
//   Settings,
//   Calendar,
//   PlayCircle,
//   ChevronRight,
//   Flame,
//   Book,
//   CreditCard,
//   Video,
//   Home,
//   BookOpen,
//   MessageSquare,
//   Mic,
//   Gamepad2,
//   GraduationCap,
//   FileEdit,
//   Headphones,
//   Upload,
//   X,
//   Bell,
//   Search,
// } from 'lucide-react';

// // Mock Data
// const mockUser = {
//   name: 'Victor',
//   avatar: 'V',
//   streak: 0,
// };

// const mockStudyBoard = {
//   id: 'board-1',
//   title: 'Comp',
//   icon: '🧬',
//   colorTheme: '#c4b5fd',
//   quizzesCount: 0,
//   flashcardsCount: 0,
//   explainersCount: 0,
//   materialsCount: 0,
//   arcadeCount: 0,
//   tutorMeCount: 0,
//   audioRecapCount: 0,
//   topics: [
//     { id: 1, title: 'Cellular Development', progress: 0 },
//     { id: 2, title: 'Cellular Communication', progress: 0 },
//     { id: 3, title: 'Cellular Development and Specialization', progress: 0 },
//   ],
//   materials: [
//     { id: 1, title: 'Cell Fate and Development', date: 'OCT 31 2025', icon: '📄' },
//     { id: 2, title: 'Cell Fate and Development', date: 'OCT 31 2025', icon: '📄' },
//     { id: 3, title: 'Cell Fate and Development', date: 'OCT 31 2025', icon: '📄' },
//   ],
//   completionPercentage: 0,
// };

// const mockDetailedBoard = {
//   title: 'Comp',
//   description: 'Welcome to your new study board! You can add materials, create flashcards start a session and continue learning.',
//   stats: {
//     materials: 5,
//     flashcards: 0,
//     rokQuiz: 0,
//     sessions: 0,
//   },
//   sections: [
//     {
//       id: 1,
//       title: 'Cellular Foundations and Energetics',
//       topics: 5,
//       materials: 1,
//       items: [{ title: 'Cellular building blocks', icon: '📄' }],
//       progress: 0,
//     },
//     {
//       id: 2,
//       title: 'Cellular Foundations and Energetics',
//       topics: 5,
//       materials: 1,
//       items: [{ title: 'Cellular building blocks', icon: '📄' }],
//       progress: 0,
//     },
//     {
//       id: 3,
//       title: 'Cellular Foundations and Energetics',
//       topics: 5,
//       materials: 1,
//       items: [{ title: 'Cellular building blocks', icon: '📄' }],
//       progress: 0,
//     },
//   ],
// };

// const sidebarItems = [
//   { icon: Home, label: 'Home', active: true },
//   { icon: BookOpen, label: 'My Sets', active: false },
//   { icon: Calendar, label: 'Calendar', active: false },
//   { icon: MessageSquare, label: 'Chat', active: false },
//   { icon: Mic, label: 'Live Lecture', active: false },
//   { icon: CreditCard, label: 'Flashcards', active: false },
//   { icon: Edit3, label: 'Tests & QuizFetch', active: false },
//   { icon: GraduationCap, label: 'Tutor Me', active: false },
//   { icon: Gamepad2, label: 'Arcade', active: false },
//   { icon: FileEdit, label: 'Essay Grading', active: false },
//   { icon: Video, label: 'Explainers', active: false },
//   { icon: Headphones, label: 'Audio Recap', active: false },
//   { icon: FileText, label: 'Notes & Materials', active: false },
// ];

// // Circular Progress Component
// const CircularProgress = ({ percentage, size = 120 }: { percentage: number; size?: number }) => {
//   const radius = (size - 10) / 2;
//   const circumference = 2 * Math.PI * radius;
//   const offset = circumference - (percentage / 100) * circumference;

//   return (
//     <div className="relative" style={{ width: size, height: size }}>
//       <svg width={size} height={size} className="transform -rotate-90">
//         <circle
//           cx={size / 2}
//           cy={size / 2}
//           r={radius}
//           fill="none"
//           stroke="#e5e7eb"
//           strokeWidth="8"
//         />
//         <circle
//           cx={size / 2}
//           cy={size / 2}
//           r={radius}
//           fill="none"
//           stroke="#8b5cf6"
//           strokeWidth="8"
//           strokeDasharray={circumference}
//           strokeDashoffset={offset}
//           strokeLinecap="round"
//           className="transition-all duration-500"
//         />
//       </svg>
//       <div className="absolute inset-0 flex items-center justify-center">
//         <span className="text-2xl font-bold text-gray-800">{percentage}%</span>
//       </div>
//     </div>
//   );
// };

// // Sidebar Component
// const Sidebar = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
//   return (
//     <>
//       {/* Mobile Overlay */}
//       {isOpen && (
//         <div
//           className="fixed inset-0 bg-black/50 z-40 lg:hidden"
//           onClick={onClose}
//         />
//       )}

//       {/* Sidebar */}
//       <motion.aside
//         initial={{ x: -300 }}
//         animate={{ x: isOpen ? 0 : -300 }}
//         transition={{ type: 'tween' }}
//         className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 flex flex-col lg:translate-x-0`}
//       >
//         {/* Logo */}
//         <div className="p-6 border-b border-gray-200 flex items-center justify-between">
//           <div className="flex items-center gap-2">
//             <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
//               <span className="text-white font-bold text-sm">SR</span>
//             </div>
//             <span className="font-bold text-lg">StudyRok</span>
//           </div>
//           <button onClick={onClose} className="lg:hidden">
//             <X className="w-5 h-5" />
//           </button>
//         </div>

//         {/* Search */}
//         <div className="p-4">
//           <div className="relative">
//             <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
//             <input
//               type="text"
//               placeholder="Search..."
//               className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-600"
//             />
//           </div>
//         </div>

//         {/* Navigation */}
//         <nav className="flex-1 overflow-y-auto px-3 py-2">
//           <div className="space-y-1">
//             {sidebarItems.map((item, index) => (
//               <button
//                 key={index}
//                 className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
//                   item.active
//                     ? 'bg-blue-100 text-blue-600'
//                     : 'text-gray-700 hover:bg-gray-100'
//                 }`}
//               >
//                 <item.icon className="w-5 h-5" />
//                 <span className="text-sm font-medium">{item.label}</span>
//               </button>
//             ))}
//           </div>
//         </nav>

//         {/* Upload Button */}
//         <div className="p-4 border-t border-gray-200">
//           <button className="w-full flex items-center justify-center gap-2 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition">
//             <Upload className="w-5 h-5" />
//             Upload
//           </button>
//         </div>
//       </motion.aside>
//     </>
//   );
// };

// // Dashboard Page
// const DashboardPage = ({ onContinueLearning }: { onContinueLearning: () => void }) => {
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [showDarkModeAlert, setShowDarkModeAlert] = useState(true);

//   return (
//     <div className="min-h-screen bg-gray-50 flex">
//       {/* Sidebar */}
//       <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

//       {/* Main Content */}
//       <div className="flex-1 flex flex-col min-h-screen">
//         {/* Header */}
//         <header className="bg-white px-4 lg:px-8 py-4 flex items-center justify-between border-b sticky top-0 z-30">
//           <div className="flex items-center gap-4">
//             <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2">
//               <Menu className="w-6 h-6" />
//             </button>
//             <div className="hidden lg:flex items-center gap-3">
//               <span className="text-4xl">🤖</span>
//               <div>
//                 <h1 className="text-xl font-bold text-gray-900">Good morning, Mike {mockUser.name}!</h1>
//                 <p className="text-sm text-gray-600">Which study set are you working on today?</p>
//               </div>
//             </div>
//           </div>

//           <div className="flex items-center gap-3">
//             <button className="hidden lg:flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition">
//               <Upload className="w-4 h-4" />
//               Upgrade
//             </button>
//             <button className="hidden lg:flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg font-semibold hover:bg-gray-50 transition">
//               <MessageSquare className="w-4 h-4" />
//               Feedback
//             </button>
//             <button className="p-2 hover:bg-gray-100 rounded-lg">
//               <Bell className="w-5 h-5" />
//             </button>
//             <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold">
//               {mockUser.avatar}
//             </div>
//           </div>
//         </header>

//         {/* Main Content Area */}
//         <main className="flex-1 p-4 lg:p-8">
//           <div className="max-w-7xl mx-auto">
//             {/* Mobile Greeting */}
//             <div className="lg:hidden mb-6">
//               <h1 className="text-2xl font-bold text-gray-900 mb-2">Hi, {mockUser.name}!</h1>
//               <p className="text-gray-600">What are you working on today?</p>
//             </div>

//             {/* Dark Mode Alert (Desktop Only) */}
//             {showDarkModeAlert && (
//               <motion.div
//                 initial={{ opacity: 0, y: -20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 className="hidden lg:block bg-purple-100 rounded-2xl p-6 mb-8"
//               >
//                 <div className="flex items-start justify-between">
//                   <div className="flex items-start gap-4">
//                     <div className="w-12 h-12 bg-purple-200 rounded-full flex items-center justify-center">
//                       <span className="text-2xl">💡</span>
//                     </div>
//                     <div>
//                       <h3 className="font-bold text-gray-900 mb-1">Try out Dark Mode!</h3>
//                       <p className="text-gray-700">Toggle the dark mode to give your eyes a break.</p>
//                     </div>
//                   </div>
//                   <button
//                     onClick={() => setShowDarkModeAlert(false)}
//                     className="px-4 py-2 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition"
//                   >
//                     Dismiss
//                   </button>
//                 </div>
//               </motion.div>
//             )}

//             <div className="grid lg:grid-cols-3 gap-6">
//               {/* Left Column - Study Board */}
//               <div className="lg:col-span-2 space-y-6">
//                 {/* Study Boards */}
//                 <div className="flex flex-wrap items-center gap-3">
//                   <motion.button
//                     whileHover={{ scale: 1.02 }}
//                     className="flex items-center gap-3 px-4 lg:px-6 py-3 lg:py-4 bg-blue-100 rounded-2xl"
//                   >
//                     <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gray-700 rounded-lg flex items-center justify-center text-xl lg:text-2xl">
//                       {mockStudyBoard.icon}
//                     </div>
//                     <span className="font-semibold text-gray-900">{mockStudyBoard.title}</span>
//                   </motion.button>

//                   <motion.button
//                     whileHover={{ scale: 1.02 }}
//                     className="flex items-center gap-2 px-4 lg:px-6 py-3 lg:py-4 border-2 border-dashed border-gray-300 rounded-2xl text-gray-600"
//                   >
//                     <Plus className="w-5 h-5" />
//                     <span className="font-semibold">Add Set</span>
//                   </motion.button>
//                 </div>

//                 {/* Study Board Card */}
//                 <motion.div
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   className="bg-blue-200 rounded-3xl p-4 lg:p-6"
//                 >
//                   <div className="flex items-center justify-between mb-4 lg:mb-6">
//                     <div className="flex items-center gap-3">
//                       <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gray-700 rounded-lg flex items-center justify-center text-xl lg:text-2xl">
//                         {mockStudyBoard.icon}
//                       </div>
//                       <div>
//                         <span className="text-lg lg:text-xl font-bold text-gray-900 block">{mockStudyBoard.title}</span>
//                         <span className="text-sm text-gray-600">{mockStudyBoard.materialsCount} materials</span>
//                       </div>
//                     </div>
//                     <div className="flex items-center gap-2">
//                       <button className="p-2 hover:bg-white/30 rounded-lg transition">
//                         <Bookmark className="w-5 h-5" />
//                       </button>
//                       <button className="p-2 hover:bg-white/30 rounded-lg transition">
//                         <Settings className="w-5 h-5" />
//                       </button>
//                     </div>
//                   </div>

//                   {/* Stats Grid */}
//                   <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 mb-4 lg:mb-6">
//                     <div className="bg-white/50 rounded-xl p-3 lg:p-4 flex items-center gap-3">
//                       <Edit3 className="w-5 h-5 text-red-500" />
//                       <div>
//                         <div className="text-xl lg:text-2xl font-bold text-gray-900">{mockStudyBoard.quizzesCount}</div>
//                         <div className="text-xs lg:text-sm text-gray-600">Tests/Quizzes</div>
//                       </div>
//                     </div>
//                     <div className="bg-white/50 rounded-xl p-3 lg:p-4 flex items-center gap-3">
//                       <Video className="w-5 h-5 text-blue-500" />
//                       <div>
//                         <div className="text-xl lg:text-2xl font-bold text-gray-900">{mockStudyBoard.explainersCount}</div>
//                         <div className="text-xs lg:text-sm text-gray-600">Explainers</div>
//                       </div>
//                     </div>
//                     <div className="bg-white/50 rounded-xl p-3 lg:p-4 flex items-center gap-3">
//                       <GraduationCap className="w-5 h-5 text-purple-500" />
//                       <div>
//                         <div className="text-xl lg:text-2xl font-bold text-gray-900">{mockStudyBoard.tutorMeCount}</div>
//                         <div className="text-xs lg:text-sm text-gray-600">Tutor Me</div>
//                       </div>
//                     </div>
//                     <div className="bg-white/50 rounded-xl p-3 lg:p-4 flex items-center gap-3">
//                       <Gamepad2 className="w-5 h-5 text-pink-500" />
//                       <div>
//                         <div className="text-xl lg:text-2xl font-bold text-gray-900">{mockStudyBoard.arcadeCount}</div>
//                         <div className="text-xs lg:text-sm text-gray-600">Arcade</div>
//                       </div>
//                     </div>
//                     <div className="bg-white/50 rounded-xl p-3 lg:p-4 flex items-center gap-3">
//                       <Layers className="w-5 h-5 text-green-500" />
//                       <div>
//                         <div className="text-xl lg:text-2xl font-bold text-gray-900">{mockStudyBoard.flashcardsCount}</div>
//                         <div className="text-xs lg:text-sm text-gray-600">Flashcards</div>
//                       </div>
//                     </div>
//                     <div className="bg-white/50 rounded-xl p-3 lg:p-4 flex items-center gap-3">
//                       <Headphones className="w-5 h-5 text-indigo-500" />
//                       <div>
//                         <div className="text-xl lg:text-2xl font-bold text-gray-900">{mockStudyBoard.audioRecapCount}</div>
//                         <div className="text-xs lg:text-sm text-gray-600">Audio Recap</div>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Continue Learning Button */}
//                   <motion.button
//                     whileHover={{ scale: 1.02 }}
//                     whileTap={{ scale: 0.98 }}
//                     onClick={onContinueLearning}
//                     className="w-full bg-blue-600 text-white py-3 lg:py-4 rounded-2xl font-semibold flex items-center justify-center gap-2 shadow-lg mb-4 lg:mb-6"
//                   >
//                     <PlayCircle className="w-5 h-5" />
//                     Continue Learning
//                   </motion.button>

//                   {/* Topics Progress */}
//                   <div className="space-y-3">
//                     {mockStudyBoard.topics.map((topic) => (
//                       <div key={topic.id}>
//                         <div className="flex items-center justify-between mb-2">
//                           <span className="text-sm font-medium text-gray-900">{topic.title}</span>
//                           <span className="text-sm font-bold text-gray-900">{topic.progress}%</span>
//                         </div>
//                         <div className="w-full h-2 bg-white/50 rounded-full overflow-hidden">
//                           <div
//                             className="h-full bg-gray-900 rounded-full transition-all"
//                             style={{ width: `${topic.progress}%` }}
//                           />
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </motion.div>
//               </div>

//               {/* Right Column - Sidebar Content */}
//               <div className="space-y-6">
//                 {/* Streak Card */}
//                 <div className="bg-white rounded-2xl p-4 lg:p-6 shadow-sm border border-gray-200">
//                   <div className="flex items-center justify-between mb-4">
//                     <div className="flex items-center gap-2">
//                       <Flame className="w-6 h-6 text-orange-500" />
//                       <span className="text-xl font-bold text-gray-900">{mockUser.streak} day streak!</span>
//                     </div>
//                     <button className="text-blue-600 font-semibold text-sm">View Leaderboard</button>
//                   </div>
//                 </div>

//                 {/* Materials Section */}
//                 <div className="bg-white rounded-2xl p-4 lg:p-6 shadow-sm border border-gray-200">
//                   <div className="flex items-center justify-between mb-4">
//                     <h2 className="text-xl font-bold text-gray-900">Materials</h2>
//                     <button className="flex items-center gap-2 px-3 py-1.5 border border-gray-300 rounded-lg text-sm font-semibold hover:bg-gray-50">
//                       <Upload className="w-4 h-4" />
//                       Upload
//                     </button>
//                   </div>

//                   <div className="space-y-3">
//                     {mockStudyBoard.materials.map((material) => (
//                       <motion.div
//                         key={material.id}
//                         whileHover={{ x: 4 }}
//                         className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition cursor-pointer"
//                       >
//                         <span className="text-2xl">{material.icon}</span>
//                         <div className="flex-1 min-w-0">
//                           <div className="font-semibold text-gray-900 text-sm truncate">{material.title}</div>
//                           <div className="text-xs text-gray-600">{material.date}</div>
//                         </div>
//                       </motion.div>
//                     ))}
//                   </div>

//                   <button className="w-full mt-4 text-blue-600 font-semibold text-sm hover:underline">
//                     View All
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// };

// // Study Board Detail Page
// const StudyBoardDetailPage = ({ onBack }: { onBack: () => void }) => {
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   return (
//     <div className="min-h-screen bg-gray-50 flex">
//       {/* Sidebar */}
//       <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

//       {/* Main Content */}
//       <div className="flex-1 flex flex-col min-h-screen">
//         {/* Header */}
//         <header className="bg-white px-4 lg:px-8 py-4 flex items-center justify-between border-b sticky top-0 z-30">
//           <div className="flex items-center gap-4">
//             <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2">
//               <Menu className="w-6 h-6" />
//             </button>
//             <button onClick={onBack} className="hidden lg:block p-2 hover:bg-gray-100 rounded-lg">
//               <ChevronRight className="w-6 h-6 rotate-180" />
//             </button>
//           </div>

//           <div className="flex items-center gap-3">
//             <button className="p-2 hover:bg-gray-100 rounded-lg">
//               <Bell className="w-5 h-5" />
//             </button>
//             <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold">
//               V
//             </div>
//           </div>
//         </header>

//         {/* Main Content */}
//         <main className="flex-1 p-4 lg:p-8">
//           <div className="max-w-6xl mx-auto">
//             {/* Board Header */}
//             <div className="flex items-center gap-4 mb-6">
//               <div className="w-12 h-12 lg:w-16 lg:h-16 bg-purple-200 rounded-2xl flex items-center justify-center">
//                 <span className="text-2xl lg:text-3xl">🧬</span>
//               </div>
//               <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">{mockDetailedBoard.title}</h1>
//             </div>

//             {/* New Study Board Button */}
//             <motion.button
//               whileHover={{ scale: 1.02 }}
//               className="flex items-center gap-2 px-4 py-2 border-2 border-gray-300 rounded-xl text-gray-700 font-semibold mb-6"
//             >
//               <Plus className="w-5 h-5" />
//               New study board
//             </motion.button>

//             {/* Description */}
//             <p className="text-gray-600 text-center lg:text-left mb-8 px-4 lg:px-0">
//               {mockDetailedBoard.description}
//             </p>

//             <div className="grid lg:grid-cols-3 gap-6">
//               {/* Stats Card with Completion Circle */}
//               <div className="lg:col-span-1">
//                 <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-200 sticky top-24">
//                   <div className="flex items-center justify-center mb-6">
//                     <CircularProgress percentage={mockDetailedBoard.sections[0].progress} />
//                   </div>

//                   <div className="grid grid-cols-2 gap-4">
//                     <div className="text-center">
//                       <div className="flex items-center justify-center gap-2 mb-2">
//                         <FileText className="w-5 h-5 text-gray-600" />
//                         <span className="text-sm font-medium text-gray-600">Materials</span>
//                       </div>
//                       <div className="text-2xl font-bold text-gray-900">{mockDetailedBoard.stats.materials}</div>
//                     </div>

//                     <div className="text-center">
//                       <div className="flex items-center justify-center gap-2 mb-2">
//                         <Layers className="w-5 h-5 text-gray-600" />
//                         <span className="text-sm font-medium text-gray-600">Flashcards</span>
//                       </div>
//                       <div className="text-2xl font-bold text-gray-900">{mockDetailedBoard.stats.flashcards}</div>
//                     </div>

//                     <div className="text-center">
//                       <div className="flex items-center justify-center gap-2 mb-2">
//                         <Edit3 className="w-5 h-5 text-gray-600" />
//                         <span className="text-sm font-medium text-gray-600">RokQuiz</span>
//                       </div>
//                       <div className="text-2xl font-bold text-gray-900">{mockDetailedBoard.stats.rokQuiz}</div>
//                     </div>

//                     <div className="text-center">
//                       <div className="flex items-center justify-center gap-2 mb-2">
//                         <Clock className="w-5 h-5 text-gray-600" />
//                         <span className="text-sm font-medium text-gray-600">Sessions</span>
//                       </div>
//                       <div className="text-2xl font-bold text-gray-900">{mockDetailedBoard.stats.sessions}</div>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Sections List */}
//               <div className="lg:col-span-2 space-y-4">
//                 {mockDetailedBoard.sections.map((section, index) => (
//                   <motion.div
//                     key={section.id}
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ delay: index * 0.1 }}
//                     className="bg-white rounded-2xl p-4 lg:p-6 shadow-sm border border-gray-200"
//                   >
//                     <div className="flex items-start justify-between mb-4">
//                       <div className="flex-1">
//                         <h3 className="text-lg font-bold text-gray-900 mb-2">{section.title}</h3>
//                         <p className="text-sm text-gray-600 mb-1">{section.topics} topics</p>
//                         <p className="text-sm text-gray-600">Materials ({section.materials})</p>
//                       </div>
//                       <button className="p-3 bg-gray-200 rounded-full hover:bg-gray-300 transition">
//                         <PlayCircle className="w-6 h-6 text-gray-700" />
//                       </button>
//                     </div>

//                     {/* Items */}
//                     <div className="space-y-2 mb-4">
//                       {section.items.map((item, idx) => (
//                         <div key={idx} className="flex items-center gap-2 text-sm text-gray-700 p-2 bg-gray-50 rounded-lg">
//                           <span>{item.icon}</span>
//                           <span>{item.title}</span>
//                         </div>
//                       ))}
//                     </div>

//                     {/* Progress Bar */}
//                     <div>
//                       <div className="flex items-center justify-between mb-2">
//                         <span className="text-sm font-medium text-gray-700">Progress</span>
//                         <span className="text-sm font-bold text-gray-900">{section.progress}%</span>
//                       </div>
//                       <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
//                         <div
//                           className="h-full bg-purple-600 rounded-full transition-all"
//                           style={{ width: `${section.progress}%` }}
//                         />
//                       </div>
//                     </div>
//                   </motion.div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// };

// // Main App Component
// const App = () => {
//   const [currentPage, setCurrentPage] = useState<'dashboard' | 'detail'>('dashboard');

//   return (
//     <div className="bg-white">
//       <AnimatePresence mode="wait">
//         {currentPage === 'dashboard' ? (
//           <motion.div
//             key="dashboard"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//           >
//             <DashboardPage onContinueLearning={() => setCurrentPage('detail')} />
//           </motion.div>
//         ) : (
//           <motion.div
//             key="detail"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//           >
//             <StudyBoardDetailPage onBack={() => setCurrentPage('dashboard')} />
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// };

// export default App;
