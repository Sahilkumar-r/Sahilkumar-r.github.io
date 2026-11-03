import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { profile } from "@/data/profile";

export const metadata: Metadata = { title: "Privacy | Sahil Kumar", description: "What this portfolio site does and does not collect.", robots: { index: true } };

export default function Privacy() {
  return (
    <LegalPage title="Privacy" updated="November 3, 2026">
      <p>This site does not use analytics, advertising or tracking cookies, and it has no accounts or database.</p>
      <p>
        It stores one preference in your browser (localStorage): your light or dark theme choice. It stays on your device and you can clear it from your browser settings.
      </p>
      <p>
        The contact form does not send anything to a server. It opens your email app with a message filled in, and nothing is sent until you press send there. If you email me, I use your message only to reply to you.
      </p>
      <p>
        The site is hosted on GitHub Pages. GitHub may log technical request data such as IP addresses under its own privacy statement.
      </p>
      <p>
        Questions about this page: <a className="link" href={`mailto:${profile.email}`}>{profile.email}</a>.
      </p>
    </LegalPage>
  );
}
