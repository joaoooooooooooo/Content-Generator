import { editorialPosts, editorialArticles } from "./report-editorial";
import { reportMock } from "./report.mock";
import type { ReportData } from "./report.types";
import { reportEntities, type ReportEntityKey } from "./report-entities";

type ScenarioConfig = { id: string; label: string; company: ReportEntityKey; competitors: ReportEntityKey[]; publisher: ReportEntityKey; issues: number; posts: number; articles: number; change: number; answers: number };
const configs: ScenarioConfig[] = [
  { id: "typical", label: "Typical week", company: "apta", competitors: ["superside", "curio", "hlabs"], publisher: "itsnicethat", issues: 5, posts: 3, articles: 2, change: 4, answers: 12 },
  { id: "growth", label: "Strong growth · one fix", company: "superside", competitors: ["collins", "pentagram"], publisher: "creativereview", issues: 1, posts: 1, articles: 1, change: 32, answers: 56 },
  { id: "decline", label: "Declining results", company: "curio", competitors: ["apta", "hlabs", "designstudio", "workco"], publisher: "dezeen", issues: 11, posts: 2, articles: 3, change: -24, answers: 0 },
  { id: "busy", label: "Busy market · ten competitors", company: "instrument", competitors: ["workco", "huge", "collins", "pentagram", "wolffolins", "superside", "designstudio", "apta", "curio", "hlabs"], publisher: "creativereview", issues: 8, posts: 10, articles: 6, change: 15, answers: 30 },
  { id: "empty", label: "New report · no data", company: "hlabs", competitors: [], publisher: "itsnicethat", issues: 0, posts: 0, articles: 0, change: 0, answers: 0 },
];
const interactionProfiles: Record<string, { current: number[]; previous: number[] }> = {
  typical: { current: [67, 89, 64, 74, 112, 121, 98], previous: [64, 85, 68, 71, 108, 116, 92] },
  growth: { current: [35, 42, 190, 460, 285, 145, 95], previous: [30, 48, 55, 72, 61, 44, 38] },
  decline: { current: [180, 145, 92, 60, 48, 27, 20], previous: [160, 175, 155, 190, 168, 150, 172] },
  busy: { current: [850, 2400, 1200, 3100, 950, 2800, 1650], previous: [1300, 950, 2100, 1600, 1800, 1100, 2200] },
};
function makeReport(config: ScenarioConfig): ReportData {
  const report: ReportData = structuredClone(reportMock);
  const empty = config.id === "empty";
  const companyId = config.id + "-company";
  const company = { ...reportEntities[config.company], id: companyId };
  const competitors = config.competitors.map((key, index) => ({ ...reportEntities[key], id: "competitor-" + index }));
  const publisher = { ...reportEntities[config.publisher], id: "publisher" };
  report.context.companyId = companyId;
  report.context.competitorIds = competitors.map(entity => entity.id);
  report.context.entities = Object.fromEntries([company, ...competitors, publisher].map(entity => [entity.id, entity]));
  report.context.reportLabel = "Aug 31, 2026";
  report.intro.title = empty ? "Your report is ready for its first data." : config.change < 0 ? company.name + " lost visibility this week." : company.name + " gained visibility this week.";
  report.intro.description = empty ? "Connect sources to begin tracking results." : "Compare this week's results with the previous week and review the priorities below.";
  report.intro.metric = empty ? null : { value: String(Math.abs(config.change)), prefix: config.change < 0 ? "-" : "+", suffix: "%", label: "Website impressions", comparison: { label: (config.change > 0 ? "+" : "") + config.change + "%", text: "Vs last week", sentiment: config.change < 0 ? "negative" : "positive" } };
  report.sources.sources = empty ? [] : report.sources.sources.slice(0, config.id === "growth" ? 3 : 8);
  const tracked = empty ? [] : [...competitors, publisher];
  if (competitors.length) report.sources.sources.push({ id: "tracked-company", entityId: competitors[0].id, name: "", kind: "website", status: "watching" });
  report.overview.searchCompetitors = tracked.map((entity, index) => ({ entityId: entity.id, organicKeywords: (index + 1) * 137, organicTraffic: (index + 1) * 431, paidKeywords: index % 2 ? 25 : 0, paidTraffic: index % 2 ? 175 : 0, paidSpend: index % 2 ? 80 : 0, currency: "USD" }));
  report.overview.paidSearch = [];
  report.overview.socialWatch.posts = Array.from({ length: config.posts }, (_, index) => ({ id: "owned-" + index, entityId: companyId, platform: "LinkedIn", title: "Inside our latest project", description: "A new look at our team's process and recent work." })).concat(competitors.map((entity, index) => ({ id: "competitor-post-" + index, entityId: entity.id, platform: "LinkedIn", title: "New work and ideas", description: "A recent update from this tracked company." })));
  report.overview.news.articles = Array.from({ length: config.articles }, (_, index) => ({ id: "article-" + index, title: ["Ideas for your next campaign", "What buyers are looking for", "A fresh approach to creative work"][index % 3], summary: "A short update on the ideas shaping creative services this week.", source: { entityId: index % 2 && competitors.length ? competitors[0].id : publisher.id, label: "" } }));
  const profile = interactionProfiles[config.id];
  report.overview.interactions = profile ? {
    title: config.id === "growth" ? "A midweek campaign drove a sharp rise in social interactions." : config.id === "decline" ? "Social interactions fell through the week." : config.id === "busy" ? "Social activity swung sharply across a high-volume week." : "Weekly interactions stayed close to the recent baseline.",
    points: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, index) => ({ day, current: profile.current[index], previous: profile.previous[index] })),
  } : undefined;
  report.aiVisibility.test = { totalAnswers: empty ? 0 : 75, namedAnswers: config.answers, status: config.answers > 40 ? "good" : config.answers > 0 ? "warning" : "bad" };
  report.aiVisibility.citations = tracked.map((entity, index) => ({ entityId: entity.id, count: Math.max(1, 32 - index * 2) }));
  report.aiVisibility.questions = empty ? [] : report.aiVisibility.questions.slice(0, config.id === "growth" ? 3 : 25).map((question, index) => ({ ...question, mentions: config.answers === 0 ? 0 : index % 4 }));
  if (config.answers > 0) report.aiVisibility.citations.unshift({ entityId: companyId, count: config.answers });
  report.aiVisibility.questions = report.aiVisibility.questions.map((question, index, all) => ({ ...question, mentions: Math.floor(config.answers / all.length) + (index < config.answers % all.length ? 1 : 0) }));
  report.aiVisibility.distribution = empty ? [] : ["Source Presence", "Visibility", "Share of voice"].map((label, index) => {
    const subject = Math.max(0, Math.min(85, config.answers + index * 3));
    const each = Math.floor((100 - subject) / (tracked.length + 1));
    return { value: label.toLowerCase().replaceAll(" ", "-"), label, change: (config.change > 0 ? "+" : "") + config.change + "%", entries: [{ entityId: companyId, value: subject }, ...tracked.map(entity => ({ entityId: entity.id, value: each })), { value: 100 - subject - each * tracked.length }] };
  });
  report.websiteAudit.scores = empty ? [] : report.websiteAudit.scores.map((score, index) => ({ ...score, score: config.change < 0 ? [28, 46, 64, 82][index] : config.id === "growth" ? 94 + index : [45, 73, 89, 96][index] }));
  report.websiteAudit.issues = report.websiteAudit.issues.slice(0, config.issues);
  report.websiteAudit.checks = empty ? [] : report.websiteAudit.checks.map(check => ({ ...check, status: config.id === "growth" && check.id !== "llms" ? "good" : check.status, description: config.id === "growth" && check.id !== "llms" ? "This check passed in the current sample." : check.description }));
  report.websiteAudit.highPriority = report.websiteAudit.issues.filter(issue => issue.priority === "high").length;
  report.websiteAudit.warnings = Math.max(0, config.issues - report.websiteAudit.highPriority);
  report.websiteAudit.notices = 0;
  report.websiteAudit.affectedPages = empty ? 0 : config.issues * 5;
  report.nextSteps.title = "Next steps for {company}";
  report.nextSteps.description = empty ? "Connect your sources to begin building a picture of your results." : "Focus on the priorities from this week's report, then review their impact next week.";
  report.nextSteps.actions = report.websiteAudit.issues.map(issue => ({ id: issue.id, title: issue.title, description: issue.description, items: [{ label: "Review and resolve this finding", variant: "default" }] }));
  // The lead metric is a report-level highlight, selected from any section.
  if (config.id === "typical") {
    report.overview.socialWatch.posts = editorialPosts;
    report.overview.socialWatch.description = "Selected published posts from Apta Agency and Superside, gathered as examples for this report.";
    report.overview.news.articles = editorialArticles;
    const points = report.overview.interactions?.points ?? [];
    const total = points.reduce((sum, point) => sum + point.current, 0);
    const previous = points.reduce((sum, point) => sum + point.previous, 0);
    const change = previous ? ((total - previous) / previous) * 100 : 0;
    report.intro.title = "Social interactions grew this week.";
    report.intro.metric = { value: String(total), prefix: "", suffix: "", label: "Social interactions", comparison: { label: `+${change.toFixed(1)}%`, text: "Vs last week", sentiment: "positive" } };
  } else if (config.id === "growth") {
    report.intro.title = "Your website is performing well.";
    report.intro.metric = { value: String(report.websiteAudit.scores[0].score), prefix: "", suffix: "/100", label: "Lighthouse performance", status: { label: "Good", sentiment: "positive" }, comparison: null };
  } else if (config.id === "busy") {
    report.intro.title = "AI answers are bringing your company into the conversation.";
    report.intro.metric = { value: String(report.aiVisibility.test.namedAnswers), prefix: "", suffix: `/${report.aiVisibility.test.totalAnswers}`, label: "AI answers naming your company", status: { label: report.aiVisibility.test.status === "good" ? "Good" : report.aiVisibility.test.status === "bad" ? "Needs attention" : "Room to improve", sentiment: report.aiVisibility.test.status === "good" ? "positive" : report.aiVisibility.test.status === "bad" ? "negative" : "warning" }, comparison: null };
  }
  return report;
}
export const reportScenarios = configs.map(config => ({ id: config.id, label: config.label, report: makeReport(config) }));
