import React from "react";
import { useReadmeStore } from "@/store/readmeStore";
import { Block, BlockType } from "@/store/blockRegistry";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { 
  Plus, 
  Trash2, 
  Sparkles,
  Bold,
  Italic,
  Heading1,
  Heading2,
  Code as CodeIcon,
  Link2,
  Table as TableIcon,
  List,
  CheckSquare,
  StickyNote
} from "lucide-react";
import Editor from "@monaco-editor/react";

const RANDOM_COVERS = [
  "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=800&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=800&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=60",
];

const BLOCK_FRIENDLY_NAMES: Record<BlockType, string> = {
  header: "Header",
  text: "Text / Markdown",
  badges: "Badges",
  group: "Group Container",
  chart: "Star History",
  table: "Markdown Table",
  image: "Image Canvas",
  sponsors: "Sponsors Grid",
  techstack: "Tech Stack",
  contributors: "Contributors List",
  socials: "Social Badges",
  roadmap: "Checklist / Roadmap",
  divider: "Visual Divider",
  video: "Video / GIF Player",
  code: "Code Snippet",
  githubstats: "GitHub Stats Card"
};

export default function RightSidebar() {
  const { blocks, selectedBlockId, updateBlock, updateBlockNote } = useReadmeStore();
  const selectedBlock = blocks.find((b) => b.id === selectedBlockId);

  if (!selectedBlock) {
    return (
      <aside className="w-[280px] border-l border-border bg-panel flex flex-col items-center justify-center p-6 text-center select-none h-[calc(100vh-64px)]">
        <span className="text-xs text-neutral-500 font-medium">No Block Selected</span>
        <p className="text-[11px] text-neutral-600 mt-2 max-w-[180px]">
          Click on any block in the canvas or layers panel to edit its settings.
        </p>
      </aside>
    );
  }

  const handleUpdate = (props: Record<string, any>) => {
    updateBlock(selectedBlock.id, props);
  };

  const handleNoteChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateBlockNote(selectedBlock.id, e.target.value);
  };

  return (
    <aside className="w-[280px] border-l border-border bg-panel flex flex-col h-[calc(100vh-64px)] justify-between select-none">
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 border-b border-border bg-panel sticky top-0 z-10 flex items-center justify-between">
          <h3 className="text-xs font-semibold text-neutral-400 tracking-wider uppercase">
            Block Properties
          </h3>
          <span className="text-[10px] text-emerald-400 font-mono bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
            {BLOCK_FRIENDLY_NAMES[selectedBlock.type]}
          </span>
        </div>

        <div className="p-4 space-y-5">
          {selectedBlock.type === "header" && (
            <HeaderSettings props={selectedBlock.props} onUpdate={handleUpdate} />
          )}
          {selectedBlock.type === "text" && (
            <TextSettings props={selectedBlock.props} onUpdate={handleUpdate} />
          )}
          {selectedBlock.type === "badges" && (
            <BadgesSettings props={selectedBlock.props} onUpdate={handleUpdate} />
          )}
          {selectedBlock.type === "group" && (
            <GroupSettings props={selectedBlock.props} onUpdate={handleUpdate} />
          )}
          {selectedBlock.type === "chart" && (
            <ChartSettings props={selectedBlock.props} onUpdate={handleUpdate} />
          )}
          {selectedBlock.type === "table" && (
            <TableSettings props={selectedBlock.props} onUpdate={handleUpdate} />
          )}
          {selectedBlock.type === "image" && (
            <ImageSettings props={selectedBlock.props} onUpdate={handleUpdate} />
          )}
          {selectedBlock.type === "sponsors" && (
            <SponsorsSettings props={selectedBlock.props} onUpdate={handleUpdate} />
          )}
          
          {/* 8 New Blocks Forms */}
          {selectedBlock.type === "techstack" && (
            <TechStackSettings props={selectedBlock.props} onUpdate={handleUpdate} />
          )}
          {selectedBlock.type === "contributors" && (
            <ContributorsSettings props={selectedBlock.props} onUpdate={handleUpdate} />
          )}
          {selectedBlock.type === "socials" && (
            <SocialsSettings props={selectedBlock.props} onUpdate={handleUpdate} />
          )}
          {selectedBlock.type === "roadmap" && (
            <RoadmapSettings props={selectedBlock.props} onUpdate={handleUpdate} />
          )}
          {selectedBlock.type === "divider" && (
            <DividerSettings props={selectedBlock.props} onUpdate={handleUpdate} />
          )}
          {selectedBlock.type === "video" && (
            <VideoSettings props={selectedBlock.props} onUpdate={handleUpdate} />
          )}
          {selectedBlock.type === "code" && (
            <CodeSettings props={selectedBlock.props} onUpdate={handleUpdate} />
          )}
          {selectedBlock.type === "githubstats" && (
            <GitHubStatsSettings props={selectedBlock.props} onUpdate={handleUpdate} />
          )}
        </div>
      </div>

      {/* Sticky Note / Block Comments panel */}
      <div className="p-4 border-t border-border bg-neutral-950/40">
        <div className="flex items-center gap-1.5 text-yellow-500/80 mb-2">
          <StickyNote className="w-3.5 h-3.5" />
          <span className="text-[10px] font-bold uppercase tracking-wider">Sticky Note / Editor Note</span>
        </div>
        <textarea
          value={selectedBlock._note || ""}
          onChange={handleNoteChange}
          placeholder="Add editorial notes or comments about this block (hidden from final README export)..."
          rows={3}
          className="w-full text-[11px] p-2 rounded-lg border border-yellow-900/30 bg-yellow-950/10 text-yellow-250 placeholder-yellow-800/40 outline-none focus:border-yellow-700/40 resize-none font-sans"
        />
      </div>
    </aside>
  );
}

// 1. Header Block Form
function HeaderSettings({ props, onUpdate }: { props: Record<string, any>; onUpdate: (p: Record<string, any>) => void }) {
  const handleRandomizeBg = () => {
    const randomIdx = Math.floor(Math.random() * RANDOM_COVERS.length);
    onUpdate({ bgImage: RANDOM_COVERS[randomIdx], bgType: "image" });
  };

  return (
    <div className="space-y-4 text-xs">
      <div className="space-y-1.5">
        <Label htmlFor="hdr-title" className="text-muted-foreground">Title</Label>
        <Input 
          id="hdr-title" 
          value={props.title || ""} 
          onChange={(e) => onUpdate({ title: e.target.value })} 
          placeholder="Boilerplate Name"
          className="h-8 text-xs bg-neutral-900 border-neutral-800"
        />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="hdr-sub" className="text-muted-foreground">Subtitle</Label>
        <Textarea 
          id="hdr-sub" 
          value={props.subtitle || ""} 
          onChange={(e) => onUpdate({ subtitle: e.target.value })} 
          placeholder="Brief description of your project..."
          rows={2}
          className="text-xs bg-neutral-900 border-neutral-800 resize-none"
        />
      </div>

      <div className="space-y-1.5">
        <Label className="text-muted-foreground">Style</Label>
        <Select value={props.style || "gradient"} onValueChange={(val) => onUpdate({ style: val })}>
          <SelectTrigger className="h-8 text-xs bg-neutral-900 border-neutral-800">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-panel border-neutral-800 text-xs">
            <SelectItem value="gradient">Gradient Banner</SelectItem>
            <SelectItem value="solid">Solid Background</SelectItem>
            <SelectItem value="minimal">Minimalist Card</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-1.5">
        <Label className="text-muted-foreground">Alignment</Label>
        <Select value={props.align || "center"} onValueChange={(val) => onUpdate({ align: val })}>
          <SelectTrigger className="h-8 text-xs bg-neutral-900 border-neutral-800">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-panel border-neutral-800 text-xs">
            <SelectItem value="left">Left</SelectItem>
            <SelectItem value="center">Center</SelectItem>
            <SelectItem value="right">Right</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-1.5">
        <Label className="text-muted-foreground">Font Family</Label>
        <Select value={props.font || "inter"} onValueChange={(val) => onUpdate({ font: val })}>
          <SelectTrigger className="h-8 text-xs bg-neutral-900 border-neutral-800">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-panel border-neutral-800 text-xs">
            <SelectItem value="inter">Inter (Sans-serif)</SelectItem>
            <SelectItem value="mono">Fira Code (Monospace)</SelectItem>
            <SelectItem value="serif">Outfit (Serif)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-1.5">
        <Label className="text-muted-foreground">Logo / Icon</Label>
        <Select value={props.logoType || "none"} onValueChange={(val) => onUpdate({ logoType: val })}>
          <SelectTrigger className="h-8 text-xs bg-neutral-900 border-neutral-800">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-panel border-neutral-800 text-xs">
            <SelectItem value="none">None</SelectItem>
            <SelectItem value="auto">Auto Mockup Logo</SelectItem>
            <SelectItem value="custom">Custom URL</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {props.logoType === "custom" && (
        <div className="space-y-1.5 pl-2 border-l border-neutral-800">
          <Label htmlFor="hdr-logourl" className="text-muted-foreground">Logo URL</Label>
          <Input 
            id="hdr-logourl" 
            value={props.logoUrl || ""} 
            onChange={(e) => onUpdate({ logoUrl: e.target.value })} 
            placeholder="https://example.com/logo.png"
            className="h-8 text-[11px] bg-neutral-900 border-neutral-800"
          />
        </div>
      )}

      {props.style !== "minimal" && (
        <div className="space-y-3 pt-2 border-t border-neutral-800">
          <div className="space-y-1.5">
            <Label className="text-muted-foreground">Background Type</Label>
            <Select value={props.bgType || "color"} onValueChange={(val) => onUpdate({ bgType: val })}>
              <SelectTrigger className="h-8 text-xs bg-neutral-900 border-neutral-800">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-panel border-neutral-800 text-xs">
                <SelectItem value="color">Theme/Color</SelectItem>
                <SelectItem value="image">Banner Image URL</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {props.bgType === "image" ? (
            <div className="space-y-2 pl-2 border-l border-neutral-800">
              <Label htmlFor="hdr-bgimage" className="text-muted-foreground">Image URL</Label>
              <div className="flex gap-1">
                <Input 
                  id="hdr-bgimage" 
                  value={props.bgImage || ""} 
                  onChange={(e) => onUpdate({ bgImage: e.target.value })} 
                  placeholder="https://example.com/cover.jpg"
                  className="h-8 text-[11px] bg-neutral-900 border-neutral-800 flex-1"
                />
                <Button 
                  onClick={handleRandomizeBg} 
                  variant="outline" 
                  size="icon" 
                  className="w-8 h-8 shrink-0 bg-neutral-900 border-neutral-800 hover:bg-neutral-800"
                >
                  <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                </Button>
              </div>
            </div>
          ) : props.style === "gradient" ? (
            <div className="grid grid-cols-2 gap-2 pl-2 border-l border-neutral-800">
              <div className="space-y-1">
                <Label className="text-[10px] text-muted-foreground">Start Color</Label>
                <div className="flex items-center gap-1.5 bg-neutral-900 border border-neutral-800 rounded px-1.5 h-8">
                  <input 
                    type="color" 
                    value={props.bgGradientStart || "#4f46e5"} 
                    onChange={(e) => onUpdate({ bgGradientStart: e.target.value })}
                    className="w-5 h-5 rounded border-0 cursor-pointer bg-transparent shrink-0"
                  />
                  <span className="text-[10px] font-mono select-all truncate">{props.bgGradientStart || "#4f46e5"}</span>
                </div>
              </div>
              <div className="space-y-1">
                <Label className="text-[10px] text-muted-foreground">End Color</Label>
                <div className="flex items-center gap-1.5 bg-neutral-900 border border-neutral-800 rounded px-1.5 h-8">
                  <input 
                    type="color" 
                    value={props.bgGradientEnd || "#ec4899"} 
                    onChange={(e) => onUpdate({ bgGradientEnd: e.target.value })}
                    className="w-5 h-5 rounded border-0 cursor-pointer bg-transparent shrink-0"
                  />
                  <span className="text-[10px] font-mono select-all truncate">{props.bgGradientEnd || "#ec4899"}</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-1 pl-2 border-l border-neutral-800">
              <Label className="text-[10px] text-muted-foreground">Solid Color</Label>
              <div className="flex items-center gap-1.5 bg-neutral-900 border border-neutral-800 rounded px-1.5 h-8">
                <input 
                  type="color" 
                  value={props.bgColor || "#111827"} 
                  onChange={(e) => onUpdate({ bgColor: e.target.value })}
                  className="w-5 h-5 rounded border-0 cursor-pointer bg-transparent shrink-0"
                />
                <span className="text-[10px] font-mono select-all truncate">{props.bgColor || "#111827"}</span>
              </div>
            </div>
          )}
        </div>
      )}

      <div className="space-y-1.5">
        <Label className="text-muted-foreground">Size</Label>
        <Select value={props.size || "banner"} onValueChange={(val) => onUpdate({ size: val })}>
          <SelectTrigger className="h-8 text-xs bg-neutral-900 border-neutral-800">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-panel border-neutral-800 text-xs">
            <SelectItem value="banner">Banner (Tall)</SelectItem>
            <SelectItem value="compact">Compact (Short)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="hdr-alt" className="text-muted-foreground">Image Alt Text</Label>
        <Input 
          id="hdr-alt" 
          value={props.altText || ""} 
          onChange={(e) => onUpdate({ altText: e.target.value })} 
          placeholder="Banner accessibility title"
          className="h-8 text-xs bg-neutral-900 border-neutral-800"
        />
      </div>

      <div className="flex items-center justify-between py-1 border-t border-neutral-850">
        <Label htmlFor="hdr-border" className="text-muted-foreground">Bottom Divider</Label>
        <Switch 
          id="hdr-border" 
          checked={props.border ?? true} 
          onCheckedChange={(checked) => onUpdate({ border: checked })} 
        />
      </div>
      <div className="flex items-center justify-between py-1">
        <Label htmlFor="hdr-watermark" className="text-muted-foreground">Watermark Badge</Label>
        <Switch 
          id="hdr-watermark" 
          checked={props.watermark ?? false} 
          onCheckedChange={(checked) => onUpdate({ watermark: checked })} 
        />
      </div>
    </div>
  );
}

// 2. Text Block Form
function TextSettings({ props, onUpdate }: { props: Record<string, any>; onUpdate: (p: Record<string, any>) => void }) {
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  const insertMarkdown = (syntaxBefore: string, syntaxAfter = "") => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    const selection = text.substring(start, end);
    const replacement = syntaxBefore + (selection || "text") + syntaxAfter;
    const newContent = text.substring(0, start) + replacement + text.substring(end);
    onUpdate({ content: newContent });
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + syntaxBefore.length, start + syntaxBefore.length + (selection || "text").length);
    }, 10);
  };

  const actionButtons = [
    { label: "H1", icon: Heading1, action: () => insertMarkdown("## ") },
    { label: "H2", icon: Heading2, action: () => insertMarkdown("### ") },
    { label: "Bold", icon: Bold, action: () => insertMarkdown("**", "**") },
    { label: "Italic", icon: Italic, action: () => insertMarkdown("*", "*") },
    { label: "Link", icon: Link2, action: () => insertMarkdown("[", "](https://github.com)") },
    { label: "Code", icon: CodeIcon, action: () => insertMarkdown("`", "`") },
    { label: "Block", icon: CodeIcon, action: () => insertMarkdown("```javascript\n", "\n```") },
    { label: "List", icon: List, action: () => insertMarkdown("- ") },
    { label: "Task", icon: CheckSquare, action: () => insertMarkdown("- [ ] ") },
    { label: "Table", icon: TableIcon, action: () => insertMarkdown("| Feature | Status |\n| --- | --- |\n| Edit visual blocks | Done |") },
  ];

  return (
    <div className="space-y-4 text-xs">
      <div className="space-y-1">
        <Label className="text-muted-foreground">Markdown Helpers</Label>
        <div className="grid grid-cols-5 gap-1 pt-1.5">
          {actionButtons.map((btn, i) => {
            const Icon = btn.icon;
            return (
              <Button
                key={i}
                type="button"
                variant="outline"
                onClick={btn.action}
                className="h-8 p-0 text-[10px] bg-neutral-900 border-neutral-800 hover:bg-neutral-800 flex items-center justify-center"
              >
                <Icon className="w-3.5 h-3.5 text-neutral-400" />
              </Button>
            );
          })}
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="txt-content" className="text-muted-foreground">Markdown Content</Label>
        <Textarea 
          ref={textareaRef}
          id="txt-content" 
          value={props.content || ""} 
          onChange={(e) => onUpdate({ content: e.target.value })} 
          placeholder="Type markdown syntax here..."
          rows={12}
          className="text-xs bg-neutral-900 border-neutral-800 font-mono resize-y"
        />
      </div>
    </div>
  );
}

// 3. Badges Block Form
function BadgesSettings({ props, onUpdate }: { props: Record<string, any>; onUpdate: (p: Record<string, any>) => void }) {
  const { packageName = "", githubRepo = "", badgeList = [], badgeStyle = "flat" } = props;

  const toggleBadge = (type: string) => {
    let newList = [...badgeList];
    if (newList.includes(type)) {
      newList = newList.filter((item) => item !== type);
    } else {
      newList.push(type);
    }
    onUpdate({ badgeList: newList });
  };

  const badgeCheckboxes = [
    { type: "npm-v", label: "NPM Package Version" },
    { type: "github-stars", label: "GitHub Star Count" },
    { type: "license", label: "GitHub Repository License" },
    { type: "github-status", label: "GitHub Workflow Status" },
  ];

  return (
    <div className="space-y-4 text-xs">
      <div className="space-y-1.5">
        <Label htmlFor="bdg-npm" className="text-muted-foreground">NPM Package Name</Label>
        <Input 
          id="bdg-npm" 
          value={packageName} 
          onChange={(e) => onUpdate({ packageName: e.target.value })} 
          placeholder="e.g. lodash"
          className="h-8 text-xs bg-neutral-900 border-neutral-800 font-mono"
        />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="bdg-repo" className="text-muted-foreground">GitHub Repo (user/repo)</Label>
        <Input 
          id="bdg-repo" 
          value={githubRepo} 
          onChange={(e) => onUpdate({ githubRepo: e.target.value })} 
          placeholder="e.g. facebook/react"
          className="h-8 text-xs bg-neutral-900 border-neutral-800 font-mono"
        />
      </div>

      <div className="space-y-1.5">
        <Label className="text-muted-foreground">Badge Style</Label>
        <Select value={badgeStyle} onValueChange={(val) => onUpdate({ badgeStyle: val })}>
          <SelectTrigger className="h-8 text-xs bg-neutral-900 border-neutral-800">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-panel border-neutral-800 text-xs">
            <SelectItem value="flat">Flat (Default)</SelectItem>
            <SelectItem value="flat-square">Flat Square</SelectItem>
            <SelectItem value="plastic">Plastic</SelectItem>
            <SelectItem value="for-the-badge">For the Badge (Large)</SelectItem>
            <SelectItem value="social">Social Link</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-3 pt-2 border-t border-neutral-850">
        <Label className="text-muted-foreground font-semibold">Active Badges</Label>
        <div className="space-y-2.5">
          {badgeCheckboxes.map((item) => (
            <div key={item.type} className="flex items-center justify-between">
              <Label htmlFor={`chk-${item.type}`} className="text-muted-foreground pr-2 font-normal">
                {item.label}
              </Label>
              <Switch 
                id={`chk-${item.type}`} 
                checked={badgeList.includes(item.type)} 
                onCheckedChange={() => toggleBadge(item.type)} 
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// 4. Group Block Form
function GroupSettings({ props, onUpdate }: { props: Record<string, any>; onUpdate: (p: Record<string, any>) => void }) {
  return (
    <div className="space-y-4 text-xs">
      <div className="space-y-1.5">
        <Label htmlFor="grp-title" className="text-muted-foreground">Section Title</Label>
        <Input 
          id="grp-title" 
          value={props.title || ""} 
          onChange={(e) => onUpdate({ title: e.target.value })} 
          placeholder="e.g. Configuration Parameters"
          className="h-8 text-xs bg-neutral-900 border-neutral-800"
        />
      </div>
    </div>
  );
}

// 5. Chart Block Form
function ChartSettings({ props, onUpdate }: { props: Record<string, any>; onUpdate: (p: Record<string, any>) => void }) {
  return (
    <div className="space-y-4 text-xs">
      <div className="space-y-1.5">
        <Label htmlFor="ch-repo" className="text-muted-foreground">GitHub Repo Path</Label>
        <Input 
          id="ch-repo" 
          value={props.repo || ""} 
          onChange={(e) => onUpdate({ repo: e.target.value })} 
          placeholder="e.g. tailwindlabs/tailwindcss"
          className="h-8 text-xs bg-neutral-900 border-neutral-800 font-mono"
        />
      </div>
      
      <div className="space-y-1.5">
        <Label className="text-muted-foreground">Chart Theme</Label>
        <Select value={props.theme || "dark"} onValueChange={(val) => onUpdate({ theme: val })}>
          <SelectTrigger className="h-8 text-xs bg-neutral-900 border-neutral-800">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-panel border-neutral-800 text-xs">
            <SelectItem value="dark">Dark Theme</SelectItem>
            <SelectItem value="light">Light Theme</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

// 6. Table Block Form
function TableSettings({ props, onUpdate }: { props: Record<string, any>; onUpdate: (p: Record<string, any>) => void }) {
  const headers = props.headers || [];
  const rows = props.rows || [];

  const handleUpdateHeader = (index: number, val: string) => {
    const newHeaders = [...headers];
    newHeaders[index] = val;
    onUpdate({ headers: newHeaders });
  };

  const handleAddColumn = () => {
    const newHeaders = [...headers, `Header ${headers.length + 1}`];
    const newRows = rows.map((row: string[]) => [...row, ""]);
    onUpdate({ headers: newHeaders, rows: newRows });
  };

  const handleRemoveColumn = (index: number) => {
    if (headers.length <= 1) return;
    const newHeaders = headers.filter((_: any, idx: number) => idx !== index);
    const newRows = rows.map((row: string[]) => row.filter((_, idx) => idx !== index));
    onUpdate({ headers: newHeaders, rows: newRows });
  };

  const handleUpdateCell = (rowIdx: number, colIdx: number, val: string) => {
    const newRows = rows.map((row: string[], rIdx: number) => {
      if (rIdx === rowIdx) {
        const newRow = [...row];
        newRow[colIdx] = val;
        return newRow;
      }
      return row;
    });
    onUpdate({ rows: newRows });
  };

  const handleAddRow = () => {
    const newRow = Array(headers.length).fill("");
    onUpdate({ rows: [...rows, newRow] });
  };

  const handleRemoveRow = (index: number) => {
    const newRows = rows.filter((_: any, idx: number) => idx !== index);
    onUpdate({ rows: newRows });
  };

  return (
    <div className="space-y-4 text-xs">
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <Label className="text-muted-foreground font-semibold">Columns</Label>
          <Button onClick={handleAddColumn} size="xs" variant="outline" className="h-6 text-[10px] bg-neutral-900 border-neutral-800 px-2">
            <Plus className="w-3 h-3 mr-1" /> Add Col
          </Button>
        </div>
        <div className="space-y-1.5 max-h-[120px] overflow-y-auto pr-1">
          {headers.map((h: string, i: number) => (
            <div key={i} className="flex gap-1">
              <Input 
                value={h} 
                onChange={(e) => handleUpdateHeader(i, e.target.value)} 
                className="h-7 text-[11px] bg-neutral-900 border-neutral-800 flex-1"
              />
              <Button onClick={() => handleRemoveColumn(i)} variant="ghost" size="icon" disabled={headers.length <= 1} className="w-7 h-7 text-neutral-500 hover:text-red-400">
                <Trash2 className="w-3.5 h-3.5" />
              </Button>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-2 pt-2 border-t border-neutral-850">
        <div className="flex justify-between items-center">
          <Label className="text-muted-foreground font-semibold">Rows ({rows.length})</Label>
          <Button onClick={handleAddRow} size="xs" variant="outline" className="h-6 text-[10px] bg-neutral-900 border-neutral-800 px-2">
            <Plus className="w-3 h-3 mr-1" /> Add Row
          </Button>
        </div>

        <div className="space-y-3 max-h-[160px] overflow-y-auto pr-1">
          {rows.map((row: string[], rowIdx: number) => (
            <div key={rowIdx} className="p-2 bg-neutral-950 border border-neutral-900 rounded-lg relative space-y-1.5">
              <div className="flex justify-between items-center text-[10px] text-neutral-500 font-mono">
                <span>Row #{rowIdx + 1}</span>
                <Button onClick={() => handleRemoveRow(rowIdx)} variant="ghost" size="icon" className="w-5 h-5 text-neutral-600 hover:text-red-400 p-0">
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
              
              {headers.map((header: string, colIdx: number) => (
                <div key={colIdx} className="grid grid-cols-3 gap-1 items-center">
                  <span className="text-[10px] text-neutral-500 truncate text-left">{header}</span>
                  <Input 
                    value={row[colIdx] || ""} 
                    onChange={(e) => handleUpdateCell(rowIdx, colIdx, e.target.value)} 
                    className="h-6 text-[10px] bg-neutral-900 border-neutral-800 col-span-2 px-2"
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// 7. Image Block Form
function ImageSettings({ props, onUpdate }: { props: Record<string, any>; onUpdate: (p: Record<string, any>) => void }) {
  return (
    <div className="space-y-4 text-xs">
      <div className="space-y-1.5">
        <Label htmlFor="img-url" className="text-muted-foreground">Image URL</Label>
        <Input 
          id="img-url" 
          value={props.url || ""} 
          onChange={(e) => onUpdate({ url: e.target.value })} 
          placeholder="https://example.com/demo.gif"
          className="h-8 text-xs bg-neutral-900 border-neutral-800"
        />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="img-cap" className="text-muted-foreground">Caption</Label>
        <Input 
          id="img-cap" 
          value={props.caption || ""} 
          onChange={(e) => onUpdate({ caption: e.target.value })} 
          placeholder="Caption text"
          className="h-8 text-xs bg-neutral-900 border-neutral-800"
        />
      </div>

      <div className="space-y-1.5">
        <Label className="text-muted-foreground">Alignment</Label>
        <Select value={props.align || "center"} onValueChange={(val) => onUpdate({ align: val })}>
          <SelectTrigger className="h-8 text-xs bg-neutral-900 border-neutral-800">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-panel border-neutral-800 text-xs">
            <SelectItem value="left">Left</SelectItem>
            <SelectItem value="center">Center</SelectItem>
            <SelectItem value="right">Right</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-1.5">
        <Label className="text-muted-foreground">Display Width</Label>
        <Select value={props.width || "100%"} onValueChange={(val) => onUpdate({ width: val })}>
          <SelectTrigger className="h-8 text-xs bg-neutral-900 border-neutral-800">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-panel border-neutral-800 text-xs">
            <SelectItem value="100%">Full Width (100%)</SelectItem>
            <SelectItem value="75%">Medium Width (75%)</SelectItem>
            <SelectItem value="50%">Small Width (50%)</SelectItem>
            <SelectItem value="30%">Thumbnail (30%)</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

// 8. Sponsors Block Form
function SponsorsSettings({ props, onUpdate }: { props: Record<string, any>; onUpdate: (p: Record<string, any>) => void }) {
  const sponsors = props.sponsors || [];
  const layout = props.layout || "grid";

  const handleAddSponsor = () => {
    const newSp = {
      name: `Sponsor ${sponsors.length + 1}`,
      logo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100&fit=crop&q=80",
      link: "https://github.com",
    };
    onUpdate({ sponsors: [...sponsors, newSp] });
  };

  const handleRemoveSponsor = (index: number) => {
    onUpdate({ sponsors: sponsors.filter((_: any, idx: number) => idx !== index) });
  };

  const handleUpdateSponsor = (index: number, field: string, val: string) => {
    const newSponsors = sponsors.map((sp: any, idx: number) => {
      if (idx === index) {
        return { ...sp, [field]: val };
      }
      return sp;
    });
    onUpdate({ sponsors: newSponsors });
  };

  return (
    <div className="space-y-4 text-xs">
      <div className="space-y-1.5">
        <Label className="text-muted-foreground">Layout Type</Label>
        <Select value={layout} onValueChange={(val) => onUpdate({ layout: val })}>
          <SelectTrigger className="h-8 text-xs bg-neutral-900 border-neutral-800">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-panel border-neutral-800 text-xs">
            <SelectItem value="grid">Grid (Circular Icons)</SelectItem>
            <SelectItem value="list">Bullet List (Text Links)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2 pt-2 border-t border-neutral-850">
        <div className="flex justify-between items-center">
          <Label className="text-muted-foreground font-semibold">Sponsors</Label>
          <Button onClick={handleAddSponsor} size="xs" variant="outline" className="h-6 text-[10px] bg-neutral-900 border-neutral-800 px-2">
            <Plus className="w-3 h-3 mr-1" /> Add Sponsor
          </Button>
        </div>

        <div className="space-y-3 max-h-[180px] overflow-y-auto pr-1">
          {sponsors.map((sp: any, idx: number) => (
            <div key={idx} className="p-2 bg-neutral-950 border border-neutral-900 rounded-lg relative space-y-2">
              <div className="flex justify-between items-center text-[10px] text-neutral-500 font-mono">
                <span>Sponsor #{idx + 1}</span>
                <Button onClick={() => handleRemoveSponsor(idx)} variant="ghost" size="icon" className="w-5 h-5 text-neutral-600 hover:text-red-400 p-0">
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>

              <div className="space-y-1.5">
                <div>
                  <Label className="text-[9px] text-neutral-500">Name</Label>
                  <Input 
                    value={sp.name} 
                    onChange={(e) => handleUpdateSponsor(idx, "name", e.target.value)} 
                    className="h-7 text-[11px] bg-neutral-900 border-neutral-800"
                  />
                </div>
                {layout === "grid" && (
                  <div>
                    <Label className="text-[9px] text-neutral-500">Logo Image URL</Label>
                    <Input 
                      value={sp.logo} 
                      onChange={(e) => handleUpdateSponsor(idx, "logo", e.target.value)} 
                      className="h-7 text-[11px] bg-neutral-900 border-neutral-800"
                    />
                  </div>
                )}
                <div>
                  <Label className="text-[9px] text-neutral-500">Link URL</Label>
                  <Input 
                    value={sp.link} 
                    onChange={(e) => handleUpdateSponsor(idx, "link", e.target.value)} 
                    className="h-7 text-[11px] bg-neutral-900 border-neutral-800"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// 9. Tech Stack Block Form
function TechStackSettings({ props, onUpdate }: { props: Record<string, any>; onUpdate: (p: Record<string, any>) => void }) {
  return (
    <div className="space-y-4 text-xs">
      <div className="space-y-1.5">
        <Label htmlFor="tech-list" className="text-muted-foreground">Technologies (comma-separated)</Label>
        <Textarea 
          id="tech-list" 
          value={props.techs || ""} 
          onChange={(e) => onUpdate({ techs: e.target.value })} 
          placeholder="React, TypeScript, Go, Python, Docker"
          rows={3}
          className="text-xs bg-neutral-900 border-neutral-800"
        />
      </div>

      <div className="space-y-1.5">
        <Label className="text-muted-foreground">Layout</Label>
        <Select value={props.layout || "row"} onValueChange={(val) => onUpdate({ layout: val })}>
          <SelectTrigger className="h-8 text-xs bg-neutral-900 border-neutral-800">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-panel border-neutral-800 text-xs">
            <SelectItem value="row">Horizontal Row</SelectItem>
            <SelectItem value="grid">Responsive Grid</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-1.5">
        <Label className="text-muted-foreground">Icon Size</Label>
        <Select value={String(props.iconSize || 40)} onValueChange={(val) => onUpdate({ iconSize: Number(val) })}>
          <SelectTrigger className="h-8 text-xs bg-neutral-900 border-neutral-800">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-panel border-neutral-800 text-xs">
            <SelectItem value="40">Small (40px)</SelectItem>
            <SelectItem value="60">Medium (60px)</SelectItem>
            <SelectItem value="80">Large (80px)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center justify-between py-1 border-t border-neutral-850">
        <Label htmlFor="tech-labels" className="text-muted-foreground">Show Tech Names</Label>
        <Switch 
          id="tech-labels" 
          checked={props.showLabel ?? true} 
          onCheckedChange={(checked) => onUpdate({ showLabel: checked })} 
        />
      </div>
    </div>
  );
}

// 10. Contributors Block Form
function ContributorsSettings({ props, onUpdate }: { props: Record<string, any>; onUpdate: (p: Record<string, any>) => void }) {
  return (
    <div className="space-y-4 text-xs">
      <div className="space-y-1.5">
        <Label htmlFor="contrib-repo" className="text-muted-foreground">GitHub Repo Path (owner/repo)</Label>
        <Input 
          id="contrib-repo" 
          value={props.repo || ""} 
          onChange={(e) => onUpdate({ repo: e.target.value })} 
          placeholder="vercel/next.js"
          className="h-8 text-xs bg-neutral-900 border-neutral-800 font-mono"
        />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="contrib-max" className="text-muted-foreground">Max Avatars ({props.maxCount || 12})</Label>
        <Input 
          id="contrib-max"
          type="number"
          min={1}
          max={100}
          value={props.maxCount || 12} 
          onChange={(e) => onUpdate({ maxCount: Number(e.target.value) || 12 })} 
          className="h-8 text-xs bg-neutral-900 border-neutral-800"
        />
      </div>

      <div className="space-y-1.5">
        <Label className="text-muted-foreground">Avatar Size</Label>
        <Select value={String(props.avatarSize || 48)} onValueChange={(val) => onUpdate({ avatarSize: Number(val) })}>
          <SelectTrigger className="h-8 text-xs bg-neutral-900 border-neutral-800">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-panel border-neutral-800 text-xs">
            <SelectItem value="48">Small (48px)</SelectItem>
            <SelectItem value="64">Medium (64px)</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

// 11. Social Links Block Form
function SocialsSettings({ props, onUpdate }: { props: Record<string, any>; onUpdate: (p: Record<string, any>) => void }) {
  const items = props.items || [];
  const layout = props.layout || "row";

  const handleAddSocial = () => {
    onUpdate({
      items: [...items, { platform: "Twitter/X", url: "https://twitter.com/", label: "Follow Me" }]
    });
  };

  const handleUpdateSocial = (index: number, field: string, val: string) => {
    const newItems = items.map((item: any, idx: number) => {
      if (idx === index) return { ...item, [field]: val };
      return item;
    });
    onUpdate({ items: newItems });
  };

  const handleRemoveSocial = (index: number) => {
    onUpdate({ items: items.filter((_: any, idx: number) => idx !== index) });
  };

  const platforms = ["Twitter/X", "LinkedIn", "Discord", "YouTube", "Dev.to", "Portfolio", "Email", "GitHub"];

  return (
    <div className="space-y-4 text-xs">
      <div className="space-y-1.5">
        <Label className="text-muted-foreground">Layout</Label>
        <Select value={layout} onValueChange={(val) => onUpdate({ layout: val })}>
          <SelectTrigger className="h-8 text-xs bg-neutral-900 border-neutral-800">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-panel border-neutral-800 text-xs">
            <SelectItem value="row">Horizontal Row</SelectItem>
            <SelectItem value="column">Vertical List</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2 pt-2 border-t border-neutral-850">
        <div className="flex justify-between items-center">
          <Label className="text-muted-foreground font-semibold">Social Accounts</Label>
          <Button onClick={handleAddSocial} size="xs" variant="outline" className="h-6 text-[10px] bg-neutral-900 border-neutral-800 px-2">
            <Plus className="w-3 h-3 mr-1" /> Add
          </Button>
        </div>

        <div className="space-y-3 max-h-[220px] overflow-y-auto pr-1">
          {items.map((item: any, idx: number) => (
            <div key={idx} className="p-2 bg-neutral-950 border border-neutral-900 rounded-lg space-y-1.5 relative">
              <Button onClick={() => handleRemoveSocial(idx)} variant="ghost" size="icon" className="absolute right-1 top-1 w-5 h-5 text-neutral-600 hover:text-red-400">
                <Trash2 className="w-3 h-3" />
              </Button>

              <div className="space-y-1 pr-4">
                <Label className="text-[9px] text-neutral-500">Platform</Label>
                <Select value={item.platform} onValueChange={(val) => handleUpdateSocial(idx, "platform", val)}>
                  <SelectTrigger className="h-6 text-[10px] bg-neutral-900 border-neutral-800 px-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-panel border-neutral-800 text-xs">
                    {platforms.map((p) => <SelectItem key={p} value={p}>{p}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1">
                <Label className="text-[9px] text-neutral-500">Badge Label</Label>
                <Input 
                  value={item.label || ""} 
                  onChange={(e) => handleUpdateSocial(idx, "label", e.target.value)} 
                  className="h-6 text-[10px] bg-neutral-900 border-neutral-800"
                />
              </div>

              <div className="space-y-1">
                <Label className="text-[9px] text-neutral-500">URL / Email Link</Label>
                <Input 
                  value={item.url || ""} 
                  onChange={(e) => handleUpdateSocial(idx, "url", e.target.value)} 
                  className="h-6 text-[10px] bg-neutral-900 border-neutral-800 font-mono"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// 12. Roadmap / Checklist Block Form
function RoadmapSettings({ props, onUpdate }: { props: Record<string, any>; onUpdate: (p: Record<string, any>) => void }) {
  const items = props.items || [];

  const handleAddItem = () => {
    onUpdate({ items: [...items, { text: "New checklist item", done: false }] });
  };

  const handleUpdateItem = (index: number, text: string, done: boolean) => {
    const newItems = items.map((item: any, idx: number) => {
      if (idx === index) return { text, done };
      return item;
    });
    onUpdate({ items: newItems });
  };

  const handleRemoveItem = (index: number) => {
    onUpdate({ items: items.filter((_: any, idx: number) => idx !== index) });
  };

  return (
    <div className="space-y-4 text-xs">
      <div className="flex justify-between items-center">
        <Label className="text-muted-foreground font-semibold">Roadmap List</Label>
        <Button onClick={handleAddItem} size="xs" variant="outline" className="h-6 text-[10px] bg-neutral-900 border-neutral-800 px-2">
          <Plus className="w-3 h-3 mr-1" /> Add Item
        </Button>
      </div>

      <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
        {items.map((item: any, idx: number) => (
          <div key={idx} className="flex gap-2 items-center bg-neutral-950 p-2 border border-neutral-900 rounded-lg group">
            <Switch 
              checked={item.done} 
              onCheckedChange={(checked) => handleUpdateItem(idx, item.text, checked)} 
              className="scale-75"
            />
            <Input 
              value={item.text} 
              onChange={(e) => handleUpdateItem(idx, e.target.value, item.done)} 
              className="h-7 text-[11px] bg-neutral-900 border-neutral-850 flex-1 px-2"
            />
            <Button onClick={() => handleRemoveItem(idx)} variant="ghost" size="icon" className="w-6 h-6 text-neutral-600 hover:text-red-400 shrink-0">
              <Trash2 className="w-3.5 h-3.5" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}

// 13. Divider Block Form
function DividerSettings({ props, onUpdate }: { props: Record<string, any>; onUpdate: (p: Record<string, any>) => void }) {
  return (
    <div className="space-y-4 text-xs">
      <div className="space-y-1.5">
        <Label className="text-muted-foreground">Style</Label>
        <Select value={props.style || "line"} onValueChange={(val) => onUpdate({ style: val })}>
          <SelectTrigger className="h-8 text-xs bg-neutral-900 border-neutral-800">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-panel border-neutral-800 text-xs">
            <SelectItem value="line">Solid Line</SelectItem>
            <SelectItem value="dots">Dotted Row</SelectItem>
            <SelectItem value="space">Empty Spacing</SelectItem>
            <SelectItem value="wave">Curved Wave</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {props.style === "space" && (
        <div className="space-y-1.5 pl-2 border-l border-neutral-850">
          <Label htmlFor="div-height" className="text-muted-foreground">Height (px)</Label>
          <Input 
            id="div-height"
            type="number"
            value={props.height || 24} 
            onChange={(e) => onUpdate({ height: Number(e.target.value) || 24 })} 
            className="h-8 text-xs bg-neutral-900 border-neutral-800"
          />
        </div>
      )}

      {props.style !== "space" && (
        <div className="space-y-1.5 pl-2 border-l border-neutral-850">
          <Label className="text-muted-foreground">Divider Color</Label>
          <div className="flex items-center gap-1.5 bg-neutral-900 border border-neutral-800 rounded px-1.5 h-8">
            <input 
              type="color" 
              value={props.color || "#262626"} 
              onChange={(e) => onUpdate({ color: e.target.value })}
              className="w-5 h-5 rounded border-0 cursor-pointer bg-transparent shrink-0"
            />
            <span className="text-[10px] font-mono select-all truncate">{props.color || "#262626"}</span>
          </div>
        </div>
      )}
    </div>
  );
}

// 14. Video Block Form
function VideoSettings({ props, onUpdate }: { props: Record<string, any>; onUpdate: (p: Record<string, any>) => void }) {
  return (
    <div className="space-y-4 text-xs">
      <div className="space-y-1.5">
        <Label htmlFor="vid-url" className="text-muted-foreground">Video / GIF URL (YouTube or direct file)</Label>
        <Input 
          id="vid-url" 
          value={props.url || ""} 
          onChange={(e) => onUpdate({ url: e.target.value })} 
          placeholder="https://www.youtube.com/watch?..."
          className="h-8 text-xs bg-neutral-900 border-neutral-800 font-mono"
        />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="vid-cap" className="text-muted-foreground">Caption</Label>
        <Input 
          id="vid-cap" 
          value={props.caption || ""} 
          onChange={(e) => onUpdate({ caption: e.target.value })} 
          placeholder="Demonstration walkthrough"
          className="h-8 text-xs bg-neutral-900 border-neutral-800"
        />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="vid-width" className="text-muted-foreground">Display Width ({props.width || 100}%)</Label>
        <Input 
          id="vid-width"
          type="number"
          min={20}
          max={100}
          value={props.width || 100} 
          onChange={(e) => onUpdate({ width: Number(e.target.value) || 100 })} 
          className="h-8 text-xs bg-neutral-900 border-neutral-800"
        />
      </div>

      <div className="space-y-1.5">
        <Label className="text-muted-foreground">Alignment</Label>
        <Select value={props.align || "center"} onValueChange={(val) => onUpdate({ align: val })}>
          <SelectTrigger className="h-8 text-xs bg-neutral-900 border-neutral-800">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-panel border-neutral-800 text-xs">
            <SelectItem value="left">Left</SelectItem>
            <SelectItem value="center">Center</SelectItem>
            <SelectItem value="right">Right</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

// 15. Code Snippet Block Form
function CodeSettings({ props, onUpdate }: { props: Record<string, any>; onUpdate: (p: Record<string, any>) => void }) {
  const languagesList = [
    "typescript", "javascript", "python", "go", "rust", "java", "cplusplus", 
    "html", "css", "ruby", "php", "bash", "json", "yaml", "sql", 
    "markdown", "csharp", "swift", "kotlin", "dockerfile"
  ];

  return (
    <div className="space-y-4 text-xs">
      <div className="space-y-1.5">
        <Label className="text-muted-foreground">Language</Label>
        <Select value={props.language || "typescript"} onValueChange={(val) => onUpdate({ language: val })}>
          <SelectTrigger className="h-8 text-xs bg-neutral-900 border-neutral-800">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-panel border-neutral-800 text-xs max-h-[160px] overflow-y-auto">
            {languagesList.map((lang) => (
              <SelectItem key={lang} value={lang}>{lang.toUpperCase()}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="code-file" className="text-muted-foreground">Filename (optional)</Label>
        <Input 
          id="code-file" 
          value={props.filename || ""} 
          onChange={(e) => onUpdate({ filename: e.target.value })} 
          placeholder="e.g. index.ts"
          className="h-8 text-xs bg-neutral-900 border-neutral-800 font-mono"
        />
      </div>

      {/* Embedded Mini Monaco Code Editor */}
      <div className="space-y-1.5">
        <Label className="text-muted-foreground">Code Snippet (Monaco Editor)</Label>
        <div className="border border-neutral-850 rounded-lg overflow-hidden h-[180px] bg-neutral-950">
          <Editor
            height="100%"
            theme="vs-dark"
            language={props.language || "typescript"}
            value={props.code || ""}
            onChange={(val) => onUpdate({ code: val || "" })}
            options={{
              minimap: { enabled: false },
              fontSize: 11,
              lineHeight: 16,
              wordWrap: "on",
              automaticLayout: true,
              scrollBeyondLastLine: false,
              lineNumbers: props.showLineNumbers ? "on" : "off",
              scrollbar: {
                verticalScrollbarSize: 6,
                horizontalScrollbarSize: 6,
              },
            }}
          />
        </div>
      </div>

      <div className="flex items-center justify-between py-1 border-t border-neutral-850">
        <Label htmlFor="code-numbers" className="text-muted-foreground">Show Line Numbers</Label>
        <Switch 
          id="code-numbers" 
          checked={props.showLineNumbers ?? true} 
          onCheckedChange={(checked) => onUpdate({ showLineNumbers: checked })} 
        />
      </div>
    </div>
  );
}

// 16. GitHub Stats Block Form
function GitHubStatsSettings({ props, onUpdate }: { props: Record<string, any>; onUpdate: (p: Record<string, any>) => void }) {
  const themes = ["default", "dark", "radical", "tokyonight", "dracula", "nord", "gruvbox"];

  return (
    <div className="space-y-4 text-xs">
      <div className="space-y-1.5">
        <Label htmlFor="stats-user" className="text-muted-foreground">GitHub Username</Label>
        <Input 
          id="stats-user" 
          value={props.username || ""} 
          onChange={(e) => onUpdate({ username: e.target.value })} 
          placeholder="e.g. torvalds"
          className="h-8 text-xs bg-neutral-900 border-neutral-800 font-mono"
        />
      </div>

      <div className="space-y-1.5">
        <Label className="text-muted-foreground">Card Type</Label>
        <Select value={props.statsType || "general"} onValueChange={(val) => onUpdate({ statsType: val })}>
          <SelectTrigger className="h-8 text-xs bg-neutral-900 border-neutral-800">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-panel border-neutral-800 text-xs">
            <SelectItem value="general">General GitHub Stats</SelectItem>
            <SelectItem value="streak">Commit Streak Stats</SelectItem>
            <SelectItem value="languages">Top Languages Card</SelectItem>
            <SelectItem value="trophy">Profile Trophies Grid</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-1.5">
        <Label className="text-muted-foreground">Visual Theme</Label>
        <Select value={props.theme || "dark"} onValueChange={(val) => onUpdate({ theme: val })}>
          <SelectTrigger className="h-8 text-xs bg-neutral-900 border-neutral-800">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-panel border-neutral-800 text-xs">
            {themes.map((theme) => (
              <SelectItem key={theme} value={theme}>{theme.toUpperCase()}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {props.statsType === "general" && (
        <>
          <div className="flex items-center justify-between py-1 border-t border-neutral-850">
            <Label htmlFor="stats-icons" className="text-muted-foreground">Show Stat Icons</Label>
            <Switch 
              id="stats-icons" 
              checked={props.showIcons ?? true} 
              onCheckedChange={(checked) => onUpdate({ showIcons: checked })} 
            />
          </div>
          <div className="flex items-center justify-between py-1">
            <Label htmlFor="stats-rank" className="text-muted-foreground">Hide Rank Indicator</Label>
            <Switch 
              id="stats-rank" 
              checked={props.hideRank ?? false} 
              onCheckedChange={(checked) => onUpdate({ hideRank: checked })} 
            />
          </div>
        </>
      )}
    </div>
  );
}
