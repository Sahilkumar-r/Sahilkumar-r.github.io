import type { ReactNode } from "react";

// Small chart parts for the ragx case study. Plain HTML bars with the value printed next to each bar, so no chart is only a picture.
// Colours come from the site tokens; spacing uses the token scale.

export type Tone = "primary" | "muted" | "warn";

// Full class names, so Tailwind finds and keeps them. A class built as `bar-${tone}` is invisible to its scanner and gets removed.
const toneClass: Record<Tone, string> = { primary: "bar-primary", muted: "bar-muted", warn: "bar-warn" };

export function Chart({ title, note, source, children }: { title: string; note?: string; source: string; children: ReactNode }) {
  return (
    <figure className="surface p-6">
      <figcaption>
        <h3 className="title-1">{title}</h3>
        {note && <p className="body-6 mt-2 text-muted">{note}</p>}
      </figcaption>
      <div className="mt-6">{children}</div>
      <p className="caption-5 mt-6 text-muted">Source: {source}</p>
    </figure>
  );
}

export function Legend({ items }: { items: { name: string; tone: Tone }[] }) {
  return (
    <ul className="caption-4 mb-4 flex flex-wrap gap-4" aria-label="Legend">
      {items.map((i) => (
        <li key={i.name} className="flex items-center gap-2">
          <span className={`h-3 w-3 rounded-md ${toneClass[i.tone]}`} aria-hidden /> {i.name}
        </li>
      ))}
    </ul>
  );
}

/** One horizontal bar. value is a fraction from 0 to 1; text is what is printed (defaults to two decimals). */
export function Bar({ value, tone = "primary", text }: { value: number; tone?: Tone; text?: string }) {
  const w = `${Math.max(0, Math.min(1, value)) * 100}%`;
  return (
    <div className="flex items-center gap-3">
      <div className="h-3 flex-1 rounded-md bg-raised" aria-hidden>
        <div className={`h-3 rounded-md ${toneClass[tone]}`} style={{ width: w }} />
      </div>
      <span className="body-5 w-16 text-right tabular-nums">{text ?? value.toFixed(2)}</span>
    </div>
  );
}

/** Rows of grouped bars: each row has a label and one bar per series, in the order of the legend. */
export function BarRows({ rows }: { rows: { label: string; hint?: string; bars: { name: string; value: number; tone?: Tone; text?: string }[] }[] }) {
  return (
    <ul className="space-y-6">
      {rows.map((r) => (
        <li key={r.label} className="grid gap-2 md:grid-cols-5 md:gap-6">
          <div className="md:col-span-2">
            <p className="body-5">{r.label}</p>
            {r.hint && <p className="caption-5 text-muted">{r.hint}</p>}
          </div>
          <div className="space-y-2 md:col-span-3">
            {r.bars.map((b) => (
              <div key={b.name} aria-label={`${r.label}, ${b.name}: ${b.text ?? b.value.toFixed(2)}`}>
                <Bar value={b.value} tone={b.tone} text={b.text} />
              </div>
            ))}
          </div>
        </li>
      ))}
    </ul>
  );
}

type Point = { name: string; x: number; y: number; group: string };

/** Recall against latency on a log scale. Up and to the left is better. */
export function Scatter({ points, groups }: { points: Point[]; groups: { name: string; tone: Tone }[] }) {
  const W = 640, H = 300, L = 56, R = 16, T = 16, B = 44;
  const xmin = Math.log10(0.05), xmax = Math.log10(20);
  const ymin = 0.92, ymax = 1.005;
  const px = (v: number) => L + ((Math.log10(v) - xmin) / (xmax - xmin)) * (W - L - R);
  const py = (v: number) => T + (1 - (Math.max(ymin, v) - ymin) / (ymax - ymin)) * (H - T - B);
  const tone = (g: string) => groups.find((x) => x.name === g)?.tone ?? "muted";
  const fill: Record<Tone, string> = { primary: "rgb(var(--link))", muted: "rgb(var(--muted))", warn: "#d97706" };
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" role="img" aria-label="Scatter chart of recall at 10 against median search time in milliseconds for flat, HNSW and IVF indexes">
      {[0.92, 0.95, 0.98, 1.0].map((v) => (
        <g key={v}>
          <line x1={L} x2={W - R} y1={py(v)} y2={py(v)} stroke="rgb(var(--line))" />
          <text x={L - 8} y={py(v) + 4} textAnchor="end" className="fill-muted text-xs">{v.toFixed(2)}</text>
        </g>
      ))}
      {[0.1, 1, 10].map((v) => (
        <g key={v}>
          <line x1={px(v)} x2={px(v)} y1={T} y2={H - B} stroke="rgb(var(--line))" />
          <text x={px(v)} y={H - B + 20} textAnchor="middle" className="fill-muted text-xs">{v} ms</text>
        </g>
      ))}
      <text x={(L + W - R) / 2} y={H - 4} textAnchor="middle" className="fill-muted text-xs">Median search time, log scale</text>
      <text x={14} y={(T + H - B) / 2} textAnchor="middle" transform={`rotate(-90 14 ${(T + H - B) / 2})`} className="fill-muted text-xs">Recall at 10</text>
      {points.map((p) => (
        <circle key={p.name} cx={px(p.x)} cy={py(p.y)} r={5} fill={fill[tone(p.group)]} fillOpacity={0.85}>
          <title>{`${p.name}: recall ${p.y.toFixed(3)}, ${p.x} ms`}</title>
        </circle>
      ))}
    </svg>
  );
}
