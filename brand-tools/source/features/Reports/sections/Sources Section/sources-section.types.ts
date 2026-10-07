export type ReportSource = {
  id: string;
  entityId?: string;
  name: string;
  kind: "website" | "integration";
  status: "connected" | "watching" | "not-connected";
  description?: string;
  avatarUrl?: string;
  avatarFallback?: string;
};

export type SourcesSectionData = {
  title: string;
  eyebrow: string;
  sources: ReportSource[];
};

export type SourcesSectionProps = {
  data: SourcesSectionData;
  onConnectSource?: (sourceId: string) => void;
  id?: string;
  className?: string;
};
