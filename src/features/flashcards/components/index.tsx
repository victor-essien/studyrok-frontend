import React, { useState, useEffect } from 'react';
import { BookOpen, Plus, ChevronLeft, ChevronRight, RotateCcw, X } from 'lucide-react';

export default function FlashcardPage() {
  const [activeStudyboard, setActiveStudyboard] = useState('Comp');
  const [flashcards, setFlashcards] = useState([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedNote, setSelectedNote] = useState('');
  const [numFlashcards, setNumFlashcards] = useState(5);
  const [isGenerating, setIsGenerating] = useState(false);

  // Sample notes for the studyboard
  const [notes] = useState([
    {
      id: 1,
      title: 'Introduction to Computer Science',
      content:
        'Computer science is the study of computation, information, and automation. It encompasses both theoretical and practical aspects...',
    },
    {
      id: 2,
      title: 'Data Structures Overview',
      content:
        'Data structures are ways of organizing and storing data efficiently. Common types include arrays, linked lists, stacks, queues, trees, and graphs...',
    },
    {
      id: 3,
      title: 'Algorithms Fundamentals',
      content:
        'An algorithm is a step-by-step procedure for solving a problem. Key characteristics include correctness, efficiency, and clarity...',
    },
  ]);

  // Check if flashcards exist for this studyboard
  useEffect(() => {
    loadFlashcards();
  }, [activeStudyboard]);

  const loadFlashcards = async () => {
    try {
      const result = await window.storage.get(`flashcards:${activeStudyboard}`);
      if (result && result.value) {
        setFlashcards(JSON.parse(result.value));
      } else {
        setFlashcards([]);
      }
    } catch (error) {
      setFlashcards([]);
    }
  };

  const generateFlashcards = async () => {
    if (!selectedNote) return;

    setIsGenerating(true);
    const note = notes.find((n) => n.id.toString() === selectedNote);

    // Simulate AI generation with sample flashcards
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const newFlashcards = Array.from({ length: numFlashcards }, (_, i) => ({
      id: Date.now() + i,
      question: `Sample Question ${i + 1} from ${note.title}`,
      answer: `This is the answer to question ${i + 1}. It contains detailed information extracted from the note content.`,
      noteId: note.id,
      noteTitle: note.title,
    }));

    setFlashcards(newFlashcards);

    // Save to storage
    try {
      await window.storage.set(`flashcards:${activeStudyboard}`, JSON.stringify(newFlashcards));
    } catch (error) {
      console.error('Error saving flashcards:', error);
    }

    setIsGenerating(false);
    setShowCreateModal(false);
    setCurrentCardIndex(0);
  };

  const handleNextCard = () => {
    if (currentCardIndex < flashcards.length - 1) {
      setCurrentCardIndex((prev) => prev + 1);
      setIsFlipped(false);
    }
  };

  const handlePrevCard = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex((prev) => prev - 1);
      setIsFlipped(false);
    }
  };

  const handleReset = () => {
    setCurrentCardIndex(0);
    setIsFlipped(false);
  };

  const currentCard = flashcards[currentCardIndex];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-indigo-100 p-3 rounded-xl">
                <BookOpen className="w-6 h-6 text-indigo-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Flashcards</h1>
                <p className="text-gray-600">Studyboard: {activeStudyboard}</p>
              </div>
            </div>
            {flashcards.length > 0 && (
              <button
                onClick={() => setShowCreateModal(true)}
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                New Set
              </button>
            )}
          </div>
        </div>

        {/* Main Content */}
        {flashcards.length === 0 ? (
          // Empty State
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <div className="bg-indigo-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <BookOpen className="w-10 h-10 text-indigo-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">No Flashcards Yet</h2>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Create your first set of flashcards from your notes to start studying
            </p>
            <button
              onClick={() => setShowCreateModal(true)}
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition inline-flex items-center gap-2 font-medium"
            >
              <Plus className="w-5 h-5" />
              Create Flashcards
            </button>
          </div>
        ) : (
          // Flashcard Display
          <div className="space-y-6">
            {/* Progress Bar */}
            <div className="bg-white rounded-xl shadow-md p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">
                  Card {currentCardIndex + 1} of {flashcards.length}
                </span>
                <button
                  onClick={handleReset}
                  className="text-indigo-600 hover:text-indigo-700 flex items-center gap-1 text-sm"
                >
                  <RotateCcw className="w-4 h-4" />
                  Reset
                </button>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((currentCardIndex + 1) / flashcards.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Flashcard */}
            <div className="perspective-1000">
              <div
                onClick={() => setIsFlipped(!isFlipped)}
                className={`relative w-full h-96 cursor-pointer transition-transform duration-500 transform-style-3d ${
                  isFlipped ? 'rotate-y-180' : ''
                }`}
                style={{
                  transformStyle: 'preserve-3d',
                  transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                }}
              >
                {/* Front */}
                <div
                  className="absolute w-full h-full bg-white rounded-2xl shadow-2xl p-8 backface-hidden flex flex-col items-center justify-center"
                  style={{ backfaceVisibility: 'hidden' }}
                >
                  <div className="text-sm font-medium text-indigo-600 mb-4">QUESTION</div>
                  <p className="text-2xl font-semibold text-gray-900 text-center">
                    {currentCard?.question}
                  </p>
                  <p className="text-sm text-gray-500 mt-8">Click to flip</p>
                </div>

                {/* Back */}
                <div
                  className="absolute w-full h-full bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-2xl p-8 backface-hidden flex flex-col items-center justify-center"
                  style={{
                    backfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)',
                  }}
                >
                  <div className="text-sm font-medium text-indigo-200 mb-4">ANSWER</div>
                  <p className="text-xl text-white text-center">{currentCard?.answer}</p>
                  <p className="text-sm text-indigo-200 mt-8">Click to flip back</p>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-center gap-4">
              <button
                onClick={handlePrevCard}
                disabled={currentCardIndex === 0}
                className="bg-white p-3 rounded-lg shadow-md hover:shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-6 h-6 text-gray-700" />
              </button>
              <div className="text-gray-600 font-medium">
                {currentCardIndex + 1} / {flashcards.length}
              </div>
              <button
                onClick={handleNextCard}
                disabled={currentCardIndex === flashcards.length - 1}
                className="bg-white p-3 rounded-lg shadow-md hover:shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight className="w-6 h-6 text-gray-700" />
              </button>
            </div>

            {/* Source Note Info */}
            <div className="bg-white rounded-xl shadow-md p-4 text-center">
              <p className="text-sm text-gray-600">
                Generated from:{' '}
                <span className="font-medium text-gray-900">{currentCard?.noteTitle}</span>
              </p>
            </div>
          </div>
        )}

        {/* Create Flashcards Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Create Flashcards</h2>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-4">
                {/* Select Note */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Note
                  </label>
                  <select
                    value={selectedNote}
                    onChange={(e) => setSelectedNote(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="">Choose a note...</option>
                    {notes.map((note) => (
                      <option key={note.id} value={note.id}>
                        {note.title}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Number of Flashcards */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Number of Flashcards
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="20"
                    value={numFlashcards}
                    onChange={(e) => setNumFlashcards(parseInt(e.target.value) || 5)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>

                {/* Generate Button */}
                <button
                  onClick={generateFlashcards}
                  disabled={!selectedNote || isGenerating}
                  className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                >
                  {isGenerating ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Generating...
                    </span>
                  ) : (
                    'Generate Flashcards'
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .transform-style-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
    </div>
  );
}
