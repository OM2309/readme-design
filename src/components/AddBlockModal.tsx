import React, { useState } from "react";
import { useReadmeStore } from "@/store/readmeStore";
import { BlockType } from "@/store/blockRegistry";
import { blockIcons, blockLabels } from "@/components/LeftSidebar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Search, Plus } from "lucide-react";

interface AddBlockModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddBlockModal({ isOpen, onClose }: AddBlockModalProps) {
  const { addBlock, selectedBlockId, blocks } = useReadmeStore();
  const [searchQuery, setSearchQuery] = useState("");

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
    onClose();
    setSearchQuery("");
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && filteredPalette.length > 0) {
      e.preventDefault();
      handleAddBlock(filteredPalette[0].type);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-xl bg-[#111215] border-[#23252a] text-[#f7f8f8] select-none rounded-xl p-6">
        <DialogHeader className="mb-4">
          <DialogTitle className="flex items-center gap-2 text-xl font-semibold tracking-tight text-white">
            <Plus className="w-5 h-5 text-emerald-400" />
            Add Block
          </DialogTitle>
          <DialogDescription className="text-[#8a8f98] text-sm mt-1.5">
            Select a block to add to your README canvas.
          </DialogDescription>
        </DialogHeader>

        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
          <Input
            placeholder="Search blocks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleSearchKeyDown}
            className="pl-9 h-10 bg-[#191b1f] border-[#23252a] focus-visible:ring-1 focus-visible:ring-emerald-500/50 rounded-lg text-sm text-white"
            autoFocus
          />
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 max-h-[400px] overflow-y-auto pr-2">
          {filteredPalette.map((item) => {
            const Icon = item.icon;
            const isMatch = searchQuery.trim() !== "" && (
              item.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
              item.type.toLowerCase().includes(searchQuery.toLowerCase())
            );
            return (
              <button
                key={item.type}
                onClick={() => handleAddBlock(item.type)}
                className={`flex flex-col items-center justify-center p-3 rounded-xl border text-center group cursor-pointer transition-all gap-2 ${
                  isMatch
                    ? "border-emerald-500/60 bg-emerald-950/20 text-white shadow-[0_0_6px_rgba(16,185,129,0.3)] animate-pulse"
                    : "border-[#23252a] bg-[#191b1f] hover:bg-[#22242a] hover:border-neutral-600 text-neutral-400 hover:text-white"
                }`}
              >
                <div className={`p-2 rounded-lg transition-colors ${
                  isMatch ? "bg-emerald-900/40 text-emerald-300" : "bg-[#111215] group-hover:bg-[#191b1f]"
                }`}>
                  <Icon className="w-5 h-5 shrink-0" />
                </div>
                <span className="text-xs font-medium leading-tight">{item.label}</span>
              </button>
            );
          })}
          {filteredPalette.length === 0 && (
            <div className="col-span-full py-8 text-center text-sm text-neutral-500">
              No blocks found for "{searchQuery}".
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
