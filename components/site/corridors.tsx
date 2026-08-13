import { cn } from "@/lib/utils";

const PAIRS = [
  { pair: "USD / GHS", rate: "13.0412", delta: "+6.1%", up: true },
  { pair: "EUR / GHS", rate: "14.2807", delta: "+4.4%", up: true },
  { pair: "GBP / GHS", rate: "16.5130", delta: "+5.2%", up: true },
  { pair: "USD / NGN", rate: "1,486.20", delta: "+3.8%", up: true },
  { pair: "USD / KES", rate: "129.45", delta: "−0.6%", up: false },
  { pair: "USD / XOF", rate: "601.88", delta: "+1.9%", up: true },
  { pair: "USD / ZAR", rate: "18.0432", delta: "+2.3%", up: true },
  { pair: "USD / EGP", rate: "48.6100", delta: "+4.9%", up: true },
  { pair: "CNY / GHS", rate: "1.8321", delta: "+5.7%", up: true },
  { pair: "USD / TZS", rate: "2,712.00", delta: "+1.4%", up: true },
];

/** One half of the loop. Rendered twice so the translate can wrap seamlessly. */
function Run({ hidden }: { hidden?: boolean }) {
  return (
    <div className="flex shrink-0" aria-hidden={hidden ? "true" : undefined}>
      {PAIRS.map((p) => (
        <div
          key={p.pair}
          className="flex items-baseline gap-2.5 whitespace-nowrap border-r border-line px-7 py-4"
        >
          <span className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-ink-faint">
            {p.pair}
          </span>
          <span className="tnum font-mono text-[0.8125rem] text-ink">
            {p.rate}
          </span>
          <span
            className={cn(
              "tnum font-mono text-[0.6875rem]",
              p.up ? "text-flag" : "text-verdant",
            )}
          >
            {p.delta}
          </span>
        </div>
      ))}
    </div>
  );
}

export function Corridors() {
  return (
    <section className="border-y border-line bg-paper">
      <div className="shell flex flex-col gap-4 py-5 lg:flex-row lg:items-center lg:gap-10">
        <p className="eyebrow shrink-0 text-ink-faint">
          Corridors we price · 12-month move
        </p>
        <div className="marquee-mask relative overflow-hidden">
          <div className="animate-marquee flex w-max">
            <Run />
            <Run hidden />
          </div>
        </div>
      </div>
    </section>
  );
}
