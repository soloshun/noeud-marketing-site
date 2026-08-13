"use client";

import { motion, type Variants } from "motion/react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

const variants: Variants = {
  hidden: { opacity: 0, y: 22 },
  shown: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, ease: EASE, delay: i * 0.07 },
  }),
};

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Stagger index — multiplied by 70ms. */
  delay?: number;
  as?: "div" | "span" | "li" | "section" | "header" | "p";
};

/**
 * The single scroll-entrance primitive for the whole site. Everything animates
 * the same way so the page reads as one continuous document rather than a
 * collection of unrelated effects.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  as = "div",
}: RevealProps) {
  const Tag = motion[as];
  return (
    <Tag
      className={cn(className)}
      custom={delay}
      variants={variants}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, amount: 0.25, margin: "0px 0px -80px 0px" }}
    >
      {children}
    </Tag>
  );
}

const lineVariants: Variants = {
  hidden: { y: "110%" },
  shown: (i: number) => ({
    y: "0%",
    transition: { duration: 1, ease: EASE, delay: 0.06 * i },
  }),
};

/**
 * Splits a headline into lines that rise from a mask — used sparingly, only on
 * the two or three headlines that carry the page.
 *
 * The in-view trigger lives on the *unclipped* wrapper. Put it on the inner
 * spans and it deadlocks: they start translated fully outside their
 * overflow-hidden parent, so their intersection ratio is permanently zero and
 * the animation never fires.
 */
export function RevealLines({
  lines,
  className,
  lineClassName,
  immediate = false,
}: {
  lines: ReactNode[];
  className?: string;
  lineClassName?: string;
  /** Above-the-fold headlines should play on load, not on scroll. */
  immediate?: boolean;
}) {
  const trigger = immediate
    ? ({ animate: "shown" } as const)
    : ({
        whileInView: "shown",
        viewport: { once: true, amount: 0.5 },
      } as const);

  return (
    <motion.span
      className={cn("block", className)}
      initial="hidden"
      {...trigger}
    >
      {/* padding gives ascenders/descenders room inside the clip; the matching
          negative margin keeps the line rhythm untouched */}
      {lines.map((line, i) => (
        <span
          key={i}
          className="-mb-[0.16em] block overflow-hidden pb-[0.16em]"
        >
          <motion.span
            className={cn("block", lineClassName)}
            custom={i}
            variants={lineVariants}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}
