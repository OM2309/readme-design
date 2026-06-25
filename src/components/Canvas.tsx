import React, { useState, useEffect } from "react";
import { useReadmeStore } from "@/store/readmeStore";
import { Block, BlockType } from "@/store/blockRegistry";
import { 
  Trash2, 
  Copy, 
  GripVertical, 
  FolderPlus,
  FolderOpen,
  StickyNote,
  Users,
  Play,
  Code2,
  FileText,
  Sparkles,
  MoveUp,
  MoveDown,
  Group
} from "lucide-react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { blockIcons, blockLabels } from "./LeftSidebar";
import { Button } from "./ui/button";

interface CanvasBlockWrapperProps {
  block: Block;
  children: React.ReactNode;
}

function CanvasBlockWrapper({ block, children }: CanvasBlockWrapperProps) {
  const { 
    selectedBlockId, 
    selectedBlockIds,
    selectBlock, 
    toggleMultiSelectBlock,
    removeBlock, 
    duplicateBlock,
    updateBlockNote
  } = useReadmeStore();

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: block.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.3 : 1,
  };

  const isSelected = selectedBlockIds.includes(block.id);
  const isNested = !!block.parentId;

  const handleDuplicate = (e: React.MouseEvent) => {
    e.stopPropagation();
    duplicateBlock(block.id);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    removeBlock(block.id);
  };

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    // Toggle note field
    updateBlockNote(block.id, block._note !== undefined ? "" : "Sticky note comment");
  };

  const handleBlockClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (e.shiftKey) {
      toggleMultiSelectBlock(block.id);
    } else {
      selectBlock(block.id);
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      onClick={handleBlockClick}
      onContextMenu={handleContextMenu}
      className={`group relative border rounded-xl transition-all duration-200 cursor-pointer ${
        isNested ? "ml-6 border-dashed border-neutral-800" : "border-transparent"
      } ${
        isSelected 
          ? "ring-2 ring-white/80 border-white/50 bg-neutral-900/40" 
          : "hover:border-neutral-850 hover:bg-neutral-950/20"
      }`}
      title="Right-click to add/toggle notes. Shift+click to multi-select."
    >
      {/* Left Drag Handle */}
      <div 
        {...attributes} 
        {...listeners}
        className="absolute left-[-14px] top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity cursor-grab active:cursor-grabbing p-1 bg-neutral-900 border border-neutral-800 rounded-md text-neutral-400 hover:text-white shadow-md z-10"
      >
        <GripVertical className="w-3.5 h-3.5" />
      </div>

      {/* Hover Action Bar */}
      <div className="absolute right-3 top-[-14px] opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity flex items-center gap-1.5 bg-neutral-950 border border-neutral-800 p-1 rounded-lg shadow-xl z-20">
        <span className="text-[9px] text-neutral-400 px-1 font-mono select-none">
          {blockLabels[block.type]}
        </span>
        <button
          onClick={handleDuplicate}
          className="p-1 text-neutral-400 hover:text-white hover:bg-neutral-900 rounded-md transition-colors"
          title="Duplicate Block"
        >
          <Copy className="w-3 h-3" />
        </button>
        <button
          onClick={handleDelete}
          className="p-1 text-red-400 hover:text-red-300 hover:bg-red-950/40 rounded-md transition-colors"
          title="Delete Block"
        >
          <Trash2 className="w-3 h-3" />
        </button>
      </div>

      {/* Block Body Content */}
      <div className="p-5">
        {children}

        {/* Inline Yellow Sticky Note */}
        {block._note !== undefined && (
          <div 
            onClick={(e) => e.stopPropagation()} 
            className="mt-4 bg-yellow-500/10 border border-yellow-500/20 text-yellow-200 p-3 rounded-lg text-xs flex gap-2 items-start font-sans"
          >
            <StickyNote className="w-4 h-4 text-yellow-500 shrink-0 mt-0.5" />
            <div className="flex-1">
              <textarea
                value={block._note}
                onChange={(e) => updateBlockNote(block.id, e.target.value)}
                className="w-full bg-transparent border-none outline-none resize-none placeholder-yellow-500/50 text-xs text-yellow-100"
                placeholder="Write your editorial comment here..."
                rows={2}
              />
            </div>
            <button 
              onClick={() => updateBlockNote(block.id, undefined as any)} 
              className="text-neutral-500 hover:text-red-400 transition-colors"
              title="Remove note"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// 1. Header Block Visual
function VisualHeader({ props }: { props: Record<string, any> }) {
  const align = props.align || "center";
  const style = props.style || "gradient";
  const size = props.size || "banner";
  const fontClass = props.font === "mono" ? "font-mono" : props.font === "serif" ? "font-serif" : "font-sans";

  const hasLogo = props.logoType !== "none";
  const logoUrl = props.logoType === "auto" 
    ? "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&fit=crop&q=80" 
    : props.logoUrl;

  const bgStyles = React.useMemo(() => {
    if (props.bgType === "image" && props.bgImage) {
      return { backgroundImage: `url(${props.bgImage})`, backgroundSize: "cover", backgroundPosition: "center" };
    }
    if (style === "gradient") {
      return { background: `linear-gradient(135deg, ${props.bgGradientStart || "#4f46e5"} 0%, ${props.bgGradientEnd || "#ec4899"} 100%)` };
    }
    if (style === "solid") {
      return { backgroundColor: props.bgColor || "#111827" };
    }
    return { backgroundColor: "transparent" };
  }, [props.bgType, props.bgImage, props.bgGradientStart, props.bgGradientEnd, props.bgColor, style]);

  const paddingClass = size === "compact" ? "py-8 px-6" : "py-16 px-8";

  return (
    <div 
      style={bgStyles}
      className={`rounded-lg overflow-hidden flex flex-col relative ${paddingClass} ${
        style === "minimal" ? "border border-border bg-neutral-950" : ""
      } ${
        align === "center" ? "items-center text-center" : align === "right" ? "items-end text-right" : "items-start text-left"
      } ${fontClass}`}
    >
      {style !== "minimal" && (
        <div className="absolute inset-0 bg-black/10 backdrop-brightness-95 pointer-events-none" />
      )}

      <div className="relative z-10 flex flex-col items-inherit">
        {hasLogo && logoUrl && (
          <img 
            src={logoUrl} 
            alt={props.altText || "Logo"} 
            className="w-16 h-16 rounded-xl object-cover mb-4 border border-white/20 shadow-lg"
          />
        )}
        <h1 className="text-3xl font-extrabold tracking-tight text-white drop-shadow-md">
          {props.title || "Project Title"}
        </h1>
        {props.subtitle && (
          <p className="mt-2 text-sm text-neutral-300 font-medium max-w-lg drop-shadow">
            {props.subtitle}
          </p>
        )}
      </div>

      {props.border && <div className="w-full h-[1px] bg-border mt-6 relative z-10" />}
      {props.watermark && (
        <div className="absolute bottom-2 right-3 text-[9px] text-white/40 font-mono tracking-wider">
          README STUDIO
        </div>
      )}
    </div>
  );
}

// 2. Text Block Visual
function VisualText({ props }: { props: Record<string, any> }) {
  return (
    <div className="markdown-body select-text">
      {props.content ? (
        <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
          {props.content}
        </ReactMarkdown>
      ) : (
        <span className="text-neutral-600 italic text-xs">Empty text block. Click to configure.</span>
      )}
    </div>
  );
}

// 3. Badges Block Visual
function VisualBadges({ props }: { props: Record<string, any> }) {
  const { packageName = "readme-studio", githubRepo = "username/repo", badgeList = [], badgeStyle = "flat" } = props;

  if (badgeList.length === 0) {
    return <span className="text-neutral-600 italic text-xs">No badges enabled.</span>;
  }

  const badgeUrls = badgeList.map((type: string) => {
    switch (type) {
      case "npm-v":
        return {
          name: "npm",
          img: `https://img.shields.io/npm/v/${packageName || "readme-studio"}.svg?style=${badgeStyle}`,
          url: `https://www.npmjs.com/package/${packageName || "readme-studio"}`
        };
      case "github-stars":
        return {
          name: "stars",
          img: `https://img.shields.io/github/stars/${githubRepo || "username/repo"}.svg?style=${badgeStyle}`,
          url: `https://github.com/${githubRepo || "username/repo"}`
        };
      case "license":
        return {
          name: "license",
          img: `https://img.shields.io/github/license/${githubRepo || "username/repo"}.svg?style=${badgeStyle}`,
          url: `https://github.com/${githubRepo || "username/repo"}`
        };
      case "github-status":
        return {
          name: "build status",
          img: `https://img.shields.io/github/actions/workflow/status/${githubRepo || "username/repo"}/ci.yml.svg?style=${badgeStyle}&label=build`,
          url: `https://github.com/${githubRepo || "username/repo"}/actions`
        };
      default:
        return null;
    }
  }).filter(Boolean);

  return (
    <div className="flex flex-wrap gap-2 items-center">
      {badgeUrls.map((badge: any, i: number) => (
        <a key={i} href={badge.url} target="_blank" rel="noreferrer" className="hover:scale-[1.03] transition-transform">
          <img src={badge.img} alt={badge.name} className="h-5" />
        </a>
      ))}
    </div>
  );
}

// 4. Group Block Visual
function VisualGroup({ props }: { props: Record<string, any> }) {
  return (
    <div className="flex items-center gap-2 border-b border-neutral-800 pb-2 mb-2">
      <FolderOpen className="w-4 h-4 text-emerald-400" />
      <span className="text-xs font-semibold text-neutral-300 uppercase tracking-wider">
        {props.title || "Group Container"}
      </span>
      <span className="text-[10px] text-neutral-500 italic">(Group block)</span>
    </div>
  );
}

// 5. Chart Block Visual
function VisualChart({ props }: { props: Record<string, any> }) {
  const repo = props.repo || "facebook/react";
  const chartUrl = `https://api.star-history.com/svg?repos=${repo}&type=Date`;

  return (
    <div className="flex flex-col items-center gap-2 bg-neutral-950 p-4 border border-border rounded-lg">
      <div className="text-xs font-medium text-neutral-400 self-start">
        GitHub Star History: <span className="text-neutral-200 font-mono">{repo}</span>
      </div>
      <div className="w-full flex items-center justify-center p-2 rounded bg-neutral-900 border border-neutral-800 overflow-x-auto">
        <img src={chartUrl} alt="Star History" className="max-h-[220px] object-contain" loading="lazy" />
      </div>
    </div>
  );
}

// 6. Table Block Visual
function VisualTable({ props }: { props: Record<string, any> }) {
  const headers = props.headers || [];
  const rows = props.rows || [];

  if (headers.length === 0) {
    return <span className="text-neutral-600 italic text-xs">Table is empty.</span>;
  }

  return (
    <div className="overflow-x-auto border border-border rounded-lg bg-neutral-950/40">
      <table className="w-full border-collapse text-left text-xs">
        <thead>
          <tr className="border-b border-border bg-neutral-900/60">
            {headers.map((header: string, idx: number) => (
              <th key={idx} className="p-3 font-semibold text-neutral-250 border-r border-border last:border-r-0">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row: string[], rowIdx: number) => (
            <tr key={rowIdx} className="border-b border-border last:border-0 hover:bg-neutral-900/20">
              {row.map((cell: string, colIdx: number) => (
                <td key={colIdx} className="p-3 text-neutral-300 border-r border-border last:border-r-0">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// 7. Image Block Visual
function VisualImage({ props }: { props: Record<string, any> }) {
  const url = props.url || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=60";
  const caption = props.caption || "";
  const align = props.align || "center";
  const width = props.width || "100%";
  const alignStyles = align === "center" ? "mx-auto justify-center text-center" : align === "right" ? "ml-auto justify-end text-right" : "mr-auto justify-start text-left";

  return (
    <div className={`flex flex-col ${alignStyles}`} style={{ width }}>
      <div className="rounded-lg overflow-hidden border border-border bg-neutral-900 p-1 shadow-sm">
        <img src={url} alt={caption || "Image"} className="w-full object-cover" />
      </div>
      {caption && <span className="text-xs text-muted-foreground mt-2 italic">{caption}</span>}
    </div>
  );
}

// 8. Sponsors Block Visual
function VisualSponsors({ props }: { props: Record<string, any> }) {
  const sponsors = props.sponsors || [];
  const layout = props.layout || "grid";

  if (sponsors.length === 0) {
    return <span className="text-neutral-600 italic text-xs">No sponsors configured.</span>;
  }

  if (layout === "grid") {
    return (
      <div className="flex flex-wrap justify-center items-center gap-4 py-2">
        {sponsors.map((sp: any, i: number) => (
          <a key={i} href={sp.link || "https://github.com"} target="_blank" rel="noreferrer" className="flex flex-col items-center group cursor-pointer">
            <img src={sp.logo} alt={sp.name} className="w-12 h-12 rounded-full border border-border hover:border-white transition-all object-cover" />
            <span className="text-[9px] text-muted-foreground group-hover:text-white mt-1">{sp.name}</span>
          </a>
        ))}
      </div>
    );
  }

  return (
    <ul className="list-disc pl-5 text-xs text-neutral-300 space-y-1">
      {sponsors.map((sp: any, i: number) => (
        <li key={i}>
          <a href={sp.link || "https://github.com"} target="_blank" rel="noreferrer" className="text-emerald-400 hover:underline">
            {sp.name}
          </a>
        </li>
      ))}
    </ul>
  );
}

// 9. Tech Stack Block Visual
function VisualTechStack({ props }: { props: Record<string, any> }) {
  const { techs = "React, TypeScript, Node.js", layout = "row", iconSize = 40, showLabel = true } = props;
  const techNames = techs.split(",").map((t: string) => t.trim()).filter(Boolean);

  if (techNames.length === 0) {
    return <span className="text-neutral-600 italic text-xs">Empty tech stack.</span>;
  }

  const getIconUrl = (name: string) => {
    const mapped = name.toLowerCase()
      .replace("node.js", "nodejs")
      .replace("nodejs", "nodejs")
      .replace("c++", "cplusplus")
      .replace("c#", "csharp")
      .replace("css3", "css3")
      .replace("html5", "html5")
      .replace("postgresql", "postgresql")
      .replace("sql", "mysql");
    return `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${mapped}/${mapped}-original.svg`;
  };

  return (
    <div className={`flex flex-wrap gap-4 justify-center py-2 ${layout === "grid" ? "max-w-md mx-auto" : ""}`}>
      {techNames.map((tech: string, i: number) => (
        <div key={i} className="flex flex-col items-center gap-1 p-2 bg-neutral-900/50 border border-neutral-850 rounded-lg min-w-[60px]">
          <img src={getIconUrl(tech)} alt={tech} className="object-contain" style={{ width: iconSize, height: iconSize }} onError={(e) => {
            e.currentTarget.src = "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/chrome/chrome-original.svg";
          }} />
          {showLabel && <span className="text-[9px] font-semibold text-neutral-400">{tech}</span>}
        </div>
      ))}
    </div>
  );
}

// 10. Contributors Block Visual
function VisualContributors({ props }: { props: Record<string, any> }) {
  const { repo = "vercel/next.js", maxCount = 12, avatarSize = 48 } = props;
  const [contribs, setContribs] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!repo) return;
    let active = true;

    Promise.resolve().then(() => {
      if (active) setLoading(true);
    });

    fetch(`https://api.github.com/repos/${repo}/contributors?per_page=${maxCount}`)
      .then((res) => {
        if (!res.ok) throw new Error("Rate limit or invalid repo");
        return res.json();
      })
      .then((data) => {
        if (active && Array.isArray(data)) {
          setContribs(data);
        }
      })
      .catch((err) => console.warn(err))
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [repo, maxCount]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-6 text-xs text-neutral-500 gap-2">
        <Users className="w-4 h-4 animate-bounce" /> Loading contributors list...
      </div>
    );
  }

  if (contribs.length === 0) {
    return (
      <div className="flex justify-center items-center py-6 text-xs text-neutral-600 italic">
        Contributors grid for <span className="font-mono text-[10px] ml-1">{repo}</span>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap justify-center items-center gap-3 py-2">
      {contribs.map((user: any, i: number) => (
        <a key={i} href={user.html_url} target="_blank" rel="noreferrer" className="group cursor-pointer" title={user.login}>
          <img 
            src={user.avatar_url} 
            alt={user.login} 
            className="rounded-full border border-border hover:border-emerald-400 hover:scale-105 transition-all"
            style={{ width: avatarSize, height: avatarSize }}
          />
        </a>
      ))}
    </div>
  );
}

// 11. Socials Block Visual
function VisualSocials({ props }: { props: Record<string, any> }) {
  const { items = [], layout = "row" } = props;

  if (items.length === 0) {
    return <span className="text-neutral-600 italic text-xs">No social profiles configured.</span>;
  }

  const platformColors: Record<string, string> = {
    "Twitter/X": "%231DA1F2",
    "LinkedIn": "%230077B5",
    "Discord": "%235865F2",
    "YouTube": "%23FF0000",
    "Dev.to": "%230A0A0A",
    "Portfolio": "%230190FF",
    "Email": "D14836",
    "GitHub": "%23121011"
  };

  const platformLogos: Record<string, string> = {
    "Twitter/X": "x",
    "LinkedIn": "linkedin",
    "Discord": "discord",
    "YouTube": "youtube",
    "Dev.to": "devto",
    "Portfolio": "about.me",
    "Email": "gmail",
    "GitHub": "github"
  };

  return (
    <div className={`flex gap-2 justify-center py-2 ${layout === "column" ? "flex-col items-center" : "flex-wrap items-center"}`}>
      {items.map((item: any, i: number) => {
        const logo = platformLogos[item.platform] || "github";
        const color = platformColors[item.platform] || "%2324292e";
        const imgUrl = `https://img.shields.io/badge/${encodeURIComponent(item.label || item.platform)}-${color}.svg?style=for-the-badge&logo=${logo}&logoColor=white`;
        return (
          <a key={i} href={item.url || "#"} target="_blank" rel="noreferrer" className="hover:scale-[1.02] transition-transform">
            <img src={imgUrl} alt={item.platform} className="h-7" />
          </a>
        );
      })}
    </div>
  );
}

// 12. Roadmap Block Visual (INLINE EDITABLE)
function VisualRoadmap({ props, blockId }: { props: Record<string, any>; blockId: string }) {
  const items = props.items || [];
  const { updateBlock } = useReadmeStore();

  if (items.length === 0) {
    return <span className="text-neutral-600 italic text-xs">Roadmap is empty. Add tasks.</span>;
  }

  const toggleDone = (e: React.MouseEvent, index: number) => {
    e.stopPropagation();
    const newItems = items.map((item: any, idx: number) => {
      if (idx === index) return { ...item, done: !item.done };
      return item;
    });
    updateBlock(blockId, { items: newItems });
  };

  const editItemText = (index: number, val: string) => {
    const newItems = items.map((item: any, idx: number) => {
      if (idx === index) return { ...item, text: val };
      return item;
    });
    updateBlock(blockId, { items: newItems });
  };

  return (
    <div className="space-y-2 py-1 select-text">
      {items.map((item: any, i: number) => (
        <div key={i} className="flex gap-2.5 items-center group/item" onClick={(e) => e.stopPropagation()}>
          <input 
            type="checkbox" 
            checked={item.done} 
            onChange={() => {}} // handled by click
            onClick={(e) => toggleDone(e, i)}
            className="w-4 h-4 rounded border-neutral-700 bg-neutral-900 text-emerald-600 focus:ring-emerald-500 cursor-pointer"
          />
          <input
            value={item.text}
            onChange={(e) => editItemText(i, e.target.value)}
            className={`flex-1 bg-transparent border-0 outline-none text-xs text-neutral-250 py-0.5 px-1 rounded hover:bg-neutral-900/50 focus:bg-neutral-900 focus:ring-1 focus:ring-neutral-750 transition-colors ${
              item.done ? "line-through text-neutral-600" : ""
            }`}
          />
        </div>
      ))}
    </div>
  );
}

// 13. Divider Block Visual
function VisualDivider({ props }: { props: Record<string, any> }) {
  const { style = "line", height = 24, color = "#262626" } = props;

  if (style === "line") {
    return <hr style={{ height: "2px", border: "none", backgroundColor: color, margin: "16px 0" }} />;
  }
  if (style === "dots") {
    return (
      <div 
        className="text-center font-bold text-lg leading-none py-2 tracking-[12px] select-none"
        style={{ color }}
      >
        ••••••••••••
      </div>
    );
  }
  if (style === "space") {
    return <div style={{ height }} />;
  }
  if (style === "wave") {
    return (
      <div className="flex justify-center py-2 select-none">
        <img 
          src={`https://kroppy.github.io/readme-studio-banners/wave.svg?color=${encodeURIComponent(color)}`} 
          alt="Divider Wave" 
          className="w-full object-contain"
        />
      </div>
    );
  }
  return null;
}

// 14. Video Block Visual
function VisualVideo({ props }: { props: Record<string, any> }) {
  const { url = "", caption = "", width = 100, align = "center" } = props;

  if (!url) {
    return <span className="text-neutral-600 italic text-xs">Enter video or GIF URL in settings.</span>;
  }

  const getYoutubeId = (youtubeUrl: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = youtubeUrl.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const ytId = getYoutubeId(url);
  const alignStyles = align === "center" ? "mx-auto text-center" : align === "right" ? "ml-auto text-right" : "mr-auto text-left";

  if (ytId) {
    const thumb = `https://img.youtube.com/vi/${ytId}/maxresdefault.jpg`;
    return (
      <div className={`flex flex-col ${alignStyles}`} style={{ width: `${width}%` }}>
        <a href={url} target="_blank" rel="noreferrer" className="relative group rounded-lg overflow-hidden border border-border shadow-md block">
          <img src={thumb} alt={caption || "Watch video"} className="w-full object-cover" />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/20 transition-colors">
            <div className="p-3 bg-red-600 text-white rounded-full shadow-lg group-hover:scale-110 transition-transform">
              <Play className="w-6 h-6 fill-white" />
            </div>
          </div>
        </a>
        {caption && <span className="text-xs text-muted-foreground mt-2 italic">{caption}</span>}
      </div>
    );
  }

  return (
    <div className={`flex flex-col ${alignStyles}`} style={{ width: `${width}%` }}>
      <img src={url} alt={caption || "Demo video"} className="rounded-lg border border-border" />
      {caption && <span className="text-xs text-muted-foreground mt-2 italic">{caption}</span>}
    </div>
  );
}

// 15. Code Block Visual
function VisualCode({ props }: { props: Record<string, any> }) {
  const { language = "typescript", filename = "", code = "", showLineNumbers = true } = props;
  return (
    <div className="rounded-lg overflow-hidden border border-border bg-[#0d1117] font-mono text-xs">
      {filename && (
        <div className="border-b border-[#21262d] bg-[#161b22] px-4 py-2 text-neutral-400 text-[11px] font-mono select-none">
          {filename}
        </div>
      )}
      <pre className="p-4 overflow-x-auto text-[#c9d1d9] leading-relaxed">
        <code>
          {showLineNumbers ? (
            code.split("\n").map((line: string, i: number) => (
              <span key={i} className="table-row">
                <span className="table-cell text-right pr-4 text-neutral-600 select-none text-[10px] w-6">{i + 1}</span>
                <span className="table-cell select-text text-left">{line || " "}</span>
              </span>
            ))
          ) : (
            <span className="select-text">{code}</span>
          )}
        </code>
      </pre>
    </div>
  );
}

// 16. GitHub Stats Block Visual
function VisualGitHubStats({ props }: { props: Record<string, any> }) {
  const { username = "username", theme = "dark", statsType = "general", showIcons = true, hideRank = false } = props;

  if (!username) {
    return <span className="text-neutral-600 italic text-xs">Set GitHub username in settings.</span>;
  }

  const t = theme.toLowerCase();
  let imgUrl = "";

  switch (statsType) {
    case "general":
      imgUrl = `https://github-readme-stats.vercel.app/api?username=${username}&theme=${t}&show_icons=${showIcons}&hide_rank=${hideRank}`;
      break;
    case "streak":
      imgUrl = `https://streak-stats.demolab.com?user=${username}&theme=${t}`;
      break;
    case "languages":
      imgUrl = `https://github-readme-stats.vercel.app/api/top-langs/?username=${username}&theme=${t}&layout=compact`;
      break;
    case "trophy":
      imgUrl = `https://github-profile-trophy.vercel.app/?username=${username}&theme=${t}`;
      break;
  }

  return (
    <div className="flex justify-center py-2 select-none">
      <img src={imgUrl} alt={`${username} GitHub stats`} className="max-w-full object-contain h-[140px]" onError={(e) => {
        // Fallback mockup stats image URL
        e.currentTarget.src = `https://img.shields.io/badge/github-${username}-blue?style=for-the-badge&logo=github`;
      }} />
    </div>
  );
}

export default function Canvas() {
  const { 
    blocks, 
    selectedBlockIds, 
    selectBlock, 
    reorderBlocks,
    loadTemplate,
    addBlock,
    groupSelectedBlocks,
    deleteSelectedBlocks,
    moveSelectedBlocks,
    duplicateSelectedBlocks
  } = useReadmeStore();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const fromIndex = blocks.findIndex((b) => b.id === active.id);
    const toIndex = blocks.findIndex((b) => b.id === over.id);
    reorderBlocks(fromIndex, toIndex);
  };

  const renderBlockVisual = (block: Block) => {
    switch (block.type) {
      case "header": return <VisualHeader props={block.props} />;
      case "text": return <VisualText props={block.props} />;
      case "badges": return <VisualBadges props={block.props} />;
      case "group": return <VisualGroup props={block.props} />;
      case "chart": return <VisualChart props={block.props} />;
      case "table": return <VisualTable props={block.props} />;
      case "image": return <VisualImage props={block.props} />;
      case "sponsors": return <VisualSponsors props={block.props} />;
      
      // 8 new blocks
      case "techstack": return <VisualTechStack props={block.props} />;
      case "contributors": return <VisualContributors props={block.props} />;
      case "socials": return <VisualSocials props={block.props} />;
      case "roadmap": return <VisualRoadmap props={block.props} blockId={block.id} />;
      case "divider": return <VisualDivider props={block.props} />;
      case "video": return <VisualVideo props={block.props} />;
      case "code": return <VisualCode props={block.props} />;
      case "githubstats": return <VisualGitHubStats props={block.props} />;
      
      default: return null;
    }
  };

  const blockIds = blocks.map((b) => b.id);
  const isMultiSelect = selectedBlockIds.length > 1;

  return (
    <div 
      className="flex-1 bg-background overflow-y-auto p-8 flex flex-col items-center justify-start h-[calc(100vh-64px)] relative"
      onClick={() => selectBlock(null)}
    >
      {/* Floating Multi-Select Toolbar (Requirement 13) */}
      {isMultiSelect && (
        <div className="fixed top-20 z-40 bg-neutral-900 border border-neutral-800 px-4 py-2.5 rounded-xl shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-4 select-none">
          <div className="flex items-center gap-1.5 text-xs text-neutral-300 font-semibold border-r border-border pr-3">
            <Group className="w-4 h-4 text-emerald-400" />
            <span>{selectedBlockIds.length} blocks selected</span>
          </div>
          <div className="flex gap-2">
            <Button size="xs" variant="outline" onClick={groupSelectedBlocks} className="text-xs bg-neutral-950 border-neutral-800 hover:bg-neutral-800">
              Group
            </Button>
            <Button size="xs" variant="outline" onClick={duplicateSelectedBlocks} className="text-xs bg-neutral-950 border-neutral-800 hover:bg-neutral-800">
              Duplicate
            </Button>
            <Button size="xs" variant="outline" onClick={() => moveSelectedBlocks("up")} className="text-xs bg-neutral-950 border-neutral-800 hover:bg-neutral-800 flex items-center">
              <MoveUp className="w-3 h-3 mr-1" /> Up
            </Button>
            <Button size="xs" variant="outline" onClick={() => moveSelectedBlocks("down")} className="text-xs bg-neutral-950 border-neutral-800 hover:bg-neutral-800 flex items-center">
              <MoveDown className="w-3 h-3 mr-1" /> Down
            </Button>
            <Button size="xs" variant="destructive" onClick={deleteSelectedBlocks} className="text-xs flex items-center">
              <Trash2 className="w-3 h-3 mr-1" /> Delete
            </Button>
          </div>
        </div>
      )}

      {/* Canvas Box */}
      <div className="w-full max-w-[760px] bg-neutral-950 border border-neutral-900 rounded-2xl p-8 h-fit shadow-2xl space-y-6">
        {/* Onboarding Empty Canvas State (Requirement 11) */}
        {blocks.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center select-none">
            <div className="p-4 bg-neutral-900 border border-neutral-850 text-emerald-400 rounded-full mb-4">
              <FileText className="w-8 h-8 stroke-[1.5]" />
            </div>
            
            <h2 className="text-lg font-bold text-neutral-200">Start your README</h2>
            <p className="text-xs text-neutral-400 mt-2 max-w-[320px] leading-relaxed">
              Pick a template to get started fast, or add blocks one by one to compose your canvas from scratch.
            </p>

            <div className="flex items-center gap-3 mt-6">
              <Button onClick={() => addBlock("header")} variant="outline" className="text-xs bg-neutral-900 border-neutral-800 text-neutral-300 hover:bg-neutral-850 hover:text-white">
                Add Header Block
              </Button>
            </div>

            {/* Quick-start template pills */}
            <div className="mt-8 pt-6 border-t border-neutral-900 w-full max-w-sm">
              <span className="text-[10px] text-neutral-500 font-bold uppercase tracking-wider block mb-3">Quick-Start Templates</span>
              <div className="flex flex-wrap justify-center gap-2">
                {[
                  { label: "NPM Package", type: "npm-package" },
                  { label: "Personal Profile", type: "profile-readme" },
                  { label: "Web3 Project", type: "web3-solana" },
                  { label: "API Docs", type: "rest-api" }
                ].map((tpl) => (
                  <button
                    key={tpl.type}
                    onClick={() => loadTemplate(tpl.type as any)}
                    className="px-2.5 py-1 text-[10px] font-medium border border-neutral-850 bg-neutral-900/50 hover:bg-neutral-900 rounded-full text-neutral-400 hover:text-white transition-all cursor-pointer"
                  >
                    {tpl.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={blockIds}
              strategy={verticalListSortingStrategy}
            >
              <div className="space-y-4">
                {blocks.map((block) => (
                  <CanvasBlockWrapper key={block.id} block={block}>
                    {renderBlockVisual(block)}
                  </CanvasBlockWrapper>
                ))}
              </div>
            </SortableContext>
          </DndContext>
        )}
      </div>
    </div>
  );
}
