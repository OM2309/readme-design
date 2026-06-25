import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const APP_URL = "https://readme-studio.vercel.app";

export const metadata: Metadata = {
  title: "Readme Design — Design beautiful GitHub READMEs, visually",
  description:
    "Design beautiful GitHub READMEs visually with drag-and-drop blocks, a live GitHub-accurate preview, AI autofill, and one-click push. No more wrestling with raw markdown.",
  metadataBase: new URL(APP_URL),
  keywords: [
    "README builder",
    "GitHub README generator",
    "drag and drop README",
    "markdown editor",
    "developer tools",
    "README templates",
    "GitHub profile README",
  ],
  authors: [{ name: "Readme Design" }],
  creator: "Readme Design",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: APP_URL,
    title: "Readme Design — Design beautiful GitHub READMEs, visually",
    description:
      "Drag-and-drop blocks, a live GitHub-accurate preview, AI autofill, and one-click push. No more wrestling with raw markdown.",
    siteName: "Readme Design",
  },
  twitter: {
    card: "summary_large_image",
    title: "Readme Design — Design beautiful GitHub READMEs, visually",
    description:
      "Drag-and-drop blocks, a live GitHub-accurate preview, AI autofill, and one-click push. No more wrestling with raw markdown.",
    creator: "@_whyom",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${outfit.variable} dark h-full antialiased`}
    >
      <body
        className="min-h-full bg-background text-foreground flex flex-col font-sans"
        style={{ fontFeatureSettings: '"calt", "kern", "liga", "ss03"' }}
      >
        <TooltipProvider>
          {children}
          <Toaster theme="dark" position="bottom-right" closeButton />
        </TooltipProvider>
      </body>
    </html>
  );
}
