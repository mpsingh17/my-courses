# Module: Foundation and Project Setup in Next.js 16

Course Topic & Audience: Pulse: Next.js 16 for Enterprise-Ready Feedback Dashboards for mid-level React developers, frontend engineers moving into full-stack delivery, and Next.js beginners who already know JavaScript or TypeScript.

Progressive Project Context: In this module, we establish the Pulse application foundation, pin the toolchain to Next.js 16.2.5, enable the platform features used throughout the course, and ship the first server-rendered dashboard shell that later modules will extend.

## Lesson 1.1: Establish the Runtime and Scaffold Pulse Correctly

Every production project starts with reproducibility, not with UI polish. The supplied guide is explicit about the baseline: Next.js 16 expects Node.js 20.9.0 or later, and this course pins the application to Next.js 16.2.5 so the learner sees the same defaults, prompts, and configuration behavior used throughout the lessons. That matters because framework minor versions often shift config flags, lint presets, and CLI behavior.

The important architectural decision here is to accept the modern App Router defaults instead of carrying forward habits from older React tooling. The guide positions Turbopack as the default development engine and frames Next.js 16 as server-first by design. That means our initial setup should prefer TypeScript, the root-level `app/` directory, and the built-in routing model rather than adding custom structure too early.

For learners, this lesson is about understanding why the scaffold choices are not arbitrary. TypeScript protects module boundaries from the start, ESLint gives immediate feedback, Tailwind 4 provides a low-friction styling system, and Turbopack shortens the feedback loop so the rest of the course can focus on application architecture instead of local tooling friction.

Project Integration: We create the Pulse project in `courses/next.js-for-beginners/pulse-dashboard` and pin the package versions to match the course guide.

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
    "eslint": "^9.20.0",
    "eslint-config-next": "16.2.5",
    "tailwindcss": "^4.1.8",
    "typescript": "^5.8.3"
  }
}
```

## Lesson 1.2: Enable the Features That Shape the Rest of the Course

The guide’s next step is more important than it looks: enable the React Compiler and Cache Components in the application configuration. This is not a cosmetic optimization. It aligns the project with the rendering model used later for streaming, cached shells, and the reduced need for manual memoization in component trees.

From an enterprise perspective, early configuration decisions have compounding effects. If learners start with a mismatched config, then later lessons about streaming or static shells become harder to explain because the runtime behavior no longer matches the intended architecture. By turning these options on now, we preserve a clean path into data fetching, partial prerendering patterns, and server-heavy rendering flows.

This lesson also introduces an important discipline: keep framework configuration minimal and intentional. We only enable the flags required by the guide, install the compiler plugin it references, and avoid speculative tweaks that would distract from the learning path or create version-specific maintenance noise.

Project Integration: Install the React Compiler plugin and update the application configuration so Pulse is ready for compiler-assisted rendering and the cache model used in later modules.

Code Snippet: `courses/next.js-for-beginners/pulse-dashboard/package.json`

```json
{
  "devDependencies": {
    "babel-plugin-react-compiler": "^19.1.0-rc.2"
  }
}
```

Code Snippet: `courses/next.js-for-beginners/pulse-dashboard/next.config.ts`

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  cacheComponents: true,
};

export default nextConfig;
```

## Lesson 1.3: Build the App Router Skeleton Before Adding Complexity

Next.js 16 uses the file system as the routing contract, so the project structure must communicate application intent immediately. In this module we keep the skeleton intentionally lean: a root layout, a single homepage, and a typed component that represents the first dashboard shell. That gives learners a stable mental model before we introduce nested layouts, dynamic segments, and route-level data work in later modules.

This lesson also reinforces the server-first model from the guide. The page component remains a Server Component by default, which means the initial render is produced on the server without shipping unnecessary client JavaScript. That is the right baseline for a feedback dashboard because the page begins as content and structure, not as a browser-only interaction surface.

Architecturally, a small shell is better than a prematurely interactive app. We can still present realistic UI by loading local typed data and rendering a dashboard preview. The benefit is that learners see a useful result without confusing the foundational routing lesson with state management or remote data concerns.

Project Integration: Create the root layout, homepage, typed sample data source, and dashboard shell that together produce the first Pulse screen.

Code Snippet: `courses/next.js-for-beginners/pulse-dashboard/app/layout.tsx`

```tsx
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pulse Dashboard",
  description: "Production-ready feedback dashboard starter built with Next.js 16.2.5.",
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

Code Snippet: `courses/next.js-for-beginners/pulse-dashboard/app/page.tsx`

```tsx
import { DashboardShell } from "@/components/dashboard-shell";

export default function Home() {
  return <DashboardShell />;
}
```

Code Snippet: `courses/next.js-for-beginners/pulse-dashboard/components/dashboard-shell.tsx`

```tsx
import { feedbackEntries } from "@/data/feedback";

const stats = [
  { label: "Feedback items", value: String(feedbackEntries.length).padStart(2, "0") },
  { label: "Server-rendered route", value: "100%" },
  { label: "Next.js version", value: "16.2.5" },
];

export function DashboardShell() {
  return (
    <main className="page-shell">
      <section className="hero">
        <div className="hero-grid">
          <div>
            <span className="eyebrow">Module 1 foundation</span>
            <h1>Pulse starts with a server-first dashboard shell.</h1>
            <p>
              This starter keeps routing, metadata, and the first page entirely in the App Router so
              later lessons can layer streaming, mutations, and security onto a clean baseline.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
```

## Lesson 1.4: Define a Visual System That Supports Iteration

Foundation modules often under-invest in styling, but that creates friction later when each new lesson has to fight weak structure and inconsistent spacing. Instead, we create a small set of design tokens in `globals.css` and apply them to a clean editorial dashboard layout. This preserves focus while still making the project feel intentional and production-oriented.

The guide recommends Tailwind 4 as part of the 2026 stack, and the important setup detail is the simplified CSS entry point. We import Tailwind once and then layer a few custom variables and component-level utility classes around it. This keeps the styling system modern without locking the learner into a long utility-only detour before the course reaches routing and data flow.

There is also a product-design reason for this choice. Pulse is a feedback dashboard, so it should already communicate signal density, status, and readability. A modest system of cards, pills, surfaces, and spacing tokens gives later modules a consistent visual contract for filters, forms, loading states, and details pages.

Project Integration: Add the global CSS entry point and the first typed dataset so the homepage renders a realistic dashboard preview immediately after setup.

Code Snippet: `courses/next.js-for-beginners/pulse-dashboard/app/globals.css`

```css
@import "tailwindcss";

:root {
  --background: #f4efe7;
  --surface: rgba(255, 250, 242, 0.88);
  --foreground: #1d1a16;
  --muted: #6c6258;
  --accent: #0f766e;
}

body {
  margin: 0;
  min-height: 100vh;
  color: var(--foreground);
  font-family: Georgia, Cambria, "Times New Roman", Times, serif;
}
```

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
    title: "Customers finish onboarding faster with the new checklist",
    sentiment: "Positive",
    submittedAt: "2026-05-12T08:15:00.000Z",
    detail: "The first module starts with a server-rendered overview so the UI is fast before live data arrives in later modules.",
  },
];
```

## Module Wrap-up and Verification

In this module, Pulse moves from an idea to a repeatable baseline. The learner pins the runtime, scaffolds a Next.js 16.2.5 project, enables the guide’s core configuration flags, adopts the App Router structure, and ships a first dashboard screen that is already server-rendered and typed. That leaves the project ready for navigation, dynamic routing, and live data in the next module.

Verification Steps (For Learner):

- Step 1: From `courses/next.js-for-beginners/pulse-dashboard`, run `npm install` and then `npm run dev`. Confirm the development server starts with Turbopack and serves the app at `http://localhost:3000`.
- Step 2: Open the homepage and verify the title, hero copy, metrics cards, and three feedback preview cards render without client-side loading spinners.
- Step 3: Run `npm run lint` and confirm the project passes linting with the default Next.js 16 configuration.
- Step 4: Open `package.json` and verify that `next` is pinned to `16.2.5`, matching the guide used for this course.

Code Files to Review:

- `courses/next.js-for-beginners/pulse-dashboard/package.json`
- `courses/next.js-for-beginners/pulse-dashboard/tsconfig.json`
- `courses/next.js-for-beginners/pulse-dashboard/next.config.ts`
- `courses/next.js-for-beginners/pulse-dashboard/eslint.config.mjs`
- `courses/next.js-for-beginners/pulse-dashboard/postcss.config.mjs`
- `courses/next.js-for-beginners/pulse-dashboard/app/layout.tsx`
- `courses/next.js-for-beginners/pulse-dashboard/app/page.tsx`
- `courses/next.js-for-beginners/pulse-dashboard/app/globals.css`
- `courses/next.js-for-beginners/pulse-dashboard/components/dashboard-shell.tsx`
- `courses/next.js-for-beginners/pulse-dashboard/data/feedback.ts`
*** End Patch