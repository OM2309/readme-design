import React from "react";
import { useReadmeStore, BlockType, Block } from "@/store/readmeStore";
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
  Plus
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
  arrayMove,
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
  chart: TrendingUp,
  table: Table,
  image: Image,
  sponsors: Heart,
};

// Friendly labels for each block type
export const blockLabels: Record<BlockType, string> = {
  header: "Header",
  text: "Text / Markdown",
  badges: "Badges",
  group: "Group Container",
  chart: "Star Chart",
  table: "Table",
  image: "Image",
  sponsors: "Sponsors Grid",
};

interface SortableLayerItemProps {
  block: Block;
  isSelected: boolean;
  onSelect: () => void;
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
  
  // Custom display name based on properties
  let displayName = blockLabels[block.type];
  if (block.type === "header" && block.props.title) {
    displayName = block.props.title;
  } else if (block.type === "text" && block.props.content) {
    // Truncate first line
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
        {/* Drag handle */}
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
    </div>
  );
}

export default function LeftSidebar() {
  const { 
    blocks, 
    selectedBlockId, 
    addBlock, 
    selectBlock,
    reorderBlocks 
  } = useReadmeStore();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8, // Require dragging a bit to avoid accidental triggers on click
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

    // Reorder globally
    const fromBlock = blocks[fromIndex];
    const toBlock = blocks[toIndex];
    
    // We should maintain parent-child grouping. If moving a child block, it keeps its parentId.
    // However, if we move it next to a root-level block, let's keep it simple and just do the array move.
    // If moving a block, we can use arrayMove in store.
    reorderBlocks(fromIndex, toIndex);
  };

  const paletteItems: { type: BlockType; label: string; icon: React.ComponentType<any> }[] = [
    { type: "header", label: "Header", icon: Heading },
    { type: "text", label: "Text", icon: AlignLeft },
    { type: "badges", label: "Badges", icon: Award },
    { type: "group", label: "Group", icon: Folder },
    { type: "chart", label: "Chart", icon: TrendingUp },
    { type: "table", label: "Table", icon: Table },
    { type: "image", label: "Image", icon: Image },
    { type: "sponsors", label: "Sponsors", icon: Heart },
  ];

  // Helper to handle add block
  const handleAddBlock = (type: BlockType) => {
    // If we have a group block selected, let's add it to that group
    const selectedBlock = blocks.find((b) => b.id === selectedBlockId);
    const parentId = selectedBlock?.type === "group" ? selectedBlock.id : selectedBlock?.parentId;
    addBlock(type, parentId);
  };

  // We want to render blocks in the layer panel.
  // To make sure it matches the layout, we can render them in their layout order.
  // Since blocks are in a flat list, we can just render the flat list in SortableContext.
  const blockIds = blocks.map((b) => b.id);

  return (
    <aside className="w-[200px] border-r border-border bg-panel flex flex-col h-[calc(100vh-64px)] select-none">
      {/* Top Section: Add Block Palette */}
      <div className="p-4 border-b border-border">
        <h3 className="text-xs font-semibold text-neutral-400 tracking-wider uppercase mb-3">
          Add Block
        </h3>
        <div className="grid grid-cols-2 gap-2">
          {paletteItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.type}
                onClick={() => handleAddBlock(item.type)}
                className="flex flex-col items-center justify-center p-2.5 rounded-lg border border-border bg-card hover:bg-neutral-900 hover:border-neutral-700 text-neutral-400 hover:text-white transition-all gap-1.5 text-center group cursor-pointer"
              >
                <div className="p-1 rounded-md bg-neutral-900 group-hover:bg-neutral-800 transition-colors">
                  <Icon className="w-4 h-4 shrink-0" />
                </div>
                <span className="text-[10px] font-medium leading-tight">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom Section: Layers Panel */}
      <div className="flex-1 flex flex-col min-h-0 p-4">
        <h3 className="text-xs font-semibold text-neutral-400 tracking-wider uppercase mb-3">
          Layers
        </h3>
        
        {blocks.length === 0 ? (
          <div className="flex-1 flex items-center justify-center border border-dashed border-border rounded-lg text-[11px] text-muted-foreground p-4 text-center">
            No blocks added yet. Click above to add!
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
                <div className="space-y-2">
                  {blocks.map((block) => (
                    <SortableLayerItem
                      key={block.id}
                      block={block}
                      isSelected={selectedBlockId === block.id}
                      onSelect={() => selectBlock(block.id)}
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
