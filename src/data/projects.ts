export interface Project {
  title: string;
  location: string;
  image: string;
  alt: string;
}

export const projects: Project[] = [
  {
    title: "Corporate Conferences",
    location: "London",
    image: "/images/projects/corporate.png",
    alt: "LED screen hire for a corporate conference",
  },
  {
    title: "Awards Ceremonies",
    location: "Birmingham",
    image: "/images/projects/awards.png",
    alt: "LED screen and stage production for an awards ceremony",
  },
  {
    title: "Live Concerts",
    location: "Manchester",
    image: "/images/projects/concert.png",
    alt: "LED wall and stage production for a live concert",
  },
  {
    title: "Exhibition Stands",
    location: "ExCeL London",
    image: "/images/projects/exhibition.png",
    alt: "LED screen on an exhibition stand",
  },
  {
    title: "Wedding Receptions",
    location: "London",
    image: "/images/projects/wedding.png",
    alt: "LED screen backdrop for a wedding reception",
  },
];
