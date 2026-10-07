import { Badge } from "@/components/ui/badge";
import { ReportBadge } from "@/features/Reports/components/reportBadge";
import { cn } from "@/lib/utils";

export function RankItem({
  className,
  fillPercentage = 0,
  imageAlt,
  imageKey,
  imageSrc,
  isCompetitor = false,
  label = "superside.com",
  value = 12,
  valueLabel = "Citations",
  percentageLabel,
}) {
  const boundedFill = Math.min(Math.max(fillPercentage, 0), 100);

  return (
    <li
      className={cn(
        "relative isolate flex min-h-13 w-full items-center justify-between gap-3 overflow-hidden rounded-2xl border bg-background px-4 py-2.5",
        className,
      )}
    >
      <div
        aria-hidden="true"
        className="absolute inset-y-0 left-0 z-0 bg-secondary"
        style={{ width: `${boundedFill}%` }}
      />
      <div className="relative z-10 flex min-w-0 items-center gap-2">
        <div className="flex size-7 shrink-0 items-center justify-center overflow-hidden rounded-[0.3rem] bg-muted text-xs font-medium text-muted-foreground">
          {imageSrc ? (
            <img
              data-ai-image={imageKey}
              alt={imageAlt ?? `${label} logo`}
              className="size-full object-cover"
              src={imageSrc}
            />
          ) : (
            label.slice(0, 1).toUpperCase()
          )}
        </div>
        <div className="flex min-w-0 flex-wrap items-center gap-x-4 gap-y-2">
        <p className="truncate text-lg/normal font-normal text-foreground">
          {label}
        </p>
        {isCompetitor && <ReportBadge segment="competitor" size="default" />}
        </div>
      </div>
      <div className="relative z-10 flex shrink-0 items-center gap-2">
      <Badge
        className="z-10 tracking-[0.12px]"
        size="default"
        variant="secondary"
      >
        {value} {valueLabel}
      </Badge>
      {percentageLabel && <span className="text-xs tabular-nums text-muted-foreground">{percentageLabel}</span>}
      </div>
    </li>
  );
}
