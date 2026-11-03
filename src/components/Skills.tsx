import Section from "./Section";
import Rich from "./Cite";
import { profile } from "@/data/profile";

export default function Skills() {
  return (
    <Section id="skills" title="Skills" band>
      <div className="grid gap-12 md:grid-cols-5 md:gap-16">
        <div className="md:col-span-3">
          <h3 className="heading-6">Working knowledge</h3>
          <p className="body-6 mt-1 text-muted">
            From my resume<Rich text="{1}" />, coursework and public repositories. Projects shows where each is used.
          </p>
          <dl className="mt-6 space-y-6">
            {profile.skills.working.map((g) => (
              <div key={g.group}>
                <dt className="title-3">{g.group}</dt>
                <dd className="mt-2">
                  <ul className="flex flex-wrap gap-2">
                    {g.items.map((i) => (
                      <li key={i} className="caption-4 rounded-md border border-line-strong px-2 py-1">{i}</li>
                    ))}
                  </ul>
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="md:col-span-2">
          <h3 className="heading-6">Learning now</h3>
          <p className="body-6 mt-1 text-muted">Studying and applying these in current projects.</p>
          <dl className="mt-6 space-y-4">
            {profile.skills.learning.map((g) => (
              <div key={g.group}>
                <dt className="title-3">{g.group}</dt>
                <dd className="body-6 mt-1 text-muted">{g.items.join(", ")}.</dd>
              </div>
            ))}
          </dl>
          <h3 className="heading-6 mt-12">Next</h3>
          <ul className="body-6 mt-2 space-y-2 text-muted">
            {profile.learningNow.map((l) => (
              <li key={l.title}>
                <span className="text-fg">{l.title}.</span> {l.detail}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
