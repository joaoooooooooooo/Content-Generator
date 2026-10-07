import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const segments = {
  warning: {
    className: "bg-warning/8 text-warning-foreground dark:bg-warning/16",
    dotClassName: "bg-warning",
    label: "Fix",
  },
  competitor: {
    className: "bg-transparent text-foreground",
    dotClassName: "bg-competitor",
    label: "Competitor",
  },
};

/** Pass icon={null} to use a dot, or dotOnly to hide the visible label. */
export function ReportBadge({
  children,
  className,
  dotOnly = false,
  icon,
  segment = "warning",
  size = "default",
  ...props
}) {
  const config = segments[segment] ?? segments.warning;
  const Icon = icon === undefined ? config.icon : icon;
  const label = children ?? (segment === "competitor" ? config.label : null);

  return (
    <Badge
      aria-label={dotOnly || !label ? config.label : undefined}
      {...props}
      className={cn("w-fit border-0", config.className, className)}
      size={size}
      variant="label"
    >
      {!dotOnly && Icon ? (
        <Icon aria-hidden="true" />
      ) : (
        <span aria-hidden="true" className={cn("size-1.5 shrink-0 rounded-full", config.dotClassName)} />
      )}
      {!dotOnly && label}
    </Badge>
  );
}
