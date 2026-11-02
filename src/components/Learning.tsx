import Section from "./Section";
import { profile } from "@/data/profile";

export default function Learning() {
  return (
    <Section id="learning" eyebrow="Now" title="Currently learning & building">
      <ul className="grid gap-5 md:grid-cols-3">
        {profile.learningNow.map((l) => (
          <li key={l.title} className="card p-6">
            <h3 className="font-display text-lg font-semibold">{l.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{l.detail}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
