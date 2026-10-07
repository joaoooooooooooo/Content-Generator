export type NextStepsData = {
  title: string;
  description: string;
  actionsHeading: { badge: string; title: string; description: string };
  actions: { id: string; title: string; description: string; items: { label: string; variant: "default" | "info" }[] }[];
};
