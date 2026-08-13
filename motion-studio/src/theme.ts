import { loadFont as loadDisplay } from "@remotion/google-fonts/InstrumentSans";
import { loadFont as loadMono } from "@remotion/google-fonts/IBMPlexMono";

/* Load only what the compositions actually set, otherwise the headless
   browser spends its whole startup budget fetching font weights. */
export const display = loadDisplay("normal", {
  weights: ["400", "700"],
  subsets: ["latin"],
}).fontFamily;

export const mono = loadMono("normal", {
  weights: ["400"],
  subsets: ["latin"],
}).fontFamily;

/** Identical to the site's tokens — the film has to feel like the same object. */
export const C = {
  plum950: "#23061a",
  plum900: "#380b2a",
  plum800: "#4a1039",
  plum500: "#9c4a84",
  sky300: "#9bd7f0",
  sky200: "#c3e7f6",
  sky500: "#3f9ec7",
  flag: "#d1453b",
  flagSoft: "#f0837a",
  white: "#ffffff",
} as const;

export const FPS = 30;

/* The invoice the whole film is about — same figures as the site. */
export const NOTIONAL = 500_000;
export const DECISION_RATE = 12.41;
export const SETTLE_RATE = 13.03;
export const DAYS = 47;
export const TOTAL_LOSS = (SETTLE_RATE - DECISION_RATE) * NOTIONAL;

export function seeded(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

/** The daily marks, matching the site's leak simulation exactly. */
export const MARKS = (() => {
  const rnd = seeded(90210);
  const out: number[] = [];
  for (let i = 0; i <= DAYS; i++) {
    const t = i / DAYS;
    const trend =
      DECISION_RATE + (SETTLE_RATE - DECISION_RATE) * (t * t * 0.55 + t * 0.45);
    const noise = i === 0 || i === DAYS ? 0 : (rnd() - 0.5) * 0.035;
    out.push(trend + noise);
  }
  return out;
})();

export const ghs = (n: number) =>
  Math.round(n).toLocaleString("en-US");
