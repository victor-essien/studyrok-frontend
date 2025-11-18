import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from '@/components/layout/Sidebar';
import SidebarDesk from '@/components/layout/Sidebar/SidebarDesk';
import HeaderMobile from '@/components/layout/Header/HeaderMobile';
import {
  X,
  Clock,
  CheckCircle2,
  XCircle,
  ArrowRight,
  ArrowLeft,
  Trophy,
  Target,
  Brain,
  AlertCircle,
  RotateCcw,
  Home,
} from 'lucide-react';

// Types
interface QuizQuestion {
  id: string;
  type: 'multiple_choice' | 'true_false' | 'short_answer';
  question: string;
  options?: string[];
  correctAnswer: string;
  explanation: string;
  points: number;
}

interface QuizData {
  id: string;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  timeLimit?: number;
  passingScore: number;
  questions: QuizQuestion[];
}

// Mock Quiz Data
const mockQuiz: QuizData = {
  id: 'quiz-1',
  title: 'Cellular Biology Fundamentals',
  description: 'Test your understanding of cellular processes and structures',
  difficulty: 'medium',
  timeLimit: 15,
  passingScore: 70,
  questions: [
    {
      id: 'q1',
      type: 'multiple_choice',
      question: 'What is the primary function of mitochondria in a cell?',
      options: ['Protein synthesis', 'Energy production (ATP)', 'DNA storage', 'Cell division'],
      correctAnswer: 'Energy production (ATP)',
      explanation:
        'Mitochondria are known as the powerhouse of the cell because they produce ATP (adenosine triphosphate) through cellular respiration.',
      points: 10,
    },
    {
      id: 'q2',
      type: 'true_false',
      question:
        'The cell membrane is selectively permeable, allowing only certain substances to pass through.',
      options: ['True', 'False'],
      correctAnswer: 'True',
      explanation:
        'The cell membrane is selectively permeable, meaning it controls what enters and exits the cell based on size, charge, and other properties.',
      points: 10,
    },
    {
      id: 'q3',
      type: 'multiple_choice',
      question: 'Which organelle is responsible for protein synthesis?',
      options: ['Golgi apparatus', 'Ribosome', 'Lysosome', 'Endoplasmic reticulum'],
      correctAnswer: 'Ribosome',
      explanation:
        'Ribosomes are the cellular structures responsible for synthesizing proteins by translating mRNA.',
      points: 10,
    },
    {
      id: 'q4',
      type: 'multiple_choice',
      question:
        'What is the process by which cells divide to produce two identical daughter cells?',
      options: ['Meiosis', 'Mitosis', 'Binary fission', 'Budding'],
      correctAnswer: 'Mitosis',
      explanation:
        'Mitosis is the process of cell division that results in two genetically identical daughter cells, each with the same number of chromosomes as the parent cell.',
      points: 10,
    },
    {
      id: 'q5',
      type: 'true_false',
      question: 'Chloroplasts are found in animal cells.',
      options: ['True', 'False'],
      correctAnswer: 'False',
      explanation:
        'Chloroplasts are found only in plant cells and some protists. They are responsible for photosynthesis and contain chlorophyll.',
      points: 10,
    },
    {
      id: 'q6',
      type: 'multiple_choice',
      question: 'Which cellular structure contains genetic material (DNA)?',
      options: ['Cytoplasm', 'Cell membrane', 'Nucleus', 'Vacuole'],
      correctAnswer: 'Nucleus',
      explanation:
        "The nucleus is the control center of the cell and contains most of the cell's genetic material (DNA) organized into chromosomes.",
      points: 10,
    },
    {
      id: 'q7',
      type: 'multiple_choice',
      question: 'What is the gel-like substance that fills the cell and suspends organelles?',
      options: ['Cytoplasm', 'Nucleoplasm', 'Protoplasm', 'Cell sap'],
      correctAnswer: 'Cytoplasm',
      explanation:
        'Cytoplasm is the gel-like fluid inside the cell that holds all organelles in place and is the site of many cellular processes.',
      points: 10,
    },
    {
      id: 'q8',
      type: 'true_false',
      question: 'Lysosomes contain digestive enzymes that break down waste materials.',
      options: ['True', 'False'],
      correctAnswer: 'True',
      explanation:
        'Lysosomes are organelles that contain digestive enzymes to break down waste materials, cellular debris, and foreign invaders.',
      points: 10,
    },
    {
      id: 'q9',
      type: 'multiple_choice',
      question: 'The Golgi apparatus is primarily responsible for:',
      options: [
        'Energy production',
        'Modifying, sorting, and packaging proteins',
        'Photosynthesis',
        'DNA replication',
      ],
      correctAnswer: 'Modifying, sorting, and packaging proteins',
      explanation:
        'The Golgi apparatus modifies, sorts, and packages proteins and lipids for storage or transport out of the cell.',
      points: 10,
    },
    {
      id: 'q10',
      type: 'multiple_choice',
      question: 'Which process allows cells to take in large particles or liquids?',
      options: ['Diffusion', 'Osmosis', 'Endocytosis', 'Active transport'],
      correctAnswer: 'Endocytosis',
      explanation:
        'Endocytosis is the process by which cells engulf large particles or liquids by wrapping the cell membrane around them to form a vesicle.',
      points: 10,
    },
  ],
};

const RokQuizPage = () => {
  const [quizState, setQuizState] = useState<'start' | 'active' | 'review' | 'complete'>('start');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [timeRemaining, setTimeRemaining] = useState(
    mockQuiz.timeLimit ? mockQuiz.timeLimit * 60 : 0
  );
  const [showExplanation, setShowExplanation] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const currentQuestion = mockQuiz.questions[currentQuestionIndex];
  const totalQuestions = mockQuiz.questions.length;
  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;

  // Timer
  useEffect(() => {
    if (quizState === 'active' && mockQuiz.timeLimit && timeRemaining > 0) {
      const timer = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            handleCompleteQuiz();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [quizState, timeRemaining]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStartQuiz = () => {
    setQuizState('active');
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setTimeRemaining(mockQuiz.timeLimit ? mockQuiz.timeLimit * 60 : 0);
  };

  const handleSelectAnswer = (answer: string) => {
    setSelectedAnswer(answer);
  };

  const handleSubmitAnswer = () => {
    if (!selectedAnswer) return;

    setUserAnswers({
      ...userAnswers,
      [currentQuestion.id]: selectedAnswer,
    });

    setShowExplanation(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(userAnswers[mockQuiz.questions[currentQuestionIndex + 1]?.id] || '');
      setShowExplanation(false);
    } else {
      handleCompleteQuiz();
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setSelectedAnswer(userAnswers[mockQuiz.questions[currentQuestionIndex - 1].id] || '');
      setShowExplanation(false);
    }
  };

  const handleCompleteQuiz = () => {
    setQuizState('complete');
  };

  const calculateScore = () => {
    let correct = 0;
    mockQuiz.questions.forEach((question) => {
      if (userAnswers[question.id] === question.correctAnswer) {
        correct++;
      }
    });
    return {
      correct,
      total: totalQuestions,
      percentage: Math.round((correct / totalQuestions) * 100),
    };
  };

  const handleReviewAnswers = () => {
    setQuizState('review');
    setCurrentQuestionIndex(0);
    setShowExplanation(true);
  };

  const handleRetakeQuiz = () => {
    setQuizState('start');
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setSelectedAnswer('');
    setShowExplanation(false);
  };

  const isAnswerCorrect = (questionId: string) => {
    const question = mockQuiz.questions.find((q) => q.id === questionId);
    return question && userAnswers[questionId] === question.correctAnswer;
  };

  const difficultyColors = {
    easy: 'bg-green-100 text-green-700',
    medium: 'bg-yellow-100 text-yellow-700',
    hard: 'bg-red-100 text-red-700',
  };

  // Start Screen
  if (quizState === 'start') {
    return (
      <div className=" bg-gray-50 dark:bg-gray-900 flex">
        {/* Sidebar */}
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <SidebarDesk />
        {/* Main Area */}
        <div className="flex-1 flex flex-col lg:ml-64 min-h-screen">
          <HeaderMobile onOpen={() => setSidebarOpen(true)} />

          <div className="flex-1 p-4 sm:p-6 lg:p-10 w-full max-w-5xl mx-auto">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{mockQuiz.title}</h1>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Take a breadth and start the quiz
              </p>
            </div>

            {/* QUIZ STATS GRID */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8"
            >
              <div className="rounded-2xl p-6 text-center bg-purple-100 dark:bg-purple-300 border border-purple-200 dark:border-purple-800">
                <Target className="w-8 h-8 text-purple-600 dark:text-purple-600 mx-auto mb-3" />
                <div className="text-3xl font-bold text-foreground mb-1">{totalQuestions}</div>
                <div className="text-sm text-muted-foreground">Questions</div>
              </div>

              {mockQuiz.timeLimit && (
                <div className="rounded-2xl p-6 text-center bg-blue-100 dark:bg-blue-300 border border-blue-200 dark:border-blue-800">
                  <Clock className="w-8 h-8 text-blue-600 dark:text-blue-600 mx-auto mb-3" />
                  <div className="text-3xl font-bold text-foreground mb-1">
                    {mockQuiz.timeLimit}
                  </div>
                  <div className="text-sm text-muted-foreground">Minutes</div>
                </div>
              )}

              <div className="rounded-2xl p-6 text-center bg-green-100 dark:bg-green-300 border border-green-200 dark:border-green-800">
                <Trophy className="w-8 h-8 text-green-600 dark:text-green-600 mx-auto mb-3" />
                <div className="text-3xl font-bold text-foreground mb-1">
                  {mockQuiz.passingScore}%
                </div>
                <div className="text-sm text-muted-foreground">Passing Score</div>
              </div>
            </motion.div>

            {/* DIFFICULTY TAG */}
            <div className="flex items-center justify-center gap-3 mb-6">
              {/* <span
          className={`px-4 py-2 rounded-full text-sm font-semibold capitalize border border-border bg-accent text-accent-foreground`}
        >
          {mockQuiz.difficulty} Difficulty
        </span> */}
              <span
                className={`px-4 py-2 rounded-full text-sm font-semibold capitalize ${
                  difficultyColors[mockQuiz.difficulty]
                }`}
              >
                {mockQuiz.difficulty} Difficulty
              </span>
            </div>

            {/* START BTN */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleStartQuiz}
              className="w-full py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition
                  bg-gradient-to-r from-purple-600 to-blue-600 text-white"
            >
              Start Quiz
            </motion.button>
          </div>
        </div>
      </div>
    );
  }

  // Quiz Active/Review Screen
  if (quizState === 'active' || quizState === 'review') {
    const isCorrect = isAnswerCorrect(currentQuestion.id);
    const hasAnswered = !!userAnswers[currentQuestion.id];

    return (
      <div className="flex bg-gray-50 dark:bg-gray-900 min-h-screen">
        {/* Sidebar (Mobile + Desktop) */}
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <SidebarDesk />

        {/* MAIN CONTENT AREA */}
        <div className="flex-1 flex flex-col lg:ml-64 min-h-screen">
          {/* HEADER */}
          <header className="sticky  bg-white dark:bg-gray-800 top-0 z-30 mx-4 mt-4 rounded-2xl border border-gray-100 dark:border-gray-600 shadow-md">
            <div className="flex items-center justify-between px-4 lg:px-6 py-4">
              {/* Left Section */}
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuizState('start')}
                  className="p-2 hover:bg-muted rounded-lg transition"
                >
                  <X className="w-6 h-6 text-gray-600 dark:text-gray-200" />
                </button>

                <div>
                  <div className="font-bold  text-gray-600 dark:text-gray-200">
                    Question {currentQuestionIndex + 1} of {totalQuestions}
                  </div>
                  <div className="text-sm  text-gray-500 dark:text-gray-300">
                    {mockQuiz.questions.reduce((acc, q) => acc + q.points, 0)} points total
                  </div>
                </div>
              </div>

              {/* Timer */}
              {mockQuiz.timeLimit && quizState === 'active' && (
                <div className="flex items-center gap-2 px-4 py-2 bg-purple-100 dark:bg-purple-700/30 border border-purple-200 dark:border-purple-800 rounded-lg">
                  <Clock className="w-5 h-5 text-purple-700 dark:text-purple-400" />
                  <span className="font-bold text-lg text-purple-800 dark:text-purple-300">
                    {formatTime(timeRemaining)}
                  </span>
                </div>
              )}
            </div>
          </header>

          {/* PROGRESS BAR */}
          <div className="px-4 lg:px-8 py-4">
            <div className="max-w-4xl mx-auto">
              <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  className="h-full bg-gradient-to-r from-purple-600 to-blue-600"
                />
              </div>
            </div>
          </div>

          {/* QUESTION CARD */}
          <div className="px-4 lg:px-8 pb-10">
            <motion.div
              key={currentQuestion.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-4xl mx-auto bg-gray-100 dark:bg-gray-800 rounded-3xl shadow-lg border border-gray-100 dark:border-gray-600 p-6 md:p-8"
            >
              {/* Question Title */}
              <div className="flex items-start gap-3 mb-6">
                <div className="w-10 h-10 bg-purple-100 dark:bg-purple-500/70 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800 rounded-full flex items-center justify-center">
                  <span className="font-bold">{currentQuestionIndex + 1}</span>
                </div>
                <h2 className="text-xl md:text-2xl font-bold  text-gray-600 dark:text-gray-200 flex-1">
                  {currentQuestion.question}
                </h2>
              </div>

              {/* OPTIONS */}
              <div className="space-y-3 mb-6">
                {currentQuestion.options?.map((option, index) => {
                  const isSelected = selectedAnswer === option;
                  const isCorrectOption = option === currentQuestion.correctAnswer;
                  const showCorrectAnswer = showExplanation && quizState === 'review';

                  return (
                    <motion.button
                      key={index}
                      whileHover={{
                        scale: quizState === 'active' && !showExplanation ? 1.02 : 1,
                      }}
                      whileTap={{
                        scale: quizState === 'active' && !showExplanation ? 0.98 : 1,
                      }}
                      disabled={showExplanation}
                      onClick={() => {
                        if (quizState === 'active' && !showExplanation) {
                          handleSelectAnswer(option);
                        }
                      }}
                      className={`
                  w-full p-4 md:p-5 rounded-xl text-white border-2 text-left transition flex items-center gap-3
                  ${
                    showCorrectAnswer && isCorrectOption
                      ? 'border-green-500 bg-green-50 dark:bg-green-900/30'
                      : showCorrectAnswer && isSelected && !isCorrectOption
                        ? 'border-red-500 bg-red-50 dark:bg-red-900/30'
                        : isSelected
                          ? 'border-purple-600 bg-purple-50 dark:bg-purple-900/20'
                          : ' border-gray-100 dark:border-gray-600 hover:bg-muted'
                  }
                `}
                    >
                      {/* Radio Circle */}
                      <div
                        className={`
                    w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0
                    ${
                      showCorrectAnswer && isCorrectOption
                        ? 'border-green-500 bg-green-500'
                        : showCorrectAnswer && isSelected && !isCorrectOption
                          ? 'border-red-500 bg-red-500'
                          : isSelected
                            ? 'border-purple-600 bg-purple-600'
                            : 'border-muted-foreground/40'
                    }
                  `}
                      >
                        {showCorrectAnswer && isCorrectOption && (
                          <CheckCircle2 className="w-4 h-4 text-white" />
                        )}
                        {showCorrectAnswer && isSelected && !isCorrectOption && (
                          <XCircle className="w-4 h-4 text-white" />
                        )}
                        {isSelected && !showCorrectAnswer && (
                          <div className="w-3 h-3 rounded-full bg-white" />
                        )}
                      </div>

                      <span className="font-medium  flex-1">{option}</span>
                    </motion.button>
                  );
                })}
              </div>

              {/* EXPLANATION */}
              <AnimatePresence>
                {showExplanation && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className={`p-4 rounded-xl border-2 ${
                      isCorrect
                        ? 'bg-green-50 border-green-200 dark:bg-green-900/20'
                        : 'bg-red-50 border-red-200 dark:bg-red-900/20'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      {isCorrect ? (
                        <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                      ) : (
                        <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                      )}

                      <div className="flex-1">
                        <div
                          className={`font-bold mb-2 ${
                            isCorrect
                              ? 'text-green-800 dark:text-green-300'
                              : 'text-red-800 dark:text-red-300'
                          }`}
                        >
                          {isCorrect ? 'Correct!' : 'Incorrect'}
                        </div>

                        <p className=" text-gray-600 dark:text-gray-200">
                          {currentQuestion.explanation}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* NAVIGATION BUTTONS */}
            <div className="max-w-4xl mx-auto mt-6 flex items-center justify-between gap-4">
              {/* Previous */}
              <button
                onClick={handlePreviousQuestion}
                disabled={currentQuestionIndex === 0}
                className="px-6 py-3 border  border-gray-100 dark:border-gray-600  text-gray-600 dark:text-gray-200 rounded-xl hover:bg-muted transition disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="hidden md:inline">Previous</span>
              </button>

              {/* Submit / Next / Finish */}
              {!showExplanation && quizState === 'active' ? (
                <button
                  onClick={handleSubmitAnswer}
                  disabled={!selectedAnswer}
                  className="flex-1 md:flex-none px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Submit Answer
                </button>
              ) : (
                <button
                  onClick={
                    currentQuestionIndex === totalQuestions - 1
                      ? handleCompleteQuiz
                      : handleNextQuestion
                  }
                  className="flex-1 md:flex-none px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition flex items-center justify-center gap-2"
                >
                  {currentQuestionIndex === totalQuestions - 1 ? 'Finish' : 'Next'}
                  {currentQuestionIndex < totalQuestions - 1 && <ArrowRight className="w-5 h-5" />}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Results Screen
  const score = calculateScore();
  const passed = score.percentage >= mockQuiz.passingScore;

  return (
    <div className="flex bg-gray-50 dark:bg-gray-900 min-h-screen">
      {/* Sidebar (Mobile + Desktop) */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <SidebarDesk />
      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col lg:ml-64 min-h-screen">
        <div className="px-4 pt-9 lg:px-8 pb-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-4xl mx-auto bg-gray-100 dark:bg-gray-800 rounded-3xl shadow-lg border border-gray-100 dark:border-gray-600 p-6 md:p-8"
          >
            <div className="text-center mb-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring' }}
                className={`w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center ${
                  passed ? 'bg-green-100' : 'bg-orange-100'
                }`}
              >
                {passed ? (
                  <Trophy className="w-12 h-12 text-green-600" />
                ) : (
                  <Target className="w-12 h-12 text-orange-600" />
                )}
              </motion.div>

              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-4">
                {passed ? 'Congratulations!' : 'Quiz Complete!'}
              </h1>
              <p className="text-gray-600 dark:text-gray-300 text-lg mb-8">
                {passed
                  ? 'You passed the quiz! Great job!'
                  : 'Keep practicing to improve your score.'}
              </p>

              <div className="inline-flex items-center gap-4 bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 mb-8">
                <div className="text-center">
                  <div className="text-5xl font-bold text-gray-900 dark:text-gray-50 mb-1">
                    {score.percentage}%
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">Your Score</div>
                </div>
                <div className="w-px h-16 bg-gray-300" />
                <div className="text-center">
                  <div className="text-5xl font-bold text-gray-900 dark:text-gray-50 mb-1">
                    {score.correct}/{score.total}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">Correct Answers</div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-8">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleReviewAnswers}
                  className="px-8 py-4 bg-purple-100 text-purple-700 rounded-xl font-bold hover:bg-purple-200 transition"
                >
                  Review Answers
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleRetakeQuiz}
                  className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition flex items-center justify-center gap-2"
                >
                  <RotateCcw className="w-5 h-5" />
                  Retake Quiz
                </motion.button>
              </div>

              <button
                onClick={() => setQuizState('start')}
                className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-50 font-semibold flex items-center gap-2 mx-auto"
              >
                <Home className="w-5 h-5" />
                Back to Home
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default RokQuizPage;
