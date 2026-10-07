"use client";

import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { cva, type VariantProps } from "class-variance-authority";
import type React from "react";
import { cn } from "@/lib/utils";

export const frameCardVariants = cva(
  "relative flex flex-col items-start rounded-2xl border",
  {
    defaultVariants: {
      variant: "default",
      withFill: false,
    },
    variants: {
      variant: {
        default: "p-1",
        insert: "px-1 py-0",
      },
      withFill: {
        false: "border-border bg-transparent",
        true: "border-border bg-card",
      },
    },
  },
);

export interface FrameCardProps extends useRender.ComponentProps<"div"> {
  variant?: VariantProps<typeof frameCardVariants>["variant"];
  withFill?: VariantProps<typeof frameCardVariants>["withFill"];
}

export function FrameCard({
  className,
  render,
  variant,
  withFill,
  ...props
}: FrameCardProps): React.ReactElement {
  const defaultProps = {
    className: cn(frameCardVariants({ className, variant, withFill })),
    "data-slot": "frame-card",
  };

  return useRender({
    defaultTagName: "div",
    props: mergeProps<"div">(defaultProps, props),
    render,
  });
}

export function FrameCardTop({
  className,
  render,
  ...props
}: useRender.ComponentProps<"div">): React.ReactElement {
  const defaultProps = {
    className: cn(
      "relative isolate flex h-[55px] w-full flex-col items-start justify-center gap-0.5 overflow-clip rounded-xl px-4 py-2",
      className,
    ),
    "data-slot": "frame-card-top",
  };

  return useRender({
    defaultTagName: "div",
    props: mergeProps<"div">(defaultProps, props),
    render,
  });
}

export function FrameCardContent({
  className,
  render,
  ...props
}: useRender.ComponentProps<"div">): React.ReactElement {
  const defaultProps = {
    className: cn(
      "relative isolate flex w-full flex-1 flex-col items-start gap-0.5 overflow-clip rounded-xl border bg-background p-5 shadow-xs/5 before:pointer-events-none before:absolute before:inset-0 before:rounded-[calc(var(--radius-xl)-1px)] before:shadow-[0_1px_--theme(--color-black/4%)] dark:before:shadow-[0_-1px_--theme(--color-white/6%)]",
      className,
    ),
    "data-slot": "frame-card-content",
  };

  return useRender({
    defaultTagName: "div",
    props: mergeProps<"div">(defaultProps, props),
    render,
  });
}
