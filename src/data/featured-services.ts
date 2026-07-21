import {
  Monitor,
  Volume2,
  Lightbulb,
  Layers,
  Radio,
  Clapperboard,
  type LucideIcon,
} from "lucide-react";

export interface FeaturedService {
  title: string;
  description: string;
  icon: LucideIcon;
  /** Internal page href - undefined if no dedicated page exists yet. */
  href?: string;
}

export const featuredServices: FeaturedService[] = [
  {
    title: "LED Screen Hire",
    description: "Indoor and outdoor LED screens for every event.",
    icon: Monitor,
    href: "/led-screen-hire-london",
  },
  {
    title: "Audio Systems",
    description: "Clear, powerful sound for live and corporate events.",
    icon: Volume2,
    href: "/corporate-av-hire",
  },
  {
    title: "Lighting",
    description: "Lighting, effects and atmosphere.",
    icon: Lightbulb,
    href: "/lighting-hire",
  },
  {
    title: "Staging",
    description: "Professional staging, trussing and set design.",
    icon: Layers,
    href: "/stage-hire",
  },
  {
    title: "Live Streaming",
    description: "Multi-camera streaming and video production.",
    icon: Radio,
    href: "/corporate-av-hire",
  },
  {
    title: "Event Production",
    description: "Technical management from planning to delivery.",
    icon: Clapperboard,
    href: "/corporate-av-hire",
  },
];
