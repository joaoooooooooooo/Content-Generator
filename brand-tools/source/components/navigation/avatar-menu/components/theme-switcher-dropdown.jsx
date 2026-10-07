"use client";

import { MonitorIcon, MoonIcon, SunIcon } from "@/components/ui/icons";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/menu";
import { useThemePreference } from "@/components/navigation/avatar-menu/hooks/use-theme-preference";

const themeIcons = {
  dark: MoonIcon,
  light: SunIcon,
};

export function ThemeSwitcherDropdown() {
  const { resolvedTheme, setTheme } = useThemePreference();
  const ActiveIcon = themeIcons[resolvedTheme] ?? MonitorIcon;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={<Button aria-label="Select theme" size="icon" variant="outline" />}
      >
        <ActiveIcon aria-hidden="true" size={16} />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-32">
        <DropdownMenuItem closeOnClick onClick={() => setTheme("light")}>
          <SunIcon aria-hidden="true" className="opacity-60" size={16} />
          <span>Light</span>
        </DropdownMenuItem>
        <DropdownMenuItem closeOnClick onClick={() => setTheme("dark")}>
          <MoonIcon aria-hidden="true" className="opacity-60" size={16} />
          <span>Dark</span>
        </DropdownMenuItem>
        <DropdownMenuItem closeOnClick onClick={() => setTheme("system")}>
          <MonitorIcon aria-hidden="true" className="opacity-60" size={16} />
          <span>System</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
