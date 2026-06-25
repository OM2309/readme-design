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

// Advanced feature components
import ProjectsModal from "@/components/ProjectsModal";
import ImportModal from "@/components/ImportModal";
import PublishModal from "@/components/PublishModal";
import ExportModal from "@/components/ExportModal";
import KeyboardShortcutsModal from "@/components/KeyboardShortcutsModal";
import CommandPalette from "@/components/CommandPalette";
import LintPanel from "@/components/LintPanel";

// Utilities & hooks
import { useKeyboardShortcuts } from "@/hooks/useKeyboardShortcuts";
import { supabase, hasSupabase } from "@/lib/supabaseClient";
import { toast } from "sonner";
import { Sparkles } from "lucide-react";

export default function StudioHome() {
  const { 
    blocks, 
    projectName,
    activeProjectId,
    undo, 
    redo, 
    canUndo, 
    canRedo, 
    initFromStorage,
    duplicateSelectedBlocks,
    deleteSelectedBlocks,
    moveSelectedBlocks,
    clearMultiSelect,
    copySelectedBlocks,
    pasteBlocks,
    setBlocks,
    setProjectName,
    loadTemplate
  } = useReadmeStore();

  const [viewMode, setViewMode] = useState<"design" | "markdown" | "adaptive">("design");
  const [customMarkdown, setCustomMarkdown] = useState<string | null>(null);
  
  // Modals & Panels open states
  const [isTemplateOpen, setIsTemplateOpen] = useState(false);
  const [isProjectsOpen, setIsProjectsOpen] = useState(false);
  const [isImportOpen, setIsImportOpen] = useState(false);
  const [isPublishOpen, setIsPublishOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [isShortcutsOpen, setIsShortcutsOpen] = useState(false);
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);
  const [showAiBanner, setShowAiBanner] = useState(false);

  // Initialize blocks from localStorage on mount (client-side only)
  useEffect(() => {
    initFromStorage();
  }, [initFromStorage]);

  // Template Loader Handler
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const templateParam = params.get("template");
    if (!templateParam) return;

    const validTemplates = ["npm-package", "react-component", "cli-tool", "profile-readme", "web3-solana"];
    if (validTemplates.includes(templateParam)) {
      loadTemplate(templateParam as any);
      // Remove template param from URL, keep it at /studio
      const newParams = new URLSearchParams(window.location.search);
      newParams.delete("template");
      const qs = newParams.toString();
      window.history.replaceState({}, "", `/studio${qs ? `?${qs}` : ""}`);
      toast.success(`Loaded starter template!`);
    }
  }, [loadTemplate]);

  // Import URL Handler
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const importUrl = params.get("importUrl");
    if (importUrl) {
      Promise.resolve().then(() => {
        setIsImportOpen(true);
      });
    }
  }, []);

  // Remix Project Handler
  useEffect(() => {
    if (typeof window === "undefined" || !hasSupabase()) return;
    const params = new URLSearchParams(window.location.search);
    const remixId = params.get("remix");
    if (!remixId) return;

    async function fetchAndRemix() {
      const toastId = toast.loading("Remixing project blocks...");
      try {
        const { data, error } = await supabase!
          .from("projects")
          .select("*")
          .eq("id", remixId)
          .single();

        if (data) {
          const parsedBlocks = typeof data.blocks === "string"
            ? JSON.parse(data.blocks)
            : data.blocks;
          
          // Clear activeProjectId to clone it as a new draft
          useReadmeStore.setState({ activeProjectId: null });
          setBlocks(parsedBlocks);
          setProjectName(`${data.name} (Remix)`);

          // Remove remix param from URL
          const newParams = new URLSearchParams(window.location.search);
          newParams.delete("remix");
          const qs = newParams.toString();
          window.history.replaceState({}, "", `/studio${qs ? `?${qs}` : ""}`);
          
          toast.success("README loaded! You are now editing a copy.", { id: toastId });
        } else {
          toast.error("Failed to load project for remixing.", { id: toastId });
        }
      } catch (err) {
        toast.error("An error occurred during remix.", { id: toastId });
      }
    }

    fetchAndRemix();
  }, [setBlocks, setProjectName]);

  // Compute active markdown on the fly during render to avoid cascading renders
  const markdownText = customMarkdown !== null ? customMarkdown : generateReadmeMarkdown(blocks);

  // Debounced Autosave to Supabase cloud projects
  useEffect(() => {
    if (!activeProjectId || !hasSupabase()) return;
    
    const saveTimeout = setTimeout(async () => {
      const { data: { session } } = await supabase!.auth.getSession();
      if (!session) return;
      
      const { error } = await supabase!
        .from("projects")
        .update({
          name: projectName,
          blocks: blocks,
          updated_at: new Date().toISOString()
        })
        .eq("id", activeProjectId);
        
      if (error) {
        console.error("Autosave error:", error);
      }
    }, 2000); // 2 second debounce

    return () => clearTimeout(saveTimeout);
  }, [blocks, projectName, activeProjectId]);

  // Manual save handler for Ctrl+S
  const handleSave = async () => {
    if (!hasSupabase()) {
      toast.error("Cloud database is not configured.");
      return;
    }
    const { data: { session } } = await supabase!.auth.getSession();
    if (!session) {
      toast.info("Please sign in to save projects to the cloud.", {
        action: {
          label: "Sign In",
          onClick: () => setIsProjectsOpen(true)
        }
      });
      setIsProjectsOpen(true);
      return;
    }

    if (activeProjectId) {
      const savePromise = (async () => {
        const { data, error } = await supabase!
          .from("projects")
          .update({
            name: projectName,
            blocks: blocks,
            updated_at: new Date().toISOString()
          })
          .eq("id", activeProjectId);
        if (error) throw error;
        return data;
      })();

      toast.promise(
        savePromise,
        {
          loading: "Saving project...",
          success: "Project saved successfully!",
          error: "Failed to save project."
        }
      );
    } else {
      setIsProjectsOpen(true);
    }
  };

  // Keyboard Shortcuts callback binding
  useKeyboardShortcuts({
    onUndo: () => {
      if (canUndo()) {
        undo();
        toast.success("Undo performed");
      }
    },
    onRedo: () => {
      if (canRedo()) {
        redo();
        toast.success("Redo performed");
      }
    },
    onDuplicate: () => {
      duplicateSelectedBlocks();
      toast.success("Selected block(s) duplicated");
    },
    onDelete: () => {
      deleteSelectedBlocks();
      toast.success("Selected block(s) removed");
    },
    onMoveUp: () => {
      moveSelectedBlocks("up");
    },
    onMoveDown: () => {
      moveSelectedBlocks("down");
    },
    onEscape: () => {
      clearMultiSelect();
    },
    onTogglePalette: () => {
      setIsPaletteOpen(prev => !prev);
    },
    onSave: handleSave,
    onCopy: () => {
      copySelectedBlocks();
      toast.success("Copied to clipboard");
    },
    onPaste: () => {
      pasteBlocks();
      toast.success("Pasted from clipboard");
    },
    onOpenHelp: () => {
      setIsShortcutsOpen(true);
    }
  });

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
        openProjectsModal={() => setIsProjectsOpen(true)}
        openImportModal={() => setIsImportOpen(true)}
        openPublishModal={() => setIsPublishOpen(true)}
        openExportModal={() => setIsExportOpen(true)}
        markdown={markdownText}
      />

      {/* Main Workspace Workspace */}
      <main className="flex-1 flex overflow-hidden">
        {viewMode === "design" && (
          <>
            {/* Left sidebar: palette & layers */}
            <LeftSidebar />

            {/* Center Canvas with wrappers for layout banner & warning indicator */}
            <div className="flex-1 flex flex-col overflow-hidden relative">
              {showAiBanner && (
                <div className="bg-indigo-950/40 border-b border-indigo-900/30 px-6 py-2.5 text-xs text-indigo-300 flex items-center justify-between animate-in slide-in-from-top duration-200">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-indigo-400 animate-pulse" />
                    <span><strong>AI Auto-Fill Completed:</strong> Canvas layout successfully generated from the GitHub repository!</span>
                  </div>
                  <button 
                    onClick={() => setShowAiBanner(false)}
                    className="text-neutral-450 hover:text-white px-2 py-0.5 rounded hover:bg-neutral-850 transition-colors cursor-pointer text-[11px]"
                  >
                    Dismiss
                  </button>
                </div>
              )}

              {/* Canvas workspace area */}
              <Canvas />

              {/* Lint errors/warning indicator bottom overlay panel */}
              <LintPanel />
            </div>

            {/* Right sidebar: settings */}
            <RightSidebar />
          </>
        )}

        {viewMode === "markdown" && (
          <MarkdownEditor 
            value={markdownText} 
            onChange={setCustomMarkdown}
            onSyncApplied={() => setCustomMarkdown(null)}
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

      <ProjectsModal 
        isOpen={isProjectsOpen}
        onClose={() => setIsProjectsOpen(false)}
      />

      <ImportModal 
        isOpen={isImportOpen}
        onClose={() => setIsImportOpen(false)}
        onAiSuccess={() => setShowAiBanner(true)}
      />

      <PublishModal 
        isOpen={isPublishOpen}
        onClose={() => setIsPublishOpen(false)}
        markdown={markdownText}
      />

      <ExportModal 
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
      />

      <KeyboardShortcutsModal 
        isOpen={isShortcutsOpen}
        onClose={() => setIsShortcutsOpen(false)}
      />

      <CommandPalette 
        isOpen={isPaletteOpen}
        onClose={() => setIsPaletteOpen(false)}
        setViewMode={handleSetViewMode}
        onCopy={async () => {
          try {
            await navigator.clipboard.writeText(markdownText);
            toast.success("Markdown copied to clipboard!");
          } catch {
            toast.error("Failed to copy markdown.");
          }
        }}
        onDownload={() => {
          const blob = new Blob([markdownText], { type: "text/markdown;charset=utf-8;" });
          const url = URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "README.md");
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(url);
          toast.success("README.md downloaded successfully!");
        }}
        onPushGithub={() => setIsPublishOpen(true)}
        onImportGithub={() => setIsImportOpen(true)}
        onSaveProject={handleSave}
        onOpenHelp={() => setIsShortcutsOpen(true)}
      />
    </div>
  );
}
