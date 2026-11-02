import { ArrowDown, Download, Mail } from "lucide-react";
import { Github, Linkedin } from "./BrandIcons";
import { profile } from "@/data/profile";

const base = process.env.NEXT_PUBLIC_BASE_PATH || "";

export default function Hero() {
  return (
    <section id="top" className="mx-auto grid w-full max-w-6xl items-center gap-12 px-5 pb-16 pt-14 sm:px-8 sm:pt-20 md:grid-cols-[1.4fr_1fr]">
      <div>
        <p className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1 text-sm text-muted">
          <span className="h-2 w-2 rounded-full bg-accent" aria-hidden /> {profile.availability}
        </p>
        <h1 className="mt-5 font-display text-4xl font-bold leading-tight tracking-tight sm:text-6xl">
          Hi, I&apos;m {profile.name}.
          <span className="block text-accent">{profile.headline}</span>
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">{profile.tagline}</p>
        <ul className="mt-6 flex flex-wrap gap-2" aria-label="Top skills">
          {profile.heroSkills.map((s) => (
            <li key={s} className="rounded-full border border-line bg-surface px-3 py-1 text-sm">{s}</li>
          ))}
        </ul>
        <div className="mt-8 flex flex-wrap gap-3">
          <a href="#projects" className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3 font-medium text-white transition-opacity hover:opacity-90 dark:text-slate-900">
            <ArrowDown size={18} aria-hidden /> View Projects
          </a>
          <a href={`${base}/${profile.resume}`} download className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-5 py-3 font-medium transition-colors hover:border-accent">
            <Download size={18} aria-hidden /> Download Resume
          </a>
          <a href="#contact" className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-5 py-3 font-medium transition-colors hover:border-accent">
            <Mail size={18} aria-hidden /> Contact Me
          </a>
        </div>
        <div className="mt-6 flex gap-3">
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile" className="grid h-11 w-11 place-items-center rounded-full border border-line text-muted transition-colors hover:text-accent">
            <Linkedin size={20} aria-hidden />
          </a>
          <a href={profile.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub profile" className="grid h-11 w-11 place-items-center rounded-full border border-line text-muted transition-colors hover:text-accent">
            <Github size={20} aria-hidden />
          </a>
        </div>
      </div>
      <div className="mx-auto w-full max-w-xs md:max-w-none">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`${base}/${profile.portrait}`}
          alt="Portrait of Sahil Kumar"
          width={900}
          height={1200}
          fetchPriority="high"
          className="aspect-[3/4] w-full rounded-3xl border border-line object-cover shadow-xl"
        />
      </div>
    </section>
  );
}
