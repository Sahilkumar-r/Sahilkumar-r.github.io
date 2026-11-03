"use client";
import { useEffect, useMemo, useState } from "react";
import { ArrowUpRight, Circle } from "@phosphor-icons/react";
import Section from "./Section";
import data from "@/data/github.json";
import { profile } from "@/data/profile";
import { useGithubLive } from "@/lib/useGithubLive";

type Day = { date: string; count: number; weekday: number };
type Repo = { name: string; language: string | null; pushedAt: string };

const fmt = (d: string, o: Intl.DateTimeFormatOptions = { month: "short", day: "numeric", year: "numeric" }) =>
  new Date(d.slice(0, 10) + "T00:00:00Z").toLocaleDateString("en-US", { ...o, timeZone: "UTC" });

function level(count: number, cuts: number[]) {
  if (count === 0) return 0;
  if (count <= cuts[0]) return 1;
  if (count <= cuts[1]) return 2;
  if (count <= cuts[2]) return 3;
  return 4;
}

function timeAgo(iso: string, now: number) {
  const s = Math.max(0, Math.round((now - new Date(iso).getTime()) / 1000));
  if (s < 90) return "just now";
  if (s < 3600) return `${Math.round(s / 60)} minutes ago`;
  if (s < 86400) return `${Math.round(s / 3600)} hours ago`;
  return `${Math.round(s / 86400)} days ago`;
}

const isSite = (name: string) => name.toLowerCase().endsWith(".github.io");

export default function GithubActivity() {
  const [tip, setTip] = useState<{ x: number; y: number; day: Day } | null>(null);
  const live = useGithubLive(profile.githubUser, data.fetchedAt);

  const snapshotLast = useMemo(() => (data.weeks as Day[][]).flat().at(-1)!.date, []);
  // "Today" is only known in the browser; start from the snapshot so the first paint matches the built page.
  const [today, setToday] = useState(snapshotLast);
  const [now, setNow] = useState(() => new Date(data.fetchedAt).getTime());
  useEffect(() => {
    setToday(new Date().toISOString().slice(0, 10));
    setNow(Date.now());
  }, [live.checkedAt]);

  const m = useMemo(() => {
    // Day counts: the saved snapshot, plus commits GitHub reports after the snapshot was taken.
    const map = new Map<string, number>();
    (data.weeks as Day[][]).flat().forEach((d) => map.set(d.date, d.count));
    const since = new Date(data.fetchedAt).getTime();
    live.commits.forEach((c) => {
      if (new Date(c.date).getTime() > since) map.set(c.date.slice(0, 10), (map.get(c.date.slice(0, 10)) ?? 0) + 1);
    });
    const keys = [...map.keys()].sort();
    const firstActive = keys.find((k) => (map.get(k) ?? 0) > 0) ?? keys[0];
    const last = keys[keys.length - 1] > today ? keys[keys.length - 1] : today;

    const start = new Date(firstActive + "T00:00:00Z");
    start.setUTCDate(start.getUTCDate() - start.getUTCDay()); // back to Sunday
    const end = new Date(last + "T00:00:00Z");
    const weeks: Day[][] = [];
    for (const d = new Date(start); d <= end; d.setUTCDate(d.getUTCDate() + 1)) {
      const key = d.toISOString().slice(0, 10);
      if (d.getUTCDay() === 0) weeks.push([]);
      weeks[weeks.length - 1].push({ date: key, count: map.get(key) ?? 0, weekday: d.getUTCDay() });
    }

    const flat = weeks.flat();
    const nz = flat.map((d) => d.count).filter((c) => c > 0).sort((a, b) => a - b);
    const q = (p: number) => nz[Math.min(nz.length - 1, Math.floor(p * nz.length))] ?? 1;
    const cuts = [q(0.25), q(0.5), q(0.75)];
    let run = 0, longest = 0;
    for (const d of flat) { run = d.count > 0 ? run + 1 : 0; longest = Math.max(longest, run); }
    const best = flat.reduce((b, d) => (d.count > b.count ? d : b), flat[0]);
    const mid = (w: Day[]) => w[Math.min(3, w.length - 1)].date;
    const months = weeks.map((w, i) => (i === 0 || mid(weeks[i - 1]).slice(0, 7) !== mid(w).slice(0, 7) ? fmt(mid(w), { month: "short" }) : ""));
    const weekly = weeks.map((w) => ({ start: w[0].date, total: w.reduce((a, d) => a + d.count, 0) }));
    return { weeks, cuts, active: nz.length, best, longest, months, weekly, total: weekly.reduce((a, w) => a + w.total, 0) };
  }, [live.commits, today]);

  // Repositories: live from GitHub when available, otherwise the saved snapshot.
  const repos: Repo[] = useMemo(
    () =>
      live.repos
        ? live.repos.map((r) => ({ name: r.name, language: r.language, pushedAt: r.pushed_at }))
        : (data.repos as Repo[]),
    [live.repos],
  );
  const repoCount = live.repos ? live.repos.length : data.publicRepos;
  const langs = useMemo(() => {
    const c: Record<string, number> = {};
    repos.filter((r) => !isSite(r.name) && r.language).forEach((r) => (c[r.language as string] = (c[r.language as string] || 0) + 1));
    return Object.entries(c).sort((a, b) => b[1] - a[1]).map(([name, n]) => ({ name, n }));
  }, [repos]);
  const recent = useMemo(() => [...repos].filter((r) => !isSite(r.name)).sort((a, b) => (a.pushedAt < b.pushedAt ? 1 : -1)).slice(0, 6), [repos]);

  const statusText =
    live.status === "live" && live.checkedAt
      ? `Live from GitHub. Checked at ${live.checkedAt.toLocaleTimeString()}, and again every minute while this page is open.`
      : live.status === "stale"
        ? `GitHub could not be reached just now. Showing the last data I have (${live.repos ? "from this visit" : `saved ${fmt(data.fetchedAt)}`}). Retrying every minute.`
        : "Checking GitHub for the latest activity.";

  return (
    <Section id="github" title="GitHub activity" band>
      <p className="body-3 max-w-[680px] text-muted">
        {repoCount} public repositories and {m.total} contributions, with {m.active} active days and a longest streak of {m.longest} days.
        My account started in {fmt(data.memberSince, { month: "long", year: "numeric" })}, so the chart begins there.
      </p>
      <p className="caption-1 mt-3 inline-flex items-center gap-2 text-muted" role="status">
        <Circle
          size={8}
          weight="fill"
          className={live.status === "live" ? "pulse-dot text-emerald-500" : live.status === "stale" ? "text-amber-500" : "text-muted"}
          aria-hidden
        />
        {statusText}
      </p>

      <div className="surface relative mt-8 min-w-0 p-6">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          <div className="min-w-0">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="title-2">{m.total} contributions since I started</h3>
              <p className="caption-2 text-muted">Busiest day: {m.best.count} on {fmt(m.best.date, { month: "short", day: "numeric" })}</p>
            </div>

            <div className="mt-6 overflow-x-auto pb-2">
              <div className="inline-block min-w-full" onPointerLeave={() => setTip(null)}>
                <div className="caption-5 flex gap-1 pl-10 text-muted" aria-hidden>
                  {m.months.map((label, i) => (
                    <span key={i} className="w-8 shrink-0 overflow-visible whitespace-nowrap">{label}</span>
                  ))}
                </div>
                <div
                  className="mt-1 flex gap-1"
                  role="img"
                  aria-label={`Contribution heatmap: ${m.total} contributions over ${m.weeks.length} weeks, ${m.active} active days`}
                >
                  <div className="caption-5 grid w-8 grid-rows-7 gap-1 text-muted" aria-hidden>
                    {["", "Mon", "", "Wed", "", "Fri", ""].map((d, i) => (
                      <span key={i} className="h-8 leading-8">{d}</span>
                    ))}
                  </div>
                  {m.weeks.map((w, wi) => (
                    <div key={wi} className="grid grid-rows-7 gap-1">
                      {Array.from({ length: 7 }, (_, r) => {
                        const d = w.find((x) => x.weekday === r);
                        if (!d) return <span key={r} className="h-8 w-8" />;
                        return (
                          <span
                            key={r}
                            className="motion-base h-8 w-8 rounded-md hover:scale-110"
                            style={{ background: `var(--h${level(d.count, m.cuts)})` }}
                            onPointerEnter={(e) => {
                              const box = e.currentTarget.closest(".surface")!.getBoundingClientRect();
                              const cell = e.currentTarget.getBoundingClientRect();
                              setTip({ x: cell.left - box.left + 16, y: cell.top - box.top, day: d });
                            }}
                          />
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="caption-5 mt-3 flex items-center gap-2 text-muted" aria-hidden>
              Less
              {[0, 1, 2, 3, 4].map((l) => (
                <span key={l} className="h-3 w-3 rounded-sm" style={{ background: `var(--h${l})` }} />
              ))}
              More
            </div>
          </div>

          <div>
            <h3 className="title-2">Repositories by main language</h3>
            <dl className="mt-6 space-y-3">
              {langs.map((l) => (
                <div key={l.name} className="flex items-baseline justify-between gap-4">
                  <dt className="body-3">{l.name}</dt>
                  <dd className="heading-6">{l.n}</dd>
                </div>
              ))}
            </dl>
            <p className="caption-2 mt-6 text-muted">Each public repository is counted once by its main language. This website&apos;s own repository is excluded.</p>
          </div>
        </div>

        {tip && (
          <div
            role="status"
            className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-full rounded-lg border border-line-strong bg-bg px-3 py-2"
            style={{ left: tip.x, top: tip.y - 8 }}
          >
            <p className="body-4">{tip.day.count} contribution{tip.day.count === 1 ? "" : "s"}</p>
            <p className="caption-2 text-muted">{fmt(tip.day.date)}</p>
          </div>
        )}

        <details className="mt-6">
          <summary className="caption-1 cursor-pointer text-muted hover:text-fg">View the heatmap as a table (weekly totals)</summary>
          <table className="body-6 mt-3 w-full max-w-sm text-left">
            <thead><tr className="text-muted"><th className="py-1 pr-4 font-medium">Week of</th><th className="py-1 font-medium">Contributions</th></tr></thead>
            <tbody>
              {m.weekly.map((w) => (
                <tr key={w.start} className="border-t border-line"><td className="py-1 pr-4">{fmt(w.start)}</td><td className="py-1">{w.total}</td></tr>
              ))}
            </tbody>
          </table>
        </details>
      </div>

      {live.commits.length > 0 && (
        <>
          <h3 className="heading-6 mt-12">Latest commits</h3>
          <ul className="surface mt-6 divide-y divide-line">
            {live.commits.slice(0, 5).map((c) => (
              <li key={c.url}>
                <a href={c.url} target="_blank" rel="noopener noreferrer" className="motion-base grid gap-1 p-4 hover:bg-raised md:grid-cols-5 md:gap-6">
                  <span className="body-5 md:col-span-3">{c.message}</span>
                  <span className="caption-2 text-muted md:col-span-2">{c.repo}, {timeAgo(c.date, now)}</span>
                </a>
              </li>
            ))}
          </ul>
        </>
      )}

      <h3 className="heading-6 mt-12">Recently updated</h3>
      <ul className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {recent.map((r) => (
          <li key={r.name}>
            <a href={`${profile.github}/${r.name}`} target="_blank" rel="noopener noreferrer" className="surface surface-hover group flex h-full items-center justify-between gap-4 p-4">
              <span>
                <span className="body-5 block">{r.name}</span>
                <span className="caption-2 block text-muted">{r.language ?? "No language"}, updated {fmt(r.pushedAt, { month: "short", day: "numeric" })}</span>
              </span>
              <ArrowUpRight size={20} className="motion-base shrink-0 text-muted group-hover:text-link" aria-hidden />
            </a>
          </li>
        ))}
      </ul>
    </Section>
  );
}
