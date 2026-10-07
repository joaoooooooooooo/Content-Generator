export type ReportEntity = {
  id: string;
  name: string;
  website?: string;
  avatarUrl?: string;
  avatarFallback?: string;
};

export type ReportPeriod = { start: string; end: string };

export type ReportContextData = {
  companyId: string;
  competitorIds: string[];
  entities: Record<string, ReportEntity>;
  period: ReportPeriod;
  previousPeriod: ReportPeriod | null;
  reportLabel: string;
  locale: string;
};
