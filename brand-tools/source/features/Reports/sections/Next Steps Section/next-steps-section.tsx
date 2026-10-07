import { ReportSection } from "@/features/Reports/components/reportSection/components/reportSection";
import { ReportHeading } from "@/features/Reports/components/reportHeading/reportHeading";
import { NextStepsIntro } from "@/features/Reports/components/nextStepsIntro";
import { ActionCard } from "@/features/Reports/components/actionItem";
import { useReportCompany } from "@/features/Reports/context";
import type { NextStepsData } from "./next-steps.types";

export function NextStepsSection({ data, id = "report-next-steps", className }: { data: NextStepsData; id?: string; className?: string }) {
  const company = useReportCompany();
  return <ReportSection variant="main" id={id} className={className} contentContainerClassName="!py-0" innerClassName="md:!px-0 xl:!px-0">
    <NextStepsIntro artboard="Artboard" ariaLabel="Next steps animation">
      <div className="relative z-10 w-full pt-12 md:px-10 md:py-12 xl:px-[10.5rem]">
        <ReportHeading variant="intro" badge={null} title={data.title.replaceAll("{company}", company.name)} description={data.description.replaceAll("{company}", company.name)} />
      </div>
    </NextStepsIntro>
    <div className="pb-16 md:px-10 md:pb-20 xl:px-[10.5rem] xl:pb-28">
      <ReportSection variant="subsection">
          {data.actions.length === 0 && <p className="text-sm text-muted-foreground">No next steps are included in this report yet.</p>}
          <div className="grid items-stretch gap-3 md:grid-cols-2 xl:grid-cols-3">
            {data.actions.map(({ id, ...action }) => <ActionCard key={id} {...action} />)}
          </div>
      </ReportSection>
    </div>
  </ReportSection>;
}
