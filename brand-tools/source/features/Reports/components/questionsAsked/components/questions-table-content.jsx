import { TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export function QuestionsTableContent({ questions }) {
  return (
    <>
      <TableHeader>
        <TableRow>
          <TableHead scope="col">Question</TableHead>
          <TableHead scope="col" className="w-40">Type</TableHead>
          <TableHead scope="col" className="w-24 text-right">Mentions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {questions.map((question) => (
          <TableRow key={question.id}>
            <TableCell className="whitespace-normal py-4 text-sm leading-6">{question.text}</TableCell>
            <TableCell className="w-40 whitespace-normal text-xs leading-5 text-muted-foreground">{question.type}</TableCell>
            <TableCell className="text-right tabular-nums">
              {question.mentions == null ? <span aria-label="Mention count unavailable">&mdash;</span> : question.mentions.toLocaleString('en-US')}
            </TableCell>
          </TableRow>
        ))}
        {questions.length === 0 && <TableRow><TableCell colSpan={3} className="py-8 text-center text-muted-foreground">No questions to show.</TableCell></TableRow>}
      </TableBody>
    </>
  );
}
