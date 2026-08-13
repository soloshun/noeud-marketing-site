"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Eyebrow } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";

const CHAPTERS = [
  ["01", "The invoice", "You agree a price in dollars."],
  ["02", "The drift", "A rate nobody quoted you takes the margin."],
  ["03", "The route", "Licensed banks bid. The best price wins."],
];

/**
 * The one piece of the page that is a rendered film rather than live DOM.
 * Composed in Remotion (see /motion-studio) so the sequencing, easing and
 * type can be directed frame by frame.
 */
export function Film() {
  const ref = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const inView = useInView(ref, { amount: 0.45 });
  const reduced = useReducedMotion();
  const [ready, setReady] = useState(false);

  // Only play while it is actually on screen — an autoplaying loop that runs
  // in the background is a battery tax on the phones most of Africa reads on.
  useEffect(() => {
    const el = video.current;
    if (!el || reduced) return;
    if (inView) {
      void el.play().catch(() => {});
    } else {
      el.pause();
    }
  }, [inView, reduced]);

  return (
    <section className="border-t border-line bg-paper py-24 lg:py-32">
      <div className="shell">
        <Reveal className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Eyebrow className="text-azure-500">The film</Eyebrow>
            <h2 className="display-lg mt-5 max-w-[16ch] text-plum-800">
              One invoice, from priced to settled.
            </h2>
          </div>
          <p className="max-w-[32ch] font-serif text-[1.0625rem] leading-relaxed text-ink-soft lg:pb-2 lg:text-right">
            Eighteen seconds on where the margin goes — and what it takes to get
            it back.
          </p>
        </Reveal>

        <Reveal delay={1} className="mt-12 lg:mt-16">
          {/* the deck's signature: the film sits inside a soft blue pillow */}
          <div className="rounded-[2rem] bg-sky-200/70 p-3 sm:rounded-[2.75rem] sm:p-8 lg:p-12">
          <div
            ref={ref}
            className="relative overflow-hidden rounded-[1.25rem] sm:rounded-[1.5rem]"
          >
            <video
              ref={video}
              className="block aspect-video w-full"
              src="/noeud-film.mp4"
              poster="/noeud-film-poster.jpg"
              muted
              loop
              playsInline
              preload="metadata"
              controls={reduced ?? false}
              onLoadedData={() => setReady(true)}
              aria-label="NOEUD brand film: a $500,000 export invoice priced at 12.41 GHS per USD, the rate drifting to 13.03 over 47 days, and licensed banks competing to recover the margin."
            />
            <motion.div
              aria-hidden="true"
              initial={{ opacity: 1 }}
              animate={{ opacity: ready ? 0 : 1 }}
              transition={{ duration: 0.6 }}
              className="pointer-events-none absolute inset-0 bg-plum-900"
            />
          </div>
          </div>
        </Reveal>

        <dl className="mt-10 grid gap-8 sm:grid-cols-3">
          {CHAPTERS.map(([n, title, body], i) => (
            <motion.div
              key={n}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{
                duration: 0.7,
                delay: i * 0.09,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="border-t border-line pt-4"
            >
              <dt className="flex items-center gap-3">
                <span className="font-mono text-[0.75rem] text-azure-500">
                  {n}
                </span>
                <span className="font-display text-[1.0625rem] font-bold text-plum-800">
                  {title}
                </span>
              </dt>
              <dd className="mt-2 text-[0.875rem] leading-relaxed text-ink-soft">
                {body}
              </dd>
            </motion.div>
          ))}
        </dl>
      </div>
    </section>
  );
}
