import type { ReportEntity } from "./context/report-context.types";
import { reportMock } from "./report.mock";

// Real identities for illustrative report scenarios. Metrics remain sample data.
// Logo provenance is recorded in public/report-logos/sources.json.
export const reportEntities = {
  apta: reportMock.context.entities.apta,
  superside: reportMock.context.entities.superside,
  curio: reportMock.context.entities.curio,
  hlabs: reportMock.context.entities.hlabs,
  designstudio: reportMock.context.entities.designstudio,
  instrument: { name: "Instrument", website: "https://www.instrument.com", avatarUrl: "/report-logos/instrument.png", avatarFallback: "IN" },
  collins: { name: "COLLINS", website: "https://wearecollins.com", avatarUrl: "/report-logos/collins.png", avatarFallback: "CO" },
  workco: { name: "Work & Co", website: "https://www.work.co", avatarUrl: "/report-logos/workco.png", avatarFallback: "WC" },
  pentagram: { name: "Pentagram", website: "https://www.pentagram.com", avatarUrl: "/report-logos/pentagram.png", avatarFallback: "P" },
  wolffolins: { name: "Wolff Olins", website: "https://www.wolffolins.com", avatarUrl: "/report-logos/wolffolins.png", avatarFallback: "WO" },
  huge: { name: "Huge", website: "https://www.hugeinc.com", avatarUrl: "/report-logos/huge.png", avatarFallback: "H" },
  itsnicethat: { name: "It's Nice That", website: "https://www.itsnicethat.com", avatarUrl: "/report-logos/itsnicethat.png", avatarFallback: "INT" },
  creativereview: { name: "Creative Review", website: "https://www.creativereview.co.uk", avatarUrl: "/report-logos/creativereview.png", avatarFallback: "CR" },
  dezeen: { name: "Dezeen", website: "https://www.dezeen.com", avatarUrl: "/report-logos/dezeen.png", avatarFallback: "D" },
} satisfies Record<string, Omit<ReportEntity, "id">>;

export type ReportEntityKey = keyof typeof reportEntities;
