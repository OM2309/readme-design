import { useEffect } from "react";

interface ShortcutCallbacks {
  onUndo: () => void;
  onRedo: () => void;
  onDuplicate: () => void;
  onDelete: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onEscape: () => void;
  onTogglePalette: () => void;
  onSave: () => void;
  onCopy: () => void;
  onPaste: () => void;
  onOpenHelp: () => void;
}

export function useKeyboardShortcuts(callbacks: ShortcutCallbacks) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isCtrl = e.ctrlKey || e.metaKey;
      const isShift = e.shiftKey;
      const activeEl = document.activeElement;
      
      const isTyping = activeEl && (
        activeEl.tagName === "INPUT" ||
        activeEl.tagName === "TEXTAREA" ||
        activeEl.getAttribute("contenteditable") === "true" ||
        activeEl.classList.contains("monaco-editor") ||
        activeEl.closest(".monaco-editor")
      );

      // 1. Universal shortcuts (work even when typing)
      if (isCtrl && e.key.toLowerCase() === "k") {
        e.preventDefault();
        callbacks.onTogglePalette();
        return;
      }
      if (isCtrl && e.key.toLowerCase() === "s") {
        e.preventDefault();
        callbacks.onSave();
        return;
      }
      if (isCtrl && e.key.toLowerCase() === "z") {
        e.preventDefault();
        if (isShift) {
          callbacks.onRedo();
        } else {
          callbacks.onUndo();
        }
        return;
      }
      if (isCtrl && e.key.toLowerCase() === "y") {
        e.preventDefault();
        callbacks.onRedo();
        return;
      }

      // 2. Editor shortcuts (ignored when typing)
      if (isTyping) return;

      // Copy & Paste
      if (isCtrl && e.key.toLowerCase() === "c") {
        e.preventDefault();
        callbacks.onCopy();
        return;
      }
      if (isCtrl && e.key.toLowerCase() === "v") {
        e.preventDefault();
        callbacks.onPaste();
        return;
      }

      // Duplicate
      if (isCtrl && e.key.toLowerCase() === "d") {
        e.preventDefault();
        callbacks.onDuplicate();
        return;
      }

      // Move Up/Down
      if (isCtrl && e.key === "ArrowUp") {
        e.preventDefault();
        callbacks.onMoveUp();
        return;
      }
      if (isCtrl && e.key === "ArrowDown") {
        e.preventDefault();
        callbacks.onMoveDown();
        return;
      }

      // Delete
      if (e.key === "Delete" || e.key === "Backspace") {
        e.preventDefault();
        callbacks.onDelete();
        return;
      }

      // Escape
      if (e.key === "Escape") {
        e.preventDefault();
        callbacks.onEscape();
        return;
      }

      // Help Help Modal
      if (e.key === "?" || (isShift && e.key === "/")) {
        e.preventDefault();
        callbacks.onOpenHelp();
        return;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [callbacks]);
}
