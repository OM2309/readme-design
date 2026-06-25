import { Block } from "@/store/blockRegistry";

export interface LintWarning {
  id: string;
  blockId: string;
  message: string;
  severity: "warning" | "info" | "error";
}

export function analyzeBlocks(blocks: Block[]): LintWarning[] {
  const warnings: LintWarning[] = [];
  const idsSeen = new Set<string>();

  blocks.forEach((block, idx) => {
    // 1. Duplicate block IDs
    if (idsSeen.has(block.id)) {
      warnings.push({
        id: `dup-id-${block.id}-${idx}`,
        blockId: block.id,
        message: "Internal: duplicate block IDs detected.",
        severity: "error"
      });
    }
    idsSeen.add(block.id);

    // 2. Header block with empty title
    if (block.type === "header") {
      if (!block.props.title || !block.props.title.trim()) {
        warnings.push({
          id: `hdr-empty-title-${block.id}`,
          blockId: block.id,
          message: "Header title is empty.",
          severity: "warning"
        });
      }
    }

    // 3. Badges block with empty repo or invalid format
    if (block.type === "badges") {
      const repo = block.props.githubRepo;
      if (!repo || !repo.trim()) {
        warnings.push({
          id: `bdg-empty-repo-${block.id}`,
          blockId: block.id,
          message: "Set GitHub repo to generate correct badge URLs.",
          severity: "warning"
        });
      } else {
        const repoRegex = /^[a-zA-Z0-9-]+\/[a-zA-Z0-9_.-]+$/;
        if (!repoRegex.test(repo.trim())) {
          warnings.push({
            id: `bdg-invalid-repo-${block.id}`,
            blockId: block.id,
            message: "Repo format should be owner/repo.",
            severity: "error"
          });
        }
      }
    }

    // 4. Table block with uneven columns
    if (block.type === "table") {
      const headersCount = (block.props.headers || []).length;
      const rows = block.props.rows || [];
      rows.forEach((row: string[], rIdx: number) => {
        if (row.length !== headersCount) {
          warnings.push({
            id: `tbl-uneven-row-${block.id}-${rIdx}`,
            blockId: block.id,
            message: `Row ${rIdx + 1} has ${row.length} cells, expected ${headersCount}.`,
            severity: "warning"
          });
        }
      });
    }

    // 5. Empty text block
    if (block.type === "text") {
      if (!block.props.content || !block.props.content.trim()) {
        warnings.push({
          id: `txt-empty-content-${block.id}`,
          blockId: block.id,
          message: "Text block has no content.",
          severity: "info"
        });
      }
    }

    // 6. Image block with no descriptive alt text / caption
    if (block.type === "image") {
      if (!block.props.caption || !block.props.caption.trim()) {
        warnings.push({
          id: `img-empty-caption-${block.id}`,
          blockId: block.id,
          message: "Image block is missing descriptive caption/alt text for accessibility.",
          severity: "info"
        });
      }
    }
  });

  return warnings;
}
