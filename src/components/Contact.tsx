"use client";
import { useState } from "react";
import { Mail, Phone, Send } from "lucide-react";
import { Github, Linkedin } from "./BrandIcons";
import Section from "./Section";
import { profile } from "@/data/profile";

const field =
  "mt-1 w-full rounded-lg border border-line bg-bg px-3 py-2.5 text-base outline-none focus:border-accent";

export default function Contact() {
  const [sent, setSent] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    const subject = encodeURIComponent(`Portfolio inquiry from ${d.get("name")}`);
    const body = encodeURIComponent(`${d.get("message")}\n\n— ${d.get("name")} (${d.get("email")})`);
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
    setSent(true);
  }

  return (
    <Section id="contact" eyebrow="Contact" title="Let's work together">
      <div className="grid gap-10 md:grid-cols-2">
        <div>
          <p className="text-lg text-muted">
            Open to AI Engineer roles and collaborations. The fastest way to reach me is by email.
          </p>
          <ul className="mt-6 space-y-4">
            <li><a className="inline-flex items-center gap-3 hover:text-accent" href={`mailto:${profile.email}`}><Mail size={20} aria-hidden /> {profile.email}</a></li>
            <li><a className="inline-flex items-center gap-3 hover:text-accent" href={`tel:${profile.phone.replace(/[^+\d]/g, "")}`}><Phone size={20} aria-hidden /> {profile.phone}</a></li>
            <li><a className="inline-flex items-center gap-3 hover:text-accent" href={profile.linkedin} target="_blank" rel="noopener noreferrer"><Linkedin size={20} aria-hidden /> LinkedIn</a></li>
            <li><a className="inline-flex items-center gap-3 hover:text-accent" href={profile.github} target="_blank" rel="noopener noreferrer"><Github size={20} aria-hidden /> GitHub</a></li>
          </ul>
        </div>
        <form onSubmit={onSubmit} className="rounded-2xl border border-line bg-surface p-6">
          <label className="block text-sm font-medium">Name
            <input name="name" required autoComplete="name" className={field} />
          </label>
          <label className="mt-4 block text-sm font-medium">Email
            <input name="email" type="email" required autoComplete="email" className={field} />
          </label>
          <label className="mt-4 block text-sm font-medium">Message
            <textarea name="message" required rows={4} className={field} />
          </label>
          <button type="submit" className="mt-5 inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3 font-medium text-white dark:text-slate-900">
            <Send size={16} aria-hidden /> Send via email
          </button>
          <p role="status" className="mt-3 text-sm text-muted">
            {sent ? "Opening your email app. If nothing opens, write to the address on the left." : "This opens your email app with the message pre-filled."}
          </p>
        </form>
      </div>
    </Section>
  );
}
