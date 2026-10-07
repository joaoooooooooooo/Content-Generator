import { ReportSection } from "@/features/Reports/components/reportSection/components/reportSection";
import { SiteStatCard } from "@/features/Reports/components/siteStatCard";
import { SiteCheckCard } from "@/features/Reports/components/siteCheckCard";
import { useReportCompany } from "@/features/Reports/context";
import type { WebsiteAuditData } from "../website-audit.types";
export function AuditSummary({ data }: { data: WebsiteAuditData }) {
  const company = useReportCompany();
  return <ReportSection variant="subsection" aria-label="Website check summary">
    {data.scores.length === 0 && data.checks.length === 0 && <p className="text-sm text-muted-foreground">No website checks are available yet.</p>}
    <div className="grid grid-cols-2 items-stretch gap-3 xl:grid-cols-4">
      {data.scores.map(({ id, ...score }) => <SiteStatCard key={id} {...score} className="h-full max-w-none" />)}
      {data.checks.map(({ id, description, ...check }) => <SiteCheckCard key={id} {...check} description={description.replaceAll("{website}", company.website?.replace(/\/$/, "") ?? company.name)} className="h-full" />)}
    </div>
  </ReportSection>;
}
