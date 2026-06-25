import React from "react";
import Editor from "@monaco-editor/react";
import { Info, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { parseMarkdownToBlocks } from "@/utils/markdownParser";
import { useReadmeStore } from "@/store/readmeStore";
import { toast } from "sonner";

interface MarkdownEditorProps {
  value: string;
  onChange: (val: string) => void;
  onSyncApplied: () => void;
}

export default function MarkdownEditor({ value, onChange, onSyncApplied }: MarkdownEditorProps) {
  const { setBlocks } = useReadmeStore();

  const handleSync = () => {
    try {
      const parsed = parseMarkdownToBlocks(value);
      if (parsed && parsed.length > 0) {
        setBlocks(parsed);
        toast.success("Markdown synced to visual blocks!", {
          description: `Successfully compiled ${parsed.length} blocks to the canvas.`
        });
        onSyncApplied();
      } else {
        toast.error("Failed to parse markdown: no blocks detected.");
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to parse markdown into visual blocks.");
    }
  };

  return (
    <div className="flex-1 bg-[#1e1e1e] flex flex-col h-[calc(100vh-64px)]">
      {/* Editor Warning Banner */}
      <div className="bg-indigo-950/30 border-b border-indigo-500/20 px-6 py-2 flex items-center justify-between gap-4 text-xs text-indigo-300 select-none">
        <div className="flex items-center gap-2">
          <Info className="w-4 h-4 text-indigo-400 shrink-0" />
          <span>
            <strong>Direct Edit Mode:</strong> Edit raw markdown here. Click <strong>Sync to Canvas</strong> to save changes back to visual blocks.
          </span>
        </div>
        <Button 
          size="sm" 
          onClick={handleSync}
          className="bg-indigo-600 hover:bg-indigo-500 text-white flex items-center gap-1.5 h-7 px-3 text-xs shrink-0"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          Sync to Canvas
        </Button>
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
