import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

interface GitHubPreviewProps {
  markdown: string;
}

export default function GitHubPreview({ markdown }: GitHubPreviewProps) {
  return (
    <div className="flex-1 bg-[#0d1117] border-l border-border overflow-y-auto p-8 flex justify-center h-[calc(100vh-64px)]">
      <div className="w-full max-w-[760px] bg-[#0d1117] p-8 border border-[#30363d] rounded-2xl h-fit shadow-2xl">
        {markdown ? (
          <div className="markdown-body">
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
              Add some blocks in Design mode to generate content.
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
