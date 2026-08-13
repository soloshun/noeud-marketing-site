"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/ui/reveal";

const EASE = [0.16, 1, 0.3, 1] as const;

const QUESTIONS = [
  [
    "Are you a bank?",
    "No. We never hold your money. Trades settle directly between your bank and the executing bank. NOEUD routes, benchmarks and documents — it never sits in the flow of funds.",
  ],
  [
    "How do you make money?",
    "Two ways, both published. You pay a monthly minimum plus a share of verified savings, capped at 40 bps of trade value. Routing banks separately pay us 2.5 bps on routed volume, disclosed publicly and never built into your rate.",
  ],
  [
    "My bank already gives me good rates. Why would I need this?",
    "Then you’ll finally have the evidence. Your bank is one of the partners we route to. If their bid is the best on the table, they win the trade — and you get the documentation proving you’re priced well.",
  ],
  [
    "What do I actually see on day one?",
    "Mark and Profile go live within the first week: every exposure valued in cedis, your risk quantified. Benchmarking builds from real quotes captured over time — we’d rather show you the picture building than pretend it arrived finished.",
  ],
  [
    "Who sees my data?",
    "You decide, tier by tier. Nothing about your trades or exposures moves anywhere without you turning that tier on. We don’t sell exposure data.",
  ],
  [
    "What does the pilot commit me to?",
    "Nothing. Thirty days, no card on file, and your data leaves with you if you go. At day 30, you decide.",
  ],
];

export function Questions() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section
      id="questions"
      className="border-t border-line bg-paper py-24 lg:py-32"
    >
      <div className="shell">
        <Reveal>
          <h2 className="display-lg max-w-[12ch] text-plum-800">
            Fair questions.
          </h2>
        </Reveal>

        <dl className="mt-12 lg:mt-14">
          {QUESTIONS.map(([q, a], i) => {
            const isOpen = open === i;
            return (
              <motion.div
                key={q}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.6, delay: (i % 3) * 0.06, ease: EASE }}
                className="border-t border-line last:border-b"
              >
                <dt>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="group flex w-full items-start justify-between gap-8 py-6 text-left"
                  >
                    <span
                      className={cn(
                        "font-display text-[1.0625rem] font-bold transition-colors sm:text-[1.1875rem]",
                        isOpen
                          ? "text-plum-800"
                          : "text-ink group-hover:text-plum-700",
                      )}
                    >
                      {q}
                    </span>
                    <span className="relative mt-1.5 h-3 w-3 shrink-0">
                      <span className="absolute left-0 top-1/2 h-px w-3 -translate-y-1/2 bg-ink-faint" />
                      <motion.span
                        animate={{ rotate: isOpen ? 0 : 90 }}
                        transition={{ duration: 0.35, ease: EASE }}
                        className="absolute left-0 top-1/2 h-px w-3 -translate-y-1/2 bg-ink-faint"
                      />
                    </span>
                  </button>
                </dt>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.dd
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: EASE }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-[70ch] pb-7 text-[0.9375rem] leading-relaxed text-ink-soft">
                        {a}
                      </p>
                    </motion.dd>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </dl>
      </div>
    </section>
  );
}
