import { SocialInteractions } from "./components/social-interactions";
import { ReportSection } from "@/features/Reports/components/reportSection/components/reportSection";
import { ReportHeading } from "@/features/Reports/components/reportHeading/reportHeading";
import { NextStepsIntro } from "@/features/Reports/components/nextStepsIntro";
import type { OverviewSectionProps } from "./overview-section.types";
import { SearchCompetitors } from "./components/search-competitors";
import { SocialWatch } from "./components/social-watch";
import { OverviewNews } from "./components/overview-news";

export function OverviewSection({ data, id = "report-market-overview", className, children }: OverviewSectionProps) {
  return (
    <ReportSection
      variant="main"
      id={id}
      className={className}
      contentContainerClassName="!py-0"
      innerClassName="md:!px-0 xl:!px-0"
    >
      <NextStepsIntro artboard="Artboard 2" ariaLabel="Market overview animation">
        <div className="relative z-10 w-full pt-12 md:px-10 md:py-12 xl:px-[10.5rem]">
          <ReportHeading
            variant="intro"
            align="left"
            badge={data.badge}
            title={data.title}
            description={data.description}
          />
        </div>
      </NextStepsIntro>
        <div className="flex flex-col gap-12 pb-16 md:px-10 md:pb-20 xl:px-[10.5rem] xl:pb-28">
          <SearchCompetitors results={data.searchCompetitors} />
          <SocialWatch data={data.socialWatch} />
          <OverviewNews data={data.news} />
          {children}
          {data.interactions && <SocialInteractions data={data.interactions} />}
        </div>
    </ReportSection>
  );
}
