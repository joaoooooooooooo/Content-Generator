import { ReportSection } from "@/features/Reports/components/reportSection/components/reportSection";
import { ReportHeading } from "@/features/Reports/components/reportHeading/reportHeading";
import { HighlightNumber } from "@/features/Reports/components/highlightNumber/highlightNumber";
import { useReportCompany, useReportContext } from "@/features/Reports/context";
import type { AiVisibilityData } from "../ai-visibility.types";

const statusColors = { bad: "text-destructive-foreground", warning: "text-warning-foreground", good: "text-success-foreground" };
export function AiAnswerSummary({ data }: { data: AiVisibilityData["test"] }) {
  const company = useReportCompany();
  const { locale } = useReportContext();
  const format = (value: number) => value.toLocaleString(locale);
  return <div className="flex flex-col gap-12">
        <ReportHeading titleFont="sans" label={data.totalAnswers === 0 ? undefined : data.status} badge={data.totalAnswers === 0 ? "No results" : undefined} size="small" description={null}
          title={data.totalAnswers === 0 ? "No category answers were recorded in this period." : <>{company.name} appeared in <span className={statusColors[data.status]}>{format(data.namedAnswers)} of {format(data.totalAnswers)}</span> neutral category answers.</>} />
        <div className="mt-auto grid grid-cols-2 gap-4">
          <HighlightNumber className="w-auto min-w-0" value={format(data.namedAnswers)} description={`Answers that named ${company.name}`} />
          <HighlightNumber className="w-auto min-w-0" value={format(Math.max(0, data.totalAnswers - data.namedAnswers))} description={`Answers that did not name ${company.name}`} />
        </div>
      </div>;
}

export function AiTestResults({ data }: { data: AiVisibilityData["test"] }) {
  const company = useReportCompany();
  return <ReportSection variant="subsection">
    <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
      <ReportHeading badge="How to read this test" size="medium"
        title={`We asked the questions someone asks before they know ${company.name} by name.`}
        description={`We ask about campaign creative without naming ${company.name}, measuring whether AI discovers the company on its own.`} />
      <AiAnswerSummary data={data} />
    </div>
  </ReportSection>;
}
