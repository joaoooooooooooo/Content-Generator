import type { WebsiteAuditData } from "./website-audit.types";
const issues = [
  {
    description: "Add an llms.txt file linking AI crawlers to your key public pages.",
    fixPrompt:
      "Create a concise llms.txt file for this website. Link to the key services, important articles, about page, and any public information that best explains the organization.",
    meta: "Sitewide check ? Standard location",
    scopeNote: "This is a sitewide check, not a page-specific crawl finding.",
    priority: "high",
    title: "LLMs file not detected",
  },
  {
    description: "Review robots.txt to allow crawler access and point to the sitemap.",
    fixPrompt:
      "Audit and correct robots.txt for this website. Allow the intended public pages, confirm the sitemap location, and avoid blocking important crawler access.",
    meta: "Sitewide check ? Standard location",
    scopeNote: "This is a sitewide check, not a page-specific crawl finding.",
    title: "Robots file needs attention",
  },
  {
    description: "Add FAQs to key pages with real buyer questions and clear answers.",
    fixPrompt:
      "Add a concise visible FAQ section to the relevant service pages. Use real buyer questions about fit, timing, process, and next steps, with clear answers on the page.",
    meta: "Priority public pages",
    title: "Visible FAQs not detected",
  },
  {
    description: "Add valid JSON-LD describing your organization and key page content.",
    fixPrompt:
      "Add valid JSON-LD schema to key public pages. Include the Organization and applicable WebPage, Service, Article, Person, BreadcrumbList, and FAQPage types.",
    meta: "Priority public pages",
    title: "Structured data not detected",
  },
  {
    description: "Write unique meta descriptions that explain each page?s value and audience.",
    fixPrompt:
      "Write unique, specific meta descriptions for the affected pages. State the page value and audience in plain language and keep each description useful in search results.",
    meta: "26 affected pages",
    title: "Duplicate meta descriptions",
  },
  {
    description: "Replace duplicate title tags with unique, relevant page titles.",
    fixPrompt:
      "Audit duplicate title tags across the affected pages. Identify the shared template or page-copy cause, create unique titles, and verify the issue is resolved.",
    meta: "12 affected pages",
    title: "Duplicate title tag",
  },
  {
    description: "Fix broken internal links by updating URLs or removing obsolete links.",
    fixPrompt:
      "Find broken internal links on the affected pages. Update each link to a relevant live URL, restore the intended destination where appropriate, or remove obsolete links. Verify that the updated destinations load successfully.",
    meta: "2 affected pages",
    title: "Broken internal links",
  },
  {
    description: "Add useful visible copy and reduce unnecessary markup.",
    fixPrompt:
      "Improve pages with a low text-to-HTML ratio. Add useful visible copy that explains the page topic and reduce unnecessary template or markup clutter where possible.",
    meta: "50 affected pages",
    title: "Low text to HTML ratio",
  },
  {
    description: "Add one clear H1 that describes each page?s main topic.",
    fixPrompt:
      "Add one clear, descriptive H1 to each affected page. Make it accurately state the primary page topic and align it with the visible content.",
    meta: "30 affected pages",
    title: "Missing H1",
  },
  {
    description: "Expand thin pages with service details, proof, and a clear next step.",
    fixPrompt:
      "Expand low-word-count pages with clear, useful copy about the service, intended audience, use cases, proof points, and the next step a reader can take.",
    meta: "15 affected pages",
    title: "Low word count",
  },
  {
    description: "Keep one primary H1 and change the rest to H2 or H3 headings.",
    fixPrompt:
      "Audit pages with multiple H1 tags. Keep one clear H1 that defines the page topic, then change additional H1s to suitable H2 or H3 headings.",
    meta: "5 affected pages",
    title: "Multiple H1 tags",
  },
];
export const websiteAuditMock: WebsiteAuditData = {
  badge: "How to read this",
  title: "What the site check found",
  description: "High-priority problems are the most urgent. Warnings and notices are less severe, but they can still affect accessibility, search visibility, or site quality. The rows below group those findings into practical fixes.",
  scores: [
  {
    "id": "performance",
    "title": "Performance",
    "score": 31,
    "description": "How quickly the page loads and responds to user interactions."
  },
  {
    "id": "accessibility",
    "title": "Accessibility",
    "score": 56,
    "description": "How well the page passes automated accessibility checks."
  },
  {
    "id": "best-practices",
    "title": "Best Practices",
    "score": 73,
    "description": "How well the page follows web security and development best practices."
  },
  {
    "id": "seo",
    "title": "SEO",
    "score": 95,
    "description": "How well the page follows basic search engine optimization practices."
  }
],
  checks: [
    { id: "llms", title: "LLMs file", status: "missing", description: "No llms.txt file was found at {website}/llms.txt. This file can guide AI tools to useful public content." },
    { id: "robots", title: "Robots file", status: "good", description: "The check found robots.txt and a sitemap reference." },
    { id: "faqs", title: "Visible FAQs", status: "missing", description: "No visible FAQ sections were detected on the 25 public pages in the sitemap sample." },
    { id: "schema", title: "Structured data", status: "missing", description: "Structured data was not detected on the public pages in the sitemap sample." },
  ],
  capturedAt: "2026-08-29", highPriority: 0, warnings: 152, notices: 0, affectedPages: 60,
  issues: issues.map((issue) => ({ ...issue, id: issue.title.toLowerCase().replaceAll(' ', '-'), priority: issue.priority === 'high' ? 'high' : undefined })),
};
