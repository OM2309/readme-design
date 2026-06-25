import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";


export const runtime = "edge";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const projectId = searchParams.get("id");
    
    let title = searchParams.get("title") || "README Studio";
    let subtitle = searchParams.get("subtitle") || "Visual block-based README builder for GitHub.";
    let blocksCount = 3;



    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "space-between",
            backgroundColor: "#0a0a0a",
            padding: "80px",
            fontFamily: "sans-serif",
          }}
        >
          {/* Top visual glow */}
          <div
            style={{
              position: "absolute",
              top: "-150px",
              left: "-150px",
              width: "450px",
              height: "450px",
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(99,102,241,0.2) 0%, rgba(99,102,241,0) 70%)",
            }}
          />

          <div style={{ display: "flex", alignItems: "center", gap: "12px", zIndex: 10 }}>
            <div
              style={{
                padding: "8px 12px",
                borderRadius: "8px",
                backgroundColor: "#ffffff",
                color: "#000000",
                fontSize: "20px",
                fontWeight: "extrabold",
              }}
            >
              ✦
            </div>
            <span style={{ fontSize: "24px", fontWeight: "bold", color: "#ffffff", letterSpacing: "-0.5px" }}>
              README Studio
            </span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "16px", zIndex: 10 }}>
            <h1
              style={{
                fontSize: "64px",
                fontWeight: "extrabold",
                color: "#ffffff",
                lineHeight: "1.1",
                letterSpacing: "-2px",
                margin: 0,
                padding: 0,
              }}
            >
              {title}
            </h1>
            <p
              style={{
                fontSize: "24px",
                color: "#a3a3a3",
                maxWidth: "750px",
                margin: 0,
                padding: 0,
                lineHeight: "1.4",
              }}
            >
              {subtitle}
            </p>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
              zIndex: 10,
            }}
          >
            <div style={{ display: "flex", gap: "8px" }}>
              <span
                style={{
                  fontSize: "14px",
                  color: "#818cf8",
                  backgroundColor: "rgba(99, 102, 241, 0.1)",
                  border: "1px solid rgba(99, 102, 241, 0.2)",
                  padding: "6px 14px",
                  borderRadius: "20px",
                  fontWeight: "bold",
                }}
              >
                {blocksCount} Visual Blocks
              </span>
              <span
                style={{
                  fontSize: "14px",
                  color: "#a3a3a3",
                  backgroundColor: "rgba(255, 255, 255, 0.05)",
                  padding: "6px 14px",
                  borderRadius: "20px",
                }}
              >
                GitHub README
              </span>
            </div>
            <span style={{ fontSize: "14px", color: "#525252", fontFamily: "monospace" }}>
              readme.studio/project
            </span>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e: any) {
    console.error("OG Image generation failed:", e);
    return new Response(`Failed to generate image: ${e.message}`, { status: 500 });
  }
}
