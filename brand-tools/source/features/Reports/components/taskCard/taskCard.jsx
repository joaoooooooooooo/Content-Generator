import { ReportBadge } from "@/features/Reports/components/reportBadge";
import {
  FrameCard,
  FrameCardContent,
} from "@/components/ui/frame-card";
import { cn } from "@/lib/utils";

export function TaskCard({
  className,
  description,
  meta,
  priority,
  scopeNote,
  title,
}) {
  return (
    <FrameCard className={cn(
        "w-full",
        priority === "high" && "inset-shadow-[0_1px_--theme(--color-warning/20%)] dark:inset-shadow-[0_1px_--theme(--color-warning/28%)]",
        className,
      )} withFill>
      <FrameCardContent className="gap-6 shadow-none before:shadow-none">
        <div className="flex w-full flex-col gap-2 border-b pb-5">
          <ReportBadge segment="warning">
            {priority === "high" ? "High Priority" : null}
          </ReportBadge>
          <h3 className="text-xl leading-7 font-medium tracking-[-0.01em] text-foreground [text-wrap:balance]">
            {title}
          </h3>
          {meta && <p className="text-sm text-muted-foreground">{meta}</p>}
        </div>
        <div className="w-full">
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-foreground">What to fix</h4>
            <p className="text-sm leading-6 text-muted-foreground [text-wrap:pretty]">{description}</p>
          </div>
        </div>
        {scopeNote && <p className="text-sm leading-6 text-muted-foreground italic">{scopeNote}</p>}
      </FrameCardContent>


    </FrameCard>
  );
}
