import {
  CalendarDays,
  Monitor,
  Users,
  MapPin,
  type LucideIcon,
} from "lucide-react";
import homeContent from "@/content/home.json";

const icons = { CalendarDays, Monitor, Users, MapPin } satisfies Record<
  string,
  LucideIcon
>;

export interface Statistic {
  value: string;
  label: string;
  icon: LucideIcon;
  placeholder: boolean;
  numericValue?: number;
}

export const statistics: Statistic[] = homeContent.statistics.map(
  (statistic) => ({
    ...statistic,
    icon: icons[statistic.icon as keyof typeof icons],
  }),
);
