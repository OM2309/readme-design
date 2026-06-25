import React, { useState } from "react";
import { useReadmeStore } from "@/store/readmeStore";
import { analyzeBlocks } from "@/utils/lintAnalyzer";
import { 
  Copy, 
  Download, 
  RotateCcw, 
  Undo2, 
  Redo2, 
  Sparkles,
  FileCode, 
  Eye, 
  LayoutTemplate,
  FolderOpen,
  Globe,
  ImageIcon,
  FileText,
  ChevronDown,
  Share2
} from "lucide-react";
import GithubIcon from "@/components/GithubIcon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "sonner";

interface NavbarProps {
  viewMode: "design" | "markdown" | "adaptive";
  setViewMode: (mode: "design" | "markdown" | "adaptive") => void;
  openTemplateLibrary: () => void;
  openProjectsModal: () => void;
  openImportModal: () => void;
  openPublishModal: () => void;
  openExportModal: () => void;
  markdown: string;
}

export default function Navbar({ 
  viewMode, 
  setViewMode, 
  openTemplateLibrary,
  openProjectsModal,
  openImportModal,
  openPublishModal,
  openExportModal,
  markdown 
}: NavbarProps) {
  const { 
    blocks, 
    projectName,
    setProjectName,
    resetStore, 
    undo, 
    redo, 
    canUndo, 
    canRedo,
    activeProjectId
  } = useReadmeStore();

  const [isEditingName, setIsEditingName] = useState(false);
  const [tempName, setTempName] = useState(projectName);
  const [downloadOpen, setDownloadOpen] = useState(false);

  const warnings = analyzeBlocks(blocks);
  const warningsCount = warnings.length;

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

  const handleDownloadMarkdown = () => {
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
    setDownloadOpen(false);
  };

  const handleReset = () => {
    if (window.confirm("Are you sure you want to reset? This will revert to the default starter blocks.")) {
      resetStore();
      toast.success("Workspace reset to starter template.");
    }
  };

  const handleShare = async () => {
    if (!activeProjectId) {
      toast.info("Please save your project to the cloud first to generate a shareable link.", {
        description: "Save it using the 'Projects' button, then click Share.",
        action: {
          label: "Open Projects",
          onClick: openProjectsModal
        }
      });
      return;
    }
    
    try {
      const shareUrl = `${window.location.origin}/view/${activeProjectId}`;
      await navigator.clipboard.writeText(shareUrl);
      toast.success("Shareable preview link copied to clipboard!", {
        description: "Anyone can view this preview without logging in."
      });
    } catch (err) {
      toast.error("Failed to copy share link.");
    }
  };

  const saveProjectName = () => {
    setIsEditingName(false);
    if (tempName.trim()) {
      setProjectName(tempName.trim());
      toast.success("Project renamed to: " + tempName.trim());
    } else {
      setTempName(projectName);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-panel text-foreground flex items-center justify-between px-4 py-3 h-16 select-none">
      {/* Left side: Project name edit & Count */}
      <div className="flex items-center gap-3 min-w-0">
        <div className="flex items-center gap-2 shrink-0">
          <div className="p-1 rounded bg-white text-black font-extrabold flex items-center justify-center">
            <Sparkles className="w-4 h-4 fill-black stroke-black" />
          </div>
        </div>

        {/* Project Rename trigger (Requirement 5) */}
        <div className="flex items-center gap-2 min-w-0">
          {isEditingName ? (
            <Input
              value={tempName}
              onChange={(e) => setTempName(e.target.value)}
              onBlur={saveProjectName}
              onKeyDown={(e) => e.key === "Enter" && saveProjectName()}
              className="h-7 text-xs bg-neutral-900 border-neutral-800 py-0.5 px-2 max-w-[150px]"
              autoFocus
            />
          ) : (
            <span 
              onClick={() => {
                setTempName(projectName);
                setIsEditingName(true);
              }}
              className="text-xs font-bold truncate tracking-tight text-neutral-200 hover:text-white cursor-pointer border-b border-dashed border-neutral-600 hover:border-white select-none max-w-[160px] pb-0.5"
              title="Click to rename project"
            >
              {projectName}
            </span>
          )}
          
          <span className="text-[9px] font-medium uppercase tracking-wider bg-white/10 text-white/90 px-1.5 py-0.5 rounded-full border border-white/5 shrink-0">
            Beta
          </span>
        </div>
      </div>

      {/* Center: Tabs with lint count warning badge (Requirement 10) */}
      <div className="flex items-center bg-background border border-border p-0.5 rounded-lg shrink-0">
        <button
          onClick={() => setViewMode("design")}
          className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-md transition-all ${
            viewMode === "design"
              ? "bg-accent text-accent-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <LayoutTemplate className="w-3.5 h-3.5" />
          <span>Design</span>
          {warningsCount > 0 && (
            <span className="text-[9px] bg-amber-500/20 text-amber-300 font-bold px-1.5 py-0.25 rounded-full border border-amber-500/30 animate-pulse">
              {warningsCount}
            </span>
          )}
        </button>
        <button
          onClick={() => setViewMode("markdown")}
          className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-md transition-all ${
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
          className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-md transition-all ${
            viewMode === "adaptive"
              ? "bg-accent text-accent-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Eye className="w-3.5 h-3.5" />
          Adaptive
        </button>
      </div>

      {/* Right side: Advanced Action triggers */}
      <div className="flex items-center gap-2 shrink-0">
        {/* Undo/Redo */}
        <div className="flex items-center border-r border-border pr-2 gap-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={undo}
            disabled={!canUndo()}
            className="w-7 h-7 text-neutral-400 hover:text-white disabled:opacity-40"
            title="Undo (Ctrl+Z)"
          >
            <Undo2 className="w-3.5 h-3.5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={redo}
            disabled={!canRedo()}
            className="w-7 h-7 text-neutral-400 hover:text-white disabled:opacity-40"
            title="Redo (Ctrl+Shift+Z)"
          >
            <Redo2 className="w-3.5 h-3.5" />
          </Button>
        </div>

        {/* My Projects */}
        <Button
          variant="outline"
          size="sm"
          onClick={openProjectsModal}
          className="flex items-center gap-1 border-border hover:bg-accent text-xs h-8 px-2.5"
          title="Browse Saved Cloud Projects"
        >
          <FolderOpen className="w-3.5 h-3.5 text-indigo-400" />
          Projects
        </Button>

        {/* Templates */}
        <Button
          variant="outline"
          size="sm"
          onClick={openTemplateLibrary}
          className="flex items-center gap-1 border-border hover:bg-accent text-xs h-8 px-2.5"
        >
          <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
          Templates
        </Button>

        {/* Import AI */}
        <Button
          variant="outline"
          size="sm"
          onClick={openImportModal}
          className="flex items-center gap-1 border-border hover:bg-accent text-xs h-8 px-2.5"
          title="AI Import from Repo URL"
        >
          <Sparkles className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />
          AI Import
        </Button>

        {/* Publish */}
        <Button
          variant="outline"
          size="sm"
          onClick={openPublishModal}
          className="flex items-center gap-1 border-border hover:bg-accent text-xs h-8 px-2.5"
          title="Publish README to GitHub"
        >
          <GithubIcon className="w-3.5 h-3.5 text-indigo-400" />
          Publish
        </Button>

        {/* Share */}
        <Button
          variant="outline"
          size="sm"
          onClick={handleShare}
          className="flex items-center gap-1 border-border hover:bg-accent text-xs h-8 px-2.5"
          title="Get a shareable public preview link"
        >
          <Share2 className="w-3.5 h-3.5 text-indigo-400" />
          Share
        </Button>

        {/* Copy */}
        <Button
          variant="outline"
          size="sm"
          onClick={handleCopy}
          className="flex items-center gap-1 border-border hover:bg-accent text-xs h-8 px-2.5"
        >
          <Copy className="w-3.5 h-3.5" />
          Copy
        </Button>

        {/* Download & Export Image Dropdown Menu (Requirement 6) */}
        <Popover open={downloadOpen} onOpenChange={setDownloadOpen}>
          <PopoverTrigger className="inline-flex items-center justify-center gap-1 rounded-md border border-border bg-transparent hover:bg-accent text-xs h-8 px-2.5 font-medium cursor-pointer text-foreground shadow-xs transition-colors">
            <Download className="w-3.5 h-3.5" />
            Download
            <ChevronDown className="w-3 h-3 text-neutral-500" />
          </PopoverTrigger>
          <PopoverContent className="w-48 bg-panel border-neutral-800 p-1 text-xs select-none">
            <button
              onClick={handleDownloadMarkdown}
              className="w-full text-left px-3 py-2 rounded-lg text-neutral-350 hover:bg-neutral-800 hover:text-white flex items-center gap-2 cursor-pointer font-medium"
            >
              <FileText className="w-3.5 h-3.5 text-neutral-500" />
              Download README.md
            </button>
            <button
              onClick={() => {
                setDownloadOpen(false);
                openExportModal();
              }}
              className="w-full text-left px-3 py-2 rounded-lg text-neutral-350 hover:bg-neutral-800 hover:text-white flex items-center gap-2 cursor-pointer font-medium"
            >
              <ImageIcon className="w-3.5 h-3.5 text-indigo-400" />
              Export as PNG Image
            </button>
          </PopoverContent>
        </Popover>

        {/* Reset */}
        <Button
          variant="ghost"
          size="sm"
          onClick={handleReset}
          className="flex items-center gap-1 text-red-400 hover:text-red-300 hover:bg-red-950/20 text-xs h-8 px-2"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Reset
        </Button>
      </div>
    </header>
  );
}
