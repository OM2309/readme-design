"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  FileText,
  ArrowRight,
} from "lucide-react";
import { toast } from "sonner";

/* ═══════════════════════════════════════════════════
   Raycast Design System Tokens (inline constants)
   ═══════════════════════════════════════════════════ */
const C = {
  canvas: "#07080a",
  surface: "#0d0d0d",
  surfaceElevated: "#101111",
  surfaceCard: "#121212",
  hairline: "#242728",
  hairlineSoft: "rgba(255,255,255,0.08)",
  hairlineStrong: "rgba(255,255,255,0.16)",
  ink: "#f4f4f6",
  body: "#cdcdcd",
  mute: "#9c9c9d",
  ash: "#6a6b6c",
  stone: "#434345",
  primary: "#ffffff",
  primaryPressed: "#e8e8e8",
  onPrimary: "#000000",
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
            {/* <Link
              href="/studio"
              className="text-[13px] px-3 py-1.5 rounded-[8px] transition-colors duration-100"
              style={{ color: C.mute, fontWeight: 500, letterSpacing: "0.2px" }}
            >
              Sign in
            </Link> */}
          </div>
        </div>
      </header>

      {/* ═══════ HERO SECTION ═══════ */}
      <section className="hero-stripe-band relative px-6 pt-[120px] sm:pt-[140px] lg:pt-[170px] pb-[96px] overflow-hidden">
        <div className="max-w-[1240px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10">

          {/* LEFT COLUMN: Hero content */}
          <div className="lg:col-span-6 space-y-6 text-left flex flex-col items-start">
            {/* Top pill badge */}
            {/* <div className={`flex justify-start ${mounted ? "fade-in-up fade-in-up-delay-1" : "opacity-0"}`}>
              <Link
                href="/studio"
                className="inline-flex items-center gap-2 text-[12px] pr-3.5 pl-1.5 py-1 rounded-full transition-all duration-150 border border-white/5 hover:border-white/10"
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.02)",
                  color: "#cdcdcd",
                  fontWeight: 400,
                }}
              >
                <span
                  className="px-2 py-0.5 rounded-full text-[10px] uppercase font-semibold tracking-wider text-[#cdcdcd] font-sans"
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.05)",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                  }}
                >
                  New
                </span>
                <span className="text-[12px] tracking-tight">Interactive layouts & custom block sections →</span>
              </Link>
            </div> */}

            {/* Display headline */}
            <h1
              className={`text-[44px] sm:text-[56px] lg:text-[64px] leading-[1.05] tracking-tight ${mounted ? "fade-in-up fade-in-up-delay-2" : "opacity-0"}`}
              style={{
                color: "#ffffff",
                fontWeight: 700,
                letterSpacing: "-0.03em",
              }}
            >
              Design Better READMEs
            </h1>

            {/* Subhead */}
            <p
              className={`text-[16px] sm:text-[18px] leading-[1.6] max-w-[500px] text-left mt-2 ${mounted ? "fade-in-up fade-in-up-delay-3" : "opacity-0"}`}
              style={{ color: "#a1a1aa", fontWeight: 400 }}
            >
              The visual drag-and-drop editor for developers. Build beautiful, engaging READMEs for your GitHub profile and projects in minutes without writing markdown.
            </p>

            {/* CTA buttons */}
            <div className={`space-y-4 pt-2 w-full ${mounted ? "fade-in-up fade-in-up-delay-3" : "opacity-0"}`}>
              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={handleStartBuilding}
                  className="text-[14px] px-6 py-3 rounded-[10px] transition-all duration-100 active:scale-[0.97] flex items-center gap-2 justify-center font-medium bg-white text-black hover:bg-neutral-200"
                >
                  Start building for free
                  <ArrowRight className="w-4 h-4" />
                </button>

                <a
                  href="https://github.com/OM2309/readme-design"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[14px] px-6 py-3 rounded-[10px] transition-all duration-100 flex items-center gap-2 justify-center font-medium border border-[#242728] hover:bg-white/5 bg-transparent text-white"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                  View on GitHub
                </a>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: 3D floating composition */}
          <div className={`lg:col-span-6 relative flex justify-center lg:justify-end min-h-[460px] lg:min-h-[500px] w-full select-none ${mounted ? "fade-in-up fade-in-up-delay-4" : "opacity-0"}`}>

            {/* Glow ambient backgrounds */}
            <div className="absolute top-[40%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] rounded-full bg-blue-500/10 blur-[80px] pointer-events-none z-0" />
            <div className="absolute top-[20%] left-[30%] w-[250px] h-[250px] rounded-full bg-indigo-500/5 blur-[90px] pointer-events-none z-0" />
            <div className="absolute inset-0 bg-[radial-gradient(#1f2229_1px,transparent_1px)] [background-size:16px_16px] opacity-30 pointer-events-none z-0" />

            {/* 3D Perspective wrapper */}
            <div
              className="relative w-full max-w-[500px] h-full flex items-center justify-center transform-gpu"
              style={{
                perspective: "1200px",
                transformStyle: "preserve-3d"
              }}
            >
              {/* Main 3D Tilted container */}
              <div
                className="relative w-full h-[400px] transform-gpu transition-all duration-700 ease-out hover:scale-105"
                style={{
                  transform: "rotateX(15deg) rotateY(-20deg) rotateZ(3deg)",
                  transformStyle: "preserve-3d"
                }}
              >

                {/* CARD 1: FAST-CLI Header Canvas Block (Center-Left) */}
                <div
                  className="absolute top-[5%] left-[2%] z-20 w-[310px] rounded-[12px] border border-white/[0.08] bg-[#0c0d0e] p-4 shadow-[0_20px_50px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.05)] transition-all duration-300 hover:translate-z-[15px]"
                  style={{
                    transform: "translateZ(10px)",
                    transformStyle: "preserve-3d"
                  }}
                >
                  {/* Fake block boundary header */}
                  <div className="flex items-center justify-between text-[9px] text-neutral-500 mb-2 font-mono">
                    <span className="bg-[#18191c] px-1.5 py-0.5 rounded border border-[#2d2f34] text-neutral-400">Header Block</span>
                    <div className="flex gap-2.5 opacity-60">
                      <span>👁️</span>
                      <span>⚙️</span>
                      <span>🗑️</span>
                    </div>
                  </div>

                  {/* Boxed visual preview */}
                  <div className="space-y-3 py-3 border border-dashed border-neutral-800 rounded-lg p-3 bg-neutral-950/60 text-center">
                    <div className="text-[18px] font-bold text-white flex items-center justify-center gap-2 tracking-tight">
                      <span className="text-yellow-500 text-[16px]">⚡</span>
                      <span className="font-outfit">FAST-CLI</span>
                    </div>
                    <p className="text-[11px] text-neutral-400 leading-relaxed max-w-[220px] mx-auto font-mono">
                      A super-fast developer terminal tool that automates environment setup, git hooks, and docker configs in under 2 seconds.
                    </p>
                  </div>

                  {/* Yellow warning editor note block */}
                  <div className="mt-2.5 border border-amber-900/30 bg-amber-950/10 rounded-md p-2 flex items-start gap-2">
                    <svg className="w-3.5 h-3.5 text-amber-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    <span className="text-[10px] text-amber-500/80 font-mono leading-normal">
                      Write your editorial comment here...
                    </span>
                  </div>
                </div>

                {/* CARD 2: Star History Graph Card (Bottom-Left) */}
                <div
                  className="absolute bottom-[2%] left-[-8%] z-10 w-[240px] rounded-[10px] border border-white/[0.04] bg-[#08090b]/90 p-3.5 shadow-[0_15px_30px_rgba(0,0,0,0.6)] backdrop-blur-md transition-all duration-300 hover:translate-z-[25px]"
                  style={{
                    transform: "translateZ(5px)",
                    transformStyle: "preserve-3d"
                  }}
                >
                  <div className="flex items-center gap-1.5 text-[10px] text-neutral-300 font-medium">
                    <svg className="w-3 h-3 text-neutral-500" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                    </svg>
                    <span>stars</span>
                    <span className="bg-[#1f2937]/50 text-neutral-400 text-[9px] px-1 py-0.2 rounded border border-neutral-800 font-mono">140k</span>
                  </div>

                  <div className="relative pt-1.5">
                    <svg className="w-full h-[55px] overflow-visible" viewBox="0 0 200 55">
                      <defs>
                        <linearGradient id="glowGrad1" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
                          <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.0" />
                        </linearGradient>
                      </defs>

                      <line x1="0" y1="45" x2="200" y2="45" stroke="#1c1d22" strokeWidth="1" strokeDasharray="3,3" />
                      <line x1="0" y1="25" x2="200" y2="25" stroke="#1c1d22" strokeWidth="1" strokeDasharray="3,3" />

                      <path d="M 0 45 L 30 42 L 70 38 L 100 28 L 135 22 L 170 12 L 200 4 L 200 55 L 0 55 Z" fill="url(#glowGrad1)" />
                      <path d="M 0 45 L 30 42 L 70 38 L 100 28 L 135 22 L 170 12 L 200 4" fill="none" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" />

                      <circle cx="200" cy="4" r="3" fill="#38bdf8" />
                    </svg>
                  </div>
                </div>

                {/* CARD 3: Block Properties Settings Panel (Right) */}
                <div
                  className="absolute top-[2%] right-[-6%] z-30 w-[210px] rounded-[10px] border border-white/[0.08] bg-[#0b0c0e]/95 p-3.5 shadow-[0_20px_40px_rgba(0,0,0,0.7)] backdrop-blur-md transition-all duration-300 hover:translate-z-[30px]"
                  style={{
                    transform: "translateZ(20px)",
                    transformStyle: "preserve-3d"
                  }}
                >
                  <div className="space-y-3.5 text-left font-sans">
                    <div className="flex items-center justify-between border-b border-white/5 pb-2">
                      <span className="text-[9px] font-semibold text-neutral-400 tracking-wider">BLOCK PROPERTIES</span>
                      <span className="text-[8px] bg-blue-500/20 text-blue-400 border border-blue-500/30 px-1 py-0.2 rounded font-mono">Header</span>
                    </div>

                    <div className="space-y-2.5 text-[10px]">
                      <div>
                        <label className="text-neutral-500 block mb-0.5">Title</label>
                        <div className="bg-[#121316] border border-[#242728] rounded px-2 py-0.5 text-white font-mono text-[9px] flex items-center justify-between">
                          <span>⚡ FAST-CLI</span>
                        </div>
                      </div>

                      <div>
                        <label className="text-neutral-500 block mb-0.5">Style</label>
                        <div className="bg-[#121316] border border-[#242728] rounded px-2 py-0.5 text-neutral-300 flex items-center justify-between text-[9px]">
                          <span>minimal</span>
                          <svg className="w-2.5 h-2.5 text-neutral-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" /></svg>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-1.5">
                        <div>
                          <label className="text-neutral-500 block mb-0.5">Alignment</label>
                          <div className="bg-[#121316] border border-[#242728] rounded px-2 py-0.5 text-neutral-300 text-[9px]">
                            <span>center</span>
                          </div>
                        </div>
                        <div>
                          <label className="text-neutral-500 block mb-0.5">Font Family</label>
                          <div className="bg-[#121316] border border-[#242728] rounded px-2 py-0.5 text-neutral-300 text-[9px]">
                            <span>mono</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-1 border-t border-white/5">
                        <span className="text-neutral-400">Bottom Divider</span>
                        <div className="w-6 h-3.5 bg-blue-600 rounded-full p-0.5 cursor-pointer flex items-center justify-end">
                          <div className="w-2.5 h-2.5 bg-white rounded-full"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* FLOATING GITHUB BADGES (SHIELDS.IO STYLE) */}

                {/* BADGE 1: npm 3.24.1 (Red) */}
                <div
                  className="absolute top-[28%] right-[10%] z-45 transform rotate-[7deg] transition-all duration-300 hover:scale-110"
                  style={{ transform: "translateZ(35px) rotate(7deg)" }}
                >
                  <div className="inline-flex items-center rounded-[3px] overflow-hidden text-[9px] font-bold font-sans tracking-wide shadow-[0_4px_12px_rgba(0,0,0,0.5)] border border-white/5 select-none">
                    <div className="bg-[#24272e] text-[#c9d1d9] px-1.5 py-0.5 flex items-center gap-1 border-r border-black/20">
                      <svg className="w-2.5 h-2.5 text-[#e05d44]" viewBox="0 0 18 18" fill="currentColor">
                        <path d="M0 0h18v18H0V0zm3 3v12h4V7h3v8h5V3H3z" />
                      </svg>
                      <span>npm</span>
                    </div>
                    <div className="bg-[#cb3837] px-1.5 py-0.5 text-white">
                      3.24.1
                    </div>
                  </div>
                </div>

                {/* BADGE 2: build passing (Blue) */}
                <div
                  className="absolute top-[48%] right-[-10%] z-45 transform rotate-[-4deg] transition-all duration-300 hover:scale-110"
                  style={{ transform: "translateZ(28px) rotate(-4deg)" }}
                >
                  <div className="inline-flex items-center rounded-[3px] overflow-hidden text-[9px] font-bold font-sans tracking-wide shadow-[0_4px_12px_rgba(0,0,0,0.5)] border border-white/5 select-none">
                    <div className="bg-[#24272e] text-[#c9d1d9] px-1.5 py-0.5 flex items-center gap-1 border-r border-black/20">
                      <svg className="w-2.5 h-2.5 text-[#0ea5e9]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="22 11.08 12 19 9 15" />
                      </svg>
                      <span>build</span>
                    </div>
                    <div className="bg-[#0ea5e9] px-1.5 py-0.5 text-white">
                      passing
                    </div>
                  </div>
                </div>

                {/* BADGE 3: coverage 98% (Pink) */}
                <div
                  className="absolute bottom-[35%] right-[10%] z-45 transform rotate-[8deg] transition-all duration-300 hover:scale-110"
                  style={{ transform: "translateZ(32px) rotate(8deg)" }}
                >
                  <div className="inline-flex items-center rounded-[3px] overflow-hidden text-[9px] font-bold font-sans tracking-wide shadow-[0_4px_12px_rgba(0,0,0,0.5)] border border-white/5 select-none">
                    <div className="bg-[#24272e] text-[#c9d1d9] px-1.5 py-0.5 flex items-center gap-1 border-r border-black/20">
                      <span>coverage</span>
                    </div>
                    <div className="bg-[#ff69b4] px-1.5 py-0.5 text-white">
                      98%
                    </div>
                  </div>
                </div>

                {/* BADGE 4: typescript 5.x (Light Blue) */}
                <div
                  className="absolute bottom-[16%] left-[28%] z-45 transform rotate-[-8deg] transition-all duration-300 hover:scale-110"
                  style={{ transform: "translateZ(25px) rotate(-8deg)" }}
                >
                  <div className="inline-flex items-center rounded-[3px] overflow-hidden text-[9px] font-bold font-sans tracking-wide shadow-[0_4px_12px_rgba(0,0,0,0.5)] border border-white/5 select-none">
                    <div className="bg-[#24272e] text-[#c9d1d9] px-1.5 py-0.5 flex items-center gap-1 border-r border-black/20">
                      <svg className="w-2.5 h-2.5 text-[#3178c6] fill-current" viewBox="0 0 24 24">
                        <path d="M0 0h24v24H0V0zm22.484 18.91c-.023-.977-.552-1.79-1.92-2.327-1.127-.47-1.745-.69-1.745-1.258 0-.495.422-.768 1.095-.768.805 0 1.344.33 1.547.886h1.992c-.172-1.523-1.32-2.422-3.328-2.422-2.18 0-3.336 1.156-3.336 2.766 0 1.945 1.484 2.508 2.922 3.125 1.18.5 1.53.797 1.53 1.344 0 .53-.515.86-1.25.86-1.125 0-1.734-.492-1.937-1.242h-2.023c.2 1.836 1.57 2.773 3.906 2.773 2.54 0 3.398-1.29 3.398-2.992zM12.9 13.882h-2.61v7.695H8.258v-7.695H5.664v-1.726h7.236v1.726z" />
                      </svg>
                      <span>typescript</span>
                    </div>
                    <div className="bg-[#3178c6] px-1.5 py-0.5 text-white">
                      5.x
                    </div>
                  </div>
                </div>

                {/* BADGE 5: license MIT (Grey) */}
                <div
                  className="absolute bottom-[5%] left-[2%] z-45 transform rotate-[5deg] transition-all duration-300 hover:scale-110"
                  style={{ transform: "translateZ(18px) rotate(5deg)" }}
                >
                  <div className="inline-flex items-center rounded-[3px] overflow-hidden text-[9px] font-bold font-sans tracking-wide shadow-[0_4px_12px_rgba(0,0,0,0.5)] border border-white/5 select-none">
                    <div className="bg-[#24272e] text-[#c9d1d9] px-1.5 py-0.5 flex items-center gap-1 border-r border-black/20">
                      <span>license</span>
                    </div>
                    <div className="bg-[#555555] px-1.5 py-0.5 text-white">
                      MIT
                    </div>
                  </div>
                </div>

                {/* BADGE 6: discord online (Purple) */}
                <div
                  className="absolute bottom-[10%] right-[6%] z-45 transform rotate-[-6deg] transition-all duration-300 hover:scale-110"
                  style={{ transform: "translateZ(20px) rotate(-6deg)" }}
                >
                  <div className="inline-flex items-center rounded-[3px] overflow-hidden text-[9px] font-bold font-sans tracking-wide shadow-[0_4px_12px_rgba(0,0,0,0.5)] border border-white/5 select-none">
                    <div className="bg-[#24272e] text-[#c9d1d9] px-1.5 py-0.5 flex items-center gap-1 border-r border-black/20">
                      <svg className="w-2.5 h-2.5 text-[#5865F2]" viewBox="0 0 127.14 96.36" fill="currentColor">
                        <path d="M107.7,8.07A105.15,105.15,0,0,0,77.26,0a77.2,77.2,0,0,0-3.3,6.83A96.67,96.67,0,0,0,53.22,6.83,77.2,77.2,0,0,0,49.88,0,105.15,105.15,0,0,0,19.44,8.07C3.66,31.58-1.95,54.65,1,77.53a105.77,105.77,0,0,0,32,16.29,80.7,80.7,0,0,0,6.83-11.11,68.8,68.8,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.65-2a75.58,75.58,0,0,0,70.9,0c.85.71,1.74,1.39,2.65,2a68.8,68.8,0,0,1-10.85,5.18,80.7,80.7,0,0,0,6.83,11.11,105.77,105.77,0,0,0,32-16.29C129.66,48.78,123.6,25.9,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53S36.18,40.36,42.45,40.36,53.88,46,53.88,53,48.72,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.24,60,73.24,53S78.41,40.36,84.69,40.36,96.12,46,96.12,53,91,65.69,84.69,65.69Z" />
                      </svg>
                      <span>discord</span>
                    </div>
                    <div className="bg-[#5865F2] px-1.5 py-0.5 text-white">
                      online
                    </div>
                  </div>
                </div>

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
      >
        <div className="max-w-[1240px] mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Left: product + year */}
          <span className="text-[13px]" style={{ color: C.mute, letterSpacing: "0.1px" }}>
            © 2026 README Studio
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
