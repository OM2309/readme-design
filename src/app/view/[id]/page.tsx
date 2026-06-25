"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase, hasSupabase } from "@/lib/supabaseClient";
import { generateReadmeMarkdown } from "@/utils/markdownGenerators";
import GitHubPreview from "@/components/GitHubPreview";
import { Loader2, Sparkles, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PublicProjectView() {
  const { id } = useParams() as { id: string };
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [project, setProject] = useState<any>(null);
  const [markdown, setMarkdown] = useState<string>("");

  useEffect(() => {
    if (!id || !hasSupabase()) {
      Promise.resolve().then(() => setLoading(false));
      return;
    }

    async function fetchProject() {
      try {
        const { data, error } = await supabase!
          .from("projects")
          .select("*")
          .eq("id", id)
          .single();

        if (data) {
          setProject(data);
          const parsedBlocks = typeof data.blocks === "string" 
            ? JSON.parse(data.blocks) 
            : data.blocks;
          const md = generateReadmeMarkdown(parsedBlocks);
          setMarkdown(md);
        }
      } catch (err) {
        console.error("Error fetching project:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchProject();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center text-foreground font-sans select-none">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 text-indigo-500 animate-spin" />
          <span className="text-xs text-neutral-400 font-semibold tracking-wider uppercase animate-pulse">
            Loading Shared README...
          </span>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center text-foreground font-sans p-6 text-center select-none">
        <div className="max-w-md space-y-4">
          <div className="p-3 bg-red-950/20 border border-red-900/30 text-red-400 rounded-full inline-block">
            <Sparkles className="w-8 h-8 rotate-180" />
          </div>
          <h2 className="text-lg font-bold text-neutral-200">README Draft Not Found</h2>
          <p className="text-xs text-neutral-400 leading-relaxed">
            The project URL is invalid or has been deleted by the owner. Make sure you have copied the correct link.
          </p>
          <Button 
            onClick={() => router.push("/")}
            className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs h-8 px-4"
          >
            Create Your Own README
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-background text-foreground font-sans select-none">
      {/* Read-Only Public Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border bg-panel text-foreground flex items-center justify-between px-6 py-3 h-16 shrink-0">
        <div className="flex items-center gap-3 min-w-0">
          <div className="p-1 rounded bg-white text-black font-extrabold flex items-center justify-center shrink-0">
            <Sparkles className="w-4 h-4 fill-black stroke-black" />
          </div>
          <div className="flex flex-col text-left truncate leading-tight">
            <span className="text-xs font-bold text-neutral-200 truncate">{project.name}</span>
            <span className="text-[9px] text-neutral-500 font-medium uppercase tracking-wider mt-0.5">Shared Preview</span>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <span className="text-[10px] text-neutral-550 border border-neutral-850 px-2 py-0.5 rounded-full font-medium bg-neutral-950">
            Read-only Mode
          </span>
          <Button 
            onClick={() => router.push(`/?remix=${project.id}`)}
            className="bg-indigo-600 hover:bg-indigo-500 text-white flex items-center gap-1.5 text-xs h-8 px-3.5"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            Remix / Edit README
          </Button>
        </div>
      </header>

      {/* Main Adaptive Preview Component */}
      <main className="flex-1 overflow-hidden flex flex-col">
        <GitHubPreview markdown={markdown} />
      </main>
    </div>
  );
}
