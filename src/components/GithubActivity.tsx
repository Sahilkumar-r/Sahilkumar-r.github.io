"use client";
import { useMemo, useState } from "react";
import { ArrowUpRight, GitCommitHorizontal, FolderGit2, CalendarDays, Flame } from "lucide-react";
import Section from "./Section";
import data from "@/data/github.json";
import { profile } from "@/data/profile";

type Day = { date: string; count: number; weekday: number };

const fmtDate = (d: string, opts: Intl.DateTimeFormatOptions = { month: "short", day: "numeric", year: "numeric" }) =>
  new Date(d + "T00:00:00Z").toLocaleDateString("en-US", { ...opts, timeZone: "UTC" });

function level(count: number, cuts: number[]) {
  if (count === 0) return 0;
  if (count <= cuts[0]) return 1;
  if (count <= cuts[1]) return 2;
  if (count <= cuts[2]) return 3;
  return 4;
}

export default function GithubActivity() {
  const [tip, setTip] = useState<{ x: number; y: number; day: Day } | null>(null);

  const { weeks, cuts, activeDays, bestDay, longest, monthLabels, weeklyTotals } = useMemo(() => {
    const all = data.weeks as Day[][];
    // Trim leading weeks with no activity so the chart starts when the account became active.
    const first = all.findIndex((w) => w.some((d) => d.count > 0));
    const weeks = all.slice(Math.max(first, 0));
    const flat = weeks.flat();
    const nz = flat.map((d) => d.count).filter((c) => c > 0).sort((a, b) => a - b);
    const q = (p: number) => nz[Math.min(nz.length - 1, Math.floor(p * nz.length))] ?? 1;
    const cuts = [q(0.25), q(0.5), q(0.75)];
    let run = 0, longest = 0;
    for (const d of flat) { run = d.count > 0 ? run + 1 : 0; longest = Math.max(longest, run); }
    const bestDay = flat.reduce((b, d) => (d.count > b.count ? d : b), flat[0]);
    const mid = (w: Day[]) => w[Math.min(3, w.length - 1)].date; // midweek date; last week may be partial
    const monthLabels = weeks.map((w, i) => {
      const m = mid(w).slice(0, 7);
      return i === 0 || mid(weeks[i - 1]).slice(0, 7) !== m ? fmtDate(mid(w), { month: "short" }) : "";
    });
    const weeklyTotals = weeks.map((w) => ({ start: w[0].date, total: w.reduce((a, d) => a + d.count, 0) }));
    return { weeks, cuts, activeDays: nz.length, bestDay, longest, monthLabels, weeklyTotals };
  }, []);

  const periodTotal = weeklyTotals.reduce((a, w) => a + w.total, 0);

  const langs = useMemo(() => {
    const own = data.repos.filter((r) => !r.name.toLowerCase().endsWith(".github.io") && r.language);
    const counts: Record<string, number> = {};
    own.forEach((r) => (counts[r.language as string] = (counts[r.language as string] || 0) + 1));
    return Object.entries(counts).sort((a, b) => b[1] - a[1]).map(([name, n]) => ({ name, n }));
  }, []);
  const maxLang = Math.max(...langs.map((l) => l.n));
  const recent = data.repos.filter((r) => !r.name.toLowerCase().endsWith(".github.io")).slice(0, 6);

  const tiles = [
    { icon: FolderGit2, value: data.publicRepos, label: "Public repositories" },
    { icon: GitCommitHorizontal, value: data.totalCommits, label: "Commits (last 12 months)" },
    { icon: Flame, value: longest, label: "Longest daily streak (days)" },
    { icon: CalendarDays, value: activeDays, label: "Active days" },
  ];

  return (
    <Section id="github" eyebrow="Open source" title="GitHub activity">
      <p className="-mt-4 mb-8 max-w-2xl text-muted">
        A live snapshot of my public GitHub profile (taken {fmtDate(data.fetchedAt.slice(0, 10))}). My account started in {fmtDate(data.memberSince.slice(0, 10), { month: "long", year: "numeric" })}, so the chart begins there.
      </p>

      <ul className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {tiles.map((t) => (
          <li key={t.label} className="card p-5">
            <t.icon size={20} className="text-accent2" aria-hidden />
            <p className="mt-3 font-display text-3xl font-bold">{t.value}</p>
            <p className="mt-1 text-sm text-muted">{t.label}</p>
          </li>
        ))}
      </ul>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
        {/* Contribution heatmap */}
        <div className="card-static relative min-w-0 p-6">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h3 className="font-display text-lg font-semibold">{periodTotal} contributions since I started</h3>
            <p className="text-sm text-muted">Best day: {bestDay.count} on {fmtDate(bestDay.date, { month: "short", day: "numeric" })}</p>
          </div>

          <div className="mt-5 overflow-x-auto pb-2">
            <div className="inline-block min-w-full" onPointerLeave={() => setTip(null)}>
              <div className="flex gap-1 pl-10 text-[11px] text-muted" aria-hidden>
                {monthLabels.map((m, i) => (
                  <span key={i} className="w-7 shrink-0 overflow-visible whitespace-nowrap">{m}</span>
                ))}
              </div>
              <div className="mt-1 flex gap-1" role="img" aria-label={`Contribution heatmap: ${periodTotal} contributions over ${weeks.length} weeks, ${activeDays} active days`}>
                <div className="grid w-9 grid-rows-7 gap-1 text-[11px] text-muted" aria-hidden>
                  {["", "Mon", "", "Wed", "", "Fri", ""].map((d, i) => (
                    <span key={i} className="h-7 leading-7">{d}</span>
                  ))}
                </div>
                {weeks.map((w, wi) => (
                  <div key={wi} className="grid grid-rows-7 gap-1">
                    {Array.from({ length: 7 }, (_, r) => {
                      const d = w.find((x) => x.weekday === r);
                      if (!d) return <span key={r} className="h-7 w-7" />;
                      return (
                        <span
                          key={r}
                          className="h-7 w-7 rounded-md transition-transform duration-150 hover:scale-125 hover:ring-2 hover:ring-fg/60"
                          style={{ background: `var(--h${level(d.count, cuts)})`, animation: "none" }}
                          onPointerEnter={(e) => {
                            const box = e.currentTarget.closest(".card-static")!.getBoundingClientRect();
                            const r2 = e.currentTarget.getBoundingClientRect();
                            setTip({ x: r2.left - box.left + 7, y: r2.top - box.top, day: d });
                          }}
                        />
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-3 flex items-center justify-end gap-2 text-xs text-muted" aria-hidden>
            Less
            {[0, 1, 2, 3, 4].map((l) => (
              <span key={l} className="h-3.5 w-3.5 rounded" style={{ background: `var(--h${l})` }} />
            ))}
            More
          </div>

          {tip && (
            <div
              className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-full rounded-lg border border-line bg-bg px-3 py-2 text-xs shadow-xl"
              style={{ left: tip.x, top: tip.y - 8 }}
              role="status"
            >
              <p className="text-sm font-semibold">{tip.day.count} contribution{tip.day.count === 1 ? "" : "s"}</p>
              <p className="text-muted">{fmtDate(tip.day.date)}</p>
            </div>
          )}

          <details className="mt-4 text-sm">
            <summary className="cursor-pointer text-muted hover:text-fg">View as table (weekly totals)</summary>
            <table className="mt-3 w-full max-w-sm text-left text-sm">
              <thead><tr className="text-muted"><th className="py-1 pr-4 font-medium">Week of</th><th className="py-1 font-medium">Contributions</th></tr></thead>
              <tbody>
                {weeklyTotals.map((w) => (
                  <tr key={w.start} className="border-t border-line"><td className="py-1 pr-4">{fmtDate(w.start)}</td><td className="py-1">{w.total}</td></tr>
                ))}
              </tbody>
            </table>
          </details>
        </div>

        {/* Languages */}
        <div className="card-static min-w-0 p-6">
          <h3 className="font-display text-lg font-semibold">Repositories by primary language</h3>
          <ul className="mt-5 space-y-4">
            {langs.map((l) => (
              <li key={l.name}>
                <div className="flex justify-between text-sm"><span>{l.name}</span><span className="font-semibold">{l.n}</span></div>
                <div className="mt-1.5 h-2.5 w-full rounded-full bg-line/60">
                  <div className="h-full rounded-full" style={{ width: `${(l.n / maxLang) * 100}%`, background: "var(--series-1)" }} />
                </div>
              </li>
            ))}
          </ul>
          <p className="mt-5 text-xs text-muted">Counts each public repo once by its main language (this website&apos;s own repo excluded).</p>
        </div>
      </div>

      {/* Recent repos */}
      <h3 className="mt-10 font-display text-lg font-semibold">Recently updated</h3>
      <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {recent.map((r) => (
          <li key={r.name}>
            <a href={`${profile.github}/${r.name}`} target="_blank" rel="noopener noreferrer" className="card group flex h-full items-center justify-between gap-3 p-4">
              <span>
                <span className="block font-medium">{r.name}</span>
                <span className="block text-xs text-muted">{r.language} · updated {fmtDate(r.pushedAt.slice(0, 10), { month: "short", day: "numeric" })}</span>
              </span>
              <ArrowUpRight size={18} className="shrink-0 text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" aria-hidden />
            </a>
          </li>
        ))}
      </ul>
    </Section>
  );
}
