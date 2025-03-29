import * as fabric from "fabric";
import { useEffect, useRef, useState } from "react";

interface AnnotationCanvasProps {
  pdfRef: React.RefObject<HTMLDivElement | null>;
  selectedTool: string | null;
  selectedColor: string;
}

const AnnotationCanvas = ({ selectedTool, selectedColor }: AnnotationCanvasProps) => {
  const canvasRef = useRef<fabric.Canvas | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [canvasReady, setCanvasReady] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    const canvas = new fabric.Canvas("annotation-canvas", {
      isDrawingMode: false,
      selection: false,
    });
    canvasRef.current = canvas;
    setCanvasReady(true);

    const resizeCanvas = () => {
      if (containerRef.current) {
        canvas.setWidth(containerRef.current.clientWidth);
        canvas.setHeight(containerRef.current.clientHeight);
        canvas.renderAll();
      }
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    return () => {
      canvas.dispose();
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  useEffect(() => {
    if (!canvasReady || !canvasRef.current) return;
    const canvas = canvasRef.current;

    canvas.isDrawingMode = false;
    canvas.selection = false;
    canvas.off("mouse:down"); 

    if (selectedTool === "highlight") {
      canvas.isDrawingMode = true;
      canvas.freeDrawingBrush = new fabric.PencilBrush(canvas);
      canvas.freeDrawingBrush.color = selectedColor;
      canvas.freeDrawingBrush.width = 10;
    } else if (selectedTool === "underline") {
      canvas.on("mouse:down", (event) => {
        const pointer = canvas.getPointer(event.e);
        const line = new fabric.Line([pointer.x, pointer.y, pointer.x + 100, pointer.y], {
          stroke: selectedColor,
          strokeWidth: 3,
          selectable: true,
        });
        canvas.add(line);
      });
    } else if (selectedTool === "signature") {
      canvas.isDrawingMode = true;
      canvas.freeDrawingBrush = new fabric.PencilBrush(canvas);
      canvas.freeDrawingBrush.color = "black";
      canvas.freeDrawingBrush.width = 2;
    } else if (selectedTool === "comment") {
        canvas.on("mouse:down", (event) => {
          const pointer = canvas.getPointer(event.e);
      
          const comment = new fabric.Textbox("", {
            left: pointer.x,
            top: pointer.y,
            width: 120,
            fontSize: 14,
            backgroundColor: "#ffffff",
            borderColor: "#000000",
            editable: true,
          });
      
          canvas.add(comment);
          canvas.renderAll();
        });
      }
      
    
    canvas.renderAll();
  }, [selectedTool, selectedColor, canvasReady]);

  return (
    <div ref={containerRef} className="absolute top-0 left-0 w-full h-full">
      <canvas id="annotation-canvas" className="w-full h-full"></canvas>
    </div>
  );
};

export default AnnotationCanvas;

