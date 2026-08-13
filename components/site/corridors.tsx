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

function Row({ ariaHidden }: { ariaHidden?: boolean }) {
  return (
    <div
      className="flex shrink-0 items-center"
      aria-hidden={ariaHidden ? "true" : undefined}
    >
      {PAIRS.map((p) => (
        <div
          key={p.pair}
          className="flex items-center gap-3 whitespace-nowrap border-r border-line px-7 py-4"
        >
          <span className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-ink-faint">
            {p.pair}
          </span>
          <span className="tnum font-mono text-[0.875rem] text-ink">
            {p.rate}
          </span>
          <span
            className={cn(
              "tnum font-mono text-[0.75rem]",
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
    <section className="border-y border-line bg-paper-soft">
      <div className="shell flex flex-col gap-5 py-7 lg:flex-row lg:items-center lg:gap-10">
        <p className="eyebrow shrink-0 text-ink-faint">
          Corridors we price · 12-month move
        </p>
        <div className="marquee-mask relative overflow-hidden">
          <div className="animate-marquee flex w-max">
            <Row />
            <Row ariaHidden />
          </div>
        </div>
      </div>
    </section>
  );
}
