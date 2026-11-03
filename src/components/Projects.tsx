"use client";
import { useState } from "react";
import { ArrowUpRight, Circle, GithubLogo } from "@phosphor-icons/react";
import Section from "./Section";
import Rich from "./Cite";
import { profile, statusLabel, tracks, type Project, type Status, type Track } from "@/data/profile";

const dot: Record<Status, string> = {
  live: "text-emerald-500",
  built: "text-link",
  "in-progress": "text-amber-500",
  planned: "text-muted",
};

function StatusBadge({ s }: { s: Status }) {
  return (
    <span className="caption-3 inline-flex items-center gap-2 whitespace-nowrap">
      <Circle size={8} weight="fill" className={dot[s]} aria-hidden /> {statusLabel[s]}
    </span>
  );
}

function Links({ p }: { p: Project }) {
  if (!p.repo && !p.demo) return null;
  return (
    <div className="mt-6 flex flex-wrap gap-4">
      {p.repo && (
        <a href={p.repo} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
          <GithubLogo size={20} aria-hidden /> View code
        </a>
      )}
      {p.demo && (
        <a href={p.demo} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
          Open live demo <ArrowUpRight size={20} aria-hidden />
        </a>
      )}
    </div>
  );
}

export default function Projects() {
  const [track, setTrack] = useState<Track | "All">("All");
  const [featured, ...rest] = profile.projects;
  const shown = rest.filter((p) => track === "All" || p.track === track);
  const real = shown.filter((p) => p.status !== "planned");
  const planned = shown.filter((p) => p.status === "planned");
  const tabs: (Track | "All")[] = ["All", ...tracks];

  return (
    <Section
      id="projects"
      title="Projects"
      intro="Work with code comes first. Planned projects are listed separately, and links appear only where code or a demo exists."
    >
      <article className="surface p-6 md:p-8">
        <StatusBadge s={featured.status} />
        <h3 className="heading-5 mt-2 max-w-[680px]">{featured.title}</h3>
        <p className="body-3 mt-4 max-w-[680px] text-muted">
          <Rich text={featured.summary} />
        </p>
        <ul className="body-3 mt-6 max-w-[680px] list-disc space-y-2 pl-6 text-muted marker:text-line-strong">
          {featured.highlights.map((h) => (
            <li key={h}>
              <Rich text={h} />
            </li>
          ))}
        </ul>
        <ul className="mt-6 flex flex-wrap gap-2" aria-label="Technologies">
          {featured.stack.map((t) => (
            <li key={t} className="caption-4 rounded-md border border-line-strong px-2 py-1">{t}</li>
          ))}
        </ul>
        <Links p={featured} />
      </article>

      <div role="group" aria-label="Filter other projects by track" className="mb-8 mt-12 flex flex-wrap gap-2">
        {tabs.map((t) => (
          <button
            key={t}
            type="button"
            aria-pressed={track === t}
            onClick={() => setTrack(t)}
            className={`motion-base button-sm rounded-lg border px-3 py-2 active:scale-[0.98] ${
              track === t ? "border-fg bg-fg text-bg" : "border-line-strong text-muted hover:text-fg"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {shown.length === 0 && (
        <p className="surface body-3 p-6 text-muted">No other projects in this track yet. Pick another track, or choose All.</p>
      )}

      {real.length > 0 && (
        <>
          <h3 className="heading-6">Code on GitHub and in progress</h3>
          <ul className="mt-6 grid gap-4 md:grid-cols-2">
            {real.map((p) => (
              <li key={p.slug}>
                <article className="surface surface-hover flex h-full flex-col p-6">
                  <StatusBadge s={p.status} />
                  <h4 className="title-2 mt-2">{p.title}</h4>
                  <p className="body-6 mt-2 text-muted">{p.summary}</p>
                  <ul className="mt-4 flex flex-wrap gap-2" aria-label="Technologies">
                    {p.stack.map((t) => (
                      <li key={t} className="caption-5 rounded-md border border-line-strong px-2 py-1">{t}</li>
                    ))}
                  </ul>
                  {p.repo && (
                    <a href={p.repo} target="_blank" rel="noopener noreferrer" className="link body-5 mt-6 inline-flex items-center gap-2 self-start">
                      <GithubLogo size={16} aria-hidden /> View code
                    </a>
                  )}
                </article>
              </li>
            ))}
          </ul>
        </>
      )}

      {planned.length > 0 && (
        <>
          <h3 className="heading-6 mt-12">Planned</h3>
          <p className="body-6 mt-1 text-muted">Not started or not yet public. Listed so you can see where I am heading.</p>
          <ul className="surface mt-6 divide-y divide-line">
            {planned.map((p) => (
              <li key={p.slug} className="grid gap-1 p-4 md:grid-cols-5 md:gap-6">
                <p className="body-5 md:col-span-2">{p.title}</p>
                <p className="caption-2 text-muted md:col-span-3">
                  {p.track}. {p.summary}
                </p>
              </li>
            ))}
          </ul>
        </>
      )}

      <h3 className="heading-6 mt-16">More learning repositories</h3>
      <ul className="mt-6 grid gap-4 md:grid-cols-3">
        {profile.moreRepos.map((r) => (
          <li key={r.name}>
            <a href={`${profile.github}/${r.name}`} target="_blank" rel="noopener noreferrer" className="surface surface-hover block h-full p-4">
              <span className="body-5 flex items-center gap-2"><GithubLogo size={16} aria-hidden /> {r.name}</span>
              <span className="caption-2 mt-2 block text-muted">{r.desc}</span>
            </a>
          </li>
        ))}
      </ul>
    </Section>
  );
}
