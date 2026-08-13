"use client";

import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "motion/react";
import Link from "next/link";
import { useState } from "react";
import { Arrow, ButtonLink } from "@/components/ui/button";
import { Wordmark } from "@/components/ui/logo";
import { cn } from "@/lib/utils";

const LINKS = [
  { label: "Product", href: "/#product" },
  { label: "Pilot", href: "/#lifecycle" },
  { label: "Pricing", href: "/#pricing" },
  { label: "Research", href: "/blog" },
];

export function Nav() {
  const [lifted, setLifted] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => setLifted(y > 16));

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500",
          lifted
            ? "border-b border-line/80 bg-paper/85 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <nav
          aria-label="Primary"
          className="shell grid h-[4.5rem] grid-cols-[1fr_auto_1fr] items-center gap-6"
        >
          <div className="hidden items-center gap-1 md:flex">
            {LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="group relative rounded-full px-3.5 py-2 text-[0.9375rem] text-ink-soft transition-colors hover:text-plum-800"
              >
                {link.label}
                <span className="absolute inset-x-3.5 bottom-1 h-px origin-left scale-x-0 bg-azure-500 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100" />
              </a>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-plum-900 md:hidden"
          >
            <span className="relative block h-3 w-4">
              <span
                className={cn(
                  "absolute left-0 h-px w-4 bg-current transition-transform duration-300",
                  open ? "top-1.5 rotate-45" : "top-0",
                )}
              />
              <span
                className={cn(
                  "absolute left-0 h-px w-4 bg-current transition-transform duration-300",
                  open ? "top-1.5 -rotate-45" : "top-3",
                )}
              />
            </span>
          </button>

          <Link
            href="/"
            className="justify-self-center text-plum-900 transition-opacity hover:opacity-70"
            aria-label="NOEUD home"
          >
            <Wordmark />
          </Link>

          <div className="flex items-center justify-end">
            <ButtonLink href="/#apply" tone="plum" size="sm">
              Apply for the pilot
              <Arrow />
            </ButtonLink>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-paper pt-[4.5rem] md:hidden"
          >
            <div className="shell flex flex-col gap-1 py-8">
              {LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="display-md border-b border-line-soft py-5 text-plum-900"
                >
                  {link.label}
                </a>
              ))}
              <ButtonLink
                href="/#apply"
                tone="plum"
                size="lg"
                className="mt-8 w-full"
                onClick={() => setOpen(false)}
              >
                Apply for the pilot
                <Arrow />
              </ButtonLink>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
