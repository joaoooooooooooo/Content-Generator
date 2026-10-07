import type { ContactSectionData } from "./sections/Contact Section";
import type { NextStepsData } from "./sections/Next Steps Section";
import type { WebsiteAuditData } from "./sections/Website Audit Section";
import type { ReportContextData } from "./context";
import type { IntroSectionData } from "./sections/Intro Section";
import type { SourcesSectionData } from "./sections/Sources Section";
import type { OverviewSectionData } from "./sections/Overview Section";
import type { AiVisibilityData } from "./sections/AI Visibility Section";

export type ReportData = {
  context: ReportContextData;
  intro: IntroSectionData;
  sources: SourcesSectionData;
  overview: OverviewSectionData;
  aiVisibility: AiVisibilityData;
  websiteAudit: WebsiteAuditData;
  nextSteps: NextStepsData;
  contact: ContactSectionData;
};
