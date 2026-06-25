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
  Sparkles,
  Rocket,
  Package,
  Video
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
      <DialogContent className="min-w-[900px] max-h-[85vh] overflow-y-auto custom-scrollbar bg-[#111215] border-[#23252a] text-[#f7f8f8] select-none rounded-xl p-6 ">
        <DialogHeader className="mb-4">
          <DialogTitle className="flex items-center gap-2 text-xl font-semibold tracking-tight text-white">
            <Sparkles className="w-5 h-5 text-emerald-400 animate-pulse" />
            Template Library
          </DialogTitle>
          <DialogDescription className="text-[#8a8f98] text-sm mt-1.5">
            Choose a starting template to kickstart your project.
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {/* 1. Product / SaaS Landing */}
          <div
            onClick={() => handleSelectTemplate("saas-landing", "Product / SaaS")}
            className="flex flex-col p-5 rounded-xl border border-[#23252a] bg-[#191b1f] hover:bg-[#22242a] hover:border-blue-500/50 transition-all cursor-pointer group"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="p-2.5 rounded-lg border border-blue-900/50 bg-blue-950/20 text-blue-400">
                <Rocket className="w-6 h-6" />
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="opacity-0 group-hover:opacity-100 transition-opacity text-xs h-8 px-3 text-blue-400 hover:text-blue-300 hover:bg-blue-400/10"
              >
                Load Template
              </Button>
            </div>

            <h4 className="font-semibold text-base text-white mt-2 group-hover:text-blue-50 transition-colors">
              Product / SaaS Page
            </h4>
            <p className="text-xs text-[#8a8f98] mt-2 leading-relaxed flex-1">
              A highly converting layout for digital products, SaaS, or open-core tools. Features bold headers, feature grids, and call-to-actions.
            </p>

            <div className="flex flex-wrap gap-1.5 mt-5">
              {["Hero Section", "Feature Grid", "Tech Stack", "CTA"].map((badge, idx) => (
                <span
                  key={idx}
                  className="text-[10px] font-mono font-medium text-blue-400/80 bg-blue-950/30 border border-blue-900/30 px-2 py-1 rounded-md"
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>

          {/* 2. GitHub Profile README */}
          <div
            onClick={() => handleSelectTemplate("profile-readme", "GitHub Profile")}
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

          {/* 3. CLI Developer Tool */}
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

          {/* 4. Minimal Package */}
          <div
            onClick={() => handleSelectTemplate("npm-package", "Minimal Package")}
            className="flex flex-col p-5 rounded-xl border border-[#23252a] bg-[#191b1f] hover:bg-[#22242a] hover:border-orange-500/50 transition-all cursor-pointer group"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="p-2.5 rounded-lg border border-orange-900/50 bg-orange-950/20 text-orange-400">
                <Package className="w-6 h-6" />
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="opacity-0 group-hover:opacity-100 transition-opacity text-xs h-8 px-3 text-orange-400 hover:text-orange-300 hover:bg-orange-400/10"
              >
                Load Template
              </Button>
            </div>

            <h4 className="font-semibold text-base text-white mt-2 group-hover:text-orange-50 transition-colors">
              Minimal Boilerplate
            </h4>
            <p className="text-xs text-[#8a8f98] mt-2 leading-relaxed flex-1">
              A clean, no-nonsense boilerplate for libraries, APIs, or open-source packages. Includes badges, installation, and usage code snippets.
            </p>

            <div className="flex flex-wrap gap-1.5 mt-5">
              {["Badges", "Installation", "Usage Snippets", "License"].map((badge, idx) => (
                <span
                  key={idx}
                  className="text-[10px] font-mono font-medium text-orange-400/80 bg-orange-950/30 border border-orange-900/30 px-2 py-1 rounded-md"
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>

          {/* 5. YouTube Channel */}
          <div
            onClick={() => handleSelectTemplate("youtube-channel", "YouTube Channel")}
            className="flex flex-col p-5 rounded-xl border border-[#23252a] bg-[#191b1f] hover:bg-[#22242a] hover:border-red-500/50 transition-all cursor-pointer group"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="p-2.5 rounded-lg border border-red-900/50 bg-red-950/20 text-red-400">
                <Video className="w-6 h-6" />
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="opacity-0 group-hover:opacity-100 transition-opacity text-xs h-8 px-3 text-red-400 hover:text-red-300 hover:bg-red-400/10"
              >
                Load Template
              </Button>
            </div>

            <h4 className="font-semibold text-base text-white mt-2 group-hover:text-red-50 transition-colors">
              YouTube Channel
            </h4>
            <p className="text-xs text-[#8a8f98] mt-2 leading-relaxed flex-1">
              Perfect for content creators and streamers. Showcases your latest videos, channel banner, and social media links effortlessly.
            </p>

            <div className="flex flex-wrap gap-1.5 mt-5">
              {["Header Banner", "Video Embed", "Social Links"].map((badge, idx) => (
                <span
                  key={idx}
                  className="text-[10px] font-mono font-medium text-red-400/80 bg-red-950/30 border border-red-900/30 px-2 py-1 rounded-md"
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>

          {/* 6. Hackathon Project */}
          <div
            onClick={() => handleSelectTemplate("hackathon-2", "Hackathon Project")}
            className="flex flex-col p-5 rounded-xl border border-[#23252a] bg-[#191b1f] hover:bg-[#22242a] hover:border-yellow-500/50 transition-all cursor-pointer group"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="p-2.5 rounded-lg border border-yellow-900/50 bg-yellow-950/20 text-yellow-400">
                <Sparkles className="w-6 h-6" />
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="opacity-0 group-hover:opacity-100 transition-opacity text-xs h-8 px-3 text-yellow-400 hover:text-yellow-300 hover:bg-yellow-400/10"
              >
                Load Template
              </Button>
            </div>
            <h4 className="font-semibold text-base text-white mt-2 group-hover:text-yellow-50 transition-colors">
              Hackathon Project
            </h4>
            <p className="text-xs text-[#8a8f98] mt-2 leading-relaxed flex-1">
              Structured to present your hackathon build clearly. Includes Problem, Solution, Demo, and Features checklist.
            </p>
            <div className="flex flex-wrap gap-1.5 mt-5">
              {["Video Demo", "Features Checklist", "Tech Stack", "Team"].map((badge, idx) => (
                <span
                  key={idx}
                  className="text-[10px] font-mono font-medium text-yellow-400/80 bg-yellow-950/30 border border-yellow-900/30 px-2 py-1 rounded-md"
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>

          {/* 7. REST API */}
          <div
            onClick={() => handleSelectTemplate("rest-api-2", "REST API")}
            className="flex flex-col p-5 rounded-xl border border-[#23252a] bg-[#191b1f] hover:bg-[#22242a] hover:border-blue-500/50 transition-all cursor-pointer group"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="p-2.5 rounded-lg border border-blue-900/50 bg-blue-950/20 text-blue-400">
                <Terminal className="w-6 h-6" />
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="opacity-0 group-hover:opacity-100 transition-opacity text-xs h-8 px-3 text-blue-400 hover:text-blue-300 hover:bg-blue-400/10"
              >
                Load Template
              </Button>
            </div>
            <h4 className="font-semibold text-base text-white mt-2 group-hover:text-blue-50 transition-colors">
              REST API
            </h4>
            <p className="text-xs text-[#8a8f98] mt-2 leading-relaxed flex-1">
              Comprehensive template for documenting API endpoints, authentication, and error codes effectively.
            </p>
            <div className="flex flex-wrap gap-1.5 mt-5">
              {["Authentication", "Endpoints", "Error Codes", "Rate Limits"].map((badge, idx) => (
                <span
                  key={idx}
                  className="text-[10px] font-mono font-medium text-blue-400/80 bg-blue-950/30 border border-blue-900/30 px-2 py-1 rounded-md"
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>

          {/* 8. NPM Package V2 */}
          <div
            onClick={() => handleSelectTemplate("npm-package-2", "NPM Package")}
            className="flex flex-col p-5 rounded-xl border border-[#23252a] bg-[#191b1f] hover:bg-[#22242a] hover:border-pink-500/50 transition-all cursor-pointer group"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="p-2.5 rounded-lg border border-pink-900/50 bg-pink-950/20 text-pink-400">
                <Package className="w-6 h-6" />
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="opacity-0 group-hover:opacity-100 transition-opacity text-xs h-8 px-3 text-pink-400 hover:text-pink-300 hover:bg-pink-400/10"
              >
                Load Template
              </Button>
            </div>
            <h4 className="font-semibold text-base text-white mt-2 group-hover:text-pink-50 transition-colors">
              NPM Package
            </h4>
            <p className="text-xs text-[#8a8f98] mt-2 leading-relaxed flex-1">
              Essential boilerplate for NPM packages. Highlights installation, API usage, and code examples.
            </p>
            <div className="flex flex-wrap gap-1.5 mt-5">
              {["Installation", "Usage", "API Table", "Contributing"].map((badge, idx) => (
                <span
                  key={idx}
                  className="text-[10px] font-mono font-medium text-pink-400/80 bg-pink-950/30 border border-pink-900/30 px-2 py-1 rounded-md"
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>

          {/* 9. Modern Toolkit */}
          <div
            onClick={() => handleSelectTemplate("modern-toolkit", "Modern Toolkit")}
            className="flex flex-col p-5 rounded-xl border border-[#23252a] bg-[#191b1f] hover:bg-[#22242a] hover:border-teal-500/50 transition-all cursor-pointer group"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="p-2.5 rounded-lg border border-teal-900/50 bg-teal-950/20 text-teal-400">
                <Rocket className="w-6 h-6" />
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="opacity-0 group-hover:opacity-100 transition-opacity text-xs h-8 px-3 text-teal-400 hover:text-teal-300 hover:bg-teal-400/10"
              >
                Load Template
              </Button>
            </div>
            <h4 className="font-semibold text-base text-white mt-2 group-hover:text-teal-50 transition-colors">
              Modern Toolkit
            </h4>
            <p className="text-xs text-[#8a8f98] mt-2 leading-relaxed flex-1">
              Advanced template for high-performance frameworks and tools. Includes feature grid and star history.
            </p>
            <div className="flex flex-wrap gap-1.5 mt-5">
              {["Feature Table", "Star History", "Tech Grid", "Performance"].map((badge, idx) => (
                <span
                  key={idx}
                  className="text-[10px] font-mono font-medium text-teal-400/80 bg-teal-950/30 border border-teal-900/30 px-2 py-1 rounded-md"
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
