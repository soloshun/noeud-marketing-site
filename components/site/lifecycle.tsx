import { Eyebrow } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";

const STAGES = [
  {
    n: "01",
    when: "Days 1—3",
    title: "Onboard and upload",
    body: "Your exposure book — a CSV, an Excel sheet, or the one-pager your accountant keeps. Mark and Profile go live within the week.",
  },
  {
    n: "02",
    when: "Days 3—30",
    title: "Watch, capture, route",
    body: "Exposures move daily. Capture your bank's quotes. Route a trade when — and only when — you choose. Median time to a first routed trade: 5 days.",
  },
  {
    n: "03",
    when: "Day 30",
    title: "You decide",
    body: "You have seen your own numbers for a month. Onboard, or walk with your data. No card was ever on file.",
  },
];

export function Lifecycle() {
  return (
    <section
      id="lifecycle"
      className="border-t border-line bg-paper-soft py-24 lg:py-32"
    >
      <div className="shell">
        <Reveal>
          <Eyebrow className="text-azure-500">The pilot</Eyebrow>
          <h2 className="display-lg mt-5 max-w-[16ch] text-plum-800">
            Thirty days from upload to control.
          </h2>
        </Reveal>

        <div className="relative mt-14">
          <div className="absolute inset-x-0 top-0 h-px bg-line" />

          <div className="grid gap-10 pt-8 sm:grid-cols-3 sm:gap-8 lg:gap-14">
            {STAGES.map((s) => (
              <div
                key={s.n}
                className="sm:border-l sm:border-line sm:pl-6 sm:first:border-l-0 sm:first:pl-0"
              >
                <p className="flex items-baseline gap-3">
                  <span className="font-mono text-[0.6875rem] tracking-[0.14em] text-azure-500">
                    {s.n}
                  </span>
                  <span className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-ink-faint">
                    {s.when}
                  </span>
                </p>
                <h3 className="display-sm mt-4 text-plum-800">{s.title}</h3>
                <p className="mt-3 max-w-[36ch] text-[0.9375rem] leading-relaxed text-ink-soft">
                  {s.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
