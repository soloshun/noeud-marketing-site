"use client";

import { AnimatePresence, motion } from "motion/react";
import { Check } from "lucide-react";
import { useState, type FormEvent } from "react";
import { Arrow, Button, Eyebrow } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";

const EASE = [0.16, 1, 0.3, 1] as const;

const ASSURANCES = [
  "Free for 30 days — at day 30, you decide",
  "We never hold or touch your money",
  "Every fee disclosed before you trade",
];

const field =
  "h-11 w-full rounded-lg border border-line bg-paper px-3.5 text-[0.9375rem] text-ink outline-none transition-colors placeholder:text-ink-faint focus:border-plum-400 focus:ring-2 focus:ring-plum-100";

const label =
  "block font-mono text-[0.625rem] uppercase tracking-[0.16em] text-ink-faint";

export function Apply() {
  const [sent, setSent] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // Wire to your CRM or /api/pilot route when the backend lands.
    setSent(true);
  }

  return (
    <section
      id="apply"
      className="border-t border-line bg-paper-soft py-24 lg:py-32"
    >
      <div className="shell grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-20">
        <Reveal>
          <Eyebrow className="text-azure-500">Apply for the pilot</Eyebrow>
          <h2 className="display-lg mt-5 max-w-[12ch] text-plum-800">
            One month of your invoice book.
          </h2>
          <p className="lede mt-6 max-w-[44ch]">
            For importers and exporters with $1M–$25M in annual FX volume. Tell
            us about your trade and we&rsquo;ll set up your pilot.
          </p>

          <ul className="mt-10 space-y-3.5">
            {ASSURANCES.map((item) => (
              <li key={item} className="flex items-center gap-3">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-sky-100 text-sky-700">
                  <Check size={12} strokeWidth={3} />
                </span>
                <span className="text-[0.9375rem] text-ink-soft">{item}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={1}>
          <div className="rounded-[1.5rem] border border-line bg-paper p-6 card-raise sm:p-9">
            <AnimatePresence mode="wait">
              {sent ? (
                <motion.div
                  key="done"
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: EASE }}
                  className="flex min-h-[26rem] flex-col items-center justify-center text-center"
                >
                  <motion.span
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 320,
                      damping: 20,
                      delay: 0.1,
                    }}
                    className="flex h-14 w-14 items-center justify-center rounded-full bg-plum-800 text-white"
                  >
                    <Check size={24} strokeWidth={2.4} />
                  </motion.span>
                  <h3 className="display-sm mt-6 text-plum-800">
                    Your pilot request is in.
                  </h3>
                  <p className="mt-3 max-w-[36ch] text-[0.9375rem] leading-relaxed text-ink-soft">
                    We read every one of these ourselves. Expect a note from
                    Accra within two working days.
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={onSubmit}
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="grid gap-5 sm:grid-cols-2"
                >
                  <div>
                    <label htmlFor="company" className={label}>
                      Company *
                    </label>
                    <input
                      id="company"
                      name="company"
                      required
                      autoComplete="organization"
                      className={`${field} mt-2`}
                    />
                  </div>
                  <div>
                    <label htmlFor="name" className={label}>
                      Your name *
                    </label>
                    <input
                      id="name"
                      name="name"
                      required
                      autoComplete="name"
                      className={`${field} mt-2`}
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className={label}>
                      Work email *
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      className={`${field} mt-2`}
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className={label}>
                      Phone
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      className={`${field} mt-2`}
                    />
                  </div>
                  <div>
                    <label htmlFor="role" className={label}>
                      Role
                    </label>
                    <input
                      id="role"
                      name="role"
                      placeholder="Finance Director"
                      className={`${field} mt-2`}
                    />
                  </div>
                  <div>
                    <label htmlFor="trade" className={label}>
                      Trade type
                    </label>
                    <select id="trade" name="trade" className={`${field} mt-2`}>
                      <option>Both</option>
                      <option>Exporter</option>
                      <option>Importer</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="volume" className={label}>
                      Annual FX volume
                    </label>
                    <select
                      id="volume"
                      name="volume"
                      className={`${field} mt-2`}
                    >
                      <option>Under $1M</option>
                      <option>$1M — $2M</option>
                      <option>$2.1M — $6M</option>
                      <option>Above $6M</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="interest" className={label}>
                      Pricing interest
                    </label>
                    <select
                      id="interest"
                      name="interest"
                      className={`${field} mt-2`}
                    >
                      <option>Not sure yet</option>
                      <option>Pay as you trade</option>
                      <option>Flat monthly</option>
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="notes" className={label}>
                      Anything else
                    </label>
                    <textarea
                      id="notes"
                      name="notes"
                      rows={3}
                      placeholder="Tell us about your typical trades…"
                      className={`${field} mt-2 h-auto resize-none py-3`}
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <Button type="submit" tone="plum" size="lg">
                      Apply for the pilot
                      <Arrow />
                    </Button>
                    <p className="mt-4 text-[0.75rem] leading-relaxed text-ink-faint">
                      By applying you agree to be contacted about your pilot. We
                      do not sell or share your trade data — ever.
                    </p>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
