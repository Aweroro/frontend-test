'use client'
import React from 'react';
import { useState } from "react";
import { pdfjs, Document, Page } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";

// pdfjs.GlobalWorkerOptions.workerSrc = new URL(
//     "pdfjs-dist/build/pdf.worker.min.mjs",
//     import.meta.url
//   ).toString();


pdfjs.GlobalWorkerOptions.workerSrc = `/pdf.worker.min.mjs`;

//pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;


interface FileViwerProps {
    file: File | null;
}

const FileViewer = ({file}: FileViwerProps) => {
    const [numPages, setNumPages] = useState<number | null>(null);

    const handleDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
      setNumPages(numPages);
      console.log("PDF Loaded:", numPages, "pages");
  };

  return (
    <div className='overflow-auto border rounded-lg w-full h-[80vh]'
    >
      {file ? (
        <Document
        file={URL.createObjectURL(file)}
        onLoadSuccess={({numPages}) => setNumPages(numPages)}
        >
           {numPages !== null &&
              Array.from({ length: numPages }).map((_, index) => (
                  <Page key={index} pageNumber={index + 1} renderTextLayer={false} />
              ))
            }
        </Document>
      ) : (
        <p className='text-center text-gray-500'>No PDF uploaded</p>
      )}
    </div>
  );
};

export default FileViewer;


