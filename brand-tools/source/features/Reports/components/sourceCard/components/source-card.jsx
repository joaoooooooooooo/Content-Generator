import { ReportBadge } from "@/features/Reports/components/reportBadge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FrameCard, FrameCardContent } from "@/components/ui/frame-card";
import { cn } from "@/lib/utils";
import { CheckIcon, EyeIcon } from "@/components/ui/icons";

const statusOptions = {
  connected: {
    icon: CheckIcon,
    label: "Connected",
    variant: "success",
  },
  watching: {
    icon: EyeIcon,
    label: "Watching",
    variant: "info",
  },
};

export function SourceCard({
  avatarAlt,
  avatarFallback,
  avatarSrc,
  className,
  connectLabel = "Connect Source",
  connectDisabled = false,
  description = "apta.agency",
  name = "Website",
  isCompetitor = false,
  onConnect,
  status = "connected",
}) {
  const isNotConnected = status === "not-connected";
  const statusOption = statusOptions[status];
  const StatusIcon = statusOption?.icon;
  const fallback = avatarFallback ?? name.slice(0, 2).toUpperCase();

  return (
    <FrameCard
      className={cn(
        "w-full max-w-[19rem]",
        isNotConnected && "border-dashed",
        className,
      )}
      withFill={!isNotConnected}
    >
      <FrameCardContent
        className={cn(
          "min-h-32 justify-between gap-7 p-5",
          isNotConnected &&
            "border-dashed bg-transparent shadow-xs/5 before:hidden",
        )}
      >
        <div className="flex min-h-7 w-full items-start justify-between">
          {statusOption ? (
            <Badge
              className="w-fit"
              size="default"
              variant={statusOption.variant}
            >
              <StatusIcon aria-hidden="true" />
              {statusOption.label}
            </Badge>
          ) : (
            <Button
              className="h-7 text-sm sm:h-7 sm:text-sm"
              onClick={onConnect}
              disabled={connectDisabled}
              size="xs"
              type="button"
              variant="outline"
            >
              {connectLabel}
            </Button>
          )}
        </div>

        <div className="flex w-full items-center gap-2">
          <Avatar className="size-7 bg-muted text-xs text-muted-foreground">
            {avatarSrc ? (
              <AvatarImage alt={avatarAlt ?? `${name} source`} src={avatarSrc} />
            ) : null}
            <AvatarFallback>{fallback}</AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            {isCompetitor && <ReportBadge segment="competitor" size="sm" />}
            <p className="truncate text-lg/7 tracking-[-0.18px] text-foreground">
              {name}
            </p>
            <p className="truncate text-xs/4 tracking-[0.12px] text-muted-foreground">
              {description}
            </p>
          </div>
        </div>
      </FrameCardContent>
    </FrameCard>
  );
}
