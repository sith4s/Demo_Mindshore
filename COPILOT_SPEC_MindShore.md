# 💡 Copilot Prompt: MindShore Project Catalog Website

> Save this file as **`COPILOT_SPEC.md`** in your project root (e.g., `/dev main/demo_mindshore/COPILOT_SPEC.md`).  
> Open it in VS Code and start coding with GitHub Copilot — this file is the *source of truth* for what to generate.

---

## 🎯 Goal
Build a small, production-ready website for **MindShore (mindshore.io)** that showcases delivered projects. Use the **layout vibe** of Clouds On Mars’ catalog (cards + filters, clean grid, lightweight details view) as **inspiration**, not as source code. Keep it modern, fast, accessible, and brand-consistent with MindShore.

## 🧱 Tech & Setup (Copilot, do this)
- Stack: **Vite + React + TypeScript** (SPA). If you choose Next.js, mirror the same port policy.
- Styling: **Tailwind CSS** with brand CSS variables in `src/theme.css`. Support dark-mode (media + toggle).
- Accessibility: semantic HTML, keyboard nav, focus states, aria-labels, AA+ contrast.
- Performance: code-splitting, responsive/lazy images, prefetch on hover.
- SEO: basic metadata + OpenGraph + social share image.
- Testing: minimal Playwright tests (home loads, filter works, modal opens).
- Repo hygiene: MIT license, `CONTRIBUTING.md`, clear scripts.

## 🔌 Port Policy (STRICT)
- Use **exactly one dev port** and **reuse it across runs**.
- Before starting dev server, **close any previously used local ports** and the fixed port if occupied.
- Choose: **5173** (Vite) or **3000** (Next). Default to **5173**.
- Enforce:
  - Vite: `--strictPort` and a `predev` script that calls `kill-port 5173`.
  - Next: `-p 3000` with the same `predev` logic for port 3000.
- Provide `.vscode/settings.json` pinning Live Server (if used) to the same port.

### Required scripts (Vite variant)
```json
{
  "scripts": {
    "predev": "kill-port 5173 || true",
    "dev": "vite --port 5173 --strictPort",
    "build": "tsc -b && vite build",
    "preview": "vite preview --port 5173 --strictPort",
    "ingest": "tsx scripts/ingest-docx.ts",
    "test": "playwright test"
  },
  "devDependencies": {
    "kill-port": "^2",
    "tsx": "^4",
    "playwright": "^1"
  }
}
```

`.vscode/settings.json`:
```json
{
  "liveServer.settings.port": 5173,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "files.eol": "\n",
  "typescript.tsdk": "node_modules/typescript/lib"
}
```

## 🖼 Branding & UI (MindShore)
- Implement `src/theme.css` with CSS variables, e.g.:
  - `--brand-bg`, `--brand-fg`, `--surface`, `--border`, `--brand-primary`, `--brand-accent`, `--brand-muted`.
- Font stack: system sans that visually matches MindShore (e.g., `system-ui, -apple-system, Segoe UI, Roboto, Inter, Helvetica, Arial, sans-serif`).
- Header: MindShore logo (placeholder SVG/PNG), compact nav, “Contact” CTA linking to mindshore.io.
- Cards: soft shadows, rounded corners (xl/2xl), subtle hover lift/outline, tag chips.
- Dark/light support using CSS variables + media query, with a simple toggle.

## 🗺 Information Architecture
- **Home (`/`)**
  - Short **1–2 sentence** company intro (English), aligned with MindShore tone.
  - **Filter bar** with chips (initial category: **Data & AI**), easily extensible.
  - **Responsive grid** of project tiles (image, title, 2–3 bullet highlights, tags, link to detail).
- **Project detail**
  - Modal route *or* dedicated page showing: problem → approach → outcomes (bulleted), tech stack icons, anonymized client descriptor, screenshots carousel, KPI chips.
- **About/Contact**
  - Simple page with CTA to MindShore’s official contact page.
- **404**
  - Branded, helpful.

## 📥 Content Ingestion from DOCX
- Input: single **DOCX** file with project descriptions and screenshots.
- Create **`scripts/ingest-docx.ts`** that:
  1. Reads `/content/projects.docx`.
  2. Converts DOCX → structured JSON `/public/projects.json`; writes images to `/public/projects/…`.
     - Use `mammoth` (DOCX → HTML) or direct extraction; map images to projects.
  3. **Anonymizes client names** (no real client names on the site):
     - Replace explicit brands with **industry descriptors** only:
       - Examples: “Albocora tuna company” → “Leading food producer”
       - Banks → “European commercial bank”; Retail → “Omnichannel retailer”; Pharma → “Global life‑sciences company”; Logistics → “International logistics provider”; Public sector → “Government agency”
     - Strip logos/watermarks/identifiers, remove sensitive metadata (EXIF).
  4. Validates against the schema:
     ```ts
     type Project = {
       id: string;
       title: string;
       client: string;                 // anonymized industry descriptor
       category: "Data & AI" | string; // default to "Data & AI"; extensible later
       summary: string;
       problem: string[];
       approach: string[];
       outcomes: string[];
       techStack: string[];
       tags: string[];
       images: { src: string; alt: string }[];
     };
     ```
  5. Fails build if invalid/malformed.

- Add a footer or note: “Client names and logos are anonymized for confidentiality.”

## 🔎 UX Behavior
- **Filter + search** across title/summary/client/tags.
- **Sort** by newest / A–Z.
- **Pagination** via infinite scroll or “Load more”.
- **Shareable deep links** for each project (`/p/[id]`).

## 📁 Files to Generate (baseline)
```
/.vscode/settings.json
/public/projects.json            # generated by ingest; include sample seed
/public/projects/*               # screenshots (from DOCX)
/scripts/ingest-docx.ts
/src/components/{Header,FilterBar,ProjectCard,ProjectModal,Tag,KpiChip,Logo}.tsx
/src/lib/{anonymize.ts,search.ts}
/src/{App.tsx,main.tsx,styles.css,theme.css}
index.html
package.json
tsconfig.json
vite.config.ts
tailwind.config.js
postcss.config.js
README.md
```

## ✅ Definition of Done
- Dev server always runs on the **same single port**; older ports are closed before each run.
- Home shows intro + **filterable project grid**.
- Detail modal/page works; supports deep linking.
- `ingest-docx.ts` converts real content into `public/projects.json` + images; **client names anonymized**.
- Lighthouse scores ≥ 90 (PWA not required).
- Clean, MindShore‑consistent look & feel (no proprietary assets copied).

---

# 🛠 Project Usage Guide (for developers)

## 1) Local path
Place the project in:
```
/dev main/demo_mindshore
```

## 2) Install & run
```bash
npm i
npm run dev
```
- `predev` kills the fixed port (and any lingering dev ports).
- Dev server **must** bind to a single port (5173 for Vite) and **reuse** it across iterations.

## 3) Add real content
- Put your Word file here:
```
/dev main/demo_mindshore/content/projects.docx
```
- Then:
```bash
npm run ingest
```
- The script outputs `public/projects.json` and images under `public/projects/`.

## 4) Build & preview
```bash
npm run build
npm run preview  # also on the fixed port
```

## 5) Contributing
- Keep project titles and clients **generic/anonymized**.
- Don’t introduce new ports; always reuse the fixed one.
- Ensure accessibility checks pass; prefer keyboard-friendly UI.

---

**End of spec. Copilot, use this document as the authoritative requirements for code generation and maintenance.**
