import type { NextStepsData } from "./next-steps.types";
export const nextStepsMock: NextStepsData = {
  title: "Next steps for {company}",
  description: "Start with the LinkedIn post. It led {company}'s activity this week. Competitor activity was visible too. Use the actions below to plan the next improvements.",
  actionsHeading: {
    badge: "Next steps",
    title: "What to do next",
    description: "LLMs file, Visible FAQs, and Structured data need attention on the website. Start with those confirmed issues before adding anything new, because they affect how clearly important pages and files can be understood.",
  },
  actions: [
  {
    id: "01",
    description: "No llms.txt file was found at the standard location.",
    items: [
      { label: "Add llms.txt", variant: "default" },
      { label: "Review robots.txt rules", variant: "default" },
    ],
    title: "LLMs file missing",
  },
  {
    id: "02",
    description: "Important pages have mixed metadata quality and should be normalized this week.",
    items: [
      { label: "Rewrite homepage meta description", variant: "default" },
      { label: "Align title tags across service pages", variant: "default" },
    ],
    title: "Metadata Alignment",
  },
  {
    id: "03",
    description: "A few tracked URLs are still missing internal reinforcement from high-authority pages.",
    items: [
      { label: "Link pricing page from top nav", variant: "default" },
      { label: "Add case study cross-links", variant: "default" },
    ],
    title: "Internal Linking Gaps",
  },
  {
    id: "04",
    description: "There is room to improve entity coverage on pages already performing well in search.",
    items: [
      { label: "Add organization schema to about page", variant: "default" },
      { label: "Expand entity mentions on service pages", variant: "default" },
    ],
    title: "Entity Coverage",
  },
],
};
