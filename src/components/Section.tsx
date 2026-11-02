import Reveal from "./Reveal";

export default function Section({
  id,
  eyebrow,
  title,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-8 sm:py-24">
      <Reveal>
        <p className="text-sm font-semibold uppercase tracking-widest text-accent">{eyebrow}</p>
        <h2 className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
      </Reveal>
      <Reveal delay={0.1} className="mt-10">{children}</Reveal>
    </section>
  );
}
