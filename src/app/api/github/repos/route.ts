import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";

export async function GET(req: NextRequest) {
  try {
    const session = (await auth()) as any;
    const token = session?.accessToken;

    if (!token) {
      return NextResponse.json({ error: "Unauthorized. Sign in with GitHub." }, { status: 401 });
    }

    const res = await fetch("https://api.github.com/user/repos?sort=updated&per_page=50", {
      headers: {
        Authorization: `Bearer ${token}`,
        "User-Agent": "readme-studio-publisher",
        Accept: "application/vnd.github.v3+json",
      },
    });

    if (!res.ok) {
      const errData = await res.json();
      return NextResponse.json({ error: errData.message || "Failed to fetch repositories." }, { status: res.status });
    }

    const reposData = await res.json();
    const formatted = reposData.map((r: any) => ({
      id: r.id,
      fullName: r.full_name,
      name: r.name,
      defaultBranch: r.default_branch || "main",
    }));

    return NextResponse.json({ repos: formatted });
  } catch (error: any) {
    console.error("Fetch repos failed:", error);
    return NextResponse.json({ error: error.message || "Failed to retrieve repositories list." }, { status: 500 });
  }
}
