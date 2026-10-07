import { SelectTrigger } from "@/components/ui/select";
import { cn } from "@/lib/utils";

export function ReportSelectTrigger({ className, ...props }) {
  return <SelectTrigger {...props} size="lg" className={cn("border-transparent bg-muted shadow-none before:hidden dark:bg-muted", className)} />;
}
