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
              <span className="pill">{entry.sentiment}</span>
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