import { useState } from "react";

interface AnnotationToolsProps {
  onSelectTool: (tool: string | null) => void;
  onSelectColor: (tool: string, color: string) => void;
  onClearAnnotations: () => void; 
}

const AnnotationTools = ({ onSelectTool, onSelectColor, onClearAnnotations }: AnnotationToolsProps) => {
  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  const [highlightColor, setHighlightColor] = useState<string>("#FFD700");
  const [underlineColor, setUnderlineColor] = useState<string>("#FF0000");

  const handleToolSelect = (tool: string) => {
    const newTool = selectedTool === tool ? null : tool;
    setSelectedTool(newTool);
    onSelectTool(newTool);
  };

  const handleColorChange = (tool: string, color: string) => {
    if (tool === "highlight") {
      setHighlightColor(color);
    } else if (tool === "underline") {
      setUnderlineColor(color);
    }
    onSelectColor(tool, color);
  };

  return (
    <div className="bg-black shadow-lg rounded-lg p-4 flex flex-row justify-evenly space-y-2">
      <div className="flex flex-col">
        <button
          className={`p-2 rounded ${selectedTool === "highlight" ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-700"}`}
          onClick={() => handleToolSelect("highlight")}
        >
          Highlight
        </button>
        {selectedTool === "highlight" && (
          <div className="flex items-center">
            <p>Color:</p>
            <input
              type="color"
              value={highlightColor}
              onChange={(e) => handleColorChange("highlight", e.target.value)}
              className="mt-2 cursor-pointer"
            />
          </div>
        )}
      </div>

      <div className="flex flex-col">
        <button
          className={`p-2 rounded ${selectedTool === "underline" ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-700"}`}
          onClick={() => handleToolSelect("underline")}
        >
          Underline
        </button>
        {selectedTool === "underline" && (
          <div className="flex items-center">
            <p>Color:</p>
            <input
              type="color"
              value={underlineColor}
              onChange={(e) => handleColorChange("underline", e.target.value)}
              className="mt-2 cursor-pointer"
            />
          </div>
        )}
      </div>

      <button
        className={`p-2 rounded ${selectedTool === "comment" ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-700"}`}
        onClick={() => handleToolSelect("comment")}
      >
        💬 Comment
      </button>

      <button
        className={`p-2 rounded ${selectedTool === "signature" ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-700"}`}
        onClick={() => handleToolSelect("signature")}
      >
        ✍️ Sign
      </button>

      <button
        className="p-2 rounded bg-red-500 text-white"
        onClick={onClearAnnotations}
      >
        🗑 Clear
      </button>
    </div>
  );
};

export default AnnotationTools;


