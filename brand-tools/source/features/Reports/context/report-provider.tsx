import type { ReactNode } from "react";
import type { ReportContextData } from "./report-context.types";
import { ReportContext } from "./report-context";

export function ReportProvider({ value, children }: { value: ReportContextData; children: ReactNode }) {
  for (const id of [value.companyId, ...value.competitorIds]) {
    if (!value.entities[id]) throw new Error(`Report entity "${id}" is missing.`);
  }
  return <ReportContext.Provider value={value}>{children}</ReportContext.Provider>;
}

