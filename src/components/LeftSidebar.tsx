import React, { useState } from "react";
import { useReadmeStore } from "@/store/readmeStore";
import { Block, BlockType } from "@/store/blockRegistry";
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
  Cpu,
  Users,
  Share2,
  CheckSquare,
  Minus,
  Play,
  Code2,
  BarChart2,
  StickyNote,
  Search,
  Layers,
  LayoutGrid
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

// Icon mapping per block type
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

// Friendly labels for each block type
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
      className={`group flex items-center justify-between gap-2 px-3 py-2 rounded-lg cursor-pointer transition-all border text-xs select-none ${
        isNested ? "ml-5 bg-[#111215]/50 border-dashed border-[#23252a]" : "bg-[#191b1f] border-transparent"
      } ${
        isSelected 
          ? "border-indigo-500/50 bg-indigo-500/10 text-white" 
          : "hover:bg-[#23252a] text-[#8a8f98] hover:text-[#f7f8f8]"
      }`}
    >
      <div className="flex items-center gap-2.5 min-w-0 flex-1">
        <button
          {...attributes}
          {...listeners}
          className="cursor-grab active:cursor-grabbing text-neutral-600 hover:text-neutral-300 p-0.5 rounded group-hover:opacity-100 transition-opacity"
        >
          <GripVertical className="w-3.5 h-3.5" />
        </button>
        
        <Icon className={`w-3.5 h-3.5 shrink-0 ${isSelected ? "text-indigo-400" : "text-neutral-500"}`} />
        <span className="truncate font-medium">{displayName}</span>
      </div>

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
      activationConstraint: { distance: 8 },
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

  const handleSelectBlock = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (e.shiftKey) {
      toggleMultiSelectBlock(id);
    } else {
      selectBlock(id);
    }
  };

  const filteredBlocks = filterNotesOnly 
    ? blocks.filter(b => b._note && b._note.trim() !== "")
    : blocks;
  const blockIds = filteredBlocks.map((b) => b.id);

  const paletteItems: { type: BlockType; label: string; icon: React.ComponentType<any> }[] = Object.keys(blockLabels).map((key) => ({
    type: key as BlockType,
    label: blockLabels[key as BlockType],
    icon: blockIcons[key as BlockType],
  }));

  const filteredPalette = paletteItems.filter(item => 
    item.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddBlock = (type: BlockType) => {
    const selectedBlock = blocks.find((b) => b.id === selectedBlockId);
    const parentId = selectedBlock?.type === "group" ? selectedBlock.id : selectedBlock?.parentId;
    addBlock(type, parentId);
    toast.success(`Added ${blockLabels[type]} block!`);
  };

  return (
    <aside className="flex h-[calc(100vh-64px)] select-none border-r border-[#23252a] shrink-0">
      
      {/* 1st Column: Add Block Menu (Darker, slimmer) */}
      <div className="w-[200px] bg-[#0c0d0f] border-r border-[#23252a] flex flex-col">
        <div className="p-4 pb-2">
          <div className="flex items-center gap-2 text-white font-semibold mb-4 text-sm tracking-tight">
            <LayoutGrid className="w-4 h-4 text-indigo-400" />
            Add Block
          </div>
          <div className="relative mb-3">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-neutral-500" />
            <input
              type="text"
              placeholder="Search blocks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#191b1f] border border-[#23252a] rounded-md h-8 pl-8 pr-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-indigo-500/50 transition-colors"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-2 pb-4 space-y-0.5 custom-scrollbar">
          {filteredPalette.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.type}
                onClick={() => handleAddBlock(item.type)}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-[#8a8f98] hover:text-white hover:bg-[#191b1f] transition-all text-left group"
              >
                <Icon className="w-4 h-4 shrink-0 text-neutral-500 group-hover:text-indigo-400 transition-colors" />
                <span className="text-xs font-medium truncate">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2nd Column: Layers Panel (Lighter, wider) */}
      <div className="w-[240px] bg-[#111215] flex flex-col">
        <div className="p-4 pb-3 flex items-center justify-between border-b border-[#23252a]">
          <div className="flex items-center gap-2 text-white font-semibold text-sm tracking-tight">
            <Layers className="w-4 h-4 text-indigo-400" />
            Layers
          </div>
          <button
            onClick={() => setFilterNotesOnly(!filterNotesOnly)}
            className={`p-1.5 rounded-md transition-colors ${
              filterNotesOnly 
                ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30" 
                : "text-neutral-500 hover:text-neutral-300 hover:bg-[#191b1f]"
            }`}
            title="Filter by sticky notes"
          >
            <StickyNote className="w-3.5 h-3.5" />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-3 custom-scrollbar">
          {filteredBlocks.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-4 border border-dashed border-[#23252a] rounded-lg">
              <Layers className="w-8 h-8 text-neutral-700 mb-2" />
              <p className="text-xs text-[#8a8f98]">
                {filterNotesOnly ? "No blocks have comments." : "Your canvas is empty. Add a block from the left menu."}
              </p>
            </div>
          ) : (
            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
              <SortableContext items={blockIds} strategy={verticalListSortingStrategy}>
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
          )}
        </div>
      </div>

    </aside>
  );
}
