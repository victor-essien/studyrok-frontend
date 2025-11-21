// import React, { useState, useCallback } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import {
//   FileText,
//   Download,
//   Eye,
//   EyeOff,
//   ZoomIn,
//   ZoomOut,
//   ChevronLeft,
//   ChevronRight,
//   X,
//   Upload,
//   File,
//   FileType,
//   Loader2,
//   AlertCircle,
//   CheckCircle2,
//   Trash2,
//   ExternalLink,
// } from 'lucide-react';

// // Mock uploaded document
// const mockDocument = {
//   id: 'doc-1',
//   name: 'Cell Biology Chapter 5.pdf',
//   type: 'application/pdf',
//   size: 2457600, // 2.4 MB
//   uploadedAt: '2024-03-10T10:30:00Z',
//   url: 'https://example.com/documents/cell-biology.pdf',
//   thumbnailUrl: null,
//   pageCount: 15,
// };

// // File type icons and colors
// const getFileIcon = (fileType: string) => {
//   if (fileType.includes('pdf')) return { icon: FileText, color: 'text-red-600', bg: 'bg-red-50' };
//   if (fileType.includes('word') || fileType.includes('document')) return { icon: FileType, color: 'text-blue-600', bg: 'bg-blue-50' };
//   if (fileType.includes('text')) return { icon: File, color: 'text-gray-600', bg: 'bg-gray-50' };
//   return { icon: File, color: 'text-gray-600', bg: 'bg-gray-50' };
// };

// const formatFileSize = (bytes: number) => {
//   if (bytes === 0) return '0 Bytes';
//   const k = 1024;
//   const sizes = ['Bytes', 'KB', 'MB', 'GB'];
//   const i = Math.floor(Math.log(bytes) / Math.log(k));
//   return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
// };

// // Document Viewer Component
// const DocumentViewer = () => {
//   const [documents, setDocuments] = useState([mockDocument]);
//   const [selectedDoc, setSelectedDoc] = useState<typeof mockDocument | null>(null);
//   const [uploading, setUploading] = useState(false);
//   const [uploadProgress, setUploadProgress] = useState(0);
//   const [dragActive, setDragActive] = useState(false);
//   const [zoom, setZoom] = useState(100);
//   const [currentPage, setCurrentPage] = useState(1);

//   // File upload handler
//   const handleFileUpload = async (files: FileList | null) => {
//     if (!files || files.length === 0) return;

//     const file = files[0];

//     // Validate file type
//     const allowedTypes = [
//       'application/pdf',
//       'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
//       'application/msword',
//       'text/plain',
//     ];

//     if (!allowedTypes.includes(file.type)) {
//       alert('Please upload PDF, Word, or Text files only');
//       return;
//     }

//     // Validate file size (max 10MB)
//     if (file.size > 10 * 1024 * 1024) {
//       alert('File size must be less than 10MB');
//       return;
//     }

//     setUploading(true);
//     setUploadProgress(0);

//     // Simulate upload progress
//     const interval = setInterval(() => {
//       setUploadProgress((prev) => {
//         if (prev >= 100) {
//           clearInterval(interval);
//           return 100;
//         }
//         return prev + 10;
//       });
//     }, 200);

//     // Simulate API call
//     setTimeout(() => {
//       const newDoc = {
//         id: `doc-${Date.now()}`,
//         name: file.name,
//         type: file.type,
//         size: file.size,
//         uploadedAt: new Date().toISOString(),
//         url: URL.createObjectURL(file),
//         thumbnailUrl: null,
//         pageCount: Math.floor(Math.random() * 20) + 5,
//       };

//       setDocuments([...documents, newDoc]);
//       setUploading(false);
//       setUploadProgress(0);
//       clearInterval(interval);
//     }, 2000);
//   };

//   const handleDrag = useCallback((e: React.DragEvent) => {
//     e.preventDefault();
//     e.stopPropagation();
//     if (e.type === 'dragenter' || e.type === 'dragover') {
//       setDragActive(true);
//     } else if (e.type === 'dragleave') {
//       setDragActive(false);
//     }
//   }, []);

//   const handleDrop = useCallback((e: React.DragEvent) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setDragActive(false);

//     if (e.dataTransfer.files && e.dataTransfer.files[0]) {
//       handleFileUpload(e.dataTransfer.files);
//     }
//   }, []);

//   const handleDelete = (docId: string) => {
//     setDocuments(documents.filter(doc => doc.id !== docId));
//     if (selectedDoc?.id === docId) {
//       setSelectedDoc(null);
//     }
//   };

//   const handleViewDocument = (doc: typeof mockDocument) => {
//     setSelectedDoc(doc);
//     setCurrentPage(1);
//     setZoom(100);
//   };

//   // Document Viewer Modal
//   const DocumentModal = () => {
//     if (!selectedDoc) return null;

//     return (
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         exit={{ opacity: 0 }}
//         className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
//         onClick={() => setSelectedDoc(null)}
//       >
//         <motion.div
//           initial={{ scale: 0.9 }}
//           animate={{ scale: 1 }}
//           exit={{ scale: 0.9 }}
//           onClick={(e) => e.stopPropagation()}
//           className="bg-white rounded-2xl w-full max-w-5xl h-[90vh] flex flex-col shadow-2xl"
//         >
//           {/* Header */}
//           <div className="flex items-center justify-between p-4 border-b">
//             <div className="flex items-center gap-3 flex-1 min-w-0">
//               <FileText className="w-6 h-6 text-gray-600 flex-shrink-0" />
//               <div className="flex-1 min-w-0">
//                 <h3 className="font-bold text-gray-900 truncate">{selectedDoc.name}</h3>
//                 <p className="text-sm text-gray-600">
//                   Page {currentPage} of {selectedDoc.pageCount}
//                 </p>
//               </div>
//             </div>

//             <div className="flex items-center gap-2">
//               {/* Zoom Controls */}
//               <button
//                 onClick={() => setZoom(Math.max(50, zoom - 25))}
//                 className="p-2 hover:bg-gray-100 rounded-lg transition"
//               >
//                 <ZoomOut className="w-5 h-5" />
//               </button>
//               <span className="text-sm font-semibold text-gray-700 min-w-[60px] text-center">
//                 {zoom}%
//               </span>
//               <button
//                 onClick={() => setZoom(Math.min(200, zoom + 25))}
//                 className="p-2 hover:bg-gray-100 rounded-lg transition"
//               >
//                 <ZoomIn className="w-5 h-5" />
//               </button>

//               <div className="w-px h-6 bg-gray-300 mx-2" />

//               {/* Download */}
//               <a
//                 href={selectedDoc.url}
//                 download={selectedDoc.name}
//                 className="p-2 hover:bg-gray-100 rounded-lg transition"
//               >
//                 <Download className="w-5 h-5" />
//               </a>

//               {/* Close */}
//               <button
//                 onClick={() => setSelectedDoc(null)}
//                 className="p-2 hover:bg-gray-100 rounded-lg transition"
//               >
//                 <X className="w-5 h-5" />
//               </button>
//             </div>
//           </div>

//           {/* Document Viewer Area */}
//           <div className="flex-1 overflow-auto bg-gray-100 p-4 flex items-center justify-center">
//             <div
//               className="bg-white shadow-lg"
//               style={{
//                 transform: `scale(${zoom / 100})`,
//                 transformOrigin: 'top center',
//                 transition: 'transform 0.2s',
//               }}
//             >
//               {selectedDoc.type.includes('pdf') ? (
//                 <div className="w-[600px] h-[800px] flex items-center justify-center border border-gray-300">
//                   <div className="text-center">
//                     <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
//                     <p className="text-gray-600 mb-2">PDF Viewer</p>
//                     <p className="text-sm text-gray-500">
//                       In production, use react-pdf or pdf.js
//                     </p>
//                     <a
//                       href={selectedDoc.url}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
//                     >
//                       <ExternalLink className="w-4 h-4" />
//                       Open in New Tab
//                     </a>
//                   </div>
//                 </div>
//               ) : (
//                 <div className="w-[600px] h-[800px] p-8 border border-gray-300 overflow-auto">
//                   <h1 className="text-2xl font-bold mb-4">Document Preview</h1>
//                   <p className="text-gray-600 mb-4">
//                     This is a preview of {selectedDoc.name}
//                   </p>
//                   <p className="text-gray-600">
//                     In production, implement proper document viewers:
//                   </p>
//                   <ul className="list-disc list-inside text-gray-600 mt-2 space-y-1">
//                     <li>PDF: react-pdf, pdfjs-dist</li>
//                     <li>Word: mammoth.js, docx-preview</li>
//                     <li>Text: Direct text rendering</li>
//                   </ul>
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Navigation Footer */}
//           {selectedDoc.pageCount > 1 && (
//             <div className="flex items-center justify-center gap-4 p-4 border-t">
//               <button
//                 onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
//                 disabled={currentPage === 1}
//                 className="p-2 hover:bg-gray-100 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 <ChevronLeft className="w-5 h-5" />
//               </button>

//               <input
//                 type="number"
//                 min="1"
//                 max={selectedDoc.pageCount}
//                 value={currentPage}
//                 onChange={(e) => {
//                   const page = parseInt(e.target.value);
//                   if (page >= 1 && page <= selectedDoc.pageCount) {
//                     setCurrentPage(page);
//                   }
//                 }}
//                 className="w-16 px-2 py-1 text-center border border-gray-300 rounded-lg"
//               />

//               <button
//                 onClick={() => setCurrentPage(Math.min(selectedDoc.pageCount, currentPage + 1))}
//                 disabled={currentPage === selectedDoc.pageCount}
//                 className="p-2 hover:bg-gray-100 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 <ChevronRight className="w-5 h-5" />
//               </button>
//             </div>
//           )}
//         </motion.div>
//       </motion.div>
//     );
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
//       <div className="max-w-6xl mx-auto">
//         {/* Header */}
//         <div className="mb-8">
//           <h1 className="text-3xl font-bold text-gray-900 mb-2">Study Materials</h1>
//           <p className="text-gray-600">Upload and manage your study documents</p>
//         </div>

//         {/* Upload Area */}
//         <div
//           onDragEnter={handleDrag}
//           onDragLeave={handleDrag}
//           onDragOver={handleDrag}
//           onDrop={handleDrop}
//           className={`mb-8 border-2 border-dashed rounded-2xl p-8 transition ${
//             dragActive
//               ? 'border-purple-600 bg-purple-50'
//               : 'border-gray-300 bg-white'
//           }`}
//         >
//           <div className="text-center">
//             <Upload className={`w-12 h-12 mx-auto mb-4 ${dragActive ? 'text-purple-600' : 'text-gray-400'}`} />
//             <h3 className="text-lg font-bold text-gray-900 mb-2">
//               {dragActive ? 'Drop files here' : 'Upload Study Materials'}
//             </h3>
//             <p className="text-gray-600 mb-4">
//               PDF, Word, or Text files (Max 10MB)
//             </p>
//             <label className="inline-block">
//               <input
//                 type="file"
//                 accept=".pdf,.doc,.docx,.txt"
//                 onChange={(e) => handleFileUpload(e.target.files)}
//                 className="hidden"
//               />
//               <span className="px-6 py-3 bg-purple-600 text-white rounded-xl font-semibold hover:bg-purple-700 transition cursor-pointer inline-block">
//                 Choose File
//               </span>
//             </label>
//           </div>

//           {/* Upload Progress */}
//           {uploading && (
//             <motion.div
//               initial={{ opacity: 0, y: 10 }}
//               animate={{ opacity: 1, y: 0 }}
//               className="mt-6"
//             >
//               <div className="flex items-center gap-3 mb-2">
//                 <Loader2 className="w-5 h-5 text-purple-600 animate-spin" />
//                 <span className="text-sm font-medium text-gray-700">Uploading...</span>
//                 <span className="ml-auto text-sm font-bold text-purple-600">{uploadProgress}%</span>
//               </div>
//               <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
//                 <motion.div
//                   initial={{ width: 0 }}
//                   animate={{ width: `${uploadProgress}%` }}
//                   className="h-full bg-purple-600 rounded-full"
//                 />
//               </div>
//             </motion.div>
//           )}
//         </div>

//         {/* Documents Grid */}
//         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {documents.map((doc) => {
//             const { icon: Icon, color, bg } = getFileIcon(doc.type);

//             return (
//               <motion.div
//                 key={doc.id}
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 whileHover={{ y: -4 }}
//                 className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 hover:border-purple-300 transition group"
//               >
//                 <div className="flex items-start gap-4 mb-4">
//                   <div className={`w-12 h-12 ${bg} rounded-xl flex items-center justify-center flex-shrink-0`}>
//                     <Icon className={`w-6 h-6 ${color}`} />
//                   </div>
//                   <div className="flex-1 min-w-0">
//                     <h3 className="font-bold text-gray-900 truncate mb-1">{doc.name}</h3>
//                     <p className="text-sm text-gray-600">{formatFileSize(doc.size)}</p>
//                     {doc.pageCount && (
//                       <p className="text-sm text-gray-500">{doc.pageCount} pages</p>
//                     )}
//                   </div>
//                   <button
//                     onClick={() => handleDelete(doc.id)}
//                     className="opacity-0 group-hover:opacity-100 transition p-2 hover:bg-red-50 rounded-lg"
//                   >
//                     <Trash2 className="w-4 h-4 text-red-600" />
//                   </button>
//                 </div>

//                 <div className="flex gap-2">
//                   <motion.button
//                     whileHover={{ scale: 1.05 }}
//                     whileTap={{ scale: 0.95 }}
//                     onClick={() => handleViewDocument(doc)}
//                     className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition flex items-center justify-center gap-2"
//                   >
//                     <Eye className="w-4 h-4" />
//                     View
//                   </motion.button>
//                   <a
//                     href={doc.url}
//                     download={doc.name}
//                     className="px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition flex items-center justify-center"
//                   >
//                     <Download className="w-4 h-4" />
//                   </a>
//                 </div>
//               </motion.div>
//             );
//           })}
//         </div>

//         {documents.length === 0 && !uploading && (
//           <div className="text-center py-16">
//             <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
//             <p className="text-gray-500">No documents uploaded yet</p>
//           </div>
//         )}

//         {/* Document Viewer Modal */}
//         <AnimatePresence>
//           {selectedDoc && <DocumentModal />}
//         </AnimatePresence>
//       </div>
//     </div>
//   );
// };

// export default DocumentViewer;

import React, { useState, useRef, useEffect } from 'react';
import {
  Upload,
  Download,
  Type,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Highlighter,
  Volume2,
  VolumeX,
  Loader2,
} from 'lucide-react';
import * as mammoth from 'mammoth';

interface Highlight {
  text: string;
  color: string;
}
const DocumentViewer = () => {
  const [file, setFile] = useState<File | null>(null);
  const [content, setContent] = useState('');
  const [fileType, setFileType] = useState('');
  const [highlights, setHighlights] = useState<Highlight[]>([]);
  const [selectedText, setSelectedText] = useState('');
  const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0, show: false });
  const [currentColor, setCurrentColor] = useState('#ffeb3b');
  const [fontSize, setFontSize] = useState(16);
  const [fontFamily, setFontFamily] = useState('Arial');
  const [textAlign, setTextAlign] = useState<'left' | 'right' | 'center' | 'justify'>('left');

  const [isSpeaking, setIsSpeaking] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const contentRef = useRef<HTMLDivElement | null>(null);
  const speechSynthRef = useRef<SpeechSynthesisUtterance | null>(null);

  const colors = ['#ffeb3b', '#4caf50', '#2196f3', '#ff9800', '#e91e63'];
  const fonts = ['Arial', 'Georgia', 'Times New Roman', 'Courier New', 'Verdana'];

  useEffect(() => {
    return () => {
      if (speechSynthRef.current) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = e.target.files?.[0];
    if (!uploadedFile) return;

    setFile(uploadedFile);
    setLoading(true);
    setError('');
    setContent('');
    setHighlights([]);

    const type = (uploadedFile.name.split('.').pop() || '').toLowerCase();
    setFileType(type);
    console.log('YEYYEYEY');
    console.log(type);

    try {
      console.log('yuoooo');
      let text = '';
      console.log('yuooppppoo', type);

      if (type === 'pdf') {
        console.log('reading pdf');
        text = await readPDF(uploadedFile);
        console.log('texttt', text);
      } else if (type === 'docx' || type === 'doc') {
        text = await readDocx(uploadedFile);
      } else if (type === 'md' || type === 'txt') {
        text = await uploadedFile.text();
      } else {
        throw new Error('Unsupported file type. Please upload PDF, DOCX, MD, or TXT files.');
      }

      if (!text || text.trim().length === 0) {
        throw new Error('The document appears to be empty or could not be read.');
      }
      console.log('final text', text);
      setContent(text);
      setLoading(false);
    } catch (err) {
      console.error('Error reading file:', err);
      setError((err as Error).message || 'Failed to read the document. Please try another file.');
      setLoading(false);
    }
  };
  const loadPDFJS = (): Promise<any> => {
    return new Promise((resolve, reject) => {
      if (window.pdfjsLib) {
        console.log(window.pdfjsLib);
        resolve(window.pdfjsLib);
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';
      script.onload = () => {
        if (window.pdfjsLib) {
          window.pdfjsLib.GlobalWorkerOptions.workerSrc =
            'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
          resolve(window.pdfjsLib);
        } else {
          reject(new Error('PDF.js failed to load'));
        }
      };
      script.onerror = () => reject(new Error('Failed to load PDF.js library'));
      document.head.appendChild(script);
    });
  };

  const readPDF = async (file: File): Promise<string> => {
    return new Promise<string>(async (resolve, reject) => {
      try {
        // Load PDF.js dynamically
        const pdfjsLib = await loadPDFJS();

        const reader = new FileReader();

        reader.onerror = () => reject(new Error('Failed to read PDF file'));

        reader.onload = async (e: ProgressEvent<FileReader>) => {
          try {
            const result = e.target?.result;
            if (!(result instanceof ArrayBuffer)) {
              reject(new Error('Unexpected file reader result type'));
              return;
            }
            const typedarray = new Uint8Array(result);
            const loadingTask = pdfjsLib.getDocument({
              data: typedarray,
              verbosity: 0,
            });
            const pdf = await loadingTask.promise;

            let fullText = '';

            for (let i = 1; i <= pdf.numPages; i++) {
              const page = await pdf.getPage(i);
              const textContent = await page.getTextContent();
              const pageText = (textContent.items as any[])
                .map((item) => (item as any).str)
                .join(' ');
              fullText += `--- Page ${i} ---\n${pageText}\n\n`;
            }

            if (!fullText.trim()) {
              reject(
                new Error('No text content found in PDF. It may be image-based or encrypted.')
              );
              return;
            }

            resolve(fullText);
          } catch (err) {
            console.error('PDF parsing error:', err);
            reject(
              new Error(
                'Could not parse PDF. The file may be corrupted, password-protected, or image-based.'
              )
            );
          }
        };

        reader.readAsArrayBuffer(file);
      } catch (err) {
        console.error('PDF parsing error:', err);
        reject(new Error('Could not parse PDF. The file may be corrupted or password-protected.'));
      }
    });
  };

  const readDocx = async (file: File): Promise<string> => {
    try {
      const arrayBuffer = await file.arrayBuffer();
      const result = await mammoth.extractRawText({ arrayBuffer });

      const value = result && (result as any).value;
      if (!value || typeof value !== 'string') {
        throw new Error('Could not extract text from DOCX file');
      }

      return value;
    } catch (err) {
      throw new Error('Failed to read DOCX file. The file may be corrupted.');
    }
  };

  const handleTextSelection = () => {
    const selection = window.getSelection()!!;
    const text = selection.toString().trim();

    if (text && text.length > 0) {
      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();

      setSelectedText(text);
      setPopupPosition({
        x: rect.left + rect.width / 2,
        y: rect.top + window.scrollY - 10,
        show: true,
      });
    } else {
      setPopupPosition({ ...popupPosition, show: false });
    }
  };

  const highlightText = (color: string) => {
    const selection = window.getSelection()!!;
    if (!selection.rangeCount) return;

    const range = selection.getRangeAt(0);
    const span = document.createElement('span');
    span.style.backgroundColor = color;
    span.style.padding = '2px 0';
    span.className = 'highlight';

    try {
      range.surroundContents(span);
      setHighlights([...highlights, { text: selectedText, color }]);
      setPopupPosition({ ...popupPosition, show: false });
      selection.removeAllRanges();
    } catch (e) {
      console.error('Could not apply highlight:', e);
      alert(
        'Could not apply highlight to this selection. Try selecting text within a single paragraph.'
      );
    }
  };

  const readAloud = () => {
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const textToRead = selectedText || content;
    if (!textToRead) return;

    const utterance = new SpeechSynthesisUtterance(textToRead);
    utterance.rate = 1;
    utterance.pitch = 1;
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    speechSynthRef.current = utterance;
    window.speechSynthesis.speak(utterance);
    setIsSpeaking(true);
  };

  const saveDocument = () => {
    const contentElement = contentRef.current;
    if (!contentElement) return;

    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>${file?.name || 'Document'}</title>
  <style>
    body {
      font-family: ${fontFamily};
      font-size: ${fontSize}px;
      text-align: ${textAlign};
      line-height: 1.8;
      padding: 40px;
      max-width: 900px;
      margin: 0 auto;
    }
    .highlight {
      padding: 2px 0;
    }
  </style>
</head>
<body>
${contentElement.innerHTML}
</body>
</html>`;

    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${file?.name.split('.')[0] || 'document'}_edited.html`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-t-2xl shadow-lg p-6 border-b border-slate-200">
          <h1 className="text-3xl font-bold text-slate-800 mb-6">Document Viewer & Editor</h1>

          {/* Upload Section */}
          <div className="mb-6">
            <label className="flex items-center justify-center w-full p-8 border-2 border-dashed border-slate-300 rounded-xl cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all">
              <div className="text-center">
                <Upload className="mx-auto mb-2 text-slate-400" size={32} />
                <span className="text-sm text-slate-600 font-medium">
                  {file ? file.name : 'Click to upload PDF, DOCX, MD, or TXT'}
                </span>
                <p className="text-xs text-slate-400 mt-2">
                  Supported: .pdf, .docx, .doc, .md, .txt
                </p>
              </div>
              <input
                type="file"
                accept=".pdf,.docx,.doc,.md,.txt"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
              <p className="font-medium">Error loading document:</p>
              <p className="text-sm mt-1">{error}</p>
            </div>
          )}

          {/* Toolbar */}
          {content && !loading && (
            <div className="flex flex-wrap gap-3">
              {/* Font Size */}
              <div className="flex items-center gap-2 bg-slate-100 rounded-lg px-3 py-2">
                <Type size={18} />
                <input
                  type="number"
                  value={fontSize}
                  onChange={(e) => setFontSize(Number(e.target.value))}
                  className="w-16 px-2 py-1 border rounded"
                  min="8"
                  max="72"
                />
              </div>

              {/* Font Family */}
              <select
                value={fontFamily}
                onChange={(e) => setFontFamily(e.target.value)}
                className="px-3 py-2 bg-slate-100 rounded-lg border-none cursor-pointer"
              >
                {fonts.map((font) => (
                  <option key={font} value={font}>
                    {font}
                  </option>
                ))}
              </select>

              {/* Text Alignment */}
              <div className="flex gap-1 bg-slate-100 rounded-lg p-1">
                <button
                  onClick={() => setTextAlign('left')}
                  className={`p-2 rounded transition-all ${textAlign === 'left' ? 'bg-white shadow' : 'hover:bg-slate-200'}`}
                  title="Align left"
                >
                  <AlignLeft size={18} />
                </button>
                <button
                  onClick={() => setTextAlign('center')}
                  className={`p-2 rounded transition-all ${textAlign === 'center' ? 'bg-white shadow' : 'hover:bg-slate-200'}`}
                  title="Align center"
                >
                  <AlignCenter size={18} />
                </button>
                <button
                  onClick={() => setTextAlign('right')}
                  className={`p-2 rounded transition-all ${textAlign === 'right' ? 'bg-white shadow' : 'hover:bg-slate-200'}`}
                  title="Align right"
                >
                  <AlignRight size={18} />
                </button>
              </div>

              {/* Highlight Colors */}
              <div className="flex gap-2 items-center bg-slate-100 rounded-lg px-3 py-2">
                <Highlighter size={18} />
                {colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setCurrentColor(color)}
                    className={`w-6 h-6 rounded-full border-2 transition-all ${currentColor === color ? 'border-slate-800 scale-110' : 'border-slate-300 hover:scale-105'}`}
                    style={{ backgroundColor: color }}
                    title="Select highlight color"
                  />
                ))}
              </div>

              {/* Read Aloud */}
              <button
                onClick={readAloud}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${isSpeaking ? 'bg-red-500 text-white hover:bg-red-600' : 'bg-slate-100 hover:bg-slate-200'}`}
                title={isSpeaking ? 'Stop reading' : 'Read aloud'}
              >
                {isSpeaking ? <VolumeX size={18} /> : <Volume2 size={18} />}
                <span className="hidden sm:inline">{isSpeaking ? 'Stop' : 'Read'}</span>
              </button>

              {/* Save */}
              <button
                onClick={saveDocument}
                className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all"
                title="Save document"
              >
                <Download size={18} />
                <span className="hidden sm:inline">Save</span>
              </button>
            </div>
          )}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="bg-white rounded-b-2xl shadow-lg p-16 text-center">
            <Loader2 size={64} className="mx-auto mb-4 text-blue-500 animate-spin" />
            <p className="text-lg text-slate-600">Loading document...</p>
            <p className="text-sm text-slate-400 mt-2">This may take a moment for large files</p>
          </div>
        )}

        {/* Content Area */}
        {content && !loading && (
          <div className="bg-white rounded-b-2xl shadow-lg p-8 min-h-[600px]">
            <div
              ref={contentRef}
              onMouseUp={handleTextSelection}
              onTouchEnd={handleTextSelection}
              className="prose max-w-none whitespace-pre-wrap select-text"
              style={{
                fontSize: `${fontSize}px`,
                fontFamily: fontFamily,
                textAlign: textAlign,
                lineHeight: '1.8',
                cursor: 'text',
              }}
              suppressContentEditableWarning={true}
            >
              {content}
            </div>
          </div>
        )}

        {/* Empty State */}
        {!content && !loading && !error && (
          <div className="bg-white rounded-b-2xl shadow-lg p-16 text-center text-slate-400">
            <Upload size={64} className="mx-auto mb-4 opacity-50" />
            <p className="text-lg">Upload a document to get started</p>
            <p className="text-sm mt-2">Supports PDF, DOCX, Markdown, and TXT files</p>
          </div>
        )}

        {/* Selection Popup */}
        {popupPosition.show && (
          <div
            className="fixed z-50 bg-white rounded-lg shadow-xl p-2 flex gap-2 border border-slate-200 animate-fadeIn"
            style={{
              left: `${popupPosition.x}px`,
              top: `${popupPosition.y}px`,
              transform: 'translate(-50%, -100%)',
            }}
          >
            {colors.map((color) => (
              <button
                key={color}
                onClick={() => highlightText(color)}
                className="w-8 h-8 rounded-md border-2 border-slate-200 hover:scale-110 transition-transform"
                style={{ backgroundColor: color }}
                title="Highlight with this color"
              />
            ))}
            <button
              onClick={readAloud}
              className="p-2 hover:bg-slate-100 rounded transition-all"
              title="Read selected text aloud"
            >
              <Volume2 size={18} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DocumentViewer;
