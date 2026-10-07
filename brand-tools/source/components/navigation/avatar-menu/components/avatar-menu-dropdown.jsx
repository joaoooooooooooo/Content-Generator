import {
  BoltIcon,
  BookOpenIcon,
  CircleUserRoundIcon,
  Layers2Icon,
  LogOutIcon,
  PinIcon,
  UserPenIcon,
} from "@/components/ui/icons";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/menu";

const defaultPrimaryItems = [
  { icon: BoltIcon, label: "Option 1" },
  { icon: Layers2Icon, label: "Option 2" },
  { icon: BookOpenIcon, label: "Option 3" },
];

const defaultSecondaryItems = [
  { icon: PinIcon, label: "Option 4" },
  { icon: UserPenIcon, label: "Option 5" },
];

function getInitials(name) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

export function AvatarMenuDropdown({
  avatarAlt = "Avatar",
  avatarSrc = "/origin/avatar.jpg",
  email = "k.kennedy@coss.com",
  name = "Keith Kennedy",
  onLogout,
  primaryItems = defaultPrimaryItems,
  secondaryItems = defaultSecondaryItems,
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button aria-label="Open account menu" size="icon" variant="outline" />
        }
      >
        <CircleUserRoundIcon aria-hidden="true" size={16} />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="max-w-64">
        <div className="flex items-start gap-3 px-2 py-1.5">
          <Avatar className="size-8 shrink-0">
            <AvatarImage alt={avatarAlt} src={avatarSrc} />
            <AvatarFallback>{getInitials(name)}</AvatarFallback>
          </Avatar>
          <div className="flex min-w-0 flex-col">
            <span className="truncate font-medium text-foreground text-sm">
              {name}
            </span>
            <span className="truncate font-normal text-muted-foreground text-xs">
              {email}
            </span>
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {primaryItems.map(({ icon: Icon, label, onSelect }) => (
            <DropdownMenuItem key={label} closeOnClick onSelect={onSelect}>
              {Icon ? (
                <Icon aria-hidden="true" className="opacity-60" size={16} />
              ) : null}
              <span>{label}</span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {secondaryItems.map(({ icon: Icon, label, onSelect }) => (
            <DropdownMenuItem key={label} closeOnClick onSelect={onSelect}>
              {Icon ? (
                <Icon aria-hidden="true" className="opacity-60" size={16} />
              ) : null}
              <span>{label}</span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem closeOnClick onSelect={onLogout}>
          <LogOutIcon aria-hidden="true" className="opacity-60" size={16} />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
