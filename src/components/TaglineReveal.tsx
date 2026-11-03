"use client";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/lib/useReducedMotion";

/**
 * Large type moment (Skills/SKILL.md B11). Words start muted (30% opacity) and light up one at a time,
 * in reading order, as they cross a trigger line. Reduced motion: full colour immediately.
 */
export default function TaglineReveal({ text }: { text: string }) {
  const reduce = useReducedMotion();
  const words = text.split(" ");
  const refs = useRef<(HTMLSpanElement | null)[]>([]);
  const [lit, setLit] = useState<Record<number, number>>({}); // word index -> transition delay (ms)

  useEffect(() => {
    if (reduce) return;
    const io = new IntersectionObserver(
      (entries) => {
        const hits = entries
          .filter((e) => e.isIntersecting)
          .map((e) => Number((e.target as HTMLElement).dataset.i))
          .sort((a, b) => a - b);
        if (!hits.length) return;
        setLit((prev) => {
          const next = { ...prev };
          hits.forEach((i, j) => {
            if (!(i in next)) next[i] = Math.min(j * 60, 400); // stagger within a batch, never slower than 400ms
          });
          return next;
        });
        entries.forEach((e) => e.isIntersecting && io.unobserve(e.target));
      },
      { rootMargin: "0px 0px -35% 0px", threshold: 0 },
    );
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, [reduce]);

  return (
    <section aria-label="What I do" className="bg-band">
      <div className="mx-auto max-w-6xl px-4 py-24 md:px-6">
        <p className="heading-2 max-w-[680px]">
          {words.map((w, i) => (
            <span
              key={i}
              ref={(el) => {
                refs.current[i] = el;
              }}
              data-i={i}
              className={`tagline-word inline-block transition-opacity duration-500 ease-base ${reduce || i in lit ? "opacity-100" : "opacity-30"}`}
              style={reduce ? undefined : { transitionDelay: `${lit[i] ?? 0}ms` }}
            >
              {w}
              {i < words.length - 1 ? " " : ""}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
