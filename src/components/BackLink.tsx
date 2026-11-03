"use client";
import { useEffect, useState } from "react";

/** Shown on a source only while the visitor has arrived at it from a citation marker. */
export default function BackLink({ n }: { n: number }) {
  const [active, setActive] = useState(false);
  useEffect(() => {
    const on = () => setActive(window.location.hash === `#src-${n}`);
    on();
    window.addEventListener("hashchange", on);
    return () => window.removeEventListener("hashchange", on);
  }, [n]);
  if (!active) return null;
  return (
    <button type="button" className="link caption-1 ml-4" onClick={() => window.history.back()}>
      Back to the text
    </button>
  );
}
