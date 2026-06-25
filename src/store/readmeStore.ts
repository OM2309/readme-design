import { create } from "zustand";

export type BlockType =
  | "header"
  | "text"
  | "badges"
  | "group"
  | "chart"
  | "table"
  | "image"
  | "sponsors";

export type Block = {
  id: string;
  type: BlockType;
  props: Record<string, any>;
  parentId?: string;
};

export type TemplateType = "npm-package" | "react-component" | "cli-tool" | "profile-readme";

type ReadmeState = {
  blocks: Block[];
  selectedBlockId: string | null;
  history: Block[][];
  future: Block[][];
  
  // Actions
  addBlock: (type: BlockType, parentId?: string) => void;
  removeBlock: (id: string) => void;
  duplicateBlock: (id: string) => void;
  updateBlock: (id: string, props: Partial<Record<string, any>>) => void;
  reorderBlocks: (fromIndex: number, toIndex: number, parentId?: string) => void;
  selectBlock: (id: string | null) => void;
  resetStore: () => void;
  
  // Undo/Redo
  undo: () => void;
  redo: () => void;
  canUndo: () => boolean;
  canRedo: () => boolean;
  
  // Templates
  loadTemplate: (template: TemplateType) => void;
  
  // Initialization from localStorage (client-side)
  initFromStorage: () => void;
};

const DEFAULT_BLOCK_PROPS: Record<BlockType, Record<string, any>> = {
  header: {
    style: "gradient",
    title: "My Awesome Project",
    subtitle: "A modern developer tool built to make documentation visual, elegant, and fast.",
    logoType: "auto",
    logoUrl: "",
    bgType: "color",
    bgImage: "",
    bgGradientStart: "#4f46e5",
    bgGradientEnd: "#ec4899",
    bgColor: "#111827",
    size: "banner",
    theme: "dark",
    align: "center",
    font: "inter",
    border: true,
    watermark: false,
    altText: "Logo",
  },
  text: {
    content: `## 🚀 Features

- **Visual Editor**: Easily edit each section with dedicated forms.
- **Instant Preview**: Toggle between design preview, compiled HTML, and markdown modes.
- **Templates**: Get started quickly with specialized configurations.
- **Copy & Download**: Export your README with a single click.

## 🛠️ Installation

\`\`\`bash
npm install readme-studio
\`\`\`
`,
  },
  badges: {
    packageName: "readme-studio",
    githubRepo: "lucide-react/lucide",
    badgeList: ["npm-v", "github-stars", "license", "github-status"],
    badgeStyle: "flat",
  },
  group: {
    title: "Layout Container",
  },
  chart: {
    repo: "tailwindlabs/tailwindcss",
    theme: "dark",
  },
  table: {
    headers: ["Option", "Description", "Default"],
    rows: [
      ["`theme`", "Visual theme (dark / light)", "`dark`"],
      ["`align`", "Alignment (left / center / right)", "`center`"],
      ["`border`", "Show top visual divider border", "`true`"],
    ],
  },
  image: {
    url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=60",
    caption: "A premium header design built with README Studio.",
    align: "center",
    width: "100%",
  },
  sponsors: {
    layout: "grid",
    sponsors: [
      {
        name: "Acme Corp",
        logo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100&fit=crop&q=80",
        link: "https://github.com",
      },
      {
        name: "Stark Industries",
        logo: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=100&fit=crop&q=80",
        link: "https://github.com",
      },
    ],
  },
};

const TEMPLATE_BLOCKS: Record<TemplateType, Block[]> = {
  "npm-package": [
    {
      id: "header-1",
      type: "header",
      props: {
        style: "gradient",
        title: "npm-package-boilerplate",
        subtitle: "A highly-optimized Node.js package skeleton for building high-performance CLI utilities and microservices.",
        logoType: "auto",
        logoUrl: "",
        bgType: "color",
        bgGradientStart: "#06b6d4",
        bgGradientEnd: "#3b82f6",
        bgColor: "#0f172a",
        size: "banner",
        theme: "dark",
        align: "center",
        font: "mono",
        border: true,
        watermark: false,
        altText: "Package Logo",
      },
    },
    {
      id: "badges-1",
      type: "badges",
      props: {
        packageName: "lodash",
        githubRepo: "lodash/lodash",
        badgeList: ["npm-v", "github-stars", "license", "github-status"],
        badgeStyle: "flat-square",
      },
    },
    {
      id: "text-1",
      type: "text",
      props: {
        content: `## 📦 Installation

\`\`\`bash
pnpm add npm-package-boilerplate
\`\`\`

## 📖 Usage

Import the main module and initialize the generator:

\`\`\`typescript
import { Boilerplate } from 'npm-package-boilerplate';

const instance = new Boilerplate({ debug: true });
await instance.run();
\`\`\`
`,
      },
    },
    {
      id: "table-1",
      type: "table",
      props: {
        headers: ["Parameter", "Type", "Description", "Required"],
        rows: [
          ["`debug`", "`boolean`", "Toggle console output logs", "No (`false`)"],
          ["`apiKey`", "`string`", "Authentication key for APIs", "Yes"],
          ["`retries`", "`number`", "Number of failed attempts before failure", "No (`3`)"],
        ],
      },
    },
  ],
  "react-component": [
    {
      id: "header-2",
      type: "header",
      props: {
        style: "solid",
        title: "React Glassmorphic Cards",
        subtitle: "A suite of premium, ultra-responsive glassmorphism cards and layout grids for React apps.",
        logoType: "custom",
        logoUrl: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=80&fit=crop&q=80",
        bgType: "image",
        bgImage: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&auto=format&fit=crop&q=60",
        bgColor: "#171717",
        size: "banner",
        theme: "dark",
        align: "left",
        font: "inter",
        border: true,
        watermark: true,
        altText: "React logo",
      },
    },
    {
      id: "badges-2",
      type: "badges",
      props: {
        packageName: "react",
        githubRepo: "facebook/react",
        badgeList: ["npm-v", "github-stars", "license"],
        badgeStyle: "for-the-badge",
      },
    },
    {
      id: "text-2",
      type: "text",
      props: {
        content: `## ✨ Demo

Visual demonstration of the glass card layout:

`,
      },
    },
    {
      id: "image-1",
      type: "image",
      props: {
        url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=60",
        caption: "Glassmorphic Cards Preview Grid",
        align: "center",
        width: "70%",
      },
    },
  ],
  "cli-tool": [
    {
      id: "header-3",
      type: "header",
      props: {
        style: "minimal",
        title: "⚡ FAST-CLI",
        subtitle: "A super-fast developer terminal tool that automates environment setup, git hooks, and docker configs in under 2 seconds.",
        logoType: "none",
        theme: "dark",
        align: "center",
        font: "mono",
        border: true,
        watermark: false,
      },
    },
    {
      id: "text-3",
      type: "text",
      props: {
        content: `## 🚀 Quick Start

\`\`\`bash
npx fast-cli-tool create --template fullstack
\`\`\`

## 📊 Star History

Thank you to all contributors who have starred the repository!
`,
      },
    },
    {
      id: "chart-1",
      type: "chart",
      props: {
        repo: "shadcn/ui",
        theme: "dark",
      },
    },
  ],
  "profile-readme": [
    {
      id: "header-4",
      type: "header",
      props: {
        style: "gradient",
        title: "Hi, I'm Alex! 👋",
        subtitle: "Full-Stack Software Engineer | Technical Writer | Open Source Creator",
        logoType: "none",
        bgType: "color",
        bgGradientStart: "#7c3aed",
        bgGradientEnd: "#db2777",
        bgColor: "#09090b",
        size: "compact",
        theme: "dark",
        align: "center",
        font: "serif",
        border: false,
        watermark: false,
      },
    },
    {
      id: "text-4",
      type: "text",
      props: {
        content: `## 🛠️ About Me

- 💻 I’m currently working on building visual markdown tools.
- ⚡ Technologies: TypeScript, React, Next.js, Go, Rust.
- 📫 How to reach me: [alex@dev.to](mailto:alex@dev.to) or Twitter [@alexdev](https://twitter.com).

## 🏆 Sponsors

Consider sponsoring my work to keep open source sustainable:
`,
      },
    },
    {
      id: "sponsors-1",
      type: "sponsors",
      props: {
        layout: "grid",
        sponsors: [
          {
            name: "Gold Partner A",
            logo: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=100&fit=crop&q=80",
            link: "https://github.com",
          },
          {
            name: "Silver Partner B",
            logo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100&fit=crop&q=80",
            link: "https://github.com",
          },
        ],
      },
    },
  ],
};

const INITIAL_BLOCKS: Block[] = [
  {
    id: "header-init",
    type: "header",
    props: { ...DEFAULT_BLOCK_PROPS.header },
  },
  {
    id: "badges-init",
    type: "badges",
    props: { ...DEFAULT_BLOCK_PROPS.badges },
  },
  {
    id: "text-init",
    type: "text",
    props: { ...DEFAULT_BLOCK_PROPS.text },
  },
];

export const useReadmeStore = create<ReadmeState>((set, get) => {
  const saveStateToHistory = (newBlocks: Block[]) => {
    set((state) => ({
      history: [...state.history, state.blocks],
      future: [],
      blocks: newBlocks,
    }));
    // Save to localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem("readme-studio-blocks", JSON.stringify(newBlocks));
    }
  };

  return {
    blocks: INITIAL_BLOCKS,
    selectedBlockId: "header-init",
    history: [],
    future: [],

    initFromStorage: () => {
      if (typeof window !== "undefined") {
        const stored = localStorage.getItem("readme-studio-blocks");
        if (stored) {
          try {
            const parsed = JSON.parse(stored) as Block[];
            if (Array.isArray(parsed) && parsed.length > 0) {
              set({
                blocks: parsed,
                selectedBlockId: parsed[0]?.id || null,
                history: [],
                future: [],
              });
            }
          } catch (e) {
            console.error("Error parsing stored blocks:", e);
          }
        }
      }
    },

    addBlock: (type, parentId) => {
      const id = `${type}-${Date.now()}`;
      const newBlock: Block = {
        id,
        type,
        props: JSON.parse(JSON.stringify(DEFAULT_BLOCK_PROPS[type] || {})),
        parentId,
      };
      
      const newBlocks = [...get().blocks, newBlock];
      saveStateToHistory(newBlocks);
      set({ selectedBlockId: id });
    },

    removeBlock: (id) => {
      // Find block
      const blocks = get().blocks;
      // Also remove children if it's a group
      const newBlocks = blocks.filter((b) => b.id !== id && b.parentId !== id);
      
      saveStateToHistory(newBlocks);
      
      // If deleted block was selected, select the first remaining block
      if (get().selectedBlockId === id) {
        set({ selectedBlockId: newBlocks[0]?.id || null });
      }
    },

    duplicateBlock: (id) => {
      const blocks = get().blocks;
      const targetIndex = blocks.findIndex((b) => b.id === id);
      if (targetIndex === -1) return;

      const target = blocks[targetIndex];
      const newId = `${target.type}-${Date.now()}`;
      const duplicate: Block = {
        id: newId,
        type: target.type,
        props: JSON.parse(JSON.stringify(target.props)),
        parentId: target.parentId,
      };

      const newBlocks = [...blocks];
      newBlocks.splice(targetIndex + 1, 0, duplicate);

      // If duplicating a group, we might duplicate its children too
      if (target.type === "group") {
        const children = blocks.filter((b) => b.parentId === id);
        children.forEach((child, childIdx) => {
          const newChildId = `${child.type}-${Date.now()}-${childIdx}`;
          const childDuplicate: Block = {
            id: newChildId,
            type: child.type,
            props: JSON.parse(JSON.stringify(child.props)),
            parentId: newId,
          };
          newBlocks.splice(targetIndex + 2 + childIdx, 0, childDuplicate);
        });
      }

      saveStateToHistory(newBlocks);
      set({ selectedBlockId: newId });
    },

    updateBlock: (id, props) => {
      const newBlocks = get().blocks.map((b) => {
        if (b.id === id) {
          return { ...b, props: { ...b.props, ...props } };
        }
        return b;
      });
      
      // Update state and save
      set({ blocks: newBlocks });
      if (typeof window !== "undefined") {
        localStorage.setItem("readme-studio-blocks", JSON.stringify(newBlocks));
      }
    },

    reorderBlocks: (fromIndex, toIndex, parentId) => {
      const blocks = get().blocks;
      
      // If we are filtering by parentId, the drag & drop indices are relative to the filtered lists
      // So we map them back to the absolute indexes in the state
      const targetBlocks = blocks.filter((b) => b.parentId === parentId);
      const fromBlock = targetBlocks[fromIndex];
      const toBlock = targetBlocks[toIndex];
      
      if (!fromBlock || !toBlock) return;

      const absFrom = blocks.findIndex((b) => b.id === fromBlock.id);
      const absTo = blocks.findIndex((b) => b.id === toBlock.id);

      const newBlocks = [...blocks];
      const [removed] = newBlocks.splice(absFrom, 1);
      newBlocks.splice(absTo, 0, removed);

      saveStateToHistory(newBlocks);
    },

    selectBlock: (id) => {
      set({ selectedBlockId: id });
    },

    resetStore: () => {
      saveStateToHistory(INITIAL_BLOCKS);
      set({ selectedBlockId: INITIAL_BLOCKS[0].id });
    },

    undo: () => {
      const history = get().history;
      if (history.length === 0) return;

      const previous = history[history.length - 1];
      const newHistory = history.slice(0, history.length - 1);

      set((state) => ({
        future: [state.blocks, ...state.future],
        history: newHistory,
        blocks: previous,
        selectedBlockId: previous[0]?.id || null,
      }));

      if (typeof window !== "undefined") {
        localStorage.setItem("readme-studio-blocks", JSON.stringify(previous));
      }
    },

    redo: () => {
      const future = get().future;
      if (future.length === 0) return;

      const next = future[0];
      const newFuture = future.slice(1);

      set((state) => ({
        history: [...state.history, state.blocks],
        future: newFuture,
        blocks: next,
        selectedBlockId: next[0]?.id || null,
      }));

      if (typeof window !== "undefined") {
        localStorage.setItem("readme-studio-blocks", JSON.stringify(next));
      }
    },

    canUndo: () => get().history.length > 0,
    canRedo: () => get().future.length > 0,

    loadTemplate: (template) => {
      const templateData = TEMPLATE_BLOCKS[template];
      if (!templateData) return;

      const cloned = JSON.parse(JSON.stringify(templateData));
      saveStateToHistory(cloned);
      set({ selectedBlockId: cloned[0]?.id || null });
    },
  };
});
