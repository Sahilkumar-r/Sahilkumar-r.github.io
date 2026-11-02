import Section from "./Section";
import { profile } from "@/data/profile";

export default function About() {
  return (
    <Section id="about" eyebrow="About" title="Recent graduate, building in public">
      <div className="grid gap-10 md:grid-cols-[1.6fr_1fr]">
        <div className="space-y-4 text-lg leading-relaxed text-muted">
          {profile.about.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
        <dl className="grid grid-cols-3 gap-3 md:grid-cols-1">
          {profile.stats.map((s) => (
            <div key={s.label} className="card p-5">
              <dd className="font-display text-3xl font-bold text-accent">{s.value}</dd>
              <dt className="mt-1 text-sm text-muted">{s.label}</dt>
            </div>
          ))}
        </dl>
      </div>
    </Section>
  );
}
