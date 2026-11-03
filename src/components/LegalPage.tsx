import Link from "next/link";
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";

export default function LegalPage({ title, updated, children }: { title: string; updated: string; children: React.ReactNode }) {
  return (
    <main id="main" className="mx-auto max-w-[680px] px-4 py-24 md:px-6">
      <Link href="/" className="link body-5 inline-flex items-center gap-2">
        <ArrowLeft size={16} aria-hidden /> Back to the portfolio
      </Link>
      <h1 className="heading-2 mt-8">{title}</h1>
      <p className="caption-2 mt-2 text-muted">Last updated {updated}</p>
      <div className="body-3 mt-8 space-y-6 text-muted">{children}</div>
    </main>
  );
}
