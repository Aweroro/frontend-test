'use client'
import React from 'react'
import { useState, useRef } from 'react'
import PDFUploader from './components/PDFuploader'

const Home = () => {
  const [file, setFile] = useState<File | null>(null);


  return (
    <div>
      <PDFUploader onFileSelect={setFile}/>
    </div>
  )
}

export default Home;
