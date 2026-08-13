"use client";

import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { useRef } from "react";
import { Eyebrow } from "@/components/ui/button";
import { seeded } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/* The invoice                                                         */
/* ------------------------------------------------------------------ */

const NOTIONAL = 500_000;
const DECISION_RATE = 12.41;
const SETTLE_RATE = 13.03;
const DAYS = 47;

const W = 640;
const H = 210;
const TOP = 26;
const BOT = H - 26;
const LO = 12.38;
const HI = 13.08;

const yOf = (r: number) => BOT - ((r - LO) / (HI - LO)) * (BOT - TOP);

/** 48 daily marks that start on the decision rate and land on the settle rate. */
function buildDays() {
  const rnd = seeded(90210);
  const out: number[] = [];
  for (let i = 0; i <= DAYS; i++) {
    const t = i / DAYS;
    // ease-in drift: the loss accelerates, which is exactly how it feels
    const trend = DECISION_RATE + (SETTLE_RATE - DECISION_RATE) * (t * t * 0.55 + t * 0.45);
    const noise = i === 0 || i === DAYS ? 0 : (rnd() - 0.5) * 0.035;
    out.push(trend + noise);
  }
  return out;
}

const MARKS = buildDays();
const STOPS = MARKS.map((_, i) => i / DAYS);
const XS = MARKS.map((_, i) => (i / DAYS) * W);
const YS = MARKS.map(yOf);
const LOSSES = MARKS.map((r) => (r - DECISION_RATE) * NOTIONAL);

const DECISION_Y = yOf(DECISION_RATE);
const LINE_D = MARKS.map((r, i) => `${i ? "L" : "M"} ${XS[i].toFixed(1)} ${yOf(r).toFixed(1)}`).join(" ");
const AREA_D = `${LINE_D} L ${W} ${DECISION_Y.toFixed(1)} L 0 ${DECISION_Y.toFixed(1)} Z`;

/* ------------------------------------------------------------------ */

function Cell({
  label,
  children,
  accent,
}: {
  label: string;
  children: React.ReactNode;
  accent?: "flag" | "sky";
}) {
  return (
    <div className="bg-plum-900 px-3 py-3 sm:px-5 sm:py-5">
      <p className="font-mono text-[0.5875rem] uppercase tracking-[0.16em] text-white/45">
        {label}
      </p>
      <p
        className={
          "tnum mt-2 font-mono text-[1.5rem] leading-none sm:text-[2.25rem] " +
          (accent === "flag"
            ? "text-flag"
            : accent === "sky"
              ? "text-sky-200"
              : "text-white")
        }
      >
        {children}
      </p>
    </div>
  );
}

export function Leak() {
  const wrap = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: wrap,
    offset: ["start start", "end end"],
  });

  const p = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 32,
    mass: 0.35,
  });

  const markerX = useTransform(p, STOPS, XS);
  const markerY = useTransform(p, STOPS, YS);
  const rateMV = useTransform(p, STOPS, MARKS);
  const lossMV = useTransform(p, STOPS, LOSSES);

  const rateText = useTransform(rateMV, (v) => v.toFixed(2));
  const daysText = useTransform(p, (v) => Math.round(v * DAYS).toString());
  const lossText = useTransform(lossMV, (v) =>
    Math.round(v).toLocaleString("en-US"),
  );
  const bpsText = useTransform(
    lossMV,
    (v) => `${((v / (NOTIONAL * DECISION_RATE)) * 100).toFixed(2)}%`,
  );
  const hintOpacity = useTransform(p, [0, 0.12], [1, 0]);

  return (
    <section
      id="the-leak"
      ref={wrap}
      className="relative h-[340vh] bg-paper"
    >
      <div className="sticky top-0 flex min-h-[100svh] items-center overflow-hidden py-10 lg:py-24">
        <div className="shell grid w-full gap-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-center lg:gap-16">
          {/* ---- Argument ---- */}
          <div>
            <Eyebrow>The leak</Eyebrow>
            <h2 className="display-lg mt-5 max-w-[15ch] text-plum-800">
              Your FX cost has a number. Know it before quarter-end.
            </h2>
            <p className="lede mt-5 max-w-[42ch] text-[0.9375rem] lg:mt-6 lg:text-[1.0625rem]">
              Invisible until the books close, by which point it is already
              spent. Between 1% and 7% of the trade, in this volume range.
            </p>

            <motion.p
              style={{ opacity: hintOpacity }}
              className="mt-9 hidden items-center gap-3 font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-ink-faint lg:flex"
            >
              <span className="relative flex h-6 w-4 items-start justify-center rounded-full border border-line-soft ring-1 ring-line">
                <motion.span
                  className="mt-1 h-1 w-1 rounded-full bg-plum-500"
                  animate={{ y: [0, 8, 0] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                />
              </span>
              Scroll to run the 47 days
            </motion.p>
          </div>

          {/* ---- Simulation ---- */}
          <div className="overflow-hidden rounded-[1.5rem] bg-plum-900 ring-1 ring-plum-950/40 card-float">
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-3.5">
              <p className="font-mono text-[0.625rem] uppercase tracking-[0.16em] text-white/50">
                USD/GHS · a typical $500,000 invoice
              </p>
              <motion.p className="tnum font-mono text-[0.625rem] uppercase tracking-[0.16em] text-flag">
                {bpsText}
              </motion.p>
            </div>

            <div className="px-2 pt-4 sm:px-4">
              <svg
                viewBox={`0 0 ${W} ${H}`}
                className="h-[150px] w-full sm:h-[200px]"
                role="img"
                aria-label="The USD to GHS rate drifting away from the rate at which a $500,000 invoice was priced, over 47 days"
              >
                <defs>
                  <linearGradient id="leak-fill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#d1453b" stopOpacity="0.42" />
                    <stop offset="100%" stopColor="#d1453b" stopOpacity="0.06" />
                  </linearGradient>
                  <clipPath id="leak-clip">
                    {/* scaleX from the left edge — transforms are the one
                        reveal technique every engine agrees on */}
                    <motion.rect
                      x="0"
                      y="0"
                      width={W}
                      height={H}
                      style={{
                        scaleX: p,
                        transformBox: "fill-box",
                        transformOrigin: "left center",
                      }}
                    />
                  </clipPath>
                </defs>

                {/* Decision-day reference */}
                <line
                  x1="0"
                  x2={W}
                  y1={DECISION_Y}
                  y2={DECISION_Y}
                  stroke="rgba(255,255,255,0.38)"
                  strokeWidth="1.25"
                  strokeDasharray="4 5"
                />
                <text
                  x="6"
                  y={DECISION_Y - 9}
                  className="font-mono"
                  fontSize="10"
                  letterSpacing="1.6"
                  fill="rgba(255,255,255,0.45)"
                >
                  PRICED AT 12.41
                </text>

                <g clipPath="url(#leak-clip)">
                  <path d={AREA_D} fill="url(#leak-fill)" />
                  <path
                    d={LINE_D}
                    fill="none"
                    stroke="#f0837a"
                    strokeWidth="2.25"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                  />
                </g>

                {/* Live marker */}
                <motion.g style={{ x: markerX }}>
                  <line
                    x1="0"
                    x2="0"
                    y1={TOP - 10}
                    y2={BOT + 12}
                    stroke="rgba(255,255,255,0.22)"
                    strokeWidth="1"
                  />
                  <motion.g style={{ y: markerY }}>
                    <circle r="10" fill="#d1453b" opacity="0.22" />
                    <circle r="4" fill="#ffffff" />
                  </motion.g>
                </motion.g>
              </svg>
            </div>

            <div className="mt-3 grid grid-cols-3 gap-px bg-white/10">
              <Cell label="Decision day">12.41</Cell>
              <Cell label="Days elapsed">
                <motion.span>{daysText}</motion.span>
              </Cell>
              <Cell label="Today's rate" accent="flag">
                <motion.span>{rateText}</motion.span>
              </Cell>
            </div>

            <div className="flex flex-wrap items-baseline justify-between gap-2 border-t border-white/10 bg-plum-950 px-5 py-4">
              <p className="font-mono text-[0.625rem] uppercase tracking-[0.16em] text-white/50">
                Cost vs. decision
              </p>
              <p className="tnum font-mono text-xl text-flag sm:text-2xl">
                GHS <motion.span>{lossText}</motion.span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
