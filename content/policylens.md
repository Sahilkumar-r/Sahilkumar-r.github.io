# What broke when I built a document assistant that must not leak

Most "chat with your documents" demos run on clean text. A real company library has scans, tables, Urdu next to English, and files that only some people may read. I built PolicyLens to see what breaks, and I measured each break instead of guessing. The code and every result file are in the [GitHub repository](https://github.com/Sahilkumar-r/policylens).

## What it does

It reads digital and scanned PDFs, Word, Excel, HTML and Urdu text. It answers with the document, page and section, it refuses when it cannot find an answer, and it checks the caller's role inside the search stores. The library has 22 documents: 14 synthetic bank policies where I know every answer because a script wrote them, and 8 real PDFs from SBP, FBR and HEC, one of them a genuine scan. There are 206 questions. 123 are the held out test set, and I tuned thresholds on the other 83 only.

![An employee asks about annual leave and gets a cited answer](/images/policylens/1-employee-cited-answer.webp)

## Break one: OCR dropped the spaces

My first evaluation showed 95.1 percent Recall@5 for every method. Identical numbers are a warning sign, not a result. The three misses were all on one scanned manual, where OCR produced text like "Thebranchvaultcashlimit isPKR25million". Keyword search, embeddings and heading detection all failed on it. A word frequency model that splits those runs fixed the spacing. Even so, on 20 scanned pages OCR still had a word error rate of 42.4 percent on clean scans and 51.7 percent on hard ones, and the PDF text parsers recovered nothing at all.

## Break two: the benchmark was too easy

With 14 small documents every method looked the same. I added the 8 real regulator PDFs, about 190 pages, and the methods separated. On 76 answerable test questions, Recall@5 was 100.0 percent with a reranker, 98.7 for keyword search, 96.1 for hybrid search and 92.1 for embeddings alone. One question is 1.3 points, so I call gaps of one or two questions indicative only. Keyword search beat hybrid search here, so I do not claim hybrid always wins. The reranker costs about 10 seconds per query on my CPU, so it is off by default.

## Break three: one similarity cutoff cannot decide when to refuse

The assistant refuses when its best match scores below a threshold. I tuned the threshold on the validation set. On the test set it reached 74.4 percent precision and 68.1 percent recall, and the shipped system answered 81.6 percent of answerable questions correctly end to end in offline mode. Table questions did worst: 37.5 percent were refused. Correct short facts scored 0.48 to 0.53 similarity, while unrelated regulator text scored 0.59 to 0.63, so no single number separates them.

I hit this in my own demo. A finance officer asked for the CFO's approval limit, which is in the finance table, and got a refusal. I kept that screenshot in the project.

![A finance officer asks a question that is in a table and is refused](/images/policylens/3-failure-finance-table-question-refused.webp)

## The part that worked: access control before retrieval

Restricted documents are filtered inside the vector store query, and the keyword index is built only from documents the caller may see. The cache is keyed by the caller's access level. I tested it three ways. With no filter, 46 of 46 restricted questions pulled in a restricted chunk. With the filter, none did, across 824 role and question pairs. A deliberately buggy cache that ignored access level leaked 45 of 46, which shows the test can fail. On this corpus, filtering after retrieval did not reduce recall, so my case for filtering first is about guarantees, not measured accuracy.

![An employee asks a finance question and is refused](/images/policylens/2-employee-refused-restricted.webp)

## Adding a real model, and a judge I do not trust

With an OpenRouter key I ran Llama 3.1 8B as the answerer and Mistral Small 3.2 as the judge, two different model families so the answerer never grades itself. 98.4 percent of answered questions were faithful to the retrieved text, and 97.9 percent of unanswerable or restricted questions were refused. No restricted value appeared in 30 restricted questions. It cost about $0.013 per 1,000 answers.

But the judge scored answers 88.9 percent correct while a plain string match said 98.4. I read the first four answers it marked wrong, and all four stated the right value. So the judge undercounts, and I keep its verdicts in a file for a person to check. The small model also sometimes forgets a citation marker, as in this answer from the scanned treasury manual, which shows no source.

![A finance officer gets an answer from a scanned PDF, with no citation](/images/policylens/4-finance-scanned-pdf-answer.webp)

I tried two prompt injection attacks with the real model. One poisoned note was retrieved and its instruction was repeated inside the answer, but no restricted value leaked. The other led to a refusal. Two attacks do not prove the defence holds.

## What I would do next

- Replace the single threshold with a signal that combines similarity, keyword coverage and the reranker score.
- Embed table rows instead of whole tables, so long chunks stop diluting the vector.
- Have a person check the 19 labels on the public PDFs, which an AI assistant wrote, and the judge's 50 sample verdicts.
- Host a public demo.
