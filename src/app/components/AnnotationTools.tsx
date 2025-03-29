import { useState } from "react";

interface AnnotationToolsProps {
  onSelectTool: (tool: string | null) => void;
  onSelectColor: (color: string) => void;
}

const AnnotationTools = ({ onSelectTool, onSelectColor }: AnnotationToolsProps) => {
  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState("#FFD700");

  const handleToolSelect = (tool: string) => {
    const newTool = selectedTool === tool ? null : tool;
    setSelectedTool(newTool);
    onSelectTool(newTool);
  };

  const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const color = event.target.value;
    setSelectedColor(color);
    onSelectColor(color);
  };

  return (
    <div className="bg-black shadow-lg rounded-lg p-4 flex flex-col space-y-2">
      <button
        className={`p-2 rounded ${selectedTool === "highlight" ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-700"}`}
        onClick={() => handleToolSelect("highlight")}
      >
        🟡 Highlight
      </button>

      <button
        className={`p-2 rounded ${selectedTool === "underline" ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-700"}`}
        onClick={() => handleToolSelect("underline")}
      >
        🔴 Underline
      </button>

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

      {(selectedTool === "highlight" || selectedTool === "underline") && (
        <div className="flex items-center space-x-2 mt-2">
          <label>Color:</label>
          <input
            type="color"
            value={selectedColor}
            onChange={handleColorChange}
            className="w-8 h-8 border rounded-full cursor-pointer"
          />
        </div>
      )}
    </div>
  );
};

export default AnnotationTools;
