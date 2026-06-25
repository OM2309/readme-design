import React from "react";
import { useReadmeStore, Block } from "@/store/readmeStore";
import { 
  Trash2, 
  Copy, 
  GripVertical, 
  FolderPlus,
  FolderOpen
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

// Individual Block Canvas Renderer
interface CanvasBlockWrapperProps {
  block: Block;
  children: React.ReactNode;
}

function CanvasBlockWrapper({ block, children }: CanvasBlockWrapperProps) {
  const { 
    selectedBlockId, 
    selectBlock, 
    removeBlock, 
    duplicateBlock 
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

  const isSelected = selectedBlockId === block.id;
  const isNested = !!block.parentId;

  const handleDuplicate = (e: React.MouseEvent) => {
    e.stopPropagation();
    duplicateBlock(block.id);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    removeBlock(block.id);
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      onClick={(e) => {
        e.stopPropagation();
        selectBlock(block.id);
      }}
      className={`group relative border rounded-xl transition-all duration-200 ${
        isNested ? "ml-6 border-dashed border-neutral-800" : "border-transparent"
      } ${
        isSelected 
          ? "ring-2 ring-white/80 border-white/50 bg-neutral-900/40" 
          : "hover:border-neutral-800 hover:bg-neutral-950/20"
      }`}
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
        <span className="text-[10px] text-neutral-400 px-1.5 font-mono select-none">
          {blockLabels[block.type]}
        </span>
        <button
          onClick={handleDuplicate}
          className="p-1 text-neutral-400 hover:text-white hover:bg-neutral-900 rounded-md transition-colors"
          title="Duplicate Block"
        >
          <Copy className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={handleDelete}
          className="p-1 text-red-400 hover:text-red-300 hover:bg-red-950/40 rounded-md transition-colors"
          title="Delete Block"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Block Body Content */}
      <div className="p-5">{children}</div>
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
      {/* Background glassmorphism overlay for gradient/solid styling */}
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

      {props.border && (
        <div className="w-full h-[1px] bg-border mt-6 relative z-10" />
      )}

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
        <span className="text-neutral-600 italic text-xs">Empty text block. Click to configure markdown content.</span>
      )}
    </div>
  );
}

// 3. Badges Block Visual
function VisualBadges({ props }: { props: Record<string, any> }) {
  const { packageName = "readme-studio", githubRepo = "username/repo", badgeList = [], badgeStyle = "flat" } = props;

  if (badgeList.length === 0) {
    return <span className="text-neutral-600 italic text-xs">No badges enabled. Enable some in the settings panel!</span>;
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
        <a 
          key={i} 
          href={badge.url} 
          target="_blank" 
          rel="noreferrer" 
          className="hover:scale-[1.03] transition-transform"
        >
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
      <FolderOpen className="w-4 h-4 text-indigo-400" />
      <span className="text-xs font-semibold text-neutral-300 uppercase tracking-wider">
        {props.title || "Group Container"}
      </span>
      <span className="text-[10px] text-neutral-500 italic">
        (Blocks indented below are nested inside this container)
      </span>
    </div>
  );
}

// 5. Chart Block Visual
function VisualChart({ props }: { props: Record<string, any> }) {
  const repo = props.repo || "facebook/react";
  const theme = props.theme || "dark";
  const isDark = theme === "dark";

  // The actual star-history svg chart url
  const chartUrl = `https://api.star-history.com/svg?repos=${repo}&type=Date`;

  return (
    <div className="flex flex-col items-center gap-2 bg-neutral-950 p-4 border border-border rounded-lg">
      <div className="text-xs font-medium text-neutral-400 self-start">
        GitHub Star History: <span className="text-neutral-200 font-mono">{repo}</span>
      </div>
      <div className="w-full flex items-center justify-center p-2 rounded bg-neutral-900 border border-neutral-800 overflow-x-auto">
        <img 
          src={chartUrl} 
          alt="GitHub Star History Chart" 
          className="max-h-[300px] object-contain invert-0 brightness-100" 
          loading="lazy"
        />
      </div>
    </div>
  );
}

// 6. Table Block Visual
function VisualTable({ props }: { props: Record<string, any> }) {
  const headers = props.headers || [];
  const rows = props.rows || [];

  if (headers.length === 0) {
    return <span className="text-neutral-600 italic text-xs">Table is empty. Add headers/rows in settings.</span>;
  }

  return (
    <div className="overflow-x-auto border border-border rounded-lg bg-neutral-950/40">
      <table className="w-full border-collapse text-left text-xs">
        <thead>
          <tr className="border-b border-border bg-neutral-900/60">
            {headers.map((header: string, idx: number) => (
              <th key={idx} className="p-3 font-semibold text-neutral-200 border-r border-border last:border-r-0">
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
      {caption && (
        <span className="text-xs text-muted-foreground mt-2 italic">{caption}</span>
      )}
    </div>
  );
}

// 8. Sponsors Block Visual
function VisualSponsors({ props }: { props: Record<string, any> }) {
  const sponsors = props.sponsors || [];
  const layout = props.layout || "grid";

  if (sponsors.length === 0) {
    return <span className="text-neutral-600 italic text-xs">No sponsors configured. Add some in settings!</span>;
  }

  if (layout === "grid") {
    return (
      <div className="flex flex-col gap-2">
        <div className="text-xs text-neutral-400 font-semibold uppercase tracking-wider text-center">
          Sponsors
        </div>
        <div className="flex flex-wrap justify-center items-center gap-4 py-4">
          {sponsors.map((sp: any, i: number) => (
            <a 
              key={i} 
              href={sp.link || "https://github.com"} 
              target="_blank" 
              rel="noreferrer"
              className="flex flex-col items-center group cursor-pointer"
            >
              <img 
                src={sp.logo} 
                alt={sp.name} 
                className="w-14 h-14 rounded-full border border-border hover:border-white transition-all object-cover shadow-sm hover:scale-105" 
              />
              <span className="text-[10px] text-muted-foreground group-hover:text-white mt-1.5 transition-colors">
                {sp.name}
              </span>
            </a>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="text-xs text-neutral-400 font-semibold uppercase tracking-wider">
        Sponsors List
      </div>
      <ul className="list-disc pl-5 text-xs text-neutral-300 space-y-1">
        {sponsors.map((sp: any, i: number) => (
          <li key={i}>
            <a href={sp.link || "https://github.com"} target="_blank" rel="noreferrer" className="text-indigo-400 hover:underline font-medium">
              {sp.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Canvas() {
  const { blocks, selectedBlockId, selectBlock, reorderBlocks } = useReadmeStore();

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
      case "header":
        return <VisualHeader props={block.props} />;
      case "text":
        return <VisualText props={block.props} />;
      case "badges":
        return <VisualBadges props={block.props} />;
      case "group":
        return <VisualGroup props={block.props} />;
      case "chart":
        return <VisualChart props={block.props} />;
      case "table":
        return <VisualTable props={block.props} />;
      case "image":
        return <VisualImage props={block.props} />;
      case "sponsors":
        return <VisualSponsors props={block.props} />;
      default:
        return null;
    }
  };

  const blockIds = blocks.map((b) => b.id);

  return (
    <div 
      className="flex-1 bg-background overflow-y-auto p-8 flex justify-center h-[calc(100vh-64px)]"
      onClick={() => selectBlock(null)}
    >
      <div className="w-full max-w-[760px] bg-neutral-950 border border-neutral-900 rounded-2xl p-8 h-fit shadow-2xl space-y-6">
        {blocks.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center border-2 border-dashed border-neutral-800 rounded-xl">
            <span className="text-sm font-semibold text-neutral-400">Your Canvas is empty</span>
            <span className="text-xs text-neutral-600 mt-1 max-w-[280px]">
              Add content blocks from the Left Sidebar palette to start building your README.
            </span>
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
