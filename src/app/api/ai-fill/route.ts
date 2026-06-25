import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { repoPath } = await req.json();
    if (!repoPath) {
      return NextResponse.json({ error: "Repository path is required." }, { status: 400 });
    }

    const cleanPath = repoPath.replace("https://github.com/", "").replace(".git", "").trim();
    const parts = cleanPath.split("/");
    if (parts.length < 2) {
      return NextResponse.json({ error: "Invalid repository format. Expected owner/repo." }, { status: 400 });
    }
    const [owner, repoName] = parts;

    // Fetch repository data from GitHub (gotcha safeguard: User-Agent header is required by GitHub API)
    const githubHeaders = {
      "User-Agent": "readme-studio-generator",
      Accept: "application/vnd.github.v3+json",
      ...(process.env.GITHUB_ACCESS_TOKEN ? { Authorization: `token ${process.env.GITHUB_ACCESS_TOKEN}` } : {}),
    };

    const [repoRes, readmeRes, langRes, topicsRes] = await Promise.all([
      fetch(`https://api.github.com/repos/${owner}/${repoName}`, { headers: githubHeaders }).then(r => r.ok ? r.json() : null),
      fetch(`https://api.github.com/repos/${owner}/${repoName}/readme`, { headers: githubHeaders }).then(r => r.ok ? r.json() : null),
      fetch(`https://api.github.com/repos/${owner}/${repoName}/languages`, { headers: githubHeaders }).then(r => r.ok ? r.json() : null),
      fetch(`https://api.github.com/repos/${owner}/${repoName}/topics`, { headers: githubHeaders }).then(r => r.ok ? r.json() : null)
    ]);

    if (!repoRes) {
      return NextResponse.json({ error: "Failed to fetch repository metadata. Verify if it is a public repository." }, { status: 404 });
    }

    // Decode readme base64 content
    let readmeExcerpt = "";
    if (readmeRes && readmeRes.content) {
      try {
        const decoded = Buffer.from(readmeRes.content, "base64").toString("utf-8");
        readmeExcerpt = decoded.slice(0, 1500) + "..."; // grab first 1500 chars
      } catch (e) {
        console.warn("Failed to decode readme content:", e);
      }
    }

    const name = repoRes.name || repoName;
    const description = repoRes.description || "";
    const stars = repoRes.stargazers_count || 0;
    const languages = langRes ? Object.keys(langRes).join(", ") : "";
    const topics = topicsRes && topicsRes.names ? topicsRes.names.join(", ") : "";

    // AI Generation prompt
    const prompt = `
You are a README generation expert for GitHub projects.

Your job is to analyze the repository data provided below and return a README Studio
block configuration — a JSON array of blocks that, when rendered together, produce
a complete, professional, and well-structured README for this project.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
REPOSITORY DATA
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Name:              ${name}
Owner:             ${owner}
Full repo path:    ${owner}/${repoName}
Description:       ${description}
Stars:             ${stars}
Primary languages: ${languages}
Topics/tags:       ${topics}
Existing README:   ${readmeExcerpt}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
YOUR TASK
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Using the repository data above, generate a JSON array of README blocks.

Each block must follow this exact shape:
{
  "type": "",
  "props": {  }
}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
AVAILABLE BLOCK TYPES & THEIR PROPS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. "header"
   The hero banner at the top of the README.
   Use the repo name as the title and the description as the subtitle.
   Choose a style based on the project's nature:
     - "gradient" for modern/flashy open-source tools
     - "solid"    for professional/corporate projects
     - "minimal"  for simple libraries or CLIs
   Props:
   {
     "style":     "gradient" | "solid" | "minimal",
     "title":     "${name}",
     "subtitle":  "${description}",
     "logoType":  "auto",
     "bgColor":   "#000000",
     "border":    true,
     "watermark": false
   }

2. "badges"
   Shields.io badges shown below the header.
   Always include "github-stars" and "license".
   Add "npm-version" if the project is an npm package.
   Add "build-status" if it looks like a CI/CD project.
   Props:
   {
     "packageName": "",
     "githubRepo":  "${owner}/${repoName}",
     "badgeList":   ["github-stars", "license"],
     "badgeStyle":  "flat"
   }

3. "techstack"
   A visual row of technology icons.
   Extract the languages from the languages field above and list them
   as a comma-separated string (e.g. "TypeScript, React, PostgreSQL").
   Props:
   {
     "techs":     "${languages}",
     "layout":    "row",
     "iconSize":  40,
     "showLabel": true
   }

4. "text"
   A markdown text block. Use this for:
   - Project overview (what it does, why it exists, key features as a bullet list)
   - Installation / setup instructions (with bash code fences)
   - Usage examples (with code fences showing real commands or API calls)
   Write the "content" field as real, helpful GitHub Markdown.
   Props:
   {
     "content": ""
   }

5. "divider"
   A thin horizontal separator. Place one between major sections.
   Props:
   {
     "style": "line",
     "color": "#262626"
   }

6. "contributors"
   Renders the top contributors of the repo as avatars.
   Always use the full repo path. Keep maxCount at 12.
   Props:
   {
     "repo":       "${owner}/${repoName}",
     "maxCount":   12,
     "avatarSize": 48
   }

7. "githubstats"
   Renders the owner's GitHub stats card.
   Only include this block if the project appears to be a personal/portfolio project
   (i.e. the owner is an individual, not an org, and topics suggest a personal project).
   Use "dark" theme by default.
   Props:
   {
     "username":  "${owner}",
     "theme":     "dark",
     "statsType": "general"
   }

Other available types (use only when the repo data clearly warrants them):
  "chart"       — star history chart       → props: { "repo": "${owner}/${repoName}" }
  "roadmap"     — feature checklist        → props: { "items": [{ "text": "...", "done": true/false }] }
  "code"        — fenced code snippet      → props: { "language": "bash", "filename": "", "code": "..." }
  "socials"     — social links row         → props: { "items": [{ "platform": "...", "url": "...", "label": "..." }] }
  "image"       — screenshot or demo image → props: { "url": "...", "caption": "...", "width": 100 }
  "table"       — markdown data table      → props: { "rows": [["Col A", "Col B"], ["val", "val"]] }

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
REQUIRED BLOCK ORDER
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Always output blocks in this sequence:

  1.  header        — project title + description
  2.  badges        — stars, license, optional npm/build badges
  3.  divider
  4.  techstack     — icons of all detected languages/frameworks
  5.  divider
  6.  text          — "About" section: what the project does + key features list
  7.  text          — "Installation" section: how to install and run it
  8.  text          — "Usage" section: code example showing how to use it (skip if not enough info)
  9.  divider
  10. contributors  — contributor avatar grid
  11. githubstats   — owner's GitHub stats card (personal projects only)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
STRICT OUTPUT RULES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
- Output ONLY the raw JSON array. Nothing else.
- Do NOT wrap the output in markdown code fences (\`\`\`json ... \`\`\`).
- Do NOT include any explanation, preamble, or commentary.
- Do NOT add wrapper fields like { "blocks": [...] }. Return the array directly.
- Every block must have both "type" and "props" fields.
- All "text" block content must be real, useful markdown — not placeholder text.
- If the existing README snippet contains useful content, incorporate it into the text blocks.
- If a field value is unknown or unavailable, use a sensible default — never leave props empty.
- The final output must be valid, parseable JSON.
`.trim();


    let aiBlocks: any[] = [];
    const openAiKey = process.env.OPENAI_API_KEY;
    const geminiKey = process.env.GEMINI_API_KEY;

    if (geminiKey) {
      // Vertex AI / Google AI Studio API call
      const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${geminiKey}`;
      const response = await fetch(geminiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { responseMimeType: "application/json" }
        })
      });

      const result = await response.json();
      const text = result.candidates?.[0]?.content?.parts?.[0]?.text || "[]";
      aiBlocks = JSON.parse(text);
    } else if (openAiKey) {
      // OpenAI API call
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${openAiKey}`
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          response_format: { type: "json_object" },
          messages: [
            { role: "system", content: "You are a README layout configuration generator. You output JSON containing a list of block elements under a 'blocks' key." },
            { role: "user", content: prompt }
          ]
        })
      });

      const result = await response.json();
      const text = result.choices?.[0]?.message?.content || "{}";
      const parsedObj = JSON.parse(text);
      aiBlocks = parsedObj.blocks || parsedObj;
    } else {
      // Mock / fallback layout generator if no API keys are set
      aiBlocks = [
        { type: "header", props: { style: "gradient", title: name, subtitle: description, logoType: "auto", border: true } },
        { type: "badges", props: { githubRepo: `${owner}/${repoName}`, badgeList: ["github-stars", "license"], badgeStyle: "flat" } },
        { type: "techstack", props: { techs: languages || "React, TypeScript", layout: "row", iconSize: 40, showLabel: true } },
        { type: "text", props: { content: `## 🚀 Overview\n\n${description || "No description provided."}\n\n## 🛠️ Installation\n\n\`\`\`bash\npnpm install\n\`\`\`` } },
        { type: "contributors", props: { repo: `${owner}/${repoName}`, maxCount: 12, avatarSize: 48 } }
      ];
    }

    // Add unique IDs to the generated blocks to match registry schema
    const formattedBlocks = aiBlocks.map((b: any, index: number) => ({
      id: `${b.type}-ai-${Date.now()}-${index}`,
      type: b.type,
      props: b.props || {},
      parentId: b.parentId
    }));

    return NextResponse.json({ blocks: formattedBlocks });
  } catch (error: any) {
    console.error("AI Auto-fill failed:", error);
    return NextResponse.json({ error: error.message || "Failed to generate layout." }, { status: 500 });
  }
}
