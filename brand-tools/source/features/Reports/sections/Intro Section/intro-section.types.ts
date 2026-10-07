import type { ReactNode } from "react";

export type IntroSectionData = {
  title: string;
  description: string | null;
  metric: {
    status?: { label: string; sentiment: "positive" | "negative" | "neutral" | "warning" };
    value: string;
    label: string;
    prefix: string;
    suffix: string;
    comparison: { label: string; text: string; sentiment: "positive" | "negative" | "neutral" } | null;
  } | null;
};

export type IntroSectionProps = {
  children?: ReactNode;
  data: IntroSectionData;
  /** Absolute report URL to copy. Omit to hide the copy action. */
  reportUrl?: string;
  id?: string;
  className?: string;
};
