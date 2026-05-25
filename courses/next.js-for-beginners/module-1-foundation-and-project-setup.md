# Module 1: Foundation and Project Setup in Next.js 16

Every production Next.js application begins with a contract: a pinned runtime, a deliberate directory convention, and a clearly understood rendering default. Without that contract, teams debug environment drift instead of shipping features. This module establishes that contract for Pulse, a real-world feedback dashboard you will build across all five modules of this course. By the end of this chapter, you will have a reproducible, fully typed Next.js 16 workspace running the React Compiler and Turbopack, a root layout and home route wired to a server-rendered shell component, and a small seed data module that demonstrates typed, file-based data flow before any API or database enters the picture.

The architecture decisions made here are intentional and carry forward. Enabling `reactCompiler: true` and `cacheComponents: true` in `next.config.ts` is not ceremony — these flags instruct the Next.js build pipeline to apply automatic memoization and component-level caching, reducing the performance overhead that beginners accidentally introduce when they over-render server trees. Similarly, separating route files in `app/` from reusable UI in `components/` and raw data in `data/` reflects how mid-to-large Next.js codebases structure ownership, making it straightforward to scale routing independently of UI component libraries.

The project increment delivered here is modest by design. A root layout, a single server-rendered page, two typed feedback entries, and a baseline CSS token layer. That modesty is the point. You will observe server-first rendering in its purest form — no client state, no API calls, no external dependencies — so that every layer added in later modules has a clear contrast point. Module 2 builds routing and navigation directly on top of this shell.

## Lesson 1.1: Prepare Environment and Create the Project

Before a single route is rendered, the build toolchain must be stable. Next.js 16 requires Node.js 20.9.0 or later; earlier versions lack the V8 engine features that Turbopack and the React Compiler depend on at build time. Version mismatches typically surface as cryptic native module errors during `npm install` rather than clean, actionable messages — which means they consume disproportionate debugging time. Pinning every direct dependency to an exact version in `package.json` prevents `npm update` or a fresh `npm install` on a different machine from silently pulling a patch release that changes behavior.

The `dev` script runs `next dev --turbopack`, enabling the Rust-based Turbopack bundler instead of the legacy webpack pipeline. Turbopack provides significantly faster hot module replacement and cold start times in development, which matters when you are iterating quickly across server components, layouts, and CSS changes. The `lint` script delegates directly to ESLint using the configuration scaffolded by `create-next-app`, which already includes the `eslint-config-next` ruleset — a curated set of rules specifically aligned to App Router conventions like correct `use client` placement and `next/image` usage.

The `devDependencies` block is equally important to review. The `babel-plugin-react-compiler` package is required to activate the React Compiler transformation during development and build. `@tailwindcss/postcss` wires Tailwind CSS 4 through PostCSS, which is the canonical integration path for Tailwind in Next.js 16. TypeScript 5.8 and the matching React type packages ensure that every component, prop, and data shape you write is checked against the same type definitions the framework itself ships.

## The Implementation Blueprint

1. Confirm Node.js 20.9.0+ is installed by running `node -v` in a terminal.
2. From the workspace root, navigate to `courses/next.js-for-beginners/pulse-dashboard`.
3. Run `npm install` to restore all pinned dependencies.
4. Review the `scripts` and `dependencies` fields in `package.json` to confirm version alignment.
5. Run `npm run dev` and open `localhost:3000` to verify the dev server starts cleanly.
6. Stop the server with `Ctrl+C` and run `npm run build` to confirm a clean production build.

### Code Implementation

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

Run `npm run dev` and navigate to `localhost:3000`. The browser should display the Pulse starter page without any console errors in either the terminal or the browser DevTools. After confirming the dev server runs cleanly, stop it and execute `npm run build`. A successful build prints a static route table and exits with code 0 — any non-zero exit code points to a configuration or TypeScript error that must be resolved before proceeding.

The most common failure at this stage is a Node.js version mismatch. If `npm install` fails with a native binding error referencing `node-gyp` or a specific CPU architecture module, run `node -v` and verify you are on 20.9.0 or later. If you are on a lower version, install the latest Node.js 20 LTS release via your version manager and delete the `node_modules` directory before reinstalling. Do not attempt to override the engine requirement — doing so causes silent runtime failures in the React Compiler transformation that are harder to diagnose later.

*Estimated Study Time: 45 Minutes*

---

### Lesson 1.2: Read the App Router Structure

The App Router replaces the legacy Pages Router as the default architecture in Next.js 13 and above, and it is the only routing model this course uses. Understanding its file conventions is not optional background reading — it is the prerequisite for every feature you will add across all five modules. The `app/` directory is a file-system router where folder names map directly to URL segments, and two special filenames, `layout.tsx` and `page.tsx`, define the two fundamental units of every route: the persistent shell that wraps a segment tree, and the leaf component that renders the route's primary content.

The root `layout.tsx` is the single entry point rendered for every route in the application. It receives `children` as a prop and is responsible for the HTML document shell, global metadata, and any UI that must persist across navigation events — headers, sidebars, and theme providers all belong here. The `page.tsx` file at a given path renders only when that exact route is active. This separation is what makes nested layouts efficient: Next.js can re-render only the `page.tsx` of a child route while keeping its parent `layout.tsx` components mounted and unaffected.

The `components/` directory holds reusable UI that is not itself a route. This includes `DashboardShell`, the card list, and any future navigation components. The `data/` directory holds typed modules that serve as the application's local data layer in early modules before a remote API or database is introduced. Keeping these concerns in separate directories prevents a class of structural bugs common in beginner Next.js projects — specifically, placing utility files inside `app/` where Next.js may attempt to treat them as route segments or API handlers.

> **Deep Dive: `reactCompiler` and `cacheComponents` in `next.config.ts`**
>
> The `reactCompiler: true` flag enables the React Compiler, a Babel transform that statically analyses component trees and inserts `useMemo` and `useCallback` boundaries automatically. This eliminates entire categories of unnecessary re-renders without requiring manual memoization in application code. The `cacheComponents: true` flag activates Next.js component-level caching, which serializes and reuses rendered Server Component output across requests when the underlying data has not changed. Together, these two settings shift performance responsibility from the application developer to the framework's compilation and caching layer — which is particularly valuable for server-rendered dashboards with stable, infrequently changing data like the Pulse feedback list.

#### The Implementation Blueprint

1. Open `app/layout.tsx` and identify the `<html>`, `<body>`, and `{children}` structure that wraps every route.
2. Open `app/page.tsx` and confirm it imports and renders the `DashboardShell` component — nothing else.
3. Open `next.config.ts` and read the `reactCompiler` and `cacheComponents` flags and their purpose.
4. Open `components/dashboard-shell.tsx` and trace how it imports from `data/feedback.ts`.
5. Run `npm run lint` from the project root and confirm zero errors.

#### Code Implementation

**File Path:** `courses/next.js-for-beginners/pulse-dashboard/next.config.ts`

```ts
import type { NextConfig } from "next";

// reactCompiler activates the React Compiler Babel transform, which
// automatically applies memoization across the component tree.
// cacheComponents enables Next.js component-level output caching for
// stable Server Component subtrees.
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

// RootLayout renders on every route. It owns the HTML document shell and
// global styles. All nested pages are injected via the children prop.
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

// The home route delegates all rendering to DashboardShell.
// This page file remains intentionally minimal — its only job is
// to connect the route segment to its primary UI component.
export default function Home() {
  return <DashboardShell />;
}
```

#### Verification and Troubleshooting

With the dev server running, open `localhost:3000` and confirm the dashboard renders the two seed feedback cards. Open the browser DevTools Network tab and observe that the page is delivered as pre-rendered HTML with no client-side JavaScript fetch for the card content — this is the App Router's server rendering in action. Next, run `npm run lint` and confirm the output shows no errors or warnings related to import paths, `use client` misuse, or missing `next/image` wrappers.

A common structural mistake at this stage is placing helper files or data modules inside the `app/` directory. Any file inside `app/` that exports a default function named `default` may be silently treated as a page component by the router, causing unexpected empty routes or build warnings. If `npm run lint` surfaces an `app/` file that is not a `layout.tsx`, `page.tsx`, `loading.tsx`, or `error.tsx`, move it to `data/` or `lib/` immediately to avoid routing conflicts in later modules.

*Estimated Study Time: 40 Minutes*

---

### Lesson 1.3: Build a Minimal Server-Rendered Dashboard Shell

Server Components are the rendering default in every Next.js App Router project. Unless a component file explicitly declares `"use client"` at the top, Next.js compiles and executes it on the server, serializes the resulting HTML, and streams it to the browser. This model has a direct performance consequence: the JavaScript for a Server Component is never sent to the client bundle. For a data-display component like `DashboardShell` — which only reads from a static typed module and renders a list — the client bundle contribution is precisely zero bytes.

The `FeedbackEntry` type in `data/feedback.ts` models the shape of a single feedback record. Defining the type as an exported TypeScript union literal for `sentiment` rather than a plain `string` makes invalid sentiment values a compile-time error. This discipline matters even for mock data: the same type will later be used to validate API responses and Server Action payloads, so grounding it in a strict local definition now prevents a class of runtime mismatches when the data source changes in module 3.

The `DashboardShell` component maps the typed array through a `<ul>` with an `aria-label`, rendering each entry as an `<li>` containing an `<h2>` for the title, a `<span>` for the sentiment pill, and a `<time>` element whose `dateTime` attribute carries the ISO 8601 timestamp. This semantic structure is not decorative — it exposes the feedback list to screen readers and assistive technologies through the browser's accessibility tree, and it ensures the `<time>` element's machine-readable value is parseable by indexing tools and search engines without additional metadata layers.

#### The Implementation Blueprint

1. Create `data/feedback.ts` and define the `FeedbackEntry` type with the `sentiment` union literal.
2. Add two seed entries to the `feedbackEntries` array with distinct sentiment values and realistic timestamps.
3. Open `components/dashboard-shell.tsx` and import `feedbackEntries` using the `@/` path alias.
4. Build the JSX tree: `<main>` → `<section>` intro block → `<ul>` card list → `<footer>` transition note.
5. Use `Intl.DateTimeFormat` to format each entry's `submittedAt` timestamp for display.
6. Run `npm run build` and verify the output reports zero TypeScript errors.

#### Code Implementation

**File Path:** `courses/next.js-for-beginners/pulse-dashboard/data/feedback.ts`

```ts
// FeedbackEntry is the canonical data shape for all feedback records
// in Pulse. The sentiment field uses a union literal rather than string
// to enforce valid values at the type level across all consumers.
export type FeedbackEntry = {
  id: number;
  title: string;
  sentiment: "Positive" | "Neutral" | "Needs attention";
  submittedAt: string; // ISO 8601 UTC timestamp
  detail: string;
};

// feedbackEntries is a local seed array used in module 1 to demonstrate
// typed server rendering before any API or database integration.
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
// DashboardShell is a Server Component — no "use client" directive.
// It has no browser-only API calls, event handlers, or React hooks,
// which means Next.js can render and cache it entirely on the server.
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

      {/* aria-label exposes the list to assistive technologies */}
      <ul className="list" aria-label="Feedback preview">
        {feedbackEntries.map((entry) => (
          <li className="card" key={entry.id}>
            <h2 className="card-title">{entry.title}</h2>
            <p className="card-meta">
              <span className="pill">{entry.sentiment}</span>{" "}
              {/* dateTime carries the machine-readable ISO value;
                  the visible text is formatted for human readers */}
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

Open `localhost:3000` in the browser and confirm two feedback cards are visible, each displaying a formatted date such as "May 12, 2026, 8:15 AM" alongside the sentiment pill. Inspect the page source using browser DevTools — the card HTML should be present in the initial server-delivered document, not injected by client-side JavaScript. This confirms the Server Component pipeline is working correctly. Run `npm run build` and look for the route table in the build output; the home route should be marked as static, indicating Next.js has fully pre-rendered it at build time.

The most common mistake at this stage is adding `"use client"` to `DashboardShell` out of habit from working in the Pages Router or standalone React projects. This directive is only necessary when a component uses browser-only APIs (`window`, `document`), React hooks with side effects (`useState`, `useEffect`), or attaches DOM event handlers. Adding it to a pure rendering component like `DashboardShell` forces the entire component and its children into the client bundle, negating the server rendering benefit and inflating JavaScript payload size without providing any capability in return.

*Estimated Study Time: 50 Minutes*

---

### Lesson 1.4: Add Readable Baseline Styling

Tailwind CSS 4 in this project is loaded through a single `@import "tailwindcss"` directive in `globals.css`, which activates the new CSS-first configuration model introduced in Tailwind 4. Unlike earlier versions that required a `tailwind.config.js` file and a `@tailwind base/components/utilities` triple directive, the v4 import resolves the full stylesheet in a single pass via the PostCSS pipeline wired through `@tailwindcss/postcss`. This means all Tailwind utility classes are available globally, but the visual structure of Pulse is driven by a small set of semantic BEM-style class names — `.page`, `.card`, `.pill` — rather than long inline utility chains. This approach keeps the markup readable and the CSS self-documenting without abandoning Tailwind as an available utility layer for later modules.

The `:root` block defines six CSS custom properties that act as the application's design token foundation. Using CSS variables rather than hardcoded hex values means that a future dark mode implementation, a design system update, or a theme override requires changing exactly one declaration per token rather than hunting through every rule. The `--accent` token drives the `.pill` component's text color, creating a single source of truth for the brand color used across sentiment badges, links, and interactive states as they are added in subsequent modules.

The card layout relies on CSS Grid with a `gap` property rather than margin-based spacing, which avoids the collapsing margin pitfalls that appear when cards contain block-level children. The `.intro` section uses a subtle linear gradient to visually separate the page header from the card list without introducing a heavy shadow or border pattern that would conflict with the card's own border treatment.

#### The Implementation Blueprint

1. Open `app/globals.css` and replace any existing content with the token layer and component styles below.
2. Confirm the `@import "tailwindcss"` directive is the first line in the file.
3. Define the six `:root` CSS variables for background, surface, foreground, muted, border, and accent.
4. Add the `body`, `.page`, `.intro`, `.list`, `.card`, and `.pill` rule blocks.
5. Run the dev server and resize the browser window from mobile width (360px) to desktop width (1280px) to verify layout responsiveness.
6. Run `npm run lint` and `npm run build` to confirm no regressions.

#### Code Implementation

**File Path:** `courses/next.js-for-beginners/pulse-dashboard/app/globals.css`

```css
/* Tailwind CSS 4 — CSS-first import model. No config file required. */
@import "tailwindcss";

/* Design token layer — six variables drive all color usage in Pulse.
   Centralizing these here makes future theme changes a single-file edit. */
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

/* .page constrains content width and centres it with responsive padding */
.page {
  max-width: 760px;
  margin: 0 auto;
  padding: 2rem 1rem 2.5rem;
}

/* .intro provides a soft branded header panel above the feedback list */
.intro {
  border: 1px solid var(--border);
  border-radius: 0.75rem;
  background: linear-gradient(180deg, #ffffff 0%, #f8fbff 100%);
  padding: 1rem;
}

/* .list uses CSS Grid gap instead of margins to avoid block margin collapse */
.list {
  margin: 1rem 0 0;
  padding: 0;
  list-style: none;
  display: grid;
  gap: 0.75rem;
}

/* .card is the primary content surface — subtle shadow lifts it off the page */
.card {
  border: 1px solid var(--border);
  border-radius: 0.75rem;
  background: var(--surface);
  padding: 0.85rem;
  box-shadow: 0 2px 10px rgba(15, 23, 42, 0.05);
}

/* .pill renders a compact sentiment badge using the accent token */
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

With the dev server running, open `localhost:3000` and toggle the browser's responsive mode. At 360px width the cards should stack vertically within comfortable horizontal padding; at 768px and above the page should read cleanly within the 760px max-width container. Check that the sentiment pill text is clearly legible against the blue background — if it appears too low-contrast, verify that `--accent` resolves to `#1d4ed8` using the browser's computed styles inspector.

A common mistake at this stage is importing `globals.css` in a component file other than `app/layout.tsx`. CSS imports in Next.js App Router are only permitted in layout files, not in arbitrary component or page files — attempting to import a CSS module or global stylesheet directly inside `dashboard-shell.tsx` will produce a build error stating that CSS imports are restricted to specific file types. If the styles are not applying, confirm the import statement `import "./globals.css"` exists in `app/layout.tsx` and nowhere else.

*Estimated Study Time: 35 Minutes*

---

## Chapter Synthesis & Checklist

### Module Review

This module delivered the minimum viable contract for every subsequent chapter: a reproducible Next.js 16 workspace with Turbopack and the React Compiler active, a clean App Router directory structure separating route files from reusable UI and data modules, a fully typed server-rendered feedback shell that ships zero client JavaScript, and a token-driven CSS baseline that scales cleanly from mobile to desktop. Module 2 builds directly on this scaffold, introducing nested route groups, a persistent dashboard navigation layout, and a dynamic detail page — capabilities that require the stable structural foundation established here.

### Production Verification Log

- [ ] Run `node -v` and confirm Node.js 20.9.0 or later.
- [ ] Run `npm install` from `courses/next.js-for-beginners/pulse-dashboard` with exit code 0.
- [ ] Run `npm run dev` and confirm `localhost:3000` renders both feedback cards with sentiment pills and formatted timestamps.
- [ ] Inspect the page source and confirm feedback card HTML is present in the server-delivered document before any JavaScript executes.
- [ ] Run `npm run build` and confirm exit code 0 with the home route reported as static.
- [ ] Run `npm run lint` and confirm zero errors or warnings.
- [ ] Resize the browser from 360px to 1280px and confirm the layout remains readable at all widths.

### Codebase Scope Changes

- `courses/next.js-for-beginners/pulse-dashboard/package.json`
- `courses/next.js-for-beginners/pulse-dashboard/next.config.ts`
- `courses/next.js-for-beginners/pulse-dashboard/app/layout.tsx`
- `courses/next.js-for-beginners/pulse-dashboard/app/page.tsx`
- `courses/next.js-for-beginners/pulse-dashboard/app/globals.css`
- `courses/next.js-for-beginners/pulse-dashboard/components/dashboard-shell.tsx`
- `courses/next.js-for-beginners/pulse-dashboard/data/feedback.ts`
