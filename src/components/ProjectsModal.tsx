import React, { useState, useEffect } from "react";
import { useReadmeStore, Project } from "@/store/readmeStore";
import { supabase, hasSupabase } from "@/lib/supabaseClient";
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
import { 
  Folder, 
  Trash2, 
  Copy, 
  Plus, 
  Loader2, 
  Database,
  Lock,
  Mail,
  User
} from "lucide-react";
import { toast } from "sonner";

interface ProjectsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ProjectsModal({ isOpen, onClose }: ProjectsModalProps) {
  const { 
    blocks, 
    projectName, 
    activeProjectId, 
    projects,
    setProjects,
    loadProject,
    resetStore,
    setActiveProjectId,
    setProjectName
  } = useReadmeStore();

  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");

  // Track session
  useEffect(() => {
    if (!hasSupabase()) return;
    supabase!.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const { data: { subscription } } = supabase!.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchProjects = React.useCallback(async () => {
    if (!hasSupabase()) return;
    Promise.resolve().then(() => setLoading(true));
    const { data, error } = await supabase!
      .from("projects")
      .select("*")
      .order("updated_at", { ascending: false });

    if (data) {
      setProjects(data.map(p => ({
        id: p.id,
        name: p.name,
        blocks: typeof p.blocks === "string" ? JSON.parse(p.blocks) : p.blocks,
        updated_at: p.updated_at
      })));
    }
    setLoading(false);
  }, [setProjects]);

  // Fetch projects when session is active
  useEffect(() => {
    if (session) {
      Promise.resolve().then(() => {
        fetchProjects();
      });
    } else {
      Promise.resolve().then(() => {
        setProjects([]);
      });
    }
  }, [session, fetchProjects, setProjects]);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!hasSupabase()) return;
    setLoading(true);

    try {
      if (authMode === "login") {
        const { error } = await supabase!.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast.success("Welcome back! Signed in successfully.");
      } else {
        const { error } = await supabase!.auth.signUp({ email, password });
        if (error) throw error;
        toast.success("Account created! Please check your email to verify.");
      }
    } catch (err: any) {
      toast.error(err.message || "Authentication failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    if (!hasSupabase()) return;
    await supabase!.auth.signOut();
    setActiveProjectId(null);
    toast.success("Signed out of account.");
  };

  const handleCreateNew = async () => {
    if (!session) {
      resetStore();
      toast.success("Created new guest template project.");
      onClose();
      return;
    }

    setLoading(true);
    const newProj = {
      name: "New README",
      blocks: blocks,
      user_id: session.user.id,
      updated_at: new Date().toISOString()
    };

    const { data, error } = await supabase!
      .from("projects")
      .insert(newProj)
      .select();

    if (data && data[0]) {
      const p = data[0];
      setProjectName(p.name);
      setActiveProjectId(p.id);
      fetchProjects();
      toast.success("Saved as new project in your account!");
      onClose();
    } else {
      toast.error("Failed to create project in database.");
    }
    setLoading(false);
  };

  const handleLoad = (id: string) => {
    loadProject(id);
    toast.success("Loaded project successfully.");
    onClose();
  };

  const handleDelete = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (!window.confirm("Are you sure you want to delete this project?")) return;
    setLoading(true);

    const { error } = await supabase!
      .from("projects")
      .delete()
      .eq("id", id);

    if (!error) {
      if (activeProjectId === id) {
        setActiveProjectId(null);
      }
      fetchProjects();
      toast.success("Project deleted.");
    } else {
      toast.error("Failed to delete project.");
    }
    setLoading(false);
  };

  const handleDuplicate = async (e: React.MouseEvent, proj: Project) => {
    e.stopPropagation();
    if (!session) return;
    setLoading(true);

    const dupProj = {
      name: `${proj.name} (Copy)`,
      blocks: proj.blocks,
      user_id: session.user.id,
      updated_at: new Date().toISOString()
    };

    const { error } = await supabase!
      .from("projects")
      .insert(dupProj);

    if (!error) {
      fetchProjects();
      toast.success("Duplicated project.");
    } else {
      toast.error("Failed to duplicate project.");
    }
    setLoading(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-md bg-panel border-neutral-800 text-foreground select-none">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-base font-bold">
            <Database className="w-4 h-4 text-indigo-400" />
            Projects Workspace
          </DialogTitle>
          <DialogDescription className="text-[11px] text-neutral-400">
            {session ? "Load, duplicate, and manage your cloud projects." : "Sign in to save your README projects across devices."}
          </DialogDescription>
        </DialogHeader>

        {/* Guest Mode Sign In Banner / Form */}
        {!session ? (
          <div className="space-y-4 py-2">
            <div className="bg-yellow-500/10 border border-yellow-500/20 p-3 rounded-lg text-[11px] text-yellow-300">
              💡 <strong>Guest Mode:</strong> Your work is stored only in local storage. Sign in to backup your designs and save multiple projects.
            </div>

            <form onSubmit={handleAuth} className="space-y-3">
              <div className="space-y-1">
                <Label className="text-[10px] text-muted-foreground">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-neutral-500" />
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="email@example.com"
                    className="h-8 text-xs pl-8 bg-neutral-900 border-neutral-800"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1">
                <Label className="text-[10px] text-muted-foreground">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-neutral-500" />
                  <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="h-8 text-xs pl-8 bg-neutral-900 border-neutral-800"
                    required
                  />
                </div>
              </div>

              <Button type="submit" disabled={loading} className="w-full h-8 text-xs bg-indigo-600 hover:bg-indigo-500 text-white mt-1">
                {loading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : authMode === "login" ? "Sign In" : "Sign Up"}
              </Button>
            </form>

            <div className="text-center text-[10px]">
              <button
                onClick={() => setAuthMode(authMode === "login" ? "signup" : "login")}
                className="text-indigo-400 hover:underline cursor-pointer"
              >
                {authMode === "login" ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
              </button>
            </div>
          </div>
        ) : (
          /* Logged In View */
          <div className="space-y-4 py-2">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <div className="flex items-center gap-1.5 text-xs text-neutral-300">
                <User className="w-4 h-4 text-neutral-500" />
                <span className="font-mono text-[10px] max-w-[150px] truncate">{session.user.email}</span>
              </div>
              <div className="flex gap-2">
                <Button size="xs" variant="outline" onClick={handleCreateNew} className="text-[10px] h-7 bg-neutral-900 border-neutral-800">
                  <Plus className="w-3 h-3 mr-1" /> New
                </Button>
                <Button size="xs" variant="ghost" onClick={handleSignOut} className="text-[10px] h-7 text-red-400 hover:text-red-300 hover:bg-red-950/20">
                  Sign Out
                </Button>
              </div>
            </div>

            {/* List of projects */}
            <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
              <span className="text-[10px] text-neutral-500 font-bold uppercase tracking-wider block mb-1">Your READMEs</span>
              {loading && projects.length === 0 ? (
                <div className="flex justify-center items-center py-8 text-neutral-500 text-xs gap-1.5">
                  <Loader2 className="w-3.5 h-3.5 animate-spin" /> Loading cloud projects...
                </div>
              ) : projects.length === 0 ? (
                <div className="text-center py-8 text-[11px] text-neutral-500 border border-dashed border-neutral-800 rounded-lg">
                  No projects saved in your database yet. Click &quot;New&quot; to start one!
                </div>
              ) : (
                projects.map((proj) => (
                  <div
                    key={proj.id}
                    onClick={() => handleLoad(proj.id)}
                    className={`flex items-center justify-between p-2.5 rounded-lg border cursor-pointer hover:bg-neutral-900/50 hover:border-neutral-700 transition-all ${
                      activeProjectId === proj.id 
                        ? "border-indigo-500/50 bg-indigo-950/10" 
                        : "border-neutral-900 bg-neutral-950/40"
                    }`}
                  >
                    <div className="flex items-center gap-2 min-w-0 flex-1 pr-4">
                      <Folder className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
                      <div className="truncate text-left">
                        <span className="text-xs font-semibold text-neutral-200 block truncate leading-snug">
                          {proj.name}
                        </span>
                        <span className="text-[9px] text-neutral-500 block leading-none mt-0.5">
                          Updated {new Date(proj.updated_at).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex gap-1 shrink-0">
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={(e) => handleDuplicate(e, proj)}
                        className="w-7 h-7 text-neutral-500 hover:text-white"
                        title="Duplicate project"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={(e) => handleDelete(e, proj.id)}
                        className="w-7 h-7 text-neutral-500 hover:text-red-400"
                        title="Delete project"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
