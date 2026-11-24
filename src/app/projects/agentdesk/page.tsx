import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, GithubLogo } from "@phosphor-icons/react/dist/ssr";
import Footer from "@/components/Footer";
import { readPost } from "@/components/Prose";
import { profile } from "@/data/profile";

// The post lives in content/agentdesk.md (written for this site from the AgentDesk result files).
const post = readPost("agentdesk.md");

export const metadata: Metadata = {
  title: "AgentDesk case study | Sahil Kumar",
  description:
    "What stops a wrong or hijacked model from issuing a refund, and how I measured it: server side rules, human approval, an audit log and 60 attack cases.",
  alternates: { canonical: "/projects/agentdesk/" },
};

export default function AgentDeskCaseStudy() {
  return (
    <>
      <main id="main" className="mx-auto max-w-[720px] px-4 py-24 md:px-6">
        <Link href="/" className="link body-5 inline-flex items-center gap-2">
          <ArrowLeft size={16} aria-hidden /> Back to the portfolio
        </Link>
        <h1 className="heading-2 mt-8">{post.title}</h1>
        <p className="caption-2 mt-2 text-muted">Case study for AgentDesk. Every number comes from result files in the repository.</p>
        <figure className="mt-8">
          <video controls preload="metadata" className="h-auto w-full rounded-2xl border border-line" src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/videos/agentdesk-demo.mp4`} aria-label="AgentDesk demo, 63 seconds, silent with captions" />
          <figcaption className="caption-2 mt-2 text-muted">Silent walkthrough with captions, recorded from the running app in offline mode. Sixty three seconds.</figcaption>
        </figure>
        <div className="body-3 mt-8 space-y-6 text-muted">{post.body}</div>
        <a href={`${profile.github}/agentdesk`} target="_blank" rel="noopener noreferrer" className="link body-5 mt-12 inline-flex items-center gap-2">
          <GithubLogo size={16} aria-hidden /> View the code
        </a>
      </main>
      <Footer />
    </>
  );
}
