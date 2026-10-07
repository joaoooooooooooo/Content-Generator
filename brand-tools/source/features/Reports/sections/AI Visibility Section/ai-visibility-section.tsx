import { VisibilityDistribution } from "./components/visibility-distribution";
import { ReportSection } from "@/features/Reports/components/reportSection/components/reportSection";
import { ReportHeading } from "@/features/Reports/components/reportHeading/reportHeading";
import { NextStepsIntro } from "@/features/Reports/components/nextStepsIntro";
import { useReportCompany } from "@/features/Reports/context";
import { AiTestResults } from "./components/ai-test-results";
import { CitationRankings } from "./components/citation-rankings";
import { AiQuestions } from "./components/ai-questions";
import type { AiVisibilitySectionProps } from "./ai-visibility.types";
export function AiVisibilitySection({ data, id = "report-ai-visibility", className }: AiVisibilitySectionProps) {
  const company = useReportCompany();
  return <ReportSection variant="main" id={id} className={className} contentContainerClassName="!py-0" innerClassName="md:!px-0 xl:!px-0">
    <NextStepsIntro artboard="Artboard 4" ariaLabel="AI visibility animation">
      <div className="relative z-10 w-full pt-12 md:px-10 md:py-12 xl:px-[10.5rem]">
        <ReportHeading variant="intro" badge={data.badge} title={data.title} description={`We asked the AI systems category questions a prospective client might ask before they know ${company.name} by name.`} />
      </div>
    </NextStepsIntro>
    <div className="flex flex-col gap-16 pb-16 md:px-10 md:pb-20 xl:px-[10.5rem] xl:pb-28">
      <AiTestResults data={data.test} />
      <CitationRankings citations={data.citations} />
      <AiQuestions questions={data.questions} />
      {data.distribution && <VisibilityDistribution views={data.distribution} />}
    </div>
  </ReportSection>;
}
