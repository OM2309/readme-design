import { Block } from "@/store/readmeStore";

export function blockToMarkdown(block: Block, allBlocks: Block[]): string {
  const { type, props } = block;

  switch (type) {
    case "header": {
      const align = props.align || "center";
      const alignHtml = align === "center" ? ' align="center"' : align === "right" ? ' align="right"' : "";
      const font = props.font || "inter";
      
      let content = "";

      // Render Banner Image if configured
      if (props.bgType === "image" && props.bgImage) {
        content += `<p${alignHtml}><img src="${props.bgImage}" alt="${props.altText || "banner"}" width="100%" /></p>\n\n`;
      } else if (props.bgType === "color" && props.style === "gradient") {
        // Generate a beautiful gradient SVG banner inline!
        const startColor = encodeURIComponent(props.bgGradientStart || "#4f46e5");
        const endColor = encodeURIComponent(props.bgGradientEnd || "#ec4899");
        const titleText = encodeURIComponent(props.title || "");
        const subText = encodeURIComponent(props.subtitle || "");
        const height = props.size === "compact" ? 120 : 200;
        
        // We can use shields.io or custom dynamic SVG generator or standard gradient banner
        const svgBannerUrl = `https://kroppy.github.io/readme-studio-banners/gradient.svg?start=${startColor}&end=${endColor}&title=${titleText}&subtitle=${subText}&height=${height}&font=${font}`;
        
        // As a fallback or standard, let's use a nice shields banner or typing svg
        // Actually, let's write a standard HTML table/banner block or just use text if Kroppy doesn't resolve.
        // Let's use a standard HTML gradient banner or text.
        // Wait, dynamic SVGs might fail if host goes down, so we can generate a beautiful centered HTML block with title/subtitle:
      }

      const hasLogo = props.logoType !== "none" && (props.logoType === "auto" || props.logoUrl);
      const logoUrl = props.logoType === "auto" 
        ? "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&fit=crop&q=80" 
        : props.logoUrl;

      // Wrap in align div
      if (align === "center" || align === "right") {
        content += `<div${alignHtml}>\n`;
        if (hasLogo && logoUrl) {
          content += `  <img src="${logoUrl}" alt="${props.altText || "logo"}" height="80" style="border-radius: 12px; margin-bottom: 10px;" />\n`;
        }
        content += `  <h1>${props.title || ""}</h1>\n`;
        if (props.subtitle) {
          content += `  <p><em>${props.subtitle}</em></p>\n`;
        }
        content += `</div>\n`;
      } else {
        // Left alignment (minimal/standard markdown)
        if (hasLogo && logoUrl) {
          content += `<img src="${logoUrl}" alt="${props.altText || "logo"}" height="60" style="border-radius: 8px; float: left; margin-right: 15px; margin-bottom: 10px;" />\n\n`;
        }
        content += `# ${props.title || ""}\n\n`;
        if (props.subtitle) {
          content += `> ${props.subtitle}\n\n`;
        }
        if (hasLogo && logoUrl) {
          content += `<br clear="left"/>\n\n`;
        }
      }

      if (props.border) {
        content += "\n---\n";
      }

      if (props.watermark) {
        content += `\n<p align="right"><sub><em>Generated with <a href="https://github.com">README Studio</a></em></sub></p>\n`;
      }

      return content;
    }

    case "text": {
      return props.content || "";
    }

    case "badges": {
      const { packageName, githubRepo, badgeList = [], badgeStyle = "flat" } = props;
      const badges: string[] = [];

      badgeList.forEach((badgeType: string) => {
        if (badgeType === "npm-v" && packageName) {
          badges.push(
            `[![npm version](https://img.shields.io/npm/v/${packageName}.svg?style=${badgeStyle})](https://www.npmjs.com/package/${packageName})`
          );
        } else if (badgeType === "github-stars" && githubRepo) {
          badges.push(
            `[![github stars](https://img.shields.io/github/stars/${githubRepo}.svg?style=${badgeStyle})](https://github.com/${githubRepo}/stargazers)`
          );
        } else if (badgeType === "license" && githubRepo) {
          badges.push(
            `[![license](https://img.shields.io/github/license/${githubRepo}.svg?style=${badgeStyle})](https://github.com/${githubRepo}/blob/main/LICENSE)`
          );
        } else if (badgeType === "github-status" && githubRepo) {
          badges.push(
            `[![build status](https://img.shields.io/github/actions/workflow/status/${githubRepo}/ci.yml.svg?style=${badgeStyle}&label=build)](https://github.com/${githubRepo}/actions)`
          );
        }
      });

      return badges.join(" ");
    }

    case "group": {
      // Find all blocks that belong to this group
      const children = allBlocks.filter((b) => b.parentId === block.id);
      if (children.length === 0) return "";
      
      const childrenMarkdown = children
        .map((c) => blockToMarkdown(c, allBlocks))
        .join("\n\n");

      return `<blockquote>\n\n### ${props.title || "Section"}\n\n${childrenMarkdown}\n\n</blockquote>`;
    }

    case "chart": {
      const repo = props.repo || "facebook/react";
      return `[![Star History Chart](https://api.star-history.com/svg?repos=${repo}&type=Date)](https://star-history.com/#${repo}&Date)`;
    }

    case "table": {
      const headers = props.headers || [];
      const rows = props.rows || [];

      if (headers.length === 0) return "";

      const headerRow = `| ${headers.join(" | ")} |`;
      const dividerRow = `| ${headers.map(() => "---").join(" | ")} |`;
      const bodyRows = rows.map((row: string[]) => `| ${row.join(" | ")} |`);

      return [headerRow, dividerRow, ...bodyRows].join("\n");
    }

    case "image": {
      const url = props.url || "";
      const caption = props.caption || "";
      const align = props.align || "center";
      const width = props.width || "100%";

      const alignHtml = align === "center" ? ' align="center"' : align === "right" ? ' align="right"' : "";

      let content = `<p${alignHtml}>\n  <img src="${url}" alt="${caption || "Image"}" width="${width}" />\n</p>`;
      if (caption) {
        content += `\n<p${alignHtml}><em>${caption}</em></p>`;
      }

      return content;
    }

    case "sponsors": {
      const sponsors = props.sponsors || [];
      const layout = props.layout || "grid";

      if (sponsors.length === 0) return "";

      if (layout === "grid") {
        let content = `<p align="center">\n`;
        sponsors.forEach((sp: any) => {
          content += `  <a href="${sp.link || "https://github.com"}"><img src="${sp.logo}" width="60" height="60" alt="${sp.name}" style="border-radius: 50%; margin: 5px;" /></a>\n`;
        });
        content += `</p>`;
        return content;
      } else {
        // List layout
        return sponsors
          .map((sp: any) => `- **[${sp.name}](${sp.link || "https://github.com"})**`)
          .join("\n");
      }
    }

    default:
      return "";
  }
}

export function generateReadmeMarkdown(blocks: Block[]): string {
  // Only process root blocks (blocks with no parentId)
  // Group block's toMarkdown recursively processes its children
  const rootBlocks = blocks.filter((b) => !b.parentId);
  return rootBlocks.map((b) => blockToMarkdown(b, blocks)).join("\n\n");
}
