/** Ways to start an email. A mailto link only works when the visitor has an email app set up, so web options are offered too. */
export function composeLinks(to: string, subject = "", body = "") {
  const s = encodeURIComponent(subject);
  const b = encodeURIComponent(body);
  const t = encodeURIComponent(to);
  return {
    gmail: `https://mail.google.com/mail/?view=cm&fs=1&to=${t}&su=${s}&body=${b}`,
    outlook: `https://outlook.live.com/mail/0/deeplink/compose?to=${t}&subject=${s}&body=${b}`,
    mailto: `mailto:${to}?subject=${s}&body=${b}`,
  };
}

/** Copy text to the clipboard, with a fallback for browsers or contexts that block the Clipboard API. */
export async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    try {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.setAttribute("readonly", "");
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      const ok = document.execCommand("copy");
      document.body.removeChild(ta);
      return ok;
    } catch {
      return false;
    }
  }
}
