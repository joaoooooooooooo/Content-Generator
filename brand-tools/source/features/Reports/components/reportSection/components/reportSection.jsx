import { Separator } from "@/components/ui/separator";
import { LineBackground } from "@/components/ui/line-background";
import { FullWidthDivider } from "@/features/console/components/full-width-divider";
import { cn } from "@/lib/utils";
import { createContext, useContext } from "react";
import { useSectionReveal } from "@/hooks/use-section-reveal";

const ReportSectionContext = createContext(false);

export function ReportSection({
  background,
  children,
  className,
  contentClassName,
  contentContainerClassName,
  id,
  innerClassName,
  showTopDivider = false,
  showBottomDivider,
  variant,
}) {
  const isNested = useContext(ReportSectionContext);
  const revealRef = useSectionReveal();
  const isSubsection = (variant ?? (isNested ? "subsection" : "main")) === "subsection";
  if (isSubsection) {
    return (
      <ReportSectionContext.Provider value={true}>
        <section className={cn("relative w-full scroll-mt-16", (showBottomDivider ?? true) && "pb-12 md:pb-16", className)} id={id}>
          {showTopDivider ? <FullWidthDivider position="top" /> : null}
          {(showBottomDivider ?? true) ? <FullWidthDivider position="bottom" /> : null}
          {background}
          <div className={cn("w-full", contentContainerClassName)}>
            <div className={cn("w-full", innerClassName)}>
              <div ref={revealRef} className={cn("w-full", contentClassName)}>{children}</div>
            </div>
          </div>
        </section>
      </ReportSectionContext.Provider>
    );
  }
  return (
    <ReportSectionContext.Provider value={true}>
    <section className={cn("relative scroll-mt-16", className)} id={id}>
      {showTopDivider ? <FullWidthDivider position="top" /> : null}

      <div className="pointer-events-none absolute inset-y-0 left-1/2 hidden w-full max-w-7xl -translate-x-1/2 px-4 md:block md:px-6">
        <Separator
          aria-hidden="true"
          className="absolute inset-y-0 left-4 h-full md:left-6"
          orientation="vertical"
        />
        <Separator
          aria-hidden="true"
          className="absolute inset-y-0 right-4 h-full md:right-6"
          orientation="vertical"
        />
      </div>

      {background}

      <div
        className={cn(
          "mx-auto w-full max-w-7xl px-4 py-16 md:px-6 md:py-20 xl:py-28",
          contentContainerClassName,
        )}
      >
        <div
          className={cn(
            "w-full px-0 md:px-10 xl:px-[10.5rem]",
            innerClassName,
          )}
        >
          <div ref={revealRef} className={cn("w-full", contentClassName)}>{children}</div>
        </div>
      </div>
      {(showBottomDivider ?? true) ? (
        <div aria-hidden="true" data-slot="report-section-divider" className="relative left-1/2 z-10 h-8 w-screen -translate-x-1/2 overflow-hidden border-y border-border">
          <LineBackground angle="135deg" />
        </div>
      ) : null}
    </section>
    </ReportSectionContext.Provider>
  );
}
