import { Award, GraduationCap } from "lucide-react";
import Section from "./Section";
import { profile } from "@/data/profile";

export default function Education() {
  const ed = profile.education;
  return (
    <Section id="education" eyebrow="Education" title="Education & achievements">
      <div className="grid gap-6 md:grid-cols-[1.6fr_1fr]">
        <div className="rounded-2xl border border-line bg-surface p-6">
          <GraduationCap className="text-accent" aria-hidden />
          <h3 className="mt-3 font-display text-xl font-semibold">{ed.degree}</h3>
          <p className="text-muted">{ed.school} · {ed.dates}</p>
          <p className="mt-1 font-medium">{ed.cgpa}</p>
          <p className="mt-4 text-sm font-semibold">Key courses</p>
          <ul className="mt-2 flex flex-wrap gap-2">
            {ed.courses.map((c) => (
              <li key={c} className="rounded-lg bg-accent/10 px-3 py-1 text-sm">{c}</li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-line bg-surface p-6">
          <Award className="text-accent" aria-hidden />
          <h3 className="mt-3 font-display text-xl font-semibold">Achievements</h3>
          <ul className="mt-3 space-y-2 text-muted">
            {profile.achievements.map((a) => (
              <li key={a}>{a}</li>
            ))}
          </ul>
          <h4 className="mt-6 font-medium">Certifications</h4>
          <p className="mt-2 text-sm text-muted">{profile.certifications}</p>
        </div>
      </div>
    </Section>
  );
}
