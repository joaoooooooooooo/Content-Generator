"use client";

import logoIconDark from "@/assets/Logo Icon - Dark.svg";
import logoIconLight from "@/assets/Logo Icon - Light.svg";
import logoTypeDark from "@/assets/Logo type - Dark.svg";
import logoTypeLight from "@/assets/Logo type - Light.svg";
import { useThemePreference } from "@/components/navigation/avatar-menu";
import { cn } from "@/lib/utils";

type LogoVariant = "icon" | "type";

type LogoProps = {
  alt?: string;
  className?: string;
  variant?: LogoVariant;
};

const logoAssets = {
  dark: {
    icon: logoIconDark,
    type: logoTypeDark,
  },
  light: {
    icon: logoIconLight,
    type: logoTypeLight,
  },
} as const;

export function Logo({
  alt = "Moonvine",
  className,
  variant = "type",
}: LogoProps) {
  const { resolvedTheme } = useThemePreference();
  const theme = resolvedTheme === "dark" ? "dark" : "light";

  return (
    <img
      alt={alt}
      className={cn("block w-auto shrink-0", className)}
      src={logoAssets[theme][variant]}
    />
  );
}
