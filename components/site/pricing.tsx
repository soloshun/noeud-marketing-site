"use client";

import { motion } from "motion/react";
import { Arrow, ButtonLink, Eyebrow } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

const STEPS = [
  ["01", "Start free.", "A 30-day pilot. No card."],
  ["02", "At day 30, you decide.", "Onboard, or walk. Your call."],
  ["03", "Pay a share of savings.", "A small share of what we verify, with a monthly minimum."],
];

const TIERS = [
  {
    name: "Starter",
    band: "For $600K—$2M in annual FX",
    figure: "$750",
    unit: "/ month",
    setup: ["One-time setup", "GHS 3,500"],
    fee: ["Fee on trades", "Share of savings"],
    cta: "Apply for the pilot",
  },
  {
    name: "Growth",
    band: "For $2.1M—$6M in annual FX",
    figure: "$1,450",
    unit: "/ month",
    setup: ["One-time setup", "GHS 7,500"],
    fee: ["Fee on trades", "Share of savings"],
    cta: "Apply for the pilot",
    featured: true,
  },
  {
    name: "Enterprise",
    band: "Above $6M in annual FX",
    figure: "Custom",
    unit: "",
    setup: ["Adds", "API + IFRS 13 reports"],
    fee: ["Fee on trades", "Share of savings"],
    cta: "Talk to us",
  },
];

export function Pricing() {
  return (
    <section
      id="pricing"
      className="border-t border-line bg-paper py-24 lg:py-32"
    >
      <div className="shell">
        <Reveal className="max-w-3xl">
          <Eyebrow className="text-azure-500">Pricing</Eyebrow>
          <h2 className="display-lg mt-5 max-w-[18ch] text-plum-800">
            Start free. Then pay a share of what we save you.
          </h2>
          <p className="lede mt-6 max-w-[54ch]">
            One model. No feature tiers. Nothing at all until day 30.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-8 border-t border-line pt-8 sm:grid-cols-3 sm:gap-6">
          {STEPS.map(([n, title, body], i) => (
            <motion.div
              key={n}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: EASE }}
            >
              <p className="font-mono text-[0.6875rem] tracking-[0.14em] text-azure-500">
                {n}
              </p>
              <p className="mt-3 font-display text-[1.0625rem] font-bold text-plum-800">
                {title}
              </p>
              <p className="mt-1.5 text-[0.875rem] leading-relaxed text-ink-faint">
                {body}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {TIERS.map((tier, i) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.8, delay: i * 0.09, ease: EASE }}
              className={cn(
                "flex flex-col rounded-[1.25rem] border bg-paper p-7 sm:p-8",
                tier.featured
                  ? "border-plum-800 card-raise"
                  : "border-line",
              )}
            >
              <div className="flex items-start justify-between gap-4">
                <h3 className="display-sm text-plum-800">{tier.name}</h3>
                {tier.featured && (
                  <span className="shrink-0 rounded-full bg-sky-100 px-3 py-1.5 text-[0.6875rem] font-medium text-sky-700">
                    Most common
                  </span>
                )}
              </div>
              <p className="mt-2 text-[0.8125rem] text-ink-faint">{tier.band}</p>

              <div className="mt-8 border-t border-line pt-6">
                <p className="font-mono text-[0.5625rem] uppercase tracking-[0.14em] text-ink-faint">
                  Monthly minimum
                </p>
                <p className="mt-2 flex items-baseline gap-2">
                  <span className="font-display text-[2.75rem] font-black leading-none tracking-[-0.04em] text-plum-800">
                    {tier.figure}
                  </span>
                  {tier.unit && (
                    <span className="text-[0.875rem] text-ink-faint">
                      {tier.unit}
                    </span>
                  )}
                </p>
              </div>

              <dl className="mt-7 space-y-0 border-t border-line pt-2">
                {[tier.setup, tier.fee].map(([k, v]) => (
                  <div
                    key={k}
                    className="flex items-baseline justify-between gap-4 border-b border-line py-3 last:border-0"
                  >
                    <dt className="text-[0.8125rem] text-ink-faint">{k}</dt>
                    <dd className="text-[0.8125rem] font-medium text-ink">
                      {v}
                    </dd>
                  </div>
                ))}
              </dl>

              <ButtonLink
                href="#apply"
                tone={tier.featured ? "plum" : "outline"}
                size="md"
                className="mt-auto w-full pt-0"
              >
                {tier.cta}
                <Arrow />
              </ButtonLink>
            </motion.div>
          ))}
        </div>

        <Reveal delay={2}>
          <p className="mt-8 max-w-[78ch] border-t border-line pt-6 text-[0.8125rem] leading-relaxed text-ink-faint">
            <span className="font-medium text-ink-soft">Both sides published:</span>{" "}
            your share of verified savings is capped at 40 bps of trade value.
            Routing banks separately pay us 2.5 bps on routed volume — disclosed
            publicly, constant, and never built into your rate.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
