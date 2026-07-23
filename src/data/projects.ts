import homeContent from "@/content/home.json";

export interface Project {
  title: string;
  location: string;
  image: string;
  alt: string;
}

export const projects: Project[] = homeContent.projects.items;
