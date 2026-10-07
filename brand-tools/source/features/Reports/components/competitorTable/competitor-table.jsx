import { useMemo } from "react";
import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { FrameCard, FrameCardContent, FrameCardTop } from "@/components/ui/frame-card";
import { ReportBadge } from "@/features/Reports/components/reportBadge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { GlobeIcon, MegaphoneIcon } from "@/components/ui/icons";

const metricViews = [
  { value: "organic", label: "Organic", icon: GlobeIcon },
  { value: "paid", label: "Paid", icon: MegaphoneIcon },
];

const metricColumns = {
  search: [["organicKeywords", "Organic keywords"], ["organicTraffic", "Est. organic traffic"], ["paidKeywords", "Paid keywords"], ["paidTraffic", "Est. paid traffic"], ["paidSpend", "Est. paid spend"]],
  paid: [["paidKeywords", "Paid keywords"], ["paidVisits", "Est. paid visits/month"], ["capturedAt", "Captured"]],
};

export function CompetitorTable({ rows, locale = "en-US", variant = "search" }) {
  if (variant === "search") return <div className="flex w-full flex-col gap-6">{metricViews.map(view => <CompetitorMetricTable key={view.value} rows={rows} locale={locale} variant={variant} metricView={view.value} />)}</div>;
  return <CompetitorMetricTable rows={rows} locale={locale} variant={variant} metricView="paid" />;
}

function CompetitorMetricTable({ rows, locale, variant, metricView }) {
  const columnVisibility = variant === "search" ? {
    organicKeywords: metricView !== "paid",
    organicTraffic: metricView !== "paid",
    paidKeywords: metricView !== "organic",
    paidTraffic: metricView !== "organic",
    paidSpend: metricView !== "organic",
  } : {};
  const columns = useMemo(() => [
    { id: "entity", header: "Domain", enableSorting: false, cell: ({ row }) => {
      const entity = row.original.entity;
      return <div className="flex min-w-40 items-center gap-2.5">
        <Avatar className="size-7 shrink-0"><AvatarImage src={entity.avatarUrl} alt="" /><AvatarFallback>{entity.avatarFallback ?? entity.name.slice(0, 2)}</AvatarFallback></Avatar>
        <div><div className="flex flex-wrap items-center gap-3"><p className="text-base font-normal">{entity.name}</p>{row.original.isCompetitor && <ReportBadge segment="competitor" size="sm" desktopSize="default" />}</div><p className="text-xs text-muted-foreground">{entity.website?.replace(/^https?:\/\//, "")}</p></div>
      </div>;
    } },
    ...metricColumns[variant].map(([key, label]) => ({
      id: key, header: label, accessorFn: (row) => row[key] ?? undefined,
      sortUndefined: "last", sortingFn: "basic", sortDescFirst: false,
      cell: ({ row, getValue }) => {
        const value = getValue();
        if (value == null) return <span aria-label="Unavailable">&mdash;</span>;
        if (key === "capturedAt") return <time dateTime={value}>{new Date(value + "T00:00:00Z").toLocaleDateString(locale, { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" })}</time>;
        return value.toLocaleString(locale, key === "paidSpend" ? { style: "currency", currency: row.original.currency, maximumFractionDigits: 0 } : undefined);
      },
    })),
  ], [locale, variant]);
  const table = useReactTable({ data: rows, columns, getRowId: (row) => row.entityId,
    getCoreRowModel: getCoreRowModel(),
    state: { columnVisibility },
  });
  return (
    <FrameCard className="w-full" withFill>
      {variant === "search" && (
        <FrameCardTop className="h-auto p-3">
          <h3 className="flex items-center gap-2 text-sm font-medium">
            {metricView === "organic" ? <GlobeIcon aria-hidden="true" className="size-4" /> : <MegaphoneIcon aria-hidden="true" className="size-4" />}
            {metricView === "organic" ? "Organic" : "Paid"}
          </h3>
        </FrameCardTop>
      )}
      <FrameCardContent className="gap-0 p-0 shadow-none before:shadow-none">
        <Table className="[&_th]:px-4 [&_td]:px-4">
          <caption className="sr-only">{variant === "search" ? `${metricView === "organic" ? "Organic" : "Paid"} search visibility metrics` : "Paid search estimates"}</caption>
          <TableHeader>{table.getHeaderGroups().map(group => <TableRow key={group.id}>{group.headers.map(header => <TableHead key={header.id} scope="col" className={header.id === "entity" ? "" : "text-right"}>{header.column.columnDef.header}</TableHead>)}</TableRow>)}</TableHeader>
          <TableBody>{table.getRowModel().rows.map((row) => <TableRow key={row.id}>{row.getVisibleCells().map((cell) => <TableCell key={cell.id} className={cell.column.id === "entity" ? "py-4" : "py-4 text-right text-sm tabular-nums"}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>)}</TableRow>)}
            {rows.length === 0 && <TableRow><TableCell colSpan={table.getVisibleLeafColumns().length} className="py-8 text-center text-muted-foreground">No results to show.</TableCell></TableRow>}
          </TableBody>
        </Table>
      </FrameCardContent>


    </FrameCard>
  );
}

