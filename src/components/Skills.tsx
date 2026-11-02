import Section from "./Section";
import { profile } from "@/data/profile";

function Tier({ title, note, groups, muted }: { title: string; note: string; groups: { group: string; items: string[] }[]; muted?: boolean }) {
  return (
    <div>
      <h3 className="font-display text-xl font-semibold">{title}</h3>
      <p className="mt-1 text-sm text-muted">{note}</p>
      <div className="mt-5 grid gap-5 md:grid-cols-2">
        {groups.map((g) => (
          <div key={g.group} className="rounded-2xl border border-line bg-surface p-6">
            <h4 className="font-medium">{g.group}</h4>
            <ul className="mt-4 flex flex-wrap gap-2">
              {g.items.map((i) => (
                <li key={i} className={`rounded-lg px-3 py-1 text-sm ${muted ? "border border-dashed border-line text-muted" : "bg-accent/10"}`}>{i}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Skills() {
  return (
    <Section id="skills" eyebrow="Skills" title="Skills & expertise">
      <div className="space-y-12">
        <Tier title="Working knowledge" note="Used in coursework, teaching and public repositories." groups={profile.skills.working} />
        <Tier title="Learning now" note="Actively studying and applying in current projects." groups={profile.skills.learning} muted />
      </div>
    </Section>
  );
}
