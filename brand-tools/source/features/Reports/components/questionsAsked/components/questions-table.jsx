import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { FrameCard, FrameCardContent } from "@/components/ui/frame-card";
import { Table } from "@/components/ui/table";
import { QuestionsTableContent } from './questions-table-content';

const columns = [
  { accessorKey: "text", enableSorting: false },
  { accessorKey: "type", enableSorting: false },
  {
    id: "mentions",
    accessorFn: (question) => question.mentions ?? undefined,
    sortingFn: "basic",
    sortUndefined: "last",
    sortDescFirst: false,
  },
];

export function QuestionsTable({ questions }) {
  const table = useReactTable({
    data: questions,
    columns,
    getRowId: (row) => row.id,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <FrameCard className="w-full" withFill>
      <FrameCardContent className="gap-0 p-0 shadow-none before:shadow-none">
      <Table className="[&_th]:px-5 [&_td]:px-5">
        <caption className="sr-only">Questions asked in the report sample and their mention counts</caption>
        <QuestionsTableContent questions={table.getRowModel().rows.map(({ original }) => original)} />
      </Table>
      </FrameCardContent>

    </FrameCard>
  );
}
