import React from "react";
import { useReadmeStore, TemplateType } from "@/store/readmeStore";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { 
  Box, 
  Code2, 
  Terminal, 
  User, 
  Sparkles,
  CheckCircle2
} from "lucide-react";
import { toast } from "sonner";

interface TemplateLibraryProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function TemplateLibrary({ isOpen, onClose }: TemplateLibraryProps) {
  const { loadTemplate } = useReadmeStore();

  const templatesList = [
    {
      id: "npm-package" as TemplateType,
      title: "NPM Package Boilerplate",
      description: "Perfect for libraries, utils, or packages published to NPM. Includes Header, Badges, installation markdown, and parameter tables.",
      icon: Box,
      color: "text-cyan-400 bg-cyan-950/40 border-cyan-800/30",
      badges: ["Header", "Badges", "Installation", "Parameters Table"],
    },
    {
      id: "react-component" as TemplateType,
      title: "React Component Library",
      description: "Optimized for visual React components, UI libraries, or design tokens. Includes a banner cover image, badges, usage code, and previews.",
      icon: Code2,
      color: "text-blue-400 bg-blue-950/40 border-blue-800/30",
      badges: ["Visual Banner", "Usage Code", "Preview Image Grid", "Badges"],
    },
    {
      id: "cli-tool" as TemplateType,
      title: "CLI Developer Tool",
      description: "Tailored for terminal commands, CLI utilities, or developer automation scripts. Includes a minimal header, features, and star history chart.",
      icon: Terminal,
      color: "text-emerald-400 bg-emerald-950/40 border-emerald-800/30",
      badges: ["Minimalist Header", "Features List", "Live Star Chart", "Code Block"],
    },
    {
      id: "profile-readme" as TemplateType,
      title: "GitHub Profile README",
      description: "A beautiful, personalized introduction for your GitHub profile landing page. Includes a compact gradient banner, bio text, and sponsors grid.",
      icon: User,
      color: "text-purple-400 bg-purple-950/40 border-purple-800/30",
      badges: ["Compact Gradient", "Bio Markdown", "Sponsors Grid", "Links"],
    },
  ];

  const handleSelectTemplate = (id: TemplateType, name: string) => {
    loadTemplate(id);
    toast.success(`Loaded "${name}" Template!`, {
      description: "Your workspace has been populated with default starter blocks.",
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-2xl bg-panel border-neutral-800 text-foreground select-none">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-lg font-bold">
            <Sparkles className="w-5 h-5 text-indigo-400 animate-pulse" />
            Template Library
          </DialogTitle>
          <DialogDescription className="text-neutral-400 text-xs">
            Choose a starting template to kickstart your project. Loading a template will replace all existing blocks in your current session.
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-4 py-4">
          {templatesList.map((tpl) => {
            const Icon = tpl.icon;
            return (
              <div
                key={tpl.id}
                onClick={() => handleSelectTemplate(tpl.id, tpl.title)}
                className="flex flex-col p-4 rounded-xl border border-border bg-card hover:bg-neutral-900/50 hover:border-neutral-700 transition-all cursor-pointer group"
              >
                <div className="flex items-start justify-between">
                  <div className={`p-2 rounded-lg border ${tpl.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="opacity-0 group-hover:opacity-100 transition-opacity text-xs h-7 px-2.5 text-indigo-400 hover:text-indigo-300 hover:bg-indigo-950/30"
                  >
                    Load
                  </Button>
                </div>

                <h4 className="font-semibold text-sm text-neutral-200 mt-3 group-hover:text-white transition-colors">
                  {tpl.title}
                </h4>
                <p className="text-[11px] text-neutral-400 mt-1 leading-relaxed flex-1">
                  {tpl.description}
                </p>

                <div className="flex flex-wrap gap-1 mt-4">
                  {tpl.badges.map((badge, idx) => (
                    <span
                      key={idx}
                      className="text-[9px] font-mono font-medium text-neutral-500 bg-neutral-950 border border-neutral-850 px-1.5 py-0.5 rounded"
                    >
                      {badge}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
}
