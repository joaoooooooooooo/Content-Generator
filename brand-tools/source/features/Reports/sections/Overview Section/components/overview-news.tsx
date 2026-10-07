import { useReportContext } from "@/features/Reports/context";
import { NewsCard } from "@/features/Reports/components/newsCard";
import { ReportCardGrid } from "@/features/Reports/components/reportCardGrid/report-card-grid";
import { ReportHeading } from "@/features/Reports/components/reportHeading/reportHeading";
import { ReportSection } from "@/features/Reports/components/reportSection/components/reportSection";
import type { OverviewSectionData } from "../overview-section.types";

export function OverviewNews({ data }: { data: OverviewSectionData["news"] }) {
  const { entities } = useReportContext();
  return (
    <ReportSection variant="subsection">
      <div className="flex flex-col gap-8">
        <ReportHeading badge={null} size="medium" title={data.title} description={data.description} />
        {data.articles.length > 0 ? <ReportCardGrid>
          {data.articles.map((article) => <NewsCard key={article.id} title={article.title} takeaway={article.summary}
            imageSrc={article.imageUrl} imageAlt={article.imageAlt ?? ""} source={article.source.entityId ? { label: entities[article.source.entityId].name, href: entities[article.source.entityId].website } : article.source} />)}
        </ReportCardGrid> : <p className="text-sm text-muted-foreground">No news articles are included in this report.</p>}
      </div>
    </ReportSection>
  );
}
