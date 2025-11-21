import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Clock,
  Play,
  Pause,
  FileText,
  Book,
  CheckCircle2,
  Settings,
  ZoomIn,
  ZoomOut,
  Type,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Highlighter,
  Bookmark,
  ChevronRight,
  Brain,
  Sparkles,
  Menu,
  Home,
  BookOpen,
} from 'lucide-react';

// Mock data
const mockMaterials = [
  {
    id: 'note-1',
    title: 'Introduction to Photosynthesis',
    type: 'markdown',
    icon: '📄',
    readTime: 5,
    content: `# Introduction to Photosynthesis

## What is Photosynthesis?

**Photosynthesis** is the remarkable process by which plants, algae, and some bacteria convert light energy (usually from the sun) into chemical energy stored in glucose molecules. This process is fundamental to life on Earth as it:

- Produces oxygen that we breathe
- Creates food for the plant
- Forms the base of most food chains

## The Basic Equation

The overall chemical equation for photosynthesis is:

**6CO₂ + 6H₂O + Light Energy → C₆H₁₂O₆ + 6O₂**

This means: *Carbon dioxide + Water + Light → Glucose + Oxygen*

## Why is it Important?

### Oxygen Production
Plants release oxygen as a byproduct, which is essential for animal respiration.

### Food Source
Plants produce glucose, which serves as food for themselves and other organisms.

### Carbon Cycle
Removes CO₂ from the atmosphere, helping regulate climate.

### Energy Storage
Converts solar energy into a usable form.

## Key Components Needed

1. **Sunlight** - Provides the energy
2. **Water (H₂O)** - Absorbed through roots
3. **Carbon Dioxide (CO₂)** - Taken in through leaf pores (stomata)
4. **Chlorophyll** - The green pigment that captures light energy

## The Two Main Stages

Photosynthesis occurs in two main stages:

### Light-Dependent Reactions
These reactions occur in the thylakoid membranes and require direct light energy. The process:
- Absorbs light energy
- Splits water molecules (photolysis)
- Produces ATP and NADPH
- Releases oxygen

### Light-Independent Reactions (Calvin Cycle)
These reactions occur in the stroma and use products from light reactions:
- Fix carbon dioxide
- Use ATP and NADPH
- Produce glucose
- Regenerate RuBP`,
  },
  {
    id: 'note-2',
    title: 'Light-Dependent Reactions',
    type: 'markdown',
    icon: '📄',
    readTime: 7,
    content: `# Light-Dependent Reactions

## Overview

The light-dependent reactions occur in the **thylakoid membranes** of chloroplasts and require direct light energy.

## The Process

### Step 1: Light Absorption
- Chlorophyll absorbs light energy
- Electrons are excited to higher energy state
- Water molecules are split (photolysis)

### Step 2: Electron Transport
- Electrons move through protein chain
- Energy pumps H⁺ ions across membrane
- Creates concentration gradient

### Step 3: ATP Synthesis
- H⁺ ions flow through ATP synthase
- Produces ATP for Calvin cycle`,
  },
  {
    id: 'note-3',
    title: 'Cellular Building Blocks',
    type: 'pdf',
    icon: '📑',
    readTime: 10,
    content: 'PDF content would be rendered here',
  },
];

// Markdown renderer (simple version)
const renderMarkdown = (content: string) => {
  let html = content;

  // Headers
  html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
  html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
  html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');

  // Bold
  html = html.replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>');

  // Italic
  html = html.replace(/\*(.*?)\*/gim, '<em>$1</em>');

  // Lists
  html = html.replace(/^\- (.*$)/gim, '<li>$1</li>');
  html = html.replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>');
  html = html.replace(/^\d+\. (.*$)/gim, '<li>$1</li>');

  // Line breaks
  html = html.replace(/\n\n/g, '</p><p>');
  html = '<p>' + html + '</p>';

  return html;
};

const StudySessionPage = () => {
  const [sessionState, setSessionState] = useState<'select' | 'active' | 'completed'>('select');
  const [selectedMaterial, setSelectedMaterial] = useState<(typeof mockMaterials)[0] | null>(null);
  const [sessionTime, setSessionTime] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Reading settings
  const [fontSize, setFontSize] = useState(16);
  const [fontFamily, setFontFamily] = useState('serif');
  const [textAlign, setTextAlign] = useState<'left' | 'center' | 'right' | 'justify'>('left');
  const [highlightColor, setHighlightColor] = useState('#fef08a');
  const [highlights, setHighlights] = useState<Array<{ id: string; text: string; color: string }>>(
    []
  );
  const [showSettings, setShowSettings] = useState(false);
  const [showExplainPopup, setShowExplainPopup] = useState(false);
  const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });
  const [selectedText, setSelectedText] = useState('');
  const [explanation, setExplanation] = useState('');
  const [isExplaining, setIsExplaining] = useState(false);

  const contentRef = useRef<HTMLDivElement>(null);

  // Timer
  useEffect(() => {
    if (sessionState === 'active' && !isPaused) {
      const interval = setInterval(() => {
        setSessionTime((prev) => prev + 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [sessionState, isPaused]);

  // Text selection handler
  useEffect(() => {
    const handleSelection = () => {
      const selection = window.getSelection();
      const text = selection?.toString().trim();

      if (text && text.length > 0 && text.length < 100) {
        const range = selection?.getRangeAt(0);
        const rect = range?.getBoundingClientRect();

        if (rect) {
          setSelectedText(text);
          setPopupPosition({
            x: rect.left + rect.width / 2,
            y: rect.top - 10,
          });
          setShowExplainPopup(true);
        }
      } else {
        setShowExplainPopup(false);
      }
    };

    document.addEventListener('mouseup', handleSelection);
    return () => document.removeEventListener('mouseup', handleSelection);
  }, []);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hours > 0) {
      return `${hours}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStartSession = (material: (typeof mockMaterials)[0]) => {
    setSelectedMaterial(material);
    setSessionState('active');
    setSessionTime(0);
  };

  const handleEndSession = () => {
    setSessionState('completed');
  };

  const handleHighlight = () => {
    if (selectedText) {
      const id = `highlight-${Date.now()}`;
      setHighlights([...highlights, { id, text: selectedText, color: highlightColor }]);
      setShowExplainPopup(false);

      // Apply highlight to selected text
      const selection = window.getSelection();
      if (selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        const span = document.createElement('span');
        span.style.backgroundColor = highlightColor;
        span.style.padding = '2px 0';
        span.textContent = selectedText;
        range.deleteContents();
        range.insertNode(span);
      }
    }
  };

  const handleExplainTerm = async () => {
    setIsExplaining(true);
    setShowExplainPopup(false);

    // Simulate AI explanation
    setTimeout(() => {
      const explanations: Record<string, string> = {
        photosynthesis:
          'Photosynthesis is the process by which plants use sunlight, water, and carbon dioxide to produce oxygen and energy in the form of sugar.',
        chlorophyll:
          'Chlorophyll is a green pigment found in plants that absorbs light energy for photosynthesis.',
        glucose:
          'Glucose is a simple sugar (monosaccharide) that serves as the primary energy source for cells.',
        atp: 'ATP (Adenosine Triphosphate) is the energy currency of cells, storing and releasing energy for cellular processes.',
        thylakoid:
          'Thylakoid membranes are internal membranes of chloroplasts where light-dependent reactions occur.',
      };

      const term = selectedText.toLowerCase();
      const match = Object.keys(explanations).find((key) => term.includes(key));

      setExplanation(
        match
          ? explanations[match]
          : `"${selectedText}" is a term related to the study material. It refers to a concept or component discussed in this section.`
      );
      setIsExplaining(false);
    }, 1000);
  };

  const fontFamilies = [
    { value: 'serif', label: 'Serif' },
    { value: 'sans-serif', label: 'Sans Serif' },
    { value: 'monospace', label: 'Monospace' },
    { value: 'Georgia, serif', label: 'Georgia' },
    { value: 'Arial, sans-serif', label: 'Arial' },
  ];

  // Material Selection Screen
  if (sessionState === 'select') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-4 md:p-6">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <button className="p-2 hover:bg-white/50 rounded-lg transition">
                <Home className="w-6 h-6 text-gray-700" />
              </button>
              <h1 className="text-3xl font-bold text-gray-900">Start Study Session</h1>
            </div>
          </div>

          {/* Session Info Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl p-8 mb-8 shadow-lg"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl flex items-center justify-center">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Focus Time</h2>
                <p className="text-gray-600">Select a material to begin your session</p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-purple-50 rounded-xl p-4 text-center">
                <Clock className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                <div className="text-sm text-gray-600">Track your time</div>
              </div>
              <div className="bg-blue-50 rounded-xl p-4 text-center">
                <Highlighter className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                <div className="text-sm text-gray-600">Highlight key points</div>
              </div>
              <div className="bg-green-50 rounded-xl p-4 text-center">
                <Brain className="w-6 h-6 text-green-600 mx-auto mb-2" />
                <div className="text-sm text-gray-600">AI explanations</div>
              </div>
            </div>
          </motion.div>

          {/* Materials List */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Available Materials</h3>
            <div className="grid gap-4">
              {mockMaterials.map((material, index) => (
                <motion.button
                  key={material.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleStartSession(material)}
                  className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition text-left flex items-center gap-4 group"
                >
                  <div className="w-16 h-16 bg-purple-100 rounded-xl flex items-center justify-center text-3xl flex-shrink-0">
                    {material.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-bold text-gray-900 mb-1">{material.title}</h4>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {material.readTime} min read
                      </span>
                      <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-semibold capitalize">
                        {material.type}
                      </span>
                    </div>
                  </div>
                  <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center group-hover:bg-purple-700 transition">
                    <Play className="w-6 h-6 text-white" />
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Active Session Screen
  if (sessionState === 'active' && selectedMaterial) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Top Bar */}
        <div className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button
                  onClick={handleEndSession}
                  className="p-2 hover:bg-gray-100 rounded-lg transition"
                >
                  <X className="w-6 h-6 text-gray-700" />
                </button>
                <div className="hidden md:block">
                  <h2 className="font-bold text-gray-900">{selectedMaterial.title}</h2>
                  <p className="text-sm text-gray-600">{selectedMaterial.readTime} min read</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                {/* Timer */}
                <div className="flex items-center gap-2 px-4 py-2 bg-purple-100 rounded-lg">
                  <Clock className="w-5 h-5 text-purple-600" />
                  <span className="font-bold text-purple-900">{formatTime(sessionTime)}</span>
                </div>

                {/* Pause/Resume */}
                <button
                  onClick={() => setIsPaused(!isPaused)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition"
                >
                  {isPaused ? (
                    <Play className="w-6 h-6 text-gray-700" />
                  ) : (
                    <Pause className="w-6 h-6 text-gray-700" />
                  )}
                </button>

                {/* Settings */}
                <button
                  onClick={() => setShowSettings(!showSettings)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition"
                >
                  <Settings className="w-6 h-6 text-gray-700" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto px-4 py-8 md:py-12">
          {/* Settings Panel */}
          <AnimatePresence>
            {showSettings && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-white rounded-2xl shadow-xl p-6 mb-6"
              >
                <h3 className="text-lg font-bold text-gray-900 mb-4">Reading Settings</h3>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Font Size */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Font Size
                    </label>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setFontSize(Math.max(12, fontSize - 2))}
                        className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition"
                      >
                        <ZoomOut className="w-5 h-5" />
                      </button>
                      <span className="flex-1 text-center font-semibold">{fontSize}px</span>
                      <button
                        onClick={() => setFontSize(Math.min(24, fontSize + 2))}
                        className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition"
                      >
                        <ZoomIn className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  {/* Font Family */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Font Family
                    </label>
                    <select
                      value={fontFamily}
                      onChange={(e) => setFontFamily(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 outline-none"
                    >
                      {fontFamilies.map((font) => (
                        <option key={font.value} value={font.value}>
                          {font.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Text Alignment */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Text Alignment
                    </label>
                    <div className="flex gap-2">
                      {[
                        { value: 'left', icon: AlignLeft },
                        { value: 'center', icon: AlignCenter },
                        { value: 'right', icon: AlignRight },
                        { value: 'justify', icon: AlignJustify },
                      ].map(({ value, icon: Icon }) => (
                        <button
                          key={value}
                          onClick={() => setTextAlign(value as any)}
                          className={`flex-1 p-3 rounded-lg transition ${
                            textAlign === value
                              ? 'bg-purple-600 text-white'
                              : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                          }`}
                        >
                          <Icon className="w-5 h-5 mx-auto" />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Highlight Color */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Highlight Color
                    </label>
                    <div className="flex gap-2">
                      {['#fef08a', '#bbf7d0', '#bfdbfe', '#fecaca', '#e9d5ff'].map((color) => (
                        <button
                          key={color}
                          onClick={() => setHighlightColor(color)}
                          className={`w-10 h-10 rounded-lg border-2 transition ${
                            highlightColor === color ? 'border-gray-900' : 'border-gray-300'
                          }`}
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Explain Popup */}
          <AnimatePresence>
            {showExplainPopup && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                style={{
                  position: 'fixed',
                  left: popupPosition.x,
                  top: popupPosition.y,
                  transform: 'translate(-50%, -100%)',
                }}
                className="z-50 bg-white rounded-lg shadow-xl border border-gray-200 p-2 flex gap-2"
              >
                <button
                  onClick={handleExplainTerm}
                  className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition text-sm font-semibold whitespace-nowrap"
                >
                  <Brain className="w-4 h-4" />
                  Explain Term
                </button>
                <button
                  onClick={handleHighlight}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition text-sm font-semibold"
                >
                  <Highlighter className="w-4 h-4" />
                  Highlight
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* AI Explanation */}
          <AnimatePresence>
            {explanation && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-gradient-to-r from-purple-50 to-blue-50 border-2 border-purple-200 rounded-2xl p-6 mb-6"
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-bold text-purple-900">AI Explanation</h4>
                      <button
                        onClick={() => setExplanation('')}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                    <p className="text-gray-700 leading-relaxed">{explanation}</p>
                    <div className="mt-3 pt-3 border-t border-purple-200">
                      <span className="text-sm text-purple-700 font-medium">
                        Term: "{selectedText}"
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {isExplaining && (
            <div className="bg-white rounded-2xl p-6 mb-6 shadow-lg">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin" />
                <span className="text-gray-700">Generating explanation...</span>
              </div>
            </div>
          )}

          {/* Note Content */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-3xl shadow-xl p-8 md:p-12"
          >
            <div
              ref={contentRef}
              style={{
                fontSize: `${fontSize}px`,
                fontFamily: fontFamily,
                textAlign: textAlign,
                lineHeight: 1.8,
              }}
              className="prose prose-lg max-w-none select-text"
              dangerouslySetInnerHTML={{ __html: renderMarkdown(selectedMaterial.content) }}
            />
          </motion.div>

          {/* Complete Session Button */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleEndSession}
            className="w-full mt-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition flex items-center justify-center gap-2"
          >
            <CheckCircle2 className="w-6 h-6" />
            Complete Session
          </motion.button>
        </div>
      </div>
    );
  }

  // Completed Session Screen
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-4 md:p-6 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-3xl shadow-xl p-8 md:p-12 max-w-2xl w-full text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring' }}
          className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <CheckCircle2 className="w-12 h-12 text-green-600" />
        </motion.div>

        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Session Complete!</h1>
        <p className="text-gray-600 text-lg mb-8">
          Great work! You've completed your study session.
        </p>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-purple-50 rounded-2xl p-6">
            <Clock className="w-8 h-8 text-purple-600 mx-auto mb-3" />
            <div className="text-3xl font-bold text-gray-900 mb-1">{formatTime(sessionTime)}</div>
            <div className="text-sm text-gray-600">Time Studied</div>
          </div>

          <div className="bg-blue-50 rounded-2xl p-6">
            <BookOpen className="w-8 h-8 text-blue-600 mx-auto mb-3" />
            <div className="text-3xl font-bold text-gray-900 mb-1">{highlights.length}</div>
            <div className="text-sm text-gray-600">Highlights</div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => {
              setSessionState('select');
              setSessionTime(0);
              setHighlights([]);
              setExplanation('');
            }}
            className="flex-1 px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition"
          >
            Start New Session
          </button>
          <button
            onClick={() => setSessionState('select')}
            className="flex-1 px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-xl font-bold hover:bg-gray-50 transition"
          >
            Back to Materials
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default StudySessionPage;
