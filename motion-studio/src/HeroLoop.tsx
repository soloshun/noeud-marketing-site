import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { C, MARKS, display, mono, seeded } from "./theme";
import { clamp } from "./ui";

/**
 * The hero band: a calm, continuously running product shot.
 *
 * Every animation inside completes a whole number of cycles across the
 * composition, and anything with a visible start/end state fades through the
 * boundary — so frame 0 and the final frame are identical and the video loops
 * without a seam. No entrances, no springs: enterprise software at rest, doing
 * its job.
 */

export const HERO_DURATION = 420; // 14s at 30fps

/* ---------------- geometry ---------------- */

const W = 2560;
const H = 1120;

const CHART_W = 1180;
const CHART_H = 420;
const LO = Math.min(...MARKS) - 0.06;
const HI = Math.max(...MARKS) + 0.06;

const SERIES = (() => {
  const rnd = seeded(20260812);
  const out: number[] = [];
  let v = 12.28;
  for (let i = 0; i < 90; i++) {
    v += 0.0092 + (rnd() - 0.46) * 0.028;
    out.push(v);
  }
  return out;
})();

const S_LO = Math.min(...SERIES);
const S_HI = Math.max(...SERIES);
const cx = (i: number) => (i / (SERIES.length - 1)) * CHART_W;
const cy = (v: number) =>
  CHART_H - 34 - ((v - S_LO) / (S_HI - S_LO)) * (CHART_H - 70);

const LINE = (() => {
  const pts = SERIES.map((v, i) => [cx(i), cy(v)] as const);
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

const AREA = `${LINE} L ${CHART_W} ${CHART_H - 34} L 0 ${CHART_H - 34} Z`;

/* ---------------- data that cycles ---------------- */

const RATE_STEPS = 14; // whole number of ticks across the loop
const rateAt = (step: number) => {
  const rnd = seeded(5150 + step * 31);
  return 13.0 + rnd() * 0.06;
};

const QUOTE_CYCLES = 3;
const DEALERS = ["Dealer 01", "Dealer 02", "Dealer 03", "Dealer 04", "Dealer 05"];
const quotesAt = (cycle: number) => {
  const rnd = seeded(4200 + (cycle % QUOTE_CYCLES) * 97);
  return DEALERS.map((label) => ({ label, rate: 12.86 + rnd() * 0.19 }));
};

/* ---------------- pieces ---------------- */

const Card: React.FC<{
  children: React.ReactNode;
  style?: React.CSSProperties;
}> = ({ children, style }) => (
  <div
    style={{
      backgroundColor: "rgba(255,255,255,0.045)",
      border: "1px solid rgba(255,255,255,0.10)",
      borderRadius: 26,
      padding: 40,
      ...style,
    }}
  >
    {children}
  </div>
);

const Label: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p
    style={{
      fontFamily: mono,
      fontSize: 19,
      letterSpacing: 4,
      textTransform: "uppercase",
      color: "rgba(255,255,255,0.40)",
      margin: 0,
    }}
  >
    {children}
  </p>
);

/* ---------------- composition ---------------- */

export const HeroLoop: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const t = frame / durationInFrames; // 0 → 1

  // Rate: steps through whole cycles and lands back on its opening value.
  const step = Math.floor(t * RATE_STEPS) % RATE_STEPS;
  const rate = rateAt(step);
  const prev = rateAt((step - 1 + RATE_STEPS) % RATE_STEPS);
  const up = rate >= prev;

  // Quote board: exactly QUOTE_CYCLES passes across the loop.
  const cycle = Math.floor(t * RATE_STEPS * (QUOTE_CYCLES / RATE_STEPS));
  const quotes = quotesAt(Math.floor(t * QUOTE_CYCLES));
  const bestRate = Math.max(...quotes.map((q) => q.rate));

  // Tracer: one pass, fading through the loop boundary so there is no jump.
  const tracerX = t * CHART_W;
  const tracerV = SERIES[Math.min(SERIES.length - 1, Math.floor(t * SERIES.length))];
  const tracerY = cy(tracerV);
  const tracerOpacity = interpolate(
    t,
    [0, 0.06, 0.94, 1],
    [0, 1, 1, 0],
    clamp,
  );

  return (
    <AbsoluteFill style={{ backgroundColor: C.plum950 }}>
      <AbsoluteFill
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.035) 1px, transparent 1px)",
          backgroundSize: "90px 90px",
        }}
      />
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(1400px 800px at 20% -20%, rgba(155,215,240,0.13), transparent 62%), radial-gradient(1100px 700px at 100% 120%, rgba(74,16,57,0.85), transparent 60%)",
        }}
      />

      <AbsoluteFill
        style={{
          padding: "78px 96px",
          display: "flex",
          flexDirection: "column",
          gap: 34,
        }}
      >
        {/* chrome */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <div
              style={{
                width: 11,
                height: 11,
                borderRadius: 999,
                backgroundColor: C.sky300,
              }}
            />
            <Label>noeud · live</Label>
          </div>
          <Label>Accra · Tema · USD / GHS</Label>
        </div>

        <div style={{ display: "flex", gap: 26, flex: 1 }}>
          {/* ---- chart ---- */}
          <Card style={{ flex: 1.55, display: "flex", flexDirection: "column" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
              }}
            >
              <div>
                <Label>Mark · cedi commercial midrate · 90 days</Label>
                <p
                  style={{
                    fontFamily: display,
                    fontWeight: 900,
                    fontSize: 46,
                    letterSpacing: -1.6,
                    color: C.white,
                    margin: "16px 0 0",
                  }}
                >
                  Every open invoice, valued now
                </p>
              </div>
              <div style={{ textAlign: "right" }}>
                <p
                  style={{
                    fontFamily: mono,
                    fontSize: 54,
                    color: C.white,
                    margin: 0,
                    lineHeight: 1,
                  }}
                >
                  {rate.toFixed(4)}
                </p>
                <p
                  style={{
                    fontFamily: mono,
                    fontSize: 20,
                    letterSpacing: 3,
                    color: up ? C.flagSoft : C.sky300,
                    margin: "12px 0 0",
                  }}
                >
                  {up ? "▲" : "▼"} USD/GHS
                </p>
              </div>
            </div>

            <svg
              viewBox={`0 0 ${CHART_W} ${CHART_H}`}
              width="100%"
              style={{ marginTop: 30, flex: 1 }}
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="hero-area" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={C.sky300} stopOpacity="0.20" />
                  <stop offset="100%" stopColor={C.sky300} stopOpacity="0" />
                </linearGradient>
              </defs>

              {[0, 0.5, 1].map((g) => (
                <line
                  key={g}
                  x1="0"
                  x2={CHART_W}
                  y1={34 + g * (CHART_H - 68)}
                  y2={34 + g * (CHART_H - 68)}
                  stroke="rgba(255,255,255,0.07)"
                  strokeWidth="1.5"
                />
              ))}

              <path d={AREA} fill="url(#hero-area)" />
              <path
                d={LINE}
                fill="none"
                stroke={C.sky200}
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              <g opacity={tracerOpacity}>
                <line
                  x1={tracerX}
                  x2={tracerX}
                  y1="10"
                  y2={CHART_H - 20}
                  stroke="rgba(255,255,255,0.18)"
                  strokeWidth="2"
                />
                <circle cx={tracerX} cy={tracerY} r="16" fill={C.sky300} opacity="0.2" />
                <circle cx={tracerX} cy={tracerY} r="6.5" fill={C.white} />
              </g>
            </svg>

            <div
              style={{
                display: "flex",
                borderTop: "1px solid rgba(255,255,255,0.10)",
                paddingTop: 26,
                marginTop: 20,
              }}
            >
              {[
                ["Invoices marked", "1,204"],
                ["Open exposure", "GHS 96M"],
                ["Avg. window", "38 days"],
              ].map(([k, v], i) => (
                <div
                  key={k}
                  style={{
                    flex: 1,
                    paddingLeft: i ? 40 : 0,
                    borderLeft: i
                      ? "1px solid rgba(255,255,255,0.10)"
                      : undefined,
                  }}
                >
                  <p
                    style={{
                      fontFamily: mono,
                      fontSize: 16,
                      letterSpacing: 3,
                      textTransform: "uppercase",
                      color: "rgba(255,255,255,0.38)",
                      margin: 0,
                    }}
                  >
                    {k}
                  </p>
                  <p
                    style={{
                      fontFamily: mono,
                      fontSize: 30,
                      color: C.white,
                      margin: "12px 0 0",
                    }}
                  >
                    {v}
                  </p>
                </div>
              ))}
            </div>
          </Card>

          {/* ---- right column ---- */}
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              gap: 26,
            }}
          >
            <Card style={{ flex: 1 }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Label>Route · $500,000</Label>
                <span
                  style={{
                    fontFamily: mono,
                    fontSize: 15,
                    letterSpacing: 3,
                    textTransform: "uppercase",
                    color: C.sky200,
                    border: `1px solid ${C.sky300}44`,
                    backgroundColor: `${C.sky300}14`,
                    borderRadius: 999,
                    padding: "8px 18px",
                  }}
                >
                  Bidding
                </span>
              </div>

              <div style={{ marginTop: 26 }}>
                {quotes.map((q) => {
                  const best = q.rate === bestRate;
                  return (
                    <div
                      key={q.label}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "18px 22px",
                        marginBottom: 10,
                        borderRadius: 14,
                        border: `1px solid ${best ? `${C.sky300}55` : "rgba(255,255,255,0.08)"}`,
                        backgroundColor: best
                          ? `${C.sky300}12`
                          : "rgba(255,255,255,0.025)",
                      }}
                    >
                      <span
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 14,
                        }}
                      >
                        <span
                          style={{
                            width: 8,
                            height: 8,
                            borderRadius: 999,
                            backgroundColor: best
                              ? C.sky300
                              : "rgba(255,255,255,0.22)",
                          }}
                        />
                        <span
                          style={{
                            fontFamily: mono,
                            fontSize: 22,
                            color: "rgba(255,255,255,0.66)",
                          }}
                        >
                          {q.label}
                        </span>
                      </span>
                      <span
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 16,
                        }}
                      >
                        {best && (
                          <span
                            style={{
                              fontFamily: mono,
                              fontSize: 14,
                              letterSpacing: 2.5,
                              textTransform: "uppercase",
                              color: C.sky200,
                            }}
                          >
                            Best
                          </span>
                        )}
                        <span
                          style={{
                            fontFamily: mono,
                            fontSize: 23,
                            color: best ? C.white : "rgba(255,255,255,0.45)",
                          }}
                        >
                          {q.rate.toFixed(4)}
                        </span>
                      </span>
                    </div>
                  );
                })}
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                  borderTop: "1px solid rgba(255,255,255,0.10)",
                  paddingTop: 22,
                  marginTop: 16,
                }}
              >
                <Label>Fee, disclosed</Label>
                <span
                  style={{ fontFamily: mono, fontSize: 24, color: C.white }}
                >
                  7.5 bps
                </span>
              </div>
            </Card>

            <Card
              style={{
                backgroundColor: "rgba(155,215,240,0.07)",
                borderColor: `${C.sky300}33`,
              }}
            >
              <Label>Profile · risk at 99%</Label>
              <p
                style={{
                  fontFamily: display,
                  fontWeight: 900,
                  fontSize: 58,
                  letterSpacing: -2,
                  color: C.white,
                  margin: "18px 0 0",
                  lineHeight: 1,
                }}
              >
                GHS 2.4M
              </p>
              <div
                style={{
                  marginTop: 26,
                  height: 8,
                  borderRadius: 999,
                  backgroundColor: "rgba(255,255,255,0.10)",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    width: "62%",
                    height: "100%",
                    borderRadius: 999,
                    backgroundColor: C.sky300,
                  }}
                />
              </div>
              <p
                style={{
                  fontFamily: mono,
                  fontSize: 16,
                  letterSpacing: 3,
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.35)",
                  margin: "16px 0 0",
                }}
              >
                62% of appetite used · cycle {cycle + 1}
              </p>
            </Card>
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
