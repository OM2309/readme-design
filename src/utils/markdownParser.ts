import { Block, BlockType } from "@/store/blockRegistry";

export function parseMarkdownToBlocks(markdown: string): Block[] {
  const blocks: Block[] = [];
  if (!markdown || !markdown.trim()) return [];

  // Helper to push block
  const addBlock = (type: BlockType, props: Record<string, any>, parentId?: string) => {
    const id = `${type}-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
    blocks.push({ id, type, props, parentId });
    return id;
  };

  // We parse chunks sequentially.
  // First, let's extract blockquotes/groups since they are nested.
  // Then we replace them in the string with group placeholders, and parse the rest.
  // Actually, a simpler way is to split the text by blocks, keeping track of code fences, blockquotes, tables, etc.

  const lines = markdown.split("\n");
  let i = 0;

  while (i < lines.length) {
    const line = lines[i].trim();
    if (!line) {
      i++;
      continue;
    }

    // 1. Fenced Code Block
    if (line.startsWith("```")) {
      const lang = line.slice(3).trim() || "typescript";
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].trim().startsWith("```")) {
        codeLines.push(lines[i]);
        i++;
      }
      i++; // skip closing ```

      // Look back for a filename comment if exists: `index.ts`
      let filename = "";
      if (blocks.length > 0 && blocks[blocks.length - 1].type === "text") {
        const lastBlock = blocks[blocks.length - 1];
        if (lastBlock.props.content && lastBlock.props.content.trim().startsWith("`") && lastBlock.props.content.trim().endsWith("`")) {
          filename = lastBlock.props.content.trim().slice(1, -1);
          blocks.pop(); // remove the text block representing filename
        }
      }

      addBlock("code", {
        language: lang,
        filename,
        code: codeLines.join("\n"),
        showLineNumbers: true
      });
      continue;
    }

    // 2. Table Block
    if (line.startsWith("|") && i + 1 < lines.length && lines[i + 1].trim().startsWith("|") && lines[i + 1].includes("---")) {
      // Parse Table headers
      const headers = line.split("|").map(s => s.trim()).filter(Boolean);
      i += 2; // skip header and divider line

      const rows: string[][] = [];
      while (i < lines.length && lines[i].trim().startsWith("|")) {
        const rowCells = lines[i].split("|").map(s => s.trim()).filter(Boolean);
        rows.push(rowCells);
        i++;
      }

      addBlock("table", { headers, rows });
      continue;
    }

    // 3. Roadmap / Checklist Block
    if (line.startsWith("- [ ]") || line.startsWith("- [x]")) {
      const items: any[] = [];
      while (i < lines.length && (lines[i].trim().startsWith("- [ ]") || lines[i].trim().startsWith("- [x]"))) {
        const currentLine = lines[i].trim();
        const done = currentLine.startsWith("- [x]");
        const text = currentLine.slice(5).trim();
        items.push({ text, done });
        i++;
      }
      addBlock("roadmap", { items });
      continue;
    }

    // 4. Blockquote / Group Block
    if (line.startsWith("<blockquote>")) {
      const groupTitleMatch = markdown.slice(markdown.indexOf("<blockquote>")).match(/### (.*?)\n/);
      const title = groupTitleMatch ? groupTitleMatch[1] : "Section Box";

      // Accumulate quote content until </blockquote>
      const groupContentLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].trim().includes("</blockquote>")) {
        // Strip group title header if encountered
        if (!lines[i].trim().startsWith(`### ${title}`)) {
          groupContentLines.push(lines[i]);
        }
        i++;
      }
      i++; // skip closing </blockquote>

      const groupId = addBlock("group", { title });
      // Recursively parse children block content
      const childBlocks = parseMarkdownToBlocks(groupContentLines.join("\n"));
      childBlocks.forEach(child => {
        child.parentId = groupId;
        blocks.push(child);
      });
      continue;
    }

    // 5. Contributors Block
    if (line.includes("https://contrib.rocks")) {
      const repoMatch = line.match(/repo=([^&"]+)/);
      const maxMatch = line.match(/max=([0-9]+)/);
      const repo = repoMatch ? repoMatch[1] : "vercel/next.js";
      const maxCount = maxMatch ? Number(maxMatch[1]) : 12;

      addBlock("contributors", { repo, maxCount, avatarSize: 48 });
      i++;
      continue;
    }

    // 6. Star Chart Block
    if (line.includes("https://api.star-history.com")) {
      const repoMatch = line.match(/repos=([^&"]+)/);
      const repo = repoMatch ? repoMatch[1] : "facebook/react";
      addBlock("chart", { repo, theme: "dark" });
      i++;
      continue;
    }

    // 7. Divider Block
    if (line === "---" || line.includes("divider") || line.includes("wave.svg")) {
      let style = "line";
      let color = "#262626";
      let height = 24;

      if (line.includes("••••")) {
        style = "dots";
      } else if (line.includes("height:")) {
        style = "space";
        const hMatch = line.match(/height: ([0-9]+)px/);
        height = hMatch ? Number(hMatch[1]) : 24;
      } else if (line.includes("wave.svg")) {
        style = "wave";
      }

      const colorMatch = line.match(/background-color: ([^;"]+)/) || line.match(/color=([^"&]+)/);
      if (colorMatch) color = decodeURIComponent(colorMatch[1]);

      addBlock("divider", { style, color, height });
      i++;
      continue;
    }

    // 8. GitHub Stats Block
    if (line.includes("github-readme-stats") || line.includes("streak-stats") || line.includes("github-profile-trophy")) {
      const usernameMatch = line.match(/username=([^&")]+)/) || line.match(/user=([^&")]+)/);
      const themeMatch = line.match(/theme=([^&")]+)/);
      const username = usernameMatch ? usernameMatch[1] : "username";
      const theme = themeMatch ? themeMatch[1] : "dark";

      let statsType = "general";
      if (line.includes("streak-stats")) statsType = "streak";
      else if (line.includes("top-langs")) statsType = "languages";
      else if (line.includes("github-profile-trophy")) statsType = "trophy";

      const showIcons = line.includes("show_icons=true");
      const hideRank = line.includes("hide_rank=true");

      addBlock("githubstats", { username, theme, statsType, showIcons, hideRank });
      i++;
      continue;
    }

    // 9. Tech Stack Block
    if (line.includes("cdn.jsdelivr.net/gh/devicons")) {
      // Find all devicons in the text
      const iconMatches = Array.from(markdown.matchAll(/icons\/([^/]+)\//g));
      const techs = Array.from(new Set(iconMatches.map(m => m[1]))).join(", ");

      const layout = line.includes("<table") ? "grid" : "row";
      const sizeMatch = line.match(/width="([0-9]+)"/);
      const iconSize = sizeMatch ? Number(sizeMatch[1]) : 40;

      addBlock("techstack", { techs, layout, iconSize, showLabel: line.includes("<sub>") });
      // Skip lines in table format
      if (layout === "grid") {
        while (i < lines.length && !lines[i].includes("</table>")) {
          i++;
        }
      }
      i++;
      continue;
    }

    // 10. Social Links Block
    if (line.includes("img.shields.io/badge/") && (line.includes("Twitter") || line.includes("LinkedIn") || line.includes("Discord") || line.includes("GitHub") || line.includes("YouTube"))) {
      const items: any[] = [];
      const badgeRegex = /\[\!\[([^\]]+)\]\(([^)]+)\)\]\(([^)]+)\)/g;
      let match;
      while ((match = badgeRegex.exec(line)) !== null) {
        const platform = match[1];
        const url = match[3];
        items.push({ platform, url, label: platform });
      }

      addBlock("socials", { items, layout: line.includes("\n") ? "column" : "row" });
      i++;
      continue;
    }

    // 11. Sponsors Block
    if (line.includes("Sponsors") || (line.includes("Sponsor") && line.includes("logo"))) {
      const sponsors: any[] = [];
      // Look forward to find sponsor links
      let spIdx = i;
      while (spIdx < lines.length && (lines[spIdx].includes("Sponsor") || lines[spIdx].includes("href"))) {
        const spLine = lines[spIdx].trim();
        const logoMatch = spLine.match(/img src="([^"]+)"/);
        const linkMatch = spLine.match(/href="([^"]+)"/);
        const nameMatch = spLine.match(/alt="([^"]+)"/);
        if (logoMatch && linkMatch && nameMatch) {
          sponsors.push({
            name: nameMatch[1],
            logo: logoMatch[1],
            link: linkMatch[1]
          });
        }
        spIdx++;
      }
      addBlock("sponsors", { layout: "grid", sponsors });
      i = spIdx;
      continue;
    }

    // 12. Video Embed Block
    if (line.includes("<a href=") && (line.includes("watch?") || line.includes("youtu.be") || line.includes("GIF") || line.includes("mp4"))) {
      const linkMatch = line.match(/href="([^"]+)"/);
      const imgMatch = line.match(/img src="([^"]+)"/);
      const altMatch = line.match(/alt="([^"]+)"/) || line.match(/alt=([^" >]+)/);
      const url = linkMatch ? linkMatch[1] : imgMatch ? imgMatch[1] : "";
      const caption = altMatch ? altMatch[1] : "Walkthrough";

      addBlock("video", { url, caption, width: 100, align: "center" });
      i++;
      continue;
    }

    // 13. Badges Block
    if (line.startsWith("[![npm") || line.startsWith("[![github") || line.startsWith("[![license")) {
      const packageNameMatch = line.match(/package\/([^)]+)/);
      const repoMatch = line.match(/github\/stars\/([^.?]+)\/([^.?]+)/);

      const packageName = packageNameMatch ? packageNameMatch[1] : "";
      const githubRepo = repoMatch ? `${repoMatch[1]}/${repoMatch[2]}` : "";

      const badgeList: string[] = [];
      if (line.includes("npm/v")) badgeList.push("npm-v");
      if (line.includes("github/stars")) badgeList.push("github-stars");
      if (line.includes("github/license")) badgeList.push("license");
      if (line.includes("workflow/status")) badgeList.push("github-status");

      addBlock("badges", { packageName, githubRepo, badgeList, badgeStyle: "flat" });
      i++;
      continue;
    }

    // 14. Image Block
    if (line.includes("<img src=") || line.startsWith("![") || line.includes("Image")) {
      const imgMatch = line.match(/src="([^"]+)"/) || line.match(/!\[.*?\]\((.*?)\)/);
      const altMatch = line.match(/alt="([^"]+)"/) || line.match(/!\[(.*?)\]/);
      const widthMatch = line.match(/width="([^"]+)"/);

      if (imgMatch) {
        addBlock("image", {
          url: imgMatch[1],
          caption: altMatch ? altMatch[1] : "",
          width: widthMatch ? widthMatch[1] : "100%",
          align: "center"
        });
      }
      i++;
      continue;
    }

    // 15. Header Block
    if (line.startsWith("<div align=") || line.startsWith("<h1>") || line.startsWith("# ")) {
      const titleMatch = line.match(/<h1>(.*?)<\/h1>/) || line.match(/# (.*)/);
      const title = titleMatch ? titleMatch[1].trim() : "Project Title";

      let subtitle = "";
      if (i + 1 < lines.length && (lines[i + 1].includes("<em>") || lines[i + 1].includes("> "))) {
        const subMatch = lines[i + 1].match(/<em>(.*?)<\/em>/) || lines[i + 1].match(/> (.*)/);
        subtitle = subMatch ? subMatch[1].trim() : "";
        i++;
      }

      const align = line.includes("center") ? "center" : line.includes("right") ? "right" : "left";

      addBlock("header", {
        style: align === "center" ? "gradient" : "minimal",
        title,
        subtitle,
        logoType: "none",
        bgColor: "#111827",
        size: "banner",
        theme: "dark",
        align,
        font: "inter",
        border: true,
        watermark: false
      });
      i++;
      continue;
    }

    // 16. Fallback Text Block
    // Read consecutive normal text lines and merge them into a single text block
    const textLines: string[] = [];
    while (i < lines.length &&
      lines[i].trim() &&
      !lines[i].trim().startsWith("```") &&
      !lines[i].trim().startsWith("|") &&
      !lines[i].trim().startsWith("- [") &&
      !lines[i].trim().startsWith("<blockquote>") &&
      !lines[i].trim().includes("https://contrib.rocks") &&
      !lines[i].trim().includes("https://api.star-history.com") &&
      !lines[i].trim().startsWith("---") &&
      !lines[i].trim().includes("github-readme-stats") &&
      !lines[i].trim().includes("streak-stats") &&
      !lines[i].trim().includes("devicons") &&
      !lines[i].trim().includes("badges") &&
      !lines[i].trim().startsWith("[![npm") &&
      !lines[i].trim().startsWith("[![github") &&
      !lines[i].trim().startsWith("[![license") &&
      !lines[i].trim().startsWith("<div align=") &&
      !lines[i].trim().startsWith("<h1>") &&
      !lines[i].trim().startsWith("# ")
    ) {
      textLines.push(lines[i]);
      i++;
    }

    if (textLines.length > 0) {
      addBlock("text", { content: textLines.join("\n") });
    } else {
      i++;
    }
  }

  return blocks;
}
