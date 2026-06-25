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
  title: "README Studio — Visual Drag & Drop README Builder",
  description:
    "Build beautiful, interactive GitHub README files visually using a block-based drag-and-drop editor. No markdown writing required.",
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
  authors: [{ name: "README Studio" }],
  creator: "README Studio",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: APP_URL,
    title: "README Studio — Visual Drag & Drop README Builder",
    description:
      "Build beautiful, interactive GitHub README files visually using a block-based editor. Powered by drag-and-drop.",
    siteName: "README Studio",
  },
  twitter: {
    card: "summary_large_image",
    title: "README Studio — Visual Drag & Drop README Builder",
    description:
      "Build beautiful, interactive GitHub README files visually using a block-based editor.",
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
