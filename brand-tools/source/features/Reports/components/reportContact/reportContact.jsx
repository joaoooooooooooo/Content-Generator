import { Logo } from "@/features/console/components/logo";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ReportHeading } from "@/features/Reports/components/reportHeading/reportHeading";
import { ReportSection } from "@/features/Reports/components/reportSection/components/reportSection";

export function ReportContact({
  title = "We're here if you have any questions.",
  description = "We can walk through the story, the evidence, or the cleanup list whenever useful.",
  name = "Tom Conlon",
  email = "tom@moonvine.io",
  avatarUrl,
}) {
  return (
    <ReportSection id="report-contact" showBottomDivider={false}>
      <div className="flex flex-col items-center gap-8 text-center">
        <div className="flex flex-col items-center gap-2">
          <Logo variant="type" className="h-5" />
        </div>
        <ReportHeading
          variant="intro"
          badge={null}
          align="center"
          description={description}
          title={title}
        />
        <div className="flex items-center gap-3 text-left">
          <Avatar className="size-12 bg-muted text-foreground">
            {avatarUrl && <AvatarImage src={avatarUrl} alt={name} />}
            <AvatarFallback>{name.split(" ").map((part) => part[0]).slice(0, 2).join("")}</AvatarFallback>
          </Avatar>
          <div className="flex min-w-0 flex-col items-start gap-1">
            <div>
              <p className="text-lg/7 font-medium text-foreground">{name}</p>
            </div>
            <div className="flex flex-col items-start">
              <Button className="px-0" render={<a href={`mailto:${email}`} />} variant="link">
                {email}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </ReportSection>
  );
}
