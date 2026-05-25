# Module 1: Foundation and Project Setup in Next.js 16

Most beginners get stuck before they even start building features. The app fails to run on one machine, works on another, and suddenly the lesson turns into hours of setup debugging. This module prevents that. You will create a stable Next.js 16 project with clear folder rules, simple typed data, and a clean starter dashboard page that renders on the server.

This chapter is intentionally small in scope so you can build confidence fast. Instead of juggling routing, APIs, and forms at once, you focus on one job: creating a reliable baseline. By the end, you will understand where files go, why Next.js renders this first page on the server, and how to keep your styling readable without over-engineering the UI.

The result is a project foundation you can trust in the next modules. Module 2 adds route structure and navigation, but that only works well if this base is clean. Think of this chapter as building solid ground before adding more floors.

## Lessons

### Lesson 1.1: Prepare Environment and Create the Project

Before writing features, we need a stable machine setup. If your Node version is too old, installs can fail and error messages can feel random. So the first goal is simple: lock down the runtime, install dependencies, and verify the project can run and build without errors.

You are also validating project scripts early. That might sound basic, but it is one of the best habits in real work. If `dev`, `lint`, and `build` run now, you can trust later failures are caused by your new code, not hidden setup issues.

At this point, you are not trying to build a polished app. You are creating a safe starting point for learning. That mindset matters: stable setup first, features second.

#### The Implementation Blueprint
1. Check your Node.js version and confirm it is 20.9.0 or newer.
2. Open `courses/next.js-for-beginners/pulse-dashboard` in your terminal.
3. Run `npm install` to install project dependencies.
4. Review `package.json` scripts and package versions.
5. Run `npm run dev` and confirm the app starts at `http://localhost:3000`.
6. Stop the server and run `npm run build` to confirm the production build works.

#### Code Implementation
**File Path:** `courses/next.js-for-beginners/pulse-dashboard/package.json`
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

#### Verification and Troubleshooting
Run `npm run dev`, then open `http://localhost:3000`. You should see the starter app with no terminal crashes and no browser console errors. After that, stop the dev server and run `npm run build`. A successful build confirms the app can compile for production.

The most common issue here is a Node version mismatch. If install or build fails with native module errors, run `node -v`. If it is below 20.9.0, switch to a supported Node 20 LTS version, delete `node_modules`, and run `npm install` again.

Once these checks pass, your setup is ready for the rest of the module.

*Estimated Study Time: 45 Minutes*

---

### Lesson 1.2: Read the App Router Structure

Now that the app runs, you need a clear mental map of the codebase. In Next.js App Router, folder and file names are part of how routing works. If that structure is unclear, small mistakes quickly become confusing bugs.

The key idea is separation of responsibility. Files in `app/` define routes and layouts. Reusable UI belongs in `components/`. Local mock data belongs in `data/`. Keeping these boundaries clean makes the app easier to read now and easier to scale later.

This lesson is about understanding flow, not memorizing rules. You will trace how the root layout wraps the page and how the page delegates rendering to a reusable dashboard component.

> **Deep Dive: Why `layout.tsx` and `page.tsx` are separate**
>
> `layout.tsx` is shared structure. It stays in place while users move between routes. `page.tsx` is route-specific content. Separating them prevents repeated markup and keeps navigation smooth when the app grows.

#### The Implementation Blueprint
1. Open `app/layout.tsx` and inspect the `<html>`, `<body>`, and `{children}` structure.
2. Open `app/page.tsx` and confirm it only renders `DashboardShell`.
3. Open `next.config.ts` and review `reactCompiler` and `cacheComponents`.
4. Open `components/dashboard-shell.tsx` and follow its data import from `data/feedback.ts`.
5. Run `npm run lint` and confirm no lint errors.

#### Code Implementation
**File Path:** `courses/next.js-for-beginners/pulse-dashboard/next.config.ts`
```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  cacheComponents: true,
};

export default nextConfig;
```

**File Path:** `courses/next.js-for-beginners/pulse-dashboard/app/layout.tsx`
```tsx
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pulse Dashboard",
  description: "Minimal learning project for Next.js 16.2.5 module foundations.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```

**File Path:** `courses/next.js-for-beginners/pulse-dashboard/app/page.tsx`
```tsx
import { DashboardShell } from "@/components/dashboard-shell";

export default function Home() {
  return <DashboardShell />;
}
```

#### Verification and Troubleshooting
Run `npm run dev` and refresh `http://localhost:3000`. The page should load through the route entry in `app/page.tsx`, and the UI should come from `DashboardShell`. Then run `npm run lint` to confirm imports and file usage stay valid.

A common beginner mistake is putting helper files inside `app/` because it feels convenient. Keep utilities and data outside `app/` unless they are route files. That avoids route confusion and keeps the project easy to reason about.

If lint fails, fix folder placement first before changing logic.

*Estimated Study Time: 40 Minutes*

---

### Lesson 1.3: Build a Minimal Server-Rendered Dashboard Shell

This is your first real UI milestone: render a feedback list from typed data on the server. In App Router, this is the default behavior, so you can build useful pages without adding client-side state right away.

You will define a simple `FeedbackEntry` type and two sample records. Typed mock data may feel small, but it teaches an important practice: treat data shape as a contract. That contract helps you avoid runtime surprises when you later move to database-backed data.

The dashboard shell also introduces semantic HTML for accessibility. Using proper list and time elements keeps the markup understandable for screen readers and easier to maintain for future contributors.

#### The Implementation Blueprint
1. Create `data/feedback.ts` with a typed `FeedbackEntry` model.
2. Add two sample feedback records.
3. Import the data in `components/dashboard-shell.tsx`.
4. Render the data as accessible list cards with title, sentiment, timestamp, and detail.
5. Format timestamps with `Intl.DateTimeFormat`.
6. Run `npm run build` to ensure type and build safety.

#### Code Implementation
**File Path:** `courses/next.js-for-beginners/pulse-dashboard/data/feedback.ts`
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
    detail:
      "This entry is local mock data used to explain rendering before API integration.",
  },
  {
    id: 2,
    title: "A simple category filter would help triage",
    sentiment: "Neutral",
    submittedAt: "2026-05-15T13:40:00.000Z",
    detail:
      "We keep this as static data now so module 1 stays focused on structure and setup.",
  },
];
```

**File Path:** `courses/next.js-for-beginners/pulse-dashboard/components/dashboard-shell.tsx`
```tsx
import { feedbackEntries } from "@/data/feedback";

export function DashboardShell() {
  return (
    <main className="page">
      <section className="intro">
        <h1>Pulse: Module 1 Starter</h1>
        <p>
          This page uses basic styling so you can focus on App Router
          structure, typed data, and server-rendered output.
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
                  timeStyle: "short",
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

#### Verification and Troubleshooting
Start the app and check the home page. You should see exactly two feedback cards with clear sentiment badges and readable dates. Then run `npm run build` to verify all code compiles correctly.

A very common mistake here is adding `"use client"` at the top of `dashboard-shell.tsx` without needing it. Do not add it unless you need browser-only behavior like click handlers with state. Keeping this component server-rendered keeps the page lighter.

If something looks off, confirm data import paths first, then confirm the timestamp field is valid ISO text.

*Estimated Study Time: 50 Minutes*

---

### Lesson 1.4: Add Readable Baseline Styling

Good starter styling is not about visual polish. It is about clarity. Learners should be able to scan content quickly, and future lessons should be easy to build on top of the same style layer.

In this project, global styles define a small token set for colors and spacing. That keeps the look consistent while staying easy to change later. You will also keep class names simple so the markup remains readable when features become more complex.

This lesson closes the module by making the starter UI feel stable across mobile and desktop widths, without introducing design complexity that distracts from core Next.js learning.

#### The Implementation Blueprint
1. Open `app/globals.css` and ensure `@import "tailwindcss";` is the first line.
2. Add root color tokens for background, surface, text, muted text, border, and accent.
3. Style page layout, intro panel, list, cards, and sentiment pill.
4. Check responsive readability from small to large viewport widths.
5. Run `npm run lint` and `npm run build` after styling updates.

#### Code Implementation
**File Path:** `courses/next.js-for-beginners/pulse-dashboard/app/globals.css`
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

*,
*::before,
*::after {
  box-sizing: border-box;
}

body {
  margin: 0;
  min-height: 100vh;
  background: var(--background);
  color: var(--foreground);
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
    sans-serif;
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

#### Verification and Troubleshooting
Run `npm run dev` and inspect the page at different widths. At mobile size, cards should stack cleanly with readable spacing. On desktop, content should remain centered and easy to scan.

A common mistake is importing global CSS in the wrong file. In App Router, global CSS should be imported in `app/layout.tsx`. If styles are missing or build errors mention CSS import rules, check that location first.

Then run `npm run lint` and `npm run build` one last time to confirm your baseline remains stable.

*Estimated Study Time: 35 Minutes*

---

## Chapter Synthesis & Checklist

### Module Review

You now have a dependable Next.js 16 starting point: stable tooling, a clear App Router structure, a server-rendered dashboard shell backed by typed local data, and readable baseline styling. This gives you a strong foundation for Module 2, where you will introduce nested routes, shared dashboard layout patterns, and user navigation.

### Production Verification Log
- [ ] Run `node -v` and confirm Node.js 20.9.0 or later.
- [ ] Run `npm install` in `courses/next.js-for-beginners/pulse-dashboard` with exit code 0.
- [ ] Run `npm run dev` and confirm `http://localhost:3000` loads two feedback cards.
- [ ] Run `npm run lint` and confirm no lint errors.
- [ ] Run `npm run build` and confirm build succeeds.
- [ ] Verify the UI remains readable from mobile to desktop viewport sizes.

### Codebase Scope Changes
- `courses/next.js-for-beginners/pulse-dashboard/package.json`
- `courses/next.js-for-beginners/pulse-dashboard/next.config.ts`
- `courses/next.js-for-beginners/pulse-dashboard/app/layout.tsx`
- `courses/next.js-for-beginners/pulse-dashboard/app/page.tsx`
- `courses/next.js-for-beginners/pulse-dashboard/app/globals.css`
- `courses/next.js-for-beginners/pulse-dashboard/components/dashboard-shell.tsx`
- `courses/next.js-for-beginners/pulse-dashboard/data/feedback.ts`
