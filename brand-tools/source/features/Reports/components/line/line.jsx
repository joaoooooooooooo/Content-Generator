"use client";

import { EChartsLineChart } from "@/components/evilcharts/charts/echarts-line-chart";
import { FrameCard, FrameCardContent } from "@/components/ui/frame-card";
import { Metric1 } from "@/features/Reports/components/metric1";
import { cn } from "@/lib/utils";

// Demo daily totals for two complete weeks, aligned by weekday.
const chartData = [
  { day: "Mon", current: 67, previous: 64 },
  { day: "Tue", current: 89, previous: 85 },
  { day: "Wed", current: 64, previous: 68 },
  { day: "Thu", current: 74, previous: 71 },
  { day: "Fri", current: 112, previous: 108 },
  { day: "Sat", current: 121, previous: 116 },
  { day: "Sun", current: 98, previous: 92 },
];

const chartConfig = {
  current: { label: "This week", colors: { light: ["#171717"], dark: ["#fafafa"] } },
  previous: { label: "Last week", colors: { light: ["#d4d4d4"], dark: ["#525252"] } },
};

const LEGEND = [
  { key: "current", label: "This week", swatch: "bg-[#171717] dark:bg-[#fafafa]" },
  { key: "previous", label: "Last week", swatch: "bg-[#d4d4d4] dark:bg-[#525252]" },
];

function ReportsLineChartCanvas({ className, data = chartData }) {
  return (
    <div className={cn("min-h-0 h-[16rem] w-full sm:h-[18rem] lg:h-[20rem]", className)}>
      <EChartsLineChart
        className="h-full w-full"
        config={chartConfig}
        curveType="linear"
        data={data}
        xDataKey="day"
      >
        <EChartsLineChart.Grid />
        <EChartsLineChart.YAxis />
        <EChartsLineChart.XAxis dataKey="day" />
        <EChartsLineChart.Tooltip />
        <EChartsLineChart.Line
          dataKey="previous"
          strokeVariant="dashed"
          strokeWidth={1.5}
        />
        <EChartsLineChart.Line dataKey="current" strokeVariant="solid" strokeWidth={1.5}>
          <EChartsLineChart.ActiveDot />
        </EChartsLineChart.Line>
      </EChartsLineChart>
    </div>
  );
}

export function ReportsMultiSeriesLineChart({ className, variant = "default", data = chartData }) {
const TOTAL = data.reduce((sum, { current }) => sum + current, 0);
const PREVIOUS_TOTAL = data.reduce((sum, { previous }) => sum + previous, 0);
const CHANGE_PERCENT = PREVIOUS_TOTAL ? ((TOTAL - PREVIOUS_TOTAL) / PREVIOUS_TOTAL) * 100 : 0;
const COMPARISON_LABEL = `${CHANGE_PERCENT >= 0 ? "+" : ""}${CHANGE_PERCENT.toFixed(1)}%`;


  if (variant === "lines") {
    return <ReportsLineChartCanvas className={className} data={data} />;
  }

  return (
    <FrameCard className={cn(
        "w-full",
        TOTAL > PREVIOUS_TOTAL && "inset-shadow-[0_1px_--theme(--color-success/20%)] dark:inset-shadow-[0_1px_--theme(--color-success/28%)]",
        className,
      )} withFill>
      <FrameCardContent className="gap-0 p-4 sm:p-5 lg:p-6">
        <div className="flex w-full flex-col gap-6">
          <div className="flex w-full flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <Metric1
              comparisonBadgeLabel={COMPARISON_LABEL}
              comparisonBadgeVariant={CHANGE_PERCENT >= 0 ? "success" : "error"}
              comparisonText="Vs last week"
              label="Social interactions"
              prefix=""
              size="sm"
              suffix=""
              value={TOTAL.toString()}
            />

            <div className="flex w-full flex-wrap items-center gap-3 sm:w-auto sm:justify-end">
              {LEGEND.map(({ key, label, swatch }) => (
                <span
                  key={key}
                  className="text-muted-foreground flex items-center gap-1.5 text-[11px] sm:text-xs"
                >
                  <span className={cn("size-2.5 shrink-0 rounded-full", swatch)} />
                  {label}
                </span>
              ))}
            </div>
          </div>

          <ReportsLineChartCanvas data={data} />
        </div>
      </FrameCardContent>
    </FrameCard>
  );
}
