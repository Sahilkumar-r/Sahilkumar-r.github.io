// Single source of truth for all site content. Edit here to update the site.
// Copy rules (Skills/SKILL.md): no hyphens in sentences, no filler words, sentence case.
//
// To finish a project: set status to "done", add `repo` and `demo` URLs, and fill in `results`
// with real numbers. Only write results you measured. Planned projects use `measure` instead.

export type Status = "done" | "in-progress" | "planned";
export type Track =
  | "Data science and ML"
  | "Deep learning"
  | "NLP"
  | "LLM fine tuning"
  | "RAG"
  | "LLM applications"
  | "Cloud and infrastructure";

export type Project = {
  slug: string;
  title: string;
  track: Track;
  status: Status;
  /** The original problem, in one or two sentences. */
  problem: string;
  /** What I built (or, for planned projects, what I will build). */
  built: string;
  /** Measured outcomes for done and in progress projects. Real numbers only. */
  results?: string[];
  /** What will be measured, for planned projects. */
  measure?: string;
  stack: string[];
  repo?: string;
  demo?: string;
};

const gh = "https://github.com/Sahilkumar-r";

export const statusLabel: Record<Status, string> = {
  done: "Done",
  "in-progress": "In progress",
  planned: "Planned",
};

export const statusFilters = ["All", "Done", "In progress", "Planned"] as const;
export type StatusFilter = (typeof statusFilters)[number];
export const statusOfFilter: Record<Exclude<StatusFilter, "All">, Status> = {
  Done: "done",
  "In progress": "in-progress",
  Planned: "planned",
};

export const tracks: Track[] = [
  "Data science and ML",
  "Deep learning",
  "NLP",
  "LLM fine tuning",
  "RAG",
  "LLM applications",
  "Cloud and infrastructure",
];

export const profile = {
  name: "Sahil Kumar",
  title: "AI Engineer",
  availability: "Open to AI Engineer and Forward Deployed Engineer roles",
  heroLines: ["Sahil Kumar builds", "AI systems that", "cite their sources."],
  subheading:
    "Recent Data Science graduate (BS, FAST NUCES, June 2026) focused on retrieval augmented generation. Open to AI Engineer and Forward Deployed Engineer roles.",
  proof:
    "3.84 CGPA and a three time Gold Medalist. My RAG demo found a correct page in its top five results for all 30 test questions.",
  email: "sahilrathi.k@gmail.com",
  phone: "+92 333 2530664",
  phoneHref: "+923332530664",
  linkedin: "https://www.linkedin.com/in/sahil-rathi-k",
  github: gh,
  githubUser: "Sahilkumar-r",
  resume: "Sahil_Kumar_Resume.pdf",
  portrait: "images/portrait.webp",
  siteUrl: "https://sahilkumar.runs-on.dev",
  tagline:
    "I build AI systems that answer from real sources, say when they do not know, and show the measurements behind every claim.",
  benefits: [
    {
      title: "Answers you can check",
      text: "I build retrieval augmented generation (RAG) systems that cite the passages they used and refuse when the documents do not cover the question.",
    },
    {
      title: "Measured before it ships",
      text: "My RAG demo compares four retrieval modes on 30 hand written questions. A reranker that made results worse was left out. The question set is small and the demo is not deployed yet.",
    },
    {
      title: "Explains clearly",
      text: "For two and a half years I taught students CNNs, RNNs, Transformers, data structures and parallel computing as a lab demonstrator and teaching assistant.",
    },
    {
      title: "Builds past the notebook",
      text: "I ship APIs, tests and containers with the models: FastAPI services, rate limits, guardrails, tracing and Dockerfiles.",
    },
  ],
  // All skills in one list. No levels are shown because none have been measured or certified.
  skills: [
    { group: "Languages", items: ["Python", "SQL", "R", "C++", "Bash"] },
    {
      group: "Machine learning and deep learning",
      items: [
        "Machine learning from scratch", "scikit-learn", "PyTorch", "Hugging Face", "CNNs", "RNNs and LSTMs", "Transformers",
        "Time series", "Transfer learning", "Generative models", "Reinforcement learning", "NumPy", "Pandas",
      ],
    },
    {
      group: "LLMs and RAG",
      items: [
        "LLM fine tuning (LoRA, QLoRA, SFT, DPO)", "Knowledge distillation", "Small language models and multimodal models",
        "Advanced RAG (hybrid search, reranking)", "Vectorless RAG", "GraphRAG", "Agentic AI", "LangChain", "LangGraph",
        "LlamaIndex", "LiteLLM", "LangSmith", "vLLM", "Model Context Protocol", "RAG evaluation (RAGAS, DeepEval)",
        "Guardrails (NeMo, Llama Guard)",
      ],
    },
    { group: "Vector databases", items: ["Qdrant", "FAISS", "Chroma", "Pinecone", "pgvector"] },
    {
      group: "Databases",
      items: ["PostgreSQL", "MySQL", "MongoDB", "Redis", "Graph databases", "Key value stores", "Column stores"],
    },
    {
      group: "Data engineering and analytics",
      items: [
        "ETL pipelines", "Data cleaning", "Exploratory data analysis", "Feature engineering", "Statistical analysis",
        "Power BI", "Tableau", "Excel", "Streamlit",
      ],
    },
    {
      group: "APIs and system design",
      items: ["FastAPI", "GraphQL", "REST", "Microservices", "Async processing", "Caching", "System design"],
    },
    {
      group: "Cloud and DevOps",
      items: [
        "Docker", "Kubernetes", "AWS (EC2, S3, ECS, EKS, RBAC)", "Azure", "Microsoft Foundry", "GitHub Actions", "MLflow",
        "Weights and Biases", "DVC", "Linux", "Git and GitHub",
      ],
    },
    {
      group: "Computer science",
      items: ["Data structures and algorithms", "Networking (TCP/IP, DNS, HTTP)", "Multithreading", "MPI", "OpenMP", "CUDA"],
    },
  ],
  projects: [
    // ---------- Done ----------
    {
      slug: "fastapi-docs-rag",
      title: "FastAPI Docs Assistant: RAG that cites sources and says when it does not know",
      track: "RAG",
      status: "done",
      problem:
        "Developers lose time searching documentation, and a basic RAG chatbot answers with confidence even when the documents do not cover the question.",
      built:
        "Hybrid retrieval (BM25 keyword search plus dense embeddings, fused by reciprocal rank), answers with citations, a relevance guardrail that refuses off topic questions, a prompt injection check, a rate limited FastAPI service, a chat UI, 17 automated tests and a Dockerfile.",
      results: [
        "Found a correct documentation page in the top five results for all 30 test questions (hit@5 1.00, mean reciprocal rank 0.89), against 0.90 and 0.77 for keyword search alone.",
        "Measured an off the shelf reranker, saw it lower results (0.82), and left it out.",
        "Refused all 8 off topic test questions and wrongly refused none of the 30 real ones. The cutoff was tuned on the same 38 questions, so it may not carry over to other documents.",
        "Retrieval on CPU takes about 9 ms at the median (13 ms at the 95th percentile) for hybrid search. The reranker takes about 1.9 s (3.7 s at the 95th percentile), which is another reason it stays off.",
      ],
      stack: ["Python", "FastAPI", "BM25", "Dense embeddings", "Groq", "Docker"],
      repo: `${gh}/rag-demo`,
    },
    {
      slug: "multimodal-rag-agent",
      title: "Multimodal RAG agent with Corrective RAG and guardrails",
      track: "RAG",
      status: "done",
      problem:
        "Real questions span PDFs, slides, spreadsheets, scanned pages and images, and depending on one model provider is a single point of failure.",
      built:
        "A LangGraph supervisor and sub agent system that ingests documents and images (with OCR for scans), retrieves with hybrid chunking, reciprocal rank fusion and a reranker, and corrects weak retrievals with Corrective RAG. Every model call goes through a LiteLLM gateway to OpenAI, Anthropic and xAI, with DeepEval guardrails and LangSmith tracing.",
      results: [
        "Works end to end across three model providers behind one gateway, with guardrails and tracing on every turn.",
        "Offline unit tests cover retrieval fusion, hashing, metadata and parsing helpers. No retrieval benchmark has been run yet.",
      ],
      stack: ["LangGraph", "LiteLLM", "Pinecone", "DeepEval", "LangSmith", "OCR"],
      repo: `${gh}/multimodel-agent`,
    },
    {
      slug: "gpt2-distillation",
      title: "Cross tokenizer knowledge distillation: GPT-2 from Mistral 7B",
      track: "LLM fine tuning",
      status: "done",
      problem:
        "Distilling a large model into a small one needs the same tokens on both sides, but GPT-2 and Mistral use different tokenizers, so there is no one to one mapping.",
      built:
        "A distillation pipeline that matches the 21,366 tokens the two vocabularies share, aligns teacher and student positions by character boundary, and trains with a KL term plus cross entropy. The 4 bit teacher and the student train on a single free Colab T4 GPU, and the model is published on Hugging Face.",
      results: [
        "99% of student positions received a teacher target, and on aligned positions the teacher's top one accuracy was 36.7% against 33.6% for the untrained student, which confirms the alignment is correct.",
        "Test perplexity on WikiText 2 went from 28.98 to 29.64, so this run did not improve the student. The write up says so plainly and lists next steps.",
      ],
      stack: ["PyTorch", "Hugging Face", "bitsandbytes", "Colab"],
      repo: `${gh}/gpt2-distillation-mistral7b`,
    },
    {
      slug: "multi-llm-chatbot",
      title: "Multi provider chatbot with input and output guardrails",
      track: "LLM applications",
      status: "done",
      problem:
        "A chatbot must switch between model providers and stop jailbreaks, prompt injection, toxic replies and data leaks without trusting any one model.",
      built:
        "A LangGraph chatbot behind a LiteLLM gateway with retries and timeouts, runtime switching between OpenAI, Grok and Anthropic, DeepEval guardrails on both the user message and the reply, and LangSmith tracing.",
      results: [
        "Messages scoring below the 0.7 safety threshold are blocked before reaching the model or the user.",
        "The guardrails fail closed: if the judge model is unavailable, the message is blocked. No formal evaluation has been run yet.",
      ],
      stack: ["LangGraph", "LiteLLM", "DeepEval", "LangSmith"],
      repo: `${gh}/langgraph-multi-llm-chatbot`,
    },
    {
      slug: "first-production-rag",
      title: "RAG pipeline built for free tier infrastructure",
      track: "RAG",
      status: "done",
      problem: "Most RAG tutorials need paid infrastructure, which makes them hard to deploy and show.",
      built:
        "A RAG backend with FastAPI, durable workflows in Inngest, a Qdrant Cloud vector store and Groq for generation, plus a Streamlit front end, all chosen to fit free tier limits.",
      results: ["The pipeline and the front end are in the repository. No evaluation numbers have been recorded yet."],
      stack: ["FastAPI", "Inngest", "Qdrant", "Groq", "Streamlit"],
      repo: `${gh}/First-Production-RAG`,
    },
    {
      slug: "vit-service",
      title: "Vision Transformer image classifier as a service",
      track: "Deep learning",
      status: "done",
      problem: "A pretrained vision model in a notebook is not something a user can try.",
      built:
        "A FastAPI backend serving the open Vision Transformer google/vit-base-patch16-224 and a Streamlit app where you upload a picture and get the top five ImageNet classes with confidence. The model can be swapped through an environment variable.",
      results: ["Runs end to end from upload to prediction. It is limited to the 1,000 ImageNet classes, and I have not benchmarked accuracy myself."],
      stack: ["PyTorch", "Hugging Face", "FastAPI", "Streamlit"],
      repo: `${gh}/fastapi-streamlit-vit`,
    },
    {
      slug: "ml-from-scratch",
      title: "Machine learning algorithms from scratch",
      track: "Data science and ML",
      status: "done",
      problem: "Using library models without knowing the maths behind them makes tuning and debugging guesswork.",
      built:
        "Fifteen NumPy implementations: linear regression (ordinary least squares, gradient descent, ridge and lasso variants), polynomial regression, logistic regression, KNN, SVM, Gaussian naive Bayes, decision tree, random forest and PCA.",
      results: [
        "Benchmarked against scikit-learn over 5 random 80/20 splits. Accuracy is within about 1 point on most runs: logistic regression 97.5% vs 98.1% and KNN 97.4% vs 97.4% on breast cancer, Gaussian naive Bayes 97.8% vs 97.8% on wine.",
        "Multiple linear regression matches scikit-learn exactly on diabetes (R² 0.418, RMSE 55.9) and PCA matches its explained variance to 7e-17.",
        "Trees trail on the small wine set: decision tree 91.7% vs 93.9%, random forest 95.0% vs 97.2%. They are also far slower, 8.6 s against 0.014 s for a 10 tree forest on breast cancer.",
      ],
      stack: ["Python", "NumPy"],
      repo: `${gh}/Machine-Learning-From-Scratch`,
    },
    {
      slug: "bagging-studio",
      title: "Bagging Ensemble Studio",
      track: "Data science and ML",
      status: "done",
      problem: "Trying bagging on a new dataset normally means writing code for every experiment.",
      built:
        "A Streamlit app where you upload a CSV, pick the target and features, choose a base model (decision tree, linear or logistic regression, ridge, lasso or SVM), tune the number of estimators, sample sizes and bootstrapping, and evaluate with a train test split or K fold cross validation, for classification or regression.",
      results: ["Turns a CSV into a validated bagging model with no code. No benchmark on a named dataset has been recorded."],
      stack: ["Python", "Streamlit", "scikit-learn"],
      repo: `${gh}/bagging-ensemble-studio`,
    },
    {
      slug: "voting-studio",
      title: "Voting Ensemble Studio",
      track: "Data science and ML",
      status: "done",
      problem: "Comparing hard and soft voting across different algorithms needs a lot of repeated setup code.",
      built:
        "A Streamlit app that combines decision trees, linear models, SVMs and KNN into a voting ensemble, with hard or soft voting, and evaluates it with a train test split or K fold cross validation.",
      results: ["Lets you compare voting strategies on any CSV in minutes. No benchmark on a named dataset has been recorded."],
      stack: ["Python", "Streamlit", "scikit-learn"],
      repo: `${gh}/voting-ensemble-studio`,
    },
    {
      slug: "mcp-multi-server",
      title: "Model Context Protocol: two servers, one client",
      track: "LLM applications",
      status: "done",
      problem: "Agents need tools from more than one source, and the client has to know which server owns each tool.",
      built:
        "Two MCP servers (math tools and text tools) and a client that launches both over stdio, lists their tools and routes each call to the right server.",
      results: ["Calls are routed correctly across both servers. It is a small demonstration, not a production system."],
      stack: ["Python", "FastMCP"],
      repo: `${gh}/mcp-multi-server`,
    },
    {
      slug: "spendly",
      title: "Spendly expense tracker",
      track: "LLM applications",
      status: "done",
      problem: "Personal spending is hard to see without a simple tracker.",
      built:
        "A web app with a database layer, server rendered pages and automated tests, built with Claude Code while following a CampusX tutorial, with features added through a spec, plan and ship workflow.",
      results: ["Working app with tests in the repository. It follows a tutorial, so treat it as practice with an AI assisted workflow."],
      stack: ["Python", "SQL", "Claude Code"],
      repo: `${gh}/Spendly`,
    },
    // ---------- In progress ----------
    {
      slug: "lstm-next-word",
      title: "LSTM next word predictor with Luong attention",
      track: "NLP",
      status: "in-progress",
      problem: "Predicting the next words of a movie review needs a model that remembers long context.",
      built:
        "A 12 layer encoder and 12 layer decoder LSTM with residual connections, layer norm, Luong attention and tied embeddings (about 18 million parameters), trained on IMDB reviews. Reviews are deduplicated and split before windowing so no test text leaks into training, and the vocabulary comes from the training split only.",
      results: ["The model and pipeline are written. Perplexity and top k accuracy will be added once training finishes."],
      stack: ["PyTorch", "Colab"],
      repo: `${gh}/imdb-lstm-seq2seq-nextword`,
    },
    {
      slug: "deep-gated-rnn",
      title: "Deep gated RNN for sentiment classification",
      track: "NLP",
      status: "in-progress",
      problem: "Deep recurrent networks are hard to train, and I wanted to see what makes depth workable.",
      built:
        "A four block residual bidirectional GRU with layer norm, attention and max pooling, padding aware pooling and a one cycle learning rate, trained from scratch on 50,000 IMDB reviews.",
      results: ["The model and training loop are written. Test accuracy will be added after the run."],
      stack: ["PyTorch"],
      repo: `${gh}/gated-rnn-from-scratch`,
    },
    // ---------- Planned ----------
    {
      slug: "churn-pipeline",
      title: "Customer churn prediction: from raw data to a deployed API",
      track: "Data science and ML",
      status: "planned",
      problem: "Churn models often fail in production because the data pipeline, features and serving are built separately and drift apart.",
      built: "ETL from raw files into PostgreSQL, exploratory analysis, feature engineering, model comparison with cross validation, and a FastAPI service with a frontend, with model, backend and frontend separated.",
      measure: "ROC AUC, precision and recall at the chosen threshold, and API latency, each compared with a simple baseline.",
      stack: ["Python", "SQL", "PostgreSQL", "scikit-learn", "FastAPI"],
    },
    {
      slug: "bi-dashboards",
      title: "Sales analytics dashboards in Power BI and Tableau",
      track: "Data science and ML",
      status: "planned",
      problem: "Business teams need answers from messy sales data, not raw tables.",
      built: "Clean and model a public sales dataset with SQL and Python, then build the same KPI dashboards in Power BI and Tableau with written insights.",
      measure: "Which business questions each dashboard answers, data quality checks passed, and refresh time.",
      stack: ["SQL", "Python", "Power BI", "Tableau", "Excel"],
    },
    {
      slug: "demand-forecasting",
      title: "Demand forecasting service",
      track: "Deep learning",
      status: "planned",
      problem: "Forecasts that are not tested against a simple baseline can look good and still be worse than guessing last week's value.",
      built: "Classical and neural forecasting models, rolling origin backtesting, and a deployed forecasting endpoint.",
      measure: "MAPE and RMSE against a seasonal naive baseline across backtest windows.",
      stack: ["Python", "PyTorch", "FastAPI"],
    },
    {
      slug: "cnn-transfer-learning",
      title: "CNN image classifier with transfer learning, deployed",
      track: "Deep learning",
      status: "planned",
      problem: "Small image datasets overfit when a CNN is trained from scratch.",
      built: "Fine tune a pretrained CNN on a small labelled dataset, compare it with a CNN trained from scratch, and serve it behind an API in a container.",
      measure: "Held out accuracy and per class F1 for both models, plus inference latency.",
      stack: ["PyTorch", "FastAPI", "Docker"],
    },
    {
      slug: "nlp-service",
      title: "Text classification service: LSTM against Transformer",
      track: "NLP",
      status: "planned",
      problem: "Choosing between a small recurrent model and a pretrained Transformer is usually done on instinct.",
      built: "Train both on the same labelled text task, package the better one as a containerized API.",
      measure: "Accuracy and F1 on a held out set, latency and cost per 1,000 requests for each model.",
      stack: ["Python", "PyTorch", "Hugging Face", "FastAPI", "Docker"],
    },
    {
      slug: "lora-finetune",
      title: "LoRA and QLoRA fine tuning of a small LLM for one domain task",
      track: "LLM fine tuning",
      status: "planned",
      problem: "General models are mediocre at narrow tasks, and full fine tuning is too expensive for most teams.",
      built: "Parameter efficient fine tuning with SFT then DPO on a domain dataset, served with vLLM.",
      measure: "Task accuracy and LLM as judge win rate against the base model, GPU memory used and tokens per second.",
      stack: ["PyTorch", "PEFT", "TRL", "vLLM"],
    },
    {
      slug: "multimodal-slm",
      title: "Small multimodal model for document extraction",
      track: "LLM fine tuning",
      status: "planned",
      problem: "OCR plus a large language model is slow and costly for extracting fields from invoices and forms.",
      built: "Fine tune a small vision language model to extract structured fields and compare it with an OCR plus LLM baseline.",
      measure: "Field level extraction accuracy and cost per document against the baseline.",
      stack: ["PyTorch", "PEFT", "Hugging Face", "vLLM"],
    },
    {
      slug: "vectorless-graph-rag",
      title: "Vectorless RAG and GraphRAG compared with vector RAG",
      track: "RAG",
      status: "planned",
      problem: "Vector search misses questions that depend on structure and relationships between facts.",
      built: "Build vectorless and graph based retrieval over the same documents as a vector baseline and evaluate all three.",
      measure: "hit@k and mean reciprocal rank, answer faithfulness (RAGAS), latency and cost per query.",
      stack: ["Python", "LangGraph", "Graph database", "RAGAS"],
    },
    {
      slug: "rag-memory-security",
      title: "RAG with conversation memory, security and guardrails",
      track: "RAG",
      status: "planned",
      problem: "A RAG assistant that remembers users also has to resist prompt injection and avoid leaking personal data.",
      built: "Add memory, prompt injection defences, PII redaction and output guardrails to a RAG service, with automated attack tests.",
      measure: "Prompt injection block rate, PII leaks found by tests, and faithfulness with the guardrails on and off.",
      stack: ["Python", "FastAPI", "NeMo Guardrails", "RAGAS"],
    },
    {
      slug: "aws-kubernetes",
      title: "Containerized AI services on AWS and Kubernetes",
      track: "Cloud and infrastructure",
      status: "planned",
      problem: "A service that works on a laptop still has to be deployed, secured and scaled.",
      built: "Deploy a containerized API on AWS (EC2, S3, ECS and EKS) with Kubernetes manifests, RBAC and CI and CD through GitHub Actions.",
      measure: "Deploy time, p95 latency under load, and monthly cost.",
      stack: ["Docker", "Kubernetes", "AWS", "GitHub Actions"],
    },
    {
      slug: "polyglot-data-layer",
      title: "System design case study: SQL and NoSQL data layer",
      track: "Cloud and infrastructure",
      status: "planned",
      problem: "No single database fits every access pattern, and teams often pick one by habit.",
      built: "Model one product across PostgreSQL, MongoDB, Redis and a graph database, and write down which access patterns each serves best.",
      measure: "Query latency for each access pattern on each database.",
      stack: ["PostgreSQL", "MongoDB", "Redis", "Graph database"],
    },
  ] as Project[],
  moreRepos: [
    { name: "Simple-RAG", desc: "Local RAG basics: vector database creation, retrieval and chat history." },
    { name: "Langgraph-react-agent", desc: "A LangGraph agent project." },
    { name: "Langchain-Basics", desc: "Learning LangChain from the ground up." },
    { name: "Deep-Learning-Basics", desc: "Deep learning fundamentals." },
    { name: "fastapi-basics", desc: "A minimal FastAPI app with in memory CRUD." },
  ],
  experience: [
    {
      role: "Lab demonstrator (DSA) and teaching assistant (Deep Learning, PDC)",
      org: "FAST NUCES",
      dates: "Jan 2024 to Jun 2026",
      points: [
        "Ran Data Structures and Algorithms labs on complexity analysis, trees, graphs and dynamic programming, with hands on implementation.",
        "As Deep Learning TA, mentored students on CNNs, RNNs and Transformers in PyTorch, covering training, regularization and tuning, and graded projects.",
        "As PDC TA, taught multithreading, MPI, OpenMP and CUDA, and reviewed assignments on distributed training and scaling compute heavy workloads.",
      ],
      tags: ["PyTorch", "CUDA", "MPI", "OpenMP", "DSA"],
    },
  ],
  education: {
    degree: "BS Data Science",
    school: "FAST (NUCES) University",
    dates: "2022 to June 2026",
    cgpa: "CGPA 3.84 out of 4.00",
    courses: ["Machine Learning", "Deep Learning", "Agentic AI", "MLOps", "Computer Networks", "Big Data Analytics"],
  },
  achievements: ["Gold Medalist, three times"],
};
