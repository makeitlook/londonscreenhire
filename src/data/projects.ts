export interface Project {
  title: string;
  location: string;
  image: string;
  alt: string;
}

export const projects: Project[] = [
  {
    title: "Corporate Conference",
    location: "London",
    image: "/images/projects/project-corporate-placeholder.svg",
    alt: "Large LED screen display at a corporate conference in London",
  },
  {
    title: "Awards Ceremony",
    location: "Birmingham",
    image: "/images/projects/project-awards-placeholder.svg",
    alt: "LED screen and stage lighting at an awards ceremony in Birmingham",
  },
  {
    title: "Live Concert",
    location: "Manchester",
    image: "/images/projects/project-concert-placeholder.svg",
    alt: "LED wall and stage production for a live concert in Manchester",
  },
  {
    title: "Exhibition Stand",
    location: "ExCeL London",
    image: "/images/projects/project-exhibition-placeholder.svg",
    alt: "LED display installation on an exhibition stand at ExCeL London",
  },
  {
    title: "Wedding Reception",
    location: "London",
    image: "/images/projects/project-wedding-placeholder.svg",
    alt: "Ambient LED screen backdrop for a wedding reception in London",
  },
];
