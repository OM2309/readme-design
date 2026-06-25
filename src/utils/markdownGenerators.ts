import { Block } from "@/store/blockRegistry";

export function blockToMarkdown(block: Block, allBlocks: Block[]): string {
  const { type, props } = block;

  switch (type) {
    case "header": {
      const align = props.align || "center";
      const alignHtml = align === "center" ? ' align="center"' : align === "right" ? ' align="right"' : "";
      const font = props.font || "inter";
      
      let content = "";

      if (props.bgType === "image" && props.bgImage) {
        content += `<p${alignHtml}><img src="${props.bgImage}" alt="${props.altText || "banner"}" width="100%" /></p>\n\n`;
      }

      const hasLogo = props.logoType !== "none";
      const logoUrl = props.logoType === "auto" 
        ? "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&fit=crop&q=80" 
        : props.logoUrl;

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
        return sponsors
          .map((sp: any) => `- **[${sp.name}](${sp.link || "https://github.com"})**`)
          .join("\n");
      }
    }

    // --- 8 NEW BLOCKS SERIALIZATION ---
    
    case "techstack": {
      const { techs = "", layout = "row", iconSize = 40, showLabel = true } = props;
      const techNames = techs.split(",").map((t: string) => t.trim()).filter(Boolean);
      
      if (techNames.length === 0) return "";

      const getIconUrl = (name: string) => {
        // Map common devicon names that don't match slug exactly
        const mapped = name.toLowerCase()
          .replace("node.js", "nodejs")
          .replace("nodejs", "nodejs")
          .replace("c++", "cplusplus")
          .replace("c#", "csharp")
          .replace("css3", "css3")
          .replace("html5", "html5")
          .replace("postgresql", "postgresql")
          .replace("sql", "mysql");
        return `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${mapped}/${mapped}-original.svg`;
      };

      if (layout === "grid") {
        // Render as HTML table
        let md = `<table align="center">\n  <tr>\n`;
        techNames.forEach((tech: string, i: number) => {
          const icon = getIconUrl(tech);
          md += `    <td align="center" valign="top" width="${iconSize + 20}">\n`;
          md += `      <img src="${icon}" alt="${tech}" width="${iconSize}" height="${iconSize}" />\n`;
          if (showLabel) {
            md += `      <br/><sub>${tech}</sub>\n`;
          }
          md += `    </td>\n`;
          // Split into rows of 6
          if ((i + 1) % 6 === 0 && i !== techNames.length - 1) {
            md += `  </tr>\n  <tr>\n`;
          }
        });
        md += `  </tr>\n</table>`;
        return md;
      } else {
        // Row layout
        let md = `<p align="center">\n`;
        techNames.forEach((tech: string, i: number) => {
          const icon = getIconUrl(tech);
          md += `  <img src="${icon}" alt="${tech}" width="${iconSize}" height="${iconSize}" />\n`;
          if (i < techNames.length - 1) {
            md += `  &nbsp;&nbsp;\n`;
          }
        });
        md += `</p>`;
        return md;
      }
    }

    case "contributors": {
      const { repo = "vercel/next.js", maxCount = 12 } = props;
      if (!repo) return "";
      return `<p align="center">\n  <a href="https://github.com/${repo}/graphs/contributors">\n    <img src="https://contrib.rocks/image?repo=${repo}&max=${maxCount}" alt="Contributors" />\n  </a>\n</p>`;
    }

    case "socials": {
      const { items = [], layout = "row" } = props;
      if (items.length === 0) return "";

      const platformColors: Record<string, string> = {
        "Twitter/X": "%231DA1F2",
        "LinkedIn": "%230077B5",
        "Discord": "%235865F2",
        "YouTube": "%23FF0000",
        "Dev.to": "%230A0A0A",
        "Portfolio": "%230190FF",
        "Email": "D14836",
        "GitHub": "%23121011"
      };

      const platformLogos: Record<string, string> = {
        "Twitter/X": "x",
        "LinkedIn": "linkedin",
        "Discord": "discord",
        "YouTube": "youtube",
        "Dev.to": "devto",
        "Portfolio": "about.me",
        "Email": "gmail",
        "GitHub": "github"
      };

      const badgeList = items.map((item: any) => {
        const logo = platformLogos[item.platform] || "github";
        const color = platformColors[item.platform] || "%2324292e";
        const badgeUrl = `https://img.shields.io/badge/${encodeURIComponent(item.label || item.platform)}-${color}.svg?style=for-the-badge&logo=${logo}&logoColor=white`;
        return `[![${item.label || item.platform}](${badgeUrl})](${item.url || "#"})`;
      });

      return layout === "column" ? badgeList.join("\n") : badgeList.join(" ");
    }

    case "roadmap": {
      const { items = [] } = props;
      if (items.length === 0) return "";
      return items
        .map((item: any) => `- [${item.done ? "x" : " "}] ${item.text}`)
        .join("\n");
    }

    case "divider": {
      const { style = "line", height = 24, color = "#262626" } = props;
      if (style === "line") {
        return `\n<hr style="height: 2px; border: none; background-color: ${color}; margin: 20px 0;" />\n`;
      }
      if (style === "dots") {
        return `\n<p align="center" style="color: ${color}; letter-spacing: 12px; font-weight: bold; font-size: 18px; margin: 15px 0;">••••••••••••</p>\n`;
      }
      if (style === "space") {
        return `\n<div style="height: ${height}px"></div>\n`;
      }
      if (style === "wave") {
        // Standard embedded wave SVG banner URL or custom Kroppy Wave banner
        return `\n<p align="center"><img src="https://kroppy.github.io/readme-studio-banners/wave.svg?color=${encodeURIComponent(color)}" alt="wave divider" width="100%" /></p>\n`;
      }
      return "---";
    }

    case "video": {
      const { url = "", caption = "", width = 100, align = "center" } = props;
      if (!url) return "";

      const getYoutubeId = (youtubeUrl: string) => {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        const match = youtubeUrl.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
      };

      const ytId = getYoutubeId(url);
      const alignHtml = align === "center" ? ' align="center"' : align === "right" ? ' align="right"' : "";

      if (ytId) {
        const thumb = `https://img.youtube.com/vi/${ytId}/maxresdefault.jpg`;
        let md = `<div${alignHtml}>\n  <a href="${url}">\n    <img src="${thumb}" alt="${caption || "Watch video"}" width="${width}%" />\n  </a>\n`;
        if (caption) {
          md += `  <p><em>${caption}</em></p>\n`;
        }
        md += `</div>`;
        return md;
      } else {
        // Generic video/GIF
        let md = `<div${alignHtml}>\n  <img src="${url}" alt="${caption || "Demo"}" width="${width}%" />\n`;
        if (caption) {
          md += `  <p><em>${caption}</em></p>\n`;
        }
        md += `</div>`;
        return md;
      }
    }

    case "code": {
      const { language = "typescript", filename = "", code = "", showLineNumbers = true } = props;
      let md = "";
      if (filename) {
        md += `\`${filename}\`\n`;
      }
      md += `\`\`\`${language}\n${code}\n\`\`\``;
      return md;
    }

    case "githubstats": {
      const { username = "username", theme = "dark", statsType = "general", showIcons = true, hideRank = false } = props;
      if (!username) return "";

      const t = theme.toLowerCase();

      switch (statsType) {
        case "general":
          return `![GitHub Stats](https://github-readme-stats.vercel.app/api?username=${username}&theme=${t}&show_icons=${showIcons}&hide_rank=${hideRank})`;
        case "streak":
          return `![GitHub Streak](https://streak-stats.demolab.com?user=${username}&theme=${t})`;
        case "languages":
          return `![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=${username}&theme=${t}&layout=compact)`;
        case "trophy":
          return `![GitHub Trophies](https://github-profile-trophy.vercel.app/?username=${username}&theme=${t})`;
        default:
          return "";
      }
    }

    default:
      return "";
  }
}

export function generateReadmeMarkdown(blocks: Block[]): string {
  const rootBlocks = blocks.filter((b) => !b.parentId);
  return rootBlocks.map((b) => blockToMarkdown(b, blocks)).join("\n\n");
}
