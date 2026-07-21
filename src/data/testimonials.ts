export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  initial: string;
  /**
   * IMPORTANT - placeholder: true means this testimonial has NOT been
   * verified or supplied by the client. All three entries below must be
   * replaced with real, confirmed client reviews before launch.
   */
  placeholder: boolean;
}

// ⚠️  ALL testimonials below are UNCONFIRMED PLACEHOLDERS.
// They must be replaced with verified client content before launch.
export const testimonials: Testimonial[] = [
  {
    quote:
      "London Screen Hire provided an outstanding LED wall and professional production support for our event. The installation and service were excellent from start to finish.",
    name: "David M.",
    role: "Event Manager",
    initial: "D",
    placeholder: true,
  },
  {
    quote:
      "Professional, reliable and a pleasure to work with. The screens looked excellent and the team handled the technical setup smoothly.",
    name: "Emma L.",
    role: "Marketing Director",
    initial: "E",
    placeholder: true,
  },
  {
    quote:
      "A knowledgeable and friendly team who delivered a polished result for our event. Everything was handled with care and professionalism.",
    name: "Raj K.",
    role: "Wedding Planner",
    initial: "R",
    placeholder: true,
  },
];
