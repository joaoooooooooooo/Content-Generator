import type { AiVisibilityData } from "./ai-visibility.types";
import { sampleQuestions } from "@/features/Reports/components/questionsAsked/sample-questions";
export const aiVisibilityMock = {

  distribution: [
    { value: "source-presence", label: "Source Presence", change: "+12%", entries: [{ entityId: "apta", value: 37 }, { entityId: "superside", value: 28 }, { entityId: "curio", value: 21 }, { value: 14 }] },
    { value: "visibility", label: "Visibility", change: "+8%", entries: [{ entityId: "apta", value: 41 }, { entityId: "superside", value: 30 }, { entityId: "curio", value: 17 }, { value: 12 }] },
    { value: "share-of-voice", label: "Share of voice", change: "+19%", entries: [{ entityId: "apta", value: 37 }, { entityId: "superside", value: 28 }, { entityId: "curio", value: 21 }, { value: 14 }] },
  ],
  title: "Who the AI is citing",
  badge: "AI visibility",
  test: { totalAnswers: 75, namedAnswers: 0, status: "bad" },
  citations: [
    { entityId: "superside", count: 32 },
    { entityId: "curio", count: 24 },
    { entityId: "designstudio", count: 15 },
    { entityId: "brandfuel", count: 9 },
  ],
  questions: sampleQuestions,
} satisfies AiVisibilityData;
