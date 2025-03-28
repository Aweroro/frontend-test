import { useCallback } from "react";
import {useDropzone} from "react-dropzone"

interface PDFUploaderprops {
    onFileSelect: (file: File) => void;
}

const PDFUploader = ({onFileSelect}: PDFUploaderprops) => {
    const onDrop = useCallback((acceptedFiles: File[]) => {
        if (acceptedFiles.length > 0){
            onFileSelect(acceptedFiles[0]);
        }
    }, [onFileSelect])

    const {getRootProps, getInputProps} = useDropzone({
        accept: {"application/pdf": [".pdf"]},
        onDrop,
    });

    return (
        <div
        {...getRootProps()}
        className="border-2 border-dashed border-gray-300 p-6 text-center cursor-pointer rounded-lg"
        >
            <input {...getInputProps()}/>
            <p className="text-gray-500">Drag and drop a pdf file here to click to select</p>
        </div>
    )
}

export default PDFUploader;