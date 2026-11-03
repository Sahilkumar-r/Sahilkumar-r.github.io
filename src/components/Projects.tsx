"use client";
import { useState } from "react";
import { ArrowUpRight, Circle, GithubLogo } from "@phosphor-icons/react";
import Section from "./Section";
import {
  profile,
  statusFilters,
  statusLabel,
  statusOfFilter,
  tracks,
  type Project,
  type Status,
  type StatusFilter,
  type Track,
} from "@/data/profile";

const dot: Record<Status, string> = {
  done: "text-emerald-500",
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

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`motion-base button-sm rounded-lg border px-3 py-2 active:scale-[0.98] ${
        active ? "border-fg bg-fg text-bg" : "border-line-strong text-muted hover:text-fg"
      }`}
    >
      {children}
    </button>
  );
}

function ProjectCard({ p }: { p: Project }) {
  const planned = p.status === "planned";
  return (
    <article className="surface flex h-full flex-col p-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <StatusBadge s={p.status} />
        <span className="caption-4 text-muted">{p.track}</span>
      </div>
      <h4 className="title-1 mt-3">{p.title}</h4>

      <dl className="mt-4 space-y-4">
        <div>
          <dt className="body-5">The problem</dt>
          <dd className="body-6 mt-1 text-muted">{p.problem}</dd>
        </div>
        <div>
          <dt className="body-5">{planned ? "What I will build" : "What I built"}</dt>
          <dd className="body-6 mt-1 text-muted">{p.built}</dd>
        </div>
        <div>
          <dt className="body-5">{planned ? "How I will measure it" : "Result"}</dt>
          <dd className="mt-1">
            {planned ? (
              <p className="body-6 text-muted">{p.measure}</p>
            ) : (
              <ul className="body-6 list-disc space-y-1 pl-6 text-muted marker:text-line-strong">
                {p.results?.map((r) => (
                  <li key={r}>{r}</li>
                ))}
              </ul>
            )}
          </dd>
        </div>
      </dl>

      <ul className="mt-4 flex flex-wrap gap-2" aria-label="Technologies">
        {p.stack.map((t) => (
          <li key={t} className="caption-5 rounded-md border border-line-strong px-2 py-1">{t}</li>
        ))}
      </ul>

      {(p.repo || p.demo) && (
        <div className="mt-auto flex flex-wrap gap-4 pt-6">
          {p.repo && (
            <a href={p.repo} target="_blank" rel="noopener noreferrer" className="link body-5 inline-flex items-center gap-2">
              <GithubLogo size={16} aria-hidden /> View code
            </a>
          )}
          {p.demo && (
            <a href={p.demo} target="_blank" rel="noopener noreferrer" className="link body-5 inline-flex items-center gap-2">
              <ArrowUpRight size={16} aria-hidden /> Live demo
            </a>
          )}
        </div>
      )}
    </article>
  );
}

export default function Projects() {
  const [status, setStatus] = useState<StatusFilter>("All");
  const [track, setTrack] = useState<Track | "All">("All");
  const shown = profile.projects.filter(
    (p) => (status === "All" || p.status === statusOfFilter[status]) && (track === "All" || p.track === track),
  );
  const count = (s: Status) => profile.projects.filter((p) => p.status === s).length;

  return (
    <Section
      id="projects"
      title="Projects"
      intro={`${count("done")} done, ${count("in-progress")} in progress and ${count("planned")} planned. Each one states the problem, what I built and the measured result. Planned projects say how they will be measured.`}
    >
      <div className="space-y-4">
        <div role="group" aria-label="Filter projects by status" className="flex flex-wrap gap-2">
          {statusFilters.map((s) => (
            <Chip key={s} active={status === s} onClick={() => setStatus(s)}>
              {s}
            </Chip>
          ))}
        </div>
        <div role="group" aria-label="Filter projects by track" className="flex flex-wrap gap-2">
          {(["All", ...tracks] as (Track | "All")[]).map((t) => (
            <Chip key={t} active={track === t} onClick={() => setTrack(t)}>
              {t}
            </Chip>
          ))}
        </div>
      </div>

      {shown.length === 0 ? (
        <p className="surface body-3 mt-8 p-6 text-muted">No projects match these filters. Choose All to see everything.</p>
      ) : (
        <ul className="mt-8 grid gap-4 md:grid-cols-2">
          {shown.map((p) => (
            <li key={p.slug}>
              <ProjectCard p={p} />
            </li>
          ))}
        </ul>
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
