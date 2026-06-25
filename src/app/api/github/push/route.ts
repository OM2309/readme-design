import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";

export async function POST(req: NextRequest) {
  try {
    const session = (await auth()) as any;
    const token = session?.accessToken;

    if (!token) {
      return NextResponse.json({ error: "Unauthorized. Please sign in with GitHub." }, { status: 401 });
    }

    const { repoPath, branch = "main", commitMessage, markdownContent } = await req.json();

    if (!repoPath || !commitMessage || !markdownContent) {
      return NextResponse.json({ error: "Missing required fields (repoPath, commitMessage, markdownContent)." }, { status: 400 });
    }

    // Step 1: Check if README.md already exists on this branch to get its 'sha'
    const getUrl = `https://api.github.com/repos/${repoPath}/contents/README.md?ref=${branch}`;
    const getRes = await fetch(getUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
        "User-Agent": "readme-studio-publisher",
        Accept: "application/vnd.github.v3+json",
      },
    });

    let sha: string | undefined = undefined;
    if (getRes.ok) {
      const fileData = await getRes.json();
      sha = fileData.sha;
    }

    // Step 2: Push the new README.md using GitHub contents PUT API
    const putUrl = `https://api.github.com/repos/${repoPath}/contents/README.md`;
    const putRes = await fetch(putUrl, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        "User-Agent": "readme-studio-publisher",
        Accept: "application/vnd.github.v3+json",
      },
      body: JSON.stringify({
        message: commitMessage,
        content: Buffer.from(markdownContent).toString("base64"),
        branch,
        sha, // optional: if it exists, it will overwrite, otherwise create new
      }),
    });

    if (!putRes.ok) {
      const errData = await putRes.json();
      return NextResponse.json({ error: errData.message || "Failed to push README.md to GitHub." }, { status: putRes.status });
    }

    const resultData = await putRes.json();
    return NextResponse.json({ success: true, htmlUrl: resultData.content.html_url });
  } catch (error: any) {
    console.error("GitHub publishing failed:", error);
    return NextResponse.json({ error: error.message || "Publishing operation failed." }, { status: 500 });
  }
}
