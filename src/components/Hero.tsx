"use client";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, Download, Mail } from "lucide-react";
import { Github, Linkedin } from "./BrandIcons";
import { profile } from "@/data/profile";

const base = process.env.NEXT_PUBLIC_BASE_PATH || "";
const marquee = ["Python", "PyTorch", "RAG", "LangChain", "LangGraph", "LlamaIndex", "FastAPI", "Docker", "SQL", "Qdrant", "Hugging Face", "Streamlit", "Git"];

export default function Hero() {
  const reduce = useReducedMotion();
  const item = (i: number) =>
    reduce
      ? {}
      : { initial: { opacity: 0, y: 22 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6, delay: 0.1 * i, ease: "easeOut" as const } };

  return (
    <section id="top" className="mx-auto w-full max-w-6xl px-5 pb-12 pt-14 sm:px-8 sm:pt-20">
      <div className="grid items-center gap-12 md:grid-cols-[1.4fr_1fr]">
        <div>
          <motion.p {...item(0)} className="btn-ghost inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm text-muted">
            <span className="pulse-dot h-2 w-2 rounded-full bg-accent2" aria-hidden /> {profile.availability}
          </motion.p>
          <motion.h1 {...item(1)} className="mt-5 font-display text-4xl font-bold leading-tight tracking-tight sm:text-6xl">
            Hi, I&apos;m {profile.name}.
            <span className="gradient-text block">{profile.headline}</span>
          </motion.h1>
          <motion.p {...item(2)} className="mt-6 max-w-xl text-lg leading-relaxed text-muted">{profile.tagline}</motion.p>
          <motion.ul {...item(3)} className="mt-6 flex flex-wrap gap-2" aria-label="Top skills">
            {profile.heroSkills.map((s) => (
              <li key={s} className="btn-ghost rounded-full px-3 py-1 text-sm">{s}</li>
            ))}
          </motion.ul>
          <motion.div {...item(4)} className="mt-8 flex flex-wrap gap-3">
            <a href="#projects" className="btn btn-primary"><ArrowDown size={18} aria-hidden /> View Projects</a>
            <a href={`${base}/${profile.resume}`} download className="btn btn-ghost"><Download size={18} aria-hidden /> Download Resume</a>
            <a href="#contact" className="btn btn-ghost"><Mail size={18} aria-hidden /> Contact Me</a>
          </motion.div>
          <motion.div {...item(5)} className="mt-6 flex gap-3">
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile" className="btn-ghost grid h-11 w-11 place-items-center rounded-full text-muted transition-colors hover:text-accent">
              <Linkedin size={20} />
            </a>
            <a href={profile.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub profile" className="btn-ghost grid h-11 w-11 place-items-center rounded-full text-muted transition-colors hover:text-accent">
              <Github size={20} />
            </a>
          </motion.div>
        </div>

        <motion.div
          {...(reduce ? {} : { initial: { opacity: 0, scale: 0.94, rotate: 2 }, animate: { opacity: 1, scale: 1, rotate: 0 }, transition: { duration: 0.8, delay: 0.2, ease: "easeOut" as const } })}
          className="relative mx-auto w-full max-w-xs md:max-w-none"
        >
          <div className="absolute -inset-1 rounded-[1.75rem] bg-gradient-to-br from-accent via-accent2 to-pink-500 opacity-60 blur-xl" aria-hidden />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`${base}/${profile.portrait}`}
            alt="Portrait of Sahil Kumar"
            width={900}
            height={1200}
            fetchPriority="high"
            className="relative aspect-[3/4] w-full rounded-3xl border border-line object-cover shadow-2xl"
          />
        </motion.div>
      </div>

      <div className="marquee mt-14" aria-hidden>
        {[0, 1].map((k) => (
          <div key={k} className="marquee-track">
            {marquee.map((m) => (
              <span key={m} className="btn-ghost whitespace-nowrap rounded-full px-4 py-1.5 text-sm text-muted">{m}</span>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
