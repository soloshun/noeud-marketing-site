"use client";

import { motion } from "motion/react";
import { Eyebrow } from "@/components/ui/button";
import { CorridorField } from "@/components/site/corridor-field";
import { Reveal } from "@/components/ui/reveal";

/**
 * Typographic rather than photographic: the portrait slot is deliberately
 * empty until NOEUD supplies a real photograph of the person being quoted.
 */
export function Founder() {
  return (
    <section className="relative overflow-hidden border-t border-plum-950 bg-plum-950 py-24 text-white lg:py-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 top-1/2 hidden w-[40rem] -translate-y-1/2 opacity-[0.22] lg:block"
      >
        <CorridorField tone="dark" className="h-auto w-full" />
      </div>

      <div className="shell relative">
        <Reveal className="max-w-4xl">
          <Eyebrow className="text-sky-300">Founder note</Eyebrow>

          <motion.blockquote
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="mt-8"
          >
            <p className="font-serif text-[1.75rem] italic leading-[1.35] text-white sm:text-[2.25rem] lg:text-[2.75rem]">
              “I watched good businesses lose margin they never saw leave —
              decided in a room they were never invited into. NOEUD doesn’t
              promise to beat the market. It promises you’ll be in the room,
              with the numbers, while the decision can still be made.”
            </p>

            <footer className="mt-10 flex items-center gap-5">
              <span className="h-px w-12 bg-white/30" />
              <span>
                <span className="block font-display text-[0.9375rem] font-bold text-white">
                  Desmond Asime, Founder &amp; CEO
                </span>
                <span className="mt-1 block font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-white/40">
                  Accra · Tema · Ghana
                </span>
              </span>
            </footer>
          </motion.blockquote>
        </Reveal>
      </div>
    </section>
  );
}
