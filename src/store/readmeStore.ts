import { create } from "zustand";
import { Block, BlockType } from "./blockRegistry";
import { DEFAULT_BLOCK_PROPS } from "./defaultProps";

export type TemplateType =
  | "npm-package"
  | "react-component"
  | "cli-tool"
  | "profile-readme"
  | "web3-solana"
  | "saas-landing"
  | "mobile-app"
  | "rest-api"
  | "monorepo"
  | "hackathon"
  | "portfolio"
  | "browser-ext"
  | "vscode-ext"
  | "discord-bot";

export interface Project {
  id: string;
  name: string;
  blocks: Block[];
  updated_at: string;
}

type ReadmeState = {
  blocks: Block[];
  selectedBlockId: string | null;
  selectedBlockIds: string[]; // multi-select support
  copiedBlocks: Block[]; // clipboard
  history: Block[][];
  future: Block[][];

  // Project Management
  projectName: string;
  activeProjectId: string | null;
  projects: Project[];

  // Actions
  addBlock: (type: BlockType, parentId?: string) => void;
  removeBlock: (id: string) => void;
  duplicateBlock: (id: string) => void;
  updateBlock: (id: string, props: Partial<Record<string, any>>) => void;
  reorderBlocks: (fromIndex: number, toIndex: number, parentId?: string) => void;
  selectBlock: (id: string | null) => void;
  setBlocks: (blocks: Block[]) => void;
  resetStore: () => void;

  // Block notes
  updateBlockNote: (id: string, note: string) => void;

  // Multi-select & Advanced arrangement actions
  toggleMultiSelectBlock: (id: string) => void;
  clearMultiSelect: () => void;
  copySelectedBlocks: () => void;
  pasteBlocks: () => void;
  groupSelectedBlocks: () => void;
  deleteSelectedBlocks: () => void;
  moveSelectedBlocks: (direction: "up" | "down") => void;
  duplicateSelectedBlocks: () => void;

  // Project Actions
  setProjectName: (name: string) => void;
  setActiveProjectId: (id: string | null) => void;
  setProjects: (projects: Project[]) => void;
  loadProject: (id: string) => void;

  // Undo/Redo
  undo: () => void;
  redo: () => void;
  canUndo: () => boolean;
  canRedo: () => boolean;

  // Templates
  loadTemplate: (template: TemplateType) => void;

  // Initialization
  initFromStorage: () => void;
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
  // 10 new template block configurations
  "web3-solana": [
    { id: "ws-h", type: "header", props: { style: "gradient", title: "Solana Pay Portal", subtitle: "Decentralized visual payment gateway for web3 checkout screens.", bgGradientStart: "#9945FF", bgGradientEnd: "#14F195", logoType: "auto", border: true } },
    { id: "ws-b", type: "badges", props: { githubRepo: "solana-labs/solana", badgeList: ["github-stars", "license"], badgeStyle: "flat" } },
    { id: "ws-t", type: "techstack", props: { techs: "Solana, Rust, TypeScript, React", layout: "row", iconSize: 40, showLabel: true } },
    { id: "ws-txt", type: "text", props: { content: "## Web3 Payment Protocol\nSecure, instant payment configurations using Solana Pay." } }
  ],
  "saas-landing": [
    { id: "saas-h", type: "header", props: { style: "gradient", title: "MetricsFlow SaaS", subtitle: "SaaS analytics platform to measure cohort retention and pipeline values in real-time.", bgGradientStart: "#4f46e5", bgGradientEnd: "#06b6d4", logoType: "auto", border: true } },
    { id: "saas-t", type: "techstack", props: { techs: "React, Next.js, Tailwind CSS, Prisma, PostgreSQL", layout: "row", iconSize: 40, showLabel: true } },
    { id: "saas-txt", type: "text", props: { content: "## Features\n- Real-time Pipeline Tracking\n- Custom Funnels\n- Automated Email Summaries" } }
  ],
  "mobile-app": [
    { id: "mob-h", type: "header", props: { style: "solid", title: "FitTrack Mobile", subtitle: "Cross-platform mobile app for workout planning and nutrition tracking.", bgColor: "#3b82f6", logoType: "auto", border: true } },
    { id: "mob-t", type: "techstack", props: { techs: "React Native, Flutter, Firebase, Node.js", layout: "row", iconSize: 40, showLabel: true } },
    { id: "mob-txt", type: "text", props: { content: "## Setup\nRun `npm install` and then `npx react-native run-ios`." } }
  ],
  "rest-api": [
    { id: "api-h", type: "header", props: { style: "minimal", title: "GeoLocation REST API", subtitle: "Ultra-fast geolocation microservice written in Go.", border: true } },
    { id: "api-c", type: "code", props: { language: "go", filename: "main.go", code: "package main\nimport \"fmt\"\nfunc main() {\n  fmt.Println(\"API Listening on :8080\")\n}", showLineNumbers: true } },
    { id: "api-txt", type: "text", props: { content: "## Endpoints\n- `GET /api/v1/locate?ip=...` returns coordinates.\n- `GET /api/v1/health` status check." } }
  ],
  "monorepo": [
    { id: "mono-h", type: "header", props: { style: "gradient", title: "Workspace Monorepo", subtitle: "Turborepo-powered monorepo for SaaS operations, admin portals, and API services.", bgGradientStart: "#ef4444", bgGradientEnd: "#f59e0b", logoType: "auto", border: true } },
    { id: "mono-t", type: "techstack", props: { techs: "TypeScript, Turborepo, Next.js, Docker", layout: "row", iconSize: 40, showLabel: true } }
  ],
  "hackathon": [
    { id: "hack-h", type: "header", props: { style: "gradient", title: "EcoSnap Hackathon Project", subtitle: "AI-driven recycling companion that classifies trash via camera uploads.", bgGradientStart: "#10b981", bgGradientEnd: "#059669", logoType: "auto", border: true } },
    { id: "hack-t", type: "techstack", props: { techs: "Python, PyTorch, React, Tailwind CSS", layout: "row", iconSize: 40, showLabel: true } }
  ],
  "portfolio": [
    { id: "port-h", type: "header", props: { style: "gradient", title: "Jane Dev - Software Engineer", subtitle: "Welcome to my portfolio! Building visual systems and high-throughput databases.", bgGradientStart: "#ec4899", bgGradientEnd: "#8b5cf6", logoType: "none", border: false } },
    { id: "port-stats", type: "githubstats", props: { username: "username", theme: "dark", statsType: "general", showIcons: true, hideRank: false } }
  ],
  "browser-ext": [
    { id: "ext-h", type: "header", props: { style: "solid", title: "FocusShield Extension", subtitle: "Chrome extension to block distracting feeds and set focus timers.", bgColor: "#4b5563", logoType: "auto", border: true } },
    { id: "ext-txt", type: "text", props: { content: "## Installation\nLoad unpacked folder inside chrome://extensions." } }
  ],
  "vscode-ext": [
    { id: "vsc-h", type: "header", props: { style: "minimal", title: "GitNotes VS Code Extension", subtitle: "Inline visual developer notes linked to git branches and git commits.", border: true } },
    { id: "vsc-txt", type: "text", props: { content: "## Install\nSearch for 'GitNotes' in the VS Code Marketplace." } }
  ],
  "discord-bot": [
    { id: "bot-h", type: "header", props: { style: "gradient", title: "ModeratorBot Discord", subtitle: "Auto-moderation bot keeping communities safe and rewarding contributions.", bgGradientStart: "#7289da", bgGradientEnd: "#23272a", logoType: "auto", border: true } },
    { id: "bot-t", type: "techstack", props: { techs: "Node.js, Discord.js, MongoDB", layout: "row", iconSize: 40, showLabel: true } }
  ]
};

const INITIAL_BLOCKS: Block[] = [
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
    selectedBlockId: "header-3",
    selectedBlockIds: ["header-3"], // default selection includes active
    copiedBlocks: [],
    history: [],
    future: [],
    projectName: "Untitled README",
    activeProjectId: null,
    projects: [],

    initFromStorage: () => {
      if (typeof window !== "undefined") {
        const stored = localStorage.getItem("readme-studio-blocks");
        const storedProjectName = localStorage.getItem("readme-studio-project-name");
        if (storedProjectName) {
          set({ projectName: storedProjectName });
        }
        if (stored) {
          try {
            const parsed = JSON.parse(stored) as Block[];
            if (Array.isArray(parsed) && parsed.length > 0) {
              set({
                blocks: parsed,
                selectedBlockId: parsed[0]?.id || null,
                selectedBlockIds: parsed[0] ? [parsed[0].id] : [],
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

    setBlocks: (newBlocks) => {
      saveStateToHistory(newBlocks);
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
      set({ selectedBlockId: id, selectedBlockIds: [id] });
    },

    removeBlock: (id) => {
      const blocks = get().blocks;
      const newBlocks = blocks.filter((b) => b.id !== id && b.parentId !== id);
      saveStateToHistory(newBlocks);
      if (get().selectedBlockId === id) {
        set({ selectedBlockId: newBlocks[0]?.id || null, selectedBlockIds: newBlocks[0] ? [newBlocks[0].id] : [] });
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
        _note: target._note
      };

      const newBlocks = [...blocks];
      newBlocks.splice(targetIndex + 1, 0, duplicate);

      // If duplicating a group, duplicate its children too
      if (target.type === "group") {
        const children = blocks.filter((b) => b.parentId === id);
        children.forEach((child, childIdx) => {
          const newChildId = `${child.type}-${Date.now()}-${childIdx}`;
          const childDuplicate: Block = {
            id: newChildId,
            type: child.type,
            props: JSON.parse(JSON.stringify(child.props)),
            parentId: newId,
            _note: child._note
          };
          newBlocks.splice(targetIndex + 2 + childIdx, 0, childDuplicate);
        });
      }

      saveStateToHistory(newBlocks);
      set({ selectedBlockId: newId, selectedBlockIds: [newId] });
    },

    updateBlock: (id, props) => {
      const newBlocks = get().blocks.map((b) => {
        if (b.id === id) {
          return { ...b, props: { ...b.props, ...props } };
        }
        return b;
      });
      set({ blocks: newBlocks });
      if (typeof window !== "undefined") {
        localStorage.setItem("readme-studio-blocks", JSON.stringify(newBlocks));
      }
    },

    updateBlockNote: (id, note) => {
      const newBlocks = get().blocks.map((b) => {
        if (b.id === id) {
          return { ...b, _note: note };
        }
        return b;
      });
      saveStateToHistory(newBlocks);
    },

    reorderBlocks: (fromIndex, toIndex, parentId) => {
      const blocks = get().blocks;
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
      set({
        selectedBlockId: id,
        selectedBlockIds: id ? [id] : []
      });
    },

    // Multi-select actions
    toggleMultiSelectBlock: (id) => {
      const currentIds = get().selectedBlockIds;
      let newIds = [...currentIds];
      if (currentIds.includes(id)) {
        newIds = newIds.filter(x => x !== id);
      } else {
        newIds.push(id);
      }
      set({
        selectedBlockIds: newIds,
        selectedBlockId: newIds.length > 0 ? newIds[newIds.length - 1] : null
      });
    },

    clearMultiSelect: () => {
      set({ selectedBlockIds: [], selectedBlockId: null });
    },

    copySelectedBlocks: () => {
      const { blocks, selectedBlockIds, selectedBlockId } = get();
      const ids = selectedBlockIds.length > 0
        ? selectedBlockIds
        : selectedBlockId
          ? [selectedBlockId]
          : [];

      if (ids.length === 0) return;
      const copied = blocks.filter(b => ids.includes(b.id)).map(b => JSON.parse(JSON.stringify(b)));
      set({ copiedBlocks: copied });
    },

    pasteBlocks: () => {
      const { blocks, copiedBlocks, selectedBlockId } = get();
      if (copiedBlocks.length === 0) return;

      const newBlocks = [...blocks];
      const targetId = selectedBlockId || (blocks.length > 0 ? blocks[blocks.length - 1].id : null);
      const targetIdx = targetId ? blocks.findIndex(b => b.id === targetId) : -1;

      const pastedList: Block[] = [];
      const idMap: Record<string, string> = {};

      copiedBlocks.forEach((b) => {
        const newId = `${b.type}-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
        idMap[b.id] = newId;
        pastedList.push({
          ...b,
          id: newId,
          props: JSON.parse(JSON.stringify(b.props)),
          _note: b._note
        });
      });

      pastedList.forEach((b) => {
        if (b.parentId && idMap[b.parentId]) {
          b.parentId = idMap[b.parentId];
        }
      });

      if (targetIdx !== -1) {
        newBlocks.splice(targetIdx + 1, 0, ...pastedList);
      } else {
        newBlocks.push(...pastedList);
      }

      saveStateToHistory(newBlocks);
      set({
        selectedBlockId: pastedList[0].id,
        selectedBlockIds: pastedList.map(b => b.id)
      });
    },

    groupSelectedBlocks: () => {
      const { blocks, selectedBlockIds } = get();
      if (selectedBlockIds.length === 0) return;

      const groupId = `group-${Date.now()}`;
      const groupBlock: Block = {
        id: groupId,
        type: "group",
        props: { title: "Group Container" }
      };

      const newBlocks = blocks.map(b => {
        if (selectedBlockIds.includes(b.id)) {
          return { ...b, parentId: groupId };
        }
        return b;
      });

      const firstIdx = blocks.findIndex(b => selectedBlockIds.includes(b.id));
      const targetIdx = firstIdx !== -1 ? firstIdx : newBlocks.length;
      newBlocks.splice(targetIdx, 0, groupBlock);

      saveStateToHistory(newBlocks);
      set({ selectedBlockId: groupId, selectedBlockIds: [groupId] });
    },

    deleteSelectedBlocks: () => {
      const { blocks, selectedBlockIds } = get();
      if (selectedBlockIds.length === 0) return;

      const newBlocks = blocks.filter(b => !selectedBlockIds.includes(b.id) && (!b.parentId || !selectedBlockIds.includes(b.parentId)));
      saveStateToHistory(newBlocks);
      set({ selectedBlockId: null, selectedBlockIds: [] });
    },

    moveSelectedBlocks: (direction) => {
      const { blocks, selectedBlockIds } = get();
      if (selectedBlockIds.length === 0) return;

      const newBlocks = [...blocks];
      const sortedSelectedIds = [...selectedBlockIds].sort((a, b) => {
        return blocks.findIndex(x => x.id === a) - blocks.findIndex(x => x.id === b);
      });

      if (direction === "up") {
        for (const id of sortedSelectedIds) {
          const idx = newBlocks.findIndex(x => x.id === id);
          if (idx > 0) {
            const temp = newBlocks[idx];
            newBlocks[idx] = newBlocks[idx - 1];
            newBlocks[idx - 1] = temp;
          }
        }
      } else {
        for (let i = sortedSelectedIds.length - 1; i >= 0; i--) {
          const id = sortedSelectedIds[i];
          const idx = newBlocks.findIndex(x => x.id === id);
          if (idx !== -1 && idx < newBlocks.length - 1) {
            const temp = newBlocks[idx];
            newBlocks[idx] = newBlocks[idx + 1];
            newBlocks[idx + 1] = temp;
          }
        }
      }

      saveStateToHistory(newBlocks);
    },

    duplicateSelectedBlocks: () => {
      const { blocks, selectedBlockIds } = get();
      if (selectedBlockIds.length === 0) return;

      const newBlocks = [...blocks];
      const duplicatedIds: string[] = [];

      selectedBlockIds.forEach((id) => {
        const idx = newBlocks.findIndex((b) => b.id === id);
        if (idx === -1) return;
        const target = newBlocks[idx];
        const newId = `${target.type}-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
        const duplicate: Block = {
          id: newId,
          type: target.type,
          props: JSON.parse(JSON.stringify(target.props)),
          parentId: target.parentId,
          _note: target._note
        };
        newBlocks.splice(idx + 1, 0, duplicate);
        duplicatedIds.push(newId);
      });

      saveStateToHistory(newBlocks);
      set({ selectedBlockIds: duplicatedIds, selectedBlockId: duplicatedIds[0] });
    },

    setProjectName: (name) => {
      set({ projectName: name });
      if (typeof window !== "undefined") {
        localStorage.setItem("readme-studio-project-name", name);
      }
    },

    setActiveProjectId: (id) => {
      set({ activeProjectId: id });
    },

    setProjects: (projects) => {
      set({ projects });
    },

    loadProject: (id) => {
      const proj = get().projects.find(p => p.id === id);
      if (proj) {
        set({
          blocks: proj.blocks,
          projectName: proj.name,
          activeProjectId: proj.id,
          selectedBlockId: proj.blocks[0]?.id || null,
          selectedBlockIds: proj.blocks[0] ? [proj.blocks[0].id] : [],
          history: [],
          future: []
        });
        if (typeof window !== "undefined") {
          localStorage.setItem("readme-studio-blocks", JSON.stringify(proj.blocks));
          localStorage.setItem("readme-studio-project-name", proj.name);
        }
      }
    },

    resetStore: () => {
      saveStateToHistory(INITIAL_BLOCKS);
      set({
        selectedBlockId: INITIAL_BLOCKS[0].id,
        selectedBlockIds: [INITIAL_BLOCKS[0].id],
        projectName: "Untitled README",
        activeProjectId: null
      });
      if (typeof window !== "undefined") {
        localStorage.setItem("readme-studio-project-name", "Untitled README");
      }
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
        selectedBlockIds: previous[0] ? [previous[0].id] : [],
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
        selectedBlockIds: next[0] ? [next[0].id] : [],
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
      set({ selectedBlockId: cloned[0]?.id || null, selectedBlockIds: cloned[0] ? [cloned[0].id] : [] });
    },
  };
});
