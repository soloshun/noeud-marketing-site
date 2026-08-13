import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

type Surface = {
  n: string;
  name: string;
  body: string;
  stats?: [string, string][];
  foot?: string;
  span?: string;
  dark?: boolean;
};

const SURFACES: Surface[] = [
  {
    n: "01",
    name: "Mark",
    body: "Real-time valuation of every foreign invoice and receivable, in cedis, against the commercial midrate.",
    stats: [
      ["Invoices marked", "1,204"],
      ["Avg. window", "38 days"],
      ["In cedis", "GHS 96M"],
    ],
    span: "lg:col-span-2",
    dark: true,
  },
  {
    n: "02",
    name: "Profile",
    body: "Your currency risk as one number: CFaR and CVaR at 99%, against your stated appetite.",
    foot: "Live from week one",
  },
  {
    n: "03",
    name: "Route",
    body: "Licensed banks bid for each trade. Our fee is disclosed upfront, every time.",
    foot: "You choose when to trade",
  },
  {
    n: "04",
    name: "Witness",
    body: "Accumulated pricing history and peer percentile data, from day 90.",
    foot: "Unlocks at day 90",
  },
  {
    n: "05",
    name: "Patterns",
    body: "A quarterly Dealer Behaviour Report — surveillance that keeps pricing honest.",
    foot: "Quarterly · per counterparty",
  },
];

export function Surfaces() {
  return (
    <section
      id="product"
      className="border-t border-line bg-paper py-24 lg:py-32"
    >
      <div className="shell">
        <Reveal className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <h2 className="display-lg max-w-[16ch] text-plum-800">
            Five surfaces. One continuous view of your currency.
          </h2>
          <p className="max-w-[32ch] text-[0.9375rem] leading-relaxed text-ink-soft lg:pb-2 lg:text-right">
            Each surface does one thing precisely — together they turn a hidden
            cost into a decision you control.
          </p>
        </Reveal>

        <Reveal className="mt-14 grid gap-4 lg:grid-cols-3">
          {SURFACES.map((s) => (
            <article
              key={s.name}
              className={cn(
                "flex min-h-[17rem] flex-col rounded-[1.25rem] p-7 sm:p-8",
                s.span,
                s.dark
                  ? "bg-plum-900 text-white"
                  : "border border-line bg-paper-soft",
              )}
            >
              <div className="flex items-start justify-between">
                <span
                  className={cn(
                    "font-mono text-[0.6875rem] tracking-[0.14em]",
                    s.dark ? "text-white/45" : "text-azure-500",
                  )}
                >
                  {s.n}
                </span>
                <span
                  className={cn(
                    "aside-serif text-[1.0625rem]",
                    s.dark ? "text-white/35" : "text-ink-faint/70",
                  )}
                >
                  {s.name}
                </span>
              </div>

              <h3
                className={cn(
                  "display-md mt-10",
                  s.dark ? "text-white" : "text-plum-800",
                )}
              >
                {s.name}
              </h3>
              <p
                className={cn(
                  "mt-3 max-w-[38ch] text-[0.9375rem] leading-relaxed",
                  s.dark ? "text-white/60" : "text-ink-soft",
                )}
              >
                {s.body}
              </p>

              {s.foot && (
                <p className="mt-auto flex items-center gap-2.5 border-t border-line pt-5 font-mono text-[0.5875rem] uppercase tracking-[0.14em] text-ink-faint">
                  <span className="h-1 w-1 rounded-full bg-azure-500" />
                  {s.foot}
                </p>
              )}

              {s.stats && (
                <div className="mt-auto grid grid-cols-3 gap-px overflow-hidden rounded-xl bg-white/10">
                  {s.stats.map(([k, v]) => (
                    <div key={k} className="bg-plum-900 px-4 py-3.5">
                      <p className="font-mono text-[0.5625rem] uppercase tracking-[0.14em] text-white/45">
                        {k}
                      </p>
                      <p className="tnum mt-1.5 font-mono text-[1rem] text-white">
                        {v}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </article>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
