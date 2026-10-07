import { CircleAlertIcon, CircleCheckIcon } from "@/components/ui/icons";
import { Badge } from "@/components/ui/badge";
import { FrameCard, FrameCardContent } from "@/components/ui/frame-card";
import { cn } from "@/lib/utils";

const statuses = {
  missing: { label: "Not detected", variant: "warning", icon: CircleAlertIcon },
  warning: { label: "Needs attention", variant: "warning", icon: CircleAlertIcon },
  good: { label: "Good shape", variant: "success", icon: CircleCheckIcon },
};

export function SiteCheckCard({ title, description, status = "missing", className }) {
  const currentStatus = statuses[status] ?? statuses.missing;
  const StatusIcon = currentStatus.icon;
  const needsAttention = currentStatus.variant === "warning";

  return (
    <FrameCard
      className={cn(
        "h-full w-full",
        needsAttention && "inset-shadow-[0_1px_--theme(--color-warning/20%)] dark:inset-shadow-[0_1px_--theme(--color-warning/28%)]",
        currentStatus.variant === "success" && "inset-shadow-[0_1px_--theme(--color-success/20%)] dark:inset-shadow-[0_1px_--theme(--color-success/28%)]",
        className,
      )}
      render={<article />}
      withFill
    >
      <FrameCardContent className="gap-4 p-5 shadow-none before:shadow-none">
        <Badge className="border-0" size="lg" variant={currentStatus.variant}>
          <StatusIcon aria-hidden="true" />
          {currentStatus.label}
        </Badge>
        <div className="space-y-2">
          <h3 className="text-base leading-6 font-medium text-foreground">{title}</h3>
          <p className="text-sm leading-6 text-muted-foreground [overflow-wrap:anywhere] [text-wrap:pretty]">{description}</p>
        </div>
      </FrameCardContent>
    </FrameCard>
  );
}
