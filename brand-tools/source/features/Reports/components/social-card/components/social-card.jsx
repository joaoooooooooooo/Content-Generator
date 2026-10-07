import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { ImageIcon } from "@/components/ui/icons";
import { ReportBadge } from "@/features/Reports/components/reportBadge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FrameCard, FrameCardContent } from "@/components/ui/frame-card";
import { cn } from "@/lib/utils";
import { useSocialCard } from "@/features/Reports/components/social-card/hooks/use-social-card";

export function SocialCard({
  sourceUrl,
  actionIcon,
  avatarAlt,
  avatarFallback,
  avatarSrc,
  authorPosition = "top",
  headingBadge,
  header,
  thumbnailFrameClassName,
  badge,
  badgeIcon,
  badgeLabel = "Competitor",
  badgeVariant = "warning",
  className,
  description,
  footer,
  icon,
  metaLabel = "LinkedIn",
  name = "Apta Agency",
  thumbnailAlt = "",
  thumbnailClassName,
  thumbnailSrc,
  title = "Blank canvas to a fully built Webflow site.",
  variant = "default",
  withFill = true,
}) {
  const [failedThumbnailSrc, setFailedThumbnailSrc] = useState(null);
  const card = useSocialCard({
    badge,
    badgeIcon,
    badgeLabel,
    badgeVariant,
    variant,
  });
  const fallbackLabel = avatarFallback ?? icon ?? name.slice(0, 1).toUpperCase();

  return (
    <FrameCard
      className={cn(
        "w-full max-w-[24.875rem] cursor-pointer transition-colors [@media(any-hover:hover)]:hover:bg-primary-foreground",
        className,
      )}
      withFill={withFill}
    >
      <FrameCardContent className="gap-0 p-0 shadow-none before:shadow-none">
        {header}
        <div className={cn("relative aspect-[4/5] w-full shrink-0 overflow-hidden bg-muted", thumbnailFrameClassName)}>
          {thumbnailSrc && thumbnailSrc !== failedThumbnailSrc ? (
            <img
              alt={thumbnailAlt}
              className={cn("size-full object-contain", thumbnailClassName)}
              src={thumbnailSrc}
              loading="eager"
              onError={() => setFailedThumbnailSrc(thumbnailSrc)}
            />
          ) : (
            <div className="flex h-full flex-col items-center justify-center gap-2 text-muted-foreground">
              <ImageIcon aria-hidden="true" className="size-8 stroke-1" />
              <span className="text-xs">Post image preview</span>
            </div>
          )}
        </div>

        <div className="flex w-full flex-col gap-4 p-5">
          {!header && <div className={cn("flex w-full items-start justify-between gap-3", authorPosition === "bottom" && "order-last mt-auto")}>
            <div className={cn("flex min-w-0 items-center gap-1", authorPosition === "bottom" && "items-stretch gap-2")}>
              <Avatar className="aspect-square size-9 bg-muted text-muted-foreground">
                {avatarSrc ? (
                  <AvatarImage alt={avatarAlt || `${name} avatar`} src={avatarSrc} />
                ) : null}
                <AvatarFallback className="bg-muted text-muted-foreground [&_img]:size-4 [&_img]:shrink-0 [&_svg]:size-4 [&_svg]:shrink-0">
                  {fallbackLabel}
                </AvatarFallback>
              </Avatar>

              <div className="flex min-w-0 flex-col justify-center">
                <p className="truncate text-xs leading-4 tracking-[0.12px] text-muted-foreground">
                  {metaLabel}
                </p>
                <p
                  className={cn(
                    "truncate text-sm font-normal leading-5",
                    card.nameClassName,
                  )}
                >
                  {name}
                </p>
              </div>
            </div>

            {card.badge || actionIcon ? (
              <div className="flex shrink-0 items-center gap-2">
                {card.badge?.label === "Competitor" ? (
                  <ReportBadge segment="competitor" />
                ) : card.badge ? (
                  <Badge size="lg"
                    className="shrink-0"
                    variant={card.badge.variant ?? badgeVariant}
                  >
                    {card.badge.icon}
                    <span>{card.badge.label}</span>
                  </Badge>
                ) : null}

                {actionIcon ? (
                  <div className="flex items-center justify-center text-muted-foreground/50 [&_img]:size-4 [&_img]:shrink-0 [&_svg]:size-4 [&_svg]:shrink-0">
                    {actionIcon}
                  </div>
                ) : null}
              </div>
            ) : null}
          </div>}

          <div className="w-full space-y-2">
            {headingBadge}
            <h3 className="text-xl leading-7 font-medium tracking-[-0.01em] text-foreground [text-wrap:balance]">
              {title}
            </h3>
            {sourceUrl && <a href={sourceUrl} className="block text-xs text-muted-foreground underline underline-offset-4">Source: {name} on LinkedIn</a>}
            {description && (
              <p className="text-sm leading-6 text-muted-foreground [text-wrap:pretty]">
                {description}
              </p>
            )}
          </div>
          {footer}
        </div>
      </FrameCardContent>
    </FrameCard>
  );
}
