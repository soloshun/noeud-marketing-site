"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef, useState } from "react";
import { Arrow, Button } from "@/components/ui/button";
import { RevealLines } from "@/components/ui/reveal";
import { CorridorField } from "@/components/site/corridor-field";
import { Scene } from "@/components/site/scene";

const EASE = [0.16, 1, 0.3, 1] as const;

function EmailCapture() {
  const [email, setEmail] = useState("");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        document.getElementById("apply")?.scrollIntoView({ behavior: "smooth" });
      }}
      className="mx-auto flex w-full max-w-lg flex-col gap-2.5 sm:flex-row sm:items-center sm:gap-0 sm:rounded-xl sm:border sm:border-line sm:bg-paper sm:p-1.5 sm:card-raise"
    >
      <label htmlFor="hero-email" className="sr-only">
        Work email
      </label>
      <input
        id="hero-email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="What&rsquo;s your work email?"
        className="h-[3.25rem] w-full min-w-0 flex-1 rounded-xl border border-line bg-paper px-4 text-[0.9375rem] text-ink outline-none placeholder:text-ink-faint focus:border-azure-400 sm:h-11 sm:border-transparent sm:bg-transparent sm:focus:border-transparent"
      />
      <Button
        type="submit"
        tone="plum"
        size="lg"
        className="shrink-0 rounded-xl sm:h-11"
      >
        Start the free 30-day pilot
        <Arrow />
      </Button>
    </form>
  );
}

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 70]);

  return (
    <section id="top" ref={ref} className="relative overflow-hidden pt-[4.5rem]">
      {/* The corridors run continuously behind the type. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-16 hidden w-[46rem] opacity-[0.16] lg:block"
      >
        <CorridorField tone="light" className="h-auto w-full" />
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[42rem]"
        style={{
          background:
            "radial-gradient(60rem 30rem at 50% -10%, rgba(155,215,240,0.22), transparent 65%)",
        }}
      />

      <div className="shell relative pb-14 pt-16 text-center sm:pt-20 lg:pt-24">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
          className="eyebrow text-azure-500"
        >
          FX risk control for African trade
        </motion.p>

        <h1 className="display-xl mx-auto mt-6 max-w-[20ch] text-plum-800">
          <RevealLines
            immediate
            lines={["The rate will move.", "Your margin doesn’t have to."]}
          />
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.45 }}
          className="mx-auto mt-7 max-w-[54ch] font-serif text-[1.1875rem] leading-[1.6] text-ink-soft sm:text-[1.3125rem]"
        >
          See what every foreign invoice is worth in cedis today, what your
          exposure could cost you, and which licensed bank offers the best rate
          — before settlement day, not after.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.58 }}
          className="mt-9"
        >
          <EmailCapture />
          <p className="mt-3.5 text-[0.8125rem] text-ink-faint">
            30 days free · no card · we never hold your money
          </p>
        </motion.div>
      </div>

      <motion.div style={{ y }} className="shell relative pb-20 lg:pb-28">
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 1.1, ease: EASE, delay: 0.15 }}
        >
          <Scene />
        </motion.div>
      </motion.div>
    </section>
  );
}
