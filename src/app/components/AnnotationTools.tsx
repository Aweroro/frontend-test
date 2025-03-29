import { useState } from "react";

interface AnnotationToolsProps {
  onSelectTool: (tool: string | null) => void;
}

const AnnotationTools = ({ onSelectTool }: AnnotationToolsProps) => {
  const [selectedTool, setSelectedTool] = useState<string | null>(null);

  const handleToolSelect = (tool: string) => {
    const newTool = selectedTool === tool ? null : tool;
    setSelectedTool(newTool);
    onSelectTool(newTool);
  };

  return (
    <div className="bg-black shadow-lg rounded-lg p-4 flex flex-col space-y-2">
      <button
        className={`p-2 rounded ${selectedTool === "highlight" ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-700"}`}
        onClick={() => handleToolSelect("highlight")}
      >
         Highlight
      </button>

      <button
        className={`p-2 rounded ${selectedTool === "underline" ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-700"}`}
        onClick={() => handleToolSelect("underline")}
      >
         Underline
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
    </div>
  );
};

export default AnnotationTools;

