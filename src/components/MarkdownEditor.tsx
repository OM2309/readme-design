import React from "react";
import Editor from "@monaco-editor/react";
import { Info } from "lucide-react";

interface MarkdownEditorProps {
  value: string;
  onChange: (val: string) => void;
}

export default function MarkdownEditor({ value, onChange }: MarkdownEditorProps) {
  return (
    <div className="flex-1 bg-[#1e1e1e] flex flex-col h-[calc(100vh-64px)]">
      {/* Editor Warning Banner */}
      <div className="bg-indigo-950/30 border-b border-indigo-500/20 px-6 py-2 flex items-center gap-2 text-xs text-indigo-300">
        <Info className="w-4 h-4 text-indigo-400 shrink-0" />
        <span>
          <strong>Direct Edit Mode:</strong> You can edit this markdown directly for quick tweaks. Note: changes here will not sync back to visual blocks and will be overwritten if you modify visual blocks in Design mode.
        </span>
      </div>

      {/* Monaco Editor Wrapper */}
      <div className="flex-1 min-h-0 relative">
        <Editor
          height="100%"
          defaultLanguage="markdown"
          theme="vs-dark"
          value={value}
          onChange={(val) => onChange(val || "")}
          options={{
            minimap: { enabled: false },
            fontSize: 13,
            lineHeight: 20,
            fontFamily: "var(--font-geist-mono), ui-monospace, monospace",
            wordWrap: "on",
            automaticLayout: true,
            padding: { top: 16, bottom: 16 },
            cursorBlinking: "smooth",
            cursorSmoothCaretAnimation: "on",
            scrollbar: {
              vertical: "visible",
              horizontal: "visible",
              verticalScrollbarSize: 8,
              horizontalScrollbarSize: 8,
            },
          }}
        />
      </div>
    </div>
  );
}
