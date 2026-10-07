import { nextStepsMock } from "./sections/Next Steps Section/next-steps.mock";
import { websiteAuditMock } from "./sections/Website Audit Section/website-audit.mock";
import type { ReportData } from "./report.types";
import { introSectionMock } from "./sections/Intro Section/intro-section.mock";
import { sourcesSectionMock } from "./sections/Sources Section/sources-section.mock";
import { overviewSectionMock } from "./sections/Overview Section/overview-section.mock";
import { aiVisibilityMock } from "./sections/AI Visibility Section/ai-visibility.mock";

export const reportMock = {
  context: {
    companyId: "apta",
    competitorIds: ["superside", "curio", "hlabs"],
    entities: {
      apta: { id: "apta", name: "Apta Agency", website: "https://apta.agency", avatarUrl: "/report-logos/apta.jpg", avatarFallback: "AA" },
      superside: { id: "superside", name: "Superside", website: "https://superside.com", avatarUrl: "/report-logos/superside.jpg", avatarFallback: "S" },
      curio: { id: "curio", name: "Curio Digital", website: "https://curiodigital.io", avatarUrl: "/report-logos/curio.jpg", avatarFallback: "CD" },
      hlabs: { id: "hlabs", name: "Hlabs", website: "https://hlabs.co.uk", avatarUrl: "/report-logos/hlabs.png", avatarFallback: "HL" },
      designstudio: { id: "designstudio", name: "DesignStudio", website: "https://designstudio.com", avatarUrl: "/report-logos/designstudio.png", avatarFallback: "D" },
      brandfuel: { id: "brandfuel", name: "Brandfuel", website: "https://brandfuel.co", avatarUrl: "/report-logos/company.svg", avatarFallback: "B" },
    },
    period: { start: "2026-08-25", end: "2026-08-31" },
    previousPeriod: { start: "2026-08-18", end: "2026-08-24" },
    reportLabel: "Aug 31 Report",
    locale: "en-US",
  },
  intro: introSectionMock,
  sources: sourcesSectionMock,
  overview: overviewSectionMock,
  aiVisibility: aiVisibilityMock,
  websiteAudit: websiteAuditMock,
  nextSteps: nextStepsMock,
  contact: {
    title: "We're here if you have any questions.",
    description: "We can walk through the story, the evidence, or the cleanup list whenever useful.",
    name: "Tom Conlon",
    email: "tom@moonvine.io",
    website: "https://moonvine.io",
  },
} satisfies ReportData;
