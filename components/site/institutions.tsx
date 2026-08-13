import { Arrow, ButtonLink, Eyebrow } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { CorridorField } from "@/components/site/corridor-field";

const SPEC = [
  ["Contributing banks", "11"],
  ["Quotes per day", "340+"],
  ["Methodology", "IOSCO-aligned"],
  ["Formatting", "IFRS 13-ready"],
];

const AUDIENCE = [
  ["Audit firms", "A citable third-party rate for year-end valuation work."],
  ["Asset managers", "Independent marks for cedi-denominated positions."],
  ["Banks", "Benchmark evidence for internal pricing committees."],
  ["DFIs & policy", "Corridor-level visibility into what trade actually pays."],
];

export function Institutions() {
  return (
    <section
      id="institutions"
      className="relative overflow-hidden border-t border-plum-950 bg-plum-900 py-24 text-white lg:py-32"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-1/3 h-[38rem] w-[38rem] rounded-full opacity-30 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(155,215,240,0.30), transparent 68%)",
        }}
      />

      <div className="shell relative">
        <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,1fr)_25rem] lg:gap-16">
          <Reveal>
            <Eyebrow className="text-sky-300">For institutions</Eyebrow>
            <h2 className="display-lg mt-5 max-w-[15ch] text-white">
              The reference rate African FX never had.
            </h2>
            <p className="lede mt-6 max-w-[52ch] text-white/60">
              Every routed quote contributes to the NOEUD Cedi Reference Rate —
              an independent, IOSCO-aligned consensus benchmark. For audit firms,
              asset managers, banks and DFIs, it is the citable figure that FX
              reporting and valuation in this region has always lacked.
            </p>

            <dl className="mt-12 grid gap-x-10 gap-y-7 sm:grid-cols-2">
              {AUDIENCE.map(([k, v]) => (
                <div key={k} className="border-t border-white/12 pt-4">
                  <dt className="font-display text-[1.0625rem] font-semibold text-white">
                    {k}
                  </dt>
                  <dd className="mt-2 text-[0.875rem] leading-relaxed text-white/50">
                    {v}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>

          {/* The rate card */}
          <Reveal>
            <div className="rounded-[1.25rem] border border-white/12 bg-white/[0.055] p-6 backdrop-blur sm:p-7">
              <p className="font-mono text-[0.625rem] uppercase tracking-[0.16em] text-white/45">
                Witness reference rate
              </p>
              <p className="mt-3 flex items-baseline gap-2">
                <span className="tnum font-display text-[3.5rem] font-bold leading-none tracking-[-0.04em] text-white">
                  12.61
                </span>
                <span className="font-mono text-[0.8125rem] text-white/45">
                  GHS / USD
                </span>
              </p>

              <dl className="mt-7">
                {SPEC.map(([k, v]) => (
                  <div
                    key={k}
                    className="flex items-baseline justify-between gap-4 border-t border-white/10 py-3"
                  >
                    <dt className="text-[0.8125rem] text-white/50">{k}</dt>
                    <dd className="tnum font-mono text-[0.8125rem] text-white">
                      {v}
                    </dd>
                  </div>
                ))}
              </dl>

              <ButtonLink
                href="#apply"
                tone="sky"
                size="md"
                className="mt-6 w-full"
              >
                Request data access
                <Arrow />
              </ButtonLink>
              <p className="mt-4 text-[0.75rem] leading-relaxed text-white/35">
                Published daily. Methodology and contributor criteria available
                on request.
              </p>
            </div>
          </Reveal>
        </div>

        {/* Corridors */}
        <div className="mt-20 grid items-center gap-14 border-t border-white/10 pt-16 lg:mt-28 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-20">
          <Reveal>
            <h3 className="display-md max-w-[16ch] text-white">
              Built in Ghana, shaped for the continent.
            </h3>
            <p className="mt-5 max-w-[46ch] text-[0.9375rem] leading-relaxed text-white/55">
              The cedi is where we prove the method. The problem is not Ghanaian
              — it is every corridor where a business earns hard currency and
              settles in a soft one, and where the rate that decides the margin
              is set by whoever answers the phone.
            </p>

            <dl className="mt-10 grid grid-cols-3 gap-6">
              {[
                { v: 54, s: "", label: "African markets with the same gap" },
                { v: 8, s: "", label: "Corridors in the launch roadmap" },
                { v: 90, s: "d", label: "To a defensible pricing record" },
              ].map((stat) => (
                <div key={stat.label} className="border-t border-white/12 pt-4">
                  <p className="font-display text-[2rem] font-bold leading-none tracking-[-0.03em] text-sky-200">
                    {stat.v}{stat.s}
                  </p>
                  <p className="mt-2 text-[0.75rem] leading-relaxed text-white/45">
                    {stat.label}
                  </p>
                </div>
              ))}
            </dl>
          </Reveal>

          <div className="relative">
            <CorridorField labels className="mx-auto h-auto w-full max-w-[26rem]" />
          </div>
        </div>
      </div>
    </section>
  );
}
