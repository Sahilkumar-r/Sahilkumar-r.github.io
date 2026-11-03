import Link from "next/link";
import { profile } from "@/data/profile";

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 md:flex-row md:items-center md:justify-between md:px-6">
        <p className="caption-2 text-muted">
          © {new Date().getFullYear()} {profile.name}. {profile.title}.
        </p>
        <nav aria-label="Footer">
          <ul className="caption-1 flex flex-wrap gap-6">
            <li><Link className="link" href="/privacy/">Privacy</Link></li>
            <li><Link className="link" href="/terms/">Terms</Link></li>
            <li><a className="link" href="#top">Back to top</a></li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}
