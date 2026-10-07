export function getMetric1DisplayValue({ prefix, suffix, value }) {
  return {
    prefix: prefix ?? "",
    suffix: suffix ?? "",
    value: value ?? "0",
  };
}

const metric1SizeVariants = {
  xl: {
    containerClassName: "w-[235px]",
    labelClassName: "text-base leading-6",
    rowClassName:
      "inline-flex flex-nowrap items-start gap-1 whitespace-nowrap text-[72px] leading-[1.2] tracking-[-0.79px]",
  },
  lg: {
    containerClassName: "w-[235px]",
    labelClassName: "text-base leading-6",
    rowClassName:
      "inline-flex flex-nowrap items-start gap-1 whitespace-nowrap text-[64px] leading-[1.2] tracking-[-0.79px]",
  },
  md: {
    containerClassName: "",
    labelClassName: "text-base leading-6",
    rowClassName:
      "inline-flex flex-nowrap items-start gap-1 whitespace-nowrap text-4xl leading-10 tracking-[-0.79px]",
  },
  sm: {
    containerClassName: "",
    labelClassName: "text-sm leading-5",
    rowClassName:
      "inline-flex flex-nowrap items-start gap-1 whitespace-nowrap text-3xl leading-9 tracking-[-0.6px]",
  },
};

export function getMetric1SizeVariant(size = "xl") {
  return metric1SizeVariants[size] ?? metric1SizeVariants.xl;
}

export function getMetric1Comparison({
  comparisonBadgeLabel,
  comparisonText,
  label,
}) {
  return {
    comparisonBadgeLabel: comparisonBadgeLabel ?? "",
    comparisonText: comparisonText ?? "",
    label: label ?? "",
  };
}
