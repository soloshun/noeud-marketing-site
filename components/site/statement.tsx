import { AFRICA_OUTLINE } from "@/components/site/corridor-field";
import { Reveal } from "@/components/ui/reveal";

/**
 * The closing statement. The continent is drawn large and still — this is the
 * one place on the page where the map is the subject rather than a texture,
 * so it is deliberately far from the corridor map in the institutions section.
 */
export function Statement() {
  return (
    <section className="relative overflow-hidden border-t border-line bg-paper-soft py-28 lg:py-40">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(55rem 34rem at 50% 42%, rgba(155,215,240,0.20), transparent 70%)",
        }}
      />

      {/* the continent, large */}
      <svg
        viewBox="0 0 460 480"
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[34rem] w-auto -translate-x-1/2 -translate-y-1/2 sm:h-[42rem] lg:h-[52rem]"
      >
        <defs>
          <linearGradient id="statement-land" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#4a1039" stopOpacity="0.09" />
            <stop offset="100%" stopColor="#4a1039" stopOpacity="0.02" />
          </linearGradient>
        </defs>
        <path
          d={AFRICA_OUTLINE}
          fill="url(#statement-land)"
          stroke="#4a1039"
          strokeOpacity="0.16"
          strokeWidth="1.1"
          strokeLinejoin="round"
        />
      </svg>

      <div className="shell relative text-center">
        <Reveal>
          <h2 className="display-xl mx-auto max-w-[15ch] text-plum-800">
            noeud, your currency risk partner.
          </h2>
          <p className="mx-auto mt-8 max-w-[46ch] font-serif text-[1.1875rem] italic leading-relaxed text-ink-soft sm:text-[1.3125rem]">
            Not a bank. Not a broker. We make the price visible and the record
            permanent — then we get out of the way.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
