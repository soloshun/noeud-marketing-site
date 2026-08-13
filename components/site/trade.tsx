"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { Eyebrow } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { PHOTOS, photoUrl, type Photo } from "@/lib/photos";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

function TradePhoto({
  photo,
  chipLabel,
  chipValue,
}: {
  photo: Photo;
  chipLabel: string;
  chipValue: string;
}) {
  return (
    <div className="relative aspect-[5/4] overflow-hidden rounded-[1.5rem] bg-paper-mist">
      <Image
        src={photoUrl(photo, 1100, 880)}
        alt={photo.alt}
        fill
        sizes="(min-width: 1024px) 38rem, 100vw"
        className="object-cover"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-plum-950/55 via-transparent to-transparent" />

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.8, delay: 0.25, ease: EASE }}
        className="absolute inset-x-4 bottom-4 rounded-xl border border-white/20 bg-plum-950/55 px-4 py-3 backdrop-blur-md sm:inset-x-6 sm:bottom-6"
      >
        <p className="font-mono text-[0.5625rem] uppercase tracking-[0.16em] text-white/55">
          {chipLabel}
        </p>
        <p className="tnum mt-1 font-mono text-[0.9375rem] text-white sm:text-[1.0625rem]">
          {chipValue}
        </p>
      </motion.div>
    </div>
  );
}

function Split({
  eyebrow,
  title,
  body,
  features,
  visual,
  flip,
  tone = "light",
}: {
  eyebrow: string;
  title: string;
  body: string;
  features: [string, string][];
  visual: React.ReactNode;
  flip?: boolean;
  tone?: "light" | "soft";
}) {
  return (
    <div
      className={cn(
        "border-t border-line py-24 lg:py-32",
        tone === "soft" ? "bg-paper-soft" : "bg-paper",
      )}
    >
      <div className="shell grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <Reveal className={cn(flip && "lg:order-2")}>{visual}</Reveal>

        <Reveal delay={1} className={cn(flip && "lg:order-1")}>
          <Eyebrow className="text-azure-500">{eyebrow}</Eyebrow>
          <h2 className="display-lg mt-5 max-w-[14ch] text-plum-800">{title}</h2>
          <p className="lede mt-6 max-w-[44ch]">{body}</p>

          <dl className="mt-10 grid overflow-hidden rounded-xl border border-line sm:grid-cols-2">
            {features.map(([k, v], i) => (
              <div
                key={k}
                className={cn(
                  "bg-paper p-5",
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
        </Reveal>
      </div>
    </div>
  );
}

export function Trade() {
  return (
    <section id="trade">
      <Split
        eyebrow="For exporters"
        title="Your dollars are worth something the day you invoice."
        body="Cocoa, cashew, shea, gold, manufactured goods, forex-earning services. If you earn abroad and settle at home, the cedi conversion is where margin quietly leaks."
        features={[
          ["Live receivable valuation", "What your foreign earnings are worth in cedis, today."],
          ["Competitive conversion", "Licensed banks bid to buy your dollars."],
          ["Peer percentiles", "Where your pricing sits against comparable exporters."],
          ["A clean record", "Every conversion documented for your own surveillance."],
        ]}
        visual={
          <TradePhoto
            photo={PHOTOS.exportYard}
            chipLabel="Receivable"
            chipValue="USD 240,000 · settling in 47 days"
          />
        }
      />

      <Split
        flip
        tone="soft"
        eyebrow="For importers"
        title="The price you agreed isn’t the price you’ll pay."
        body="Pharma inputs, electronics, FMCG stock, machinery. If you buy abroad and settle from cedis, the conversion decides your real landed cost — weeks after you shook hands."
        features={[
          ["Live payable valuation", "What every open invoice costs in cedis, today."],
          ["Risk in one number", "CFaR at 99%, against the appetite you set."],
          ["Competitive settlement", "Banks quote your trade side by side."],
          ["Nothing held", "Money moves bank to bank. We are never in the path."],
        ]}
        visual={
          <TradePhoto
            photo={PHOTOS.importBerth}
            chipLabel="Payable"
            chipValue="EUR 180,000 · due in 23 days"
          />
        }
      />
    </section>
  );
}
