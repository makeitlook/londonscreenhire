/**
 * SiteLogo - temporary text treatment.
 * Replace this component with the approved SVG asset when available.
 * Outer <div> wrapper is preserved so callers need no structural changes on swap.
 */
export default function SiteLogo() {
  return (
    <div className="flex flex-col leading-none select-none">
      <span className="font-heading text-[0.72rem] font-semibold tracking-[0.28em] uppercase text-lsh-grey-300">
        London
      </span>
      <span className="font-heading text-[2.05rem] font-bold tracking-[-0.015em] uppercase text-lsh-white leading-[1]">
        Screen Hire
      </span>
      {/* Blue accent rule - remove when real SVG logo is provided */}
      <span
        className="mt-[5px] block h-[2.5px] w-8 bg-lsh-blue"
        aria-hidden="true"
      />
    </div>
  );
}
