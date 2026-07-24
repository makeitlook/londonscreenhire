import Image from "next/image";
import homeContent from "@/content/home.json";
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
      className="bg-lsh-off-white pt-12 pb-14 md:pt-16 md:pb-16 xl:pt-20 xl:pb-20 scroll-mt-[76px] xl:scroll-mt-[86px]"
      aria-labelledby="projects-heading"
    >
      <div className="lsh-container">
        {/* Heading block */}
        <FadeIn>
          <div className="flex flex-col items-center mb-6 md:mb-8 xl:mb-10">
            {/* Eyebrow */}
            <p className="mb-2 text-[0.6875rem] font-semibold uppercase tracking-[0.22em] text-lsh-gold-ink">
              {homeContent.projects.eyebrow}
            </p>

            <h2
              id="projects-heading"
              className="font-heading font-bold uppercase leading-[0.9] tracking-[-0.01em] text-lsh-dark text-center mb-2.5"
              style={{ fontSize: "clamp(2rem, calc(2.5vw + 1.125rem), 3rem)" }}
            >
              {homeContent.projects.heading}
            </h2>

            {/* Gold underline accent */}
            <span
              className="block bg-lsh-gold rounded-sm"
              style={{ width: "38px", height: "2px" }}
              aria-hidden="true"
            />
          </div>
        </FadeIn>

        {/* One list changes from a mobile snap row to the desktop grid. Keeping
         * one DOM copy avoids duplicate headings and image content for crawlers. */}
        <FadeIn>
          <div className="-mx-4 overflow-x-auto px-4 pb-3 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:overflow-visible sm:px-0 sm:pb-0">
            <ul
              className="flex w-max snap-x snap-mandatory gap-3 pr-4 sm:grid sm:w-auto sm:grid-cols-2 sm:gap-4 sm:pr-0 md:grid-cols-3 xl:grid-cols-5"
              role="list"
            >
              {projects.map((project) => (
                <li
                  key={project.title}
                  className="w-[78vw] shrink-0 snap-start sm:w-auto"
                >
                  <ProjectCard project={project} />
                </li>
              ))}
            </ul>
          </div>
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
