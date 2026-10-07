import { useMemo } from "react";
import {
  getMetric1Comparison,
  getMetric1DisplayValue,
  getMetric1SizeVariant,
} from "@/features/Reports/components/metric1/lib/metric1";

export function useMetric1({
  comparisonBadgeLabel,
  comparisonText,
  label,
  prefix,
  size,
  suffix,
  value,
}) {
  return useMemo(
    () => ({
      ...getMetric1DisplayValue({ prefix, suffix, value }),
      ...getMetric1Comparison({
        comparisonBadgeLabel,
        comparisonText,
        label,
      }),
      ...getMetric1SizeVariant(size),
    }),
    [comparisonBadgeLabel, comparisonText, label, prefix, size, suffix, value],
  );
}
