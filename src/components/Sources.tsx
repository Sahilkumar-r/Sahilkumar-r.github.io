import Section from "./Section";
import BackLink from "./BackLink";
import { sources } from "@/data/profile";

const base = process.env.NEXT_PUBLIC_BASE_PATH || "";

export default function Sources() {
  return (
    <Section id="sources" title="Sources" intro="The markers in the text above point here." band>
      <ol className="space-y-2">
        {sources.map((s) => (
          <li key={s.n} id={`src-${s.n}`} className="surface motion-base scroll-mt-24 p-4 target:border-link target:bg-raised">
            <p className="title-3">
              <span className="text-link">[{s.n}]</span> {s.title}
            </p>
            <p className="body-6 mt-1 text-muted">{s.detail}</p>
            <p className="mt-2">
              <a
                href={s.href.startsWith("/") ? `${base}${s.href}` : s.href}
                {...(s.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="link caption-1 font-mono"
              >
                {s.label}
              </a>
              <BackLink n={s.n} />
            </p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
