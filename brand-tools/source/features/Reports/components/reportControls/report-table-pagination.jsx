import { ChevronFirstIcon, ChevronLastIcon, ChevronLeftIcon, ChevronRightIcon } from "@/components/ui/icons";
import { Button } from "@/components/ui/button";
import { Pagination, PaginationContent, PaginationItem } from "@/components/ui/pagination";

export function ReportTablePagination({ table, label = "Table pages" }) {
  const { pageIndex, pageSize } = table.getState().pagination;
  const total = table.getRowCount();
  const start = total === 0 ? 0 : pageIndex * pageSize + 1;
  const end = Math.min((pageIndex + 1) * pageSize, total);
  const controls = [
    { label: "First page", icon: ChevronFirstIcon, disabled: !table.getCanPreviousPage(), onClick: () => table.firstPage() },
    { label: "Previous page", icon: ChevronLeftIcon, disabled: !table.getCanPreviousPage(), onClick: () => table.previousPage() },
    { label: "Next page", icon: ChevronRightIcon, disabled: !table.getCanNextPage(), onClick: () => table.nextPage() },
    { label: "Last page", icon: ChevronLastIcon, disabled: !table.getCanNextPage(), onClick: () => table.lastPage() },
  ];
  return (
    <div className="flex w-full flex-wrap items-center justify-between gap-3">
      <p className="text-xs text-muted-foreground" aria-live="polite">
        Viewing {total === 0 ? "0" : `${start}\u2013${end}`} of {total} results
      </p>
    <Pagination className="mx-0 w-auto justify-end" aria-label={label}>
      <span className="sr-only" aria-live="polite">Page {table.getRowCount() ? table.getState().pagination.pageIndex + 1 : 0} of {table.getPageCount()}</span>
      <PaginationContent>
        {controls.map(({ label: actionLabel, icon: Icon, ...props }) => (
          <PaginationItem key={actionLabel}><Button {...props} aria-label={actionLabel} size="icon-sm" variant="outline"><Icon aria-hidden="true" /></Button></PaginationItem>
        ))}
      </PaginationContent>
    </Pagination>
    </div>
  );
}
