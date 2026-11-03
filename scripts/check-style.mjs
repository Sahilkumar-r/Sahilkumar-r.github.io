// Checks the build against Skills/SKILL.md: spacing tokens, type scale, fonts, hyphens in copy.
// Run after `npm run build`:  node scripts/check-style.mjs
import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join } from "node:path";

const problems = [];
const walk = (d) => readdirSync(d).flatMap((f) => (statSync(join(d, f)).isDirectory() ? walk(join(d, f)) : [join(d, f)]));
const src = walk("src").filter((f) => /\.(tsx?|css)$/.test(f));

// 1. Spacing: only tokens 0, 0.5, 1, 2, 3, 4, 6, 8, 10, 12, 16, 20, 24 (2 to 96px).
const allowed = new Set(["0", "0.5", "1", "2", "3", "4", "6", "8", "10", "12", "16", "20", "24"]);
const spacingRe = /(?<![\w-])-?(?:p|px|py|pt|pr|pb|pl|m|mx|my|mt|mr|mb|ml|gap|gap-x|gap-y|space-x|space-y|w|h|size|top|left|right|bottom|inset|inset-x|inset-y)-(\d+(?:\.\d+)?)(?![\w.%/-])/g;
const bad = { arbitrary: /(?<![\w-])(?:p|m|gap|w|h|top|left|right|bottom)[xytblr]?-\[\d+(?:px|rem)\]/g, fontSize: /text-\[\d+(?:px|rem)\]|font-size:\s*\d/g, italic: /\bitalic\b|font-style:\s*italic/g, ultra: /font-(?:extrabold|black)|font-weight:\s*(?:800|900)/g, fonts: /\b(?:Inter|Roboto|Arial Black|Open Sans|Helvetica)\b/g };

for (const f of src) {
  const t = readFileSync(f, "utf8");
  const lines = t.split(/\r?\n/);
  lines.forEach((line, i) => {
    if (/^\s*(\/\/|\*|\/\*)/.test(line)) return;
    for (const m of line.matchAll(spacingRe)) if (!allowed.has(m[1])) problems.push(`${f}:${i + 1} spacing ${m[0]} is not a token`);
    for (const [name, re] of Object.entries(bad)) {
      for (const m of line.matchAll(re)) {
        // arbitrary max-w / aspect / grid values are layout, not spacing; only flag spacing-like ones
        if (name === "fonts" && /font-family|Arial,sans-serif/.test(line)) continue;
        if (name === "fonts" && f.endsWith("favicon.svg")) continue;
        problems.push(`${f}:${i + 1} ${name}: ${m[0]}`);
      }
    }
    if (/(?<!hero-)linear-gradient|radial-gradient|conic-gradient|bg-gradient/.test(line) && !line.includes("hero-gradient") && !/background-image: linear-gradient\(90deg, #(?:000000|ffffff)/.test(line)) problems.push(`${f}:${i + 1} background gradient: ${line.trim().slice(0, 80)}`);
  });
}

// 2. Hyphens in visible copy (built page). Repo names, URLs and model ids are identifiers, not copy.
const out = "out/index.html";
if (existsSync(out)) {
  const html = readFileSync(out, "utf8")
    .replace(/<script[\s\S]*?<\/script>/g, " ").replace(/<style[\s\S]*?<\/style>/g, " ").replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&").replace(/&#x27;/g, "'").replace(/&quot;/g, '"');
  const repoNames = JSON.parse(readFileSync("src/data/github.json", "utf8")).repos.map((r) => r.name);
  const idents = /^[\w.-]+(?:\/[\w.#-]+)+$|^(?:scikit-learn|Sahilkumar-r|rag-demo|First-Production-RAG|Simple-RAG|Langgraph-react-agent|mcp-multi-server|Langchain-Basics|Deep-Learning-Basics|fastapi-basics|Machine-Learning-From-Scratch|fastapi-streamlit-vit|imdb-lstm-seq2seq-nextword|gpt2-distillation-mistral7b|Sahil_Kumar_Resume\.pdf)$/;
  const found = new Set();
  for (const tok of html.split(/\s+/)) {
    const t = tok.replace(/^[("'`[]+|[)"'`.,;:!?\]]+$/g, "");
    if (/[A-Za-z0-9]-[A-Za-z0-9]/.test(t) && !idents.test(t) && !repoNames.includes(t)) found.add(t);
    if (t === "-") found.add("(lone hyphen)");
  }
  [...found].forEach((t) => problems.push(`copy hyphen: "${t}"`));
} else problems.push("out/index.html missing; run the build first");

if (problems.length) { console.log(problems.join("\n")); console.log(`\n${problems.length} problem(s)`); process.exit(1); }
console.log("style check passed: spacing tokens, type scale, fonts, no hyphens in copy, no background gradients");
