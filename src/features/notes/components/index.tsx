// import React, { useState, useRef, useEffect } from 'react';
// import { Play, Pause, Type, AlignLeft, AlignCenter, AlignRight, AlignJustify, Minus, Plus, Highlighter } from 'lucide-react';

// const ReadingSessionPage = () => {
//   const [fontSize, setFontSize] = useState(16);
//   const [fontFamily, setFontFamily] = useState('Arial');
//   const [textAlign, setTextAlign] = useState('left');
//   const [lineHeight, setLineHeight] = useState(1.6);
//   const [paragraphSpacing, setParagraphSpacing] = useState(16);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [showPopup, setShowPopup] = useState(false);
//   const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });
//   const [selectedText, setSelectedText] = useState('');
//   const [highlightColor, setHighlightColor] = useState('#fef08a');
//   const [highlights, setHighlights] = useState([]);
//   const [showMobileTools, setShowMobileTools] = useState(false);
//   const [showMobileTip, setShowMobileTip] = useState(true);
//   const contentRef = useRef(null);
//   const mobileToolsRef = useRef(null);
//   const speechSynthesisRef = useRef(null);

//   const sampleContent = `This module delves into the fundamental physics, operation, and basic circuit applications of two primary classes of semiconductor devices: Bipolar Junction Transistors (BJTs) and Field-Effect Transistors (FETs). Understanding these devices is crucial as they form the building blocks of modern electronics, enabling amplification, switching, and signal processing.

// Transistors are semiconductor devices that act as electrically controlled switches or amplifiers. They revolutionized electronics by replacing bulky vacuum tubes with small, low-power, solid-state components. BJTs and FETs differ fundamentally in their operating principles, but both achieve control over a larger current flow using a smaller input signal.

// The BJT is a three-terminal device consisting of two PN junctions. It operates based on the injection of minority carriers across the base region. The three terminals are the emitter, base, and collector. Current flowing into the base terminal controls a much larger current between the collector and emitter.

// Field-Effect Transistors operate differently from BJTs. Instead of using current to control current, FETs use an electric field to control the flow of current through a semiconductor channel. This makes them voltage-controlled devices with very high input impedance.`;

//   const handleTextSelection = (e) => {
//     // Prevent default touch selection behavior on mobile
//     if (e.type === 'touchend') {
//       e.preventDefault();
//     }

//     const selection = window.getSelection();
//     const text = selection.toString().trim();

//     if (text.length > 0) {
//       const range = selection.getRangeAt(0);
//       const rect = range.getBoundingClientRect();

//       setSelectedText(text);
//       setPopupPosition({
//         x: rect.left + rect.width / 2,
//         y: rect.top - 10
//       });
//       setShowPopup(true);
//     } else {
//       setShowPopup(false);
//     }
//   };

//   const handleExplainTerm = () => {
//     alert(`Explaining: "${selectedText}"\n\nThis would open an explanation modal or sidebar with details about the selected term.`);
//     setShowPopup(false);
//     window.getSelection().removeAllRanges();
//   };

//   const handleHighlight = () => {
//     const selection = window.getSelection();
//     if (selection.rangeCount > 0) {
//       const range = selection.getRangeAt(0);
//       const span = document.createElement('span');
//       span.style.backgroundColor = highlightColor;
//       span.style.transition = 'background-color 0.2s';
//       span.className = 'highlighted-text';

//       try {
//         range.surroundContents(span);
//         setHighlights([...highlights, { color: highlightColor, element: span }]);
//       } catch (e) {
//         console.log('Could not highlight selection');
//       }
//     }
//     setShowPopup(false);
//     window.getSelection().removeAllRanges();
//   };

//   const clearHighlights = () => {
//     const highlightedElements = document.querySelectorAll('.highlighted-text');
//     highlightedElements.forEach(el => {
//       const parent = el.parentNode;
//       while (el.firstChild) {
//         parent.insertBefore(el.firstChild, el);
//       }
//       parent.removeChild(el);
//     });
//     setHighlights([]);
//   };

//   const toggleTextToSpeech = () => {
//     if (isPlaying) {
//       window.speechSynthesis.cancel();
//       setIsPlaying(false);
//     } else {
//       const utterance = new SpeechSynthesisUtterance(sampleContent);
//       utterance.rate = 0.9;
//       utterance.onend = () => setIsPlaying(false);
//       window.speechSynthesis.speak(utterance);
//       setIsPlaying(true);
//     }
//   };

//   useEffect(() => {
//     return () => {
//       window.speechSynthesis.cancel();
//     };
//   }, []);

//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (showPopup && !e.target.closest('.selection-popup')) {
//         setShowPopup(false);
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, [showPopup]);

//   const handleMobileScreenTap = (e) => {
//     // Only toggle tools if not selecting text
//     if (window.getSelection().toString().trim().length === 0) {
//       if (showMobileTip) {
//         setShowMobileTip(false);
//       }
//       setShowMobileTools(!showMobileTools);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
//         <div className="max-w-7xl mx-auto px-4 py-4">
//           <h1 className="text-xl font-semibold text-gray-800">Transistor Physics and Operation: BJTs and FETs</h1>
//         </div>
//       </header>

//       {/* Control Bar */}
//       <div className="bg-white border-b border-gray-200 sticky top-16 z-10 hidden md:block">
//         <div className="max-w-7xl mx-auto px-4 py-3">
//           <div className="flex flex-wrap items-center gap-4">
//             {/* Font Family */}
//             <div className="flex items-center gap-2">
//               <Type size={18} className="text-gray-600" />
//               <select
//                 value={fontFamily}
//                 onChange={(e) => setFontFamily(e.target.value)}
//                 className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
//               >
//                 <option value="Arial">Arial</option>
//                 <option value="Georgia">Georgia</option>
//                 <option value="Times New Roman">Times New Roman</option>
//                 <option value="Verdana">Verdana</option>
//                 <option value="Courier New">Courier New</option>
//               </select>
//             </div>

//             {/* Font Size */}
//             <div className="flex items-center gap-2 bg-gray-100 rounded-lg px-2 py-1">
//               <button
//                 onClick={() => setFontSize(Math.max(12, fontSize - 1))}
//                 className="p-1.5 hover:bg-gray-200 rounded transition"
//                 aria-label="Decrease font size"
//               >
//                 <Minus size={16} />
//               </button>
//               <span className="text-sm font-medium w-8 text-center">{fontSize}</span>
//               <button
//                 onClick={() => setFontSize(Math.min(32, fontSize + 1))}
//                 className="p-1.5 hover:bg-gray-200 rounded transition"
//                 aria-label="Increase font size"
//               >
//                 <Plus size={16} />
//               </button>
//             </div>

//             {/* Text Alignment */}
//             <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
//               <button
//                 onClick={() => setTextAlign('left')}
//                 className={`p-1.5 rounded transition ${textAlign === 'left' ? 'bg-white shadow' : 'hover:bg-gray-200'}`}
//                 aria-label="Align left"
//               >
//                 <AlignLeft size={16} />
//               </button>
//               <button
//                 onClick={() => setTextAlign('center')}
//                 className={`p-1.5 rounded transition ${textAlign === 'center' ? 'bg-white shadow' : 'hover:bg-gray-200'}`}
//                 aria-label="Align center"
//               >
//                 <AlignCenter size={16} />
//               </button>
//               <button
//                 onClick={() => setTextAlign('right')}
//                 className={`p-1.5 rounded transition ${textAlign === 'right' ? 'bg-white shadow' : 'hover:bg-gray-200'}`}
//                 aria-label="Align right"
//               >
//                 <AlignRight size={16} />
//               </button>
//               <button
//                 onClick={() => setTextAlign('justify')}
//                 className={`p-1.5 rounded transition ${textAlign === 'justify' ? 'bg-white shadow' : 'hover:bg-gray-200'}`}
//                 aria-label="Justify"
//               >
//                 <AlignJustify size={16} />
//               </button>
//             </div>

//             {/* Line Height */}
//             <div className="flex items-center gap-2">
//               <span className="text-sm text-gray-600">Line Height:</span>
//               <input
//                 type="range"
//                 min="1.2"
//                 max="2.5"
//                 step="0.1"
//                 value={lineHeight}
//                 onChange={(e) => setLineHeight(parseFloat(e.target.value))}
//                 className="w-24"
//               />
//               <span className="text-sm font-medium w-8">{lineHeight.toFixed(1)}</span>
//             </div>

//             {/* Paragraph Spacing */}
//             <div className="flex items-center gap-2">
//               <span className="text-sm text-gray-600">Spacing:</span>
//               <input
//                 type="range"
//                 min="8"
//                 max="32"
//                 step="4"
//                 value={paragraphSpacing}
//                 onChange={(e) => setParagraphSpacing(parseInt(e.target.value))}
//                 className="w-24"
//               />
//               <span className="text-sm font-medium w-8">{paragraphSpacing}</span>
//             </div>

//             {/* Highlight Color */}
//             <div className="flex items-center gap-2">
//               <Highlighter size={18} className="text-gray-600" />
//               <input
//                 type="color"
//                 value={highlightColor}
//                 onChange={(e) => setHighlightColor(e.target.value)}
//                 className="w-10 h-8 rounded cursor-pointer"
//                 title="Highlight color"
//               />
//             </div>

//             {/* Clear Highlights */}
//             {highlights.length > 0 && (
//               <button
//                 onClick={clearHighlights}
//                 className="px-3 py-1.5 text-sm bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition"
//               >
//                 Clear Highlights
//               </button>
//             )}

//             {/* Text-to-Speech */}
//             <button
//               onClick={toggleTextToSpeech}
//               className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
//                 isPlaying
//                   ? 'bg-purple-600 text-white hover:bg-purple-700'
//                   : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
//               }`}
//             >
//               {isPlaying ? <Pause size={18} /> : <Play size={18} />}
//               <span className="text-sm font-medium">{isPlaying ? 'Stop' : 'Read Aloud'}</span>
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Reading Content */}
//       <main className="max-w-4xl mx-auto px-4 py-8">
//         {/* Mobile Tip */}
//         {showMobileTip && (
//           <div className="md:hidden mb-4 bg-purple-100 text-purple-800 px-4 py-3 rounded-lg flex items-center justify-between animate-pulse">
//             <span className="text-sm font-medium">💡 Tap to view tools</span>
//             <button
//               onClick={() => setShowMobileTip(false)}
//               className="text-purple-600 hover:text-purple-800 text-xl leading-none"
//             >
//               ×
//             </button>
//           </div>
//         )}

//         <div
//           ref={contentRef}
//           onMouseUp={handleTextSelection}
//           onTouchEnd={handleTextSelection}
//           onClick={handleMobileScreenTap}
//           className="bg-white rounded-lg shadow-sm p-8 md:p-12 select-text"
//           style={{
//             fontSize: `${fontSize}px`,
//             fontFamily: fontFamily,
//             textAlign: textAlign,
//             lineHeight: lineHeight,
//             WebkitUserSelect: 'text',
//             WebkitTouchCallout: 'none',
//           }}
//         >
//           {sampleContent.split('\n\n').map((paragraph, index) => (
//             <p
//               key={index}
//               style={{ marginBottom: `${paragraphSpacing}px` }}
//               className="text-gray-800"
//             >
//               {paragraph}
//             </p>
//           ))}
//         </div>
//       </main>

//       {/* Selection Popup */}
//       {showPopup && (
//         <div
//           className="selection-popup fixed z-50 transform -translate-x-1/2 -translate-y-full"
//           style={{
//             left: `${popupPosition.x}px`,
//             top: `${popupPosition.y}px`,
//           }}
//         >
//           <div className="bg-gray-900 text-white rounded-lg shadow-lg px-3 py-2 mb-2 flex items-center gap-3">
//             <button
//               onClick={handleHighlight}
//               className="text-sm font-medium hover:text-yellow-300 active:text-yellow-300 transition whitespace-nowrap flex items-center gap-1 py-1"
//             >
//               <Highlighter size={14} />
//               Highlight
//             </button>
//             <div className="w-px h-4 bg-gray-600" />
//             <button
//               onClick={handleExplainTerm}
//               className="text-sm font-medium hover:text-purple-300 active:text-purple-300 transition whitespace-nowrap py-1"
//             >
//               Explain term
//             </button>
//           </div>
//           <div
//             className="w-0 h-0 mx-auto"
//             style={{
//               borderLeft: '6px solid transparent',
//               borderRight: '6px solid transparent',
//               borderTop: '6px solid #111827',
//             }}
//           />
//         </div>
//       )}

//       {/* Mobile Tools Bottom Sheet */}
//       <div
//         className={`md:hidden fixed bottom-0 left-0 right-0 bg-white border-t-2 border-gray-200 shadow-2xl z-50 transition-transform duration-300 ${
//           showMobileTools ? 'translate-y-0' : 'translate-y-full'
//         }`}
//       >
//         <div className="px-4 py-4 max-h-[70vh] overflow-y-auto">
//           {/* Handle Bar */}
//           <div className="flex justify-center mb-4">
//             <div className="w-12 h-1.5 bg-gray-300 rounded-full" />
//           </div>

//           <h3 className="text-lg font-semibold mb-4 text-gray-800">Reading Tools</h3>

//           {/* Font Family */}
//           <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-700 mb-2">Font Family</label>
//             <select
//               value={fontFamily}
//               onChange={(e) => setFontFamily(e.target.value)}
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
//             >
//               <option value="Arial">Arial</option>
//               <option value="Georgia">Georgia</option>
//               <option value="Times New Roman">Times New Roman</option>
//               <option value="Verdana">Verdana</option>
//               <option value="Courier New">Courier New</option>
//             </select>
//           </div>

//           {/* Font Size */}
//           <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-700 mb-2">Font Size: {fontSize}px</label>
//             <div className="flex items-center gap-3">
//               <button
//                 onClick={() => setFontSize(Math.max(12, fontSize - 1))}
//                 className="p-2 bg-gray-100 rounded-lg active:bg-gray-200"
//               >
//                 <Minus size={20} />
//               </button>
//               <input
//                 type="range"
//                 min="12"
//                 max="32"
//                 value={fontSize}
//                 onChange={(e) => setFontSize(parseInt(e.target.value))}
//                 className="flex-1"
//               />
//               <button
//                 onClick={() => setFontSize(Math.min(32, fontSize + 1))}
//                 className="p-2 bg-gray-100 rounded-lg active:bg-gray-200"
//               >
//                 <Plus size={20} />
//               </button>
//             </div>
//           </div>

//           {/* Text Alignment */}
//           <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-700 mb-2">Text Alignment</label>
//             <div className="grid grid-cols-4 gap-2">
//               <button
//                 onClick={() => setTextAlign('left')}
//                 className={`p-3 rounded-lg transition ${textAlign === 'left' ? 'bg-purple-600 text-white' : 'bg-gray-100'}`}
//               >
//                 <AlignLeft size={20} className="mx-auto" />
//               </button>
//               <button
//                 onClick={() => setTextAlign('center')}
//                 className={`p-3 rounded-lg transition ${textAlign === 'center' ? 'bg-purple-600 text-white' : 'bg-gray-100'}`}
//               >
//                 <AlignCenter size={20} className="mx-auto" />
//               </button>
//               <button
//                 onClick={() => setTextAlign('right')}
//                 className={`p-3 rounded-lg transition ${textAlign === 'right' ? 'bg-purple-600 text-white' : 'bg-gray-100'}`}
//               >
//                 <AlignRight size={20} className="mx-auto" />
//               </button>
//               <button
//                 onClick={() => setTextAlign('justify')}
//                 className={`p-3 rounded-lg transition ${textAlign === 'justify' ? 'bg-purple-600 text-white' : 'bg-gray-100'}`}
//               >
//                 <AlignJustify size={20} className="mx-auto" />
//               </button>
//             </div>
//           </div>

//           {/* Line Height */}
//           <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-700 mb-2">Line Height: {lineHeight.toFixed(1)}</label>
//             <input
//               type="range"
//               min="1.2"
//               max="2.5"
//               step="0.1"
//               value={lineHeight}
//               onChange={(e) => setLineHeight(parseFloat(e.target.value))}
//               className="w-full"
//             />
//           </div>

//           {/* Paragraph Spacing */}
//           <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-700 mb-2">Paragraph Spacing: {paragraphSpacing}px</label>
//             <input
//               type="range"
//               min="8"
//               max="32"
//               step="4"
//               value={paragraphSpacing}
//               onChange={(e) => setParagraphSpacing(parseInt(e.target.value))}
//               className="w-full"
//             />
//           </div>

//           {/* Highlight Color */}
//           <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-700 mb-2">Highlight Color</label>
//             <div className="flex items-center gap-3">
//               <input
//                 type="color"
//                 value={highlightColor}
//                 onChange={(e) => setHighlightColor(e.target.value)}
//                 className="w-16 h-12 rounded-lg cursor-pointer"
//               />
//               <span className="text-sm text-gray-600">Select text to highlight</span>
//             </div>
//           </div>

//           {/* Clear Highlights */}
//           {highlights.length > 0 && (
//             <button
//               onClick={clearHighlights}
//               className="w-full mb-4 px-4 py-3 bg-red-100 text-red-700 rounded-lg font-medium active:bg-red-200"
//             >
//               Clear All Highlights ({highlights.length})
//             </button>
//           )}

//           {/* Text-to-Speech */}
//           <button
//             onClick={toggleTextToSpeech}
//             className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition ${
//               isPlaying
//                 ? 'bg-purple-600 text-white active:bg-purple-700'
//                 : 'bg-gray-200 text-gray-700 active:bg-gray-300'
//             }`}
//           >
//             {isPlaying ? <Pause size={20} /> : <Play size={20} />}
//             <span>{isPlaying ? 'Stop Reading' : 'Read Aloud'}</span>
//           </button>

//           {/* Close Button */}
//           <button
//             onClick={() => setShowMobileTools(false)}
//             className="w-full mt-4 px-4 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium active:bg-gray-200"
//           >
//             Close
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ReadingSessionPage;
