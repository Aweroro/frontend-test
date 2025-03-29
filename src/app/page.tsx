'use client'
import React, { useState, useRef, useCallback } from 'react';
import PDFUploader from './components/PDFuploader';
import FileViewer from './components/FileViewer';
import AnnotationCanvas from './components/AnnotationCanvas';
import AnnotationTools from './components/AnnotationTools';

const Home = () => {
  const [file, setFile] = useState<File | null>(null);
  const pdfRef = useRef<HTMLDivElement | null>(null);
  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  const [selectedColors, setSelectedColors] = useState({ highlight: '#FFD700', underline: '#FF0000' });
  const [clearAnnotationsFn, setClearAnnotationsFn] = useState<(() => void) | null>(null);

  const handleSelectColor = (tool: string, color: string) => {
    setSelectedColors((prevColors) => ({
      ...prevColors,
      [tool]: color,
    }));
  };

  const handleSetClearAnnotations = useCallback((clearFn: () => void) => {
    setClearAnnotationsFn(() => clearFn);
  }, []);

  const handleClearAnnotations = useCallback(() => {
    if (clearAnnotationsFn) {
      clearAnnotationsFn();
    }
  }, [clearAnnotationsFn]);

  return (
    <div className="p-4">
      <PDFUploader onFileSelect={setFile} />

      <AnnotationTools 
        onSelectTool={setSelectedTool} 
        onSelectColor={handleSelectColor} 
        onClearAnnotations={handleClearAnnotations} 
      />

      <div ref={pdfRef} className='relative'>
        <FileViewer file={file} />
        {file && (
          <AnnotationCanvas 
            pdfRef={pdfRef} 
            selectedTool={selectedTool} 
            selectedColors={selectedColors}
            onClearAnnotations={handleSetClearAnnotations} 
          />
        )}
      </div>
    </div>
  );
};

export default Home;