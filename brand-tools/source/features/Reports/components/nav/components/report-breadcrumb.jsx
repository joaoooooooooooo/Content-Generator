import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const DEFAULT_REPORT_LABEL = "Aug 31 Report";

export function ReportBreadcrumb({
  avatarAlt,
  avatarFallback = "AA",
  avatarSrc,
  className,
  companyName = "Apta Agency",
  reportLabel = DEFAULT_REPORT_LABEL,
}) {
  return (
    <div className={cn("flex min-w-0 items-center gap-2", className)}>
      <div className="flex min-w-0 flex-1 items-center gap-1">
        <Avatar className="size-6 bg-muted text-foreground">
          {avatarSrc ? <AvatarImage alt={avatarAlt || companyName} src={avatarSrc} /> : null}
          <AvatarFallback className="bg-muted text-[0.75rem] leading-4 font-medium tracking-[0.12px] text-foreground">
            {avatarFallback}
          </AvatarFallback>
        </Avatar>
        <p className="truncate text-base leading-6 font-semibold text-secondary-foreground">
          {companyName}
        </p>
      </div>

      <Badge className="shrink-0" size="lg" variant="secondary">
        {reportLabel}
      </Badge>
    </div>
  );
}
