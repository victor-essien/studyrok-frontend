<div className=" bg-gray-50 dark:bg-gray-900 flex">
  {/* Sidebar */}
  <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
  <SidebarDesk />
  <div className="flex-1 flex flex-col lg:ml-64 min-h-screen">
    {/* Header */}
    <div className=" bg-white dark:bg-gray-800 mx-4  px-4 lg:px-8  py-4 flex items-center justify-between border-b border-gray-200 dark:border-gray-700 sticky top-0 z-30  rounded-2xl shadow-md p-2 mb-6 ">
      <div className="flex items-center gap-4">
        <button
          onClick={() => setQuizState('start')}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-300 rounded-lg transition"
        >
          <X className="w-6 h-6 text-gray-600 dark:text-gray-300" />
        </button>
        <div>
          <div className="font-bold text-gray-900 dark:text-gray-50">
            Question {currentQuestionIndex + 1} of {totalQuestions}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-300">
            {mockQuiz.questions.reduce((acc, q) => acc + q.points, 0)} points total
          </div>
        </div>
      </div>

      {mockQuiz.timeLimit && quizState === 'active' && (
        <div className="flex items-center gap-2 px-4 py-2 bg-purple-100 rounded-lg">
          <Clock className="w-5 h-5 text-purple-600" />
          <span className="font-bold text-purple-900">{formatTime(timeRemaining)}</span>
        </div>
      )}
    </div>

    {/* Progress Bar */}
    <div className="mb-6 max-w-5xl mx-auto">
      <div className="w-full h-3 bg-gray-200  rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          className="h-full bg-gradient-to-r from-purple-600 to-blue-600"
        />
      </div>
    </div>

    {/* Question Card */}
    <motion.div
      key={currentQuestion.id}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-white dark:bg-gray-700 rounded-3xl shadow-xl p-6 md:p-8 mb-6"
    >
      <div className="flex items-start gap-3 mb-6">
        <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
          <span className="font-bold text-purple-600">{currentQuestionIndex + 1}</span>
        </div>
        <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-50 flex-1">
          {currentQuestion.question}
        </h2>
      </div>

      {/* Answer Options */}
      <div className="space-y-3 mb-6">
        {currentQuestion.options?.map((option, index) => {
          const isSelected = selectedAnswer === option;
          const isThisCorrect = option === currentQuestion.correctAnswer;
          const showCorrectAnswer = showExplanation && quizState === 'review';

          return (
            <motion.button
              key={index}
              whileHover={{ scale: quizState === 'active' && !showExplanation ? 1.02 : 1 }}
              whileTap={{ scale: quizState === 'active' && !showExplanation ? 0.98 : 1 }}
              onClick={() => {
                if (quizState === 'active' && !showExplanation) {
                  handleSelectAnswer(option);
                }
              }}
              disabled={showExplanation}
              className={`w-full p-4 md:p-5 rounded-xl border-2 text-left transition flex items-center gap-3 ${
                showCorrectAnswer && isThisCorrect
                  ? 'border-green-500 bg-green-50'
                  : showCorrectAnswer && isSelected && !isThisCorrect
                    ? 'border-red-500 bg-red-50'
                    : isSelected
                      ? 'border-purple-600 bg-purple-50'
                      : 'border-gray-200 dark:border-gray-400 hover:border-purple-300 hover:bg-purple-50'
              }`}
            >
              <div
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                  showCorrectAnswer && isThisCorrect
                    ? 'border-green-500 bg-green-500'
                    : showCorrectAnswer && isSelected && !isThisCorrect
                      ? 'border-red-500 bg-red-500'
                      : isSelected
                        ? 'border-purple-600 bg-purple-600'
                        : 'border-gray-300 '
                }`}
              >
                {showCorrectAnswer && isThisCorrect && (
                  <CheckCircle2 className="w-4 h-4 text-white" />
                )}
                {showCorrectAnswer && isSelected && !isThisCorrect && (
                  <XCircle className="w-4 h-4 text-white " />
                )}
                {isSelected && !showCorrectAnswer && (
                  <div className="w-3 h-3 rounded-full bg-white" />
                )}
              </div>
              <span className="font-medium text-gray-900 dark:text-gray-50 flex-1">{option}</span>
            </motion.button>
          );
        })}
      </div>

      {/* Explanation */}
      <AnimatePresence>
        {showExplanation && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className={`p-4 rounded-xl border-2 ${
              isCorrect ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'
            }`}
          >
            <div className="flex items-start gap-3">
              {isCorrect ? (
                <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
              ) : (
                <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
              )}
              <div className="flex-1">
                <div className={`font-bold mb-2 ${isCorrect ? 'text-green-900' : 'text-red-900'}`}>
                  {isCorrect ? 'Correct!' : 'Incorrect'}
                </div>
                <p className="text-gray-700 dark:text-gray-400">{currentQuestion.explanation}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>

    {/* Navigation */}
    <div className="flex items-center justify-between gap-4">
      <button
        onClick={handlePreviousQuestion}
        disabled={currentQuestionIndex === 0}
        className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="hidden md:inline">Previous</span>
      </button>

      {!showExplanation && quizState === 'active' ? (
        <button
          onClick={handleSubmitAnswer}
          disabled={!selectedAnswer}
          className="flex-1 md:flex-none px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Submit Answer
        </button>
      ) : (
        <button
          onClick={
            currentQuestionIndex === totalQuestions - 1 ? handleCompleteQuiz : handleNextQuestion
          }
          className="flex-1 md:flex-none px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition flex items-center justify-center gap-2"
        >
          <span>{currentQuestionIndex === totalQuestions - 1 ? 'Finish' : 'Next'}</span>
          {currentQuestionIndex < totalQuestions - 1 && <ArrowRight className="w-5 h-5" />}
        </button>
      )}
    </div>
  </div>
</div>;
