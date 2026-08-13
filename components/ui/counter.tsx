"use client";

import { animate, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

type CounterProps = {
  value: number;
  from?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  delay?: number;
  className?: string;
  /** Adds thousands separators. */
  group?: boolean;
};

/**
 * Counts to `value` the first time it enters the viewport. The final value is
 * present in the server-rendered markup, so the number is correct with JS off
 * and never causes a hydration mismatch.
 */
export function Counter({
  value,
  from = 0,
  decimals = 0,
  prefix = "",
  suffix = "",
  duration = 1.6,
  delay = 0,
  className,
  group = true,
}: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduced = useReducedMotion();

  const format = (n: number) =>
    prefix +
    n.toLocaleString("en-US", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
      useGrouping: group,
    }) +
    suffix;

  useEffect(() => {
    if (!inView || reduced) return;
    const node = ref.current;
    if (!node) return;

    const controls = animate(from, value, {
      duration,
      delay,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => {
        node.textContent = format(latest);
      },
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, reduced, value, from, duration, delay]);

  return (
    <span ref={ref} className={cn("tnum", className)}>
      {format(value)}
    </span>
  );
}
