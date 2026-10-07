import { CompetitorTable } from "@/features/Reports/components/competitorTable";
import { ReportHeading } from "@/features/Reports/components/reportHeading/reportHeading";
import { ReportSection } from "@/features/Reports/components/reportSection/components/reportSection";
import { useReportCompany, useReportContext } from "@/features/Reports/context";
import type { SearchCompetitorResult } from "../overview-section.types";

export function SearchCompetitors({ results }: { results: SearchCompetitorResult[] }) {
  const company = useReportCompany();
  const { entities, locale, competitorIds } = useReportContext();
  return (
    <ReportSection variant="subsection">
      <div className="flex flex-col gap-8">
        <ReportHeading
          badge="Search competitors"
          size="medium"
          title="Domains competing closest for search visibility"
          description={`Sites sharing ${company.name}'s search audience, including competitors and publishers.`}
        />
        <CompetitorTable variant="search" locale={locale} rows={results.map((result) => {
          const entity = entities[result.entityId];
          if (!entity) throw new Error(`Unknown competitor: ${result.entityId}`);
          return { ...result, entity, isCompetitor: competitorIds.includes(result.entityId) };
        })} />
      </div>
    </ReportSection>
  );
}
