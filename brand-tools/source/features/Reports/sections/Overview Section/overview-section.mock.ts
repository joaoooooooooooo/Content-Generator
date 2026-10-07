import type { OverviewSectionData } from "./overview-section.types";

export const overviewSectionMock = {
  badge: "01 Around you",
  interactions: { title: "Weekly interactions with the client's social posts stayed close to the recent baseline.", points: [
  { day: "Mon", current: 67, previous: 64 },
  { day: "Tue", current: 89, previous: 85 },
  { day: "Wed", current: 64, previous: 68 },
  { day: "Thu", current: 74, previous: 71 },
  { day: "Fri", current: 112, previous: 108 },
  { day: "Sat", current: 121, previous: 116 },
  { day: "Sun", current: 98, previous: 92 },
] },
  title: "What happened around you",
  description: "Competitor, watch-list, news, and search-neighbor signals that help explain the surrounding market.",
  searchCompetitors: [
    { entityId: "hlabs", organicKeywords: 65, organicTraffic: 26, paidKeywords: 0, paidTraffic: 0, paidSpend: 0, currency: "USD" },
    { entityId: "superside", organicKeywords: 27568, organicTraffic: 47355, paidKeywords: 282, paidTraffic: 1979, paidSpend: 0, currency: "USD" },
    { entityId: "curio", organicKeywords: 37, organicTraffic: 4, paidKeywords: 0, paidTraffic: 0, paidSpend: 0, currency: "USD" },
  ],
  socialWatch: {
  "title": "Social activity worth watching",
  "description": "Recent posts from your company and competitors, with the themes drawing attention.",
  "posts": [
    {
      "id": "apta-webflow",
      "entityId": "apta",
      "platform": "LinkedIn",
      "title": "From concept to Webflow",
      "description": "Blank canvas to a fully built Webflow site."
    },
    {
      "id": "apta-product",
      "entityId": "apta",
      "platform": "LinkedIn",
      "title": "Steady interest in product work",
      "description": "Another product-focused post drew steady engagement."
    },
    {
      "id": "apta-design",
      "entityId": "apta",
      "platform": "LinkedIn",
      "title": "A consistent design story",
      "description": "The week's updates stayed consistent across design and development themes."
    },
    {
      "id": "superside-pages",
      "entityId": "superside",
      "platform": "LinkedIn",
      "title": "Product pages gain visibility",
      "description": "Visibility increased around product landing pages."
    },
    {
      "id": "superside-campaign",
      "entityId": "superside",
      "platform": "LinkedIn",
      "title": "Campaign work in the spotlight",
      "description": "Another campaign-focused post drew attention."
    },
    {
      "id": "superside-creative",
      "entityId": "superside",
      "platform": "LinkedIn",
      "title": "Creative production draws interest",
      "description": "Engagement clustered around creative production positioning."
    }
  ]
},
  news: {
  "title": "News and articles",
  "description": "Updates and ideas worth your attention.",
  "articles": [
    {
      "id": "campaign-ready",
      "title": "Get your next campaign ready",
      "summary": "Start with a clear offer and audience. Use an existing page if it already gives visitors what they need to act.",
      "source": {
        "label": "OpenAI"
      }
    }
  ]
},
  paidSearch: [
    { entityId: "curio", paidKeywords: 0, paidVisits: 0, capturedAt: "2026-08-29" },
    { entityId: "superside", paidKeywords: 282, paidVisits: 1979, capturedAt: "2026-08-29" },
    { entityId: "hlabs", paidKeywords: 0, paidVisits: 0, capturedAt: "2026-08-29" },
  ],
} satisfies OverviewSectionData;
