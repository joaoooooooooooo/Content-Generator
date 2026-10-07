import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function ReportCardGrid({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("grid auto-rows-fr items-stretch gap-3 md:grid-cols-2 xl:grid-cols-3 [&>*]:h-full [&>*]:max-w-none", className)}>{children}</div>;
}
