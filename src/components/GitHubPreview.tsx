import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { 
  Laptop, 
  Smartphone, 
  Sun, 
  Moon,
  Info
} from "lucide-react";

interface GitHubPreviewProps {
  markdown: string;
}

export default function GitHubPreview({ markdown }: GitHubPreviewProps) {
  const [device, setDevice] = useState<"desktop" | "mobile">("desktop");
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  const isLight = theme === "light";
  const isMobile = device === "mobile";

  return (
    <div className="flex-1 bg-background border-l border-border flex flex-col h-[calc(100vh-64px)]">
      {/* Visual Preview Mode Settings Toolbar */}
      <div className="bg-panel border-b border-border px-6 py-2.5 flex items-center justify-between select-none">
        <div className="flex items-center gap-3">
          {/* Device Width Selectors */}
          <div className="flex items-center bg-background border border-border p-0.5 rounded-lg">
            <button
              onClick={() => setDevice("desktop")}
              className={`p-1.5 rounded-md transition-all ${
                !isMobile 
                  ? "bg-accent text-accent-foreground shadow-sm" 
                  : "text-muted-foreground hover:text-foreground"
              }`}
              title="Desktop Preview (760px)"
            >
              <Laptop className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setDevice("mobile")}
              className={`p-1.5 rounded-md transition-all ${
                isMobile 
                  ? "bg-accent text-accent-foreground shadow-sm" 
                  : "text-muted-foreground hover:text-foreground"
              }`}
              title="Mobile Preview (390px)"
            >
              <Smartphone className="w-3.5 h-3.5" />
            </button>
          </div>
          
          <span className="text-[10px] text-neutral-500 font-mono bg-neutral-900 border border-neutral-850 px-2 py-0.5 rounded">
            {isMobile ? "390px (Mobile)" : "760px (Desktop)"}
          </span>
        </div>

        {/* GitHub Theme Selectors */}
        <div className="flex items-center bg-background border border-border p-0.5 rounded-lg">
          <button
            onClick={() => setTheme("light")}
            className={`flex items-center gap-1.5 text-[10px] font-semibold px-2.5 py-1 rounded-md transition-all ${
              isLight 
                ? "bg-white text-black shadow-sm" 
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Sun className="w-3 h-3" />
            Light
          </button>
          <button
            onClick={() => setTheme("dark")}
            className={`flex items-center gap-1.5 text-[10px] font-semibold px-2.5 py-1 rounded-md transition-all ${
              !isLight 
                ? "bg-neutral-800 text-white shadow-sm" 
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Moon className="w-3 h-3" />
            Dark
          </button>
        </div>
      </div>

      {/* Preview Container Content */}
      <div className="flex-1 overflow-y-auto p-8 flex justify-center bg-neutral-900/40">
        <div 
          className={`w-full transition-all duration-300 rounded-2xl h-fit shadow-2xl p-8 border ${
            isMobile ? "max-w-[390px]" : "max-w-[760px]"
          } ${
            isLight 
              ? "bg-white border-[#d0d7de] text-[#24292f]" 
              : "bg-[#0d1117] border-[#30363d] text-[#c9d1d9]"
          }`}
        >
          {markdown ? (
            <div className={`markdown-body ${isLight ? "light-theme" : ""}`}>
              <ReactMarkdown 
                remarkPlugins={[remarkGfm]} 
                rehypePlugins={[rehypeRaw]}
              >
                {markdown}
              </ReactMarkdown>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center text-neutral-500">
              <span className="text-sm font-semibold">No Markdown generated yet</span>
              <span className="text-xs text-neutral-600 mt-1">
                Add some blocks in Design mode to render preview contents.
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
