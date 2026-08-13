"use client";

import { useState } from "react";
import { Arrow, Button } from "@/components/ui/button";
import { LoopingFilm } from "@/components/site/looping-film";

function EmailCapture() {
  const [email, setEmail] = useState("");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        document.getElementById("apply")?.scrollIntoView({ behavior: "smooth" });
      }}
      className="mx-auto flex w-full max-w-lg flex-col gap-2.5 sm:flex-row sm:items-center sm:gap-0 sm:rounded-xl sm:border sm:border-line sm:bg-paper sm:p-1.5"
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
  return (
    <section id="top" className="relative pt-[4.5rem]">
      <div className="shell relative pb-14 pt-16 text-center sm:pt-20 lg:pt-24">
        <p className="eyebrow text-azure-500">
          FX risk control for African trade
        </p>

        <h1 className="display-xl mx-auto mt-6 max-w-[20ch] text-plum-800">
          The rate will move.
          <br />
          Your margin doesn&rsquo;t have to.
        </h1>

        <p className="mx-auto mt-7 max-w-[54ch] font-serif text-[1.1875rem] leading-[1.6] text-ink-soft sm:text-[1.3125rem]">
          See what every foreign invoice is worth in cedis today, what your
          exposure could cost you, and which licensed bank offers the best rate
          — before settlement day, not after.
        </p>

        <div className="mt-9">
          <EmailCapture />
          <p className="mt-3.5 text-[0.8125rem] text-ink-faint">
            30 days free · no card · we never hold your money
          </p>
        </div>
      </div>

      {/* Full-bleed product film. Plays itself, loops, no controls to hunt for. */}
      <LoopingFilm
        src="/noeud-hero.mp4"
        poster="/noeud-hero-poster.jpg"
        ratio="2560 / 1120"
        label="The NOEUD dashboard: every open invoice valued in cedis against the commercial midrate, licensed banks bidding on a $500,000 trade, and currency risk quantified at 99% confidence."
      />
    </section>
  );
}
