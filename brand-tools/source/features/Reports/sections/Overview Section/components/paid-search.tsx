import { CompetitorTable } from "@/features/Reports/components/competitorTable";
import { ReportHeading } from "@/features/Reports/components/reportHeading/reportHeading";
import { ReportSection } from "@/features/Reports/components/reportSection/components/reportSection";
import { useReportContext } from "@/features/Reports/context";
import type { PaidSearchResult } from "../overview-section.types";

export function PaidSearch({ results }: { results: PaidSearchResult[] }) {
  const { entities, locale, competitorIds } = useReportContext();
  return (
    <ReportSection variant="subsection">
      <div className="flex flex-col gap-8">
        <ReportHeading badge="Paid search estimates" size="medium"
          title="Your watchlist in paid search"
          description="SEMrush estimates whether each watchlist domain shows paid-search activity. These are estimates, not a record of every campaign or dollar spent."
        />
        <CompetitorTable variant="paid" locale={locale} rows={results.map((result) => {
          const entity = entities[result.entityId];
          if (!entity) throw new Error(`Unknown competitor: ${result.entityId}`);
          return { ...result, entity, isCompetitor: competitorIds.includes(result.entityId) };
        })} />
      </div>
    </ReportSection>
  );
}
