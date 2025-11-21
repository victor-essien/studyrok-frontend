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

  const readPDF = async (file: File): Promise<string> => {
    console.log('inside readPDF');
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();

      reader.onerror = () => reject(new Error('Failed to read PDF file'));

      reader.onload = async (e: ProgressEvent<FileReader>) => {
        try {
          // Check if PDF.js is loaded
          if (!(window as any)['pdfjs-dist/build/pdf']) {
            reject(new Error('PDF.js library not loaded. Please refresh the page.'));
            return;
          }

          const pdfjsLib = (window as any)['pdfjs-dist/build/pdf'];
          pdfjsLib.GlobalWorkerOptions.workerSrc =
            'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

          const arrayBuffer = e.target?.result;
          if (!arrayBuffer || !(arrayBuffer instanceof ArrayBuffer)) {
            reject(new Error('Invalid PDF data'));
            return;
          }
          const typedarray = new Uint8Array(arrayBuffer);
          const loadingTask = pdfjsLib.getDocument(typedarray);
          const pdf = await loadingTask.promise;

          let fullText = '';

          for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const textContent = await page.getTextContent();
            const pageText = textContent.items.map((item: any) => item.str).join(' ');
            fullText += `--- Page ${i} ---\n${pageText}\n\n`;
          }

          resolve(fullText);
        } catch (err) {
          console.error('PDF parsing error:', err);
          reject(
            new Error('Could not parse PDF. The file may be corrupted or password-protected.')
          );
        }
      };
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

      {/* Load PDF.js */}
      <script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js"></script>
    </div>
  );
};

export default DocumentViewer;
