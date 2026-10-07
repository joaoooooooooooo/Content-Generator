import { ArrowUpRightIcon, ImageIcon } from "@/components/ui/icons";
import { Badge } from "@/components/ui/badge";
import { FrameCard, FrameCardContent } from "@/components/ui/frame-card";
import { cn } from "@/lib/utils";

export function NewsCard({
  className,
  title,
  takeaway,
  imageSrc,
  imageAlt = "",
  source,
  links = [],
  category = "News",
}) {
  const linkClassName = "inline-flex min-h-8 items-center gap-1 rounded-sm text-sm font-medium text-foreground underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

  return (
    <FrameCard
      className={cn(
        "w-full cursor-pointer transition-colors [@media(any-hover:hover)]:hover:bg-primary-foreground",
        className,
      )}
      render={<article />}
      withFill
    >
      <FrameCardContent className="gap-0 p-0 shadow-none before:shadow-none">
        <div className="aspect-video w-full shrink-0 overflow-hidden bg-muted">
          {imageSrc ? (
            <img src={imageSrc} alt={imageAlt} loading="eager" className="size-full object-cover" />
          ) : (
            <div className="flex h-full flex-col items-center justify-center gap-2 text-muted-foreground">
              <ImageIcon aria-hidden="true" className="size-8 stroke-1" />
              <span className="text-xs">Article image preview</span>
            </div>
          )}
        </div>
        <div className="flex w-full flex-col gap-4 p-5">
        <div className="flex w-full flex-wrap items-center gap-2">
          <Badge size="lg" variant="info" className="border-0">{category}</Badge>
          {source && <span className="text-xs text-muted-foreground">{source.label}</span>}
        </div>

        <div className="max-w-2xl space-y-2">
          <h3 className="text-xl leading-7 font-medium tracking-[-0.01em] text-foreground [text-wrap:balance]">{title}</h3>
          {takeaway && <p className="text-sm leading-6 text-muted-foreground [text-wrap:pretty]">{takeaway}</p>}
        </div>

        {(source?.href || links.length > 0) && (
          <div className="flex w-full flex-wrap items-center gap-x-5 gap-y-2 border-t pt-4">
            {source?.href && (
              <a className={linkClassName} href={source.href}>
                Source: {source.label}<ArrowUpRightIcon aria-hidden="true" className="size-3.5" />
              </a>
            )}
            {links.map((link) => (
              <a key={link.href} className={linkClassName} href={link.href}>
                {link.label}<ArrowUpRightIcon aria-hidden="true" className="size-3.5" />
              </a>
            ))}
          </div>
        )}
        </div>
      </FrameCardContent>
    </FrameCard>
  );
}
