"use client";

import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useState } from "react";
import { Eyebrow } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { PHOTOS, photoUrl, type Photo } from "@/lib/photos";
import { cn } from "@/lib/utils";

type Side = {
  id: string;
  tab: string;
  eyebrow: string;
  title: string;
  body: string;
  chipLabel: string;
  chipValue: string;
  photo: Photo;
  features: [string, string][];
};

/* Copy lives here so NOEUD can drop replacement text straight in. */
const SIDES: Side[] = [
  {
    id: "exporters",
    tab: "I export",
    eyebrow: "For exporters",
    title: "Your dollars are worth something the day you invoice.",
    body: "Cocoa, cashew, shea, gold, manufactured goods, forex-earning services. If you earn abroad and settle at home, the cedi conversion is where margin quietly leaks.",
    chipLabel: "Receivable",
    chipValue: "USD 240,000 · settling in 47 days",
    photo: PHOTOS.exportYard,
    features: [
      ["Live receivable valuation", "What your foreign earnings are worth in cedis, today."],
      ["Competitive conversion", "Licensed banks bid to buy your dollars."],
      ["Peer percentiles", "Where your pricing sits against comparable exporters."],
      ["A clean record", "Every conversion documented for your own surveillance."],
    ],
  },
  {
    id: "importers",
    tab: "I import",
    eyebrow: "For importers",
    title: "The price you agreed isn’t the price you’ll pay.",
    body: "Pharma inputs, electronics, FMCG stock, machinery. If you buy abroad and settle from cedis, the conversion decides your real landed cost — weeks after you shook hands.",
    chipLabel: "Payable",
    chipValue: "EUR 180,000 · due in 23 days",
    photo: PHOTOS.importBerth,
    features: [
      ["Live payable valuation", "What every open invoice costs in cedis, today."],
      ["Risk in one number", "CFaR at 99%, against the appetite you set."],
      ["Competitive settlement", "Banks quote your trade side by side."],
      ["Nothing held", "Money moves bank to bank. We are never in the path."],
    ],
  },
];

export function Trade() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const side = SIDES[index];

  const select = (next: number) => {
    if (next === index) return;
    setDirection(next > index ? 1 : -1);
    setIndex(next);
  };

  return (
    <section id="trade" className="border-t border-line bg-paper-soft py-24 lg:py-32">
      <div className="shell">
        <Reveal className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <Eyebrow className="text-azure-500">Which side of the trade</Eyebrow>

          {/* A segmented switch — deliberately not the underline tabs used
              further up the page, so the two controls read as different. */}
          <div
            role="tablist"
            aria-label="Choose your side of the trade"
            className="relative inline-flex rounded-lg border border-line bg-paper p-1"
          >
            {SIDES.map((s, i) => (
              <button
                key={s.id}
                role="tab"
                type="button"
                aria-selected={index === i}
                onClick={() => select(i)}
                className={cn(
                  "relative z-10 px-5 py-2.5 text-[0.875rem] font-medium transition-colors duration-200",
                  index === i ? "text-white" : "text-ink-soft hover:text-ink",
                )}
              >
                {index === i && (
                  <motion.span
                    layoutId="trade-switch"
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0 -z-10 rounded-md bg-plum-800"
                  />
                )}
                {s.tab}
              </button>
            ))}
          </div>
        </Reveal>

        <div className="relative mt-12 overflow-hidden lg:mt-14">
          <AnimatePresence mode="wait" initial={false} custom={direction}>
            <motion.div
              key={side.id}
              custom={direction}
              initial={{ opacity: 0, x: direction * 32 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -32 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20"
            >
              <div className="relative">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -inset-6 -z-10 rounded-[2rem] opacity-70"
                  style={{
                    background:
                      "radial-gradient(60% 50% at 30% 10%, rgba(155,215,240,0.32), transparent 70%), radial-gradient(50% 45% at 85% 95%, rgba(74,16,57,0.10), transparent 70%)",
                  }}
                />
                <div
                  aria-hidden="true"
                  className="dot-canvas pointer-events-none absolute -inset-6 -z-10 rounded-[2rem] opacity-[0.3]"
                />
                <div className="relative aspect-[5/4] overflow-hidden rounded-[1.25rem] bg-paper-mist ring-1 ring-line">
                <Image
                  src={photoUrl(side.photo, 1100, 880)}
                  alt={side.photo.alt}
                  fill
                  sizes="(min-width: 1024px) 38rem, 100vw"
                  className="object-cover"
                  priority={false}
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-plum-950/55 via-transparent to-transparent" />
                <div className="absolute inset-x-4 bottom-4 rounded-lg border border-white/20 bg-plum-950/55 px-4 py-3 backdrop-blur-md sm:inset-x-6 sm:bottom-6">
                  <p className="font-mono text-[0.5625rem] uppercase tracking-[0.16em] text-white/55">
                    {side.chipLabel}
                  </p>
                  <p className="tnum mt-1 font-mono text-[0.9375rem] text-white sm:text-[1.0625rem]">
                    {side.chipValue}
                  </p>
                </div>
                </div>
              </div>

              <div>
                <Eyebrow className="text-azure-500">{side.eyebrow}</Eyebrow>
                <h2 className="display-lg mt-5 max-w-[14ch] text-plum-800">
                  {side.title}
                </h2>
                <p className="lede mt-6 max-w-[44ch]">{side.body}</p>

                <dl className="mt-10 grid overflow-hidden rounded-xl border border-line bg-paper sm:grid-cols-2">
                  {side.features.map(([k, v], i) => (
                    <div
                      key={k}
                      className={cn(
                        "p-5",
                        i % 2 === 0 && "sm:border-r sm:border-line",
                        i > 1 && "border-t border-line",
                        i === 1 && "border-t border-line sm:border-t-0",
                      )}
                    >
                      <dt className="font-display text-[0.9375rem] font-bold text-plum-800">
                        {k}
                      </dt>
                      <dd className="mt-1.5 text-[0.8125rem] leading-relaxed text-ink-faint">
                        {v}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
