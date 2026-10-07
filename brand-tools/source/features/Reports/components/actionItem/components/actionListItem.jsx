import { useEffect, useState } from "react";
import { CheckIcon } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

export function ActionListItem({
  checked,
  className,
  defaultChecked,
  label = "Add llm.txt",
  onCheckedChange,
  variant = "default",
}) {
  const [internalChecked, setInternalChecked] = useState(
    defaultChecked ?? variant === "checked",
  );
  const isControlled = checked !== undefined;
  const isChecked = isControlled ? checked : internalChecked;

  useEffect(() => {
    if (!isControlled) {
      setInternalChecked(defaultChecked ?? variant === "checked");
    }
  }, [defaultChecked, isControlled, variant]);

  function handleClick() {
    const nextChecked = !isChecked;

    if (!isControlled) {
      setInternalChecked(nextChecked);
    }

    onCheckedChange?.(nextChecked);
  }

  return (
    <button
      aria-pressed={isChecked}
      className={cn(
        "flex w-full items-start justify-between gap-3 overflow-hidden rounded-lg bg-foreground/[0.04] p-2 text-left transition-opacity",
        isChecked && "opacity-35",
        className,
      )}
      onClick={handleClick}
      type="button"
    >
      <div className="flex min-w-0 flex-1 items-start gap-2.5">
        <span
          aria-hidden="true"
          className={cn(
            "relative mt-[3px] size-3.5 shrink-0 rounded-full",
            isChecked
              ? "bg-foreground/80"
              : "border border-dashed border-foreground/48",
          )}
        >
          {isChecked ? (
            <CheckIcon className="absolute left-1/2 top-1/2 size-2.5 -translate-x-1/2 -translate-y-1/2 text-background" />
          ) : null}
        </span>
        <p
          className={cn(
            "min-w-0 flex-1 whitespace-normal break-words text-sm leading-5 font-normal text-foreground [text-wrap:pretty]",
            isChecked && "line-through",
          )}
        >
          {label}
        </p>
      </div>
    </button>
  );
}
