import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useMetric1 } from "@/features/Reports/components/metric1/hooks/use-metric1";

export function Metric1({
  align = "left",
  className,
  comparisonBadgeLabel = "+ 12%",
  comparisonBadgeVariant = "success",
  comparisonIcon,
  comparisonText = "Vs Last Week",
  label = "Website Impressions",
  prefix = "+",
  size = "xl",
  suffix = "%",
  value = "234",
}) {
  const metric = useMetric1({
    comparisonBadgeLabel,
    comparisonText,
    label,
    prefix,
    size,
    suffix,
    value,
  });

  return (
    <div
      className={cn(
        "flex flex-col gap-1",
        metric.containerClassName,
        align === "right" && "items-end text-right",
        className,
      )}
    >
      <div
        className={cn(
          "font-normal text-foreground",
          metric.rowClassName,
          align === "right" && "justify-end",
        )}
      >
        {metric.prefix ? <span>{metric.prefix}</span> : null}
        <span>{metric.value}</span>
        {metric.suffix ? <span>{metric.suffix}</span> : null}
      </div>

      <div className={cn("flex flex-col gap-1", align === "right" && "items-end")}>
        <p className={cn("font-normal text-foreground", metric.labelClassName)}>
          {metric.label}
        </p>

        <div
          className={cn(
            "flex flex-wrap items-center gap-1",
            align === "right" && "justify-end",
          )}
        >
          {metric.comparisonBadgeLabel ? (
            <Badge
              className="w-fit"
              hideBackground
              size="lg"
              variant={comparisonBadgeVariant}
            >
              {comparisonIcon}
              <span>{metric.comparisonBadgeLabel}</span>
            </Badge>
          ) : null}

          {metric.comparisonText ? (
            <p className="text-xs font-normal tracking-[0.12px] text-muted-foreground">
              {metric.comparisonText}
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
