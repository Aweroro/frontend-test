import * as fabric from "fabric";
import { useEffect, useRef, useState } from "react";

interface AnnotationCanvasProps {
  pdfRef: React.RefObject<HTMLDivElement | null>;
  selectedTool: string | null;
  selectedColor: string;
}

const AnnotationCanvas = ({ pdfRef, selectedTool, selectedColor }: AnnotationCanvasProps) => {
  const canvasRef = useRef<fabric.Canvas | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [canvasReady, setCanvasReady] = useState(false);
  const isDrawing = useRef(false);
  const startPosition = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const canvas = new fabric.Canvas("annotation-canvas", {
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
    canvas.off("mouse:move");
    canvas.off("mouse:up");

    if (selectedTool === "highlight") {
      canvas.on("mouse:down", (event) => {
        isDrawing.current = true;
        const pointer = canvas.getPointer(event.e);
        startPosition.current = { x: pointer.x, y: pointer.y };
      });

      canvas.on("mouse:up", (event) => {
        if (!isDrawing.current || !startPosition.current) return;

        const pointer = canvas.getPointer(event.e);
        const rect = new fabric.Rect({
          left: startPosition.current.x,
          top: startPosition.current.y,
          width: pointer.x - startPosition.current.x,
          height: 20, 
          fill: selectedColor + "80", 
          selectable: false,
        });

        canvas.add(rect);
        canvas.renderAll();
        isDrawing.current = false;
        startPosition.current = null;
      });

    } else if (selectedTool === "underline") {
      canvas.on("mouse:down", (event) => {
        const pointer = canvas.getPointer(event.e);
        const line = new fabric.Line(
          [pointer.x, pointer.y, pointer.x + 100, pointer.y], // Fixed 100px underline
          {
            stroke: selectedColor,
            strokeWidth: 2,
            selectable: false,
          }
        );

        canvas.add(line);
        canvas.renderAll();
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

