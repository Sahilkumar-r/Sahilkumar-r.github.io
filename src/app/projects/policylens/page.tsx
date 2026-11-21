import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, GithubLogo } from "@phosphor-icons/react/dist/ssr";
import Footer from "@/components/Footer";
import { readPost } from "@/components/Prose";
import { profile } from "@/data/profile";

// The post lives in content/policylens.md (copied from the PolicyLens repo, docs/blog_post.md).
const post = readPost("policylens.md");

export const metadata: Metadata = {
  title: "PolicyLens case study | Sahil Kumar",
  description:
    "What broke when I built a document assistant over scans, tables and Urdu that must not leak restricted files, with the measurements behind each fix.",
  alternates: { canonical: "/projects/policylens/" },
};

export default function PolicyLensCaseStudy() {
  return (
    <>
      <main id="main" className="mx-auto max-w-[720px] px-4 py-24 md:px-6">
        <Link href="/" className="link body-5 inline-flex items-center gap-2">
          <ArrowLeft size={16} aria-hidden /> Back to the portfolio
        </Link>
        <h1 className="heading-2 mt-8">{post.title}</h1>
        <p className="caption-2 mt-2 text-muted">Case study for PolicyLens. Every number comes from result files in the repository.</p>
        <div className="body-3 mt-8 space-y-6 text-muted">{post.body}</div>
        <a href={`${profile.github}/policylens`} target="_blank" rel="noopener noreferrer" className="link body-5 mt-12 inline-flex items-center gap-2">
          <GithubLogo size={16} aria-hidden /> View the code
        </a>
      </main>
      <Footer />
    </>
  );
}
