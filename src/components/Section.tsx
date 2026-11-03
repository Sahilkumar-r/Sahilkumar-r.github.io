import Reveal from "./Reveal";

export default function Section({
  id,
  title,
  intro,
  band,
  children,
}: {
  id: string;
  title: string;
  intro?: string;
  band?: boolean;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className={band ? "bg-band" : undefined} aria-labelledby={`${id}-title`}>
      <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-24">
        <Reveal>
          <h2 id={`${id}-title`} className="heading-2 max-w-[680px]">{title}</h2>
          {intro && <p className="body-3 mt-4 max-w-[680px] text-muted">{intro}</p>}
        </Reveal>
        <Reveal delay={0.1} className="mt-10">{children}</Reveal>
      </div>
    </section>
  );
}
