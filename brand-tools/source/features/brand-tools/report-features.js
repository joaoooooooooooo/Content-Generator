import { reportScenarios } from "@/features/Reports/report-scenarios";

export const reportScenarioOptions = reportScenarios.map(({ id, label }) => ({ value: id, label: label.replace(" ? ", " · ") }));

// The same components and sample data used by the report, without section headings.
export const reportFeatures = [
  { value: "visibility", label: "Visibility", group: "Charts", width: 1000 },
  { value: "source-presence", label: "Source presence", group: "Charts", width: 1000 },
  { value: "share-of-voice", label: "Share of voice", group: "Charts", width: 1000 },
  { value: "interactions", label: "Social interactions", group: "Charts", width: 900 },
  { value: "rankings", label: "Citation rankings", group: "Charts", width: 760 },
  { value: "questions", label: "Questions asked", group: "Tables", width: 1100 },
  { value: "search", label: "Search competitors", group: "Tables", width: 1100 },
  { value: "paid", label: "Paid search", group: "Tables", width: 1000 },
  { value: "audit", label: "Website audit", group: "Card grids", width: 900 },
  { value: "scores", label: "Performance scores", group: "Card grids", width: 900 },
  { value: "checks", label: "Website checks", group: "Card grids", width: 900 },
  { value: "issues", label: "Audit issues", group: "Card grids", width: 1000 },
  { value: "actions", label: "Recommendations", group: "Card grids", width: 1000 },
  { value: "social", label: "Social watch", group: "Card grids", width: 1000 },
  { value: "news", label: "News", group: "Card grids", width: 1000 },
  { value: "sources", label: "Report sources", group: "Card grids", width: 900 },
  { value: "answers", label: "AI answer metrics", group: "Card grids", width: 650 },
  { value: "answer-summary", label: "AI answer summary", group: "Summaries", width: 460, postWidth: 900 },
];
