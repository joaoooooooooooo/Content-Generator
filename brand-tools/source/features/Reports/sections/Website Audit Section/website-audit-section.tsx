import { ReportSection } from "@/features/Reports/components/reportSection/components/reportSection";
import { ReportHeading } from "@/features/Reports/components/reportHeading/reportHeading";
import { NextStepsIntro } from "@/features/Reports/components/nextStepsIntro";
import { AuditSummary } from "./components/audit-summary";
import { AuditIssues } from "./components/audit-issues";
import type { WebsiteAuditData } from "./website-audit.types";
export function WebsiteAuditSection({ data, id = "report-website-audit", className }: { data: WebsiteAuditData; id?: string; className?: string }) {
  return <ReportSection variant="main" id={id} className={className} contentContainerClassName="!py-0" innerClassName="md:!px-0 xl:!px-0">
    <NextStepsIntro artboard="Artboard 3" ariaLabel="Website audit animation">
      <div className="relative z-10 w-full pt-12 md:px-10 md:py-12 xl:px-[10.5rem]">
        <ReportHeading variant="intro" badge={data.badge} title={data.title} description={data.description} />
      </div>
    </NextStepsIntro>
    <div className="flex flex-col gap-16 pb-16 md:px-10 md:pb-20 xl:px-[10.5rem] xl:pb-28">
      <AuditSummary data={data} />
      <AuditIssues data={data} />
    </div>
  </ReportSection>;
}
