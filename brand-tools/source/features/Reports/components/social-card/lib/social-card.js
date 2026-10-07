export const socialCardVariants = {
  competitor: {
    badgeVariant: "warning",
    nameClassName: "text-foreground",
    showBadge: true,
  },
  badge: {
    badgeVariant: "warning",
    nameClassName: "text-foreground",
    showBadge: true,
  },
  default: {
    badgeVariant: "warning",
    nameClassName: "text-foreground",
    showBadge: false,
  },
};

export function getSocialCardVariant(variant = "default") {
  return socialCardVariants[variant] ?? socialCardVariants.default;
}

export function getSocialCardBadge({
  badge,
  badgeIcon,
  badgeLabel,
  badgeVariant,
  showBadge,
}) {
  if (!showBadge) {
    return null;
  }

  if (badge) {
    if (typeof badge === "string") {
      return {
        icon: badgeIcon,
        label: badge,
        variant: badgeVariant,
      };
    }

    if (badge.label || badge.icon || badge.variant) {
      return {
        icon: badge.icon,
        label: badge.label,
        variant: badge.variant ?? badgeVariant,
      };
    }
  }

  if (!badgeLabel) {
    return null;
  }

  return {
    icon: badgeIcon,
    label: badgeLabel,
    variant: badgeVariant,
  };
}
