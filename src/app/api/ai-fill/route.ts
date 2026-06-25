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
    const prompt = `Given this GitHub repo data, generate a README Studio block configuration as JSON.
Repo: ${name}, Description: ${description}, Stars: ${stars}
Languages: ${languages}, Topics: ${topics}
Existing README snippet: ${readmeExcerpt}

Return a JSON array of blocks with type and props that would make a great README.
The JSON array MUST fit the block structure:
[
  {
    "type": "header" | "text" | "badges" | "group" | "chart" | "table" | "image" | "sponsors" | "techstack" | "contributors" | "socials" | "roadmap" | "divider" | "video" | "code" | "githubstats",
    "props": { ... }
  }
]

Block details:
- header: { "style": "gradient" | "solid" | "minimal", "title": "${name}", "subtitle": "${description}", "logoType": "auto", "bgColor": "#000000", "border": true, "watermark": false }
- techstack: { "techs": "${languages}", "layout": "row", "iconSize": 40, "showLabel": true }
- badges: { "packageName": "", "githubRepo": "${owner}/${repoName}", "badgeList": ["github-stars", "license"], "badgeStyle": "flat" }
- text: { "content": "markdown string summarizing overview, installation, usage, or features" }
- contributors: { "repo": "${owner}/${repoName}", "maxCount": 12, "avatarSize": 48 }
- githubstats: { "username": "${owner}", "theme": "dark", "statsType": "general" }
- divider: { "style": "line", "color": "#262626" }

Include a:
1. Header block
2. Badges block
3. Tech Stack block
4. Text block outlining what the project is about and its main features
5. Text block explaining installation/setup
6. Contributors block
7. GitHub Stats block (if personal project)

Output ONLY the raw JSON array. Do not include markdown formatting or wrapper fields.`;

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
