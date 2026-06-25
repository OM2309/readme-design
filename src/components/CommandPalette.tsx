import React from "react";
import { Command } from "cmdk";
import { useReadmeStore, TemplateType } from "@/store/readmeStore";
import { BlockType } from "@/store/blockRegistry";
import { blockIcons, blockLabels } from "./LeftSidebar";
import { 
  Sparkles, 
  Settings, 
  Trash2, 
  RotateCcw, 
  Undo2, 
  Redo2, 
  Copy, 
  Download, 
  Database, 
  Layout, 
  Code, 
  Eye, 
  HelpCircle,
  FolderOpen
} from "lucide-react";
import GithubIcon from "@/components/GithubIcon";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  setViewMode: (mode: "design" | "markdown" | "adaptive") => void;
  onCopy: () => void;
  onDownload: () => void;
  onPushGithub: () => void;
  onImportGithub: () => void;
  onSaveProject: () => void;
  onOpenHelp: () => void;
}

export default function CommandPalette({
  isOpen,
  onClose,
  setViewMode,
  onCopy,
  onDownload,
  onPushGithub,
  onImportGithub,
  onSaveProject,
  onOpenHelp
}: CommandPaletteProps) {
  const { 
    addBlock, 
    loadTemplate, 
    resetStore, 
    undo, 
    redo, 
    canUndo, 
    canRedo,
    selectedBlockId,
    blocks
  } = useReadmeStore();

  const handleAction = (cb: () => void) => {
    cb();
    onClose();
  };

  const handleAddBlock = (type: BlockType) => {
    const selectedBlock = blocks.find((b) => b.id === selectedBlockId);
    const parentId = selectedBlock?.type === "group" ? selectedBlock.id : selectedBlock?.parentId;
    addBlock(type, parentId);
    onClose();
  };

  const handleLoadTemplate = (type: TemplateType) => {
    loadTemplate(type);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="p-0 overflow-hidden bg-[#16161a]/95 border-neutral-800 text-foreground max-w-lg select-none">
        <Command className="flex flex-col h-[330px] font-sans">
          <div className="flex items-center border-b border-neutral-850 px-4 py-3">
            <Command.Input
              autoFocus
              placeholder="Search command palette... (e.g. Add Header, Load React)"
              className="w-full bg-transparent border-0 outline-none placeholder-neutral-500 text-xs py-1"
            />
          </div>
          
          <Command.List className="flex-1 overflow-y-auto p-2 space-y-2">
            <Command.Empty className="py-6 text-center text-xs text-neutral-500">
              No matching commands found.
            </Command.Empty>

            {/* Group: Core Views & Operations */}
            <Command.Group heading="Workspace Layout & View" className="text-[10px] font-bold text-indigo-400/80 px-2.5 py-1.5 uppercase tracking-wider">
              <Command.Item
                onSelect={() => handleAction(() => setViewMode("design"))}
                className="flex items-center justify-between px-2.5 py-2 rounded-lg text-xs text-neutral-300 hover:bg-neutral-850 hover:text-white cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <Layout className="w-3.5 h-3.5" />
                  <span>Switch to Design Mode</span>
                </div>
              </Command.Item>
              <Command.Item
                onSelect={() => handleAction(() => setViewMode("markdown"))}
                className="flex items-center justify-between px-2.5 py-2 rounded-lg text-xs text-neutral-300 hover:bg-neutral-850 hover:text-white cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <Code className="w-3.5 h-3.5" />
                  <span>Switch to Markdown Source Code</span>
                </div>
              </Command.Item>
              <Command.Item
                onSelect={() => handleAction(() => setViewMode("adaptive"))}
                className="flex items-center justify-between px-2.5 py-2 rounded-lg text-xs text-neutral-300 hover:bg-neutral-850 hover:text-white cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <Eye className="w-3.5 h-3.5" />
                  <span>Switch to Adaptive GitHub View</span>
                </div>
              </Command.Item>
            </Command.Group>

            {/* Group: File Export & Actions */}
            <Command.Group heading="Project Actions" className="text-[10px] font-bold text-indigo-400/80 px-2.5 py-1.5 uppercase tracking-wider">
              <Command.Item
                onSelect={() => handleAction(onSaveProject)}
                className="flex items-center justify-between px-2.5 py-2 rounded-lg text-xs text-neutral-300 hover:bg-neutral-850 hover:text-white cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <Database className="w-3.5 h-3.5" />
                  <span>Save Project to Account</span>
                </div>
                <kbd className="text-[9px] font-mono bg-neutral-900 border border-neutral-800 px-1 py-0.5 rounded text-neutral-500">Ctrl+S</kbd>
              </Command.Item>
              <Command.Item
                onSelect={() => handleAction(onCopy)}
                className="flex items-center justify-between px-2.5 py-2 rounded-lg text-xs text-neutral-300 hover:bg-neutral-850 hover:text-white cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Markdown to Clipboard</span>
                </div>
              </Command.Item>
              <Command.Item
                onSelect={() => handleAction(onDownload)}
                className="flex items-center justify-between px-2.5 py-2 rounded-lg text-xs text-neutral-300 hover:bg-neutral-850 hover:text-white cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <Download className="w-3.5 h-3.5" />
                  <span>Download README.md File</span>
                </div>
              </Command.Item>
              <Command.Item
                onSelect={() => handleAction(onPushGithub)}
                className="flex items-center justify-between px-2.5 py-2 rounded-lg text-xs text-neutral-300 hover:bg-neutral-850 hover:text-white cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <GithubIcon className="w-3.5 h-3.5" />
                  <span>Publish README to GitHub</span>
                </div>
              </Command.Item>
              <Command.Item
                onSelect={() => handleAction(onImportGithub)}
                className="flex items-center justify-between px-2.5 py-2 rounded-lg text-xs text-neutral-300 hover:bg-neutral-850 hover:text-white cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>AI Import from GitHub URL</span>
                </div>
              </Command.Item>
              <Command.Item
                onSelect={() => handleAction(onOpenHelp)}
                className="flex items-center justify-between px-2.5 py-2 rounded-lg text-xs text-neutral-300 hover:bg-neutral-850 hover:text-white cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>Open Keyboard Shortcuts Help</span>
                </div>
                <kbd className="text-[9px] font-mono bg-neutral-900 border border-neutral-800 px-1 py-0.5 rounded text-neutral-500">?</kbd>
              </Command.Item>
            </Command.Group>

            {/* Group: History & Reset */}
            <Command.Group heading="Workspace Operations" className="text-[10px] font-bold text-indigo-400/80 px-2.5 py-1.5 uppercase tracking-wider">
              <Command.Item
                onSelect={() => handleAction(undo)}
                disabled={!canUndo()}
                className="flex items-center justify-between px-2.5 py-2 rounded-lg text-xs text-neutral-300 hover:bg-neutral-850 hover:text-white cursor-pointer disabled:opacity-40"
              >
                <div className="flex items-center gap-2">
                  <Undo2 className="w-3.5 h-3.5" />
                  <span>Undo last change</span>
                </div>
                <kbd className="text-[9px] font-mono bg-neutral-900 border border-neutral-800 px-1 py-0.5 rounded text-neutral-500">Ctrl+Z</kbd>
              </Command.Item>
              <Command.Item
                onSelect={() => handleAction(redo)}
                disabled={!canRedo()}
                className="flex items-center justify-between px-2.5 py-2 rounded-lg text-xs text-neutral-300 hover:bg-neutral-850 hover:text-white cursor-pointer disabled:opacity-40"
              >
                <div className="flex items-center gap-2">
                  <Redo2 className="w-3.5 h-3.5" />
                  <span>Redo undone change</span>
                </div>
                <kbd className="text-[9px] font-mono bg-neutral-900 border border-neutral-800 px-1 py-0.5 rounded text-neutral-500">Ctrl+Shift+Z</kbd>
              </Command.Item>
              <Command.Item
                onSelect={() => handleAction(() => {
                  if (window.confirm("Reset canvas completely?")) resetStore();
                })}
                className="flex items-center justify-between px-2.5 py-2 rounded-lg text-xs text-red-400 hover:bg-red-950/20 cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <RotateCcw className="w-3.5 h-3.5 text-red-500" />
                  <span>Reset workspace canvas</span>
                </div>
              </Command.Item>
            </Command.Group>

            {/* Group: Add Visual Blocks */}
            <Command.Group heading="Add visual blocks" className="text-[10px] font-bold text-indigo-400/80 px-2.5 py-1.5 uppercase tracking-wider">
              {Object.keys(blockLabels).map((key) => {
                const bType = key as BlockType;
                const Icon = blockIcons[bType] || Code;
                return (
                  <Command.Item
                    key={bType}
                    onSelect={() => handleAction(() => handleAddBlock(bType))}
                    className="flex items-center justify-between px-2.5 py-2 rounded-lg text-xs text-neutral-300 hover:bg-neutral-850 hover:text-white cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <Icon className="w-3.5 h-3.5 text-neutral-500" />
                      <span>Add {blockLabels[bType]} Block</span>
                    </div>
                  </Command.Item>
                );
              })}
            </Command.Group>

            {/* Group: Load Template Configurations */}
            <Command.Group heading="Templates Library" className="text-[10px] font-bold text-indigo-400/80 px-2.5 py-1.5 uppercase tracking-wider">
              {[
                { type: "npm-package", name: "NPM Package Boilerplate" },
                { type: "react-component", name: "React Component" },
                { type: "cli-tool", name: "CLI Utility Tool" },
                { type: "profile-readme", name: "GitHub Profile README" },
                { type: "web3-solana", name: "Solana Pay Portal" },
                { type: "saas-landing", name: "MetricsFlow SaaS" },
                { type: "mobile-app", name: "FitTrack Mobile" },
                { type: "rest-api", name: "GeoLocation REST API" },
                { type: "monorepo", name: "Workspace Monorepo" },
                { type: "hackathon", name: "EcoSnap Hackathon" },
                { type: "portfolio", name: "Jane Dev - Software Engineer" },
                { type: "browser-ext", name: "FocusShield Extension" },
                { type: "vscode-ext", name: "GitNotes VS Code Extension" },
                { type: "discord-bot", name: "ModeratorBot Discord" }
              ].map((tpl) => (
                <Command.Item
                  key={tpl.type}
                  onSelect={() => handleAction(() => handleLoadTemplate(tpl.type as any))}
                  className="flex items-center justify-between px-2.5 py-2 rounded-lg text-xs text-neutral-300 hover:bg-neutral-850 hover:text-white cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <FolderOpen className="w-3.5 h-3.5 text-neutral-500" />
                    <span>Load Template: {tpl.name}</span>
                  </div>
                </Command.Item>
              ))}
            </Command.Group>
          </Command.List>
        </Command>
      </DialogContent>
    </Dialog>
  );
}
