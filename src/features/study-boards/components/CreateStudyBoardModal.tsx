import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  FileUp,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Upload,
  FileText,
  Check,
  Loader2,
} from 'lucide-react';
import { useDropzone } from 'react-dropzone';

interface CreateStudyBoardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: StudyBoardFormData) => void;
  isLoading?: boolean;
}

interface StudyBoardFormData {
  sourceType: 'topic' | 'files';
  topic?: string;
  files?: File[];
  title: string;
  description?: string;
  subject?: string;
  colorTheme: string;
}

const THEME_COLORS = [
  { name: 'Purple', value: '#8B5CF6', gradient: 'from-purple-500 to-purple-600' },
  { name: 'Blue', value: '#3B82F6', gradient: 'from-blue-500 to-blue-600' },
  { name: 'Green', value: '#10B981', gradient: 'from-green-500 to-green-600' },
  { name: 'Orange', value: '#F59E0B', gradient: 'from-orange-500 to-orange-600' },
  { name: 'Red', value: '#EF4444', gradient: 'from-red-500 to-red-600' },
  { name: 'Pink', value: '#EC4899', gradient: 'from-pink-500 to-pink-600' },
  { name: 'Indigo', value: '#6366F1', gradient: 'from-indigo-500 to-indigo-600' },
  { name: 'Teal', value: '#14B8A6', gradient: 'from-teal-500 to-teal-600' },
];

const SUBJECT_SUGGESTIONS = [
  'Mathematics',
  'Science',
  'History',
  'Literature',
  'Computer Science',
  'Biology',
  'Chemistry',
  'Physics',
  'Languages',
  'Business',
  'Psychology',
  'Art',
];

export const CreateStudyBoardModal: React.FC<CreateStudyBoardModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  isLoading = false,
}) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<StudyBoardFormData>({
    sourceType: 'topic',
    topic: '',
    files: [],
    title: '',
    description: '',
    subject: '',
    colorTheme: THEME_COLORS[0].value,
  });

  // Dropzone for file upload
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'text/plain': ['.txt'],
    },
    maxFiles: 5,
    maxSize: 10 * 1024 * 1024, // 10MB
    onDrop: (acceptedFiles) => {
      setFormData({ ...formData, files: acceptedFiles });
      // Auto-generate title from first file
      if (acceptedFiles.length > 0 && !formData.title) {
        const fileName = acceptedFiles[0].name.replace(/\.[^/.]+$/, '');
        setFormData((prev) => ({ ...prev, title: fileName }));
      }
    },
  });

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = () => {
    // Validate required fields
    if (!formData.title) {
      alert('Please provide a title for your study board');
      return;
    }

    if (formData.sourceType === 'topic' && !formData.topic) {
      alert('Please enter a topic');
      return;
    }

    if (formData.sourceType === 'files' && (!formData.files || formData.files.length === 0)) {
      alert('Please upload at least one file');
      return;
    }

    onSubmit(formData);
  };

  const handleClose = () => {
    if (!isLoading) {
      setStep(1);
      setFormData({
        sourceType: 'topic',
        topic: '',
        files: [],
        title: '',
        description: '',
        subject: '',
        colorTheme: THEME_COLORS[0].value,
      });
      onClose();
    }
  };

  const removeFile = (index: number) => {
    setFormData({
      ...formData,
      files: formData.files?.filter((_, i) => i !== index),
    });
  };

  const canProceed = () => {
    if (step === 1) {
      if (formData.sourceType === 'topic') {
        return formData.topic!.trim().length > 0;
      } else {
        return formData.files && formData.files.length > 0;
      }
    }
    if (step === 2) {
      return formData.title.trim().length > 0;
    }
    return true;
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Create Study Board
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Step {step} of 3</p>
            </div>
            <button
              onClick={handleClose}
              disabled={isLoading}
              className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition disabled:opacity-50"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Progress Bar */}
          <div className="h-1 bg-gray-200 dark:bg-gray-700">
            <motion.div
              className="h-full bg-gradient-to-r from-purple-600 to-blue-600"
              initial={{ width: '33%' }}
              animate={{ width: `${(step / 3) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
            <AnimatePresence mode="wait">
              {/* Step 1: Source Selection */}
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      How would you like to create your study board?
                    </h3>

                    {/* Source Type Selection */}
                    <div className="grid md:grid-cols-2 gap-4 mb-6">
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, sourceType: 'topic', files: [] })}
                        className={`p-6 rounded-xl border-2 transition-all text-left ${
                          formData.sourceType === 'topic'
                            ? 'border-purple-600 bg-purple-50 dark:bg-purple-900/20'
                            : 'border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-800'
                        }`}
                      >
                        <div className="flex items-start gap-4">
                          <div
                            className={`p-3 rounded-lg ${
                              formData.sourceType === 'topic'
                                ? 'bg-purple-600 text-white'
                                : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                            }`}
                          >
                            <Sparkles className="w-6 h-6" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                              Generate from Topic
                            </h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              AI will create comprehensive study materials based on your topic
                            </p>
                          </div>
                          {formData.sourceType === 'topic' && (
                            <Check className="w-5 h-5 text-purple-600" />
                          )}
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, sourceType: 'files', topic: '' })}
                        className={`p-6 rounded-xl border-2 transition-all text-left ${
                          formData.sourceType === 'files'
                            ? 'border-purple-600 bg-purple-50 dark:bg-purple-900/20'
                            : 'border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-800'
                        }`}
                      >
                        <div className="flex items-start gap-4">
                          <div
                            className={`p-3 rounded-lg ${
                              formData.sourceType === 'files'
                                ? 'bg-purple-600 text-white'
                                : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                            }`}
                          >
                            <FileUp className="w-6 h-6" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                              Upload Materials
                            </h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              Upload PDFs, docs, or notes to generate study content
                            </p>
                          </div>
                          {formData.sourceType === 'files' && (
                            <Check className="w-5 h-5 text-purple-600" />
                          )}
                        </div>
                      </button>
                    </div>

                    {/* Topic Input */}
                    {formData.sourceType === 'topic' && (
                      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          What topic would you like to study?{' '}
                          <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={formData.topic}
                          onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                          placeholder="e.g., Photosynthesis, World War 2, Calculus..."
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none"
                        />
                        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                          Be specific for better results. AI will generate comprehensive notes,
                          flashcards, and quizzes.
                        </p>
                      </motion.div>
                    )}

                    {/* File Upload */}
                    {formData.sourceType === 'files' && (
                      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Upload your study materials <span className="text-red-500">*</span>
                        </label>
                        <div
                          {...getRootProps()}
                          className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition ${
                            isDragActive
                              ? 'border-purple-600 bg-purple-50 dark:bg-purple-900/20'
                              : 'border-gray-300 dark:border-gray-600 hover:border-purple-400 dark:hover:border-purple-500'
                          }`}
                        >
                          <input {...getInputProps()} />
                          <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                          {isDragActive ? (
                            <p className="text-purple-600 dark:text-purple-400 font-medium">
                              Drop files here...
                            </p>
                          ) : (
                            <>
                              <p className="text-gray-700 dark:text-gray-300 font-medium mb-1">
                                Drag & drop files here, or click to browse
                              </p>
                              <p className="text-sm text-gray-500 dark:text-gray-400">
                                PDF, DOCX, TXT • Max 10MB per file • Up to 5 files
                              </p>
                            </>
                          )}
                        </div>

                        {/* Uploaded Files List */}
                        {formData.files && formData.files.length > 0 && (
                          <div className="mt-4 space-y-2">
                            {formData.files.map((file, index) => (
                              <div
                                key={index}
                                className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                              >
                                <FileText className="w-5 h-5 text-purple-600" />
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                                    {file.name}
                                  </p>
                                  <p className="text-xs text-gray-500 dark:text-gray-400">
                                    {(file.size / 1024).toFixed(2)} KB
                                  </p>
                                </div>
                                <button
                                  onClick={() => removeFile(index)}
                                  className="p-1 text-gray-400 hover:text-red-600 transition"
                                >
                                  <X className="w-4 h-4" />
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              )}

              {/* Step 2: Board Details */}
              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      Name your study board
                    </h3>

                    {/* Title */}
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Board Title <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        placeholder="e.g., Biology Exam Prep, World History Notes"
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none"
                      />
                    </div>

                    {/* Description */}
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Description <span className="text-gray-400 text-xs">(Optional)</span>
                      </label>
                      <textarea
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        placeholder="Brief description of what this study board covers..."
                        rows={3}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none resize-none"
                      />
                    </div>

                    {/* Subject */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Subject Area <span className="text-gray-400 text-xs">(Optional)</span>
                      </label>
                      <input
                        type="text"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        placeholder="e.g., Biology, History, Mathematics"
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none"
                        list="subject-suggestions"
                      />
                      <datalist id="subject-suggestions">
                        {SUBJECT_SUGGESTIONS.map((subject) => (
                          <option key={subject} value={subject} />
                        ))}
                      </datalist>

                      {/* Subject Chips */}
                      <div className="flex flex-wrap gap-2 mt-3">
                        {SUBJECT_SUGGESTIONS.slice(0, 6).map((subject) => (
                          <button
                            key={subject}
                            type="button"
                            onClick={() => setFormData({ ...formData, subject })}
                            className="px-3 py-1 text-sm rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-purple-100 dark:hover:bg-purple-900/30 hover:text-purple-600 dark:hover:text-purple-400 transition"
                          >
                            {subject}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Theme Selection */}
              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      Choose a theme color
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                      This color will help you identify your study board
                    </p>

                    {/* Theme Color Grid */}
                    <div className="grid grid-cols-4 gap-4">
                      {THEME_COLORS.map((theme) => (
                        <button
                          key={theme.value}
                          type="button"
                          onClick={() => setFormData({ ...formData, colorTheme: theme.value })}
                          className="relative group"
                        >
                          <div
                            className={`w-full aspect-square rounded-xl bg-gradient-to-br ${theme.gradient} transition-all ${
                              formData.colorTheme === theme.value
                                ? 'ring-4 ring-offset-2 ring-purple-600 dark:ring-offset-gray-800 scale-105'
                                : 'hover:scale-105'
                            }`}
                          >
                            {formData.colorTheme === theme.value && (
                              <div className="absolute inset-0 flex items-center justify-center">
                                <Check className="w-8 h-8 text-white drop-shadow-lg" />
                              </div>
                            )}
                          </div>
                          <p className="text-xs text-center mt-2 text-gray-700 dark:text-gray-300 font-medium">
                            {theme.name}
                          </p>
                        </button>
                      ))}
                    </div>

                    {/* Preview */}
                    <div className="mt-8 p-6 bg-gray-50 dark:bg-gray-700 rounded-xl">
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                        Preview
                      </p>
                      <div
                        className="p-6 rounded-xl text-white shadow-lg"
                        style={{ backgroundColor: formData.colorTheme }}
                      >
                        <h4 className="text-xl font-bold mb-2">
                          {formData.title || 'Your Study Board Title'}
                        </h4>
                        {formData.description && (
                          <p className="text-sm opacity-90">{formData.description}</p>
                        )}
                        {formData.subject && (
                          <div className="mt-3 inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-semibold">
                            {formData.subject}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between p-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
            <button
              onClick={handleBack}
              disabled={step === 1 || isLoading}
              className="flex items-center gap-2 px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-5 h-5" />
              Back
            </button>

            <div className="flex gap-3">
              <button
                onClick={handleClose}
                disabled={isLoading}
                className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition disabled:opacity-50"
              >
                Cancel
              </button>

              {step < 3 ? (
                <button
                  onClick={handleNext}
                  disabled={!canProceed()}
                  className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                  <ChevronRight className="w-5 h-5" />
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:opacity-90 transition disabled:opacity-50"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    <>
                      <Check className="w-5 h-5" />
                      Create Board
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
