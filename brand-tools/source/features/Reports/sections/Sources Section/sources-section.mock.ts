import type { SourcesSectionData } from "./sources-section.types";

export const sourcesSectionMock = {
  title: "Sources checked this week.",
  eyebrow: "Coverage",
  sources: [
    { id: "website", name: "Website", kind: "website", status: "connected" },
    { id: "analytics", avatarUrl: "/report-logos/analytics.svg", name: "Google Analytics", kind: "integration", status: "connected", description: "Traffic and engagement", avatarFallback: "GA" },
    { id: "search-console", avatarUrl: "/report-logos/search-console.png", name: "Search Console", kind: "integration", status: "connected", description: "Search performance", avatarFallback: "SC" },
    { id: "linkedin", avatarUrl: "/report-logos/linkedin.png", name: "LinkedIn", kind: "integration", status: "watching", description: "Company activity", avatarFallback: "LI" },
    { id: "instagram", avatarUrl: "/report-logos/instagram.png", name: "Instagram", kind: "integration", status: "watching", description: "Social activity", avatarFallback: "IG" },
    { id: "youtube", avatarUrl: "/report-logos/youtube.png", name: "YouTube", kind: "integration", status: "watching", description: "Channel updates", avatarFallback: "YT" },
    { id: "hubspot", avatarUrl: "/report-logos/hubspot.png", name: "HubSpot", kind: "integration", status: "not-connected", description: "Contact activity", avatarFallback: "HS" },
    { id: "google-ads", avatarUrl: "/report-logos/google-ads.svg", name: "Google Ads", kind: "integration", status: "not-connected", description: "Campaign performance", avatarFallback: "AD" },
  ],
} satisfies SourcesSectionData;
