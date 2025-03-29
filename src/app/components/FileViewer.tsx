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


// 'use client'
// import React, { useState, useEffect } from "react";
// import { pdfjs, Document, Page } from "react-pdf";
// import * as fabric from 'fabric';
// import "react-pdf/dist/esm/Page/AnnotationLayer.css";
// import "react-pdf/dist/esm/Page/TextLayer.css";
// import workerSrc from "pdfjs-dist/build/pdf.worker.min.mjs";

// //pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

// // pdfjs.GlobalWorkerOptions.workerSrc = `/pdf.worker.min.mjs`;

// pdfjs.GlobalWorkerOptions.workerSrc = workerSrc || new URL("/pdf.worker.min.mjs", window.location.origin).toString();
// console.log("Worker Source:", pdfjs.GlobalWorkerOptions.workerSrc);

// interface FileViewerProps {
//     file: File | null;
// }

// const FileViewer = ({ file }: FileViewerProps) => {
//     const [numPages, setNumPages] = useState<number | null>(null);
//     const [pdfjs, setPdfjs] = useState<any>(null);

//     useEffect(() => {
//       const loadPdfJs = async () => {
//           const pdfjsLib = await import("pdfjs-dist/build/pdf");
//           pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
//               "pdfjs-dist/build/pdf.worker.min.mjs",
//               import.meta.url
//           ).toString();
//           setPdfjs(pdfjsLib);
//       };

//       loadPdfJs();
//   }, []);
  
//     const handleDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
//         setNumPages(numPages);
//         console.log("PDF Loaded:", numPages, "pages");
//     };

//     console.log(pdfjs.GlobalWorkerOptions.workerSrc);


//     const fileUrl = file ? URL.createObjectURL(file) : null;

//     return (
//         <div className='overflow-auto border rounded-lg w-full h-[80vh]'>
//             {fileUrl ? (
//                 <Document file={fileUrl} onLoadSuccess={handleDocumentLoadSuccess}>
//                      {numPages ? (
//                         Array.from({ length: numPages }).map((_, index) => (
//                             <Page key={index} pageNumber={index + 1} renderTextLayer={false} />
//                         ))
//                     ) : (
//                         <p className="text-center text-gray-500">Loading...</p>
//                     )}
//                 </Document>
//             ) : (
//                 <p className='text-center text-gray-500'>No PDF uploaded</p>
//             )}
//         </div>
//     );
// };

// export default FileViewer;

