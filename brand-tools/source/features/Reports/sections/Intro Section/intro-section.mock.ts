import type { IntroSectionData } from "./intro-section.types";

export const introSectionMock = {
  title: "Weekly interactions with the client's social posts stayed close to the recent baseline.",
  description: "The LinkedIn post was Apta Agency's most visible owned update this week.",
  metric: {
    value: "234", label: "Website Impressions", prefix: "+", suffix: "%",
    comparison: { label: "+ 12%", text: "Vs Last Week", sentiment: "positive" },
  },
} satisfies IntroSectionData;
