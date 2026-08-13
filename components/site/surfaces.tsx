"use client";

import { motion } from "motion/react";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

const SURFACES = [
  {
    n: "01",
    name: "Mark",
    title: "Mark",
    body: "Real-time valuation of every foreign invoice and receivable, in cedis.",
    stats: [
      ["Invoices marked", "1,204"],
      ["In cedis", "GHS 96M"],
    ],
    dark: true,
  },
  {
    n: "02",
    name: "Profile",
    title: "Profile",
    body: "Your currency risk as one number: CFaR and CVaR at 99%, against your stated appetite.",
    foot: "Live from week one",
  },
  {
    n: "03",
    name: "Route",
    title: "Route",
    body: "Licensed banks bid for each trade. Our fee is disclosed upfront, every time.",
    foot: "You choose when to trade",
  },
];

const LATER = [
  ["Witness", "Peer percentiles and pricing history, from day 90."],
  ["Patterns", "A quarterly Dealer Behaviour Report on how each bank priced you."],
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
            Three surfaces. One continuous view of your currency.
          </h2>
          <p className="max-w-[32ch] text-[0.9375rem] leading-relaxed text-ink-soft lg:pb-2 lg:text-right">
            Each surface does one thing precisely — together they turn a hidden
            cost into a decision you control.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-4 lg:grid-cols-3">
          {SURFACES.map((s, i) => (
            <motion.article
              key={s.name}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, delay: i * 0.09, ease: EASE }}
              className={cn(
                "group flex min-h-[19rem] flex-col rounded-[1.25rem] p-7 transition-shadow duration-500 sm:p-8",
                s.dark
                  ? "relative overflow-hidden bg-plum-900 text-white"
                  : "border border-line bg-paper-soft hover:card-raise",
              )}
            >
              {s.dark && (
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full opacity-60 blur-3xl"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(155,215,240,0.28), transparent 70%)",
                  }}
                />
              )}

              <div className="relative flex items-start justify-between">
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
                  "display-md relative mt-10",
                  s.dark ? "text-white" : "text-plum-800",
                )}
              >
                {s.title}
              </h3>
              <p
                className={cn(
                  "relative mt-3 max-w-[34ch] text-[0.9375rem] leading-relaxed",
                  s.dark ? "text-white/60" : "text-ink-soft",
                )}
              >
                {s.body}
              </p>

              {s.foot && (
                <p className="relative mt-auto flex items-center gap-2.5 border-t border-line pt-5 font-mono text-[0.5875rem] uppercase tracking-[0.14em] text-ink-faint">
                  <span className="h-1 w-1 rounded-full bg-azure-500" />
                  {s.foot}
                </p>
              )}

              {s.stats && (
                <div className="relative mt-auto grid grid-cols-2 gap-px overflow-hidden rounded-xl bg-white/10 pt-0">
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
            </motion.article>
          ))}
        </div>

        <Reveal delay={2}>
          <dl className="mt-10 grid gap-6 border-t border-line pt-8 sm:grid-cols-2 lg:gap-14">
            {LATER.map(([k, v]) => (
              <div key={k} className="flex gap-4">
                <dt className="aside-serif shrink-0 text-[1.0625rem] text-ink-faint">
                  {k}
                </dt>
                <dd className="text-[0.875rem] leading-relaxed text-ink-soft">
                  {v}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
