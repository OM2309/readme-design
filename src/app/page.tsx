"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  FileText,
  LayoutGrid,
  Sparkles,
  ArrowLeftRight,
  FolderHeart,
  Eye,
  ArrowRight,
  Check,
  ChevronDown,
  Monitor,
  Smartphone,
  Moon,
  Sun,
  Menu,
  X,
  Code,
  Shield,
  Layers,
  Award,
  Terminal,
  Grid3X3,
  Calendar,
  MessageSquare,
  Sparkle
} from "lucide-react";
import GithubIcon from "@/components/GithubIcon";
import { toast } from "sonner";

export default function LandingPage() {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeShowcaseBlock, setActiveShowcaseBlock] = useState("header");
  const [statsTheme, setStatsTheme] = useState("dark");
  const [aiRepoUrl, setAiRepoUrl] = useState("https://github.com/username/repo");
  const [aiDemoTriggered, setAiDemoTriggered] = useState(false);
  const [faqOpenIndex, setFaqOpenIndex] = useState<number | null>(null);

  // Trigger AI output demo animation loop
  useEffect(() => {
    const timer = setInterval(() => {
      setAiDemoTriggered((prev) => !prev);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handleAiTrySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiRepoUrl.trim()) return;
    toast.success("Opening editor with your repository URL");
    router.push(`/studio?importUrl=${encodeURIComponent(aiRepoUrl.trim())}`);
  };

  const handleStartBuilding = () => {
    toast.success("Opening studio workspace");
    router.push("/studio");
  };

  const blocksList = [
    { id: "header", name: "Header", icon: FileText, previewText: "Dynamic project banner with gradient backgrounds and logos" },
    { id: "text", name: "Text", icon: Code, previewText: "Standard markdown formatting with custom font options" },
    { id: "badges", name: "Badges", icon: Shield, previewText: "Shields.io version, build status, license, and stars indicators" },
    { id: "techstack", name: "Tech Stack", icon: Layers, previewText: "Aesthetic devicon layout grid with size controls" },
    { id: "code", name: "Code Snippet", icon: Terminal, previewText: "Syntax highlighted editor panel with custom file name tags" },
    { id: "table", name: "Table", icon: Grid3X3, previewText: "Clean row and column configurations for package lists" },
    { id: "chart", name: "Chart", icon: Calendar, previewText: "Interactive SVG line charts displaying repository stats" },
    { id: "image", name: "Image", icon: Eye, previewText: "Responsive media assets with center alignments and custom border toggles" },
    { id: "githubstats", name: "GitHub Stats", icon: Sparkles, previewText: "Real-time user streak cards and language breakdowns" },
    { id: "contributors", name: "Contributors", icon: Award, previewText: "Profile avatar grids fetched directly from repository metadata" },
    { id: "socials", name: "Social Links", icon: MessageSquare, previewText: "Custom buttons linking to your Twitter, Discord, and site pages" },
    { id: "roadmap", name: "Roadmap", icon: Check, previewText: "Progress checkpoints with custom checklist ticks" },
    { id: "divider", name: "Divider", icon: ArrowLeftRight, previewText: "Line style separations to structure layout layers" },
    { id: "video", name: "Video/GIF", icon: Monitor, previewText: "Custom mockup player cards displaying product clips" },
    { id: "sponsors", name: "Sponsors", icon: FolderHeart, previewText: "Supporter grids with circular profile badges" },
    { id: "group", name: "Group", icon: Layers, previewText: "Visual bounding wrappers to arrange modules side by side" }
  ];

  const statsThemesList = [
    { id: "dark", label: "Dark theme" },
    { id: "radical", label: "Radical" },
    { id: "tokyonight", label: "Tokyo night" },
    { id: "nord", label: "Nord" }
  ];

  const faqs = [
    {
      q: "Is README Studio free?",
      a: "Yes. Exporting markdown files and working on canvas files locally is free. Auto-saving drafts to the cloud and publishing directly to GitHub branches requires a paid subscription."
    },
    {
      q: "Do I need to know markdown?",
      a: "No. The block editor handles all markdown syntax for you. You can focus on dragging widgets and adjusting values in settings."
    },
    {
      q: "Can I push directly to private repos?",
      a: "Yes. Once you connect your GitHub account via NextAuth, you can select any repo you have access to, choose a branch, and update files."
    },
    {
      q: "How does AI auto-fill work?",
      a: "We analyze configuration files, languages, and descriptions inside your public repository, compile key features, and generate a layout grid in seconds."
    },
    {
      q: "Can I use my own templates?",
      a: "Pro users can save customized block configurations to their templates library for easy reuse on new projects."
    },
    {
      q: "Is there a VS Code extension?",
      a: "We are working on a VS Code extension to support editing README layouts directly in your workspace."
    }
  ];

  return (
    <div className="bg-[#0a0a0a] text-[#ffffff] font-sans antialiased min-h-screen flex flex-col selection:bg-[#1D9E75]/30 selection:text-[#1D9E75]">
      
      {/* 1. NAVBAR */}
      <header className="sticky top-0 z-50 h-[56px] border-b border-[#222222] bg-[#0a0a0a]/90 backdrop-blur-md select-none">
        <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <FileText className="w-4 h-4 text-[#ffffff]" />
            <span className="font-semibold text-sm tracking-tight text-white">
              README Studio
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-xs font-medium text-[#888888]">
            <a href="#features" className="hover:text-[#ffffff] transition-colors">Features</a>
            <a href="#demo" className="hover:text-[#ffffff] transition-colors">Templates</a>
            <a href="#pricing" className="hover:text-[#ffffff] transition-colors">Pricing</a>
            <a href="#faq" className="hover:text-[#ffffff] transition-colors">Changelog</a>
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <Link href="/studio" className="text-xs font-medium text-[#888888] hover:text-[#ffffff] px-3 py-1.5 transition-colors">
              Sign in
            </Link>
            <button 
              onClick={handleStartBuilding}
              className="text-xs font-semibold px-3.5 py-1.5 rounded-[8px] bg-[#ffffff] text-[#0a0a0a] hover:bg-[#eaeaea] transition-all flex items-center gap-1 active:scale-95"
            >
              Start free <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <button 
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="md:hidden p-1 text-[#888888] hover:text-[#ffffff] transition-colors"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-[56px] left-0 w-full bg-[#0a0a0a] border-b border-[#222222] px-6 py-4 flex flex-col gap-4 text-sm font-medium text-[#888888] z-50">
            <a href="#features" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#ffffff] py-1">Features</a>
            <a href="#demo" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#ffffff] py-1">Templates</a>
            <a href="#pricing" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#ffffff] py-1">Pricing</a>
            <hr className="border-[#222222]" />
            <div className="flex items-center justify-between pt-2">
              <Link href="/studio" onClick={() => setMobileMenuOpen(false)} className="text-xs hover:text-[#ffffff]">Sign in</Link>
              <button 
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleStartBuilding();
                }}
                className="text-xs font-semibold px-4 py-2 rounded-[8px] bg-[#ffffff] text-[#0a0a0a] hover:bg-[#eaeaea]"
              >
                Start free →
              </button>
            </div>
          </div>
        )}
      </header>

      {/* 2. HERO SECTION */}
      <section className="relative overflow-hidden min-h-[90vh] flex flex-col items-center justify-center pt-24 pb-16 px-6 select-none">
        
        {/* Subtle dot grid behind mockup only - placed as absolute layer */}
        <div className="absolute inset-0 bg-dot-grid pointer-events-none opacity-[0.15] z-0" />

        <div className="max-w-4xl mx-auto text-center space-y-6 z-10 relative">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#111111] border border-[#222222] text-[#888888] text-xs font-mono">
            <span className="text-[#1D9E75]">✦</span> Open source · Free to use
          </div>

          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-[#ffffff] max-w-3xl mx-auto leading-[1.1] font-sans">
            Build beautiful READMEs visually.
          </h1>

          <p className="text-sm sm:text-base text-[#888888] max-w-xl mx-auto leading-relaxed">
            Drag blocks, customize in clicks, push directly to GitHub. No markdown syntax required.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button 
              onClick={handleStartBuilding}
              className="w-full sm:w-auto px-6 py-3 rounded-[8px] bg-[#ffffff] text-[#0a0a0a] hover:bg-[#eaeaea] font-semibold text-sm transition-all flex items-center justify-center gap-1.5 active:scale-95"
            >
              Start building free <ArrowRight className="w-4 h-4" />
            </button>
            <a 
              href="#templates"
              className="w-full sm:w-auto px-6 py-3 rounded-[8px] border border-[#222222] bg-[#111111] text-[#ffffff] hover:bg-[#161616] font-semibold text-sm transition-all"
            >
              View templates
            </a>
          </div>

          {/* Social Proof */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-6 text-xs text-[#888888]">
            <div className="flex -space-x-2">
              {[
                "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
                "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya",
                "https://api.dicebear.com/7.x/avataaars/svg?seed=Dan",
                "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
                "https://api.dicebear.com/7.x/avataaars/svg?seed=Alek"
              ].map((src, i) => (
                <img 
                  key={i} 
                  src={src} 
                  alt="Developer avatar"
                  className="w-6 h-6 rounded-full border border-[#0a0a0a] bg-[#111111]"
                  loading="lazy"
                />
              ))}
            </div>
            <span>Trusted by 2,400+ developers</span>
            <span className="text-[#222222] hidden sm:inline">|</span>
            <span className="flex items-center gap-1 font-semibold text-[#ffffff]">
              ★★★★★ <span className="text-xs">4.9</span>
            </span>
          </div>

          {/* Product UI Mockup */}
          <div className="pt-16 max-w-4xl mx-auto w-full animate-float">
            <div className="border border-[#222222] bg-[#111111] rounded-[12px] p-2 overflow-hidden shadow-2xl relative">
              
              {/* Floating Badges */}
              <div className="absolute top-6 left-6 z-20 px-2.5 py-1 rounded-md bg-[#0a0a0a] border border-[#222222] text-[10px] font-mono text-[#888888] flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#7F77DD]" /> 9 block types
              </div>

              <div className="absolute top-6 right-6 z-20 px-2.5 py-1 rounded-md bg-[#0a0a0a] border border-[#222222] text-[10px] font-mono text-[#888888] flex items-center gap-1.5">
                <Sparkle className="w-3 h-3 text-[#1D9E75]" /> AI auto-fill
              </div>

              <div className="absolute bottom-6 right-6 z-20 px-2.5 py-1 rounded-md bg-[#0a0a0a] border border-[#222222] text-[10px] font-mono text-[#888888] flex items-center gap-1.5">
                <GithubIcon className="w-3 h-3 text-[#ffffff]" /> Push to GitHub in 1 click
              </div>

              {/* Layout screenshot mockup */}
              <div className="border border-[#222222] bg-[#0a0a0a] rounded-[8px] overflow-hidden flex flex-col text-left">
                {/* Header of window */}
                <div className="h-9 border-b border-[#222222] bg-[#111111] px-4 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#222222]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#222222]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#222222]" />
                  <span className="text-[10px] text-neutral-600 font-mono pl-4">workspace.md</span>
                </div>
                {/* App content container */}
                <div className="grid grid-cols-12 h-64 text-neutral-500 font-mono text-[9px] select-none">
                  {/* Left palette */}
                  <div className="col-span-3 border-r border-[#222222] bg-[#111111] p-3 space-y-2">
                    <div className="h-4 bg-[#161616] rounded border border-[#222222] w-full" />
                    <div className="h-4 bg-[#0a0a0a] rounded w-3/4 border border-[#222222]" />
                    <div className="h-4 bg-[#0a0a0a] rounded w-5/6 border border-[#222222]" />
                    <div className="h-4 bg-[#0a0a0a] rounded w-2/3 border border-[#222222]" />
                  </div>
                  {/* Center Canvas */}
                  <div className="col-span-6 p-4 space-y-3 bg-[#0a0a0a] overflow-hidden">
                    <div className="border border-[#222222] p-2.5 rounded bg-[#111111] space-y-1.5">
                      <div className="h-2 bg-neutral-800 w-1/3 rounded" />
                      <div className="h-2 bg-neutral-800 w-2/3 rounded" />
                    </div>
                    <div className="border border-[#222222] p-2.5 rounded bg-[#111111] space-y-1">
                      <div className="h-1.5 bg-[#1D9E75]/30 w-full rounded" />
                      <div className="h-1.5 bg-[#7F77DD]/20 w-3/4 rounded" />
                    </div>
                  </div>
                  {/* Right Settings */}
                  <div className="col-span-3 border-l border-[#222222] bg-[#111111] p-3 space-y-2">
                    <div className="h-3 bg-neutral-800 rounded w-1/2" />
                    <div className="h-6 bg-[#0a0a0a] rounded border border-[#222222] w-full" />
                    <div className="h-6 bg-[#0a0a0a] rounded border border-[#222222] w-full" />
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 3. LOGO STRIP */}
      <section className="border-y border-[#222222] py-8 bg-[#0a0a0a] overflow-hidden select-none">
        <div className="max-w-7xl mx-auto px-6 space-y-4">
          <p className="text-[10px] uppercase tracking-wider text-center text-[#888888] font-mono">
            Used by developers at
          </p>
          <div className="relative w-full overflow-hidden flex items-center">
            <div className="animate-marquee whitespace-nowrap flex gap-16 text-sm font-semibold tracking-tight text-[#888888] opacity-50 font-sans">
              <span>Vercel</span>
              <span>Stripe</span>
              <span>Linear</span>
              <span>Supabase</span>
              <span>PlanetScale</span>
              <span>Hashnode</span>
              <span>Dev.to</span>
              <span>GitHub</span>
              {/* Loop replication to ensure smooth scroll */}
              <span>Vercel</span>
              <span>Stripe</span>
              <span>Linear</span>
              <span>Supabase</span>
              <span>PlanetScale</span>
              <span>Hashnode</span>
              <span>Dev.to</span>
              <span>GitHub</span>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FEATURE HIGHLIGHTS */}
      <section id="features" className="max-w-7xl mx-auto px-6 py-24 select-none">
        <div className="text-left space-y-3 pb-16">
          <h2 className="text-xl font-bold tracking-tight text-[#ffffff] font-sans">
            Everything you need for a great README
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Card 1 */}
          <div className="border border-[#222222] bg-[#111111] p-4 rounded-[12px] space-y-4 text-left hover:border-neutral-700 transition-colors">
            <div className="w-8 h-8 rounded-[8px] border border-[#222222] bg-[#0a0a0a] flex items-center justify-center text-[#1D9E75]">
              <LayoutGrid className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-[#ffffff]">Visual block editor</h3>
            <p className="text-xs text-[#888888] leading-relaxed">
              Drag and drop 16 block types. Header, badges, code snippets, tech stack, contributors, GitHub stats — all visual, no markdown needed.
            </p>
          </div>

          {/* Card 2 */}
          <div className="border border-[#222222] bg-[#111111] p-4 rounded-[12px] space-y-4 text-left hover:border-neutral-700 transition-colors">
            <div className="w-8 h-8 rounded-[8px] border border-[#222222] bg-[#0a0a0a] flex items-center justify-center text-[#1D9E75]">
              <Sparkles className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-[#ffffff]">AI auto-fill</h3>
            <p className="text-xs text-[#888888] leading-relaxed">
              Paste your GitHub repo URL. AI reads your code, detects your stack, and generates a full README in seconds.
            </p>
          </div>

          {/* Card 3 */}
          <div className="border border-[#222222] bg-[#111111] p-4 rounded-[12px] space-y-4 text-left hover:border-neutral-700 transition-colors">
            <div className="w-8 h-8 rounded-[8px] border border-[#222222] bg-[#0a0a0a] flex items-center justify-center text-[#1D9E75]">
              <GithubIcon className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-[#ffffff]">Push to GitHub</h3>
            <p className="text-xs text-[#888888] leading-relaxed">
              Connect your GitHub account and push README.md directly to any repo — without leaving the editor.
            </p>
          </div>

          {/* Card 4 */}
          <div className="border border-[#222222] bg-[#111111] p-4 rounded-[12px] space-y-4 text-left hover:border-neutral-700 transition-colors">
            <div className="w-8 h-8 rounded-[8px] border border-[#222222] bg-[#0a0a0a] flex items-center justify-center text-[#1D9E75]">
              <ArrowLeftRight className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-[#ffffff]">Live markdown sync</h3>
            <p className="text-xs text-[#888888] leading-relaxed">
              Switch between visual and raw markdown anytime. Edit markdown directly — blocks update automatically.
            </p>
          </div>

          {/* Card 5 */}
          <div className="border border-[#222222] bg-[#111111] p-4 rounded-[12px] space-y-4 text-left hover:border-neutral-700 transition-colors">
            <div className="w-8 h-8 rounded-[8px] border border-[#222222] bg-[#0a0a0a] flex items-center justify-center text-[#1D9E75]">
              <FileText className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-[#ffffff]">10+ templates</h3>
            <p className="text-xs text-[#888888] leading-relaxed">
              Start fast with templates for NPM packages, SaaS products, Web3 projects, personal profiles, APIs, and more.
            </p>
          </div>

          {/* Card 6 */}
          <div className="border border-[#222222] bg-[#111111] p-4 rounded-[12px] space-y-4 text-left hover:border-neutral-700 transition-colors">
            <div className="w-8 h-8 rounded-[8px] border border-[#222222] bg-[#0a0a0a] flex items-center justify-center text-[#1D9E75]">
              <Eye className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-[#ffffff]">GitHub-accurate preview</h3>
            <p className="text-xs text-[#888888] leading-relaxed">
              See exactly how your README will look on GitHub — light and dark mode — before you publish.
            </p>
          </div>

        </div>
      </section>

      {/* 5. PRODUCT DEMO / HOW IT WORKS */}
      <section className="max-w-7xl mx-auto px-6 py-24 select-none w-full">
        <div className="text-left space-y-3 pb-16">
          <h2 className="text-xl font-bold tracking-tight text-[#ffffff] font-sans">
            From blank page to published README in 3 steps
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative">
          
          {/* Connector Line (Desktop) */}
          <div className="hidden lg:block absolute top-6 left-8 right-8 h-[1px] bg-[#222222] z-0" />

          {/* Step 1 */}
          <div className="space-y-6 text-left relative z-10">
            <div className="text-4xl font-bold text-[#222222] font-mono leading-none">01</div>
            
            {/* Visual Screen frame */}
            <div className="border border-[#222222] bg-[#111111] rounded-[12px] p-3 aspect-video flex flex-col justify-between overflow-hidden">
              <div className="h-6 border-b border-[#222222] flex items-center gap-1.5 px-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#222222]" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#222222]" />
              </div>
              <div className="flex-1 flex flex-col justify-center items-center gap-2 p-2">
                <div className="text-[10px] font-mono text-[#888888] border border-[#222222] p-1.5 rounded bg-[#0a0a0a] w-full text-center">NPM Package template</div>
                <div className="text-[10px] font-mono text-[#888888] border border-[#222222] p-1.5 rounded bg-[#0a0a0a] w-full text-center">Blank Canvas</div>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-bold text-[#ffffff]">Pick a template or start blank</h4>
              <p className="text-xs text-[#888888] leading-relaxed">
                Choose from 10+ templates built for real project types, or start with a blank canvas.
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="space-y-6 text-left relative z-10">
            <div className="text-4xl font-bold text-[#222222] font-mono leading-none">02</div>
            
            {/* Visual Screen frame */}
            <div className="border border-[#222222] bg-[#111111] rounded-[12px] p-3 aspect-video flex flex-col justify-between overflow-hidden">
              <div className="h-6 border-b border-[#222222] flex items-center gap-1.5 px-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#222222]" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#222222]" />
              </div>
              <div className="flex-1 flex flex-col justify-center gap-1 p-2">
                <div className="h-3.5 bg-[#0a0a0a] border border-[#222222] rounded w-full flex items-center px-1.5 text-[8px] text-[#1D9E75]">
                  🛠️ Tech Stack Block
                </div>
                <div className="h-3.5 bg-[#161616] border border-dashed border-[#1D9E75]/40 rounded w-5/6 flex items-center px-1.5 text-[8px] text-[#bdb9b3] translate-x-2">
                  [Dragging Badge Block...]
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-bold text-[#ffffff]">Customize with blocks</h4>
              <p className="text-xs text-[#888888] leading-relaxed">
                Add and arrange blocks — tech stack, badges, code snippets, contributor grids, GitHub stats. Each block has its own settings panel.
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="space-y-6 text-left relative z-10">
            <div className="text-4xl font-bold text-[#222222] font-mono leading-none">03</div>
            
            {/* Visual Screen frame */}
            <div className="border border-[#222222] bg-[#111111] rounded-[12px] p-3 aspect-video flex flex-col justify-between overflow-hidden">
              <div className="h-6 border-b border-[#222222] flex items-center gap-1.5 px-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#222222]" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#222222]" />
              </div>
              <div className="flex-1 flex flex-col items-center justify-center p-2 text-[#1D9E75]">
                <GithubIcon className="w-6 h-6 mb-1 text-[#ffffff]" />
                <span className="text-[9px] font-mono border border-[#1D9E75]/20 bg-[#1D9E75]/10 px-2 py-0.5 rounded">Push success</span>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-bold text-[#ffffff]">Push to GitHub</h4>
              <p className="text-xs text-[#888888] leading-relaxed">
                Connect GitHub, pick your repo, and commit README.md in one click. Or copy markdown and paste anywhere.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 6. INTERACTIVE BLOCK SHOWCASE */}
      <section className="max-w-7xl mx-auto px-6 py-24 select-none w-full">
        <div className="text-left space-y-3 pb-16">
          <h2 className="text-xl font-bold tracking-tight text-[#ffffff] font-sans">
            16 block types. Every README need covered.
          </h2>
        </div>

        {/* Desktop Showcase */}
        <div className="hidden md:grid grid-cols-12 gap-8 items-stretch">
          {/* Left panel - scrollable block buttons */}
          <div className="col-span-5 border border-[#222222] bg-[#111111] rounded-[12px] p-3 max-h-[420px] overflow-y-auto space-y-1">
            {blocksList.map((block) => {
              const Icon = block.icon;
              return (
                <button
                  key={block.id}
                  onClick={() => setActiveShowcaseBlock(block.id)}
                  className={`w-full flex items-center gap-3 p-2.5 rounded-[8px] border text-left transition-all ${
                    activeShowcaseBlock === block.id 
                      ? "bg-[#0a0a0a] border-[#222222] text-[#ffffff]" 
                      : "bg-transparent border-transparent text-[#888888] hover:text-[#ffffff]"
                  }`}
                >
                  <div className={`p-1 rounded-[6px] border ${activeShowcaseBlock === block.id ? "border-[#222222] bg-[#111111] text-[#1D9E75]" : "border-[#222222]/30 bg-transparent text-[#888888]"}`}>
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xs font-semibold">{block.name}</span>
                </button>
              );
            })}
          </div>

          {/* Right panel - Dynamic visual preview */}
          <div className="col-span-7 border border-[#222222] bg-[#111111] rounded-[12px] p-6 flex flex-col justify-between text-left">
            <div>
              <div className="flex items-center justify-between border-b border-[#222222] pb-4 mb-6">
                <span className="text-[10px] font-mono tracking-wider text-[#888888] uppercase">Adaptive rendering preview</span>
                <span className="text-[10px] font-mono text-[#1D9E75] bg-[#1D9E75]/10 px-2 py-0.5 rounded border border-[#1D9E75]/20">Active widget</span>
              </div>

              {/* Dynamic render components */}
              <div className="bg-[#0a0a0a] border border-[#222222] p-6 rounded-[8px] min-h-[180px] flex items-center justify-center">
                {activeShowcaseBlock === "header" && (
                  <div className="w-full text-center space-y-2">
                    <h3 className="text-lg font-bold text-white">README Studio layout</h3>
                    <p className="text-[10px] text-[#888888] max-w-xs mx-auto">Build beautiful README files visually without memorizing markdown tags</p>
                  </div>
                )}
                {activeShowcaseBlock === "text" && (
                  <div className="text-left w-full space-y-2">
                    <h4 className="text-xs font-bold text-[#ffffff]">Usage instructions</h4>
                    <p className="text-[10px] text-[#888888] leading-relaxed">Clone this repository locally, edit configurations inside settings panel, and deploy blocks directly using our web CLI panel.</p>
                  </div>
                )}
                {activeShowcaseBlock === "badges" && (
                  <div className="flex flex-wrap gap-2 justify-center">
                    <span className="px-2 py-0.5 rounded-[4px] bg-[#161616] border border-[#222222] text-[9px] font-mono text-[#7F77DD]">npm v1.2.0</span>
                    <span className="px-2 py-0.5 rounded-[4px] bg-[#161616] border border-[#222222] text-[9px] font-mono text-[#1D9E75]">build passing</span>
                    <span className="px-2 py-0.5 rounded-[4px] bg-[#161616] border border-[#222222] text-[9px] font-mono text-neutral-400">license MIT</span>
                  </div>
                )}
                {activeShowcaseBlock === "techstack" && (
                  <div className="grid grid-cols-4 gap-3 text-center text-[10px] w-full max-w-sm">
                    <div className="p-3 bg-[#111111] border border-[#222222] rounded-[8px] text-white">React</div>
                    <div className="p-3 bg-[#111111] border border-[#222222] rounded-[8px] text-[#1D9E75] font-semibold">Next.js</div>
                    <div className="p-3 bg-[#111111] border border-[#222222] rounded-[8px] text-white">Tailwind</div>
                    <div className="p-3 bg-[#111111] border border-[#222222] rounded-[8px] text-[#7F77DD]">Zustand</div>
                  </div>
                )}
                {activeShowcaseBlock === "code" && (
                  <div className="w-full font-mono text-[9px] text-[#bdb9b3] bg-[#161616] p-4 rounded-[6px] border border-[#222222] text-left">
                    <p className="text-neutral-600 mb-2 border-b border-[#222222] pb-1">example.ts</p>
                    <p className="text-[#1D9E75]">import <span className="text-white">{"{ studio }"}</span> from <span className="text-[#7F77DD]">{"\"readme-studio\""}</span></p>
                    <p className="mt-1">const builder = new studio();</p>
                  </div>
                )}
                {activeShowcaseBlock === "table" && (
                  <div className="w-full text-[10px] font-mono">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b border-[#222222] text-neutral-400">
                          <th className="py-2 text-left">Key parameters</th>
                          <th className="py-2 text-left">Type values</th>
                          <th className="py-2 text-left">Default</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-[#222222]/50 text-neutral-500">
                          <td className="py-2">projectName</td>
                          <td>string</td>
                          <td>{"\"Draft\""}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                )}
                {activeShowcaseBlock === "chart" && (
                  <div className="w-full h-16 flex items-end justify-between gap-1.5 px-4">
                    <div className="h-4 bg-[#222222] flex-1 rounded" />
                    <div className="h-8 bg-[#222222] flex-1 rounded" />
                    <div className="h-12 bg-[#222222] flex-1 rounded" />
                    <div className="h-16 bg-[#1D9E75] flex-1 rounded" />
                  </div>
                )}
                {activeShowcaseBlock === "image" && (
                  <div className="border border-[#222222] bg-[#111111] p-2 rounded-[8px] text-[10px] text-center text-[#888888]">
                    [ Mock product showcase preview ]
                  </div>
                )}
                {activeShowcaseBlock === "githubstats" && (
                  <div className="border border-[#222222] bg-[#111111] p-4 rounded-[8px] flex items-center justify-between w-full max-w-sm">
                    <div className="space-y-1">
                      <p className="text-[10px] font-bold text-white">General repository stats</p>
                      <p className="text-[9px] text-neutral-500">Total commits: 489</p>
                    </div>
                    <span className="text-xl font-bold text-[#1D9E75]">A+</span>
                  </div>
                )}
                {activeShowcaseBlock === "contributors" && (
                  <div className="flex gap-2.5">
                    {["Alice", "Bob", "Charlie", "Dave"].map((seed) => (
                      <img
                        key={seed}
                        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}`}
                        alt="Contributor profile bubble"
                        className="w-10 h-10 rounded-full border border-[#222222] bg-[#111111]"
                        loading="lazy"
                      />
                    ))}
                  </div>
                )}
                {activeShowcaseBlock === "socials" && (
                  <div className="flex gap-2">
                    <span className="px-3 py-1 rounded bg-[#111111] border border-[#222222] text-[10px] text-[#bdb9b3]">Twitter</span>
                    <span className="px-3 py-1 rounded bg-[#111111] border border-[#222222] text-[10px] text-[#bdb9b3]">Discord</span>
                  </div>
                )}
                {activeShowcaseBlock === "roadmap" && (
                  <div className="space-y-2 text-left text-[10px] w-full max-w-xs font-mono">
                    <div className="flex items-center gap-2 text-neutral-450"><Check className="w-3.5 h-3.5 text-[#1D9E75]" /> Initialize workspace editor</div>
                    <div className="flex items-center gap-2 text-neutral-500"><span className="w-3.5 h-3.5 rounded border border-[#222222] inline-block" /> Add customization panels</div>
                  </div>
                )}
                {activeShowcaseBlock === "divider" && (
                  <hr className="w-full border-dashed border-[#222222]" />
                )}
                {activeShowcaseBlock === "video" && (
                  <div className="w-12 h-12 rounded-full bg-[#111111] border border-[#222222] flex items-center justify-center text-[#7F77DD]">
                    <Monitor className="w-5 h-5" />
                  </div>
                )}
                {activeShowcaseBlock === "sponsors" && (
                  <div className="flex gap-2">
                    {["Felix", "Aneka"].map((seed) => (
                      <img
                        key={seed}
                        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}`}
                        alt="Sponsor avatar bubble"
                        className="w-8 h-8 rounded-full border border-[#222222] bg-[#111111]"
                        loading="lazy"
                      />
                    ))}
                  </div>
                )}
                {activeShowcaseBlock === "group" && (
                  <div className="border border-dashed border-neutral-700 p-4 rounded w-full text-center text-[10px] text-neutral-500">
                    [ Bounding Layout Box ]
                  </div>
                )}
              </div>
            </div>

            <div className="border-t border-[#222222] pt-4 mt-6">
              <h5 className="text-xs font-bold text-[#ffffff] mb-1">
                {blocksList.find((b) => b.id === activeShowcaseBlock)?.name} Block Type
              </h5>
              <p className="text-[11px] text-[#888888] leading-relaxed">
                {blocksList.find((b) => b.id === activeShowcaseBlock)?.previewText}
              </p>
            </div>
          </div>
        </div>

        {/* Mobile Accordion */}
        <div className="md:hidden space-y-3 w-full text-left">
          {blocksList.map((block) => {
            const Icon = block.icon;
            const isOpen = activeShowcaseBlock === block.id;
            return (
              <div 
                key={block.id}
                className="border border-[#222222] bg-[#111111] rounded-[8px] overflow-hidden"
              >
                <button
                  onClick={() => setActiveShowcaseBlock(isOpen ? "" : block.id)}
                  className="w-full flex items-center justify-between p-3 text-left font-semibold text-xs text-[#ffffff]"
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-3.5 h-3.5 text-[#1D9E75]" />
                    <span>{block.name}</span>
                  </div>
                  <ChevronDown className={`w-3.5 h-3.5 text-[#888888] transition-transform ${isOpen ? "rotate-180" : ""}`} />
                </button>

                {isOpen && (
                  <div className="p-4 border-t border-[#222222] bg-[#0a0a0a] space-y-2">
                    <p className="text-[11px] text-[#888888]">{block.previewText}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 7. TEMPLATE GALLERY */}
      <section id="templates" className="max-w-7xl mx-auto px-6 py-24 select-none w-full text-center">
        <div className="text-left space-y-3 pb-16">
          <h2 className="text-xl font-bold tracking-tight text-[#ffffff] font-sans">
            Start with a template. Ship in minutes.
          </h2>
        </div>

        {/* Horizontal Scroll wrapper */}
        <div className="overflow-x-auto pb-6 flex gap-6 snap-x snap-mandatory scrollbar-thin">
          
          {[
            { name: "NPM package", tag: "Open Source", desc: "Perfect for libraries, widgets, or utils. Includes Header, installation blocks, and parameters list." },
            { name: "Personal profile", tag: "Bio Portfolio", desc: "A personalized entry profile overview. Includes bio markdown, links badges, and custom contributors grid." },
            { name: "SaaS product", tag: "SaaS Boilerplate", desc: "Optimized for visual product showpieces. Includes cover images, key highlights, and grids." },
            { name: "Web3 / Solana", tag: "Blockchain", desc: "Tailored for smart contracts or decentralized libraries. Includes configuration specs." },
            { name: "REST API", tag: "API Docs", desc: "Optimized for route catalogs and status code indexes. Includes parameters table." },
            { name: "Monorepo", tag: "Infrastructure", desc: "Built for workspaces containing multiple packages. Includes layout trees." },
            { name: "Hackathon", tag: "Minimal MVP", desc: "Minimal overview built for fast prototype entries. Includes video mockups." },
            { name: "Mobile app", tag: "iOS/Android", desc: "Optimized for app store details. Includes responsive screenshots." }
          ].map((tpl) => (
            <Link
              key={tpl.name}
              href={`/studio?template=${encodeURIComponent(tpl.name.toLowerCase().replace(/ \/ /g, "-").replace(/ /g, "-"))}`}
              className="flex-shrink-0 w-72 border border-[#222222] bg-[#111111] p-6 rounded-[12px] text-left snap-start hover:border-neutral-700 hover:bg-[#161616]/40 transition-all group flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-[#7F77DD] bg-[#7F77DD]/10 px-2 py-0.5 rounded border border-[#7F77DD]/20">
                    {tpl.tag}
                  </span>
                </div>
                <h4 className="font-bold text-sm text-white">{tpl.name}</h4>
                <p className="text-xs text-[#888888] leading-relaxed">{tpl.desc}</p>
              </div>

              <div className="flex items-center gap-1 text-[10px] font-semibold text-[#1D9E75] mt-6 group-hover:gap-2 transition-all">
                Launch template <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>
          ))}

        </div>

        <div className="pt-8">
          <Link 
            href="/studio"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1D9E75] hover:text-[#2dd4bf] transition-colors"
          >
            Browse all templates <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>

      {/* 8. AI FEATURE HIGHLIGHT */}
      <section className="bg-[#111111] border-y border-[#222222] py-24 select-none w-full">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column Copy */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <span className="text-[10px] font-mono text-[#7F77DD] bg-[#7F77DD]/10 px-2 py-0.5 rounded border border-[#7F77DD]/20">
              Powered by AI
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#ffffff] font-sans">
              Paste a repo URL. Get a full README.
            </h2>
            <p className="text-xs sm:text-sm text-[#888888] leading-relaxed max-w-xl">
              README Studio reads your GitHub repo — languages, topics, description, existing README — and generates a complete, customized block layout in seconds. Edit anything after.
            </p>
            <div className="pt-2">
              <Link 
                href="/studio"
                className="inline-flex items-center justify-center px-4 py-2.5 rounded-[8px] bg-white text-black hover:bg-[#eaeaea] font-semibold text-xs transition-all flex items-center gap-1.5"
              >
                Try with your repo <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Right Column Demo Output animation */}
          <div className="lg:col-span-6 text-left">
            <div className="border border-[#222222] bg-[#0a0a0a] rounded-[12px] p-5 space-y-4 shadow-xl">
              {/* Mock input box */}
              <form onSubmit={handleAiTrySubmit} className="space-y-1.5">
                <div className="flex items-center gap-2 bg-[#111111] border border-[#222222] rounded-[8px] p-1.5">
                  <div className="pl-2 text-neutral-550">
                    <GithubIcon className="w-3.5 h-3.5" />
                  </div>
                  <input 
                    type="text" 
                    value={aiRepoUrl}
                    onChange={(e) => setAiRepoUrl(e.target.value)}
                    className="flex-1 bg-transparent border-0 outline-none text-xs font-mono text-white pl-1 h-7"
                    required
                  />
                  <button 
                    type="submit"
                    className="px-3.5 h-8 rounded-[8px] bg-[#161616] border border-[#222222] text-[#bdb9b3] hover:border-neutral-700 hover:text-white transition-all text-xs font-semibold cursor-pointer"
                  >
                    Import
                  </button>
                </div>
              </form>

              {/* Animated block output list appearing one by one */}
              <div className="space-y-2.5 pt-2">
                <div className="text-[10px] font-mono text-neutral-500 border-b border-[#222222] pb-1">Output preview</div>
                
                {aiDemoTriggered ? (
                  <div className="space-y-2">
                    <div className="p-2.5 rounded bg-[#111111] border border-[#222222] text-[10px] font-mono text-[#1D9E75] flex items-center gap-2 animate-fade-in-block">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#1D9E75]" /> Header layout detected
                    </div>
                    <div className="p-2.5 rounded bg-[#111111] border border-[#222222] text-[10px] font-mono text-[#7F77DD] flex items-center gap-2 animate-fade-in-block" style={{ animationDelay: "0.4s" }}>
                      <span className="w-1.5 h-1.5 rounded-full bg-[#7F77DD]" /> Tech stack found: React, Next.js, Node
                    </div>
                    <div className="p-2.5 rounded bg-[#111111] border border-[#222222] text-[10px] font-mono text-neutral-450 flex items-center gap-2 animate-fade-in-block" style={{ animationDelay: "0.8s" }}>
                      <span className="w-1.5 h-1.5 rounded-full bg-neutral-600" /> Stats widgets configured
                    </div>
                  </div>
                ) : (
                  <div className="h-20 flex items-center justify-center text-xs text-neutral-600 font-mono">
                    [ Waiting for repository compiler query... ]
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 9. GITHUB STATS BLOCK SHOWCASE */}
      <section className="max-w-7xl mx-auto px-6 py-24 select-none w-full text-center">
        <div className="max-w-xl mx-auto space-y-4 pb-12">
          <h2 className="text-xl font-bold tracking-tight text-[#ffffff] font-sans">
            Your GitHub stats, in your README.
          </h2>
          <p className="text-xs text-[#888888] leading-relaxed">
            Choose from 8 themes. Add with one click.
          </p>
        </div>

        {/* Theme pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 pb-10">
          {statsThemesList.map((theme) => (
            <button
              key={theme.id}
              onClick={() => setStatsTheme(theme.id)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                statsTheme === theme.id 
                  ? "bg-white text-black border-white" 
                  : "bg-[#111111] text-[#888888] border-[#222222] hover:text-[#ffffff]"
              }`}
            >
              {theme.label}
            </button>
          ))}
        </div>

        {/* 3 cards side by side preview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto text-left">
          
          {/* Card 1: General Stats */}
          <div className="border border-[#222222] bg-[#111111] p-5 rounded-[12px] space-y-4 flex flex-col justify-between min-h-[140px]">
            <p className="text-[10px] uppercase font-mono tracking-wider text-[#888888]">General stats</p>
            <div className="space-y-1.5">
              <div className="text-xs font-bold text-white">mockowner&apos;s GitHub Stats</div>
              <div className={`h-1.5 rounded-full ${statsTheme === "radical" ? "bg-red-500" : statsTheme === "tokyonight" ? "bg-indigo-500" : statsTheme === "nord" ? "bg-cyan-500" : "bg-[#1D9E75]"} w-3/4`} />
              <div className="h-1.5 rounded-full bg-neutral-800 w-1/2" />
            </div>
            <span className="text-[10px] text-neutral-500 font-mono">Theme applied: {statsTheme}</span>
          </div>

          {/* Card 2: Streak stats */}
          <div className="border border-[#222222] bg-[#111111] p-5 rounded-[12px] space-y-4 flex flex-col justify-between min-h-[140px]">
            <p className="text-[10px] uppercase font-mono tracking-wider text-[#888888]">Streak stats</p>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-lg font-extrabold text-white">42 days</div>
                <div className="text-[9px] text-[#888888] uppercase">Current Streak</div>
              </div>
              <span className={`text-xl ${statsTheme === "radical" ? "text-red-500" : statsTheme === "tokyonight" ? "text-indigo-500" : statsTheme === "nord" ? "text-cyan-500" : "text-[#1D9E75]"}`}>🔥</span>
            </div>
            <span className="text-[10px] text-neutral-500 font-mono">Real-time update</span>
          </div>

          {/* Card 3: Top languages */}
          <div className="border border-[#222222] bg-[#111111] p-5 rounded-[12px] space-y-4 flex flex-col justify-between min-h-[140px]">
            <p className="text-[10px] uppercase font-mono tracking-wider text-[#888888]">Top languages</p>
            <div className="space-y-1.5">
              <div className="flex justify-between text-[10px] font-mono">
                <span>TypeScript</span>
                <span>65%</span>
              </div>
              <div className="flex justify-between text-[10px] font-mono text-neutral-500">
                <span>CSS</span>
                <span>25%</span>
              </div>
            </div>
            <span className="text-[10px] text-neutral-500 font-mono">Calculated from commits</span>
          </div>

        </div>
      </section>

      {/* 10. TESTIMONIALS */}
      <section className="max-w-7xl mx-auto px-6 py-24 select-none w-full text-center">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto text-left">
          
          {/* Card 1 */}
          <div className="border border-[#222222] bg-[#111111] p-6 rounded-[12px] flex flex-col justify-between space-y-6">
            <p className="text-xs sm:text-sm leading-relaxed text-[#ffffff]">
              &ldquo;I used to spend 2 hours perfecting my READMEs. Now it takes 10 minutes and looks 10x better.&rdquo;
            </p>
            <div className="text-xs font-mono text-[#1D9E75]">
              — @siddharth_dev · Full Stack Developer
            </div>
          </div>

          {/* Card 2 */}
          <div className="border border-[#222222] bg-[#111111] p-6 rounded-[12px] flex flex-col justify-between space-y-6">
            <p className="text-xs sm:text-sm leading-relaxed text-[#ffffff]">
              &ldquo;The AI auto-fill feature is insane. Pasted my repo and got a production-ready README in 30 seconds.&rdquo;
            </p>
            <div className="text-xs font-mono text-[#1D9E75]">
              — @priya_codes · OSS Maintainer
            </div>
          </div>

          {/* Card 3 */}
          <div className="border border-[#222222] bg-[#111111] p-6 rounded-[12px] flex flex-col justify-between space-y-6">
            <p className="text-xs sm:text-sm leading-relaxed text-[#ffffff]">
              &ldquo;Finally a tool that understands how developers actually work. Dark theme, GitHub preview, direct push. Perfect.&rdquo;
            </p>
            <div className="text-xs font-mono text-[#1D9E75]">
              — @om2309 · indie hacker
            </div>
          </div>

        </div>
      </section>

      {/* 11. PRICING */}
      <section id="pricing" className="max-w-7xl mx-auto px-6 py-24 select-none w-full text-center">
        <div className="max-w-xl mx-auto space-y-4 pb-12">
          <h2 className="text-xl font-bold tracking-tight text-[#ffffff] font-sans">
            Simple pricing. Cancel anytime.
          </h2>
        </div>

        {/* 2 tiers (Free excluded) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto text-left items-stretch">
          
          {/* Pro Tier (Highlighted with 2px white border) */}
          <div className="border-2 border-white bg-[#111111] p-8 rounded-[12px] flex flex-col justify-between relative space-y-6">
            <div className="absolute top-4 right-4 px-2 py-0.5 rounded-full bg-[#1D9E75]/10 text-[#1D9E75] border border-[#1D9E75]/20 text-[9px] font-mono font-semibold uppercase">
              Most popular
            </div>
            
            <div className="space-y-4">
              <div>
                <h4 className="text-base font-bold text-white">Pro</h4>
                <p className="text-xs text-[#888888] mt-1">For active maintainers and indie creators.</p>
              </div>

              <div className="py-2">
                <span className="text-3xl font-extrabold text-white">$7</span>
                <span className="text-xs text-[#888888]"> / month</span>
                <p className="text-[10px] text-[#1D9E75] mt-1">or $49/year — save 40%</p>
              </div>

              <ul className="space-y-2 text-xs text-[#bdb9b3]">
                <li className="flex items-center gap-2">✔ Unlimited saved projects</li>
                <li className="flex items-center gap-2">✔ AI auto-fill (50 uses/month)</li>
                <li className="flex items-center gap-2">✔ Push to GitHub</li>
                <li className="flex items-center gap-2">✔ Private shareable links</li>
                <li className="flex items-center gap-2">✔ Priority support</li>
              </ul>
            </div>

            <button
              onClick={handleStartBuilding}
              className="w-full py-2.5 rounded-[8px] bg-white text-black hover:bg-[#eaeaea] text-xs font-semibold text-center transition-all"
            >
              Start Pro →
            </button>
          </div>

          {/* Team Tier */}
          <div className="border border-[#222222] bg-[#111111] p-8 rounded-[12px] flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div>
                <h4 className="text-base font-bold text-white">Team</h4>
                <p className="text-xs text-[#888888] mt-1">For workspaces managing multiple repositories.</p>
              </div>

              <div className="py-2">
                <span className="text-3xl font-extrabold text-white">$19</span>
                <span className="text-xs text-[#888888]"> / month per seat</span>
              </div>

              <ul className="space-y-2 text-xs text-[#bdb9b3]">
                <li className="flex items-center gap-2">✔ Everything in Pro</li>
                <li className="flex items-center gap-2">✔ Shared project workspace</li>
                <li className="flex items-center gap-2">✔ Team templates</li>
                <li className="flex items-center gap-2">✔ SSO / GitHub Org login</li>
              </ul>
            </div>

            <button
              onClick={handleStartBuilding}
              className="w-full py-2.5 rounded-[8px] border border-[#222222] bg-[#0a0a0a] text-white hover:bg-[#111111] text-xs font-semibold text-center transition-all"
            >
              Contact us
            </button>
          </div>

        </div>
      </section>

      {/* 12. FAQ ACCORDION */}
      <section id="faq" className="max-w-3xl mx-auto px-6 py-24 select-none w-full text-left">
        <div className="space-y-3 pb-12 text-center">
          <h2 className="text-xl font-bold tracking-tight text-[#ffffff] font-sans">
            Common questions
          </h2>
        </div>

        <div className="border-t border-[#222222] divide-y divide-[#222222]">
          {faqs.map((faq, idx) => {
            const isOpen = faqOpenIndex === idx;
            return (
              <div key={idx} className="py-4">
                <button
                  onClick={() => setFaqOpenIndex(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between text-xs font-bold text-white text-left hover:text-[#1D9E75] transition-colors"
                >
                  <span>{faq.q}</span>
                  <span className="text-sm font-mono text-[#888888] select-none pl-4">
                    {isOpen ? "×" : "+"}
                  </span>
                </button>
                
                {isOpen && (
                  <div className="mt-3 text-xs text-[#888888] leading-relaxed transition-all duration-300">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 13. CTA BANNER */}
      <section className="bg-[#111111] border-y border-[#222222] py-24 select-none w-full text-center px-6">
        <div className="max-w-2xl mx-auto space-y-6">
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#ffffff] font-sans leading-none">
            Your README is the first impression of your project.
          </h2>
          <p className="text-xs sm:text-sm text-[#888888] max-w-lg mx-auto">
            Make it count. Start building in seconds — no account needed.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={handleStartBuilding}
              className="w-full sm:w-auto px-6 py-3 rounded-[8px] bg-white text-black hover:bg-[#eaeaea] font-bold text-xs transition-all flex items-center justify-center gap-1.5"
            >
              Start building free <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <a
              href="https://github.com"
              className="w-full sm:w-auto px-6 py-3 rounded-[8px] border border-[#222222] bg-[#0a0a0a] text-white hover:bg-[#111111] font-semibold text-xs transition-all flex items-center justify-center gap-2"
            >
              <GithubIcon className="w-3.5 h-3.5" /> View on GitHub
            </a>
          </div>

          <p className="text-[10px] text-neutral-500 font-mono">
            No credit card. No setup. Just open and build.
          </p>
        </div>
      </section>

      {/* 14. FOOTER */}
      <footer className="bg-[#0a0a0a] py-16 border-t border-[#222222] select-none text-neutral-500 text-xs w-full text-left">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 pb-12">
          
          <div className="space-y-3 col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 text-white font-semibold">
              <FileText className="w-4 h-4 text-white" />
              <span>README Studio</span>
            </div>
            <p className="text-[10px] text-neutral-600 leading-relaxed">
              Beautiful READMEs in minutes, not hours. Built by developers, for developers.
            </p>
          </div>

          <div className="space-y-3">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#888888]">Product</span>
            <ul className="space-y-2 text-[10px]">
              <li><a href="#features" className="hover:text-neutral-300">Features</a></li>
              <li><a href="#templates" className="hover:text-neutral-300">Templates</a></li>
              <li><a href="#pricing" className="hover:text-neutral-300">Pricing</a></li>
              <li><a href="#faq" className="hover:text-neutral-300">Changelog</a></li>
              <li><Link href="/studio" className="hover:text-neutral-300">Roadmap</Link></li>
            </ul>
          </div>

          <div className="space-y-3">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#888888]">Resources</span>
            <ul className="space-y-2 text-[10px]">
              <li><a href="#features" className="hover:text-neutral-300">Docs</a></li>
              <li><a href="https://github.com" className="hover:text-neutral-300">GitHub</a></li>
              <li><a href="https://discord.com" className="hover:text-neutral-300">Discord</a></li>
              <li><a href="https://twitter.com" className="hover:text-neutral-300">Twitter/X</a></li>
              <li><a href="#features" className="hover:text-neutral-300">Blog</a></li>
            </ul>
          </div>

          <div className="space-y-3">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#888888]">Legal</span>
            <ul className="space-y-2 text-[10px]">
              <li><a href="#features" className="hover:text-neutral-300">Privacy</a></li>
              <li><a href="#features" className="hover:text-neutral-300">Terms</a></li>
              <li><a href="#features" className="hover:text-neutral-300">Cookie policy</a></li>
            </ul>
          </div>

        </div>

        <div className="border-t border-[#222222] pt-8 max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] text-neutral-600 font-mono">
          <span>© 2025 README Studio · Open source on GitHub</span>
          
          {/* Decorative switch */}
          <div className="flex items-center gap-2 border border-[#222222] rounded-full p-0.5 bg-[#111111]">
            <span className="p-1 rounded-full text-white bg-[#0a0a0a]">
              <Moon className="w-3 h-3" />
            </span>
            <span className="p-1 text-neutral-600 hover:text-neutral-300 cursor-pointer">
              <Sun className="w-3 h-3" />
            </span>
          </div>
        </div>
      </footer>

    </div>
  );
}
