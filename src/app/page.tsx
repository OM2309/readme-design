"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  FileText,
  ArrowRight,
  Menu,
  X,
  Moon,
  Sun
} from "lucide-react";
import GithubIcon from "@/components/GithubIcon";
import { toast } from "sonner";

export default function LandingPage() {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleStartBuilding = () => {
    toast.success("Opening studio workspace");
    router.push("/studio");
  };

  return (
    <div className="bg-[#010102] text-[#f7f8f8] font-sans antialiased min-h-screen flex flex-col selection:bg-[#5e6ad2]/30 selection:text-[#5e6ad2]">
      
      {/* 1. NAVBAR */}
      <header className="sticky top-0 z-50 h-[56px] border-b border-[#23252a] bg-[#010102]/90 backdrop-blur-md select-none">
        <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <FileText className="w-4 h-4 text-[#f7f8f8]" />
            <span className="font-semibold text-sm tracking-tight text-white">
              README Studio
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-[13px] font-medium text-[#8a8f98]">
            <a href="/studio" className="hover:text-[#f7f8f8] transition-colors">Features</a>
            <a href="/studio" className="hover:text-[#f7f8f8] transition-colors">Templates</a>
            <a href="/studio" className="hover:text-[#f7f8f8] transition-colors">Pricing</a>
            <a href="/studio" className="hover:text-[#f7f8f8] transition-colors">Changelog</a>
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <Link href="/studio" className="text-[13px] font-medium text-[#8a8f98] hover:text-[#f7f8f8] px-3 py-1.5 transition-colors">
              Sign in
            </Link>
            <button 
              onClick={handleStartBuilding}
              className="text-[13px] font-medium px-3.5 py-1.5 rounded-[8px] bg-[#5e6ad2] text-[#ffffff] hover:bg-[#828fff] transition-all flex items-center gap-1 active:scale-95 border border-[#5e69d1]"
            >
              Start free <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <button 
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="md:hidden p-1 text-[#8a8f98] hover:text-[#f7f8f8] transition-colors"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-[56px] left-0 w-full bg-[#010102] border-b border-[#23252a] px-6 py-4 flex flex-col gap-4 text-sm font-medium text-[#8a8f98] z-50">
            <Link href="/studio" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#f7f8f8] py-1">Features</Link>
            <Link href="/studio" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#f7f8f8] py-1">Templates</Link>
            <Link href="/studio" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#f7f8f8] py-1">Pricing</Link>
            <hr className="border-[#23252a]" />
            <div className="flex items-center justify-between pt-2">
              <Link href="/studio" onClick={() => setMobileMenuOpen(false)} className="text-xs hover:text-[#f7f8f8]">Sign in</Link>
              <button 
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleStartBuilding();
                }}
                className="text-xs font-semibold px-4 py-2 rounded-[8px] bg-[#5e6ad2] text-[#ffffff] hover:bg-[#828fff]"
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

        <div className="max-w-5xl mx-auto text-left space-y-8 z-10 relative">
          
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-semibold tracking-[-3.0px] text-[#f7f8f8] max-w-4xl leading-[1.05] font-sans">
            The visual editor for developer portfolios and readme files
          </h1>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#23252a]/40 pb-6">
            <p className="text-sm sm:text-base text-[#d0d6e0] max-w-2xl leading-relaxed">
              Drag blocks, customize in clicks, push directly to GitHub. Designed for open source maintainers.
            </p>
            
            <div className="flex items-center gap-2">
              <Link 
                href="/studio" 
                className="text-xs font-mono text-[#8a8f98] hover:text-[#f7f8f8] transition-colors flex items-center gap-1 bg-[#111215] border border-[#23252a] px-2.5 py-1 rounded-[6px]"
              >
                Now in Beta <span className="text-[#5e6ad2]">→</span>
              </Link>
            </div>
          </div>

          {/* Product UI Mockup (Enriched with uploaded screenshot) */}
          <div className="pt-8 w-full animate-float">
            <div className="border border-[#23252a] bg-[#111215] rounded-[16px] p-3 overflow-hidden shadow-2xl relative">
              {/* Render high-fidelity mockup image */}
              <img 
                src="/app-mockup.png" 
                alt="README Studio Visual Editor Workspace Mockup" 
                className="w-full h-auto rounded-[12px] border border-[#23252a] bg-[#010102]"
                loading="eager"
              />
            </div>
          </div>

        </div>
      </section>

      {/* 14. FOOTER */}
      <footer className="bg-[#010102] py-16 border-t border-[#23252a] select-none text-neutral-500 text-xs w-full text-left mt-auto">
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
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#8a8f98]">Product</span>
            <ul className="space-y-2 text-[10px]">
              <li><Link href="/studio" className="hover:text-neutral-300">Features</Link></li>
              <li><Link href="/studio" className="hover:text-neutral-300">Templates</Link></li>
              <li><Link href="/studio" className="hover:text-neutral-300">Pricing</Link></li>
              <li><Link href="/studio" className="hover:text-neutral-300">Changelog</Link></li>
              <li><Link href="/studio" className="hover:text-neutral-300">Roadmap</Link></li>
            </ul>
          </div>

          <div className="space-y-3">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#8a8f98]">Resources</span>
            <ul className="space-y-2 text-[10px]">
              <li><Link href="/studio" className="hover:text-neutral-300">Docs</Link></li>
              <li><a href="https://github.com" className="hover:text-neutral-300">GitHub</a></li>
              <li><a href="https://discord.com" className="hover:text-neutral-300">Discord</a></li>
              <li><a href="https://twitter.com" className="hover:text-neutral-300">Twitter/X</a></li>
              <li><Link href="/studio" className="hover:text-neutral-300">Blog</Link></li>
            </ul>
          </div>

          <div className="space-y-3">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#8a8f98]">Legal</span>
            <ul className="space-y-2 text-[10px]">
              <li><Link href="/studio" className="hover:text-neutral-300">Privacy</Link></li>
              <li><Link href="/studio" className="hover:text-neutral-300">Terms</Link></li>
              <li><Link href="/studio" className="hover:text-neutral-300">Cookie policy</Link></li>
            </ul>
          </div>

        </div>

        <div className="border-t border-[#23252a] pt-8 max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] text-neutral-600 font-mono">
          <span>© 2025 README Studio · Open source on GitHub</span>
          
          {/* Decorative switch */}
          <div className="flex items-center gap-2 border border-[#23252a] rounded-full p-0.5 bg-[#111215]">
            <span className="p-1 rounded-full text-white bg-[#010102]">
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
