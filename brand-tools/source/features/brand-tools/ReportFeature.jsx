import { reportScenarios } from "@/features/Reports/report-scenarios";
import { ReportProvider } from "@/features/Reports/context";
import { EntitySegment } from "@/features/Reports/components/entitySegment";
import { ReportsMultiSeriesLineChart } from "@/features/Reports/components/line/line";
import { RankEntities } from "@/features/Reports/components/rankEntities";
import { CompetitorTable } from "@/features/Reports/components/competitorTable";
import { QuestionsAsked } from "@/features/Reports/components/questionsAsked";
import { SiteStatCard } from "@/features/Reports/components/siteStatCard";
import { SiteCheckCard } from "@/features/Reports/components/siteCheckCard";
import { TaskCard } from "@/features/Reports/components/taskCard/taskCard";
import { ActionCard } from "@/features/Reports/components/actionItem";
import { SocialCard } from "@/features/Reports/components/social-card";
import { NewsCard } from "@/features/Reports/components/newsCard";
import { SourceCard } from "@/features/Reports/components/sourceCard";
import { HighlightNumber } from "@/features/Reports/components/highlightNumber/highlightNumber";
import { AiAnswerSummary } from "@/features/Reports/sections/AI Visibility Section/components/ai-test-results";


const grid = (children, columns = 3) => <div style={{ display: "grid", gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`, gap: 16 }}>{children}</div>;

function Feature({ value, report }) {
  const { context, overview, aiVisibility, websiteAudit, nextSteps, sources } = report;
  const entity = (id) => context.entities[id];
  const competitor = (id) => context.competitorIds.includes(id);
  const distribution = aiVisibility.distribution?.find((item) => item.value === value);
  const data = {
    visibility: distribution?.entries, "source-presence": distribution?.entries, "share-of-voice": distribution?.entries,
    interactions: overview.interactions?.points, rankings: aiVisibility.citations,
    audit: [...websiteAudit.scores, ...websiteAudit.checks], scores: websiteAudit.scores, checks: websiteAudit.checks,
    issues: websiteAudit.issues, actions: nextSteps.actions, social: overview.socialWatch.posts,
    news: overview.news.articles, sources: sources.sources,
  };
  if (value in data && !data[value]?.length) return <div className="rounded-xl border bg-background p-8 text-sm text-muted-foreground">No data for this feature in this report scenario.</div>;
  if (distribution) {
    const view = {
      value, tabLabel: distribution.label, label: "Average across 1 daily point",
      comparisonBadgeLabel: distribution.change, comparisonBadgeVariant: distribution.change.startsWith("-") ? "error" : distribution.change.startsWith("+") ? "success" : "secondary", comparisonText: "Vs last week",
      subjectValue: String(distribution.entries.find((item) => item.entityId === context.companyId)?.value ?? 0),
      data: distribution.entries.map((item) => ({ channel: item.entityId ?? "others", label: item.entityId ? entity(item.entityId).name : "Others", isCompetitor: competitor(item.entityId), kind: item.entityId ? "entity" : "others", role: item.entityId === context.companyId ? "subject" : "comparison", value: item.value })),
    };
    return <EntitySegment chartViews={[view]} layout="chart" staticView />;
  }
  if (value === "interactions") return <ReportsMultiSeriesLineChart data={overview.interactions.points} />;
  if (value === "rankings") return <RankEntities items={aiVisibility.citations.map((item) => ({ id: item.entityId, label: entity(item.entityId).website.replace(/^https?:\/\//, ""), imageSrc: entity(item.entityId).avatarUrl, value: item.count, isCompetitor: competitor(item.entityId) }))} maxValue={aiVisibility.citations.reduce((sum, item) => sum + item.count, 0)} />;
  if (value === "questions") return <QuestionsAsked questions={aiVisibility.questions} />;
  if (value === "search" || value === "paid") return <CompetitorTable variant={value} locale={context.locale} rows={(value === "search" ? overview.searchCompetitors : overview.paidSearch).map((item) => ({ ...item, entity: entity(item.entityId), isCompetitor: competitor(item.entityId) }))} />;
  if (["audit", "scores", "checks"].includes(value)) return grid(<>
    {value !== "checks" && websiteAudit.scores.map(({ id, ...score }) => <SiteStatCard key={id} {...score} className="h-full max-w-none" />)}
    {value !== "scores" && websiteAudit.checks.map(({ id, description, ...check }) => <SiteCheckCard key={id} {...check} description={description.replaceAll("{website}", entity(context.companyId).website)} className="h-full" />)}
  </>);
  if (value === "issues") return grid(websiteAudit.issues.map(({ id, ...issue }) => <TaskCard key={id} {...issue} />));
  if (value === "actions") return grid(nextSteps.actions.map(({ id, ...action }) => <ActionCard key={id} {...action} />));
  if (value === "social") return grid(overview.socialWatch.posts.map((post) => <SocialCard key={post.id} name={entity(post.entityId).name} avatarSrc={entity(post.entityId).avatarUrl} avatarFallback={entity(post.entityId).avatarFallback} metaLabel={post.platform} sourceUrl={post.sourceUrl} title={post.title} description={post.description} thumbnailSrc={post.imageUrl} thumbnailAlt={post.imageAlt} variant={competitor(post.entityId) ? "competitor" : "default"} />));
  if (value === "news") return grid(overview.news.articles.map((article) => <NewsCard key={article.id} title={article.title} takeaway={article.summary} imageSrc={article.imageUrl} imageAlt={article.imageAlt} source={article.source.entityId ? { label: entity(article.source.entityId).name, href: entity(article.source.entityId).website } : article.source} />));
  if (value === "sources") return grid(sources.sources.map((source) => <SourceCard key={source.id} name={source.entityId ? entity(source.entityId).name : source.name} description={source.entityId ? entity(source.entityId).website : source.description} avatarSrc={source.entityId ? entity(source.entityId).avatarUrl : source.avatarUrl} avatarFallback={source.avatarFallback} status={source.status} isCompetitor={competitor(source.entityId)} connectDisabled className="h-full max-w-none" />));
  if (value === "answers") return grid(<><HighlightNumber className="w-auto" value={aiVisibility.test.namedAnswers} description={`Answers that named ${entity(context.companyId).name}`} /><HighlightNumber className="w-auto" value={aiVisibility.test.totalAnswers - aiVisibility.test.namedAnswers} description={`Answers that did not name ${entity(context.companyId).name}`} /></>, 2);
  if (value === "answer-summary") return <AiAnswerSummary data={aiVisibility.test} />;
  return null;
}

export function ReportFeature({ value, scenario = "typical" }) {
  const report = (reportScenarios.find((item) => item.id === scenario) ?? reportScenarios[0]).report;
  return <ReportProvider value={report.context}><Feature value={value} report={report} /></ReportProvider>;
}
