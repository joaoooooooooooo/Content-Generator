import { cn } from "@/lib/utils";
import { QuestionsTable } from "./questions-table";

export function QuestionsAsked({ questions = [], className }) {
  return <div className={cn("flex w-full flex-col gap-5", className)}><QuestionsTable questions={questions} /></div>;
}
