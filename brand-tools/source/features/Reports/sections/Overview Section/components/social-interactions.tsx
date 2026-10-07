import { ReportSection } from "@/features/Reports/components/reportSection/components/reportSection";
import { ReportHeading } from "@/features/Reports/components/reportHeading/reportHeading";
import { ReportsMultiSeriesLineChart } from "@/features/Reports/components/line/line";
import type { OverviewSectionData } from "../overview-section.types";
export function SocialInteractions({ data }: { data: NonNullable<OverviewSectionData["interactions"]> }) {
  return <ReportSection variant="subsection"><div className="flex flex-col gap-8">
    <ReportHeading size="medium" badge={null} title={data.title} description={null} />
    <ReportsMultiSeriesLineChart data={data.points} />
  </div></ReportSection>;
}
