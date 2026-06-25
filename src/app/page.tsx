"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  FileText,
  ArrowRight,
  Search,
  Command,
  CornerDownLeft,
  Type,
  Image,
  BarChart3,
  Table,
  Code,
  Users,
} from "lucide-react";
import { toast } from "sonner";

/* ═══════════════════════════════════════════════════
   Raycast Design System Tokens (inline constants)
   ═══════════════════════════════════════════════════ */
const C = {
  canvas:           "#07080a",
  surface:          "#0d0d0d",
  surfaceElevated:  "#101111",
  surfaceCard:      "#121212",
  hairline:         "#242728",
  hairlineSoft:     "rgba(255,255,255,0.08)",
  hairlineStrong:   "rgba(255,255,255,0.16)",
  ink:              "#f4f4f6",
  body:             "#cdcdcd",
  mute:             "#9c9c9d",
  ash:              "#6a6b6c",
  stone:            "#434345",
  primary:          "#ffffff",
  primaryPressed:   "#e8e8e8",
  onPrimary:        "#000000",
};

export default function LandingPage() {
  const router = useRouter();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleStartBuilding = () => {
    toast.success("Opening studio workspace");
    router.push("/studio");
  };

  return (
    <div
      className="min-h-screen flex flex-col overflow-x-hidden"
      style={{
        backgroundColor: C.canvas,
        color: C.ink,
      }}
    >
      {/* ═══════ PRIMARY NAV ═══════ */}
      <header
        className="fixed top-0 left-0 right-0 z-50 h-[56px] select-none"
        style={{
          backgroundColor: `${C.canvas}e6`,
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          borderBottom: `1px solid ${C.hairline}`,
        }}
      >
        <div className="max-w-[1240px] mx-auto px-6 h-full flex items-center justify-between">
          {/* Wordmark */}
          <Link href="/" className="flex items-center gap-2.5">
            <div
              className="w-[24px] h-[24px] rounded-[6px] flex items-center justify-center"
              style={{ backgroundColor: C.surfaceCard }}
            >
              <FileText className="w-3.5 h-3.5" style={{ color: C.ink }} />
            </div>
            <span
              className="text-[14px] font-medium tracking-[0.2px]"
              style={{ color: C.primary }}
            >
              README Studio
            </span>
          </Link>

          {/* Right: Star on GitHub + Sign in */}
          <div className="flex items-center gap-3">
            <a
              href="https://github.com/OM2309/readme-design"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-[13px] px-3 py-1 rounded-[8px] transition-all duration-100"
              style={{
                color: C.body,
                border: `1px solid ${C.hairline}`,
                backgroundColor: C.surfaceElevated,
                fontWeight: 500,
                letterSpacing: "0.2px",
              }}
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
              Star on GitHub
            </a>
            <Link
              href="/studio"
              className="text-[13px] px-3 py-1.5 rounded-[8px] transition-colors duration-100"
              style={{ color: C.mute, fontWeight: 500, letterSpacing: "0.2px" }}
            >
              Sign in
            </Link>
          </div>
        </div>
      </header>

      {/* ═══════ HERO SECTION with red stripe band ═══════ */}
      <section className="hero-stripe-band relative flex flex-col items-center pt-[136px] sm:pt-[152px] lg:pt-[176px] pb-[96px] px-6">

        <div className="relative z-10 max-w-[800px] mx-auto text-center">
          {/* Staggered fade-in content */}
          <div className={`space-y-6 ${mounted ? "" : "opacity-0"}`}>

            {/* Badge pill */}
            <div className={`flex justify-center ${mounted ? "fade-in-up fade-in-up-delay-1" : ""}`}>
              <Link
                href="/studio"
                className="inline-flex items-center gap-2 text-[12px] px-3 py-1 rounded-full transition-all duration-150"
                style={{
                  backgroundColor: C.surfaceElevated,
                  color: C.mute,
                  border: `1px solid ${C.hairline}`,
                  fontWeight: 400,
                  letterSpacing: "0.4px",
                }}
              >
                <span
                  className="inline-block w-[6px] h-[6px] rounded-full"
                  style={{ backgroundColor: "#59d499" }}
                />
                Now in public beta
                <ArrowRight className="w-3 h-3" style={{ color: C.ash }} />
              </Link>
            </div>

            {/* Display headline */}
            <h1
              className={`text-[36px] sm:text-[48px] lg:text-[64px] leading-[1.1] ${mounted ? "fade-in-up fade-in-up-delay-2" : ""}`}
              style={{
                color: C.ink,
                fontWeight: 600,
                letterSpacing: 0,
                fontFeatureSettings: '"calt", "kern", "ss02", "ss03", "ss08"',
              }}
            >
              The visual editor for
              <br />
              readme files
            </h1>

            {/* Subhead */}
            <p
              className={`text-[16px] sm:text-[18px] leading-[1.6] max-w-[520px] mx-auto ${mounted ? "fade-in-up fade-in-up-delay-3" : ""}`}
              style={{ color: C.body, fontWeight: 400 }}
            >
              Drag blocks, customize in clicks, push directly to GitHub.
              Designed for developers who ship fast.
            </p>

            {/* CTA pair */}
            <div className={`flex flex-col sm:flex-row items-center justify-center gap-3 pt-2 ${mounted ? "fade-in-up fade-in-up-delay-3" : ""}`}>
              {/* Primary white pill */}
              <button
                onClick={handleStartBuilding}
                className="text-[14px] px-5 py-2.5 rounded-[8px] transition-all duration-100 active:scale-[0.97] flex items-center gap-2 w-full sm:w-auto justify-center"
                style={{
                  backgroundColor: C.primary,
                  color: C.onPrimary,
                  fontWeight: 500,
                  letterSpacing: "0.2px",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = C.primaryPressed)}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = C.primary)}
              >
                Start building
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Secondary transparent */}
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[14px] px-5 py-2.5 rounded-[8px] transition-all duration-100 flex items-center gap-2 w-full sm:w-auto justify-center"
                style={{
                  color: C.primary,
                  fontWeight: 500,
                  letterSpacing: "0.2px",
                  backgroundColor: "transparent",
                }}
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
                View on GitHub
              </a>
            </div>
          </div>
        </div>

        {/* ═══════ COMMAND PALETTE MOCKUP ═══════ */}
        <div
          className={`relative mt-16 sm:mt-20 w-full max-w-[1080px] mx-auto z-10 ${
            mounted ? "fade-in-up fade-in-up-delay-4" : "opacity-0"
          }`}
        >
          <div
            className="rounded-[16px] overflow-hidden"
            style={{
              backgroundColor: C.surface,
              border: `1px solid ${C.hairline}`,
            }}
          >
            {/* macOS traffic lights + search bar */}
            <div
              className="flex items-center gap-3 px-4 py-3"
              style={{ borderBottom: `1px solid ${C.hairline}` }}
            >
              {/* Traffic dots */}
              <div className="flex gap-[7px]">
                <div className="w-[12px] h-[12px] rounded-full bg-[#ff5f57]" />
                <div className="w-[12px] h-[12px] rounded-full bg-[#febc2e]" />
                <div className="w-[12px] h-[12px] rounded-full bg-[#28c840]" />
              </div>

              {/* Command palette search bar */}
              <div
                className="flex-1 flex items-center gap-2 px-3 py-1.5 rounded-[8px]"
                style={{
                  backgroundColor: C.surfaceElevated,
                  border: `1px solid ${C.hairline}`,
                }}
              >
                <Search className="w-3.5 h-3.5" style={{ color: C.ash }} />
                <span className="text-[13px]" style={{ color: C.mute, letterSpacing: "0.1px" }}>
                  Search blocks, templates, actions...
                </span>
              </div>

              {/* Keycaps */}
              <div className="hidden sm:flex items-center gap-1.5">
                <span className="keycap"><Command className="w-3 h-3" /></span>
                <span className="keycap" style={{ fontSize: "11px" }}>K</span>
              </div>
            </div>

            {/* Command palette body */}
            <div className="p-2">
              {/* Section label */}
              <div
                className="px-3 py-1.5 text-[12px] uppercase tracking-[0.4px]"
                style={{ color: C.ash, fontWeight: 500 }}
              >
                Blocks
              </div>

              {/* Rows */}
              {[
                { icon: <Type className="w-4 h-4" />, label: "Header block", desc: "Title, subtitle, logo", color: "#ff6161", shortcut: "H" },
                { icon: <FileText className="w-4 h-4" />, label: "Text block", desc: "Rich markdown content", color: "#57c1ff", shortcut: "T" },
                { icon: <Image className="w-4 h-4" />, label: "Image block", desc: "Screenshots, diagrams", color: "#59d499", shortcut: "I" },
                { icon: <Code className="w-4 h-4" />, label: "Code snippet", desc: "Syntax highlighted code", color: "#ffc533", shortcut: "C" },
                { icon: <BarChart3 className="w-4 h-4" />, label: "Chart block", desc: "Star history, analytics", color: "#57c1ff", shortcut: null },
                { icon: <Table className="w-4 h-4" />, label: "Table block", desc: "Structured data rows", color: "#9c9c9d", shortcut: null },
                { icon: <Users className="w-4 h-4" />, label: "Contributors", desc: "Team and contributor grid", color: "#59d499", shortcut: null },
              ].map((row, i) => (
                <div
                  key={row.label}
                  className={`cmd-row ${i === 0 ? "cmd-row-active" : ""}`}
                  style={i === 0 ? { backgroundColor: C.surfaceCard } : {}}
                >
                  <div
                    className="app-icon-tile"
                    style={{
                      backgroundColor: `${row.color}15`,
                    }}
                  >
                    <span style={{ color: row.color }}>{row.icon}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[14px]" style={{ color: C.ink, fontWeight: 500, letterSpacing: "0.2px" }}>
                      {row.label}
                    </div>
                    <div className="text-[12px]" style={{ color: C.mute, letterSpacing: "0.1px" }}>
                      {row.desc}
                    </div>
                  </div>
                  {row.shortcut && (
                    <span className="keycap hidden sm:inline-flex">{row.shortcut}</span>
                  )}
                </div>
              ))}

              {/* Divider */}
              <div className="my-2" style={{ borderTop: `1px solid ${C.hairline}` }} />

              {/* Actions section */}
              <div
                className="px-3 py-1.5 text-[12px] uppercase tracking-[0.4px]"
                style={{ color: C.ash, fontWeight: 500 }}
              >
                Actions
              </div>
              {[
                { label: "Push to GitHub", shortcut: "⌘ ⇧ P" },
                { label: "Copy as markdown", shortcut: "⌘ ⇧ C" },
                { label: "Load template", shortcut: "⌘ T" },
              ].map((row) => (
                <div key={row.label} className="cmd-row">
                  <div className="app-icon-tile" style={{ backgroundColor: C.surfaceCard }}>
                    <CornerDownLeft className="w-3.5 h-3.5" style={{ color: C.ash }} />
                  </div>
                  <div className="flex-1">
                    <span className="text-[14px]" style={{ color: C.body, fontWeight: 400, letterSpacing: "0.2px" }}>
                      {row.label}
                    </span>
                  </div>
                  <span className="keycap hidden sm:inline-flex text-[10px]">{row.shortcut}</span>
                </div>
              ))}
            </div>

            {/* Bottom bar */}
            <div
              className="flex items-center justify-between px-4 py-2.5"
              style={{ borderTop: `1px solid ${C.hairline}` }}
            >
              <div className="flex items-center gap-3">
                <span className="text-[12px]" style={{ color: C.stone, letterSpacing: "0.4px" }}>
                  readme.studio
                </span>
              </div>
              <div className="hidden sm:flex items-center gap-2">
                <span className="keycap text-[10px]">↑↓</span>
                <span className="text-[11px]" style={{ color: C.stone }}>Navigate</span>
                <span className="keycap text-[10px]"><CornerDownLeft className="w-2.5 h-2.5" /></span>
                <span className="text-[11px]" style={{ color: C.stone }}>Select</span>
                <span className="keycap text-[10px]">esc</span>
                <span className="text-[11px]" style={{ color: C.stone }}>Close</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Spacer */}
      <div className="flex-1" />

      {/* ═══════ FOOTER ═══════ */}
      <footer
        className="select-none mt-auto"
        style={{
          backgroundColor: C.canvas,
          borderTop: `1px solid ${C.hairline}`,
        }}
      >
        <div className="max-w-[1240px] mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Left: product + year */}
          <span className="text-[13px]" style={{ color: C.mute, letterSpacing: "0.1px" }}>
            © 2025 README Studio
          </span>

          {/* Right: X handle */}
          <a
            href="https://x.com/_whyom"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-[13px] transition-colors duration-100"
            style={{ color: C.mute, letterSpacing: "0.1px" }}
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
            @_whyom
          </a>
        </div>
      </footer>
    </div>
  );
}
