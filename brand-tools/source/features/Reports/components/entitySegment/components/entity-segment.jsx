import { groupChartEntities } from "./group-chart-entities";
import { useMemo, useState } from "react";
import { EyeIcon, UserRoundIcon } from "@/components/ui/icons";
import { FrameCard, FrameCardContent, FrameCardTop } from "@/components/ui/frame-card";
import { EntityChartTabs } from "@/features/Reports/components/entitySegment/components/entity-chart-tabs";
import { Metric1 } from "@/features/Reports/components/metric1";
import { ReportBadge } from "@/features/Reports/components/reportBadge";
import {
  DonutDistribution,
  getDonutDistributionPresentation,
} from "@/features/Reports/components/donutDistribution";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

export function EntitySegment({
  staticView = false,
  chartData,
  chartViews,
  className,
  competitorLabel = "Competitor",
  comparisonBadgeLabel = "+ 12 %",
  comparisonText = "Vs Last Week",
  label = "Average across 1 daily points",
  layout = "tabs",
  onValueChange,
  subjectValue = "12",
  value = "you",
  youLabel = "You",
}) {
  const resolvedChartViews = useMemo(
    () =>
      chartViews?.length
        ? chartViews
        : [
            {
              comparisonBadgeLabel,
              comparisonText,
              data: chartData ?? [],
              label,
              subjectValue,
              tabLabel: "Source Presence",
              value: "source-presence",
            },
          ],
    [chartData, chartViews, comparisonBadgeLabel, comparisonText, label, subjectValue],
  );
  const [activeChartView, setActiveChartView] = useState(
    resolvedChartViews[0]?.value ?? "source-presence",
  );
  const currentChartView =
    resolvedChartViews.find((item) => item.value === activeChartView) ??
    resolvedChartViews[0];
  const groupedChartData = useMemo(() => groupChartEntities(currentChartView?.data ?? []), [currentChartView]);
  const currentChartPresentation = useMemo(
    () => getDonutDistributionPresentation(groupedChartData),
    [groupedChartData],
  );

  const tabsNode = (
    <Tabs
      className={className}
      onValueChange={onValueChange}
      value={value}
    >
      <TabsList
        className="rounded-lg bg-muted p-0.5 text-muted-foreground/72"
        aria-label="Choose report entity"
      >
        <TabsTrigger
          className={cn(
            "z-10 h-8 gap-1.5 rounded-md px-[9px] py-1.5 text-sm leading-5 shadow-none hover:text-foreground",
            "data-active:text-foreground",
          )}
          value="you"
        >
          <UserRoundIcon className="size-4" />
          <span>{youLabel}</span>
        </TabsTrigger>
        <TabsTrigger
          className={cn(
            "z-10 h-8 gap-1.5 rounded-md px-[9px] py-1.5 text-sm leading-5 shadow-none hover:text-foreground",
            "data-active:text-foreground",
          )}
          value="competitor"
        >
          <EyeIcon className="size-4" />
          <span>{competitorLabel}</span>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );

  if (layout === "tabs") {
    return tabsNode;
  }

  return (
    <div className={cn("flex flex-col", className)}>
      <FrameCard className="w-full" withFill>
        <FrameCardTop className="h-auto p-2">
          {staticView ? <h3 className="px-2 py-1 text-sm font-medium">{currentChartView?.tabLabel}</h3> : <EntityChartTabs
            items={resolvedChartViews.map((item) => ({
              label: item.tabLabel,
              value: item.value,
            }))}
            onValueChange={setActiveChartView}
            value={currentChartView?.value}
          />}
        </FrameCardTop>
        <FrameCardContent className="gap-0 p-4 sm:p-5 lg:p-8">
          <div className="flex w-full flex-col gap-5 lg:flex-row lg:items-start lg:justify-between lg:gap-8">
            <div className="order-2 flex min-w-0 flex-1 flex-col gap-5 lg:order-1 lg:max-w-[15rem] p-7">
              <div className="lg:hidden">
                <Metric1
                  className="max-w-none"
                  comparisonBadgeLabel={currentChartView?.comparisonBadgeLabel}
                  comparisonBadgeVariant={currentChartView?.comparisonBadgeVariant ?? "success"}
                  comparisonText={currentChartView?.comparisonText}
                  label={currentChartView?.label}
                  prefix=""
                  size="sm"
                  suffix="%"
                  value={currentChartView?.subjectValue}
                />
              </div>
              <div className="hidden lg:block">
                <Metric1
                  className="max-w-none"
                  comparisonBadgeLabel={currentChartView?.comparisonBadgeLabel}
                  comparisonBadgeVariant={currentChartView?.comparisonBadgeVariant ?? "success"}
                  comparisonText={currentChartView?.comparisonText}
                  label={currentChartView?.label}
                  prefix=""
                  size="lg"
                  suffix="%"
                  value={currentChartView?.subjectValue}
                />
              </div>

              <div className="flex min-h-0 min-w-0 max-w-64 flex-1 flex-col justify-start rounded-lg">
                {currentChartPresentation.items.map(
                  ({ channel, color, kind, role, isCompetitor, label: itemLabel, value: itemValue }) => (
                    <div key={channel} className="flex items-center gap-2 py-1.5 sm:py-2">
                      <span
                        className="size-2.5 shrink-0 rounded-[3px]"
                        style={{ backgroundColor: color }}
                      />
                      <div className="flex min-w-0 flex-col items-start gap-1">
                        <span className="max-w-full truncate text-sm text-muted-foreground">
                          {itemLabel}
                        </span>
                        {(isCompetitor ?? (role === "comparison" && kind !== "others")) && (
                          <ReportBadge segment="competitor" />
                        )}
                      </div>
                      <span className="text-primary ml-auto text-sm font-semibold">
                        {itemValue.toLocaleString("en-US")}%
                      </span>
                    </div>
                  ),
                )}
              </div>
            </div>

            <DonutDistribution
              className="order-1 mx-auto w-full max-w-[16rem] lg:order-2 lg:mx-0 lg:max-w-[25rem]"
              data={groupedChartData}
              layout="chart-only"
              totalLabel="Total share"
            />
          </div>
        </FrameCardContent>
      </FrameCard>
    </div>
  );
}
