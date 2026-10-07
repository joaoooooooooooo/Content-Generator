import { EChartsRadialChart } from "@/components/evilcharts/charts/echarts-radial-chart";
import { FrameCard, FrameCardContent } from "@/components/ui/frame-card";
import { cn } from "@/lib/utils";

const scoreColors = {
  bad: "var(--color-red-400)",
  good: "var(--color-emerald-400)",
  moderate: "var(--color-orange-400)",
};

function getScoreStatus(score) {
  if (score < 50) return "bad";
  if (score < 90) return "moderate";
  return "good";
}

export function SiteStatCard({
  className,
  description =
    "How quickly the mobile page experience performs in Google PageSpeed Insights. Score:",
  max = 100,
  score = 73,
  strokeWidth = 5,
  title = "PageSpeed Performance",
}) {
  const maxScore = Math.max(Number(max) || 100, 1);
  const normalizedScore = Math.min(
    Math.max(Number(score) || 0, 0),
    maxScore,
  );
  const scoreStatus = getScoreStatus((normalizedScore / maxScore) * 100);
  const scoreColor = scoreColors[scoreStatus];
  const chartData = [{ name: "score", value: normalizedScore }];
  const chartConfig = {
    score: {
      label: `${title} score`,
      colors: { dark: [scoreColor], light: [scoreColor] },
    },
  };

  return (
    <FrameCard className={cn("w-full max-w-[31rem]", className)} withFill>
      <FrameCardContent className="flex-1 gap-3 px-5 py-4">
        <div className="flex w-full flex-col gap-1.5">
          <h2 className="max-w-[13rem] text-2xl/normal font-normal tracking-[-0.36px] text-foreground [text-wrap:balance]">
            {title}
          </h2>
          <p className="text-sm/5 font-normal text-muted-foreground">
            {description}
          </p>
        </div>

        <div className="relative mt-auto aspect-[5/4] w-full shrink-0">
          <div className="absolute top-0 left-0 aspect-square w-full">
          <EChartsRadialChart
            className="h-full w-full"
            config={chartConfig}
            data={chartData}
            innerRadius="66%"
            max={maxScore}
            nameKey="name"
            outerRadius="96%"
            variant="semi"
          >
            <EChartsRadialChart.RadialBar
              barSize={strokeWidth}
              cornerRadius={9}
              dataKey="value"
              isClickable={false}
              showBackground
            />
          </EChartsRadialChart>

          <div className="pointer-events-none absolute inset-x-0 top-[calc(70%-4px)] flex -translate-y-1/2 justify-center">
            <p className="text-xl/normal font-normal text-foreground">
              <span>{normalizedScore}</span>
              <span className="text-muted-foreground">/{maxScore}</span>
            </p>
          </div>
          </div>
        </div>
      </FrameCardContent>
    </FrameCard>
  );
}
