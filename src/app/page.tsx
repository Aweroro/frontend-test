'use client'
import React from 'react'
import { useState, useRef } from 'react'
import PDFUploader from './components/PDFuploader';
import FileViewer from './components/FileViewer';

const Home = () => {
  const [file, setFile] = useState<File | null>(null);
  const pdfRef = useRef<HTMLDivElement | null>(null);

  return (
    <div className='p-4'>
      <PDFUploader onFileSelect={setFile}/>
      <div ref={pdfRef} className='relative'>
        <FileViewer file={file}/>
      </div>
    </div>
  )
}

export default Home;
