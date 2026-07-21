import {
  CalendarDays,
  Monitor,
  Users,
  MapPin,
  type LucideIcon,
} from "lucide-react";

export interface Statistic {
  value: string;
  label: string;
  icon: LucideIcon;
  /**
   * IMPORTANT - placeholder: true means this value has NOT been verified
   * by the client and must be confirmed before launch.
   */
  placeholder: boolean;
  /** If numeric, the raw number used for count-up animation. */
  numericValue?: number;
}

// ⚠️  All values below are UNCONFIRMED PLACEHOLDERS.
// Replace with client-verified figures before launch.
export const statistics: Statistic[] = [
  {
    value: "10+",
    label: "Years Experience",
    icon: CalendarDays,
    placeholder: true,
    numericValue: 10,
  },
  {
    value: "1,500+",
    label: "Events Delivered",
    icon: Monitor,
    placeholder: true,
    numericValue: 1500,
  },
  {
    value: "1,000+",
    label: "Happy Clients",
    icon: Users,
    placeholder: true,
    numericValue: 1000,
  },
  {
    // Non-numeric - no count-up animation
    value: "UK-Wide",
    label: "Coverage",
    icon: MapPin,
    placeholder: true,
  },
];
