import React, { useState, useEffect } from "react";
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
import { Textarea } from "@/components/ui/textarea";
import { 
  Loader2, 
  GitBranch, 
  FileText, 
  MessageSquare,
  Search,
  ExternalLink
} from "lucide-react";
import GithubIcon from "@/components/GithubIcon";
import { toast } from "sonner";
import { signIn, signOut } from "next-auth/react";

interface PublishModalProps {
  isOpen: boolean;
  onClose: () => void;
  markdown: string;
}

export default function PublishModal({ isOpen, onClose, markdown }: PublishModalProps) {
  const [session, setSession] = useState<any>(null);
  const [repos, setRepos] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [selectedRepo, setSelectedRepo] = useState<any>(null);
  const [branch, setBranch] = useState("main");
  const [commitMessage, setCommitMessage] = useState("docs: update README via README Studio");
  const [loading, setLoading] = useState(false);
  const [fetchingRepos, setFetchingRepos] = useState(false);

  const fetchRepos = React.useCallback(async () => {
    setFetchingRepos(true);
    try {
      const res = await fetch("/api/github/repos");
      const data = await res.json();
      if (data.repos) {
        setRepos(data.repos);
      }
    } catch (e) {
      toast.error("Failed to load GitHub repositories.");
    } finally {
      setFetchingRepos(false);
    }
  }, []);

  const checkSession = React.useCallback(async () => {
    try {
      const res = await fetch("/api/auth/session");
      const data = await res.json();
      if (data && Object.keys(data).length > 0 && data.user) {
        setSession(data);
        fetchRepos();
      } else {
        setSession(null);
      }
    } catch (e) {
      setSession(null);
    }
  }, [fetchRepos]);

  // Check session status on mount/open
  useEffect(() => {
    if (isOpen) {
      Promise.resolve().then(() => {
        checkSession();
      });
    }
  }, [isOpen, checkSession]);

  const handleSignIn = () => {
    signIn("github");
  };

  const handlePublish = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRepo) return;

    setLoading(true);
    try {
      const response = await fetch("/api/github/push", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          repoPath: selectedRepo.fullName,
          branch,
          commitMessage,
          markdownContent: markdown,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to publish file.");
      }

      toast.success("README published to GitHub!", {
        description: "Your file was successfully committed and pushed.",
        action: {
          label: "View on GitHub",
          onClick: () => window.open(data.htmlUrl, "_blank")
        }
      });
      onClose();
    } catch (err: any) {
      toast.error(err.message || "Failed to publish file to GitHub.");
    } finally {
      setLoading(false);
    }
  };

  const filteredRepos = repos.filter(r => 
    r.fullName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-md bg-panel border-neutral-800 text-foreground select-none">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-base font-bold">
            <GithubIcon className="w-5 h-5 text-indigo-400" />
            Publish to GitHub
          </DialogTitle>
          <DialogDescription className="text-[11px] text-neutral-400">
            Publish your README layout directly to any branch inside your GitHub repository.
          </DialogDescription>
        </DialogHeader>

        {!session ? (
          /* Sign In UI */
          <div className="flex flex-col items-center justify-center py-6 text-center space-y-4">
            <div className="p-3 bg-neutral-900 border border-neutral-850 rounded-full">
              <GithubIcon className="w-8 h-8 text-neutral-400" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-neutral-200">GitHub Authentication Required</h4>
              <p className="text-[11px] text-neutral-500 max-w-[285px] mt-1.5 leading-relaxed">
                Connect your GitHub account to load your repositories and write updates directly.
              </p>
            </div>
            <Button onClick={handleSignIn} className="w-full bg-white text-black hover:bg-neutral-200 flex items-center justify-center gap-2 text-xs h-9">
              <GithubIcon className="w-4 h-4 fill-black" />
              Sign in with GitHub
            </Button>
          </div>
        ) : (
          /* Publish Form UI */
          <form onSubmit={handlePublish} className="space-y-4 py-1">
            {/* Repository selector */}
            <div className="space-y-1.5">
              <Label className="text-[10px] text-muted-foreground">Select Repository</Label>
              {fetchingRepos ? (
                <div className="flex items-center justify-center py-3 border border-neutral-800 rounded-lg text-[11px] text-neutral-500 bg-neutral-900/50">
                  <Loader2 className="w-3.5 h-3.5 animate-spin mr-1.5" /> Loading repository list...
                </div>
              ) : repos.length === 0 ? (
                <div className="text-center py-4 border border-dashed border-neutral-800 rounded-lg text-xs text-neutral-500">
                  No repositories found.
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-neutral-500" />
                    <Input
                      placeholder="Filter repos..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="h-8 text-xs pl-8 bg-neutral-900 border-neutral-800"
                    />
                  </div>

                  <div className="border border-neutral-800 bg-neutral-950/60 rounded-lg max-h-[140px] overflow-y-auto p-1 divide-y divide-neutral-900">
                    {filteredRepos.map((repo) => (
                      <button
                        key={repo.id}
                        type="button"
                        onClick={() => {
                          setSelectedRepo(repo);
                          setBranch(repo.defaultBranch);
                        }}
                        className={`w-full text-left px-2.5 py-2 rounded text-[11px] font-medium transition-all ${
                          selectedRepo?.id === repo.id 
                            ? "bg-indigo-600/20 border border-indigo-500/20 text-white" 
                            : "hover:bg-neutral-900/60 text-neutral-400 hover:text-white"
                        }`}
                      >
                        {repo.fullName}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {selectedRepo && (
              <div className="bg-neutral-950 border border-neutral-850 p-3 rounded-lg space-y-3 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="flex items-center gap-1.5 text-xs text-indigo-400 font-semibold mb-1">
                  <span>Target Configuration</span>
                </div>

                {/* Path preview */}
                <div className="grid grid-cols-3 gap-2 items-center text-[10px]">
                  <span className="text-neutral-500 flex items-center gap-1"><FileText className="w-3 h-3" /> File Path</span>
                  <span className="col-span-2 font-mono text-neutral-350">{selectedRepo.fullName}/README.md</span>
                </div>

                {/* Branch */}
                <div className="grid grid-cols-3 gap-2 items-center text-[10px]">
                  <span className="text-neutral-500 flex items-center gap-1"><GitBranch className="w-3 h-3" /> Branch</span>
                  <div className="col-span-2">
                    <Input
                      value={branch}
                      onChange={(e) => setBranch(e.target.value)}
                      className="h-7 text-[10px] bg-neutral-900 border-neutral-800 font-mono"
                      required
                      disabled={loading}
                    />
                  </div>
                </div>

                {/* Commit Message */}
                <div className="grid grid-cols-3 gap-2 items-start text-[10px]">
                  <span className="text-neutral-500 flex items-center gap-1 mt-1.5"><MessageSquare className="w-3 h-3" /> Commit Msg</span>
                  <div className="col-span-2">
                    <Textarea
                      value={commitMessage}
                      onChange={(e) => setCommitMessage(e.target.value)}
                      className="text-[10px] bg-neutral-900 border-neutral-800 font-mono"
                      rows={2}
                      required
                      disabled={loading}
                    />
                  </div>
                </div>
              </div>
            )}

            <div className="flex gap-2 justify-end pt-2 border-t border-neutral-850">
              <Button type="button" variant="ghost" onClick={onClose} disabled={loading} className="text-xs h-8">
                Cancel
              </Button>
              <Button 
                type="submit" 
                disabled={loading || !selectedRepo} 
                className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs h-8 px-4 flex items-center gap-1.5"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" /> Pushing README...
                  </>
                ) : (
                  <>
                    <ExternalLink className="w-3.5 h-3.5" /> Publish README
                  </>
                )}
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
