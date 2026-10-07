import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

export function EntityChartTabs({
  className,
  items,
  onValueChange,
  value,
}) {
  return (
    <Tabs className={cn("min-w-0 max-w-full overflow-x-auto p-1", className)} onValueChange={onValueChange} value={value}>
      <TabsList
        aria-label="Choose chart view"
        className="rounded-lg bg-muted p-0.5 text-muted-foreground/72"
      >
        {items.map((item) => (
          <TabsTrigger
            key={item.value}
            className={cn(
              "z-10 h-8 shrink-0 rounded-md px-2.5 py-1.5 text-sm leading-5 shadow-none hover:text-foreground",
              "data-active:text-foreground",
            )}
            value={item.value}
          >
            <span>{item.label}</span>
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}
