import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Deterministic pseudo-random in [0, 1). Every generated visual (sparklines,
 * quote jitter, node timing) is seeded so the server render and the client
 * hydration agree — no `Math.random()` anywhere in the tree.
 */
export function seeded(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

export const ghs = new Intl.NumberFormat("en-GH", {
  maximumFractionDigits: 0,
});

export const usd = new Intl.NumberFormat("en-US", {
  maximumFractionDigits: 0,
});

export function rate(n: number) {
  return n.toFixed(2);
}
