import { useId } from "react";
import { Select, SelectItem, SelectPopup, SelectValue } from "@/components/ui/select";
import { ReportSelectTrigger } from "@/features/Reports/components/reportControls";

export function QuestionTypeFilter({ types, value, onValueChange }) {
  const id = useId();
  return (
    <div className="flex w-full flex-col gap-2 sm:max-w-xs">
      <label htmlFor={id} className="sr-only">Question types</label>
      <Select multiple items={types} value={value} onValueChange={onValueChange}>
        <ReportSelectTrigger id={id}>
          <SelectValue>
            {(selected) => selected.length === 0 ? "All question types" : selected.length === 1 ? selected[0] : `${selected.length} types selected`}
          </SelectValue>
        </ReportSelectTrigger>
        <SelectPopup>
          {types.map((type) => <SelectItem key={type} value={type}>{type}</SelectItem>)}
        </SelectPopup>
      </Select>
    </div>
  );
}
