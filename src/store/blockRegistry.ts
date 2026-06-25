export type BlockType =
  | "header"
  | "text"
  | "badges"
  | "group"
  | "chart"
  | "table"
  | "image"
  | "sponsors"
  // New Block Types
  | "techstack"
  | "contributors"
  | "socials"
  | "roadmap"
  | "divider"
  | "video"
  | "code"
  | "githubstats";

export interface Block {
  id: string;
  type: BlockType;
  props: Record<string, any>;
  parentId?: string;
  _note?: string; // Sticky-note comment text
}
