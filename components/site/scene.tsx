"use client";

import {
  AnimatePresence,
  animate,
  motion,
  useInView,
  useReducedMotion,
} from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";
import { cn, seeded } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/* Market data — seeded, so server and client render the same curve     */
/* ------------------------------------------------------------------ */

const W = 560;
const H = 210;
const PAD_L = 6;
const PAD_R = 6;
const PAD_T = 16;
const PAD_B = 26;
const POINTS = 90;

const SERIES = (() => {
  const rnd = seeded(20260812);
  const out: number[] = [];
  let v = 12.28;
  for (let i = 0; i < POINTS; i++) {
    v += 0.0092 + (rnd() - 0.46) * 0.028;
    out.push(v);
  }
  return out;
})();

const LO = Math.min(...SERIES);
const HI = Math.max(...SERIES);
const xOf = (i: number) =>
  PAD_L + (i / (POINTS - 1)) * (W - PAD_L - PAD_R);
const yOf = (v: number) =>
  H - PAD_B - ((v - LO) / (HI - LO || 1)) * (H - PAD_T - PAD_B);

const LINE = (() => {
  const pts = SERIES.map((v, i) => [xOf(i), yOf(v)] as const);
  let d = `M ${pts[0][0].toFixed(1)} ${pts[0][1].toFixed(1)}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i === 0 ? 0 : i - 1];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[Math.min(pts.length - 1, i + 2)];
    d += ` C ${(p1[0] + (p2[0] - p0[0]) / 6).toFixed(1)} ${(p1[1] + (p2[1] - p0[1]) / 6).toFixed(1)}, ${(p2[0] - (p3[0] - p1[0]) / 6).toFixed(1)} ${(p2[1] - (p3[1] - p1[1]) / 6).toFixed(1)}, ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`;
  }
  return d;
})();

const AREA = `${LINE} L ${xOf(POINTS - 1)} ${H - PAD_B} L ${PAD_L} ${H - PAD_B} Z`;

/* ------------------------------------------------------------------ */
/* Live rate                                                           */
/* ------------------------------------------------------------------ */

const BASE = 13.0412;

function useLiveRate(active: boolean) {
  const [state, setState] = useState({ value: BASE, up: true });
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!active || reduced) return;
    const rnd = seeded(77021);
    let current = BASE;
    const id = setInterval(() => {
      const next = Math.min(
        13.09,
        Math.max(12.99, current + (rnd() - 0.48) * 0.0075),
      );
      setState({ value: next, up: next >= current });
      current = next;
    }, 1600);
    return () => clearInterval(id);
  }, [active, reduced]);

  return state;
}

/* ------------------------------------------------------------------ */
/* Route — a live quote board                                          */
/* ------------------------------------------------------------------ */

const DEALERS = ["Dealer 01", "Dealer 02", "Dealer 03", "Dealer 04", "Dealer 05"];

type Quote = { id: string; label: string; rate: number };

function quotesFor(cycle: number): Quote[] {
  const rnd = seeded(4200 + cycle * 97);
  return DEALERS.map((label, i) => ({
    id: `d${i}`,
    label,
    rate: 12.86 + rnd() * 0.19,
  }));
}

/**
 * Dealers hold a stable order and only the winning row changes — the way an
 * actual RFQ board reads. Nothing mounts, unmounts or reorders, so the list
 * can never show a scrambled half-sorted state mid-refresh.
 */
function RouteBoard({ cycle }: { cycle: number }) {
  const quotes = useMemo(() => quotesFor(cycle), [cycle]);
  const bestId = useMemo(
    () => quotes.reduce((a, b) => (b.rate > a.rate ? b : a)).id,
    [quotes],
  );

  return (
    <ul className="mt-3 space-y-1">
      {quotes.map((q) => {
        const best = q.id === bestId;
        return (
          <li
            key={q.id}
            className={cn(
              "flex items-center justify-between rounded-lg border px-2.5 py-2 text-[0.75rem] transition-colors duration-500",
              best
                ? "border-azure-400/60 bg-azure-400/10"
                : "border-line bg-paper",
            )}
          >
            <span className="flex items-center gap-2">
              <span
                className={cn(
                  "h-1.5 w-1.5 rounded-full transition-colors duration-500",
                  best ? "bg-azure-500" : "bg-ink-faint/40",
                )}
              />
              <span className="font-mono text-ink-soft">{q.label}</span>
            </span>
            <span className="flex items-center gap-2">
              <AnimatePresence>
                {best && (
                  <motion.span
                    initial={{ opacity: 0, x: 6 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 6 }}
                    transition={{ duration: 0.3 }}
                    className="font-mono text-[0.5625rem] uppercase tracking-[0.12em] text-azure-600"
                  >
                    Best
                  </motion.span>
                )}
              </AnimatePresence>
              <motion.span
                key={`${cycle}-${q.id}`}
                initial={{ opacity: 0.35 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                className={cn(
                  "tnum font-mono",
                  best ? "text-ink" : "text-ink-faint",
                )}
              >
                {q.rate.toFixed(4)}
              </motion.span>
            </span>
          </li>
        );
      })}
    </ul>
  );
}

/* ------------------------------------------------------------------ */
/* Floating wrapper                                                    */
/* ------------------------------------------------------------------ */

function Float({
  children,
  className,
  delay = 0,
  drift = 10,
  enabled,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  drift?: number;
  enabled: boolean;
}) {
  return (
    <motion.div
      className={className}
      animate={enabled ? { y: [0, -drift, 0] } : { y: 0 }}
      transition={{
        duration: 7 + delay,
        repeat: enabled ? Infinity : 0,
        ease: "easeInOut",
        delay,
      }}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */

export function Scene({ className }: { className?: string }) {
  const root = useRef<HTMLDivElement>(null);
  const inView = useInView(root, { amount: 0.25 });
  const reduced = useReducedMotion();
  const live = useLiveRate(inView);

  const [cycle, setCycle] = useState(0);
  useEffect(() => {
    if (!inView || reduced) return;
    const id = setInterval(() => setCycle((c) => c + 1), 4200);
    return () => clearInterval(id);
  }, [inView, reduced]);

  /* Tracer riding the curve. */
  const pathRef = useRef<SVGPathElement>(null);
  const dotRef = useRef<SVGGElement>(null);

  useEffect(() => {
    if (!inView || reduced) return;
    const path = pathRef.current;
    const dot = dotRef.current;
    if (!path || !dot) return;
    let length = 0;
    try {
      length = path.getTotalLength();
    } catch {
      return;
    }
    if (!length) return;

    const controls = animate(0.04, 1, {
      duration: 11,
      ease: "linear",
      repeat: Infinity,
      onUpdate: (t) => {
        const p = path.getPointAtLength(length * t);
        dot.setAttribute("transform", `translate(${p.x} ${p.y})`);
      },
    });
    return () => controls.stop();
  }, [inView, reduced]);

  const alive = inView && !reduced;

  return (
    <div
      ref={root}
      className={cn(
        "dot-canvas relative overflow-hidden rounded-[1.75rem] border border-line bg-paper-soft",
        className,
      )}
    >
      {/* soft light so the field isn't flat */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 55% at 50% 0%, rgba(255,255,255,0.95), transparent 70%), radial-gradient(45% 40% at 92% 100%, rgba(155,215,240,0.22), transparent 70%)",
        }}
      />

      <div className="relative grid gap-4 p-4 sm:p-6 lg:grid-cols-[1.55fr_1fr] lg:gap-5 lg:p-8">
        {/* ---------- Mark: the chart ---------- */}
        <Float enabled={alive} delay={0} drift={6}>
          <div className="rounded-2xl border border-line bg-paper p-5 card-raise">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-mono text-[0.5625rem] uppercase tracking-[0.14em] text-ink-faint">
                  Mark · cedi commercial midrate
                </p>
                <p className="mt-1.5 display-sm text-plum-800">
                  Every open invoice, valued now
                </p>
              </div>
              <div className="shrink-0 text-right">
                <p className="tnum font-mono text-[1.375rem] leading-none text-ink">
                  {live.value.toFixed(4)}
                </p>
                <p
                  className={cn(
                    "mt-1.5 font-mono text-[0.625rem]",
                    live.up ? "text-flag" : "text-verdant",
                  )}
                >
                  {live.up ? "▲" : "▼"} USD/GHS
                </p>
              </div>
            </div>

            <svg
              viewBox={`0 0 ${W} ${H}`}
              className="mt-4 h-[180px] w-full sm:h-[210px]"
              role="img"
              aria-label="USD to GHS commercial midrate over 90 days, trending upward"
            >
              <defs>
                <linearGradient id="scene-area" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#9c4a84" stopOpacity="0.16" />
                  <stop offset="100%" stopColor="#9c4a84" stopOpacity="0" />
                </linearGradient>
              </defs>

              {[0, 0.5, 1].map((t) => {
                const v = LO + (HI - LO) * (1 - t);
                const y = PAD_T + t * (H - PAD_T - PAD_B);
                return (
                  <g key={t}>
                    <line
                      x1={PAD_L}
                      x2={W - PAD_R}
                      y1={y}
                      y2={y}
                      stroke="var(--color-line)"
                      strokeWidth="1"
                    />
                    <text
                      x={W - PAD_R}
                      y={y - 5}
                      textAnchor="end"
                      fontSize="9"
                      className="font-mono"
                      fill="var(--color-ink-faint)"
                    >
                      {v.toFixed(2)}
                    </text>
                  </g>
                );
              })}

              <motion.path
                d={AREA}
                fill="url(#scene-area)"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 1.1, delay: 0.85 }}
              />
              <motion.path
                ref={pathRef}
                d={LINE}
                fill="none"
                stroke="var(--color-plum-700)"
                strokeWidth="2"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
              />
              <g ref={dotRef}>
                <circle r="8" fill="var(--color-plum-500)" opacity="0.16" />
                <circle
                  r="3.2"
                  fill="var(--color-plum-700)"
                  stroke="#fff"
                  strokeWidth="1.5"
                />
              </g>

              {["90d ago", "60d", "30d", "today"].map((label, i) => (
                <text
                  key={label}
                  x={PAD_L + (i / 3) * (W - PAD_L - PAD_R)}
                  y={H - 6}
                  textAnchor={i === 0 ? "start" : i === 3 ? "end" : "middle"}
                  fontSize="9"
                  className="font-mono"
                  fill="var(--color-ink-faint)"
                >
                  {label}
                </text>
              ))}
            </svg>

            <div className="mt-4 grid grid-cols-3 border-t border-line pt-4">
              {[
                ["Invoices marked", "1,204"],
                ["Open exposure", "GHS 96M"],
                ["Avg. window", "38 days"],
              ].map(([k, v], i) => (
                <div key={k} className={cn(i > 0 && "border-l border-line pl-4")}>
                  <p className="font-mono text-[0.5625rem] uppercase tracking-[0.12em] text-ink-faint">
                    {k}
                  </p>
                  <p className="tnum mt-1 font-mono text-[0.9375rem] text-ink">
                    {v}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Float>

        {/* ---------- Right column ---------- */}
        <div className="flex flex-col gap-4 lg:gap-5">
          <Float enabled={alive} delay={1.1} drift={9}>
            <div className="rounded-2xl border border-line bg-paper p-5 card-raise">
              <div className="flex items-center justify-between">
                <p className="font-mono text-[0.5625rem] uppercase tracking-[0.14em] text-ink-faint">
                  Route · $500,000
                </p>
                <span className="flex items-center gap-1.5 rounded-full bg-azure-400/12 px-2 py-1 font-mono text-[0.5625rem] uppercase tracking-[0.12em] text-azure-600">
                  <span className="h-1.5 w-1.5 rounded-full bg-azure-500 [animation:noeud-pulse-ring_2.2s_ease-out_infinite]" />
                  Bidding
                </span>
              </div>
              <RouteBoard cycle={cycle} />
              <div className="mt-3 flex items-baseline justify-between border-t border-line pt-3">
                <span className="font-mono text-[0.5625rem] uppercase tracking-[0.12em] text-ink-faint">
                  Fee, disclosed
                </span>
                <span className="tnum font-mono text-[0.75rem] text-ink">
                  7.5 bps
                </span>
              </div>
            </div>
          </Float>

          <Float enabled={alive} delay={2.2} drift={7}>
            <div className="rounded-2xl border border-line bg-plum-900 p-5 text-white">
              <p className="font-mono text-[0.5625rem] uppercase tracking-[0.14em] text-white/45">
                Profile · risk at 99%
              </p>
              <p className="tnum mt-2 font-display text-[1.75rem] font-black leading-none tracking-[-0.03em]">
                GHS 2.4M
              </p>
              <p className="mt-2 text-[0.75rem] leading-relaxed text-white/50">
                Cash-flow-at-risk over the next 90 days, against your stated
                appetite.
              </p>
              <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/12">
                <motion.div
                  className="h-full rounded-full bg-sky-300"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 0.62 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
                  style={{ transformOrigin: "left" }}
                />
              </div>
              <p className="mt-2 font-mono text-[0.5625rem] uppercase tracking-[0.12em] text-white/35">
                62% of appetite used
              </p>
            </div>
          </Float>
        </div>
      </div>
    </div>
  );
}
