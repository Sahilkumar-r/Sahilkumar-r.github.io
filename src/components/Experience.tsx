import Section from "./Section";
import { profile } from "@/data/profile";

export default function Experience() {
  return (
    <Section id="experience" title="Experience">
      <div className="max-w-[880px] space-y-12">
        {profile.experience.map((e) => (
          <article key={e.role}>
            <p className="caption-1 text-muted">{e.dates}</p>
            <h3 className="heading-5 mt-2">{e.role}</h3>
            <p className="body-3 text-muted">{e.org}</p>
            <ul className="body-3 mt-6 list-disc space-y-2 pl-6 text-muted marker:text-line-strong">
              {e.points.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
            <ul className="mt-4 flex flex-wrap gap-2" aria-label="Technologies">
              {e.tags.map((t) => (
                <li key={t} className="caption-4 rounded-md border border-line-strong px-2 py-1">{t}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </Section>
  );
}
