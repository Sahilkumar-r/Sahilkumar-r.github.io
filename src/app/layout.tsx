import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { profile } from "@/data/profile";
import "./globals.css";

// One typeface for the whole site (Skills/SKILL.md B1). Geist Mono is used only for data such as source URLs.
const sans = Geist({ subsets: ["latin"], variable: "--font-geist", display: "swap" });
const mono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono", display: "swap" });

const description =
  "Sahil Kumar is a recent Data Science graduate and AI Engineer who builds RAG systems that cite their sources. Open to AI Engineer and Forward Deployed Engineer roles.";

export const metadata: Metadata = {
  metadataBase: new URL(profile.siteUrl),
  title: "Sahil Kumar | AI Engineer, RAG and LLM systems",
  description,
  keywords: ["AI Engineer", "Forward Deployed Engineer", "RAG", "LLM", "Python", "FastAPI", "Sahil Kumar"],
  authors: [{ name: profile.name }],
  alternates: { canonical: "/" },
  openGraph: {
    title: "Sahil Kumar | AI Engineer",
    description,
    url: profile.siteUrl,
    siteName: "Sahil Kumar",
    type: "website",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Sahil Kumar, AI Engineer" }],
  },
  twitter: { card: "summary_large_image", title: "Sahil Kumar | AI Engineer", description, images: ["/og.png"] },
  icons: { icon: "/favicon.svg" },
};

export const viewport: Viewport = { themeColor: "#000000", colorScheme: "dark light" };

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
    <html lang="en" suppressHydrationWarning className={`${sans.variable} ${mono.variable}`}>
      <body>
        <noscript>
          <style>{`[style*="opacity: 0"]{opacity:1!important;transform:none!important}.tagline-word{opacity:1!important}`}</style>
        </noscript>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
