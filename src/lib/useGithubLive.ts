"use client";
import { useCallback, useEffect, useRef, useState } from "react";

export type LiveRepo = { name: string; language: string | null; pushed_at: string; fork: boolean };
export type LiveCommit = { date: string; repo: string; message: string; url: string };
export type LiveState = {
  repos: LiveRepo[] | null;
  commits: LiveCommit[];
  checkedAt: Date | null;
  status: "loading" | "live" | "stale";
};

const API = "https://api.github.com";
const MAX_REPOS_WITH_NEW_COMMITS = 8;

async function getJson<T>(url: string, signal: AbortSignal): Promise<T> {
  // Plain GET: the browser cache and GitHub's ETags turn unchanged answers into free 304 responses.
  const r = await fetch(url, { signal, headers: { Accept: "application/vnd.github+json" } });
  if (!r.ok) throw new Error(`GitHub ${r.status}`);
  return (await r.json()) as T;
}

/**
 * Polls GitHub's public API every `intervalMs` (default one minute) while the page is visible.
 * Reads the repository list, then the commits made since `sinceIso` in repositories pushed after that time.
 * If GitHub does not answer (rate limit, network), the last good data stays on screen and status becomes "stale".
 */
export function useGithubLive(user: string, sinceIso: string, intervalMs = 60_000): LiveState {
  const [state, setState] = useState<LiveState>({ repos: null, commits: [], checkedAt: null, status: "loading" });
  const inFlight = useRef<AbortController | null>(null);

  const poll = useCallback(async () => {
    inFlight.current?.abort();
    const ctl = new AbortController();
    inFlight.current = ctl;
    try {
      const repos = (await getJson<LiveRepo[]>(`${API}/users/${user}/repos?per_page=100&sort=pushed`, ctl.signal)).filter((r) => !r.fork);
      const changed = repos.filter((r) => r.pushed_at > sinceIso).slice(0, MAX_REPOS_WITH_NEW_COMMITS);
      const lists = await Promise.all(
        changed.map(async (r) => {
          // No author= filter: GitHub's author search misses some linked commits, so check each commit's author instead.
          const url = `${API}/repos/${user}/${r.name}/commits?since=${encodeURIComponent(sinceIso)}&per_page=100`;
          const raw = await getJson<{ html_url: string; author: { login: string } | null; commit: { author: { date: string }; message: string } }[]>(url, ctl.signal);
          return raw.filter((c) => c.author?.login?.toLowerCase() === user.toLowerCase()).map((c) => ({
            date: c.commit.author.date,
            repo: r.name,
            message: c.commit.message.split("\n")[0].slice(0, 90),
            url: c.html_url,
          }));
        }),
      );
      const commits = lists.flat().sort((a, b) => (a.date < b.date ? 1 : -1));
      setState({ repos, commits, checkedAt: new Date(), status: "live" });
    } catch (e) {
      if ((e as Error).name === "AbortError") return;
      setState((s) => ({ ...s, status: "stale" }));
    }
  }, [user, sinceIso]);

  useEffect(() => {
    poll();
    const tick = () => document.visibilityState === "visible" && poll();
    const id = window.setInterval(tick, intervalMs);
    const onVisible = () => document.visibilityState === "visible" && poll();
    document.addEventListener("visibilitychange", onVisible);
    return () => {
      window.clearInterval(id);
      document.removeEventListener("visibilitychange", onVisible);
      inFlight.current?.abort();
    };
  }, [poll, intervalMs]);

  return state;
}
