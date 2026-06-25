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
  Terminal, 
  User,
  Sparkles
} from "lucide-react";
import { toast } from "sonner";

interface TemplateLibraryProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function TemplateLibrary({ isOpen, onClose }: TemplateLibraryProps) {
  const { loadTemplate } = useReadmeStore();

  const handleSelectTemplate = (id: TemplateType, name: string) => {
    loadTemplate(id);
    toast.success(`Loaded "${name}" Template!`, {
      description: "Your workspace has been populated with default starter blocks.",
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-[640px] bg-[#111215] border-[#23252a] text-[#f7f8f8] select-none rounded-xl p-6">
        <DialogHeader className="mb-4">
          <DialogTitle className="flex items-center gap-2 text-xl font-semibold tracking-tight text-white">
            <Sparkles className="w-5 h-5 text-indigo-400 animate-pulse" />
            Template Library
          </DialogTitle>
          <DialogDescription className="text-[#8a8f98] text-sm mt-1.5">
            Choose a starting template to kickstart your project.
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* CLI Developer Tool */}
          <div
            onClick={() => handleSelectTemplate("cli-tool", "CLI Developer Tool")}
            className="flex flex-col p-5 rounded-xl border border-[#23252a] bg-[#191b1f] hover:bg-[#22242a] hover:border-emerald-500/50 transition-all cursor-pointer group"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="p-2.5 rounded-lg border border-emerald-900/50 bg-emerald-950/20 text-emerald-400">
                <Terminal className="w-6 h-6" />
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="opacity-0 group-hover:opacity-100 transition-opacity text-xs h-8 px-3 text-emerald-400 hover:text-emerald-300 hover:bg-emerald-400/10"
              >
                Load Template
              </Button>
            </div>

            <h4 className="font-semibold text-base text-white mt-2 group-hover:text-emerald-50 transition-colors">
              CLI Developer Tool
            </h4>
            <p className="text-xs text-[#8a8f98] mt-2 leading-relaxed flex-1">
              Tailored for terminal commands, CLI utilities, or developer automation scripts. Includes a minimal header, features, and star history chart.
            </p>

            <div className="flex flex-wrap gap-1.5 mt-5">
              {["Minimalist Header", "Features List", "Live Star Chart", "Code Block"].map((badge, idx) => (
                <span
                  key={idx}
                  className="text-[10px] font-mono font-medium text-emerald-400/80 bg-emerald-950/30 border border-emerald-900/30 px-2 py-1 rounded-md"
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>

          {/* GitHub Profile README */}
          <div
            onClick={() => handleSelectTemplate("profile-readme", "GitHub Profile README")}
            className="flex flex-col p-5 rounded-xl border border-[#23252a] bg-[#191b1f] hover:bg-[#22242a] hover:border-purple-500/50 transition-all cursor-pointer group"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="p-2.5 rounded-lg border border-purple-900/50 bg-purple-950/20 text-purple-400">
                <User className="w-6 h-6" />
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="opacity-0 group-hover:opacity-100 transition-opacity text-xs h-8 px-3 text-purple-400 hover:text-purple-300 hover:bg-purple-400/10"
              >
                Load Template
              </Button>
            </div>

            <h4 className="font-semibold text-base text-white mt-2 group-hover:text-purple-50 transition-colors">
              GitHub Profile README
            </h4>
            <p className="text-xs text-[#8a8f98] mt-2 leading-relaxed flex-1">
              A beautiful, personalized introduction for your GitHub profile landing page. Includes a compact gradient banner, bio text, and sponsors grid.
            </p>

            <div className="flex flex-wrap gap-1.5 mt-5">
              {["Compact Gradient", "Bio Markdown", "Sponsors Grid", "Links"].map((badge, idx) => (
                <span
                  key={idx}
                  className="text-[10px] font-mono font-medium text-purple-400/80 bg-purple-950/30 border border-purple-900/30 px-2 py-1 rounded-md"
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
