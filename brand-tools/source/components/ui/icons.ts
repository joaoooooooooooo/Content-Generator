import { createElement, forwardRef } from "react";
import type { Icon, IconProps } from "@phosphor-icons/react";
import {
  ArrowCounterClockwise as PhosphorArrowCounterClockwise,
  ArrowLeft as PhosphorArrowLeft,
  ArrowSquareOut as PhosphorArrowSquareOut,
  ArrowUp as PhosphorArrowUp,
  ArrowUpRight as PhosphorArrowUpRight,
  Bell as PhosphorBell,
  BookOpen as PhosphorBookOpen,
  Brain as PhosphorBrain,
  Broadcast as PhosphorBroadcast,
  Buildings as PhosphorBuildings,
  CalendarBlank as PhosphorCalendarBlank,
  CalendarDots as PhosphorCalendarDots,
  CaretDoubleLeft as PhosphorCaretDoubleLeft,
  CaretDoubleRight as PhosphorCaretDoubleRight,
  CaretDown as PhosphorCaretDown,
  CaretLeft as PhosphorCaretLeft,
  CaretRight as PhosphorCaretRight,
  CaretUp as PhosphorCaretUp,
  CaretUpDown as PhosphorCaretUpDown,
  ChartLineUp as PhosphorChartLineUp,
  ChatCircle as PhosphorChatCircle,
  Check as PhosphorCheck,
  CheckCircle as PhosphorCheckCircle,
  Circle as PhosphorCircle,
  CircleDashed as PhosphorCircleDashed,
  Copy as PhosphorCopy,
  CreditCard as PhosphorCreditCard,
  DotsThree as PhosphorDotsThree,
  Eye as PhosphorEye,
  FileArrowDown as PhosphorFileArrowDown,
  FileText as PhosphorFileText,
  Fingerprint as PhosphorFingerprint,
  FolderPlus as PhosphorFolderPlus,
  Gear as PhosphorGear,
  Globe as PhosphorGlobe,
  Graph as PhosphorGraph,
  Hash as PhosphorHash,
  Image as PhosphorImage,
  Info as PhosphorInfo,
  Layout as PhosphorLayout,
  Lifebuoy as PhosphorLifebuoy,
  Lightning as PhosphorLightning,
  Link as PhosphorLink,
  MagnifyingGlass as PhosphorMagnifyingGlass,
  Megaphone as PhosphorMegaphone,
  Minus as PhosphorMinus,
  Monitor as PhosphorMonitor,
  Moon as PhosphorMoon,
  Newspaper as PhosphorNewspaper,
  NotePencil as PhosphorNotePencil,
  PaperPlaneRight as PhosphorPaperPlaneRight,
  Path as PhosphorPath,
  Pause as PhosphorPause,
  Play as PhosphorPlay,
  Plugs as PhosphorPlugs,
  Plus as PhosphorPlus,
  Pulse as PhosphorPulse,
  PushPin as PhosphorPushPin,
  Question as PhosphorQuestion,
  Quotes as PhosphorQuotes,
  Scan as PhosphorScan,
  Shapes as PhosphorShapes,
  ShieldCheck as PhosphorShieldCheck,
  SidebarSimple as PhosphorSidebarSimple,
  SignOut as PhosphorSignOut,
  Sparkle as PhosphorSparkle,
  Spinner as PhosphorSpinner,
  SquaresFour as PhosphorSquaresFour,
  Stack as PhosphorStack,
  Sun as PhosphorSun,
  Table as PhosphorTable,
  User as PhosphorUser,
  UserCircle as PhosphorUserCircle,
  UserFocus as PhosphorUserFocus,
  Users as PhosphorUsers,
  Video as PhosphorVideo,
  Warning as PhosphorWarning,
  WarningCircle as PhosphorWarningCircle,
  X as PhosphorX,
 } from "@phosphor-icons/react";

// Keep the existing icon names with regular Phosphor weights.
function regularIcon(IconComponent: Icon, defaultSize?: number): Icon {
  return forwardRef<SVGSVGElement, IconProps>(function RegularIcon(
    { weight = "regular", size = defaultSize, ...props },
    ref,
  ) {
    return createElement(IconComponent, {
      ...props,
      ref,
      weight,
      size,
    });
  });
}

export const Activity = regularIcon(PhosphorPulse);
export const ArrowLeftIcon = regularIcon(PhosphorArrowLeft);
export const ArrowUp = regularIcon(PhosphorArrowUp);
export const ArrowUpRight = regularIcon(PhosphorArrowUpRight);
export const ArrowUpRightIcon = regularIcon(PhosphorArrowUpRight);
export const BellIcon = regularIcon(PhosphorBell);
export const Blocks = regularIcon(PhosphorSquaresFour);
export const BlocksIcon = regularIcon(PhosphorSquaresFour);
export const BoltIcon = regularIcon(PhosphorLightning);
export const BookOpenIcon = regularIcon(PhosphorBookOpen);
export const Brain = regularIcon(PhosphorBrain);
export const Building2 = regularIcon(PhosphorBuildings);
export const CalendarIcon = regularIcon(PhosphorCalendarBlank);
export const CalendarDays = regularIcon(PhosphorCalendarDots);
export const ChartNoAxesCombined = regularIcon(PhosphorChartLineUp);
export const CheckIcon = regularIcon(PhosphorCheck);
export const ChevronDown = regularIcon(PhosphorCaretDown, 16);
export const ChevronDownIcon = regularIcon(PhosphorCaretDown, 16);
export const ChevronFirstIcon = regularIcon(PhosphorCaretDoubleLeft, 16);
export const ChevronLastIcon = regularIcon(PhosphorCaretDoubleRight, 16);
export const ChevronLeft = regularIcon(PhosphorCaretLeft, 16);
export const ChevronLeftIcon = regularIcon(PhosphorCaretLeft, 16);
export const ChevronRight = regularIcon(PhosphorCaretRight, 16);
export const ChevronRightIcon = regularIcon(PhosphorCaretRight, 16);
export const ChevronsUpDown = regularIcon(PhosphorCaretUpDown, 16);
export const ChevronsUpDownIcon = regularIcon(PhosphorCaretUpDown, 16);
export const ChevronUp = regularIcon(PhosphorCaretUp, 16);
export const ChevronUpIcon = regularIcon(PhosphorCaretUp, 16);
export const CircleAlertIcon = regularIcon(PhosphorWarningCircle);
export const CircleCheckIcon = regularIcon(PhosphorCheckCircle);
export const CircleFadingPlusIcon = regularIcon(PhosphorCircleDashed);
export const CircleIcon = regularIcon(PhosphorCircle);
export const CircleUserRoundIcon = regularIcon(PhosphorUserCircle);
export const CopyIcon = regularIcon(PhosphorCopy);
export const CreditCardIcon = regularIcon(PhosphorCreditCard);
export const ExternalLink = regularIcon(PhosphorArrowSquareOut);
export const Eye = regularIcon(PhosphorEye);
export const EyeIcon = regularIcon(PhosphorEye);
export const FileInputIcon = regularIcon(PhosphorFileArrowDown);
export const FileText = regularIcon(PhosphorFileText);
export const FingerprintIcon = regularIcon(PhosphorFingerprint);
export const FolderPlusIcon = regularIcon(PhosphorFolderPlus);
export const Globe = regularIcon(PhosphorGlobe);
export const GlobeIcon = regularIcon(PhosphorGlobe);
export const Hash = regularIcon(PhosphorHash);
export const HelpCircleIcon = regularIcon(PhosphorQuestion);
export const ImageIcon = regularIcon(PhosphorImage);
export const InfoIcon = regularIcon(PhosphorInfo);
export const Layers2Icon = regularIcon(PhosphorStack);
export const LayoutGrid = regularIcon(PhosphorSquaresFour);
export const LayoutGridIcon = regularIcon(PhosphorSquaresFour);
export const LayoutTemplateIcon = regularIcon(PhosphorLayout);
export const LifeBuoyIcon = regularIcon(PhosphorLifebuoy);
export const Link2 = regularIcon(PhosphorLink);
export const Link2Icon = regularIcon(PhosphorLink);
export const Loader2Icon = regularIcon(PhosphorSpinner);
export const LoaderCircleIcon = regularIcon(PhosphorSpinner);
export const LogOutIcon = regularIcon(PhosphorSignOut);
export const MegaphoneIcon = regularIcon(PhosphorMegaphone);
export const MessageCircle = regularIcon(PhosphorChatCircle);
export const MinusIcon = regularIcon(PhosphorMinus);
export const Monitor = regularIcon(PhosphorMonitor);
export const MonitorIcon = regularIcon(PhosphorMonitor);
export const Moon = regularIcon(PhosphorMoon);
export const MoonIcon = regularIcon(PhosphorMoon);
export const MoreHorizontal = regularIcon(PhosphorDotsThree);
export const MoreHorizontalIcon = regularIcon(PhosphorDotsThree);
export const Network = regularIcon(PhosphorGraph);
export const NetworkIcon = regularIcon(PhosphorGraph);
export const Newspaper = regularIcon(PhosphorNewspaper);
export const PanelLeftIcon = regularIcon(PhosphorSidebarSimple);
export const PauseIcon = regularIcon(PhosphorPause);
export const PinIcon = regularIcon(PhosphorPushPin);
export const PlayIcon = regularIcon(PhosphorPlay);
export const Plug = regularIcon(PhosphorPlugs);
export const Plus = regularIcon(PhosphorPlus);
export const PlusIcon = regularIcon(PhosphorPlus);
export const QuoteIcon = regularIcon(PhosphorQuotes);
export const RotateCcwIcon = regularIcon(PhosphorArrowCounterClockwise);
export const Route = regularIcon(PhosphorPath);
export const SatelliteDish = regularIcon(PhosphorBroadcast);
export const SatelliteDishIcon = regularIcon(PhosphorBroadcast);
export const ScanSearch = regularIcon(PhosphorScan);
export const Search = regularIcon(PhosphorMagnifyingGlass);
export const SearchIcon = regularIcon(PhosphorMagnifyingGlass);
export const SendIcon = regularIcon(PhosphorPaperPlaneRight);
export const Settings = regularIcon(PhosphorGear);
export const SettingsIcon = regularIcon(PhosphorGear);
export const Shapes = regularIcon(PhosphorShapes);
export const ShieldCheckIcon = regularIcon(PhosphorShieldCheck);
export const Sparkles = regularIcon(PhosphorSparkle);
export const SquarePen = regularIcon(PhosphorNotePencil);
export const Sun = regularIcon(PhosphorSun);
export const SunIcon = regularIcon(PhosphorSun);
export const Table2 = regularIcon(PhosphorTable);
export const TriangleAlertIcon = regularIcon(PhosphorWarning);
export const UserIcon = regularIcon(PhosphorUser);
export const UserPenIcon = regularIcon(PhosphorUserFocus);
export const UserRound = regularIcon(PhosphorUserCircle);
export const UserRoundIcon = regularIcon(PhosphorUserCircle);
export const Users = regularIcon(PhosphorUsers);
export const UsersIcon = regularIcon(PhosphorUsers);
export const VideoIcon = regularIcon(PhosphorVideo);
export const XIcon = regularIcon(PhosphorX);
