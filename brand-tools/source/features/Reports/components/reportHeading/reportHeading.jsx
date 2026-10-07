import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const defaultTitle =
  "Weekly interactions with the client's social posts stayed close to the recent baseline.";
const defaultDescription =
  "The LinkedIn post was Apta Agency's most visible owned update this week.";

const headingSizeClasses = {
  large:
    "text-4xl/10 font-semibold tracking-[-0.022em]",
  medium: "text-3xl/9",
  small: "text-2xl/normal",
};

const labelOptions = {
  bad: { text: "Bad", variant: "error" },
  warning: { text: "Warning", variant: "warning" },
  good: { text: "Good", variant: "success" },
};

export function ReportHeading({
  align = "left",
  afterDescription,
  badge,
  badgeVariant,
  className,
  description = defaultDescription,
  titleFont = "serif",
  titleClassName,
  label,
  size = "large",
  title = defaultTitle,
  variant = "section",
  as,
}) {
  const Heading = as ?? (variant === "intro" ? "h1" : "h2");
  const labelOption =
    label === undefined
      ? badge === null
        ? null
        : labelOptions.good
      : labelOptions[label];
  const badgeText = badge ?? labelOption?.text;
  const resolvedBadgeVariant =
    badgeVariant ?? (badge ? "secondary" : labelOption?.variant);

  return (
    <div
      className={cn(
        "font-sans flex max-w-[26.5rem] flex-col gap-5",
        align === "right" && "items-end text-right",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      <div
        className={cn(
          "flex flex-col gap-3.5",
          align === "center"
            ? "items-center"
            : align === "right"
              ? "items-end"
              : "items-start",
        )}
      >
        {badgeText ? (
          <Badge size="lg" variant={resolvedBadgeVariant}>
            {badgeText}
          </Badge>
        ) : null}
        <Heading
          className={cn(
            headingSizeClasses[size] ?? headingSizeClasses.large,
            titleFont === "sans" ? "font-sans" : "report-heading-large",
            variant === "intro" && "text-[2.5rem]/11",
            "text-foreground [text-wrap:balance]",
            titleClassName,
          )}
        >
          {title}
        </Heading>
      </div>
      {description || afterDescription ? (
        <div
          className={cn(
            "flex flex-col gap-4",
            align === "right" && "items-end",
            align === "center" && "items-center",
          )}
        >
          {description ? (
            <p
              className={cn(
                "max-w-[21.75rem] text-base leading-6 font-medium text-muted-foreground",
                "[text-wrap:pretty]",
                align === "right" && "text-right",
                align === "center" && "text-center",
              )}
            >
              {description}
            </p>
          ) : null}
          {afterDescription}
        </div>
      ) : null}
    </div>
  );
}
