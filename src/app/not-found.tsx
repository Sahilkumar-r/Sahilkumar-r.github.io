import Link from "next/link";
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";

export default function NotFound() {
  return (
    <main id="main" className="mx-auto flex min-h-screen max-w-[680px] flex-col justify-center px-4 py-24 md:px-6">
      <p className="body-5 text-link">Error 404</p>
      <h1 className="heading-2 mt-2">This page does not exist.</h1>
      <p className="body-3 mt-4 text-muted">
        The address may have been mistyped, or the page has moved. Everything on this site lives on the home page.
      </p>
      <Link href="/" className="btn btn-primary mt-8 self-start">
        <ArrowLeft size={20} weight="bold" aria-hidden /> Back to the portfolio
      </Link>
    </main>
  );
}
