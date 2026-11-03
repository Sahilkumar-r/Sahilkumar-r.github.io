"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { useTheme } from "next-themes";
import { Moon, Sun } from "@phosphor-icons/react";
import { profile } from "@/data/profile";

const links = [
  { id: "projects", label: "Work" },
  { id: "github", label: "GitHub" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "faq", label: "FAQ" },
  { id: "contact", label: "Contact" },
];
const base = [0.22, 1, 0.36, 1] as const;

function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const dark = mounted && resolvedTheme === "dark";
  return (
    <button
      type="button"
      className="icon-btn"
      aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
      onClick={() => setTheme(dark ? "light" : "dark")}
    >
      {mounted ? dark ? <Sun size={20} aria-hidden /> : <Moon size={20} aria-hidden /> : <span className="h-6 w-6" aria-hidden />}
    </button>
  );
}

export default function Nav() {
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState<string>("");

  // Mark the section in view as the current page location.
  useEffect(() => {
    const els = ["top", ...links.map((l) => l.id)].map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      // The hero ("top") is not a nav item, so entering it clears the highlight.
      (entries) => entries.forEach((e) => e.isIntersecting && setCurrent(e.target.id === "top" ? "" : e.target.id)),
      { rootMargin: "-40% 0px -55% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // Escape closes the menu; page scroll is locked while it is open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  const line = (rotate: number, y: number) =>
    reduce ? {} : { rotate: open ? rotate : 0, y: open ? 0 : y };

  return (
    <header className="fixed inset-x-0 top-4 z-40 flex justify-center px-4">
      <nav
        aria-label="Primary"
        className="relative z-40 flex w-full max-w-6xl items-center justify-between gap-4 rounded-2xl border border-line-strong bg-bg/70 px-3 py-2 backdrop-blur-md lg:w-auto"
      >
        <a href="#top" className="body-4 whitespace-nowrap" onClick={() => setOpen(false)}>
          {profile.name}
        </a>
        <ul className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <li key={l.id}>
              <a
                href={`#${l.id}`}
                aria-current={current === l.id ? "location" : undefined}
                className={`motion-base button-sm rounded-lg px-3 py-2 ${current === l.id ? "bg-surface text-fg" : "text-muted hover:text-fg"}`}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            type="button"
            className="icon-btn lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen(!open)}
          >
            <span className="relative block h-6 w-6" aria-hidden>
              <motion.span className="absolute left-1 top-3 block h-0.5 w-4 rounded-md bg-fg" animate={line(45, -4)} transition={{ duration: 0.5, ease: base }} />
              <motion.span className="absolute left-1 top-3 block h-0.5 w-4 rounded-md bg-fg" animate={line(-45, 4)} transition={{ duration: 0.5, ease: base }} />
            </span>
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-30 flex flex-col justify-center bg-bg/95 px-6 backdrop-blur-xl lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: base }}
          >
            <ul className="flex flex-col gap-4">
              {links.map((l, i) => (
                <motion.li
                  key={l.id}
                  data-motion
                  initial={{ opacity: 0, y: reduce ? 0 : 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: base, delay: reduce ? 0 : Math.min(i * 0.06, 0.4) }}
                >
                  <a href={`#${l.id}`} className="heading-4 block py-2" onClick={() => setOpen(false)} aria-current={current === l.id ? "location" : undefined}>
                    {l.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
