# Sahil Kumar – Portfolio

Next.js (static export) + TypeScript + Tailwind CSS.

## Update content
Edit `src/data/profile.ts` (all text, links, projects, skills). Replace `public/Sahil_Kumar_Resume.pdf` and `public/images/portrait.webp` to change those assets.

## Refresh the GitHub activity section
The section reads a snapshot in `src/data/github.json` (no API calls at runtime). To update it, log in with the GitHub CLI and run `npm run fetch:github`, then commit and push.

## Refresh the ragx case study numbers
The case study at `/projects/ragx/` and the featured section read `src/data/ragx.ts`, which is generated from the result files in the ragx repository, so no number is typed by hand. After new evals land there, run `python scripts/make-ragx-data.py <path to the advanced-rag repo>`, rebuild, and run `node scripts/check-style.mjs`. Screenshots live in `public/images/ragx/`.

## Develop
```
npm install
npm run dev      # http://localhost:3000
npm run build    # static site in ./out
```

## Deploy
- **sahilkumar.runs-on.dev**: build, then deploy the `out/` folder with the runs-on `deploy_site` tool.
- **GitHub Pages**: push to `main` in a repo named `Sahilkumar-r.github.io`; `.github/workflows/pages.yml` builds and publishes. (For any other repo name, set `NEXT_PUBLIC_BASE_PATH=/<repo>` in the build step.)
