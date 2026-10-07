import { ReportSection } from "@/features/Reports/components/reportSection/components/reportSection";
import { ReportHeading } from "@/features/Reports/components/reportHeading/reportHeading";
import { QuestionsAsked } from "@/features/Reports/components/questionsAsked";
import type { AiQuestion } from "../ai-visibility.types";
export function AiQuestions({ questions }: { questions: AiQuestion[] }) {
  return <ReportSection variant="subsection"><div className="flex flex-col gap-8">
    <ReportHeading badge="The sample" size="medium" title="Questions asked" description="All questions in the sample, with their type and mention count." />
    <QuestionsAsked questions={questions} />
  </div></ReportSection>;
}
