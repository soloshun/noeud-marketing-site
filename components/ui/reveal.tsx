"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * The site's only entrance animation: an 8px settle, once, on section entry.
 *
 * Deliberately minimal. The audience for this product is finance leadership,
 * not a design gallery — motion is here to stop content appearing abruptly,
 * not to perform. If a thing doesn't need to move, it doesn't get wrapped.
 */
export function Reveal({
  children,
  className,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "section" | "header" | "li" | "p";
}) {
  const Tag = motion[as];
  return (
    <Tag
      className={cn(className)}
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2, margin: "0px 0px -60px 0px" }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Tag>
  );
}
