import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, GithubLogo } from "@phosphor-icons/react/dist/ssr";
import Section from "@/components/Section";
import Footer from "@/components/Footer";
import { BarRows, Chart, Legend, Scatter } from "@/components/ragx/charts";
import { ragx } from "@/data/ragx";
import { profile } from "@/data/profile";

// Copy rules for this site: plain words, no hyphens in sentences, every number comes from src/data/ragx.ts (generated from the result files).
export const metadata: Metadata = {
  title: "ragx case study | Sahil Kumar",
  description:
    "A documentation assistant that cites its sources and says when it does not know, with the problems it solves, the evals behind it, screenshots and live monitoring.",
  alternates: { canonical: "/projects/ragx/" },
};

const base = process.env.NEXT_PUBLIC_BASE_PATH || "";
const DEMO = "https://advanced-rag-ef76.onrender.com/";
const REPO = `${profile.github}/advanced-rag`;

const f2 = (n: number) => n.toFixed(2);
const pc = (n: number) => `${Math.round(n * 100)}%`;
const pc1 = (n: number) => `${(n * 100).toFixed(1)}%`;
const secs = (ms: number) => `${(ms / 1000).toFixed(1)} s`;
const R = Object.fromEntries(ragx.retrieval.map((r) => [r.mode, r])) as Record<string, (typeof ragx.retrieval)[number]>;
const plain = ragx.generation.plain_rag;
const selfRag = ragx.generation.self_rag;
const sys = ragx.pipeline.plain_rag;

function Shot({ file, alt, w, h, caption }: { file: string; alt: string; w: number; h: number; caption: string }) {
  return (
    <figure>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={`${base}/images/ragx/${file}`} alt={alt} width={w} height={h} loading="lazy" className="h-auto w-full rounded-2xl border border-line" />
      <figcaption className="caption-2 mt-3 text-muted">{caption}</figcaption>
    </figure>
  );
}

const stats = [
  { value: pc(R.hybrid.held_out["hit@5"]), label: `of ${ragx.n.held_out} held out questions had a correct documentation page in the top five results` },
  { value: f2(plain.faithfulness), label: `answer faithfulness on ${plain.n} questions, scored by a judge model from a different family` },
  { value: `0 of ${ragx.pii.text_cases}`, label: "personal data cases leaked in an end to end test (a control that turns the guards off leaks all of them)" },
  { value: `$${sys.cost_usd}`, label: "paid model spend in the end to end eval run. Everything ran on free tiers" },
];

const problems = [
  {
    problem: "Chatbots answer with confidence even when the documents do not cover the question.",
    did: "Every answer must cite numbered sources. When nothing relevant is found, it says it does not know and shows the nearest pages it searched.",
    results: [
      `Refused ${pc(plain.off_topic_refused)} of the 8 off topic questions and ${pc(plain.unanswerable_refused)} of the 6 in domain questions whose answer is not in the indexed pages.`,
      `${pc(plain.answers_with_a_citation)} of answers carried a citation, and ${f2(plain.citation_accuracy)} of the citations supported the sentence they sat on (judge scored).`,
    ],
  },
  {
    problem: "Keyword search and embedding search each miss pages the other one finds.",
    did: "Hybrid retrieval: BM25 keyword search and dense embeddings, merged by reciprocal rank fusion. Hits expand to the whole documentation section, so the model sees full context.",
    results: [
      `On held out questions, nDCG@10 is ${f2(R.hybrid.held_out["ndcg@10"])} for hybrid against ${f2(R.bm25.held_out["ndcg@10"])} for keyword and ${f2(R.dense.held_out["ndcg@10"])} for embeddings.`,
      `hit@5 is ${pc(R.hybrid.held_out["hit@5"])} against ${pc(R.bm25.held_out["hit@5"])} for either method alone.`,
    ],
  },
  {
    problem: "Free model tiers rate limit, change and fail, so one provider is a single point of failure.",
    did: "A router tries Groq, Cerebras and Gemini in order, with fallback, a circuit breaker and quotas. A paid key exists only as a capped last resort and is off by default. An exact plus semantic cache answers repeats without a model call.",
    results: [
      `Paid spend in the end to end eval run: $${sys.cost_usd}. The semantic cache served ${pc(ragx.cache.paraphrase_hit_rate)} of paraphrased questions with ${ragx.cache.wrong_hit_rate * 100}% wrong hits at the chosen threshold.`,
      `The honest cost: on free tiers the median answer took ${secs(sys.p50_ms)} but the slowest 5% took ${secs(sys.p95_ms)} when providers rate limited, and ${pc(sys.fallback_rate)} of calls used a fallback in that run.`,
    ],
  },
  {
    problem: "Assistants follow instructions hidden in questions and documents, and leak personal data.",
    did: "Input checks block injection and redact emails, keys and phone numbers before any model sees them. Retrieved chunks that carry instructions are dropped, and outputs are checked. Memory needs consent and rejects secrets.",
    results: [
      `Blocked ${pc(ragx.safety.injection_block_rate.v2)} of ${ragx.safety.injection_n} attack prompts, with ${pc(ragx.safety.benign_false_refusal_rate.v2)} false refusals on ${ragx.safety.benign_n} benign look alikes.`,
      `${ragx.pii.text_leak_rate * ragx.pii.text_cases} of ${ragx.pii.text_cases} personal data cases leaked into a model input, response, log, memory or cache.`,
    ],
  },
];

const steps = [
  ["Check the question", "Length limit, prompt injection check, and redaction of emails, keys and phone numbers."],
  ["Look in the cache", "An exact match or a very similar earlier question returns at once, with no model call."],
  ["Search the docs", "BM25 and embeddings run side by side and are merged by rank. Results expand to whole sections."],
  ["Ask a model", "A router picks a free provider and falls back if it is rate limited or down."],
  ["Check the answer", "Citations must point at real sources, and personal data is removed from the reply."],
  ["Measure everything", "Each query is traced, counted in Prometheus, and a sample is scored by a judge model."],
];

const limits = [
  ["The reranker lowered quality and added seconds", `It scored below plain hybrid search on nDCG@10 and took ${secs(R["hybrid+rerank"].p50_ms)} a search, so it is not in the product.`],
  ["Self RAG was not worth its cost", `About ${(selfRag.calls_per_query / plain.calls_per_query).toFixed(0)} times the model calls for no gain in faithfulness on this set.`],
  ["Free tiers are slow when they push back", `Median ${secs(sys.p50_ms)}, but ${secs(sys.p95_ms)} at the 95th percentile when providers rate limited. A paid key would fix that and is deliberately off.`],
  ["The labels are unreviewed", `Beyond the 30 baseline questions, the golden questions and all safety labels were written by an AI assistant (Claude) and a human has not reviewed them. The judge model agreed with its calibration labels on ${ragx.judge.n} of ${ragx.judge.n} cases, but with unreviewed labels that is weak evidence.`],
  ["Voice and image tests are synthetic", "Generated voices and rendered images are cleaner than real ones. Real phone recordings and real screenshots would score lower."],
  ["Not measured yet", "Context recall, a personal data leak rate on live answers with a real model, and two completed scheduled eval runs. Names and addresses are not detected as personal data."],
];

export default function RagxCaseStudy() {
  const ann = ragx.ann.rows.map((r) => {
    const p = r.params as Record<string, number>;
    const name = r.index === "flat" ? "Flat (exact)" : r.index === "hnsw" ? `HNSW M${p.M} ef${p.ef_search}` : `IVF nlist${p.nlist} nprobe${p.nprobe}`;
    return { name, x: r.p50_ms, y: r.recall, group: r.index === "flat" ? "Exact" : r.index === "hnsw" ? "HNSW" : "IVF" };
  });

  return (
    <>
      <main id="main">
        <header className="mx-auto max-w-6xl px-4 pb-16 pt-24 md:px-6 md:pb-24">
          <Link href="/#projects" className="link body-5 inline-flex items-center gap-2">
            <ArrowLeft size={16} aria-hidden /> Back to projects
          </Link>
          <p className="caption-3 mt-8 text-muted">Case study, retrieval augmented generation</p>
          <h1 className="heading-2 mt-2 max-w-[680px]">ragx: a docs assistant that cites its sources and says when it does not know</h1>
          <p className="body-3 mt-6 max-w-[680px] text-muted">
            Ask a question about the FastAPI or Pydantic documentation. Every answer links to the pages it came from, off topic questions are refused, and every claim on this page is a measured number with its limits next to it.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a href={DEMO} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              <ArrowUpRight size={20} aria-hidden /> Open the live demo
            </a>
            <a href={REPO} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
              <GithubLogo size={20} aria-hidden /> View the code
            </a>
          </div>
          <p className="caption-2 mt-4 max-w-[680px] text-muted">
            The demo runs on a free server that sleeps when idle, so the first load can take about a minute. Choose Continue as guest to try it without an account.
          </p>

          <ul className="mt-16 grid gap-4 md:grid-cols-4">
            {stats.map((s) => (
              <li key={s.label} className="surface p-6">
                <p className="heading-3">{s.value}</p>
                <p className="body-6 mt-2 text-muted">{s.label}</p>
              </li>
            ))}
          </ul>
        </header>

        <Section id="problems" band title="Four problems, and what happened when I measured the fix" intro="Each card names the problem, what I built, and the number I got. The limits are in the section further down.">
          <ul className="grid gap-4 md:grid-cols-2">
            {problems.map((p) => (
              <li key={p.problem}>
                <article className="surface flex h-full flex-col p-6">
                  <dl className="space-y-4">
                    <div>
                      <dt className="body-5">The problem</dt>
                      <dd className="title-3 mt-1">{p.problem}</dd>
                    </div>
                    <div>
                      <dt className="body-5">What I built</dt>
                      <dd className="body-6 mt-1 text-muted">{p.did}</dd>
                    </div>
                    <div>
                      <dt className="body-5">Result</dt>
                      <dd className="mt-1">
                        <ul className="body-6 list-disc space-y-1 pl-6 text-muted marker:text-line-strong">
                          {p.results.map((r) => (
                            <li key={r}>{r}</li>
                          ))}
                        </ul>
                      </dd>
                    </div>
                  </dl>
                </article>
              </li>
            ))}
          </ul>
        </Section>

        <Section id="demo" title="See it working" intro="Screenshots from a local run of the same build that is deployed. The questions are real; the answers come from free tier models.">
          <div className="space-y-8">
            <Shot file="chat-answer.webp" w={1600} h={813} alt="The chat screen answering a question about before and after validators in Pydantic, with numbered citation chips and a list of sources" caption="A cited answer. Each bracketed number opens the exact documentation section the sentence came from." />
            <div className="grid items-start gap-8 md:grid-cols-2">
              <Shot file="refusal.webp" w={950} h={610} alt="The chat screen refusing an off topic question about PyTorch and listing the nearest documentation pages it searched" caption="An off topic question is refused, and the assistant shows the nearest pages it searched." />
              <Shot file="source-dialog.webp" w={705} h={645} alt="A dialog showing the source passage from the Pydantic validators page with a link to the original page" caption="Opening a citation shows the source passage and links to the original page." />
            </div>
            <div className="grid items-start gap-8 md:grid-cols-5">
              <div className="md:col-span-2">
                <Shot file="mobile.webp" w={628} h={915} alt="The chat screen on a phone, showing a code block, citation chips and a bottom tab bar" caption="On a phone the navigation moves to a bottom bar and code blocks scroll sideways." />
              </div>
              <div className="md:col-span-3">
                <Shot file="admin-evals.webp" w={940} h={825} alt="The admin Evals tab, a table of metrics with the result file and date for each one" caption="The admin Evals tab reads the committed result files, so every number on screen names the run it came from." />
              </div>
            </div>
          </div>
        </Section>

        <Section id="how" band title="How a question is answered" intro="Six steps. Each one exists because a measurement or a failure showed it was needed.">
          <ol className="grid gap-4 md:grid-cols-3">
            {steps.map(([title, text], i) => (
              <li key={title} className="surface p-6">
                <p className="caption-3 text-muted">Step {i + 1}</p>
                <h3 className="title-1 mt-2">{title}</h3>
                <p className="body-6 mt-2 text-muted">{text}</p>
              </li>
            ))}
          </ol>
        </Section>

        <Section
          id="evals"
          title="Evals: what I measured"
          intro={`One change at a time, on a fixed set of ${ragx.n.dev + ragx.n.held_out} golden questions (${ragx.n.dev} to tune on, ${ragx.n.held_out} held out and never used to choose settings). Results that got worse are kept and shown. Every chart names its source file in the repository.`}
        >
          <div className="space-y-8">
            <Chart
              title="Retrieval: hybrid search wins, and the reranker made it worse"
              note={`nDCG@10 per retrieval mode. Higher is better. Hybrid also scored hit@5 of ${pc(R.hybrid.held_out["hit@5"])} on the held out questions. A cross encoder reranker scored lower and took about ${secs(R["hybrid+rerank"].p50_ms)} per search instead of ${Math.round(R.hybrid.p50_ms)} ms, so I left it out.`}
              source="eval/results/01-retrieval.json"
            >
              <Legend items={[{ name: `Dev split (${ragx.n.dev} questions)`, tone: "muted" }, { name: `Held out (${ragx.n.held_out} questions)`, tone: "primary" }]} />
              <BarRows
                rows={ragx.retrieval.map((r) => ({
                  label: r.label,
                  hint: `median search ${r.p50_ms < 100 ? `${Math.round(r.p50_ms)} ms` : secs(r.p50_ms)}`,
                  bars: [
                    { name: "dev", value: r.dev["ndcg@10"], tone: "muted" as const },
                    { name: "held out", value: r.held_out["ndcg@10"], tone: r.mode === "hybrid+rerank" ? ("warn" as const) : ("primary" as const) },
                  ],
                }))}
              />
            </Chart>

            <Chart
              title="Self RAG against plain RAG: more calls, no better answers"
              note={`Self RAG adds retrieval grading and answer checking. On ${plain.n} questions it used ${selfRag.calls_per_query.toFixed(1)} model calls and ${selfRag.tokens_per_query.toLocaleString("en-US")} tokens per question against ${plain.calls_per_query.toFixed(0)} call and ${plain.tokens_per_query.toLocaleString("en-US")} tokens, and was not more faithful, so plain RAG is the default. Differences of a few points on this many questions are within noise.`}
              source="eval/results/02-generation-v3-bracketfix.json"
            >
              <Legend items={[{ name: "Plain RAG (shipped)", tone: "primary" }, { name: "Self RAG", tone: "muted" }]} />
              <BarRows
                rows={[
                  { label: "Faithfulness", hint: "claims supported by the sources", bars: [{ name: "plain", value: plain.faithfulness }, { name: "self", value: selfRag.faithfulness, tone: "muted" }] },
                  { label: "Citation accuracy", hint: "citations that support their sentence", bars: [{ name: "plain", value: plain.citation_accuracy }, { name: "self", value: selfRag.citation_accuracy, tone: "muted" }] },
                  { label: "Answers with a citation", bars: [{ name: "plain", value: plain.answers_with_a_citation }, { name: "self", value: selfRag.answers_with_a_citation, tone: "muted" }] },
                  { label: "Refusal correct", hint: "answers when it should, refuses when it should", bars: [{ name: "plain", value: plain.refusal_correct }, { name: "self", value: selfRag.refusal_correct, tone: "muted" }] },
                ]}
              />
            </Chart>

            <Chart
              title="Safety rules, before and after one round of fixes"
              note="The second round changed rules after seeing which cases failed, and the same cases are the test set, so the after numbers are partly tuned on their own test data. Two social engineering attacks are still missed."
              source="eval/results/04-safety-v1.json and eval/results/04-safety.json"
            >
              <Legend items={[{ name: "Round 1", tone: "muted" }, { name: "Round 2", tone: "primary" }]} />
              <BarRows
                rows={[
                  { label: "Attack prompts blocked", hint: `${ragx.safety.injection_n} attacks, higher is better`, bars: [{ name: "round 1", value: ragx.safety.injection_block_rate.v1, tone: "muted", text: pc1(ragx.safety.injection_block_rate.v1) }, { name: "round 2", value: ragx.safety.injection_block_rate.v2, text: pc1(ragx.safety.injection_block_rate.v2) }] },
                  { label: "Benign questions wrongly refused", hint: `${ragx.safety.benign_n} look alikes, lower is better`, bars: [{ name: "round 1", value: ragx.safety.benign_false_refusal_rate.v1, tone: "muted", text: pc1(ragx.safety.benign_false_refusal_rate.v1) }, { name: "round 2", value: ragx.safety.benign_false_refusal_rate.v2, text: pc1(ragx.safety.benign_false_refusal_rate.v2) }] },
                  { label: "Personal data found exactly", hint: `${ragx.safety.pii_n} cases, higher is better`, bars: [{ name: "round 1", value: ragx.safety.pii_cases_exact.v1, tone: "muted", text: pc1(ragx.safety.pii_cases_exact.v1) }, { name: "round 2", value: ragx.safety.pii_cases_exact.v2, text: pc1(ragx.safety.pii_cases_exact.v2) }] },
                ]}
              />
            </Chart>

            <div className="grid gap-8 md:grid-cols-2">
              <Chart title="Conversation memory helps follow up questions" note="Rewriting a follow up like “and how do I validate it?” using the earlier turns. Retrieval only, 12 cases written by Claude, so treat it as an indication." source="eval/results/04-memory.json">
                <Legend items={[{ name: "Without memory", tone: "muted" }, { name: "With memory", tone: "primary" }]} />
                <BarRows
                  rows={[
                    { label: "hit@5", bars: [{ name: "without", value: ragx.memory.off["hit@5"], tone: "muted" }, { name: "with", value: ragx.memory.on["hit@5"] }] },
                    { label: "Mean reciprocal rank", bars: [{ name: "without", value: ragx.memory.off.mrr, tone: "muted" }, { name: "with", value: ragx.memory.on.mrr }] },
                  ]}
                />
              </Chart>
              <Chart
                title="Voice and image input"
                note={`Tested on ${ragx.voice.n} synthetic voice clips and ${ragx.image.n} rendered images, so these numbers are optimistic. A glossary prompt lowered the word error rate. No hidden instruction in an image reached the pipeline.`}
                source="eval/results/05-voice-glossary.json, eval/results/05-voice-plain.json and eval/results/05-image.json"
              >
                <BarRows
                  rows={[
                    { label: "Word error rate, plain", hint: "lower is better", bars: [{ name: "plain", value: ragx.voice.plain_wer, tone: "muted", text: pc1(ragx.voice.plain_wer) }] },
                    { label: "Word error rate, with glossary", hint: "lower is better", bars: [{ name: "glossary", value: ragx.voice.glossary_wer, text: pc1(ragx.voice.glossary_wer) }] },
                    { label: "Key terms read from images", bars: [{ name: "recall", value: ragx.image.key_term_recall }] },
                    { label: "Right page in the top five from an image", bars: [{ name: "hit@5", value: ragx.image.hit5 }] },
                  ]}
                />
              </Chart>
            </div>

            <Chart
              title="Approximate search indexes at 100,000 vectors"
              note={`A study of scale, not of this app: the real corpus has only 907 chunks, where exact search is already fast. At ${ragx.ann.n_vectors.toLocaleString("en-US")} synthetic vectors, HNSW and IVF settings that reach full recall run roughly 15 to 60 times faster than exact search (up and to the left is better).`}
              source="eval/results/01-ann.json"
            >
              <Legend items={[{ name: "Exact", tone: "warn" }, { name: "HNSW", tone: "primary" }, { name: "IVF", tone: "muted" }]} />
              <Scatter points={ann} groups={[{ name: "Exact", tone: "warn" }, { name: "HNSW", tone: "primary" }, { name: "IVF", tone: "muted" }]} />
            </Chart>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="surface p-6">
                <h3 className="title-1">Context precision, judged by a model</h3>
                <p className="heading-3 mt-4">{f2(ragx.contextPrecision.value)}</p>
                <p className="body-6 mt-2 text-muted">
                  Rank weighted share of the sources sent to the answer model that are useful for the question, over all {ragx.contextPrecision.questions} golden questions. Dev {f2(ragx.contextPrecision.dev)}, held out {f2(ragx.contextPrecision.held_out)}. {pc(ragx.contextPrecision.useful_share)} of sources were judged useful and {pc(ragx.contextPrecision.with_useful)} of questions had at least one.
                </p>
                <p className="caption-2 mt-4 text-muted">
                  The judge agrees with the page label only {pc(ragx.contextPrecision.agreement)} of the time, and I have not calibrated it by hand for this task, so read this as a rough signal. Context recall is not measured because the golden set has no reference answers.
                </p>
                <p className="caption-5 mt-4 text-muted">Source: eval/results/01-context-precision.json</p>
              </div>
              <div className="surface p-6">
                <h3 className="title-1">Personal data leak test</h3>
                <p className="heading-3 mt-4">0 of {ragx.pii.text_cases}</p>
                <p className="body-6 mt-2 text-muted">
                  Cases with an email, key, token or phone number went through the real app with a stub model built to behave as badly as possible: it echoes everything it receives and tries to save the user&apos;s words as a memory. I then searched the model input, the response, the trace log, the audit log, memories, history and the cache. Nothing leaked, and none leaked from text read out of a screenshot.
                </p>
                <p className="caption-2 mt-4 text-muted">
                  A control run with the guards switched off leaked {ragx.pii.control_leaking} of {ragx.pii.control_of} cases through the same harness, so the zero is not a blind spot. Limits: seven cases, only patterns the rules can detect (names and addresses are not detected), and a stub, not a real model.
                </p>
                <p className="caption-5 mt-4 text-muted">Source: eval/results/04-pii-leak.json</p>
              </div>
            </div>
          </div>
        </Section>

        <Section id="monitoring" band title="Watching it run" intro="Prometheus scrapes the service and Grafana draws the online evals, so quality is watched after release as well as before.">
          <div className="space-y-8">
            <Shot file="grafana-live.webp" w={1265} h={775} alt="Grafana panels showing questions per minute by outcome, refusal rate, answer latency and tokens per minute" caption="Questions per minute by outcome, refusal rate, answer latency (median and 95th percentile) and tokens per minute." />
            <Shot file="grafana-quality.webp" w={1600} h={314} alt="Grafana panels showing sampled online faithfulness, the number of judged samples and paid spend of zero dollars" caption="A sample of live answers is scored by a judge model after the reply is sent. Here every answer was scored, and paid spend stays at zero dollars." />
            <p className="caption-2 max-w-[680px] text-muted">
              These panels come from a local run with a short burst of test questions, not production traffic. In the deployed service the sample rate defaults to 5% of answers. The alert thresholds are placeholders until a few weeks of real traffic can tune them.
            </p>
          </div>
        </Section>

        <Section id="limits" title="What did not work, and what is not proven" intro="The failures are part of the result. A portfolio that only shows wins is hard to trust.">
          <ul className="grid gap-4 md:grid-cols-2">
            {limits.map(([t, d]) => (
              <li key={t} className="surface p-6">
                <h3 className="title-3">{t}</h3>
                <p className="body-6 mt-2 text-muted">{d}</p>
              </li>
            ))}
          </ul>
        </Section>

        <Section id="build" band title="Built like a service, not a notebook">
          <div className="grid gap-8 md:grid-cols-5 md:gap-16">
            <ul className="body-3 list-disc space-y-2 pl-6 text-muted marker:text-line-strong md:col-span-3">
              <li>FastAPI backend with argon2 password hashing, short lived tokens with refresh rotation, role based access, rate limits and an audit log.</li>
              <li>A web app that installs like an app, with voice and screenshot input, history, memory with consent and an admin area.</li>
              <li>139 automated tests. GitHub Actions run them on every push and run the evals on a schedule, and a regression gate compares each run with the last good one.</li>
              <li>A container image that runs as a non root user, deployed on a free Render service, with secrets only in the host settings.</li>
              <li>Docs pinned to exact upstream commits, so every eval can be repeated on the same text.</li>
            </ul>
            <div className="md:col-span-2">
              <h3 className="title-3">Stack</h3>
              <ul className="mt-2 flex flex-wrap gap-2" aria-label="Technologies">
                {["Python", "FastAPI", "BM25", "FAISS", "bge small embeddings", "Groq", "Cerebras", "Gemini", "Prometheus", "Grafana", "Docker", "GitHub Actions", "Render"].map((t) => (
                  <li key={t} className="caption-5 rounded-md border border-line-strong px-2 py-1">{t}</li>
                ))}
              </ul>
              <p className="caption-2 mt-6 text-muted">
                Numbers on this page were read from the result files in the repository at commit {ragx.source.commit}, not typed by hand.
              </p>
              <div className="mt-6 flex flex-wrap gap-4">
                <a href={DEMO} target="_blank" rel="noopener noreferrer" className="link body-5 inline-flex items-center gap-2">
                  <ArrowUpRight size={16} aria-hidden /> Live demo
                </a>
                <a href={REPO} target="_blank" rel="noopener noreferrer" className="link body-5 inline-flex items-center gap-2">
                  <GithubLogo size={16} aria-hidden /> View code
                </a>
              </div>
            </div>
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}
