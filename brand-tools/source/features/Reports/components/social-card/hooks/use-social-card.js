import { useMemo } from "react";
import {
  getSocialCardBadge,
  getSocialCardVariant,
} from "@/features/Reports/components/social-card/lib/social-card";

export function useSocialCard({
  badge,
  badgeIcon,
  badgeLabel,
  badgeVariant,
  variant,
}) {
  return useMemo(() => {
    const socialCardVariant = getSocialCardVariant(variant);

    return {
      ...socialCardVariant,
      badge: getSocialCardBadge({
        badge,
        badgeIcon,
        badgeLabel,
        badgeVariant: badgeVariant ?? socialCardVariant.badgeVariant,
        showBadge: socialCardVariant.showBadge,
      }),
    };
  }, [badge, badgeIcon, badgeLabel, badgeVariant, variant]);
}
