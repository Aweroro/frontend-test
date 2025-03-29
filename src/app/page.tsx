'use client'
import React from 'react'
import { useState, useRef } from 'react'
import PDFUploader from './components/PDFuploader';
import FileViewer from './components/FileViewer';
import AnnotationCanvas from './components/AnnotationCanvas';
import AnnotationTools from './components/AnnotationTools';

const Home = () => {
  const [file, setFile] = useState<File | null>(null);
  const pdfRef = useRef<HTMLDivElement | null>(null);
  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string>('#FFD700');

  const clearAnnotations = () => {
    setSelectedTool(null);
  };

  return (
    <div className='p-4'>
      <PDFUploader onFileSelect={setFile}/>

      <AnnotationTools 
      onSelectTool={setSelectedTool} 
      onSelectColor={setSelectedColor} 
      />

      <div ref={pdfRef} className='relative'>
        <FileViewer file={file}/>
        {file && (
        <AnnotationCanvas 
        pdfRef={pdfRef} 
        selectedTool={selectedTool} 
        selectedColor={selectedColor} 
        />)}
      </div>
    </div>
  )
}

export default Home;
