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
}

export const featuredServices: FeaturedService[] = [
  {
    title: "LED Screen Hire",
    description: "Indoor and outdoor LED screens for every event.",
    icon: Monitor,
  },
  {
    title: "Audio Systems",
    description: "Clear, powerful sound for live and corporate events.",
    icon: Volume2,
  },
  {
    title: "Lighting",
    description: "Lighting, effects and atmosphere.",
    icon: Lightbulb,
  },
  {
    title: "Staging",
    description: "Professional staging, trussing and set design.",
    icon: Layers,
  },
  {
    title: "Live Streaming",
    description: "Multi-camera streaming and video production.",
    icon: Radio,
  },
  {
    title: "Event Production",
    description: "Technical management from planning to delivery.",
    icon: Clapperboard,
  },
];
