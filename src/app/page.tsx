"use client";

import React, { useState, useEffect } from "react";
import { useReadmeStore } from "@/store/readmeStore";
import { generateReadmeMarkdown } from "@/utils/markdownGenerators";
import Navbar from "@/components/Navbar";
import LeftSidebar from "@/components/LeftSidebar";
import Canvas from "@/components/Canvas";
import RightSidebar from "@/components/RightSidebar";
import MarkdownEditor from "@/components/MarkdownEditor";
import GitHubPreview from "@/components/GitHubPreview";
import TemplateLibrary from "@/components/TemplateLibrary";

export default function Home() {
  const { blocks, undo, redo, canUndo, canRedo, initFromStorage } = useReadmeStore();
  const [viewMode, setViewMode] = useState<"design" | "markdown" | "adaptive">("design");
  const [customMarkdown, setCustomMarkdown] = useState<string | null>(null);
  const [isTemplateOpen, setIsTemplateOpen] = useState(false);

  // 1. Initialize blocks from localStorage on mount (client-side only)
  useEffect(() => {
    initFromStorage();
  }, [initFromStorage]);

  // Compute active markdown on the fly during render to avoid cascading renders
  const markdownText = customMarkdown !== null ? customMarkdown : generateReadmeMarkdown(blocks);

  // 2. Setup Keyboard Shortcuts (Ctrl+Z for Undo, Ctrl+Shift+Z / Ctrl+Y for Redo)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isCtrl = e.ctrlKey || e.metaKey;
      
      if (isCtrl) {
        if (e.key.toLowerCase() === "z") {
          e.preventDefault();
          if (e.shiftKey) {
            if (canRedo()) redo();
          } else {
            if (canUndo()) undo();
          }
        } else if (e.key.toLowerCase() === "y") {
          e.preventDefault();
          if (canRedo()) redo();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [undo, redo, canUndo, canRedo]);

  const handleSetViewMode = (mode: "design" | "markdown" | "adaptive") => {
    if (mode === "design") {
      setCustomMarkdown(null); // Reset custom edits so visual editor takes back control
    }
    setViewMode(mode);
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-background text-foreground">
      {/* Navigation Header */}
      <Navbar 
        viewMode={viewMode} 
        setViewMode={handleSetViewMode} 
        openTemplateLibrary={() => setIsTemplateOpen(true)}
        markdown={markdownText}
      />

      {/* Main Workspace Workspace */}
      <main className="flex-1 flex overflow-hidden">
        {viewMode === "design" && (
          <>
            {/* Left sidebar: palette & layers */}
            <LeftSidebar />

            {/* Center Canvas */}
            <Canvas />

            {/* Right sidebar: settings */}
            <RightSidebar />
          </>
        )}

        {viewMode === "markdown" && (
          <MarkdownEditor 
            value={markdownText} 
            onChange={setCustomMarkdown} 
          />
        )}

        {viewMode === "adaptive" && (
          <GitHubPreview 
            markdown={markdownText} 
          />
        )}
      </main>

      {/* Modals & Dialogs */}
      <TemplateLibrary 
        isOpen={isTemplateOpen} 
        onClose={() => setIsTemplateOpen(false)} 
      />
    </div>
  );
}
