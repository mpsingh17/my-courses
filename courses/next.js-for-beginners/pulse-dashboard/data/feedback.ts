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