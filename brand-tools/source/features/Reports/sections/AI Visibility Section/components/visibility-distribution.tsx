import { ReportSection } from "@/features/Reports/components/reportSection/components/reportSection";
import { EntitySegment } from "@/features/Reports/components/entitySegment";
import { useReportContext } from "@/features/Reports/context";
import type { AiVisibilityData } from "../ai-visibility.types";
export function VisibilityDistribution({ views }: { views: NonNullable<AiVisibilityData["distribution"]> }) {
  const { companyId, entities, competitorIds } = useReportContext();
  const chartViews = views.map(view => ({
    value: view.value, tabLabel: view.label.toLowerCase() === "share of voice" ? "Share of Voice" : view.label, label: "Average across 1 daily point",
    comparisonBadgeLabel: view.change, comparisonBadgeVariant: view.change.startsWith("-") ? "error" : view.change.startsWith("+") ? "success" : "secondary", comparisonText: "Vs last week",
    subjectValue: String(view.entries.find(entry => entry.entityId === companyId)?.value ?? 0),
    data: view.entries.map(entry => ({ channel: entry.entityId ?? "others", label: entry.entityId ? entities[entry.entityId].name : "Others", isCompetitor: !!entry.entityId && competitorIds.includes(entry.entityId), kind: entry.entityId ? "entity" : "others", role: entry.entityId === companyId ? "subject" : "comparison", value: entry.value })),
  }));
  if (!views.length) return <ReportSection variant="subsection"><p className="text-sm text-muted-foreground">No AI distribution data is available yet.</p></ReportSection>;
  return <ReportSection variant="subsection"><div className="flex flex-col gap-6">{chartViews.map(view => <EntitySegment key={view.value} chartViews={[view]} layout="chart" staticView />)}</div></ReportSection>;
}
