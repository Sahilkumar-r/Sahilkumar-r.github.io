import { readFileSync } from "node:fs";
import path from "node:path";

// A tiny markdown renderer for build time posts in /content: # title, ## headings, paragraphs, - lists,
// images, [links](url) and **bold**. No dependency, no client JavaScript.
const base = process.env.NEXT_PUBLIC_BASE_PATH || "";

function inline(text: string): React.ReactNode[] {
  const parts: React.ReactNode[] = [];
  const re = /\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let i = 0;
  while ((m = re.exec(text))) {
    if (m.index > last) parts.push(text.slice(last, m.index));
    if (m[1]) parts.push(<a key={i++} className="link" href={m[2]} target="_blank" rel="noopener noreferrer">{m[1]}</a>);
    else parts.push(<strong key={i++}>{m[3]}</strong>);
    last = re.lastIndex;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts;
}

export function readPost(file: string): { title: string; body: React.ReactNode } {
  const lines = readFileSync(path.join(process.cwd(), "content", file), "utf8").split(/\r?\n/);
  let title = "";
  const blocks: React.ReactNode[] = [];
  let list: string[] = [];
  const flush = () => {
    if (list.length) {
      blocks.push(
        <ul key={`ul${blocks.length}`} className="list-disc space-y-2 pl-6">
          {list.map((t, i) => <li key={i}>{inline(t)}</li>)}
        </ul>,
      );
      list = [];
    }
  };
  for (const raw of lines) {
    const line = raw.trim();
    if (line.startsWith("- ")) { list.push(line.slice(2)); continue; }
    flush();
    if (!line) continue;
    if (line.startsWith("# ")) title = line.slice(2);
    else if (line.startsWith("## ")) blocks.push(<h2 key={blocks.length} className="heading-4 pt-6 text-fg">{line.slice(3)}</h2>);
    else {
      const img = /^!\[([^\]]*)\]\(([^)]+)\)$/.exec(line);
      if (img) {
        blocks.push(
          <figure key={blocks.length} className="space-y-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`${base}${img[2]}`} alt={img[1]} width={1128} height={902} loading="lazy" className="h-auto w-full rounded-2xl border border-line" />
            <figcaption className="caption-2 text-muted">{img[1]}</figcaption>
          </figure>,
        );
      } else blocks.push(<p key={blocks.length}>{inline(line)}</p>);
    }
  }
  flush();
  return { title, body: <>{blocks}</> };
}
