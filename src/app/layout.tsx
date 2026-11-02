import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { profile } from "@/data/profile";
import "./globals.css";

const sans = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const display = Space_Grotesk({ subsets: ["latin"], variable: "--font-display", display: "swap" });

const description =
  "Sahil Kumar is a recent Data Science graduate and AI Engineer focused on RAG and LLM systems, open to Forward Deployed Engineer and AI Engineer roles.";

export const metadata: Metadata = {
  metadataBase: new URL(profile.siteUrl),
  title: "Sahil Kumar | AI Engineer – LLMs, RAG & Agentic AI",
  description,
  keywords: ["AI Engineer", "LLM", "RAG", "LangGraph", "QLoRA", "DPO", "FastAPI", "MLOps", "Sahil Kumar"],
  authors: [{ name: profile.name }],
  openGraph: {
    title: "Sahil Kumar | AI Engineer",
    description,
    url: profile.siteUrl,
    siteName: "Sahil Kumar",
    type: "website",
    images: [{ url: "/images/portrait.webp" }],
  },
  twitter: { card: "summary", title: "Sahil Kumar | AI Engineer", description },
  icons: { icon: "/favicon.svg" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.title,
  url: profile.siteUrl,
  email: `mailto:${profile.email}`,
  sameAs: [profile.linkedin, profile.github],
  alumniOf: "FAST National University of Computer and Emerging Sciences",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${sans.variable} ${display.variable}`}>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
