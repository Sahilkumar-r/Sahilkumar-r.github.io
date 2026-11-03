import Section from "./Section";
import { profile } from "@/data/profile";

export default function Education() {
  const ed = profile.education;
  return (
    <Section id="education" title="Education">
      <div className="grid gap-8 md:grid-cols-5 md:gap-16">
        <div className="md:col-span-3">
          <p className="caption-1 text-muted">{ed.dates}</p>
          <h3 className="heading-5 mt-2">{ed.degree}</h3>
          <p className="body-3 text-muted">{ed.school}</p>
          <p className="body-2 mt-2">{ed.cgpa}</p>
          <h4 className="title-3 mt-6">Key courses</h4>
          <ul className="mt-2 flex flex-wrap gap-2">
            {ed.courses.map((c) => (
              <li key={c} className="caption-4 rounded-md border border-line-strong px-2 py-1">{c}</li>
            ))}
          </ul>
        </div>
        <div className="md:col-span-2">
          <h3 className="heading-6">Achievements</h3>
          <ul className="body-3 mt-2 text-muted">
            {profile.achievements.map((a) => (
              <li key={a}>{a}</li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
