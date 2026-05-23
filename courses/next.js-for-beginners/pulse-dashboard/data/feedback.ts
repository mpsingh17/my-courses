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
    detail:
      "The first module starts with a server-rendered overview so the UI is fast before live data arrives in later modules.",
  },
  {
    id: 2,
    title: "Product team wants a filter bar for category drill-down",
    sentiment: "Neutral",
    submittedAt: "2026-05-15T13:40:00.000Z",
    detail:
      "We will add route groups and search parameter handling in the next module instead of pushing complexity into the setup lesson.",
  },
  {
    id: 3,
    title: "Two enterprise accounts requested response-time visibility",
    sentiment: "Needs attention",
    submittedAt: "2026-05-18T17:25:00.000Z",
    detail:
      "This card signals the future data pipeline without forcing client-side fetching into the foundation layer.",
  },
];