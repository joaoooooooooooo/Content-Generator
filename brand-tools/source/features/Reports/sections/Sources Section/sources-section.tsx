import { ReportSection } from "@/features/Reports/components/reportSection/components/reportSection";
import { ReportHeading } from "@/features/Reports/components/reportHeading/reportHeading";
import { SourceCard } from "@/features/Reports/components/sourceCard";
import { useReportCompany, useReportContext } from "@/features/Reports/context";
import type { SourcesSectionProps } from "./sources-section.types";

export function SourcesSection({ data, onConnectSource, id = "report-sources", className }: SourcesSectionProps) {
  const company = useReportCompany();
  const { locale, entities, competitorIds } = useReportContext();
  const includedCount = data.sources.filter((source) => source.status !== "not-connected").length;
  const websiteLabel = company.website?.replace(/^https?:\/\//, "").replace(/\/$/, "") ?? "";

  return (
    <ReportSection variant="subsection" showBottomDivider={false} id={id} className={className}>
      <div className="flex flex-col gap-8">
          <ReportHeading
            size="medium"
            badge={data.eyebrow}
            title={data.title}
            description={`${includedCount.toLocaleString(locale)} ${includedCount === 1 ? "source" : "sources"} connected or included`}
          />
        <div>
          {data.sources.length > 0 ? (
            <div className="grid grid-cols-2 auto-rows-fr gap-3 xl:grid-cols-3">
              {data.sources.map((source) => (
                <SourceCard
                  key={source.id}
                  className="h-full max-w-none"
                  name={source.entityId ? entities[source.entityId].name : source.name}
                  isCompetitor={!!source.entityId && competitorIds.includes(source.entityId)}
                  description={source.entityId ? entities[source.entityId].website?.replace(/^https?:\/\//, "") : source.kind === "website" ? websiteLabel : source.description ?? ""}
                  avatarSrc={(source.entityId ? entities[source.entityId].avatarUrl : source.avatarUrl) ?? (source.kind === "website" ? company.avatarUrl : undefined)}
                  avatarFallback={(source.entityId ? entities[source.entityId].avatarFallback : source.avatarFallback) ?? (source.kind === "website" ? company.avatarFallback : undefined)}
                  status={source.status}
                  onConnect={onConnectSource ? () => onConnectSource(source.id) : undefined}
                  connectDisabled={!onConnectSource}
                />
              ))}
            </div>
          ) : (
            <p className="rounded-xl border p-6 text-sm text-muted-foreground">No sources are included in this report yet.</p>
          )}
        </div>
      </div>
    </ReportSection>
  );
}
