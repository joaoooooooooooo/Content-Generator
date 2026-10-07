import { CopyButton } from "@/components/shared/copy-button";
import RiveOrbit from "@/components/rive/riveOrbit";
import { ReportBreadcrumb } from "@/features/Reports/components/nav/components/report-breadcrumb";
import { ReportSection } from "@/features/Reports/components/reportSection/components/reportSection";
import { ReportHeading } from "@/features/Reports/components/reportHeading/reportHeading";
import { Metric1 } from "@/features/Reports/components/metric1";
import { cn } from "@/lib/utils";
import type { IntroSectionProps } from "./intro-section.types";
import { useReportCompany, useReportContext } from "@/features/Reports/context";

export function IntroSection({ children, data, reportUrl, id = "report-overview", className }: IntroSectionProps) {
  const company = useReportCompany();
  const { period, locale } = useReportContext();
  const reportLabel = new Intl.DateTimeFormat(locale, { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" }).format(new Date(period.end));
  return (
    <ReportSection
        variant="main"
        showBottomDivider
        className={cn("!overflow-hidden", className)}
        contentClassName="relative z-10"
        id={id}
      >
        <div className="relative isolate">
          <div className="pointer-events-none absolute -top-16 -bottom-24 left-1/2 z-0 w-screen max-w-7xl md:-top-20 md:-bottom-28 xl:-top-28 xl:-bottom-36 -translate-x-1/2 px-4 md:px-6">
            <div className="absolute inset-y-0 right-4 left-4 overflow-hidden md:right-6 md:left-6" style={{ maskImage: "linear-gradient(to bottom, black calc(100% - 80px), transparent calc(100% - 32px))" }}>
              <div
                className="absolute -right-[640px] -bottom-[640px] size-[1064px] opacity-75 md:size-[1186px]"
              >
                <RiveOrbit aria-hidden="true" className="size-full" />
              </div>
            </div>
          </div>
        <div className="relative z-10">
        <ReportBreadcrumb
          avatarFallback={company.avatarFallback ?? company.name.slice(0, 2).toUpperCase()}
          avatarSrc={company.avatarUrl}
          className="mb-8 w-fit max-w-full"
          companyName={company.name}
          reportLabel={reportLabel}
        />
        <div className="relative min-h-[28rem] md:min-h-[31rem]">
          <div className="flex flex-col gap-12 xl:grid xl:grid-cols-[minmax(0,30rem)_auto] xl:items-start xl:justify-between xl:gap-16">
            <ReportHeading
              variant="intro"
              titleClassName="text-5xl/13"
              afterDescription={reportUrl ? <CopyButton label="Copy report link" text={reportUrl} /> : null}
              title={data.title}
              description={data.description}
              align="left"
              badge={null}
              className="max-w-[30rem]"
            />
            {data.metric && (
              <Metric1
                align="left"
                className="self-start xl:justify-self-end"
                value={data.metric.value}
                label={data.metric.label}
                prefix={data.metric.prefix}
                suffix={data.metric.suffix}
                comparisonBadgeLabel={data.metric.comparison?.label ?? data.metric.status?.label ?? ""}
                comparisonText={data.metric.comparison?.text ?? ""}
                comparisonBadgeVariant={(data.metric.comparison?.sentiment ?? data.metric.status?.sentiment) === "positive" ? "success" : (data.metric.comparison?.sentiment ?? data.metric.status?.sentiment) === "negative" ? "error" : data.metric.status?.sentiment === "warning" ? "warning" : "secondary"}
              />
            )}
          </div>
        </div>
        </div>
        </div>
        {children ? <div className="relative mt-12 md:mt-16">{children}</div> : null}
      </ReportSection>
  );
}
