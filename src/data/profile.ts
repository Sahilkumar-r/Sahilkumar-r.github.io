// Single source of truth for all site content. Edit here to update the site.
// To publish a project: set status to "built" or "live" and add `repo` and/or `demo`.

export type Status = "live" | "built" | "in-progress" | "planned";
export type Track = "Data Science & ML" | "Deep Learning" | "NLP" | "LLM Fine-tuning" | "RAG" | "Cloud & Infra";

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

export const tracks: Track[] = ["Data Science & ML", "Deep Learning", "NLP", "LLM Fine-tuning", "RAG", "Cloud & Infra"];

export const profile = {
  name: "Sahil Kumar",
  title: "AI Engineer",
  availability: "Open to Forward Deployed Engineer & AI Engineer roles",
  headline: "Building RAG and LLM systems, end to end.",
  tagline:
    "Recent BS Data Science graduate (FAST NUCES, June 2026) focused on RAG, LLM fine-tuning and the data and cloud engineering needed to ship them.",
  heroSkills: ["RAG & LLMs", "Python & SQL", "PyTorch", "FastAPI", "Docker"],
  email: "sahilrathi.k@gmail.com",
  phone: "+92-333-2530664",
  linkedin: "https://www.linkedin.com/in/sahil-rathi-k",
  github: gh,
  resume: "Sahil_Kumar_Resume.pdf",
  portrait: "images/portrait.webp",
  siteUrl: "https://sahilkumar.runs-on.dev",
  about: [
    "I'm a recent Data Science graduate (BS, FAST NUCES, June 2026) who wants to work where AI meets real customer problems, which is why I'm targeting AI Engineer and Forward Deployed Engineer roles.",
    "My focus is RAG and LLM applications: from simple retrieval to advanced, vectorless and graph-based RAG, with attention to evaluation, memory, security and guardrails, plus fine-tuning and knowledge distillation.",
    "Since graduating I've been studying and building in focused sprints across machine learning and deep learning, data engineering and analytics, NLP, cloud, containers and system design. My project portfolio below is being built in public; each project shows its real status.",
    "At FAST NUCES I worked as a Lab Demonstrator (DSA) and Teaching Assistant (Deep Learning, Parallel & Distributed Computing), explaining hard technical topics to other students.",
  ],
  stats: [
    { value: "3.84", label: "CGPA / 4.00" },
    { value: "3×", label: "Gold Medalist" },
    { value: "2.5 yrs", label: "Teaching assistant experience" },
  ],
  // Working = used in coursework, TA work or public repos. Learning = actively studying now.
  skills: {
    working: [
      { group: "Languages & Data", items: ["Python", "SQL", "C++"] },
      { group: "ML & Deep Learning", items: ["PyTorch", "Hugging Face", "CNNs / RNNs / Transformers"] },
      { group: "LLM & RAG", items: ["LangChain", "LangGraph", "LlamaIndex", "Qdrant", "FAISS", "Chroma"] },
      { group: "APIs & Tools", items: ["FastAPI", "Streamlit", "Docker", "Git & GitHub", "PostgreSQL"] },
    ],
    learning: [
      { group: "Analytics & BI", items: ["R", "Power BI", "Tableau", "Statistics & EDA", "Excel"] },
      { group: "LLM Engineering", items: ["LoRA / QLoRA / DPO", "Knowledge distillation", "Vectorless RAG", "GraphRAG", "RAG evals & guardrails"] },
      { group: "Cloud & DevOps", items: ["AWS (EC2, S3, ECS, EKS)", "Azure", "Kubernetes", "Linux & Bash", "CI/CD", "Microsoft Foundry"] },
      { group: "Data Engineering & Systems", items: ["ETL pipelines", "MySQL", "MongoDB", "Redis", "Graph DBs", "System design", "Networking (TCP/IP, DNS, HTTP)"] },
    ],
  },
  learningNow: [
    { title: "Microsoft Foundry & Azure AI", detail: "Starting hands-on work with Microsoft Foundry and related tooling." },
    { title: "Project sprint", detail: "A two-month sprint turning what I've studied into deployed projects, added below as they ship." },
    { title: "Certifications", detail: "Planning relevant cloud and AI certifications; none completed yet." },
  ],
  projects: [
    {
      slug: "etl-to-deployment",
      title: "End-to-end ML pipeline: data collection to deployed API",
      track: "Data Science & ML",
      status: "planned",
      summary: "Collect data, build an ETL pipeline into a database, run EDA, engineer features, train and evaluate a model, then serve it with separate model, backend and frontend layers.",
      stack: ["Python", "SQL", "Pandas", "scikit-learn", "FastAPI"],
      highlights: ["ETL and storage in SQL", "EDA and feature engineering", "Metric tracking and improvement", "API-served model with a frontend"],
    },
    {
      slug: "bi-dashboard",
      title: "Business analytics dashboards (Power BI & Tableau)",
      track: "Data Science & ML",
      status: "planned",
      summary: "Data cleaning, statistical analysis and visual storytelling on a public dataset, delivered as dashboards.",
      stack: ["SQL", "Python", "Power BI", "Tableau", "Excel"],
      highlights: ["Cleaning and analysis", "KPI dashboards", "Written insights"],
    },
    {
      slug: "ml-from-scratch",
      title: "Machine learning from scratch",
      track: "Data Science & ML",
      status: "built",
      summary: "Core ML algorithms implemented from first principles as part of a multi-day series.",
      stack: ["Python", "NumPy"],
      highlights: ["Algorithms built without ML libraries"],
      repo: `${gh}/Machine-Learning-From-Scratch`,
    },
    {
      slug: "timeseries",
      title: "Time-series forecasting service",
      track: "Deep Learning",
      status: "planned",
      summary: "Forecasting with classical and neural models, evaluated properly and exposed through an API.",
      stack: ["Python", "PyTorch", "FastAPI"],
      highlights: ["Baselines vs neural models", "Backtesting", "Deployed endpoint"],
    },
    {
      slug: "vit-service",
      title: "Image classification with FastAPI and Streamlit",
      track: "Deep Learning",
      status: "built",
      summary: "A vision transformer model served behind a FastAPI backend with a Streamlit frontend.",
      stack: ["PyTorch", "FastAPI", "Streamlit"],
      highlights: ["Separated model, backend and frontend"],
      repo: `${gh}/fastapi-streamlit-vit`,
    },
    {
      slug: "lstm-nlp",
      title: "RNN, gated RNN and LSTM text models",
      track: "NLP",
      status: "built",
      summary: "Gated RNNs from scratch and an LSTM sequence model for next-word prediction on IMDB reviews.",
      stack: ["Python", "PyTorch"],
      highlights: ["Gated RNN from scratch", "Seq2seq next-word prediction"],
      repo: `${gh}/imdb-lstm-seq2seq-nextword`,
    },
    {
      slug: "nlp-deploy",
      title: "Deployed NLP application",
      track: "NLP",
      status: "planned",
      summary: "A text classification or extraction pipeline covering core NLP concepts, packaged and deployed.",
      stack: ["Python", "Hugging Face", "FastAPI", "Docker"],
      highlights: ["Tokenization to modeling", "Containerized deployment"],
    },
    {
      slug: "distillation",
      title: "Knowledge distillation into a small language model",
      track: "LLM Fine-tuning",
      status: "in-progress",
      summary: "Distilling a larger teacher model into a smaller student; early experiments are on GitHub.",
      stack: ["PyTorch", "Hugging Face", "PEFT", "TRL"],
      highlights: ["Teacher-student training", "Evaluation against the teacher"],
      repo: `${gh}/gpt2-distillation-mistral7b`,
    },
    {
      slug: "finetune-multimodal",
      title: "LoRA / QLoRA fine-tuning and a multimodal model",
      track: "LLM Fine-tuning",
      status: "planned",
      summary: "Parameter-efficient fine-tuning of an LLM, then a small vision-language model for document understanding.",
      stack: ["PyTorch", "PEFT", "TRL", "vLLM"],
      highlights: ["SFT and DPO", "Serving with vLLM"],
    },
    {
      slug: "advanced-rag",
      title: "Production-style RAG pipeline",
      track: "RAG",
      status: "built",
      summary: "A RAG pipeline using FastAPI, Inngest, Qdrant Cloud and Groq, designed to run on free-tier infrastructure.",
      stack: ["FastAPI", "Qdrant", "Groq", "Inngest"],
      highlights: ["Vector retrieval", "Free-tier deployable design"],
      repo: `${gh}/First-Production-RAG`,
    },
    {
      slug: "vectorless-graph-rag",
      title: "Vectorless RAG and GraphRAG",
      track: "RAG",
      status: "planned",
      summary: "Comparing vectorless and graph-based retrieval against vector RAG, with evaluation, memory and guardrails.",
      stack: ["Python", "LangGraph", "Graph DB", "RAGAS"],
      highlights: ["Eval comparison", "Conversation memory", "Security and guardrails"],
    },
    {
      slug: "cloud-infra",
      title: "Containerized services on AWS and Kubernetes",
      track: "Cloud & Infra",
      status: "planned",
      summary: "Docker images deployed on AWS (EC2, S3, ECS/EKS) with Kubernetes manifests and RBAC, backed by SQL and NoSQL databases.",
      stack: ["Docker", "Kubernetes", "AWS", "PostgreSQL", "MongoDB", "Redis"],
      highlights: ["Infrastructure setup", "RBAC", "System design write-up"],
    },
  ] as Project[],
  moreRepos: [
    { name: "Simple-RAG", desc: "Local RAG basics: vector DB creation, retrieval and chat history management." },
    { name: "Langgraph-react-agent", desc: "LangGraph agent project." },
    { name: "mcp-multi-server", desc: "Model Context Protocol multi-server project." },
    { name: "Langchain-Basics", desc: "Learning LangChain from the ground up." },
    { name: "Deep-Learning-Basics", desc: "Deep learning fundamentals." },
    { name: "fastapi-basics", desc: "FastAPI fundamentals." },
  ],
  experience: [
    {
      role: "Lab Demonstrator (DSA) & Teaching Assistant (Deep Learning, PDC)",
      org: "FAST NUCES",
      dates: "Jan 2024 – Jun 2026",
      points: [
        "Conducted Data Structures & Algorithms labs on complexity analysis, trees, graphs and dynamic programming with hands-on implementation.",
        "Deep Learning TA: mentored students on CNNs, RNNs and Transformers in PyTorch, covering training, regularization and tuning; graded projects.",
        "PDC TA: taught multithreading, MPI, OpenMP and CUDA, and reviewed assignments on distributed training and scaling compute-heavy workloads.",
      ],
      tags: ["PyTorch", "CUDA", "MPI", "OpenMP", "DSA"],
    },
  ],
  education: {
    degree: "BS Data Science",
    school: "FAST (NUCES) University",
    dates: "2022 – June 2026",
    cgpa: "CGPA 3.84 / 4.00",
    courses: ["Machine Learning", "Deep Learning", "Agentic AI", "MLOps", "Computer Networks", "Big Data Analytics"],
  },
  achievements: ["Gold Medalist (3×)"],
  certifications: "Pursuing relevant cloud and AI certifications; none completed yet.",
};
