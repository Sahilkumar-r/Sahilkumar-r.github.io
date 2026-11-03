"use client";
import { useState } from "react";
import { EnvelopeSimple, GithubLogo, LinkedinLogo, PaperPlaneTilt, Phone } from "@phosphor-icons/react";
import Section from "./Section";
import { profile } from "@/data/profile";

type Errors = Partial<Record<"name" | "email" | "message", string>>;
const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const input =
  "motion-base body-3 mt-1 block w-full rounded-lg border bg-raised px-3 py-2 text-fg outline-none placeholder:text-muted focus:border-link";

export default function Contact() {
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    const name = String(d.get("name") || "").trim();
    const email = String(d.get("email") || "").trim();
    const message = String(d.get("message") || "").trim();
    const next: Errors = {};
    if (!name) next.name = "Enter your name.";
    if (!email) next.email = "Enter your email address.";
    else if (!emailRe.test(email)) next.email = "That email address is missing an @ or a domain. Check it and try again.";
    if (message.length < 10) next.message = "Write at least 10 characters so I know what you need.";
    setErrors(next);
    if (Object.keys(next).length) {
      setSent(false);
      return;
    }
    const subject = encodeURIComponent(`Portfolio message from ${name}`);
    const body = encodeURIComponent(`${message}\n\nFrom ${name} (${email})`);
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
    setSent(true);
  }

  const field = (key: keyof Errors) => ({
    "aria-invalid": errors[key] ? true : undefined,
    "aria-describedby": errors[key] ? `${key}-error` : undefined,
    className: `${input} ${errors[key] ? "border-red-500" : "border-line-strong"}`,
  });
  const err = (key: keyof Errors) =>
    errors[key] ? (
      <span id={`${key}-error`} role="alert" className="caption-2 mt-1 block text-red-700 dark:text-red-400">
        {errors[key]}
      </span>
    ) : null;

  return (
    <Section
      id="contact"
      title="Email me about the role"
      intro="Every number on this page has a source at the bottom. Check it, then write to me."
    >
      <div className="grid gap-12 md:grid-cols-5 md:gap-16">
        <div className="md:col-span-2">
          <a href={`mailto:${profile.email}`} className="btn btn-primary">
            <EnvelopeSimple size={20} weight="bold" aria-hidden /> Email me
          </a>
          <ul className="body-3 mt-8 space-y-4">
            <li>
              <a className="link inline-flex items-center gap-3" href={`mailto:${profile.email}`}>
                <EnvelopeSimple size={20} aria-hidden /> {profile.email}
              </a>
            </li>
            <li>
              <a className="link inline-flex items-center gap-3" href={`tel:${profile.phoneHref}`}>
                <Phone size={20} aria-hidden /> {profile.phone}
              </a>
            </li>
            <li>
              <a className="link inline-flex items-center gap-3" href={profile.linkedin} target="_blank" rel="noopener noreferrer">
                <LinkedinLogo size={20} aria-hidden /> LinkedIn
              </a>
            </li>
            <li>
              <a className="link inline-flex items-center gap-3" href={profile.github} target="_blank" rel="noopener noreferrer">
                <GithubLogo size={20} aria-hidden /> GitHub
              </a>
            </li>
          </ul>
        </div>

        <form onSubmit={onSubmit} noValidate className="surface p-6 md:col-span-3">
          <label className="body-5 block">
            Name
            <input name="name" autoComplete="name" required {...field("name")} />
            {err("name")}
          </label>
          <label className="body-5 mt-4 block">
            Email
            <input name="email" type="email" autoComplete="email" required {...field("email")} />
            {err("email")}
          </label>
          <label className="body-5 mt-4 block">
            Message
            <textarea name="message" rows={5} required {...field("message")} />
            {err("message")}
          </label>
          <button type="submit" className="btn btn-ghost mt-6">
            <PaperPlaneTilt size={20} aria-hidden /> Send by email
          </button>
          <p role="status" className="caption-2 mt-4 text-muted">
            {sent
              ? `Opening your email app. If nothing opens, write to ${profile.email}.`
              : "This opens your email app with the message filled in. Nothing is sent until you press send there."}
          </p>
        </form>
      </div>
    </Section>
  );
}
