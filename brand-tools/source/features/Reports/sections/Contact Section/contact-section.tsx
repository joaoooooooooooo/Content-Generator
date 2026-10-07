import { ReportContact } from "@/features/Reports/components/reportContact/reportContact";
export type ContactSectionData = {
  title: string;
  description: string;
  name: string;
  email: string;
  website: string;
  avatarUrl?: string;
};
export function ContactSection({ data }: { data: ContactSectionData }) {
  return <ReportContact {...data} />;
}
