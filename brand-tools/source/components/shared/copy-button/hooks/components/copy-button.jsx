"use client";

import { CheckIcon, CopyIcon } from "@/components/ui/icons";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useCopyButton } from "@/components/shared/copy-button/hooks/use-copy-button";

export function CopyButton({
  className,
  copiedDuration,
  copiedLabel = "Copied",
  label = "Copy",
  text,
  ...props
}) {
  const { copied, handleCopy } = useCopyButton({
    copiedDuration,
    copiedLabel,
    text,
  });

  return (
    <Button
      className={cn("w-fit", className)}
      onClick={handleCopy}
      variant="outline"
      {...props}
    >
      {copied ? <CheckIcon aria-hidden="true" /> : <CopyIcon aria-hidden="true" />}
      {copied ? copiedLabel : label}
    </Button>
  );
}
