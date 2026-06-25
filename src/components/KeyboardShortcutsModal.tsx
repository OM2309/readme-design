import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface KeyboardShortcutsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function KeyboardShortcutsModal({ isOpen, onClose }: KeyboardShortcutsModalProps) {
  const categories = [
    {
      title: "Editing Shortcuts",
      shortcuts: [
        { keys: ["Ctrl", "C"], action: "Copy selected block(s)" },
        { keys: ["Ctrl", "V"], action: "Paste copied block(s) below" },
        { keys: ["Ctrl", "D"], action: "Duplicate selected block(s)" },
        { keys: ["Delete / Backspace"], action: "Remove selected block(s)" },
        { keys: ["Ctrl", "S"], action: "Save current project" },
      ],
    },
    {
      title: "Navigation & History",
      shortcuts: [
        { keys: ["Ctrl", "Z"], action: "Undo last modification" },
        { keys: ["Ctrl", "Shift", "Z"], action: "Redo last undone change" },
        { keys: ["Ctrl", "↑ / ↓"], action: "Shift selected block up/down" },
        { keys: ["Escape"], action: "Deselect active block" },
        { keys: ["Ctrl", "K"], action: "Open command palette" },
        { keys: ["?"], action: "Toggle shortcuts cheatsheet" },
      ],
    },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-md bg-panel border-neutral-800 text-foreground select-none">
        <DialogHeader>
          <DialogTitle className="text-base font-bold">Keyboard Shortcuts</DialogTitle>
          <DialogDescription className="text-[11px] text-neutral-400">
            Speed up your workspace layout using native hotkeys.
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-6 py-2">
          {categories.map((cat, i) => (
            <div key={i} className="space-y-4">
              <h4 className="text-xs font-bold text-indigo-400 border-b border-border pb-1.5">{cat.title}</h4>
              <div className="space-y-3">
                {cat.shortcuts.map((sc, j) => (
                  <div key={j} className="flex justify-between items-center text-[11px]">
                    <span className="text-neutral-300 font-medium">{sc.action}</span>
                    <div className="flex gap-1 items-center">
                      {sc.keys.map((k, kIdx) => (
                        <React.Fragment key={kIdx}>
                          <kbd className="px-1.5 py-0.5 rounded border border-neutral-800 bg-neutral-950 font-mono text-[9px] text-neutral-400 shadow">
                            {k}
                          </kbd>
                          {kIdx < sc.keys.length - 1 && <span className="text-neutral-600 text-[9px]">+</span>}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
