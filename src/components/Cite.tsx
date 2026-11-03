"use client";
import { useId, useRef, useState } from "react";
import { sources } from "@/data/profile";

/** Superscript marker that links a claim to its source. Hover or focus previews the source. */
export function Cite({ n }: { n: number }) {
  const s = sources.find((x) => x.n === n);
  const id = useId();
  const ref = useRef<HTMLSpanElement>(null);
  const [shift, setShift] = useState(0);

  // Keep the preview (max 320px wide) inside the viewport (16px gutters), however close the marker is to an edge.
  const place = () => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const half = 160 + 16;
    const cx = r.left + r.width / 2;
    setShift(Math.min(Math.max(cx, half), window.innerWidth - half) - cx);
  };

  return (
    <span ref={ref} className="cite-wrap" onPointerEnter={place} onFocus={place}>
      <a className="cite" href={`#src-${n}`} aria-label={`Source ${n}: ${s?.title ?? ""}`} aria-describedby={id}>
        [{n}]
      </a>
      <span id={id} role="tooltip" className="cite-tip" style={{ transform: `translateX(calc(-50% + ${shift}px))` }}>
        <span className="body-4 block">{s?.title}</span>
        <span className="caption-2 block text-muted">{s?.detail}</span>
      </span>
    </span>
  );
}

/** Renders text where "{n}" becomes a citation marker. */
export default function Rich({ text }: { text: string }) {
  return (
    <>
      {text.split(/(\{\d+\})/g).map((part, i) => {
        const m = part.match(/^\{(\d+)\}$/);
        return m ? <Cite key={i} n={Number(m[1])} /> : <span key={i}>{part}</span>;
      })}
    </>
  );
}
