import { ReportSection } from "@/features/Reports/components/reportSection/components/reportSection";
import { ReportHeading } from "@/features/Reports/components/reportHeading/reportHeading";
import { RankEntities } from "@/features/Reports/components/rankEntities";
import { useReportContext } from "@/features/Reports/context";
import type { AiVisibilityData } from "../ai-visibility.types";

export function CitationRankings({ citations }: { citations: AiVisibilityData["citations"] }) {
  const { entities, locale, competitorIds } = useReportContext();
  const total = citations.reduce((sum, row) => sum + row.count, 0);
  const items = citations.map((row) => {
    const entity = entities[row.entityId];
    if (!entity) throw new Error(`Unknown citation entity: ${row.entityId}`);
    return { id: entity.id, label: entity.website?.replace(/^https?:\/\//, "").replace(/\/$/, "") ?? entity.name, imageSrc: entity.avatarUrl, value: row.count, isCompetitor: competitorIds.includes(entity.id) };
  });
  return <ReportSection variant="subsection">
    <div className="flex flex-col gap-8">
      <ReportHeading badge={null} size="medium" title="Citation rankings" description={`Sources ranked by the citations they received in tracked answers. Fill length reflects each source's share of ${total.toLocaleString(locale)} total citations.`} />
      {items.length > 0 ? <RankEntities items={items} maxValue={total} /> : <p className="text-sm text-muted-foreground">No citations were recorded in this period.</p>}
    </div>
  </ReportSection>;
}
