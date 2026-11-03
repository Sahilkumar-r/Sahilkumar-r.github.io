import Section from "./Section";
import { profile } from "@/data/profile";

export default function Skills() {
  return (
    <Section id="skills" title="Skills" band>
      <dl className="grid gap-x-16 gap-y-8 md:grid-cols-2">
        {profile.skills.map((g) => (
          <div key={g.group}>
            <dt className="title-2">{g.group}</dt>
            <dd className="body-3 mt-2 text-muted">{g.items.join(", ")}</dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
