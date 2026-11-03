"use client";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { DownloadSimple, GithubLogo, LinkedinLogo } from "@phosphor-icons/react";
import EmailMe from "./EmailMe";
import { profile } from "@/data/profile";

const base = process.env.NEXT_PUBLIC_BASE_PATH || "";
const ease = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  const reduce = useReducedMotion();
  const item = (i: number) => ({
    "data-motion": true,
    initial: { opacity: 0, y: reduce ? 0 : 32 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: reduce ? 0.3 : 0.7, delay: reduce ? 0 : 0.08 * i, ease },
  });

  return (
    <section id="top" className="mx-auto max-w-6xl px-4 pb-16 pt-24 md:px-6 md:pb-24">
      <div className="grid items-center gap-10 md:grid-cols-5 md:gap-16">
        <div className="md:col-span-3">
          <motion.h1 {...item(0)} className="heading-1 max-w-[680px]">
            {profile.heroLines.map((line) => (
              <span key={line} className="hero-gradient block w-fit">{line}</span>
            ))}
          </motion.h1>
          <motion.p {...item(1)} className="title-1 mt-6 max-w-[680px] text-muted">
            {profile.subheading}
          </motion.p>
          <motion.p {...item(2)} className="body-3 mt-4 max-w-[680px]">
            {profile.proof}
          </motion.p>
          <motion.div {...item(3)} className="mt-8 flex flex-wrap items-center gap-4">
            <EmailMe />
            <a href={`${base}/${profile.resume}`} download className="link button-sm inline-flex items-center gap-2">
              <DownloadSimple size={16} aria-hidden /> Download resume
            </a>
            <span className="flex items-center gap-2">
              <a href={profile.github} target="_blank" rel="noopener noreferrer" className="icon-btn" aria-label="GitHub profile">
                <GithubLogo size={20} aria-hidden />
              </a>
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="icon-btn" aria-label="LinkedIn profile">
                <LinkedinLogo size={20} aria-hidden />
              </a>
            </span>
          </motion.div>
        </div>

        <motion.div {...item(2)} className="md:col-span-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`${base}/${profile.portrait}`}
            alt="Sahil Kumar, smiling, wearing glasses and a white shirt with arms crossed"
            width={900}
            height={1200}
            fetchPriority="high"
            className="aspect-[3/4] w-full rounded-2xl border border-line object-cover"
          />
        </motion.div>
      </div>
    </section>
  );
}
