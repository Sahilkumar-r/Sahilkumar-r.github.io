import { CaretDown } from "@phosphor-icons/react/dist/ssr";
import Section from "./Section";
import Rich from "./Cite";
import { profile } from "@/data/profile";

export default function Faq() {
  return (
    <Section id="faq" title="Questions recruiters ask">
      <div className="grid gap-8 md:grid-cols-5 md:gap-16">
        <p className="body-3 text-muted md:col-span-2">
          Short answers to what people usually ask first. Anything with a number links to its source.
        </p>
        <div className="space-y-2 md:col-span-3">
          {profile.faq.map((f) => (
            <details key={f.q} className="surface group">
              <summary className="title-2 motion-base flex cursor-pointer list-none items-center justify-between gap-4 rounded-2xl p-4 hover:bg-raised">
                {f.q}
                <CaretDown size={20} className="shrink-0 transition-transform duration-300 ease-base group-open:rotate-180" aria-hidden />
              </summary>
              <p className="body-3 px-4 pb-4 text-muted">
                <Rich text={f.a} />
              </p>
            </details>
          ))}
        </div>
      </div>
    </Section>
  );
}
