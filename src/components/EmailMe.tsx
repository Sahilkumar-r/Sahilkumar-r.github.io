"use client";
import { useEffect, useId, useRef, useState } from "react";
import { Check, Copy, EnvelopeSimple, GoogleLogo, MicrosoftOutlookLogo } from "@phosphor-icons/react";
import { composeLinks, copyText } from "@/lib/mail";
import { profile } from "@/data/profile";

/**
 * "Email me" with options that work for every visitor: Gmail on the web, Outlook on the web,
 * their email app, or copying the address. A bare mailto link does nothing without an email app.
 */
export default function EmailMe({ variant = "button" }: { variant?: "button" | "link" }) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const wrap = useRef<HTMLSpanElement>(null);
  const menuId = useId();
  const links = composeLinks(profile.email, "Hello from your portfolio", "");

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onDown = (e: PointerEvent) => wrap.current && !wrap.current.contains(e.target as Node) && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onDown);
    };
  }, [open]);

  async function copy() {
    const ok = await copyText(profile.email);
    setCopied(ok);
    if (ok) window.setTimeout(() => setCopied(false), 2500);
  }

  const item = "motion-base body-5 flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left hover:bg-raised";

  return (
    <span ref={wrap} className="relative inline-block">
      <button
        type="button"
        className={variant === "button" ? "btn btn-primary" : "link inline-flex items-center gap-3"}
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen(!open)}
      >
        <EnvelopeSimple size={20} weight={variant === "button" ? "bold" : "regular"} aria-hidden />
        {variant === "button" ? "Email me" : profile.email}
      </button>

      {open && (
        <div id={menuId} className="absolute left-0 top-full z-30 mt-2 w-max max-w-xs rounded-2xl border border-line-strong bg-bg p-2">
          <p className="caption-2 px-3 py-2 text-muted">Send to {profile.email} with:</p>
          <a className={item} href={links.gmail} target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)}>
            <GoogleLogo size={20} aria-hidden /> Gmail in the browser
          </a>
          <a className={item} href={links.outlook} target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)}>
            <MicrosoftOutlookLogo size={20} aria-hidden /> Outlook in the browser
          </a>
          <a className={item} href={links.mailto} onClick={() => setOpen(false)}>
            <EnvelopeSimple size={20} aria-hidden /> My email app
          </a>
          <button type="button" className={item} onClick={copy}>
            {copied ? <Check size={20} aria-hidden /> : <Copy size={20} aria-hidden />}
            {copied ? "Address copied" : "Copy the address"}
          </button>
          <span role="status" className="sr-only">{copied ? "Email address copied to the clipboard" : ""}</span>
        </div>
      )}
    </span>
  );
}
