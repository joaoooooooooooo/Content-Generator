export type WebsiteAuditData = {
  badge: string;
  title: string;
  description: string;
  scores: { id: string; title: string; score: number; description?: string }[];
  checks: { id: string; title: string; status: "missing" | "good"; description: string }[];
  capturedAt: string;
  highPriority: number;
  warnings: number;
  notices: number;
  affectedPages: number;
  issues: { id: string; title: string; description: string; fixPrompt: string; meta?: string; scopeNote?: string; priority?: "high" }[];
};
