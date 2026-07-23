import {
  BadgeCheck,
  Users,
  ShieldCheck,
  MapPinned,
  Headphones,
  PoundSterling,
  type LucideIcon,
} from "lucide-react";
import homeContent from "@/content/home.json";

const icons = {
  BadgeCheck,
  Users,
  ShieldCheck,
  MapPinned,
  Headphones,
  PoundSterling,
} satisfies Record<string, LucideIcon>;

export interface Benefit {
  title: string;
  description: string;
  icon: LucideIcon;
}

export const benefits: Benefit[] = homeContent.whyChoose.benefits.map(
  (benefit) => ({
    ...benefit,
    icon: icons[benefit.icon as keyof typeof icons],
  }),
);
