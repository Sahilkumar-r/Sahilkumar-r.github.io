import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { profile } from "@/data/profile";

export const metadata: Metadata = { title: "Terms | Sahil Kumar", description: "Terms of use for this portfolio site.", robots: { index: true } };

export default function Terms() {
  return (
    <LegalPage title="Terms" updated="November 3, 2026">
      <p>This site presents the work and background of Sahil Kumar for information. It is provided as is, without warranties of any kind.</p>
      <p>
        Text, images and design on this site belong to Sahil Kumar unless noted. Code in linked repositories is covered by the license stated in each repository. The FastAPI documentation excerpts used by the RAG demo are MIT licensed and credited in that repository.
      </p>
      <p>
        Projects labelled &quot;Code on GitHub&quot; are source code, not hosted services, and may not run without your own setup and keys. Results quoted on this page come from small evaluations described in the linked repositories and may not apply to other data.
      </p>
      <p>
        Links to other sites are provided for convenience. I do not control those sites and am not responsible for their content.
      </p>
      <p>
        Questions about these terms: <a className="link" href={`mailto:${profile.email}`}>{profile.email}</a>.
      </p>
    </LegalPage>
  );
}
