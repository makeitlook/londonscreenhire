import {
  Monitor,
  Volume2,
  Lightbulb,
  Layers,
  Radio,
  Clapperboard,
  type LucideIcon,
} from "lucide-react";
import homeContent from "@/content/home.json";

const icons = {
  Monitor,
  Volume2,
  Lightbulb,
  Layers,
  Radio,
  Clapperboard,
} satisfies Record<string, LucideIcon>;

export interface FeaturedService {
  title: string;
  description: string;
  icon: LucideIcon;
  href?: string;
}

export const featuredServices: FeaturedService[] =
  homeContent.featuredServices.items.map((service) => ({
    ...service,
    icon: icons[service.icon as keyof typeof icons],
  }));
