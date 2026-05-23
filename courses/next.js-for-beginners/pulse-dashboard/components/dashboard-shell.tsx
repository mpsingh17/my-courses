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
          <div className="architecture-card">
            <strong>Why this matters</strong>
            <p>
              Next.js 16 favors moving work back to the server. We keep the initial page simple,
              typed, and fast while the project grows into a real feedback workflow.
            </p>
          </div>
        </div>

        <div className="stats">
          {stats.map((stat) => (
            <article className="stat-card" key={stat.label}>
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="section-grid" aria-label="Feedback preview">
        {feedbackEntries.map((entry) => (
          <article className="feedback-card" key={entry.id}>
            <header>
              <strong>{entry.title}</strong>
              <span className="pill">{entry.sentiment}</span>
            </header>
            <p>{entry.detail}</p>
            <time dateTime={entry.submittedAt}>
              {new Intl.DateTimeFormat("en-US", {
                dateStyle: "medium",
                timeStyle: "short",
              }).format(new Date(entry.submittedAt))}
            </time>
          </article>
        ))}
      </section>

      <footer className="page-footer">
        Next steps: add nested layouts, dynamic routes, and server-fetched feedback data.
      </footer>
    </main>
  );
}