import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Blocks,
  Check,
  Eye,
  FileCheck2,
  GitBranch,
  LayoutTemplate,
  Sparkles,
  Star,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import GithubIcon from "@/components/GithubIcon";
import { SiteHeader } from "@/components/landing/site-header";

const FEATURES = [
  {
    icon: Blocks,
    title: "Drag-and-drop blocks",
    description:
      "Compose your README from headers, badges, tables, and code blocks. Reorder by dragging — no markdown syntax required.",
  },
  {
    icon: Eye,
    title: "GitHub-accurate preview",
    description:
      "See exactly how your README renders on GitHub as you build, down to badge alignment and emoji shortcodes.",
  },
  {
    icon: Sparkles,
    title: "AI Autofill",
    description:
      "Point it at a repo and let AI draft your description, install steps, usage, and contributing guide in seconds.",
  },
  {
    icon: LayoutTemplate,
    title: "50+ templates",
    description:
      "Start from polished templates for libraries, apps, CLIs, and personal profiles — then make them yours.",
  },
  {
    icon: FileCheck2,
    title: "Markdown linting",
    description:
      "Catch broken links, heading gaps, and formatting issues before they ship with inline, fixable warnings.",
  },
  {
    icon: GitBranch,
    title: "One-click push",
    description:
      "Commit straight to your repository over a secure GitHub connection — no copy-paste, no local clone.",
  },
];

const STEPS = [
  {
    title: "Pick a template",
    description:
      "Choose a starting point from 50+ curated layouts, or open a blank canvas and build from scratch.",
  },
  {
    title: "Customize blocks",
    description:
      "Drag in sections, edit content inline, and watch the GitHub-accurate preview update live beside you.",
  },
  {
    title: "Push to GitHub",
    description:
      "Connect your repo and commit your new README in a single click. Iterate and re-push anytime.",
  },
];

const TEMPLATES = [
  { name: "Open Source Library", tag: "Popular", kind: "library" },
  { name: "SaaS Product", tag: "New", kind: "saas" },
  { name: "CLI Tool", tag: "Minimal", kind: "cli" },
  { name: "Profile README", tag: "Trending", kind: "profile" },
] as const;

type TemplateKind = (typeof TEMPLATES)[number]["kind"];

const PREVIEW_FRAME =
  "h-[156px] overflow-hidden rounded-xl border border-border bg-muted/30 p-4";

function Badge({ k, v, vClass }: { k: string; v: string; vClass: string }) {
  return (
    <span className="inline-flex overflow-hidden rounded-[3px] text-[7px] font-semibold leading-none">
      <span className="bg-foreground/15 px-1.5 py-1 text-foreground/80">{k}</span>
      <span className={`px-1.5 py-1 text-white ${vClass}`}>{v}</span>
    </span>
  );
}

function TemplatePreview({ kind }: { kind: TemplateKind }) {
  if (kind === "library") {
    return (
      <div className={PREVIEW_FRAME}>
        <p className="text-center text-[13px] font-semibold">⚡ acme-ui</p>
        <p className="mt-0.5 text-center text-[9px] text-muted-foreground">
          Composable React components
        </p>
        <div className="mt-2.5 flex justify-center gap-1">
          <Badge k="npm" v="2.4.0" vClass="bg-red-500/80" />
          <Badge k="build" v="passing" vClass="bg-emerald-500/80" />
          <Badge k="license" v="MIT" vClass="bg-foreground/40" />
        </div>
        <div className="mt-3 rounded-md bg-background px-2.5 py-1.5 font-mono text-[9px] text-muted-foreground">
          <span className="text-emerald-400">$</span> npm i acme-ui
        </div>
      </div>
    );
  }

  if (kind === "saas") {
    return (
      <div className={PREVIEW_FRAME}>
        <div className="flex items-center gap-1.5">
          <span className="grid size-4 place-items-center rounded bg-emerald-400 text-[8px] text-emerald-950">
            ▲
          </span>
          <p className="text-[12px] font-semibold">Nimbus</p>
        </div>
        <p className="mt-1.5 text-[9px] leading-relaxed text-muted-foreground">
          Ship background jobs without the infra — queues, crons, and retries in one API.
        </p>
        <span className="mt-2 inline-flex rounded-full bg-emerald-400 px-2.5 py-1 text-[8px] font-semibold text-emerald-950">
          Get started →
        </span>
        <div className="mt-2.5 space-y-1">
          <div className="h-1.5 w-5/6 rounded bg-muted" />
          <div className="h-1.5 w-2/3 rounded bg-muted" />
        </div>
      </div>
    );
  }

  if (kind === "cli") {
    return (
      <div className={`${PREVIEW_FRAME} border-border/80 bg-[#0d1117]`}>
        <div className="mb-2 flex gap-1">
          <span className="size-1.5 rounded-full bg-white/15" />
          <span className="size-1.5 rounded-full bg-white/15" />
          <span className="size-1.5 rounded-full bg-white/15" />
        </div>
        <div className="space-y-1 font-mono text-[9px] leading-relaxed">
          <div className="text-neutral-300">
            <span className="text-emerald-400">$</span> brew install ripgrep
          </div>
          <div className="text-neutral-500">==&gt; Pouring ripgrep 🍺</div>
          <div className="text-neutral-300">
            <span className="text-emerald-400">$</span> rg &quot;TODO&quot; src/
          </div>
          <div className="text-neutral-500">src/app.ts:42: // TODO: ship it</div>
        </div>
      </div>
    );
  }

  return (
    <div className={PREVIEW_FRAME}>
      <div className="flex items-center gap-2">
        <span className="grid size-7 place-items-center rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 text-[11px]">
          👋
        </span>
        <div>
          <p className="text-[11px] font-semibold">Hi, I&apos;m Vaishnavi</p>
          <p className="text-[8px] text-muted-foreground">Full-stack developer</p>
        </div>
      </div>
      <div className="mt-2.5 flex flex-wrap gap-1">
        {["TypeScript", "React", "Go", "Rust"].map((t) => (
          <span
            key={t}
            className="rounded bg-foreground/10 px-1.5 py-0.5 text-[7px] text-foreground/70"
          >
            {t}
          </span>
        ))}
      </div>
      <div className="mt-2.5 flex gap-1.5">
        <div className="flex-1 rounded-md border border-border bg-background px-2 py-1.5">
          <p className="text-[10px] font-semibold">1.2k</p>
          <p className="text-[7px] text-muted-foreground">stars</p>
        </div>
        <div className="flex-1 rounded-md border border-border bg-background px-2 py-1.5">
          <p className="text-[10px] font-semibold">340</p>
          <p className="text-[7px] text-muted-foreground">followers</p>
        </div>
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <div className="min-h-dvh bg-background text-foreground">
      <SiteHeader />

      <main>
        <section className="relative overflow-hidden">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_1px_1px,var(--color-border)_1px,transparent_0)] [background-size:22px_22px] opacity-40 [mask-image:radial-gradient(ellipse_70%_55%_at_50%_0%,#000_55%,transparent_100%)]"
          />
          <div className="mx-auto max-w-6xl px-4 pt-20 pb-16 sm:px-6 sm:pt-28 sm:pb-24">
            <div className="mx-auto flex max-w-2xl flex-col items-center text-center duration-700 animate-in fade-in slide-in-from-bottom-3">
              <Link
                href="https://github.com/OM2309/readme-design"
                className="group inline-flex items-center gap-2 rounded-full border border-border bg-card/50 px-3.5 py-1.5 text-xs font-medium text-muted-foreground shadow-sm transition-colors hover:text-foreground"
              >
                <Star className="size-3.5 fill-current text-emerald-400" />
                Now open source on GitHub
                <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
              </Link>

              <h1 className="mt-6 text-balance text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
                Design beautiful GitHub READMEs, visually.
              </h1>
              <p className="mt-5 max-w-xl text-pretty text-base text-muted-foreground sm:text-lg">
                Drag-and-drop blocks, a live GitHub-accurate preview, AI autofill, and
                one-click push. No more wrestling with raw markdown.
              </p>

              <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
                <Button size="lg" className="w-full rounded-full bg-emerald-400 px-6 text-emerald-950 hover:bg-emerald-400/90 sm:w-auto" render={<Link href="/studio" />}>
                  Start building — it&apos;s free
                  <ArrowRight className="size-4" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full rounded-full px-6 sm:w-auto"
                  render={<Link href="https://github.com/OM2309/readme-design" />}
                >
                  <Star className="size-4" />
                  Star on GitHub
                </Button>
              </div>
            </div>

            <div className="mx-auto mt-16 max-w-5xl duration-1000 animate-in fade-in slide-in-from-bottom-6">
              <div className="rounded-2xl border border-border bg-card/60 p-2 shadow-2xl shadow-foreground/[0.06] ring-1 ring-foreground/[0.03] backdrop-blur">
                <Image
                  src="/studio-preview.png"
                  alt="Readme Design studio — drag-and-drop block editor with live GitHub preview and block properties panel"
                  width={3024}
                  height={1890}
                  priority
                  sizes="(max-width: 1024px) 100vw, 1024px"
                  className="w-full rounded-xl border border-border"
                />
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-20 sm:px-6 sm:py-24">
          <div className="max-w-2xl">
            <p className="text-sm font-medium text-muted-foreground">Features</p>
            <h2 className="mt-2 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
              Everything you need for a README that earns the star.
            </h2>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((feature) => (
              <div
                key={feature.title}
                className="group bg-card p-7 transition-colors hover:bg-muted/40"
              >
                <span className="grid size-11 place-items-center rounded-xl border border-border bg-background text-foreground transition-transform group-hover:-translate-y-0.5">
                  <feature.icon className="size-5" />
                </span>
                <h3 className="mt-5 text-base font-semibold">{feature.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="border-y border-border bg-muted/20">
          <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
            <div className="max-w-2xl">
              <p className="text-sm font-medium text-muted-foreground">How it works</p>
              <h2 className="mt-2 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
                From blank repo to polished README in three steps.
              </h2>
            </div>

            <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
              {STEPS.map((step, i) => (
                <div key={step.title} className="relative">
                  <div className="flex items-center gap-4">
                    <span className="grid size-10 shrink-0 place-items-center rounded-full border border-border bg-background text-sm font-semibold tabular-nums text-emerald-400">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {i < STEPS.length - 1 ? (
                      <span className="hidden h-px flex-1 bg-border md:block" />
                    ) : null}
                  </div>
                  <h3 className="mt-5 text-lg font-semibold">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="templates" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-20 sm:px-6 sm:py-24">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm font-medium text-muted-foreground">Templates</p>
              <h2 className="mt-2 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
                Start from a template built for your kind of project.
              </h2>
            </div>
            <Button variant="ghost" className="self-start rounded-full text-muted-foreground hover:text-foreground sm:self-auto" render={<Link href="/studio" />}>
              Browse all
              <ArrowRight className="size-4" />
            </Button>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {TEMPLATES.map((template) => (
              <Link
                key={template.name}
                href="/studio"
                className="group rounded-2xl border border-border bg-card p-3 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-foreground/[0.06]"
              >
                <TemplatePreview kind={template.kind} />
                <div className="flex items-center justify-between px-1.5 pt-3.5 pb-1">
                  <span className="text-sm font-medium">{template.name}</span>
                  <span className="rounded-full border border-border px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
                    {template.tag}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 pb-24 sm:px-6">
          <div className="relative overflow-hidden rounded-3xl border border-border bg-card px-6 py-16 text-center shadow-sm sm:px-12 sm:py-20">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_1px_1px,var(--color-border)_1px,transparent_0)] [background-size:22px_22px] opacity-50 [mask-image:radial-gradient(ellipse_60%_80%_at_50%_50%,#000,transparent)]"
            />
            <h2 className="mx-auto max-w-2xl text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
              Ship a README people actually read.
            </h2>
            <p className="mx-auto mt-4 max-w-md text-pretty text-muted-foreground">
              Open the studio and design your first README in minutes — free, no markdown required.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button size="lg" className="w-full rounded-full bg-emerald-400 px-6 text-emerald-950 hover:bg-emerald-400/90 sm:w-auto" render={<Link href="/studio" />}>
                Open Studio
                <ArrowRight className="size-4" />
              </Button>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Check className="size-4 text-foreground" />
                No credit card required
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-4 py-10 sm:flex-row sm:px-6">
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

          <nav className="flex items-center gap-6 text-sm text-muted-foreground">
            <Link href="#features" className="transition-colors hover:text-foreground">Features</Link>
            <Link href="#templates" className="transition-colors hover:text-foreground">Templates</Link>
            <Link href="/studio" className="transition-colors hover:text-foreground">Studio</Link>
            <Link
              href="https://github.com/OM2309/readme-design"
              aria-label="GitHub"
              className="transition-colors hover:text-foreground"
            >
              <GithubIcon className="size-5" />
            </Link>
          </nav>

          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Readme Design
          </p>
        </div>
      </footer>
    </div>
  );
}
