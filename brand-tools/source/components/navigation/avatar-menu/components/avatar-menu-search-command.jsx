"use client";

import * as React from "react";
import {
  ArrowUpRightIcon,
  CircleFadingPlusIcon,
  FileInputIcon,
  FolderPlusIcon,
  SearchIcon,
} from "@/components/ui/icons";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandCollection,
  CommandDialog,
  CommandDialogPopup,
  CommandEmpty,
  CommandGroup,
  CommandGroupLabel,
  CommandInput,
  CommandItem,
  CommandList,
  CommandPanel,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { Kbd, KbdGroup } from "@/components/ui/kbd";

const commandItems = [
  {
    group: "Quick start",
    icon: FolderPlusIcon,
    label: "New folder",
    shortcut: "⌘N",
    value: "new-folder",
  },
  {
    group: "Quick start",
    icon: FileInputIcon,
    label: "Import document",
    shortcut: "⌘I",
    value: "import-document",
  },
  {
    group: "Quick start",
    icon: CircleFadingPlusIcon,
    label: "Add block",
    shortcut: "⌘B",
    value: "add-block",
  },
  {
    group: "Navigation",
    icon: ArrowUpRightIcon,
    label: "Go to dashboard",
    value: "go-to-dashboard",
  },
  {
    group: "Navigation",
    icon: ArrowUpRightIcon,
    label: "Go to apps",
    value: "go-to-apps",
  },
  {
    group: "Navigation",
    icon: ArrowUpRightIcon,
    label: "Go to connections",
    value: "go-to-connections",
  },
];

const groups = ["Quick start", "Navigation"];

export function AvatarMenuSearchCommand({
  className,
  onSelect,
  placeholder = "Type a command or search...",
  triggerLabel = "Search",
}) {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    function handleKeyDown(event) {
      if (event.key.toLowerCase() === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        setOpen((currentOpen) => !currentOpen);
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  function handleSelect(value) {
    onSelect?.(value);
    setOpen(false);
  }

  return (
    <>
      <button
        className={cn(
          "inline-flex h-9 w-fit items-center rounded-md border border-input bg-background px-3 py-2 text-foreground text-sm shadow-xs outline-none hover:bg-accent/50 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 placeholder:text-muted-foreground/70",
          className,
        )}
        onClick={() => setOpen(true)}
        type="button"
      >
        <span className="flex grow items-center">
          <SearchIcon
            aria-hidden="true"
            className="-ms-1 me-3 text-muted-foreground/80"
            size={16}
          />
          <span className="font-normal text-muted-foreground/70">
            {triggerLabel}
          </span>
        </span>
        <KbdGroup className="-me-1 ms-12">
          <Kbd>⌘</Kbd>
          <Kbd>K</Kbd>
        </KbdGroup>
      </button>

      <CommandDialog onOpenChange={setOpen} open={open}>
        <CommandDialogPopup>
          <Command items={commandItems}>
            <CommandInput placeholder={placeholder} />
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandPanel>
              <CommandList>
                {groups.map((group, groupIndex) => (
                  <React.Fragment key={group}>
                    <CommandGroup>
                      <CommandGroupLabel >{group}</CommandGroupLabel>
                      <CommandCollection>
                        {(item) =>
                          item.group === group ? (
                            <CommandItem 
                              key={item.value}
                              onClick={() => handleSelect(item.value)}
                              value={item.value} 
                            >
                              <item.icon 
                                aria-hidden="true"
                                className="opacity-60"
                                size={16}
                              />
                              <span >{item.label}</span>
                              {item.shortcut ? (
                                <CommandShortcut className="justify-center">
                                  {item.shortcut}
                                </CommandShortcut>
                              ) : null}
                            </CommandItem>
                          ) : null
                        }
                      </CommandCollection>
                    </CommandGroup>
                    {groupIndex < groups.length - 1 ? <CommandSeparator /> : null}
                  </React.Fragment>
                ))}
              </CommandList>
            </CommandPanel>
          </Command>
        </CommandDialogPopup>
      </CommandDialog>
    </>
  );
}
