# Module 1: Foundation and Project Setup in Next.js 16

## Module Goal

Set up a stable Next.js 16 workspace and establish a minimal Pulse dashboard baseline.

## Why This Module Matters

Reliable setup prevents environment drift and gives beginners a reproducible starting point for every later module. In the 2026 Next.js workflow, strong foundations make App Router, server-first rendering, and Server Actions easier to reason about and debug.

## Module Outcomes

By the end of this module, learners will be able to:

1. Verify Node.js and tooling prerequisites, then scaffold a pinned Next.js 16 project.
2. Explain how key App Router files (layout, page, components, data) fit together.
3. Render a typed feedback list on the server using a reusable dashboard shell component.
4. Apply readable global baseline styles with CSS variables and responsive spacing.

## Project Increment Delivered

Pulse starter app with a root layout, starter dashboard screen, and local typed feedback seed data.

## Definition of Done (Module Level)

- [ ] App runs in development mode with no startup errors.
- [ ] App builds successfully for production.
- [ ] Starter dashboard renders typed feedback entries using server rendering.
- [ ] Baseline styles are readable on desktop and mobile widths.

---

## Lesson 1.1: Prepare Environment and Create the Project

### Objective

Scaffold a Next.js 16 project with consistent scripts and verified runtime prerequisites.

### Why It Matters

Version mismatches are one of the biggest beginner blockers. A pinned toolchain keeps classroom and self-paced learners on the same behavior, reducing setup-related troubleshooting.

### Concepts Covered

- Node and npm version alignment for Next.js 16.
- Next.js 16 scaffolding defaults (TypeScript, ESLint, App Router).
- Dependency pinning for predictable results.

### Implementation Plan

1. Check installed runtime versions and confirm Node.js 20.9.0+.
2. Initialize Pulse with TypeScript, ESLint, and App Router defaults.
3. Verify scripts and framework versions in package metadata.

### Project Work

Initialize the Pulse project and pin core dependencies to course-aligned versions.

### Code Focus

File: courses/next.js-for-beginners/pulse-dashboard/package.json

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
  }
}
```

### Verification Steps

1. Run npm run dev from courses/next.js-for-beginners/pulse-dashboard.
2. Open localhost:3000 and confirm the app loads.
3. Stop the server and run npm run build.

### Common Mistake and Fix

- Mistake: Using an unsupported Node.js version.
- Fix: Upgrade to Node.js 20.9.0+ and reinstall dependencies.

### Estimated Time

45 minutes

---

## Lesson 1.2: Read the App Router Structure

### Objective

Identify how layout, page, component, and data files connect in a Next.js 16 project.

### Why It Matters

Beginners need a folder-level mental model before adding new features. Clear structure reduces future refactoring and helps avoid route/component mixing.

### Concepts Covered

- Root layout responsibilities.
- Separation of route files and reusable components.
- Data modules as typed, importable sources.

### Implementation Plan

1. Inspect app directory conventions.
2. Connect root layout and page rendering flow.
3. Place static data in a typed module and consume it in UI.

### Project Work

Map Pulse starter files to responsibilities so learners can explain where new features should live.

### Code Focus

File: courses/next.js-for-beginners/pulse-dashboard/next.config.ts

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  cacheComponents: true,
};

export default nextConfig;
```

### Verification Steps

1. Explain what app/layout.tsx and app/page.tsx each do.
2. Confirm shared config remains minimal and intentional.
3. Run npm run lint to validate configuration and imports.

### Common Mistake and Fix

- Mistake: Mixing route files and shared components in one folder.
- Fix: Keep route files in app and reusable UI in components.

### Estimated Time

40 minutes

---

## Lesson 1.3: Build a Minimal Server-Rendered Dashboard Shell

### Objective

Render a typed feedback list on the server using a simple dashboard shell component.

### Why It Matters

Server components are the default in Next.js App Router. This lesson gives learners a concrete example of server-first rendering before adding client-side interactivity in later modules.

### Concepts Covered

- Server component default behavior.
- Typed data modeling with a local seed module.
- Mapping typed entries into semantic, accessible markup.

### Implementation Plan

1. Define FeedbackEntry type and sample records.
2. Build a shell component that renders entry cards.
3. Format dates and keep the UI semantically structured.

### Project Work

Implement initial feedback preview cards using local typed data.

### Code Focus

File: courses/next.js-for-beginners/pulse-dashboard/data/feedback.ts

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
    detail: "This entry is local mock data used to explain rendering before API integration."
  },
  {
    id: 2,
    title: "A simple category filter would help triage",
    sentiment: "Neutral",
    submittedAt: "2026-05-15T13:40:00.000Z",
    detail: "We keep this as static data now so module 1 stays focused on structure and setup."
  }
];
```

File: courses/next.js-for-beginners/pulse-dashboard/components/dashboard-shell.tsx

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
              <span className="pill">{entry.sentiment}</span>{" "}
              <time dateTime={entry.submittedAt}>
                {new Intl.DateTimeFormat("en-US", {
                  dateStyle: "medium",
                  timeStyle: "short"
                }).format(new Date(entry.submittedAt))}
              </time>
            </p>
            <p>{entry.detail}</p>
          </li>
        ))}
      </ul>

      <footer className="page-footer">
        Next module: add nested layouts and route-based navigation.
      </footer>
    </main>
  );
}
```

### Verification Steps

1. Confirm two feedback cards render at the home route.
2. Validate date output and semantic elements (main, section, ul, li, time).
3. Run npm run build and ensure no TypeScript errors.

### Common Mistake and Fix

- Mistake: Adding use client unnecessarily to the shell.
- Fix: Keep this component server-side unless browser-only APIs are required.

### Estimated Time

50 minutes

---

## Lesson 1.4: Add Readable Baseline Styling

### Objective

Apply maintainable global styles that improve readability without introducing unnecessary complexity.

### Why It Matters

Visual clarity helps learners reason about app structure and state. A small, token-driven CSS baseline keeps the project approachable while preparing for later modules.

### Concepts Covered

- CSS variables as design tokens.
- Responsive spacing and card layout basics.
- Maintainable global style conventions.

### Implementation Plan

1. Define a small set of color and spacing variables.
2. Style layout, cards, and metadata badges.
3. Validate readability across mobile and desktop widths.

### Project Work

Apply baseline global styles for the Pulse starter page.

### Code Focus

File: courses/next.js-for-beginners/pulse-dashboard/app/globals.css

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

### Verification Steps

1. Open the app at narrow and wide widths.
2. Confirm text contrast and spacing remain readable.
3. Run npm run lint and npm run build to ensure style changes introduced no regressions.

### Common Mistake and Fix

- Mistake: Over-styling too early and obscuring framework behavior.
- Fix: Keep styles focused on readability and information hierarchy.

### Estimated Time

35 minutes

---

## Module Wrap-Up

In this module, learners establish a reliable Next.js 16 baseline and ship a first server-rendered Pulse screen backed by typed local feedback data. This is the minimum stable platform needed for Module 2, where routing, nested layouts, and dashboard navigation are introduced.

## End-of-Module Verification Checklist

1. From courses/next.js-for-beginners/pulse-dashboard, run npm install.
2. Run npm run dev and verify the starter dashboard renders at localhost:3000.
3. Confirm both feedback cards display with sentiment and formatted timestamps.
4. Run npm run build and verify a successful production build.
5. Run npm run lint and verify there are no blocking lint errors.

## Files to Review

- courses/next.js-for-beginners/pulse-dashboard/package.json
- courses/next.js-for-beginners/pulse-dashboard/next.config.ts
- courses/next.js-for-beginners/pulse-dashboard/app/layout.tsx
- courses/next.js-for-beginners/pulse-dashboard/app/page.tsx
- courses/next.js-for-beginners/pulse-dashboard/app/globals.css
- courses/next.js-for-beginners/pulse-dashboard/components/dashboard-shell.tsx
- courses/next.js-for-beginners/pulse-dashboard/data/feedback.ts
