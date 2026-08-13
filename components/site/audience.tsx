"use client";

import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useState } from "react";
import { Eyebrow } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { PHOTOS, photoUrl } from "@/lib/photos";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

const ROLES = [
  {
    id: "directors",
    tab: "Finance directors",
    title: "Your FX cost has a number. Know it before month-end.",
    body: "NOEUD values every open invoice in cedis through the trading day and quantifies the exposure at 99% confidence. The number sits on your dashboard, not in your reconciliation.",
    photo: PHOTOS.directors,
    stat: ["1–7%", "of trade value is the typical leak"],
  },
  {
    id: "ops",
    tab: "Finance ops",
    title: "One request instead of three phone calls.",
    body: "Licensed banks price the same ticket at once. Exposures arrive from your invoices rather than a spreadsheet, and every conversion documents itself.",
    photo: PHOTOS.ops,
    stat: ["5 days", "median time to a first routed trade"],
  },
  {
    id: "owners",
    tab: "Owners",
    title: "Know what the cedi did to this shipment.",
    body: "You priced the container in dollars and got paid in cedis six weeks later. NOEUD shows that gap in money, per trade, while you can still act on it.",
    photo: PHOTOS.owners,
    stat: ["Day 0", "exposures tracked from the moment you commit"],
  },
] as const;

export function Audience() {
  const [active, setActive] = useState(0);
  const role = ROLES[active];

  return (
    <section className="border-t border-line bg-paper py-24 lg:py-32">
      <div className="shell">
        <Reveal className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <Eyebrow className="text-azure-500">This is for</Eyebrow>

          <div role="tablist" aria-label="Choose a role" className="flex gap-6">
            {ROLES.map((r, i) => (
              <button
                key={r.id}
                role="tab"
                type="button"
                aria-selected={active === i}
                onClick={() => setActive(i)}
                className={cn(
                  "relative pb-2 text-[0.9375rem] font-medium transition-colors",
                  active === i
                    ? "text-plum-800"
                    : "text-ink-faint hover:text-ink-soft",
                )}
              >
                {r.tab}
                {active === i && (
                  <motion.span
                    layoutId="audience-underline"
                    transition={{ duration: 0.3, ease: EASE }}
                    className="absolute inset-x-0 bottom-0 h-[2px] rounded-full bg-azure-500"
                  />
                )}
              </button>
            ))}
          </div>
        </Reveal>

        <div className="mt-12 grid items-center gap-10 lg:mt-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] lg:gap-16">
          <AnimatePresence mode="wait">
            <motion.div
              key={role.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: EASE }}
            >
              <h2 className="display-lg max-w-[16ch] text-plum-800">
                {role.title}
              </h2>
              <p className="lede mt-6 max-w-[46ch]">{role.body}</p>

              <div className="mt-10 flex items-baseline gap-5 border-t border-line pt-6">
                <span className="font-display text-[2.5rem] font-black leading-none tracking-[-0.03em] text-azure-500">
                  {role.stat[0]}
                </span>
                <span className="max-w-[22ch] text-[0.875rem] leading-relaxed text-ink-faint">
                  {role.stat[1]}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="relative">
            {/* a soft field behind the portrait so it sits in light rather
                than on a flat swatch */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -inset-6 -z-10 rounded-[2rem] opacity-70"
              style={{
                background:
                  "radial-gradient(60% 50% at 70% 15%, rgba(155,215,240,0.35), transparent 70%), radial-gradient(50% 40% at 20% 90%, rgba(74,16,57,0.10), transparent 70%)",
              }}
            />
            <div
              aria-hidden="true"
              className="dot-canvas pointer-events-none absolute -inset-6 -z-10 rounded-[2rem] opacity-[0.35]"
            />
            <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] bg-paper-mist ring-1 ring-line">
            <AnimatePresence mode="popLayout">
              <motion.div
                key={role.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35, ease: EASE }}
                className="absolute inset-0"
              >
                <Image
                  src={photoUrl(role.photo, 900, 1125)}
                  alt={role.photo.alt}
                  fill
                  sizes="(min-width: 1024px) 34rem, 100vw"
                  className="object-cover"
                />
              </motion.div>
            </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
