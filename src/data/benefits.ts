import {
  BadgeCheck,
  Users,
  ShieldCheck,
  MapPinned,
  Headphones,
  PoundSterling,
  type LucideIcon,
} from "lucide-react";

export interface Benefit {
  title: string;
  description: string;
  icon: LucideIcon;
}

export const benefits: Benefit[] = [
  {
    title: "Premium Equipment",
    description:
      "Professional LED screens and AV equipment for dependable event performance.",
    icon: BadgeCheck,
  },
  {
    title: "Experienced Team",
    description:
      "Skilled technicians supporting planning, installation and live delivery.",
    icon: Users,
  },
  {
    title: "Reliable Service",
    description:
      "Careful preparation, clear communication and dependable support.",
    icon: ShieldCheck,
  },
  {
    title: "Flexible Coverage",
    description: "Event support across London and selected UK locations.",
    icon: MapPinned,
  },
  {
    title: "Technical Support",
    description: "Practical guidance from planning through to live production.",
    icon: Headphones,
  },
  {
    title: "Competitive Solutions",
    description: "Tailored equipment and production options for your event.",
    icon: PoundSterling,
  },
];
