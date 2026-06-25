"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import GithubIcon from "@/components/GithubIcon";

const NAV_LINKS = [
  { label: "Features", href: "#features" },
  // { label: "Templates", href: "#templates" },
  { label: "GitHub", href: "https://github.com/OM2309/readme-design" },
];

export function SiteHeader() {
  const [open, setOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5 font-semibold tracking-tight">
          <span className="grid size-7 place-items-center rounded-lg bg-foreground text-background">
            <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M4 5h16" />
              <path d="M4 12h10" />
              <path d="M4 19h7" />
            </svg>
          </span>
          <span className="text-[15px]">Readme Design</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1.5">
          <Button variant="ghost" size="sm" className="hidden text-muted-foreground hover:text-foreground sm:inline-flex" render={<Link href="/studio" />}>
            Sign in
          </Button>
          <Button size="sm" className="hidden rounded-full bg-emerald-400 text-emerald-950 hover:bg-emerald-400/90 sm:inline-flex" render={<Link href="/studio" />}>
            Open Studio
          </Button>
          <Button variant="ghost" size="icon" aria-label="GitHub" className="hidden rounded-full text-muted-foreground hover:text-foreground sm:inline-flex" render={<Link href="https://github.com/OM2309/readme-design" />}>
            <GithubIcon className="size-[1.15rem]" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            aria-label="Toggle menu"
            aria-expanded={open}
            className="rounded-full md:hidden"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </Button>
        </div>
      </div>

      {open ? (
        <div className="border-t border-border/60 bg-background/95 px-4 py-3 md:hidden">
          <nav className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setOpen(false)}
                className="flex items-center gap-2 rounded-md px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                {link.label === "GitHub" ? <GithubIcon className="size-4" /> : null}
                {link.label}
              </Link>
            ))}
            <div className="mt-2 flex flex-col gap-2">
              <Button variant="outline" className="w-full rounded-full" render={<Link href="/studio" onClick={() => setOpen(false)} />}>
                Sign in
              </Button>
              <Button className="w-full rounded-full" render={<Link href="/studio" onClick={() => setOpen(false)} />}>
                Open Studio
              </Button>
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
