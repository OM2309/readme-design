"use client";

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FileText, ArrowRight, Sparkles, ChevronRight } from "lucide-react";
import { toast } from "sonner";

export default function Home() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      setMousePos({
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      });
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  const handleStartBuilding = () => {
    router.push("/studio");
  };

  const features = [
    { icon: "⚡", label: "Drag & Drop Blocks" },
    { icon: "🎨", label: "Visual Editor" },
    { icon: "📦", label: "9 Templates" },
    { icon: "🤖", label: "AI Import" },
    { icon: "🚀", label: "GitHub Export" },
    { icon: "✨", label: "Live Preview" },
  ];

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden bg-[#060608] text-white">
      {/* ── Noise overlay ── */}
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "200px 200px",
        }}
      />

      {/* ══════════════════════════════════
          NAV
      ══════════════════════════════════ */}
      <header className="fixed top-0 left-0 right-0 z-50 h-[60px] border-b border-white/[0.04] backdrop-blur-xl"
        style={{ backgroundColor: "rgba(6,6,8,0.8)" }}>
        <div className="max-w-[1160px] mx-auto px-6 h-full flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 select-none">
            <div className="w-[26px] h-[26px] rounded-[7px] flex items-center justify-center bg-white">
              <FileText className="w-3.5 h-3.5 text-black" />
            </div>
            <span className="text-[14px] font-semibold tracking-tight text-white">
              README Studio
            </span>
          </Link>

          <div className="flex items-center gap-2.5">
            <a
              href="https://github.com/OM2309/readme-design"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-[13px] px-3 py-1.5 rounded-[8px] text-neutral-400 hover:text-white border border-white/[0.07] hover:border-white/[0.14] bg-white/[0.03] hover:bg-white/[0.06] transition-all duration-150 font-medium select-none"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
              Star on GitHub
            </a>
            <button
              onClick={handleStartBuilding}
              className="text-[13px] px-4 py-1.5 rounded-[8px] bg-white text-black font-semibold hover:bg-neutral-100 transition-all duration-100 active:scale-[0.97] select-none"
            >
              Open Studio
            </button>
          </div>
        </div>
      </header>

      {/* ══════════════════════════════════
          HERO
      ══════════════════════════════════ */}
      <section
        ref={heroRef}
        className="relative flex flex-col items-center justify-center pt-[130px] pb-[100px] px-6 overflow-hidden min-h-screen"
      >
        {/* ── Radial spotlight that follows mouse ── */}
        <div
          className="pointer-events-none absolute inset-0 transition-opacity duration-300"
          style={{
            background: mounted
              ? `radial-gradient(700px circle at ${mousePos.x * 100}% ${mousePos.y * 100}%, rgba(99,102,241,0.12), transparent 60%)`
              : "transparent",
          }}
        />

        {/* ── Static ambient glows ── */}
        <div className="pointer-events-none absolute top-[15%] left-[20%] w-[600px] h-[600px] rounded-full bg-indigo-600/[0.06] blur-[120px]" />
        <div className="pointer-events-none absolute bottom-[10%] right-[10%] w-[500px] h-[500px] rounded-full bg-violet-600/[0.05] blur-[100px]" />

        {/* ── Dot grid ── */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.18]"
          style={{
            backgroundImage: "radial-gradient(rgba(255,255,255,0.2) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        {/* ── Top announcement badge ── */}
        <div className={`relative z-10 mb-8 ${mounted ? "fade-in-up fade-in-up-delay-1" : "opacity-0"}`}>
          <a
            href="https://github.com/OM2309/readme-design"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/[0.1] bg-white/[0.04] text-[12px] text-neutral-300 hover:text-white hover:border-white/[0.18] hover:bg-white/[0.07] transition-all duration-150 select-none group"
          >
            <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-[10px] font-semibold tracking-wider uppercase">
              <Sparkles className="w-2.5 h-2.5" />
              New
            </span>
            <span>9 starter templates — just shipped</span>
            <ChevronRight className="w-3.5 h-3.5 text-neutral-500 group-hover:text-neutral-300 transition-colors group-hover:translate-x-0.5 transition-transform duration-150" />
          </a>
        </div>

        {/* ── Main headline ── */}
        <div className={`relative z-10 text-center max-w-[820px] ${mounted ? "fade-in-up fade-in-up-delay-2" : "opacity-0"}`}>
          <h1 className="text-[52px] sm:text-[68px] lg:text-[80px] font-bold leading-[1.0] tracking-[-0.04em] text-white">
            Build{" "}
            <span
              className="inline-block relative"
              style={{
                background: "linear-gradient(135deg, #818cf8 0%, #c084fc 40%, #f472b6 80%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              beautiful
            </span>{" "}
            READMEs
            <br />
            <span className="text-neutral-400">without writing a line.</span>
          </h1>
        </div>

        {/* ── Subheadline ── */}
        <p className={`relative z-10 mt-6 text-[17px] sm:text-[19px] leading-[1.65] text-neutral-400 text-center max-w-[580px] ${mounted ? "fade-in-up fade-in-up-delay-3" : "opacity-0"}`}>
          The drag-and-drop README editor for developers. Pick a block, customise it, export to GitHub — in minutes.
        </p>

        {/* ── CTA buttons ── */}
        <div className={`relative z-10 mt-9 flex flex-wrap items-center justify-center gap-3 ${mounted ? "fade-in-up fade-in-up-delay-3" : "opacity-0"}`}>
          <button
            onClick={handleStartBuilding}
            className="group inline-flex items-center gap-2 text-[15px] px-7 py-3.5 rounded-[12px] bg-white text-black font-semibold hover:bg-neutral-100 transition-all duration-100 active:scale-[0.97] shadow-[0_0_0_1px_rgba(255,255,255,0.1),0_8px_32px_rgba(0,0,0,0.4)]"
          >
            Start building — it's free
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-150" />
          </button>

          <a
            href="https://github.com/OM2309/readme-design"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[15px] px-6 py-3.5 rounded-[12px] bg-white/[0.04] text-neutral-300 font-medium border border-white/[0.08] hover:bg-white/[0.08] hover:text-white hover:border-white/[0.15] transition-all duration-150"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
            View on GitHub
          </a>
        </div>

        {/* ── Social proof stats ── */}
        <div className={`relative z-10 mt-10 flex items-center gap-6 ${mounted ? "fade-in-up fade-in-up-delay-4" : "opacity-0"}`}>
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              {["#818cf8", "#c084fc", "#f472b6", "#34d399"].map((col, i) => (
                <div
                  key={i}
                  className="w-6 h-6 rounded-full border-2 border-[#060608] flex items-center justify-center text-[9px] font-bold"
                  style={{ backgroundColor: col }}
                >
                  {String.fromCharCode(65 + i)}
                </div>
              ))}
            </div>
            <span className="text-[13px] text-neutral-400">
              <span className="text-white font-semibold">1,200+</span> developers
            </span>
          </div>

          <div className="w-px h-5 bg-white/10" />

          <div className="flex items-center gap-1.5 text-[13px] text-neutral-400">
            <div className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map(s => (
                <svg key={s} className="w-3.5 h-3.5 text-amber-400" viewBox="0 0 24 24" fill="currentColor">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              ))}
            </div>
            <span><span className="text-white font-semibold">5.0</span> rating</span>
          </div>
        </div>

        {/* ── Feature pill strip ── */}
        <div className={`relative z-10 mt-12 flex flex-wrap justify-center gap-2 ${mounted ? "fade-in-up fade-in-up-delay-4" : "opacity-0"}`}>
          {features.map((f) => (
            <span
              key={f.label}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.07] text-[12px] text-neutral-400 hover:text-neutral-200 hover:border-white/[0.12] hover:bg-white/[0.07] transition-all duration-150 select-none"
            >
              <span className="text-[13px]">{f.icon}</span>
              {f.label}
            </span>
          ))}
        </div>

        {/* ══════════════════════════════════
            APP WINDOW MOCKUP
        ══════════════════════════════════ */}
        <div className={`relative z-10 mt-20 w-full max-w-[1060px] ${mounted ? "fade-in-up" : "opacity-0"}`}
          style={{ animationDelay: "0.55s" }}>

          {/* glow under window */}
          <div className="absolute inset-x-[10%] -bottom-8 h-40 bg-indigo-600/20 blur-[60px] rounded-full pointer-events-none" />

          {/* Window chrome */}
          <div className="relative rounded-[18px] border border-white/[0.09] bg-[#0c0c0e] shadow-[0_40px_120px_rgba(0,0,0,0.8),0_0_0_1px_rgba(255,255,255,0.04)] overflow-hidden">

            {/* Title bar */}
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/[0.06] bg-[#0e0e11]">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                  <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                  <div className="w-3 h-3 rounded-full bg-[#28c840]" />
                </div>
                <span className="ml-3 text-[11px] text-neutral-600 font-mono">readme-studio — Untitled README</span>
              </div>
              {/* View mode tabs */}
              <div className="flex items-center gap-0.5 bg-white/[0.04] rounded-[8px] p-0.5 border border-white/[0.06]">
                {["Design", "Markdown", "Preview"].map((tab, i) => (
                  <span
                    key={tab}
                    className={`text-[10px] px-3 py-1 rounded-[6px] font-medium transition-all ${i === 0 ? "bg-white/[0.1] text-white" : "text-neutral-600"}`}
                  >
                    {tab}
                  </span>
                ))}
              </div>
            </div>

            {/* Editor body */}
            <div className="flex h-[420px] sm:h-[500px]">

              {/* Left sidebar – blocks palette */}
              <div className="w-[200px] shrink-0 border-r border-white/[0.05] bg-[#0a0a0d] flex flex-col overflow-hidden">
                <div className="px-3.5 pt-3 pb-2 border-b border-white/[0.05]">
                  <div className="h-6 w-full bg-white/[0.04] rounded-md border border-white/[0.05] flex items-center px-2 gap-1.5">
                    <svg className="w-3 h-3 text-neutral-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
                    </svg>
                    <span className="text-[10px] text-neutral-700">Search blocks…</span>
                  </div>
                </div>
                <div className="flex-1 overflow-hidden px-2 py-2 space-y-0.5">
                  {[
                    { label: "Header", color: "#818cf8", icon: "H" },
                    { label: "Text / Markdown", color: "#34d399", icon: "T" },
                    { label: "Badges", color: "#facc15", icon: "B" },
                    { label: "Tech Stack", color: "#f472b6", icon: "⚙" },
                    { label: "Star Chart", color: "#38bdf8", icon: "✦" },
                    { label: "Code Snippet", color: "#a78bfa", icon: "{ }" },
                    { label: "Table", color: "#fb923c", icon: "▦" },
                    { label: "Image", color: "#4ade80", icon: "🖼" },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="flex items-center gap-2.5 px-2 py-1.5 rounded-[6px] hover:bg-white/[0.04] cursor-pointer group transition-colors"
                    >
                      <span
                        className="w-5 h-5 rounded-[4px] flex items-center justify-center text-[9px] font-bold shrink-0 font-mono"
                        style={{ backgroundColor: item.color + "22", color: item.color, border: `1px solid ${item.color}30` }}
                      >
                        {item.icon}
                      </span>
                      <span className="text-[11px] text-neutral-500 group-hover:text-neutral-300 transition-colors">{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Canvas */}
              <div className="flex-1 bg-[#0a0a0c] overflow-hidden flex flex-col items-center pt-8 px-6 gap-4 relative">
                {/* subtle dot grid */}
                <div className="absolute inset-0 opacity-20"
                  style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.15) 1px, transparent 1px)", backgroundSize: "20px 20px" }} />

                {/* Block 1 – Gradient header */}
                <div className="relative z-10 w-full max-w-[520px] rounded-[10px] border border-white/[0.08] overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.6)]">
                  <div
                    className="h-[70px] flex flex-col items-center justify-center"
                    style={{ background: "linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #1e1b4b 100%)" }}
                  >
                    <div className="text-[15px] font-bold text-white tracking-tight">⚡ FAST-CLI</div>
                    <div className="text-[9px] text-indigo-300 mt-0.5 max-w-[260px] text-center leading-relaxed">
                      A super-fast developer terminal tool
                    </div>
                  </div>
                  <div className="absolute top-1.5 left-2 text-[8px] font-mono text-white/30 bg-black/30 px-1.5 py-0.5 rounded">
                    Header Block
                  </div>
                  <div className="absolute top-1.5 right-2 flex gap-1.5 opacity-50">
                    {["👁️", "⚙️", "🗑️"].map((e, i) => <span key={i} className="text-[8px]">{e}</span>)}
                  </div>
                </div>

                {/* Block 2 – Badges row */}
                <div className="relative z-10 w-full max-w-[520px] rounded-[10px] border border-white/[0.06] bg-[#0e0e12] px-4 py-3 flex items-center gap-2 flex-wrap shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
                  <div className="absolute top-1.5 left-2.5 text-[8px] font-mono text-white/20">Badges Block</div>
                  <div className="mt-3 flex gap-2 flex-wrap">
                    {[
                      { key: "npm", val: "3.2.1", kBg: "#24272e", vBg: "#cb3837" },
                      { key: "build", val: "passing", kBg: "#24272e", vBg: "#0ea5e9" },
                      { key: "license", val: "MIT", kBg: "#24272e", vBg: "#555" },
                      { key: "coverage", val: "98%", kBg: "#24272e", vBg: "#ff69b4" },
                    ].map((b) => (
                      <div key={b.key} className="inline-flex rounded-[3px] overflow-hidden text-[8px] font-bold border border-white/5">
                        <span className="px-1.5 py-0.5 text-neutral-300" style={{ backgroundColor: b.kBg }}>{b.key}</span>
                        <span className="px-1.5 py-0.5 text-white" style={{ backgroundColor: b.vBg }}>{b.val}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Block 3 – Code snippet */}
                <div className="relative z-10 w-full max-w-[520px] rounded-[10px] border border-white/[0.06] bg-[#0d1117] overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
                  <div className="flex items-center justify-between px-3 py-2 border-b border-white/[0.06] bg-[#161b22]">
                    <div className="flex gap-1 items-center">
                      <span className="text-[8px] font-mono text-neutral-600 bg-neutral-800/50 px-1.5 py-0.5 rounded border border-neutral-700/50">bash</span>
                      <span className="text-[8px] font-mono text-neutral-600">setup.sh</span>
                    </div>
                    <span className="text-[8px] text-neutral-600 font-mono">Code Block</span>
                  </div>
                  <div className="px-4 py-3 font-mono text-[10px] space-y-1">
                    <div><span className="text-green-400">$</span> <span className="text-neutral-300">git clone https://github.com/user/my-project</span></div>
                    <div><span className="text-green-400">$</span> <span className="text-neutral-300">cd my-project <span className="text-neutral-600">&amp;&amp;</span> pnpm install</span></div>
                    <div><span className="text-green-400">$</span> <span className="text-indigo-400">pnpm dev</span></div>
                  </div>
                </div>
              </div>

              {/* Right sidebar – block props */}
              <div className="w-[200px] shrink-0 border-l border-white/[0.05] bg-[#0a0a0d] overflow-hidden flex flex-col">
                <div className="px-3.5 py-3 border-b border-white/[0.05] flex items-center justify-between">
                  <span className="text-[9px] font-semibold text-neutral-500 tracking-widest uppercase">Properties</span>
                  <span className="text-[8px] px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 font-mono">Header</span>
                </div>
                <div className="flex-1 px-3 py-3 space-y-3.5 overflow-hidden">
                  {[
                    { label: "Title", value: "⚡ FAST-CLI" },
                    { label: "Style", value: "gradient", hasArrow: true },
                    { label: "Alignment", value: "center", hasArrow: true },
                  ].map((prop) => (
                    <div key={prop.label}>
                      <label className="text-[9px] text-neutral-600 block mb-1 uppercase tracking-wider">{prop.label}</label>
                      <div className="flex items-center justify-between bg-white/[0.04] border border-white/[0.07] rounded-[6px] px-2 py-1.5">
                        <span className="text-[9px] text-neutral-300 font-mono">{prop.value}</span>
                        {prop.hasArrow && <svg className="w-2.5 h-2.5 text-neutral-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>}
                      </div>
                    </div>
                  ))}
                  <div className="pt-1 border-t border-white/[0.05]">
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] text-neutral-500">Bottom Divider</span>
                      <div className="w-7 h-4 bg-indigo-500 rounded-full flex items-center justify-end pr-0.5 cursor-pointer">
                        <div className="w-3 h-3 bg-white rounded-full" />
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] text-neutral-500">Gradient</span>
                      <div className="w-7 h-4 bg-indigo-500 rounded-full flex items-center justify-end pr-0.5 cursor-pointer">
                        <div className="w-3 h-3 bg-white rounded-full" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* scroll hint */}
        <div className={`relative z-10 mt-16 flex flex-col items-center gap-2 ${mounted ? "fade-in-up" : "opacity-0"}`} style={{ animationDelay: "0.7s" }}>
          <div className="w-px h-10 bg-gradient-to-b from-transparent via-white/20 to-transparent" />
          <span className="text-[11px] text-neutral-600 tracking-widest uppercase">Scroll to explore</span>
        </div>
      </section>

      {/* ══════════════════════════════════
          HOW IT WORKS — 3 STEPS
      ══════════════════════════════════ */}
      <section className="relative z-10 px-6 py-28 border-t border-white/[0.04]">
        <div className="max-w-[1060px] mx-auto">
          <div className="text-center mb-16">
            <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-indigo-400 mb-3">How it works</p>
            <h2 className="text-[36px] sm:text-[48px] font-bold tracking-tight text-white">From blank to polished in 3 steps</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                step: "01",
                icon: "🎨",
                title: "Pick a template",
                desc: "Choose from 9 curated starters — Hackathon, REST API, NPM Package, SaaS, and more.",
                color: "#818cf8",
              },
              {
                step: "02",
                icon: "⚡",
                title: "Edit with blocks",
                desc: "Drag, drop, and configure blocks. Update titles, badges, code snippets, and tech stacks visually.",
                color: "#c084fc",
              },
              {
                step: "03",
                icon: "🚀",
                title: "Export to GitHub",
                desc: "Copy the generated Markdown or push directly to your GitHub repo in one click.",
                color: "#f472b6",
              },
            ].map((step) => (
              <div
                key={step.step}
                className="group relative p-7 rounded-[16px] border border-white/[0.07] bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/[0.12] transition-all duration-300"
              >
                <div
                  className="absolute inset-0 rounded-[16px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: `radial-gradient(200px circle at 30% 30%, ${step.color}10, transparent 70%)` }}
                />
                <div className="text-[11px] font-mono font-bold tracking-widest mb-4" style={{ color: step.color }}>{step.step}</div>
                <div className="text-[32px] mb-4">{step.icon}</div>
                <h3 className="text-[17px] font-semibold text-white mb-2">{step.title}</h3>
                <p className="text-[14px] text-neutral-500 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
          FEATURES GRID
      ══════════════════════════════════ */}
      <section className="relative z-10 px-6 py-24 border-t border-white/[0.04]">
        <div className="max-w-[1060px] mx-auto">
          <div className="text-center mb-16">
            <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-violet-400 mb-3">Features</p>
            <h2 className="text-[36px] sm:text-[48px] font-bold tracking-tight text-white">Everything you need</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { icon: "🧩", title: "Block-based editor", desc: "Compose your README from purpose-built blocks — headers, badges, code, tables, and more.", accent: "#818cf8" },
              { icon: "🤖", title: "AI Import", desc: "Paste a GitHub repo URL and let AI auto-fill your workspace with real content.", accent: "#c084fc" },
              { icon: "📦", title: "9 Starter Templates", desc: "Kickstart any project — hackathons, APIs, npm packages, SaaS, profiles, and more.", accent: "#f472b6" },
              { icon: "👁️", title: "Live GitHub Preview", desc: "See exactly how your README will look rendered on GitHub, in real time.", accent: "#34d399" },
              { icon: "⬇️", title: "One-click Export", desc: "Download as README.md or push directly to your GitHub repository.", accent: "#facc15" },
              { icon: "↩️", title: "Full Undo History", desc: "Never lose work. Unlimited undo / redo with keyboard shortcuts.", accent: "#38bdf8" },
            ].map((feat) => (
              <div
                key={feat.title}
                className="group p-6 rounded-[14px] border border-white/[0.07] bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/[0.12] transition-all duration-300 relative overflow-hidden"
              >
                <div
                  className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: `linear-gradient(90deg, transparent, ${feat.accent}60, transparent)` }}
                />
                <span className="text-[28px] block mb-4">{feat.icon}</span>
                <h3 className="text-[15px] font-semibold text-white mb-2">{feat.title}</h3>
                <p className="text-[13px] text-neutral-500 leading-relaxed">{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
          BOTTOM CTA BANNER
      ══════════════════════════════════ */}
      <section className="relative z-10 px-6 py-24 border-t border-white/[0.04]">
        <div className="max-w-[720px] mx-auto text-center">
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div className="w-[600px] h-[300px] bg-indigo-600/[0.07] blur-[100px] rounded-full" />
          </div>
          <h2 className="text-[40px] sm:text-[52px] font-bold tracking-tight text-white mb-5">
            Your README deserves to be{" "}
            <span style={{
              background: "linear-gradient(135deg,#818cf8,#c084fc,#f472b6)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              beautiful
            </span>
            .
          </h2>
          <p className="text-[17px] text-neutral-400 mb-9 leading-relaxed">
            Join developers who've shipped better GitHub profiles and project pages with README Studio.
          </p>
          <button
            onClick={handleStartBuilding}
            className="group inline-flex items-center gap-2 text-[16px] px-8 py-4 rounded-[14px] bg-white text-black font-semibold hover:bg-neutral-100 transition-all duration-100 active:scale-[0.97] shadow-[0_0_60px_rgba(129,140,248,0.25),0_0_0_1px_rgba(255,255,255,0.15)]"
          >
            Open README Studio
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-150" />
          </button>
        </div>
      </section>

      {/* ══════════════════════════════════
          FOOTER
      ══════════════════════════════════ */}
      <footer className="border-t border-white/[0.04] select-none mt-auto">
        <div className="max-w-[1060px] mx-auto px-6 py-7 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-[20px] h-[20px] rounded-[5px] flex items-center justify-center bg-white">
              <FileText className="w-3 h-3 text-black" />
            </div>
            <span className="text-[13px] text-neutral-600">© 2026 README Studio</span>
          </div>

          <div className="flex items-center gap-5">
            <a href="https://github.com/OM2309/readme-design" target="_blank" rel="noopener noreferrer"
              className="text-[13px] text-neutral-600 hover:text-neutral-300 transition-colors">GitHub</a>
            <a href="https://x.com/_whyom" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-[13px] text-neutral-600 hover:text-neutral-300 transition-colors">
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              @_whyom
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
