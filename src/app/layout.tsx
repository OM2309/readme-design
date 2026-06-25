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

export const metadata: Metadata = {
  title: "README Studio - Visual Drag & Drop README Builder",
  description: "Build beautiful, interactive GitHub README files visually using a block-based editor.",
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
