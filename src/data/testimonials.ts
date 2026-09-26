import homeContent from "@/content/home.json";

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  initial?: string;
  image?: string;
  placeholder?: boolean;
}

export const testimonials: Testimonial[] = homeContent.testimonials.items;
