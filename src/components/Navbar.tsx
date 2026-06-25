import React from "react";
import { useReadmeStore } from "@/store/readmeStore";
import { generateReadmeMarkdown } from "@/utils/markdownGenerators";
import { toast } from "sonner";
import { 
  Copy, 
  Download, 
  RotateCcw, 
  Undo2, 
  Redo2, 
  Sparkles,
  FileCode, 
  Eye, 
  LayoutTemplate
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface NavbarProps {
  viewMode: "design" | "markdown" | "adaptive";
  setViewMode: (mode: "design" | "markdown" | "adaptive") => void;
  openTemplateLibrary: () => void;
  markdown: string;
}

export default function Navbar({ viewMode, setViewMode, openTemplateLibrary, markdown }: NavbarProps) {
  const { 
    blocks, 
    resetStore, 
    undo, 
    redo, 
    canUndo, 
    canRedo 
  } = useReadmeStore();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(markdown);
      toast.success("Markdown copied to clipboard!", {
        description: "You can now paste it directly into your GitHub README.md",
      });
    } catch (err) {
      toast.error("Failed to copy markdown.");
    }
  };

  const handleDownload = () => {
    const blob = new Blob([markdown], { type: "text/markdown;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "README.md");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    toast.success("README.md downloaded successfully!");
  };

  const handleReset = () => {
    if (window.confirm("Are you sure you want to reset? This will revert to the default starter blocks.")) {
      resetStore();
      toast.success("Workspace reset to starter template.");
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-panel text-foreground flex items-center justify-between px-6 py-3 h-16 select-none">
      {/* Left side: Logo & Count */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-white text-black font-extrabold flex items-center justify-center">
            <Sparkles className="w-5 h-5 fill-black stroke-black" />
          </div>
          <span className="text-lg font-semibold tracking-tight">README Studio</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] font-medium tracking-wider uppercase bg-white/10 text-white/90 px-2 py-0.5 rounded-full border border-white/5">
            Beta
          </span>
          <span className="text-xs bg-muted text-muted-foreground border border-border px-2 py-0.5 rounded-md">
            {blocks.length} {blocks.length === 1 ? "block" : "blocks"}
          </span>
        </div>
      </div>

      {/* Center: Tabs */}
      <div className="flex items-center bg-background border border-border p-1 rounded-lg">
        <button
          onClick={() => setViewMode("design")}
          className={`flex items-center gap-2 text-xs font-medium px-3 py-1.5 rounded-md transition-all ${
            viewMode === "design"
              ? "bg-accent text-accent-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <LayoutTemplate className="w-3.5 h-3.5" />
          Design
        </button>
        <button
          onClick={() => setViewMode("markdown")}
          className={`flex items-center gap-2 text-xs font-medium px-3 py-1.5 rounded-md transition-all ${
            viewMode === "markdown"
              ? "bg-accent text-accent-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <FileCode className="w-3.5 h-3.5" />
          Markdown
        </button>
        <button
          onClick={() => setViewMode("adaptive")}
          className={`flex items-center gap-2 text-xs font-medium px-3 py-1.5 rounded-md transition-all ${
            viewMode === "adaptive"
              ? "bg-accent text-accent-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Eye className="w-3.5 h-3.5" />
          Adaptive
        </button>
      </div>

      {/* Right side: Actions */}
      <div className="flex items-center gap-2">
        {/* Undo/Redo */}
        <div className="flex items-center border-r border-border pr-2 mr-2 gap-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={undo}
            disabled={!canUndo()}
            className="w-8 h-8 text-muted-foreground hover:text-foreground"
            title="Undo (Ctrl+Z)"
          >
            <Undo2 className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={redo}
            disabled={!canRedo()}
            className="w-8 h-8 text-muted-foreground hover:text-foreground"
            title="Redo (Ctrl+Shift+Z)"
          >
            <Redo2 className="w-4 h-4" />
          </Button>
        </div>

        {/* Templates */}
        <Button
          variant="outline"
          size="sm"
          onClick={openTemplateLibrary}
          className="flex items-center gap-1.5 border-border hover:bg-accent text-xs h-9"
        >
          <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
          Templates
        </Button>

        {/* Action triggers */}
        <Button
          variant="outline"
          size="sm"
          onClick={handleCopy}
          className="flex items-center gap-1.5 border-border hover:bg-accent text-xs h-9"
        >
          <Copy className="w-3.5 h-3.5" />
          Copy
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={handleDownload}
          className="flex items-center gap-1.5 border-border hover:bg-accent text-xs h-9"
        >
          <Download className="w-3.5 h-3.5" />
          Download
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={handleReset}
          className="flex items-center gap-1.5 text-red-400 hover:text-red-300 hover:bg-red-950/20 text-xs h-9"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Reset
        </Button>
      </div>
    </header>
  );
}
