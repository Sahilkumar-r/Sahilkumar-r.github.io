"use client";
import { useState } from "react";
import { ExternalLink } from "lucide-react";
import Section from "./Section";
import { Github } from "./BrandIcons";
import { profile, statusLabel, tracks, type Status, type Track } from "@/data/profile";

const badge: Record<Status, string> = {
  live: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300",
  built: "bg-accent/15 text-accent",
  "in-progress": "bg-amber-500/15 text-amber-700 dark:text-amber-300",
  planned: "bg-slate-500/15 text-muted",
};

export default function Projects() {
  const [track, setTrack] = useState<Track | "All">("All");
  const list = profile.projects.filter((p) => track === "All" || p.track === track);
  const tabs: (Track | "All")[] = ["All", ...tracks];

  return (
    <Section id="projects" eyebrow="Projects" title="Project portfolio">
      <p className="-mt-4 mb-8 max-w-2xl text-muted">
        I&apos;m building these in public. Each card shows its real status; links appear only when the code or demo exists.
      </p>
      <div role="group" aria-label="Filter projects by track" className="mb-8 flex flex-wrap gap-2">
        {tabs.map((t) => (
          <button
            key={t}
            type="button"
            aria-pressed={track === t}
            onClick={() => setTrack(t)}
            className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${
              track === t ? "border-accent bg-accent text-white dark:text-slate-900" : "border-line bg-surface text-muted hover:text-fg"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {list.map((p) => (
          <article key={p.slug} className="flex flex-col rounded-2xl border border-line bg-surface p-6">
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-medium uppercase tracking-wide text-muted">{p.track}</span>
              <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${badge[p.status]}`}>{statusLabel[p.status]}</span>
            </div>
            <h3 className="mt-3 font-display text-lg font-semibold leading-snug">{p.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{p.summary}</p>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-muted">
              {p.highlights.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
            <ul className="mt-4 flex flex-wrap gap-2" aria-label="Technologies">
              {p.stack.map((s) => (
                <li key={s} className="rounded-md border border-line px-2 py-0.5 text-xs">{s}</li>
              ))}
            </ul>
            {(p.repo || p.demo) && (
              <div className="mt-5 flex flex-wrap gap-4">
                {p.repo && (
                  <a href={p.repo} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:underline">
                    <Github size={14} /> Code
                  </a>
                )}
                {p.demo && (
                  <a href={p.demo} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:underline">
                    <ExternalLink size={14} aria-hidden /> Live demo
                  </a>
                )}
              </div>
            )}
          </article>
        ))}
      </div>

      <h3 className="mt-14 font-display text-xl font-semibold">More learning repos on GitHub</h3>
      <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {profile.moreRepos.map((r) => (
          <li key={r.name}>
            <a href={`${profile.github}/${r.name}`} target="_blank" rel="noopener noreferrer" className="block h-full rounded-xl border border-line bg-surface p-5 transition-colors hover:border-accent">
              <span className="flex items-center gap-2 font-medium"><Github size={16} /> {r.name}</span>
              <span className="mt-2 block text-sm text-muted">{r.desc}</span>
            </a>
          </li>
        ))}
      </ul>
    </Section>
  );
}
