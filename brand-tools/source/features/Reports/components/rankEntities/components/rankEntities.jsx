import { RankItem } from "@/features/Reports/components/rankEntities/components/rankItem";
import { cn } from "@/lib/utils";

const defaultItems = [
  { label: "superside.com", value: 12 },
  { label: "curio.digital", value: 8 },
  { label: "designstudio.com", value: 5 },
];

function getNumericValue(value) {
  const numericValue = Number(value);
  return Number.isFinite(numericValue) ? numericValue : 0;
}

export function RankEntities({
  className,
  items = defaultItems,
  maxValue,
  valueLabel = "Citations",
}) {
  const rankedItems = [...items].sort(
    (firstItem, secondItem) =>
      getNumericValue(secondItem.value) - getNumericValue(firstItem.value),
  );
  const highestValue = getNumericValue(rankedItems[0]?.value);
  const normalizationValue = getNumericValue(maxValue) || highestValue;

  return (
    <ol className={cn("flex w-full list-none flex-col gap-2 p-0", className)}>
      {rankedItems.map((item) => {
        const value = getNumericValue(item.value);
        const fillPercentage = normalizationValue
          ? (value / normalizationValue) * 100
          : 0;

        return (
          <RankItem
            fillPercentage={fillPercentage}
            imageAlt={item.imageAlt}
            imageSrc={item.imageSrc}
            isCompetitor={item.isCompetitor}
            key={item.id ?? item.label}
            label={item.label}
            value={value}
            valueLabel={item.valueLabel ?? valueLabel}
          />
        );
      })}
    </ol>
  );
}
