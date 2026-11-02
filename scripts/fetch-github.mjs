// Snapshot public GitHub data into src/data/github.json (run: npm run fetch:github).
// Requires the GitHub CLI to be logged in. The site itself makes no API calls at runtime.
import { execFileSync } from "node:child_process";
import { writeFileSync, mkdirSync } from "node:fs";

const USER = "Sahilkumar-r";
const gh = (...args) => JSON.parse(execFileSync("gh", args, { encoding: "utf8", maxBuffer: 64 * 1024 * 1024 }));

const profile = gh("api", `users/${USER}`);
const repos = gh("api", `users/${USER}/repos?per_page=100&sort=pushed`).filter((r) => !r.fork);

const langBytes = {};
for (const r of repos) {
  if (r.name.toLowerCase().endsWith(".github.io")) continue; // exclude this site's own repo
  const l = gh("api", `repos/${USER}/${r.name}/languages`);
  for (const [k, v] of Object.entries(l)) langBytes[k] = (langBytes[k] || 0) + v;
}

const q = `query{user(login:"${USER}"){contributionsCollection{totalCommitContributions contributionCalendar{totalContributions weeks{contributionDays{date contributionCount weekday}}}}}}`;
const cal = gh("api", "graphql", "-f", `query=${q}`).data.user.contributionsCollection;
const weeks = cal.contributionCalendar.weeks.map((w) => w.contributionDays.map((d) => ({ date: d.date, count: d.contributionCount, weekday: d.weekday })));

const out = {
  fetchedAt: new Date().toISOString(),
  publicRepos: profile.public_repos,
  memberSince: profile.created_at,
  totalContributions: cal.contributionCalendar.totalContributions,
  totalCommits: cal.totalCommitContributions,
  languages: Object.entries(langBytes).sort((a, b) => b[1] - a[1]).map(([name, bytes]) => ({ name, bytes })),
  repos: repos.map((r) => ({ name: r.name, language: r.language, pushedAt: r.pushed_at })),
  weeks,
};
mkdirSync("src/data", { recursive: true });
writeFileSync("src/data/github.json", JSON.stringify(out));
console.log(`repos=${out.publicRepos} contributions=${out.totalContributions} weeks=${weeks.length} langs=${out.languages.map((l) => l.name).join(",")}`);
