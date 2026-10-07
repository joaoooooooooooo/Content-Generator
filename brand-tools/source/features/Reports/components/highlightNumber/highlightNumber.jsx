import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

export function HighlightNumber({
  className,
  description = "Answers that did not name Apta Agency",
  value = "75",
}) {
  return (
    <div
      className={cn(
        "flex w-[8.90625rem] min-w-25 items-start gap-3.5 max-md:self-start max-md:text-left",
        className,
      )}
    >
      <Separator className="self-stretch" orientation="vertical" />
      <div className="flex min-w-0 flex-1 flex-col items-start gap-1.5">
        <p className="whitespace-nowrap text-xl/7 font-normal text-foreground">
          {value}
        </p>
        <p className="min-w-full text-lg/normal font-normal text-muted-foreground">
          {description}
        </p>
      </div>
    </div>
  );
}
