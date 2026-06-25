import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  Download, 
  Loader2, 
  Image as ImageIcon,
  Check
} from "lucide-react";
import { toPng } from "html-to-image";
import { toast } from "sonner";

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ExportModal({ isOpen, onClose }: ExportModalProps) {
  const [width, setWidth] = useState("1200");
  const [scale, setScale] = useState("1");
  const [bg, setBg] = useState("dark");
  const [exporting, setExporting] = useState(false);

  const handleExport = async () => {
    // Select the center canvas element
    const canvasElement = document.querySelector(".max-w-\\[760px\\]") as HTMLElement;
    
    if (!canvasElement) {
      toast.error("Canvas element not found.");
      return;
    }

    setExporting(true);
    toast.info("Generating PNG image...", { duration: 1500 });

    try {
      // Determine background color in options
      let bgColor = "transparent";
      if (bg === "white") bgColor = "#ffffff";
      if (bg === "dark") bgColor = "#0a0a0a";

      const dataUrl = await toPng(canvasElement, {
        pixelRatio: Number(scale),
        backgroundColor: bgColor,
        style: {
          width: `${width}px`,
          margin: "0 auto",
        },
        cacheBust: true,
      });

      // Trigger download
      const link = document.createElement("a");
      link.download = "readme-preview.png";
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast.success("Image exported successfully!");
      onClose();
    } catch (error: any) {
      console.error("Export failed:", error);
      toast.error("Failed to generate image. Please try again.");
    } finally {
      setExporting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-sm bg-panel border-neutral-800 text-foreground select-none">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-base font-bold">
            <ImageIcon className="w-5 h-5 text-emerald-400" />
            Export Canvas as Image
          </DialogTitle>
          <DialogDescription className="text-[11px] text-neutral-400">
            Convert your visual README preview into a high-quality PNG image for documentation or repositories.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2 text-xs">
          {/* Width */}
          <div className="space-y-1.5">
            <Label className="text-muted-foreground">Image Width</Label>
            <Select value={width} onValueChange={(val) => setWidth(val || "1200")}>
              <SelectTrigger className="h-8 text-xs bg-neutral-900 border-neutral-800">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-panel border-neutral-800 text-xs">
                <SelectItem value="800">800 px (Compact)</SelectItem>
                <SelectItem value="1200">1200 px (Standard / OG)</SelectItem>
                <SelectItem value="1600">1600 px (Wide)</SelectItem>
                <SelectItem value="2400">2400 px (Ultra-wide)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Scale */}
          <div className="space-y-1.5">
            <Label className="text-muted-foreground">Resolution Scale (Device Pixel Ratio)</Label>
            <Select value={scale} onValueChange={(val) => setScale(val || "1")}>
              <SelectTrigger className="h-8 text-xs bg-neutral-900 border-neutral-800">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-panel border-neutral-800 text-xs">
                <SelectItem value="1">1x (Standard)</SelectItem>
                <SelectItem value="2">2x (Retina / Sharp)</SelectItem>
                <SelectItem value="3">3x (High Definition)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Background color */}
          <div className="space-y-1.5">
            <Label className="text-muted-foreground">Background Color fill</Label>
            <Select value={bg} onValueChange={(val) => setBg(val || "dark")}>
              <SelectTrigger className="h-8 text-xs bg-neutral-900 border-neutral-800">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-panel border-neutral-800 text-xs">
                <SelectItem value="dark">Dark Theme Background (#0a0a0a)</SelectItem>
                <SelectItem value="white">White Theme Background (#ffffff)</SelectItem>
                <SelectItem value="transparent">Transparent Background</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button onClick={handleExport} disabled={exporting} className="w-full h-8 text-xs bg-emerald-400 hover:bg-emerald-400/90 text-emerald-950 flex items-center justify-center gap-1.5 mt-2">
            {exporting ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" /> Rendering layout...
              </>
            ) : (
              <>
                <Download className="w-3.5 h-3.5" /> Export PNG Image
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
