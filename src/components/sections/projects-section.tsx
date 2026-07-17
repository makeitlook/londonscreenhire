import Image from "next/image";
import { MapPin, ArrowRight } from "lucide-react";
import { projects } from "@/data/projects";

export default function ProjectsSection() {
  return (
    <section
      id="projects"
      /*
       * Vertical padding — compact, image-led character
       * Mobile:  pt-12 pb-14  (48px / 56px)
       * md:      pt-16 pb-16  (64px / 64px)
       * xl:      pt-20 pb-20  (80px / 80px)
       */
      className="bg-lsh-off-white pt-12 pb-14 md:pt-16 md:pb-16 xl:pt-20 xl:pb-20 scroll-mt-[68px] xl:scroll-mt-[78px]"
      aria-labelledby="projects-heading"
    >
      <div className="px-4 sm:px-6 md:px-8 xl:px-12">
        {/*
         * Heading block + View All button
         * Desktop: heading centred, button absolute-right aligned to heading mid-point
         * Mobile: centred column stack
         * mb controls gap between heading block and project cards
         */}
        <div className="relative flex flex-col items-center mb-8 md:mb-10 xl:mb-12">
          {/* Eyebrow */}
          <p className="mb-2 text-[0.6875rem] font-semibold uppercase tracking-[0.22em] text-lsh-blue">
            Our Recent Projects
          </p>

          {/* Heading — slightly smaller than initial to feel compact in context */}
          <h2
            id="projects-heading"
            className="font-heading font-bold uppercase leading-[0.9] tracking-[-0.01em] text-lsh-dark text-center mb-2.5"
            style={{ fontSize: "clamp(2rem, calc(2.5vw + 1.125rem), 3rem)" }}
          >
            See Our Screens in Action
          </h2>

          {/* Blue underline accent */}
          <span
            className="block bg-lsh-blue rounded-sm mb-5 md:mb-0"
            style={{ width: "38px", height: "2px" }}
            aria-hidden="true"
          />

          {/*
           * View All Projects button
           * Mobile: centred below underline
           * md+: absolute right, vertically centred within the heading block
           * Slight upward tweak (-translate-y-[60%]) pulls it closer to heading centre
           * rather than true 50% which would float it too high.
           */}
          <a
            href="#projects"
            className="md:absolute md:right-0 md:top-1/2 md:-translate-y-[60%] inline-flex items-center gap-1.5 h-[38px] px-4 text-[0.775rem] font-semibold text-lsh-dark border border-[rgba(5,7,10,0.2)] rounded-[3px] hover:border-[rgba(5,7,10,0.38)] hover:bg-[rgba(5,7,10,0.04)] transition-colors duration-200 whitespace-nowrap"
          >
            View All Projects
            <ArrowRight size={13} strokeWidth={2} aria-hidden="true" />
          </a>
        </div>

        {/*
         * Mobile scroll row (< sm / 640px)
         * -mx-4 + px-4 breaks out of the section padding so the row edge
         * sits flush with the viewport while keeping the first card indented.
         * pr-4 on the inner ul gives breathing room after the last card.
         * Card width: 78vw — shows one full card + deliberate sliver of next.
         */}
        <div className="sm:hidden -mx-4 px-4 overflow-x-auto pb-3 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          <ul
            className="flex gap-3 snap-x snap-mandatory pr-4"
            style={{ width: "max-content" }}
            role="list"
          >
            {projects.map((project) => (
              <li
                key={project.title}
                className="snap-start shrink-0"
                style={{ width: "78vw" }}
              >
                <ProjectCard project={project} />
              </li>
            ))}
          </ul>
        </div>

        {/*
         * Tablet and desktop grid
         * 640–899px:  2-col
         * 900–1279px: 3-col  (uses md: breakpoint at 768px; 900 handled by gap/natural sizing)
         * 1280px+:    5-col
         * Gap: 16px desktop for compact density matching mockup
         */}
        <ul
          className="hidden sm:grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4 xl:gap-4"
          role="list"
        >
          {projects.map((project) => (
            <li key={project.title}>
              <ProjectCard project={project} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function ProjectCard({ project }: { project: (typeof projects)[number] }) {
  return (
    <article>
      {/* Image — 3:2 landscape ratio, wider and lighter than 4:3 */}
      <div className="overflow-hidden rounded-[3px] aspect-[3/2]">
        <Image
          src={project.image}
          alt={project.alt}
          width={900}
          height={600}
          className="w-full h-full object-cover transition-transform duration-500 ease-out hover:scale-105"
          unoptimized
        />
      </div>

      {/* Text — tight beneath image */}
      <h3 className="font-heading font-bold uppercase text-[0.875rem] sm:text-[0.9375rem] leading-snug tracking-wide text-lsh-dark mt-2.5 mb-1">
        {project.title}
      </h3>
      <p className="flex items-center gap-1 text-[0.75rem] text-lsh-grey-500 leading-none">
        <MapPin
          size={11}
          strokeWidth={1.8}
          className="text-lsh-blue shrink-0"
          aria-hidden="true"
        />
        {project.location}
      </p>
    </article>
  );
}
