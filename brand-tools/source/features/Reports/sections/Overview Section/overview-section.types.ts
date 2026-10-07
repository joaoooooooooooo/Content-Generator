import type { ReactNode } from "react";

export type OverviewSectionData = {
  interactions?: { title: string; points: { day: string; current: number; previous: number }[] };
  title: string;
  description: string;
  badge: string;
  searchCompetitors: SearchCompetitorResult[];
  paidSearch: PaidSearchResult[];
  socialWatch: { title: string; description: string; posts: SocialWatchPost[] };
  news: { title: string; description: string; articles: OverviewArticle[] };
};

export type SocialWatchPost = {
  sourceUrl?: string;
  id: string;
  entityId: string;
  platform: string;
  title: string;
  description: string;
  imageUrl?: string;
  imageAlt?: string;
};

export type OverviewArticle = {
  id: string;
  title: string;
  summary: string;
  imageUrl?: string;
  imageAlt?: string;
  source: { label: string; href?: string; entityId?: string };
};

export type SearchCompetitorResult = {
  entityId: string;
  organicKeywords: number | null;
  organicTraffic: number | null;
  paidKeywords: number | null;
  paidTraffic: number | null;
  paidSpend: number | null;
  currency: string;
};

export type PaidSearchResult = {
  entityId: string;
  paidKeywords: number | null;
  paidVisits: number | null;
  capturedAt: string;
};

export type OverviewSectionProps = {
  data: OverviewSectionData;
  id?: string;
  className?: string;
  /** Supporting subsections inside the overview's single outer boundary. */
  children?: ReactNode;
};
