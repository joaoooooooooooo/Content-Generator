import { FrameCard, FrameCardContent } from "@/components/ui/frame-card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { ActionListItem } from "@/features/Reports/components/actionItem/components/actionListItem";
import { ReportBadge } from "@/features/Reports/components/reportBadge";

export function ActionCard({
  className,
  description = "Structured data was not detected on the checked priority pages.",
  items = [
    { badge: "High Priority", label: "Add llm.txt", variant: "info" },
    { label: "Add llm.txt", variant: "default" },
  ],
  title = "LLM.txt Missing",
}) {
  return (
    <FrameCard className={cn("h-full w-full", className)} withFill>
      <FrameCardContent className="gap-0 p-5">
        <div className="flex w-full flex-col gap-4">
          <div className="flex w-full flex-col gap-4">
            <ReportBadge segment="warning" dotOnly />
            <h3 className="text-2xl leading-8 tracking-[-0.015em] text-foreground [text-wrap:balance]">
              {title}
            </h3>
            <p className="text-sm leading-5 font-normal text-muted-foreground [text-wrap:pretty]">
              {description}
            </p>
          </div>

          <div className="w-full py-1">
            <Separator />
          </div>

          <div className="flex w-full flex-col gap-3.5">
            {items.map((item, index) => (
              <ActionListItem
                key={`${item.label}-${index}`}
                label={item.label}
                variant={item.variant}
              />
            ))}
          </div>
        </div>
      </FrameCardContent>
    </FrameCard>
  );
}
