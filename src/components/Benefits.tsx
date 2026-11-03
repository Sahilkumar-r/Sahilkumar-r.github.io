import Section from "./Section";
import { profile } from "@/data/profile";

export default function Benefits() {
  return (
    <Section id="about" title="What you get when you hire me">
      <ul className="divide-y divide-line">
        {profile.benefits.map((b) => (
          <li key={b.title} className="grid gap-2 py-6 first:pt-0 last:pb-0 md:grid-cols-5 md:gap-16">
            <h3 className="title-1 md:col-span-2">{b.title}</h3>
            <p className="body-3 text-muted md:col-span-3">{b.text}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
