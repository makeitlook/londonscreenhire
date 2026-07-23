import {
  LayoutGrid,
  Layers,
  Users,
  Focus,
  Maximize2,
  Plug,
  Eye,
  Sun,
  VolumeX,
  Building2,
  ShieldCheck,
  Zap,
  Cloud,
  Wrench,
  Video,
  Play,
  Palette,
  Link2,
  Music,
  Monitor,
  Tag,
  Globe,
  Volume2,
  Megaphone,
  SlidersHorizontal,
  FileCheck,
  Package,
  Radio,
  UserCheck,
  ClipboardList,
  CheckCircle2,
  Lightbulb,
  type LucideIcon,
} from "lucide-react";
import servicesContent from "@/content/services.json";

const icons = {
  LayoutGrid,
  Layers,
  Users,
  Focus,
  Maximize2,
  Plug,
  Eye,
  Sun,
  VolumeX,
  Building2,
  ShieldCheck,
  Zap,
  Cloud,
  Wrench,
  Video,
  Play,
  Palette,
  Link2,
  Music,
  Monitor,
  Tag,
  Globe,
  Volume2,
  Megaphone,
  SlidersHorizontal,
  FileCheck,
  Package,
  Radio,
  UserCheck,
  ClipboardList,
  CheckCircle2,
  Lightbulb,
} satisfies Record<string, LucideIcon>;

export interface ServiceBenefit {
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface ServiceUseCase {
  title: string;
  description: string;
  href?: string;
}

export interface ServiceProcessStep {
  step: number;
  title: string;
  description: string;
}

export interface ServiceFaq {
  question: string;
  answer: string;
}

export interface ServicePage {
  slug: string;
  navLabel: string;
  eyebrow: string;
  h1: string;
  shortIntro: string;
  fullIntro: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  heroImage: string;
  heroAlt: string;
  showcaseImage: string;
  showcaseAlt: string;
  ctaImage: string;
  ctaImageAlt: string;
  ctaHeading: string;
  benefits: ServiceBenefit[];
  useCases: ServiceUseCase[];
  processSteps: ServiceProcessStep[];
  faqs: ServiceFaq[];
  relatedSlugs: string[];
  metaTitle: string;
  metaDescription: string;
}

export const services: ServicePage[] = servicesContent.map((service) => ({
  ...service,
  benefits: service.benefits.map((benefit) => ({
    ...benefit,
    icon: icons[benefit.icon as keyof typeof icons],
  })),
}));

export function getServiceBySlug(slug: string): ServicePage | undefined {
  return services.find((service) => service.slug === slug);
}

export function getRelatedServices(slugs: string[]): ServicePage[] {
  return slugs
    .map((slug) => services.find((service) => service.slug === slug))
    .filter((service): service is ServicePage => service !== undefined);
}
