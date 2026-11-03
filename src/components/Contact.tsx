"use client";
import { useState } from "react";
import { Check, Copy, EnvelopeSimple, GithubLogo, GoogleLogo, LinkedinLogo, MicrosoftOutlookLogo, PaperPlaneTilt, Phone } from "@phosphor-icons/react";
import Section from "./Section";
import EmailMe from "./EmailMe";
import { composeLinks, copyText } from "@/lib/mail";
import { profile } from "@/data/profile";

type Errors = Partial<Record<"name" | "email" | "message", string>>;
type Draft = { name: string; email: string; message: string };
const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const input =
  "motion-base body-3 mt-1 block w-full rounded-lg border bg-raised px-3 py-2 text-fg outline-none placeholder:text-muted focus:border-link";

export default function Contact() {
  const [errors, setErrors] = useState<Errors>({});
  const [draft, setDraft] = useState<Draft | null>(null);
  const [copied, setCopied] = useState(false);

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
    setDraft(Object.keys(next).length ? null : { name, email, message });
    setCopied(false);
  }

  const subject = draft ? `Portfolio message from ${draft.name}` : "";
  const body = draft ? `${draft.message}\n\nFrom ${draft.name} (${draft.email})` : "";
  const links = composeLinks(profile.email, subject, body);

  async function copyMessage() {
    setCopied(await copyText(`To: ${profile.email}\nSubject: ${subject}\n\n${body}`));
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

  const opt = "btn btn-ghost w-full justify-start";

  return (
    <Section id="contact" title="Email me about the role" intro="Open to AI Engineer and Forward Deployed Engineer roles. Write to me and I will reply.">
      <div className="grid gap-12 md:grid-cols-5 md:gap-16">
        <div className="md:col-span-2">
          <EmailMe />
          <ul className="body-3 mt-8 space-y-4">
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
            <PaperPlaneTilt size={20} aria-hidden /> Write my message
          </button>

          {draft ? (
            <div className="mt-6" role="status">
              <p className="body-5">Your message is ready. Choose where to send it:</p>
              <div className="mt-3 grid gap-2">
                <a className={opt} href={links.gmail} target="_blank" rel="noopener noreferrer">
                  <GoogleLogo size={20} aria-hidden /> Open in Gmail
                </a>
                <a className={opt} href={links.outlook} target="_blank" rel="noopener noreferrer">
                  <MicrosoftOutlookLogo size={20} aria-hidden /> Open in Outlook
                </a>
                <a className={opt} href={links.mailto}>
                  <EnvelopeSimple size={20} aria-hidden /> Open my email app
                </a>
                <button type="button" className={opt} onClick={copyMessage}>
                  {copied ? <Check size={20} aria-hidden /> : <Copy size={20} aria-hidden />}
                  {copied ? "Message copied" : "Copy the message"}
                </button>
              </div>
              <p className="caption-2 mt-3 text-muted">Nothing is sent until you press send in your email.</p>
            </div>
          ) : (
            <p className="caption-2 mt-4 text-muted">
              This site has no server, so your message goes out from your own email. After you write it, you pick Gmail, Outlook or your email app.
            </p>
          )}
        </form>
      </div>
    </Section>
  );
}
