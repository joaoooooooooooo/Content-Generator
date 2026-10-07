import { ReportSection } from "@/features/Reports/components/reportSection/components/reportSection";
import { ReportHeading } from "@/features/Reports/components/reportHeading/reportHeading";
import { TaskCard } from "@/features/Reports/components/taskCard/taskCard";
import { useReportContext } from "@/features/Reports/context";
import type { WebsiteAuditData } from "../website-audit.types";
export function AuditIssues({ data }: { data: WebsiteAuditData }) {
  const { locale } = useReportContext();
  const captured = new Intl.DateTimeFormat(locale, { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" }).format(new Date(data.capturedAt));
  return <ReportSection variant="subsection">
    <div className="flex flex-col gap-8">
      <ReportHeading badge={null} size="medium" title="Website audit" description={`Captured ${captured}. The site check found ${data.highPriority} high-priority problems, ${data.warnings} warnings, and ${data.notices} lower-priority notices across ${data.affectedPages} affected pages.`} />
      {data.issues.length === 0 && <p className="text-sm text-muted-foreground">No fix prompts are included in this report.</p>}
      <div className="grid items-stretch gap-3 md:grid-cols-2 xl:grid-cols-3">
        {data.issues.map(({ id, ...issue }) => <TaskCard key={id} {...issue} />)}
      </div>
    </div>
  </ReportSection>;
}
