import Image from "next/image";
import { projects } from "@/data/projects";
import { FadeIn } from "@/components/shared/fade-in";

export default function ProjectsSection() {
  return (
    <section
      id="projects"
      /*
       * Vertical padding - compact, image-led character
       * Mobile:  pt-12 pb-14  (48px / 56px)
       * md:      pt-16 pb-16  (64px / 64px)
       * xl:      pt-20 pb-20  (80px / 80px)
       */
      className="bg-lsh-off-white pt-12 pb-14 md:pt-16 md:pb-16 xl:pt-20 xl:pb-20 scroll-mt-[68px] xl:scroll-mt-[78px]"
      aria-labelledby="projects-heading"
    >
      <div className="px-4 sm:px-6 md:px-8 xl:px-12">
        {/* Heading block */}
        <FadeIn>
          <div className="flex flex-col items-center mb-6 md:mb-8 xl:mb-10">
            {/* Eyebrow */}
            <p className="mb-2 text-[0.6875rem] font-semibold uppercase tracking-[0.22em] text-lsh-blue">
              What We Deliver
            </p>

            <h2
              id="projects-heading"
              className="font-heading font-bold uppercase leading-[0.9] tracking-[-0.01em] text-lsh-dark text-center mb-2.5"
              style={{ fontSize: "clamp(2rem, calc(2.5vw + 1.125rem), 3rem)" }}
            >
              Built for Every Event
            </h2>

            {/* Blue underline accent */}
            <span
              className="block bg-lsh-blue rounded-sm"
              style={{ width: "38px", height: "2px" }}
              aria-hidden="true"
            />
          </div>
        </FadeIn>

        {/*
         * Mobile scroll row (< sm / 640px)
         * -mx-4 + px-4 breaks out of the section padding so the row edge
         * sits flush with the viewport while keeping the first card indented.
         * pr-4 on the inner ul gives breathing room after the last card.
         * Card width: 78vw - shows one full card + deliberate sliver of next.
         */}
        <FadeIn delay={0.1}>
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
        </FadeIn>

        {/*
         * Tablet and desktop grid
         * 640–899px:  2-col
         * 900–1279px: 3-col  (uses md: breakpoint at 768px; 900 handled by gap/natural sizing)
         * 1280px+:    5-col
         * Gap: 16px desktop for compact density matching mockup
         */}
        <FadeIn delay={0.1}>
          <ul
            className="hidden sm:grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4"
            role="list"
          >
            {projects.map((project) => (
              <li key={project.title}>
                <ProjectCard project={project} />
              </li>
            ))}
          </ul>
        </FadeIn>
      </div>
    </section>
  );
}

function ProjectCard({ project }: { project: (typeof projects)[number] }) {
  return (
    <article>
      {/* Image - 3:2 landscape ratio, wider and lighter than 4:3 */}
      <div className="relative overflow-hidden rounded-[3px] aspect-[3/2]">
        <Image
          src={project.image}
          alt={project.alt}
          fill
          sizes="(max-width: 639px) 78vw, (max-width: 767px) calc(50vw - 1.5rem), (max-width: 1279px) calc(33vw - 2rem), calc(20vw - 2rem)"
          className="object-cover transition-transform duration-500 ease-out hover:scale-105"
        />
      </div>

      {/* Event type label */}
      <h3 className="font-heading font-bold uppercase text-[0.875rem] sm:text-[0.9375rem] leading-snug tracking-wide text-lsh-dark mt-2.5">
        {project.title}
      </h3>
    </article>
  );
}
