import type { SocialWatchPost, OverviewArticle } from "./sections/Overview Section/overview-section.types";

// Curated source examples, independent of the illustrative weekly metrics.
export const editorialPosts = [
  {
    "id": "apta-0",
    "entityId": "typical-company",
    "platform": "LinkedIn",
    "title": "Framer or Webflow?",
    "description": "Apta compares the platforms across CMS, SEO, animation and project needs.",
    "imageUrl": "/report-media/apta-0.jpg",
    "imageAlt": "Framer or Webflow? - original Apta Agency post artwork",
    "sourceUrl": "https://www.linkedin.com/posts/aptaagency_framer-or-webflow-the-question-every-new-activity-7506000995005476864-sw5s"
  },
  {
    "id": "apta-3",
    "entityId": "typical-company",
    "platform": "LinkedIn",
    "title": "Keeping creative work moving",
    "description": "Apta describes how a design partner can support delivery when an internal team is unavailable.",
    "imageUrl": "/report-media/apta-3.jpg",
    "imageAlt": "Keeping creative work moving - original Apta Agency post artwork",
    "sourceUrl": "https://www.linkedin.com/posts/aptaagency_when-someone-on-your-team-is-out-the-deadline-activity-7503452969644806144--9nD"
  },
  {
    "id": "apta-7",
    "entityId": "typical-company",
    "platform": "LinkedIn",
    "title": "Sensedia: a site built to scale",
    "description": "Apta shares how six reusable Webflow collections supported a 100-plus-page website.",
    "imageUrl": "/report-media/apta-7.jpg",
    "imageAlt": "Sensedia: a site built to scale - original Apta Agency post artwork",
    "sourceUrl": "https://www.linkedin.com/posts/aptaagency_how-we-built-100-pages-for-sensedia-in-8-activity-7501263059257135104-gZf5"
  },
  {
    "id": "superside-1",
    "entityId": "competitor-0",
    "platform": "LinkedIn",
    "title": "The Creative Table",
    "description": "Superside and Canva invite creative leaders to discuss AI and human craft in London.",
    "imageUrl": "/report-media/superside-1.jpg",
    "imageAlt": "The Creative Table - original Superside post artwork",
    "sourceUrl": "https://www.linkedin.com/posts/superside_before-the-keynotes-and-the-crowds-were-activity-7503842167623413760-gK-a"
  },
  {
    "id": "superside-2",
    "entityId": "competitor-0",
    "platform": "LinkedIn",
    "title": "Connecting strategy and production",
    "description": "Superside previews an Adweek session on connecting intelligence, creative work and results.",
    "imageUrl": "/report-media/superside-2.jpg",
    "imageAlt": "Connecting strategy and production - original Superside post artwork",
    "sourceUrl": "https://www.linkedin.com/posts/superside_sorry-to-be-the-ones-to-say-it-but-the-way-activity-7503490310656704512-9nbw"
  },
  {
    "id": "superside-4",
    "entityId": "competitor-0",
    "platform": "LinkedIn",
    "title": "Inside a learning creative workflow",
    "description": "A SHIFT session shows how Superside connects performance data with creative production.",
    "imageUrl": "/report-media/superside-4.jpg",
    "imageAlt": "Inside a learning creative workflow - original Superside post artwork",
    "sourceUrl": "https://www.linkedin.com/posts/superside_were-showing-you-how-we-do-it-really-activity-7500568162845999104-G0P4"
  }
] satisfies SocialWatchPost[];

export const editorialArticles = [
  {
    "id": "superside-creative",
    "title": "Beyond the AI hype: What great creative looks like in 2026",
    "summary": "A conversation about creative judgment, brand meaning and using AI with intent.",
    "imageUrl": "/report-media/superside-creative.png",
    "imageAlt": "Superside creative excellence article artwork",
    "source": {
      "label": "Superside",
      "href": "https://www.superside.com/blog/what-great-creative-looks-like-beyond-the-ai-hype"
    }
  },
  {
    "id": "superside-trends",
    "title": "7 Top-Performing Ad Creative Trends for 2026",
    "summary": "Superside explores storytelling, video, influencers and AI in advertising creative.",
    "imageUrl": "/report-media/superside-trends.webp",
    "imageAlt": "Superside advertising creative trends article artwork",
    "source": {
      "label": "Superside",
      "href": "https://www.superside.com/blog/advertising-creative-trends"
    }
  }
] satisfies OverviewArticle[];
