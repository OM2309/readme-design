import React, { useState } from "react";
import { useReadmeStore } from "@/store/readmeStore";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sparkles, Loader2 } from "lucide-react";
import GithubIcon from "@/components/GithubIcon";
import { toast } from "sonner";

interface ImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAiSuccess: () => void; // Trigger page banner
}

export default function ImportModal({ isOpen, onClose, onAiSuccess }: ImportModalProps) {
  const { setBlocks } = useReadmeStore();
  const [repoPath, setRepoPath] = useState("");
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    if (typeof window === "undefined" || !isOpen) return;
    const params = new URLSearchParams(window.location.search);
    const importUrl = params.get("importUrl");
    if (importUrl) {
      Promise.resolve().then(() => {
        setRepoPath(importUrl);
      });
      // Clean query param
      const newParams = new URLSearchParams(window.location.search);
      newParams.delete("importUrl");
      const qs = newParams.toString();
      window.history.replaceState({}, "", `/studio${qs ? `?${qs}` : ""}`);
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!repoPath.trim()) return;

    setLoading(true);
    try {
      const response = await fetch("/api/ai-fill", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ repoPath })
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to load project layout.");
      }

      if (data.blocks && data.blocks.length > 0) {
        setBlocks(data.blocks);
        toast.success("AI README Generated!", {
          description: "We've populated your canvas based on the GitHub repository specs."
        });
        onAiSuccess();
        onClose();
      } else {
        toast.error("No block layout was generated.");
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to import from repository.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-md bg-panel border-neutral-800 text-foreground select-none">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-base font-bold">
            <Sparkles className="w-4 h-4 text-indigo-400 animate-pulse" />
            AI Auto-Fill from GitHub
          </DialogTitle>
          <DialogDescription className="text-[11px] text-neutral-400">
            Generate a full, customized visual README block configuration directly from any public GitHub repository.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-2">
          <div className="space-y-1.5">
            <Label htmlFor="repo-url" className="text-[10px] text-muted-foreground">GitHub Repo URL or owner/repo</Label>
            <div className="relative">
              <GithubIcon className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-neutral-500" />
              <Input
                id="repo-url"
                value={repoPath}
                onChange={(e) => setRepoPath(e.target.value)}
                placeholder="e.g. vercel/next.js or https://github.com/..."
                className="h-8 text-xs pl-8 bg-neutral-900 border-neutral-800 font-mono"
                required
                disabled={loading}
              />
            </div>
          </div>

          <Button type="submit" disabled={loading || !repoPath.trim()} className="w-full h-8 text-xs bg-indigo-600 hover:bg-indigo-500 text-white flex items-center justify-center gap-1.5">
            {loading ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" /> Fetching & compiling layout...
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5" /> Auto-Fill Layout
              </>
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
