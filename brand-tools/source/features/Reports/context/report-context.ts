import { createContext, useContext } from "react";
import type { ReportContextData } from "./report-context.types";

export const ReportContext = createContext<ReportContextData | null>(null);

export function useReportContext() {
  const context = useContext(ReportContext);
  if (!context) throw new Error("Report sections must be rendered inside ReportProvider.");
  return context;
}

export function useReportCompany() {
  const { companyId, entities } = useReportContext();
  return entities[companyId];
}

export function useReportCompetitors() {
  const { competitorIds, entities } = useReportContext();
  return competitorIds.map((id) => entities[id]);
}
