import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import Section from "./Section";
import { ragx } from "@/data/ragx";

const base = process.env.NEXT_PUBLIC_BASE_PATH || "";
const hy = ragx.retrieval.find((r) => r.mode === "hybrid")!;
const pc = (n: number) => `${Math.round(n * 100)}%`;

const facts = [
  { value: pc(hy.held_out["hit@5"]), label: `correct page in the top five, on ${ragx.n.held_out} held out questions` },
  { value: ragx.generation.plain_rag.faithfulness.toFixed(2), label: "answer faithfulness, scored by a model from another family" },
  { value: `0 of ${ragx.pii.text_cases}`, label: "personal data cases leaked in an end to end test" },
];

export default function Featured() {
  return (
    <Section
      id="featured"
      band
      title="Featured: a docs assistant you can try"
      intro="ragx answers questions about the FastAPI and Pydantic docs, cites the pages it used, and refuses what the docs do not cover. The case study has screenshots, charts for every eval, live monitoring, and what did not work."
    >
      <div className="grid items-center gap-8 md:grid-cols-5 md:gap-16">
        <div className="md:col-span-2">
          <ul className="space-y-6">
            {facts.map((f) => (
              <li key={f.label}>
                <p className="heading-4">{f.value}</p>
                <p className="body-6 text-muted">{f.label}</p>
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link href="/projects/ragx/" className="btn btn-primary">
              Read the case study <ArrowRight size={20} aria-hidden />
            </Link>
            <a href="https://advanced-rag-ef76.onrender.com/" target="_blank" rel="noopener noreferrer" className="link button-sm inline-flex items-center gap-2">
              <ArrowUpRight size={16} aria-hidden /> Open the live demo
            </a>
          </div>
        </div>
        <div className="md:col-span-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`${base}/images/ragx/chat-answer.webp`}
            alt="The ragx chat screen answering a Pydantic question with numbered citations and a list of sources"
            width={1600}
            height={813}
            loading="lazy"
            className="h-auto w-full rounded-2xl border border-line"
          />
        </div>
      </div>
    </Section>
  );
}
