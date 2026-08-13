import { Eyebrow } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";

/**
 * The portrait is an explicit placeholder — a monogram, not a stock photo of
 * someone else. Putting an unrelated face beside a real named executive would
 * be a fabricated likeness; a monogram reads as intentional and swaps out for
 * the real photograph in one line.
 */
export function Founder() {
  return (
    <section className="relative overflow-hidden border-t border-plum-950 bg-plum-950 py-24 text-white lg:py-32">
      {/* a slow, low light so the panel isn't a flat block */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-1/2 h-[42rem] w-[42rem] -translate-y-1/2 rounded-full opacity-40 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(155,215,240,0.22), transparent 70%)",
        }}
      />

      <div className="shell relative grid items-center gap-12 lg:grid-cols-[16rem_minmax(0,1fr)] lg:gap-16">
        <Reveal>
          {/* PLACEHOLDER — replace with <Image src="/desmond.jpg" …> */}
          <div className="relative mx-auto aspect-[4/5] w-52 overflow-hidden rounded-[1.25rem] border border-white/12 bg-plum-900 lg:mx-0 lg:w-full">
            <div
              aria-hidden="true"
              className="absolute inset-0 opacity-[0.16]"
              style={{
                backgroundImage:
                  "radial-gradient(circle at center, rgba(255,255,255,0.6) 1px, transparent 1px)",
                backgroundSize: "14px 14px",
              }}
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
              <span className="font-display text-[2.75rem] font-black leading-none tracking-[-0.04em] text-white/80">
                DA
              </span>
              <span className="font-mono text-[0.5625rem] uppercase tracking-[0.18em] text-white/35">
                Portrait to follow
              </span>
            </div>
          </div>
        </Reveal>

        <Reveal>
          <Eyebrow className="text-sky-300">Founder note</Eyebrow>

          <blockquote className="mt-7">
            <p className="font-serif text-[1.625rem] italic leading-[1.35] text-white sm:text-[2rem] lg:text-[2.4rem]">
              “I watched good businesses lose margin they never saw leave —
              decided in a room they were never invited into. NOEUD doesn’t
              promise to beat the market. It promises you’ll be in the room,
              with the numbers, while the decision can still be made.”
            </p>

            <footer className="mt-9 flex items-center gap-5">
              <span className="h-px w-12 bg-white/30" />
              <span>
                <span className="block font-display text-[0.9375rem] font-bold text-white">
                  Desmond Asime, Founder &amp; CEO
                </span>
                <span className="mt-1 block font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-white/40">
                  Accra · Ghana
                </span>
              </span>
            </footer>
          </blockquote>
        </Reveal>
      </div>
    </section>
  );
}
