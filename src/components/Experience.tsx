import Section from "./Section";
import Rich from "./Cite";
import { profile } from "@/data/profile";

export default function Experience() {
  const ed = profile.education;
  return (
    <Section id="experience" title="Experience and education">
      <div className="grid gap-12 md:grid-cols-5 md:gap-16">
        <div className="md:col-span-3">
          {profile.experience.map((e) => (
            <article key={e.role}>
              <p className="caption-1 text-muted">{e.dates}</p>
              <h3 className="heading-6 mt-2">{e.role}</h3>
              <p className="body-3 text-muted">{e.org}</p>
              <ul className="body-3 mt-6 list-disc space-y-2 pl-6 text-muted marker:text-line-strong">
                {e.points.map((p) => (
                  <li key={p}>
                    <Rich text={p} />
                  </li>
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

        <div className="space-y-8 md:col-span-2">
          <div>
            <h3 className="heading-6">{ed.degree}</h3>
            <p className="body-3 text-muted">{ed.school}, {ed.dates}</p>
            <p className="body-2 mt-2">
              <Rich text={ed.cgpa} />
            </p>
            <ul className="mt-4 flex flex-wrap gap-2" aria-label="Key courses">
              {ed.courses.map((c) => (
                <li key={c} className="caption-4 rounded-md border border-line-strong px-2 py-1">{c}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="heading-6">Achievements</h3>
            <ul className="body-3 mt-2 text-muted">
              {profile.achievements.map((a) => (
                <li key={a}>
                  <Rich text={a} />
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="heading-6">Certifications</h3>
            <p className="body-3 mt-2 text-muted">{profile.certifications}</p>
          </div>
        </div>
      </div>
    </Section>
  );
}
