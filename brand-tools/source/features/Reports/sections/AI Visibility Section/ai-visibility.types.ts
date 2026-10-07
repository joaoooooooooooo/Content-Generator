export type AiQuestion = { id: string; type: string; text: string; mentions?: number | null };
export type AiVisibilityData = {
  distribution?: { value: string; label: string; change: string; entries: { entityId?: string; value: number }[] }[];
  title: string;
  badge: string;
  test: { totalAnswers: number; namedAnswers: number; status: "bad" | "warning" | "good" };
  citations: { entityId: string; count: number }[];
  questions: AiQuestion[];
};
export type AiVisibilitySectionProps = { data: AiVisibilityData; id?: string; className?: string };
