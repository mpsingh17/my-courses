# Module: Foundation and Project Setup in Next.js 16

Course Topic & Audience: Pulse: Next.js 16 for Enterprise-Ready Feedback Dashboards for mid-level React developers, frontend engineers moving into full-stack delivery, and Next.js beginners who already know JavaScript or TypeScript.

Progressive Project Context: In this module, we set up Pulse as a minimal learning project. The goal is not to build a production dashboard in module 1, but to establish correct foundations so later modules can safely add routing depth, data fetching, and interactions.

## Lesson 1.1: Start with a Stable, Repeatable Toolchain

The first learning goal is reproducibility. The guide is version-specific, so we intentionally pin the project to Next.js 16.2.5. This avoids "it works on my machine" confusion and keeps every learner on the same runtime behavior, commands, and defaults.

Next.js 16 assumes a modern Node.js runtime. Learners should verify Node.js 20.9.0 or newer before scaffolding. This matters because newer runtime APIs affect how development tooling, streaming, and React internals behave.

At this stage, we keep setup decisions minimal and explicit: TypeScript for safety, ESLint for feedback, Tailwind 4 as the CSS entry point, and App Router as the routing model. The objective is a clean baseline that supports teaching, not an overloaded starter.

Project Integration: Initialize Pulse and keep dependencies pinned to the guide version.

Code Snippet: `courses/next.js-for-beginners/pulse-dashboard/package.json`

```json
{
  "name": "pulse-dashboard",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev --turbopack",
    "build": "next build",
    "start": "next start",
    "lint": "eslint"
  },
  "dependencies": {
    "next": "16.2.5",
    "react": "19.2.0",
    "react-dom": "19.2.0"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^4.1.8",
    "@types/node": "^24.0.0",
    "@types/react": "^19.2.0",
    "@types/react-dom": "^19.2.0",
    "babel-plugin-react-compiler": "^19.1.0-rc.2",
    "eslint": "^9.20.0",
    "eslint-config-next": "16.2.5",
    "tailwindcss": "^4.1.8",
    "typescript": "^5.8.3"
  }
}
```

## Lesson 1.2: Enable Only the Framework Features Needed for the Course

Module 1 should teach architecture, not advanced optimizations. Even so, we still align with the guide by enabling the React Compiler and Cache Components. These settings ensure future lessons behave consistently when we discuss rendering and caching patterns.

A common beginner mistake is adding too many configuration flags early. We avoid that by keeping the config object intentionally small. Learners should be able to explain each option in one sentence.

This lesson models a good professional habit: minimal configuration with clear intent. We use defaults where possible and only add what the module sequence requires.

Project Integration: Keep Next.js config short and version-aligned.

Code Snippet: `courses/next.js-for-beginners/pulse-dashboard/next.config.ts`

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  cacheComponents: true,
};

export default nextConfig;
```

## Lesson 1.3: Build a Minimal App Router Screen to Teach Core Concepts

Instead of building a rich dashboard immediately, we create one clear page that demonstrates fundamentals: a root layout, a server-rendered page, a typed data module, and a component that maps data to markup. This keeps the cognitive load low and helps learners identify how each file contributes.

We intentionally avoid client-only state management in this module. The page is rendered on the server by default, which matches modern Next.js guidance and lets learners understand server-first rendering before adding client interactivity.

The UI content is intentionally basic, not bare. The value here is traceability: learners can follow data from `data/feedback.ts` to `components/dashboard-shell.tsx` to `app/page.tsx` while still seeing a clean interface.

Project Integration: Implement a tiny, typed feedback list that is easy to reason about and extend later.

Code Snippet: `courses/next.js-for-beginners/pulse-dashboard/data/feedback.ts`

```ts
export type FeedbackEntry = {
  id: number;
  title: string;
  sentiment: "Positive" | "Neutral" | "Needs attention";
  submittedAt: string;
  detail: string;
};

export const feedbackEntries: FeedbackEntry[] = [
  {
    id: 1,
    title: "Onboarding step labels are easy to follow",
    sentiment: "Positive",
    submittedAt: "2026-05-12T08:15:00.000Z",
    detail: "This entry is local mock data used to explain rendering before API integration.",
  },
  {
    id: 2,
    title: "A simple category filter would help triage",
    sentiment: "Neutral",
    submittedAt: "2026-05-15T13:40:00.000Z",
    detail: "We keep this as static data now so module 1 stays focused on structure and setup.",
  },
];
```

Code Snippet: `courses/next.js-for-beginners/pulse-dashboard/components/dashboard-shell.tsx`

```tsx
import { feedbackEntries } from "@/data/feedback";

export function DashboardShell() {
  return (
    <main className="page">
      <section className="intro">
        <h1>Pulse: Module 1 Starter</h1>
        <p>
          This page uses basic styling so learners can focus on App Router structure, typed data,
          and server-rendered output.
        </p>
      </section>

      <ul className="list" aria-label="Feedback preview">
        {feedbackEntries.map((entry) => (
          <li className="card" key={entry.id}>
            <h2 className="card-title">{entry.title}</h2>
            <p className="card-meta">
              <span className="pill">{entry.sentiment}</span> <time dateTime={entry.submittedAt}>{new Intl.DateTimeFormat("en-US", { dateStyle: "medium", timeStyle: "short" }).format(new Date(entry.submittedAt))}</time>
            </p>
            <p>{entry.detail}</p>
          </li>
        ))}
      </ul>

      <footer className="page-footer">Next module: add nested layouts and route-based navigation.</footer>
    </main>
  );
}
```

## Lesson 1.4: Keep Styling Minimal, Readable, and Easy to Maintain

For this module, style should support comprehension. We keep a compact set of CSS variables, basic spacing, and a few semantic classes (`page`, `intro`, `list`, `card`, `pill`). That gives learners a clear, friendly interface without introducing production-level design complexity.

Minimal styling also makes code review easier in educational settings. Learners can quickly separate "what is framework behavior" from "what is visual styling" and modify one concern without breaking the other.

This is still good practice. Even in a simple module, we keep styles scoped, avoid inline style clutter, and ensure typography and spacing are consistent across screen sizes.

Project Integration: Apply basic styling that makes the page visually clear while keeping the CSS short and easy to explain.

Code Snippet: `courses/next.js-for-beginners/pulse-dashboard/app/globals.css`

```css
@import "tailwindcss";

:root {
  --background: #f8fafc;
  --surface: #ffffff;
  --foreground: #0f172a;
  --muted: #475569;
  --border: #cbd5e1;
  --accent: #1d4ed8;
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  min-height: 100vh;
  background: var(--background);
  color: var(--foreground);
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
}

.page {
  max-width: 760px;
  margin: 0 auto;
  padding: 2rem 1rem 2.5rem;
}

.intro {
  border: 1px solid var(--border);
  border-radius: 0.75rem;
  background: linear-gradient(180deg, #ffffff 0%, #f8fbff 100%);
  padding: 1rem;
}

.list {
  margin: 1rem 0 0;
  padding: 0;
  list-style: none;
  display: grid;
  gap: 0.75rem;
}

.card {
  border: 1px solid var(--border);
  border-radius: 0.75rem;
  background: var(--surface);
  padding: 0.85rem;
  box-shadow: 0 2px 10px rgba(15, 23, 42, 0.05);
}

.pill {
  display: inline-block;
  margin-right: 0.5rem;
  padding: 0.2rem 0.5rem;
  border-radius: 999px;
  border: 1px solid #bfdbfe;
  background: #eff6ff;
  color: var(--accent);
  font-weight: 600;
  font-size: 0.78rem;
}
```

## Module Wrap-up and Verification

This module intentionally keeps the Pulse project small. Learners leave with a reliable Next.js 16.2.5 setup, a minimal App Router structure, and a typed server-rendered page that is easy to extend in later modules. We prioritize clarity of concepts over visual complexity.

Verification Steps (For Learner):

- Step 1: From `courses/next.js-for-beginners/pulse-dashboard`, run `npm install` and `npm run dev`.
- Step 2: Open `http://localhost:3000` and confirm the page title, intro text, and two feedback cards render.
- Step 3: Run `npm run build` and confirm the app compiles successfully.
- Step 4: Run `npm run lint` and confirm the code follows the configured lint rules.

Code Files to Review:

- `courses/next.js-for-beginners/pulse-dashboard/package.json`
- `courses/next.js-for-beginners/pulse-dashboard/next.config.ts`
- `courses/next.js-for-beginners/pulse-dashboard/app/layout.tsx`
- `courses/next.js-for-beginners/pulse-dashboard/app/page.tsx`
- `courses/next.js-for-beginners/pulse-dashboard/app/globals.css`
- `courses/next.js-for-beginners/pulse-dashboard/components/dashboard-shell.tsx`
- `courses/next.js-for-beginners/pulse-dashboard/data/feedback.ts`
