// Single source of truth for all site content. Edit here to update the site.
// Copy rules (Skills/SKILL.md): no hyphens in sentences, no filler words, sentence case.
// "{n}" inside a string renders a citation marker that links to source n in `sources`.
// To publish a project: set status to "built" or "live" and add `repo` and/or `demo`.

export type Status = "live" | "built" | "in-progress" | "planned";
export type Track = "Data science and ML" | "Deep learning" | "NLP" | "LLM fine tuning" | "RAG" | "Cloud and infrastructure";

export type Project = {
  slug: string;
  title: string;
  track: Track;
  status: Status;
  summary: string;
  stack: string[];
  highlights: string[];
  repo?: string;
  demo?: string;
};

const gh = "https://github.com/Sahilkumar-r";

export const statusLabel: Record<Status, string> = {
  live: "Live demo",
  built: "Code on GitHub",
  "in-progress": "In progress",
  planned: "Planned",
};

export const tracks: Track[] = ["Data science and ML", "Deep learning", "NLP", "LLM fine tuning", "RAG", "Cloud and infrastructure"];

export const sources = [
  {
    n: 1,
    title: "Resume (PDF)",
    detail: "Education, CGPA, the teaching assistant role and the Gold Medalist award.",
    href: "/Sahil_Kumar_Resume.pdf",
    label: "Sahil_Kumar_Resume.pdf",
  },
  {
    n: 2,
    title: "rag-demo repository: README and evaluation",
    detail: "Retrieval results on 30 hand written questions, the limitations, and the 17 tests.",
    href: `${gh}/rag-demo`,
    label: "github.com/Sahilkumar-r/rag-demo",
  },
  {
    n: 3,
    title: "GitHub profile",
    detail: "Repository and contribution counts, from a snapshot of the public profile.",
    href: gh,
    label: "github.com/Sahilkumar-r",
  },
];

export const profile = {
  name: "Sahil Kumar",
  title: "AI Engineer",
  availability: "Open to AI Engineer and Forward Deployed Engineer roles",
  heroLines: ["Sahil Kumar builds", "AI systems that", "cite their sources."],
  subheading:
    "Recent Data Science graduate (BS, FAST NUCES, June 2026) focused on retrieval augmented generation. Open to AI Engineer and Forward Deployed Engineer roles.",
  proof:
    "3.84 CGPA and a three time Gold Medalist.{1} My RAG demo found a correct page in its top five results for all 30 test questions.{2}",
  email: "sahilrathi.k@gmail.com",
  phone: "+92 333 2530664",
  phoneHref: "+923332530664",
  linkedin: "https://www.linkedin.com/in/sahil-rathi-k",
  github: gh,
  resume: "Sahil_Kumar_Resume.pdf",
  portrait: "images/portrait.webp",
  siteUrl: "https://sahilkumar.runs-on.dev",
  tagline:
    "I build AI systems that answer from real sources, say when they do not know, and show the measurements behind every claim.",
  benefits: [
    {
      title: "Answers you can check",
      text: "I build retrieval augmented generation (RAG) systems that cite the passages they used and refuse when the documents do not cover the question.{2}",
    },
    {
      title: "Measured before it ships",
      text: "My RAG demo compares four retrieval modes on 30 hand written questions. A reranker that made results worse was left out. The question set is small and the demo is not deployed yet.{2}",
    },
    {
      title: "Explains clearly",
      text: "For two and a half years I taught students CNNs, RNNs, Transformers, data structures and parallel computing as a lab demonstrator and teaching assistant.{1}",
    },
    {
      title: "Builds past the notebook",
      text: "The RAG demo comes with a FastAPI backend, a rate limit, 17 automated tests and a Dockerfile.{2}",
    },
  ],
  skills: {
    working: [
      { group: "Languages and data", items: ["Python", "SQL", "C++"] },
      { group: "ML and deep learning", items: ["PyTorch", "Hugging Face", "CNNs, RNNs and Transformers"] },
      { group: "LLM and RAG", items: ["LangChain", "LangGraph", "LlamaIndex", "Qdrant", "FAISS", "Chroma"] },
      { group: "APIs and tools", items: ["FastAPI", "Streamlit", "Docker", "Git and GitHub", "PostgreSQL"] },
    ],
    learning: [
      { group: "Analytics and BI", items: ["R", "Power BI", "Tableau", "Statistics and EDA", "Excel"] },
      { group: "LLM engineering", items: ["LoRA, QLoRA and DPO", "Knowledge distillation", "Vectorless RAG", "GraphRAG", "RAG evaluation and guardrails"] },
      { group: "Cloud and DevOps", items: ["AWS (EC2, S3, ECS, EKS)", "Azure", "Kubernetes", "Linux and Bash", "CI and CD", "Microsoft Foundry"] },
      { group: "Data engineering and systems", items: ["ETL pipelines", "MySQL", "MongoDB", "Redis", "Graph databases", "System design", "Networking basics"] },
    ],
  },
  learningNow: [
    { title: "Microsoft Foundry and Azure AI", detail: "Starting hands on work with Microsoft Foundry and related tooling." },
    { title: "A two month project sprint", detail: "Turning what I have studied into deployed projects, added to this page as they ship." },
  ],
  projects: [
    {
      slug: "fastapi-docs-rag",
      title: "FastAPI Docs Assistant: RAG with citations",
      track: "RAG",
      status: "built",
      summary:
        "Answers questions about the FastAPI documentation from retrieved passages, cites each source and refuses when the docs do not cover the question. Not deployed yet. You can run it locally from the repository.{2}",
      stack: ["Python", "FastAPI", "BM25", "Dense embeddings", "Groq", "Docker"],
      highlights: [
        "Four retrieval modes compared on 30 hand written questions. Hybrid search (keyword plus dense) did best, with a mean reciprocal rank of 0.89.{2}",
        "A reranker lowered results on this question set, so it is off by default.{2}",
        "Off topic questions are refused. The cutoff was tuned on 38 questions, so it may not carry over to other documents.{2}",
        "17 automated tests, a rate limited API and a Dockerfile.{2}",
      ],
      repo: `${gh}/rag-demo`,
    },
    {
      slug: "etl-to-deployment",
      title: "End to end ML pipeline, from data collection to a deployed API",
      track: "Data science and ML",
      status: "planned",
      summary: "Collect data, build an ETL pipeline into a database, run EDA, engineer features, train and evaluate a model, then serve it with separate model, backend and frontend layers.",
      stack: ["Python", "SQL", "Pandas", "scikit-learn", "FastAPI"],
      highlights: ["ETL and storage in SQL", "EDA and feature engineering", "Metric tracking and improvement", "A model served by an API with a frontend"],
    },
    {
      slug: "bi-dashboard",
      title: "Business analytics dashboards in Power BI and Tableau",
      track: "Data science and ML",
      status: "planned",
      summary: "Data cleaning, statistical analysis and visual storytelling on a public dataset, delivered as dashboards.",
      stack: ["SQL", "Python", "Power BI", "Tableau", "Excel"],
      highlights: ["Cleaning and analysis", "KPI dashboards", "Written insights"],
    },
    {
      slug: "ml-from-scratch",
      title: "Machine learning from scratch",
      track: "Data science and ML",
      status: "built",
      summary: "Core ML algorithms implemented from first principles as part of a multi day series.",
      stack: ["Python", "NumPy"],
      highlights: ["Algorithms built without ML libraries"],
      repo: `${gh}/Machine-Learning-From-Scratch`,
    },
    {
      slug: "timeseries",
      title: "Time series forecasting service",
      track: "Deep learning",
      status: "planned",
      summary: "Forecasting with classical and neural models, evaluated properly and exposed through an API.",
      stack: ["Python", "PyTorch", "FastAPI"],
      highlights: ["Baselines against neural models", "Backtesting", "A deployed endpoint"],
    },
    {
      slug: "vit-service",
      title: "Image classification with FastAPI and Streamlit",
      track: "Deep learning",
      status: "built",
      summary: "A vision transformer model served behind a FastAPI backend with a Streamlit frontend.",
      stack: ["PyTorch", "FastAPI", "Streamlit"],
      highlights: ["Separate model, backend and frontend"],
      repo: `${gh}/fastapi-streamlit-vit`,
    },
    {
      slug: "lstm-nlp",
      title: "RNN, gated RNN and LSTM text models",
      track: "NLP",
      status: "built",
      summary: "Gated RNNs from scratch and an LSTM sequence model for next word prediction on IMDB reviews.",
      stack: ["Python", "PyTorch"],
      highlights: ["A gated RNN from scratch", "Sequence to sequence next word prediction"],
      repo: `${gh}/imdb-lstm-seq2seq-nextword`,
    },
    {
      slug: "nlp-deploy",
      title: "Deployed NLP application",
      track: "NLP",
      status: "planned",
      summary: "A text classification or extraction pipeline covering core NLP concepts, packaged and deployed.",
      stack: ["Python", "Hugging Face", "FastAPI", "Docker"],
      highlights: ["Tokenization through modeling", "Containerized deployment"],
    },
    {
      slug: "distillation",
      title: "Knowledge distillation into a small language model",
      track: "LLM fine tuning",
      status: "in-progress",
      summary: "Distilling a larger teacher model into a smaller student. Early experiments are on GitHub.",
      stack: ["PyTorch", "Hugging Face", "PEFT", "TRL"],
      highlights: ["Teacher and student training", "Evaluation against the teacher"],
      repo: `${gh}/gpt2-distillation-mistral7b`,
    },
    {
      slug: "finetune-multimodal",
      title: "LoRA and QLoRA fine tuning, then a multimodal model",
      track: "LLM fine tuning",
      status: "planned",
      summary: "Parameter efficient fine tuning of an LLM, then a small vision language model for document understanding.",
      stack: ["PyTorch", "PEFT", "TRL", "vLLM"],
      highlights: ["SFT and DPO", "Serving with vLLM"],
    },
    {
      slug: "advanced-rag",
      title: "RAG pipeline on free tier infrastructure",
      track: "RAG",
      status: "built",
      summary: "A RAG pipeline using FastAPI, Inngest, Qdrant Cloud and Groq, designed to run on free tier services.",
      stack: ["FastAPI", "Qdrant", "Groq", "Inngest"],
      highlights: ["Vector retrieval", "A design that fits free tier limits"],
      repo: `${gh}/First-Production-RAG`,
    },
    {
      slug: "vectorless-graph-rag",
      title: "Vectorless RAG and GraphRAG",
      track: "RAG",
      status: "planned",
      summary: "Comparing vectorless and graph based retrieval against vector RAG, with evaluation, memory and guardrails.",
      stack: ["Python", "LangGraph", "Graph database", "RAGAS"],
      highlights: ["An evaluation comparison", "Conversation memory", "Security and guardrails"],
    },
    {
      slug: "cloud-infra",
      title: "Containerized services on AWS and Kubernetes",
      track: "Cloud and infrastructure",
      status: "planned",
      summary: "Docker images deployed on AWS (EC2, S3, ECS and EKS) with Kubernetes manifests and RBAC, backed by SQL and NoSQL databases.",
      stack: ["Docker", "Kubernetes", "AWS", "PostgreSQL", "MongoDB", "Redis"],
      highlights: ["Infrastructure setup", "RBAC", "A system design write up"],
    },
  ] as Project[],
  moreRepos: [
    { name: "Simple-RAG", desc: "Local RAG basics: vector database creation, retrieval and chat history." },
    { name: "Langgraph-react-agent", desc: "A LangGraph agent project." },
    { name: "mcp-multi-server", desc: "A Model Context Protocol multi server project." },
    { name: "Langchain-Basics", desc: "Learning LangChain from the ground up." },
    { name: "Deep-Learning-Basics", desc: "Deep learning fundamentals." },
    { name: "fastapi-basics", desc: "FastAPI fundamentals." },
  ],
  experience: [
    {
      role: "Lab demonstrator (DSA) and teaching assistant (Deep Learning, PDC)",
      org: "FAST NUCES",
      dates: "Jan 2024 to Jun 2026",
      points: [
        "Ran Data Structures and Algorithms labs on complexity analysis, trees, graphs and dynamic programming, with hands on implementation.{1}",
        "As Deep Learning TA, mentored students on CNNs, RNNs and Transformers in PyTorch, covering training, regularization and tuning, and graded projects.{1}",
        "As PDC TA, taught multithreading, MPI, OpenMP and CUDA, and reviewed assignments on distributed training and scaling compute heavy workloads.{1}",
      ],
      tags: ["PyTorch", "CUDA", "MPI", "OpenMP", "DSA"],
    },
  ],
  education: {
    degree: "BS Data Science",
    school: "FAST (NUCES) University",
    dates: "2022 to June 2026",
    cgpa: "CGPA 3.84 out of 4.00.{1}",
    courses: ["Machine Learning", "Deep Learning", "Agentic AI", "MLOps", "Computer Networks", "Big Data Analytics"],
  },
  achievements: ["Gold Medalist, three times.{1}"],
  certifications: "None completed yet. I am planning cloud and AI certifications.",
  faq: [
    {
      q: "Which roles are you looking for?",
      a: "AI Engineer and Forward Deployed Engineer roles, mainly around RAG and LLM applications.",
    },
    {
      q: "What have you actually built?",
      a: "Five projects have code on GitHub and one is in progress. The rest are planned and labelled that way in the project list. The most complete is the RAG demo.{2}",
    },
    {
      q: "Is the RAG demo live?",
      a: "Not yet. The code, tests and evaluation are public and you can run it locally. When it is deployed, its link will be added to the project and the status will change to live.{2}",
    },
    {
      q: "How was the RAG demo evaluated?",
      a: "Retrieval was scored on 30 hand written questions, each mapped to the documentation page that answers it. Hybrid search found a correct page in the top five results every time. The set is small and I wrote it myself, so treat the numbers as indicative.{2}",
    },
    {
      q: "Where do the numbers on this page come from?",
      a: "Each one carries a marker that links to its source at the bottom of the page: my resume, the RAG demo repository and my GitHub profile.{1}{2}{3}",
    },
  ],
};
