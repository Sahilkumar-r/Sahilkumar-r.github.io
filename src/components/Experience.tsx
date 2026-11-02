import Section from "./Section";
import { profile } from "@/data/profile";

export default function Experience() {
  return (
    <Section id="experience" eyebrow="Experience" title="Professional experience">
      <ol className="relative space-y-10 border-l border-line pl-8">
        {profile.experience.map((e) => (
          <li key={e.role} className="relative">
            <span className="absolute -left-[39px] top-2 h-3 w-3 rounded-full bg-accent ring-4 ring-bg" aria-hidden />
            <p className="text-sm font-medium text-accent">{e.dates}</p>
            <h3 className="mt-1 font-display text-xl font-semibold">{e.role}</h3>
            <p className="text-muted">{e.org}</p>
            <ul className="mt-4 list-disc space-y-2 pl-5 leading-relaxed text-muted">
              {e.points.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
            <ul className="mt-4 flex flex-wrap gap-2" aria-label="Technologies">
              {e.tags.map((t) => (
                <li key={t} className="rounded-md border border-line px-2 py-0.5 text-xs">{t}</li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </Section>
  );
}
