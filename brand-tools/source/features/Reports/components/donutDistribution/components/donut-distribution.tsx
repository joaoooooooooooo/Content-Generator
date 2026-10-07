"use client";

import {
  EChartsPieChart,
  type ChartConfig,
  type EntityRole,
} from "@/components/evilcharts/charts/echarts-pie-chart";
import { FrameCard, FrameCardContent } from "@/components/ui/frame-card";
import type React from "react";
import { cn } from "@/lib/utils";

export type DonutDistributionDatum = {
  isCompetitor?: boolean;
  channel: string;
  label: string;
  kind?: "entity" | "others";
  value: number;
  role: EntityRole;
};

export type DonutDistributionPresentationDatum = DonutDistributionDatum & {
  color: string;
};

const defaultChartData: DonutDistributionDatum[] = [
  {
    channel: "direct",
    label: "Direct",
    role: "subject",
    kind: "entity",
    value: 52400,
  },
  {
    channel: "marketplace",
    label: "Marketplace",
    role: "comparison",
    kind: "entity",
    value: 38900,
  },
  {
    channel: "wholesale",
    label: "Wholesale",
    role: "comparison",
    kind: "entity",
    value: 24150,
  },
  {
    channel: "others",
    label: "Others",
    kind: "others",
    role: "comparison",
    value: 16300,
  },
];


const SUBJECT_COLOR = "var(--chart-highlight)";
const OTHERS_COLOR = "var(--color-neutral-600)";
const COMPARISON_COLORS = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
] as const;

function money(value: number): string {
  return value.toLocaleString("en-US");
}

export function getDonutDistributionPresentation(
  data: DonutDistributionDatum[],
): {
  chartConfig: ChartConfig;
  items: DonutDistributionPresentationDatum[];
} {
  let comparisonIndex = 0;

  const items = data.map((item) => {
    if (item.kind === "others") {
      return { ...item, color: OTHERS_COLOR };
    }

    if (item.role === "subject") {
      return { ...item, color: SUBJECT_COLOR };
    }

    const color =
      COMPARISON_COLORS[
        Math.min(comparisonIndex, COMPARISON_COLORS.length - 1)
      ] ?? COMPARISON_COLORS[COMPARISON_COLORS.length - 1];
    comparisonIndex += 1;

    return { ...item, color };
  });

  const chartConfig: ChartConfig = Object.fromEntries(
    items.map((item) => [
      item.channel,
      {
        label: item.label,
        colors: { light: [item.color], dark: [item.color] },
      },
    ]),
  );

  return { chartConfig, items };
}

export function DonutDistribution({
  className,
  data = defaultChartData,
  layout = "full",
  totalLabel = "Total orders",
}: {
  totalLabel?: string;
  className?: string;
  data?: DonutDistributionDatum[];
  layout?: "chart-only" | "full";
}): React.ReactElement {
  const totalOrders = data.reduce((sum, { value }) => sum + value, 0);
  const { chartConfig, items } = getDonutDistributionPresentation(data);
  const chartNode = (
    <div className={cn("relative aspect-square w-[40%] max-w-72 shrink-0", className)}>
      <EChartsPieChart
        className="h-full w-full"
        config={chartConfig}
        data={items}
        dataKey="value"
        nameKey="channel"
      >
        <EChartsPieChart.Tooltip />
        <EChartsPieChart.Pie
          cornerRadius={12}
          endAngle={-270}
          innerRadius="62%"
          outerRadius="92%"
          paddingAngle={6}
          roleKey="role"
          startAngle={90}
        />
      </EChartsPieChart>

      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="border-border flex aspect-square w-[56%] flex-col items-center justify-center rounded-full border border-dashed">
          <span className="text-primary text-lg leading-none font-semibold tracking-tight sm:text-2xl">
            {money(totalOrders)}
          </span>
          <span className="text-muted-foreground mt-1 text-[10px] sm:text-xs">
            {totalLabel}
          </span>
        </div>
      </div>
    </div>
  );

  if (layout === "chart-only") {
    return chartNode;
  }

  return (
    <FrameCard className={cn("w-full", className)} withFill>
      <FrameCardContent className="gap-0 p-4 sm:p-5 lg:p-6">
        <div className="flex h-full w-full items-center gap-3 sm:gap-6">
          {chartNode}

          <div className="flex min-h-0 min-w-0 max-w-64 flex-1 flex-col justify-center">
            {items.map(({ channel, color, label, value }) => (
              <div key={channel} className="flex items-center gap-2 py-1.5 sm:py-2">
                <span
                  className="size-2.5 shrink-0 rounded-[3px]"
                  style={{ backgroundColor: color }}
                />
                <span className="text-muted-foreground truncate text-xs">{label}</span>
                <span className="text-primary ml-auto text-xs font-semibold">
                  ${money(value)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </FrameCardContent>
    </FrameCard>
  );
}
