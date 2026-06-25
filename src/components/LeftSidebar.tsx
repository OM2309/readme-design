import React, { useState } from "react";
import { useReadmeStore } from "@/store/readmeStore";
import { Block, BlockType } from "@/store/blockRegistry";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { 
  Heading, 
  AlignLeft, 
  Award, 
  Folder, 
  TrendingUp, 
  Table, 
  Image, 
  Heart,
  GripVertical,
  Plus,
  Cpu,
  Users,
  Share2,
  CheckSquare,
  Minus,
  Play,
  Code2,
  BarChart2,
  StickyNote,
  FileText
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

// Icon mapping per block type (all 16 blocks)
export const blockIcons: Record<BlockType, React.ComponentType<any>> = {
  header: Heading,
  text: AlignLeft,
  badges: Award,
  group: Folder,
  chart: BarChart2,
  table: Table,
  image: Image,
  sponsors: Heart,
  techstack: Cpu,
  contributors: Users,
  socials: Share2,
  roadmap: CheckSquare,
  divider: Minus,
  video: Play,
  code: Code2,
  githubstats: TrendingUp,
};

// Friendly labels for each block type (all 16 blocks)
export const blockLabels: Record<BlockType, string> = {
  header: "Header",
  text: "Text / Markdown",
  badges: "Badges",
  group: "Group",
  chart: "Star Chart",
  table: "Table",
  image: "Image",
  sponsors: "Sponsors Grid",
  techstack: "Tech Stack",
  contributors: "Contributors",
  socials: "Social Badges",
  roadmap: "Checklist",
  divider: "Divider",
  video: "Video / GIF",
  code: "Code Snippet",
  githubstats: "GitHub Stats",
};

interface SortableLayerItemProps {
  block: Block;
  isSelected: boolean;
  onSelect: (e: React.MouseEvent) => void;
}

function SortableLayerItem({ block, isSelected, onSelect }: SortableLayerItemProps) {
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
    opacity: isDragging ? 0.4 : 1,
  };

  const Icon = blockIcons[block.type] || AlignLeft;
  
  let displayName = blockLabels[block.type];
  if (block.type === "header" && block.props.title) {
    displayName = block.props.title;
  } else if (block.type === "text" && block.props.content) {
    const firstLine = block.props.content.trim().split("\n")[0] || "";
    displayName = firstLine.replace(/[#*`[\]]/g, "").slice(0, 18) || "Markdown Text";
  } else if (block.type === "badges" && block.props.packageName) {
    displayName = `Badges: ${block.props.packageName}`;
  } else if (block.type === "chart" && block.props.repo) {
    displayName = `Chart: ${block.props.repo.split("/")[1] || block.props.repo}`;
  } else if (block.type === "group" && block.props.title) {
    displayName = block.props.title;
  } else if (block.type === "image" && block.props.caption) {
    displayName = `Image: ${block.props.caption}`;
  } else if (block.type === "techstack" && block.props.techs) {
    displayName = `Stack: ${block.props.techs.split(",")[0] || "Tech"}`;
  } else if (block.type === "contributors" && block.props.repo) {
    displayName = `Contribs: ${block.props.repo.split("/")[1] || "Repo"}`;
  } else if (block.type === "roadmap" && block.props.items) {
    displayName = `Roadmap (${block.props.items.length})`;
  } else if (block.type === "divider") {
    displayName = `Divider: ${block.props.style}`;
  } else if (block.type === "code" && block.props.filename) {
    displayName = block.props.filename;
  } else if (block.type === "githubstats" && block.props.username) {
    displayName = `@${block.props.username} Stats`;
  }

  const isNested = !!block.parentId;

  return (
    <div
      ref={setNodeRef}
      style={style}
      onClick={onSelect}
      className={`group flex items-center justify-between gap-1.5 px-2 py-1.5 rounded-md cursor-pointer transition-all border text-xs select-none ${
        isNested ? "ml-5 bg-background/50 border-dashed border-neutral-800" : "bg-card border-border"
      } ${
        isSelected 
          ? "border-white bg-neutral-900 text-white" 
          : "border-transparent text-muted-foreground hover:text-foreground hover:bg-neutral-900/50"
      }`}
    >
      <div className="flex items-center gap-2 min-w-0 flex-1">
        <button
          {...attributes}
          {...listeners}
          className="cursor-grab active:cursor-grabbing text-neutral-600 hover:text-neutral-300 p-0.5 rounded group-hover:opacity-100 transition-opacity"
        >
          <GripVertical className="w-3.5 h-3.5" />
        </button>
        
        <Icon className={`w-3.5 h-3.5 shrink-0 ${isSelected ? "text-white" : "text-neutral-500"}`} />
        <span className="truncate font-medium">{displayName}</span>
      </div>

      {/* Note indicator icon */}
      {block._note && block._note.trim() !== "" && (
        <span title="Has sticky comment note">
          <StickyNote className="w-3.5 h-3.5 text-yellow-500/80 shrink-0" />
        </span>
      )}
    </div>
  );
}

export default function LeftSidebar() {
  const { 
    blocks, 
    selectedBlockId, 
    selectedBlockIds,
    addBlock, 
    selectBlock,
    toggleMultiSelectBlock,
    reorderBlocks 
  } = useReadmeStore();

  const [filterNotesOnly, setFilterNotesOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

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

  const paletteItems: { type: BlockType; label: string; icon: React.ComponentType<any> }[] = [
    { type: "header", label: "Header", icon: Heading },
    { type: "text", label: "Text", icon: AlignLeft },
    { type: "badges", label: "Badges", icon: Award },
    { type: "group", label: "Group", icon: Folder },
    { type: "chart", label: "Chart", icon: BarChart2 },
    { type: "table", label: "Table", icon: Table },
    { type: "image", label: "Image", icon: Image },
    { type: "sponsors", label: "Sponsors", icon: Heart },
    { type: "techstack", label: "Tech Stack", icon: Cpu },
    { type: "contributors", label: "Contribs", icon: Users },
    { type: "socials", label: "Socials", icon: Share2 },
    { type: "roadmap", label: "Roadmap", icon: CheckSquare },
    { type: "divider", label: "Divider", icon: Minus },
    { type: "video", label: "Video/GIF", icon: Play },
    { type: "code", label: "Code Snippet", icon: Code2 },
    { type: "githubstats", label: "GH Stats", icon: TrendingUp },
  ];

  const handleAddBlock = (type: BlockType) => {
    const selectedBlock = blocks.find((b) => b.id === selectedBlockId);
    const parentId = selectedBlock?.type === "group" ? selectedBlock.id : selectedBlock?.parentId;
    addBlock(type, parentId);
  };

  const handleSelectBlock = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (e.shiftKey) {
      toggleMultiSelectBlock(id);
    } else {
      selectBlock(id);
    }
  };

  const filteredPalette = paletteItems.filter(item => 
    item.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && filteredPalette.length > 0) {
      e.preventDefault();
      handleAddBlock(filteredPalette[0].type);
      setSearchQuery("");
      toast.success(`Added ${filteredPalette[0].label} block!`);
    }
  };

  // Filter blocks if notes-only is toggled
  const filteredBlocks = filterNotesOnly 
    ? blocks.filter(b => b._note && b._note.trim() !== "")
    : blocks;

  const blockIds = filteredBlocks.map((b) => b.id);

  return (
    <aside className="w-[200px] border-r border-border bg-panel flex flex-col h-[calc(100vh-64px)] select-none">
      {/* Top Section: Add Block Palette */}
      <div className="p-3 border-b border-border">
        <h3 className="text-[10px] font-bold text-neutral-400 tracking-wider uppercase mb-2">
          Add Block
        </h3>

        {/* Block Search Input */}
        <Input
          placeholder="Search / Quick Add..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleSearchKeyDown}
          className="h-7 text-[10px] bg-neutral-900 border-neutral-850 px-2 py-1 mb-2 placeholder-neutral-500 focus-visible:ring-1 focus-visible:ring-indigo-500/50"
        />

        <div className="grid grid-cols-2 gap-1.5 max-h-[190px] overflow-y-auto pr-1">
          {filteredPalette.map((item) => {
            const Icon = item.icon;
            const isMatch = searchQuery.trim() !== "" && (
              item.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
              item.type.toLowerCase().includes(searchQuery.toLowerCase())
            );
            return (
              <button
                key={item.type}
                onClick={() => {
                  handleAddBlock(item.type);
                  if (searchQuery.trim() !== "") {
                    setSearchQuery("");
                  }
                }}
                className={`flex flex-col items-center justify-center p-2 rounded-lg border text-center group cursor-pointer transition-all gap-1 ${
                  isMatch
                    ? "border-indigo-500/60 bg-indigo-950/20 text-white shadow-[0_0_6px_rgba(99,102,241,0.3)] animate-pulse"
                    : "border-border bg-card hover:bg-neutral-900 hover:border-neutral-700 text-neutral-400 hover:text-white"
                }`}
              >
                <div className={`p-1 rounded transition-colors ${
                  isMatch ? "bg-indigo-900/40 text-indigo-300" : "bg-neutral-900 group-hover:bg-neutral-800"
                }`}>
                  <Icon className="w-3.5 h-3.5 shrink-0" />
                </div>
                <span className="text-[9px] font-semibold leading-tight">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom Section: Layers Panel */}
      <div className="flex-1 flex flex-col min-h-0 p-3">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-[10px] font-bold text-neutral-400 tracking-wider uppercase">
            Layers
          </h3>
          <button
            onClick={() => setFilterNotesOnly(!filterNotesOnly)}
            className={`p-1 rounded transition-colors ${
              filterNotesOnly 
                ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30" 
                : "text-neutral-500 hover:text-neutral-300"
            }`}
            title={filterNotesOnly ? "Showing blocks with notes. Click to show all." : "Filter layers by sticky notes"}
          >
            <StickyNote className="w-3.5 h-3.5" />
          </button>
        </div>
        
        {filteredBlocks.length === 0 ? (
          <div className="flex-1 flex items-center justify-center border border-dashed border-border rounded-lg text-[10px] text-muted-foreground p-3 text-center">
            {filterNotesOnly ? "No blocks have comments." : "No blocks added. Add above!"}
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto pr-1">
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={blockIds}
                strategy={verticalListSortingStrategy}
              >
                <div className="space-y-1.5">
                  {filteredBlocks.map((block) => (
                    <SortableLayerItem
                      key={block.id}
                      block={block}
                      isSelected={selectedBlockIds.includes(block.id)}
                      onSelect={(e) => handleSelectBlock(e, block.id)}
                    />
                  ))}
                </div>
              </SortableContext>
            </DndContext>
          </div>
        )}
      </div>
    </aside>
  );
}
