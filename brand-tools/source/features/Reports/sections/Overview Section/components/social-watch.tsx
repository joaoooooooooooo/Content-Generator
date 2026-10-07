import { SocialCard } from "@/features/Reports/components/social-card";
import { ReportCardGrid } from "@/features/Reports/components/reportCardGrid/report-card-grid";
import { ReportHeading } from "@/features/Reports/components/reportHeading/reportHeading";
import { ReportSection } from "@/features/Reports/components/reportSection/components/reportSection";
import { useReportContext } from "@/features/Reports/context";
import type { OverviewSectionData } from "../overview-section.types";

export function SocialWatch({ data }: { data: OverviewSectionData["socialWatch"] }) {
  const { competitorIds, entities } = useReportContext();
  const posts = data.posts;
  return (
    <ReportSection variant="subsection">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col items-start gap-5">
          <ReportHeading className="min-w-0" badge="Social watch" size="medium" title={data.title} description={data.description} />
        </div>
        {posts.length > 0 ? <ReportCardGrid>
          {posts.map((post) => {
            const entity = entities[post.entityId];
            if (!entity) throw new Error(`Unknown social entity: ${post.entityId}`);
            return <SocialCard key={post.id} name={entity.name} avatarSrc={entity.avatarUrl}
              avatarFallback={entity.avatarFallback} metaLabel={post.platform}
              sourceUrl={post.sourceUrl} title={post.title} description={post.description} thumbnailSrc={post.imageUrl} thumbnailAlt={post.imageAlt ?? ""}
              variant={competitorIds.includes(post.entityId) ? "competitor" : "default"}
            />;
          })}
        </ReportCardGrid> : <p className="text-sm text-muted-foreground">No social posts are included in this report.</p>}
      </div>
    </ReportSection>
  );
}
