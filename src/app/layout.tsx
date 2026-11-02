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
  title: "Sahil Kumar | AI Engineer – RAG & LLM Systems",
  description,
  keywords: ["AI Engineer", "Forward Deployed Engineer", "LLM", "RAG", "Python", "FastAPI", "Data Science", "Sahil Kumar"],
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
        <noscript>
          <style>{`[style*="opacity: 0"]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <div className="aurora" aria-hidden>
            <div className="blob blob-1" />
            <div className="blob blob-2" />
            <div className="blob blob-3" />
          </div>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
