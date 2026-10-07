"use client";

import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import type React from "react";
import { cn } from "@/lib/utils";

export interface LineBackgroundProps extends useRender.ComponentProps<"div"> {
  angle?: string;
  lineSize?: string;
  spacing?: string;
}

export function LineBackground({
  className,
  render,
  angle = "135deg",
  lineSize = "1px",
  spacing = "10px",
  style,
  ...props
}: LineBackgroundProps): React.ReactElement {
  const backgroundStyle: React.CSSProperties = {
    backgroundImage: `repeating-linear-gradient(${angle}, var(--border) 0 ${lineSize}, transparent ${lineSize} ${spacing})`,
    ...style,
  };

  const defaultProps = {
    className: cn("pointer-events-none absolute inset-0 bg-background", className),
    "data-slot": "line-background",
    style: backgroundStyle,
  };

  return useRender({
    defaultTagName: "div",
    props: mergeProps<"div">(defaultProps, props),
    render,
  });
}

export interface SideLineBackgroundProps
  extends useRender.ComponentProps<"div"> {
  angle?: string;
  lineSize?: string;
  spacing?: string;
  contentWidth?: string;
  contentPadding?: string;
  variant?: "default" | "medium" | "small";
}

export function SideLineBackground({
  className,
  render,
  angle = "135deg",
  lineSize = "1px",
  spacing = "10px",
  contentWidth = "70rem",
  contentPadding = "0px",
  variant = "default",
  style,
  ...props
}: SideLineBackgroundProps): React.ReactElement {
  const defaultWidth = `calc((100vw - ${contentWidth}) / 2 - ${contentPadding})`;
  const panelWidth =
    variant === "medium"
      ? `max(0px, calc(${defaultWidth} / 2))`
      : variant === "small"
        ? `max(0px, calc(${defaultWidth} / 4))`
        : `max(0px, ${defaultWidth})`;

  const panelStyle: React.CSSProperties = {
    backgroundImage: `repeating-linear-gradient(${angle}, var(--border) 0 ${lineSize}, transparent ${lineSize} ${spacing})`,
    width: panelWidth,
  };

  const defaultProps = {
    children: (
      <>
        <div
          className="absolute inset-y-0 left-0 hidden border-r border-border bg-background lg:block"
          data-slot="side-line-background-left"
          style={panelStyle}
        />
        <div
          className="absolute inset-y-0 right-0 hidden border-l border-border bg-background lg:block"
          data-slot="side-line-background-right"
          style={panelStyle}
        />
      </>
    ),
    className: cn(
      "pointer-events-none fixed inset-0 z-0 min-h-svh overflow-hidden",
      className,
    ),
    "data-slot": "side-line-background",
    style,
  };

  return useRender({
    defaultTagName: "div",
    props: mergeProps<"div">(defaultProps, props),
    render,
  });
}
