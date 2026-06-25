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
      <DialogContent className="max-w-4xl bg-[#111215] border-[#23252a] text-[#f7f8f8] select-none rounded-[12px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-lg font-semibold tracking-tight">
            <Sparkles className="w-5 h-5 text-[#5e6ad2] animate-pulse" />
            Template library
          </DialogTitle>
          <DialogDescription className="text-[#8a8f98] text-xs">
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
                className="flex flex-col p-4 rounded-[12px] border border-[#23252a] bg-[#191b1f] hover:bg-[#22242a] hover:border-neutral-600 transition-all cursor-pointer group"
              >
                <div className="flex items-start justify-between">
                  <div className="p-2 rounded-[8px] border border-[#23252a] bg-[#010102] text-[#5e6ad2]">
                    <Icon className="w-5 h-5" />
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="opacity-0 group-hover:opacity-100 transition-opacity text-xs h-7 px-2.5 text-[#5e6ad2] hover:text-[#828fff] hover:bg-[#5e6ad2]/10"
                  >
                    Load
                  </Button>
                </div>

                <h4 className="font-semibold text-sm text-[#f7f8f8] mt-3 group-hover:text-white transition-colors">
                  {tpl.title}
                </h4>
                <p className="text-[11px] text-[#8a8f98] mt-1 leading-relaxed flex-1">
                  {tpl.description}
                </p>

                <div className="flex flex-wrap gap-1 mt-4">
                  {tpl.badges.map((badge, idx) => (
                    <span
                      key={idx}
                      className="text-[9px] font-mono font-medium text-[#8a8f98] bg-[#010102] border border-[#23252a] px-1.5 py-0.5 rounded-[4px]"
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
