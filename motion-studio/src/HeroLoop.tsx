import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { display, mono, seeded } from "./theme";
import { clamp } from "./ui";

/**
 * The hero band: the NOEUD application, running.
 *
 * Light ground, hairline borders, real chrome — it should read as a product
 * screenshot that happens to be alive, not as a motion-graphics piece.
 *
 * Every cycle divides the duration exactly and anything with a visible start
 * state fades through the boundary, so the last frame matches the first.
 */

export const HERO_DURATION = 480; // 16s at 30fps
const TAU = Math.PI * 2;

/* --- palette: the site's light tokens --- */
const P = {
  paper: "#ffffff",
  soft: "#f8f8fa",
  mist: "#eef0f5",
  ink: "#16121b",
  inkSoft: "#55505e",
  inkFaint: "#857f8f",
  line: "#e7e4ec",
  plum: "#4a1039",
  plum700: "#642353",
  azure: "#4a8fd4",
  azureSoft: "#e8f1fb",
  flag: "#d1453b",
  verdant: "#17795a",
};

/* --- chart --- */
const CW = 700;
const CH = 210;
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
const LO = Math.min(...SERIES);
const HI = Math.max(...SERIES);
const cx = (i: number) => (i / (SERIES.length - 1)) * CW;
const cy = (v: number) => CH - 24 - ((v - LO) / (HI - LO)) * (CH - 54);
const LINE = SERIES.map((v, i) => `${i ? "L" : "M"} ${cx(i).toFixed(1)} ${cy(v).toFixed(1)}`).join(" ");
const AREA = `${LINE} L ${CW} ${CH - 24} L 0 ${CH - 24} Z`;

/* --- the exposure book --- */
const BOOK = [
  { ref: "CO-4471", who: "Cocoa · Tema", usd: 240000, days: 47, cyc: 1, ph: 0.0 },
  { ref: "CA-2210", who: "Cashew · Takoradi", usd: 128500, days: 21, cyc: 2, ph: 0.3 },
  { ref: "GO-3318", who: "Gold · Accra", usd: 310000, days: 34, cyc: 1, ph: 0.55 },
  { ref: "SH-1907", who: "Shea · Tamale", usd: 96000, days: 63, cyc: 3, ph: 0.12 },
  { ref: "SV-5502", who: "Services · Accra", usd: 54200, days: 12, cyc: 2, ph: 0.78 },
  { ref: "TB-8820", who: "Timber · Sekondi", usd: 172400, days: 29, cyc: 1, ph: 0.41 },
  { ref: "AL-6104", who: "Aluminium · Tema", usd: 88700, days: 55, cyc: 3, ph: 0.66 },
  { ref: "RB-2277", who: "Rubber · Axim", usd: 143900, days: 18, cyc: 2, ph: 0.09 },
];

/* --- the quote board --- */
const DEALERS = [
  { label: "Dealer 01", cyc: 2, ph: 0.0 },
  { label: "Dealer 02", cyc: 3, ph: 0.31 },
  { label: "Dealer 03", cyc: 1, ph: 0.62 },
  { label: "Dealer 04", cyc: 4, ph: 0.18 },
  { label: "Dealer 05", cyc: 2, ph: 0.74 },
];
const rateOf = (d: { cyc: number; ph: number }, t: number) =>
  12.94 + 0.13 * (0.5 + 0.5 * Math.sin(TAU * (d.cyc * t + d.ph)));

/** Fractional "how many price better than me", so rows glide rather than snap. */
const softRank = (rates: number[], i: number, eps = 0.0012) =>
  rates.reduce((a, r, j) => (j === i ? a : a + 1 / (1 + Math.exp((rates[i] - r) / eps))), 0);

const money = (n: number) => n.toLocaleString("en-US");

const NAV = ["Mark", "Profile", "Route", "Witness", "Patterns"];
const ROW_H = 64;

export const HeroLoop: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const t = frame / durationInFrames;

  const mid = 13.02 + 0.05 * Math.sin(TAU * (2 * t));
  const prevMid = 13.02 + 0.05 * Math.sin(TAU * (2 * (t - 1 / durationInFrames)));
  const up = mid >= prevMid;

  const rates = DEALERS.map((d) => rateOf(d, t));
  const best = Math.max(...rates);

  const tracerX = t * CW;
  const tracerV = SERIES[Math.min(SERIES.length - 1, Math.floor(t * SERIES.length))];
  const tracerOp = interpolate(t, [0, 0.05, 0.95, 1], [0, 1, 1, 0], clamp);

  return (
    <AbsoluteFill style={{ backgroundColor: P.mist, padding: 56 }}>
      {/* the application window */}
      <div
        style={{
          flex: 1,
          display: "flex",
          backgroundColor: P.paper,
          borderRadius: 22,
          border: `1px solid ${P.line}`,
          overflow: "hidden",
          boxShadow: "0 40px 90px -40px rgba(23,6,26,0.28)",
        }}
      >
        {/* ---- rail ---- */}
        <div
          style={{
            width: 290,
            borderRight: `1px solid ${P.line}`,
            backgroundColor: P.soft,
            padding: "30px 22px",
            display: "flex",
            flexDirection: "column",
            gap: 30,
          }}
        >
          <div style={{ display: "flex", alignItems: "baseline", paddingLeft: 10 }}>
            <span
              style={{
                fontFamily: display,
                fontWeight: 700,
                fontSize: 27,
                letterSpacing: -1.2,
                color: P.plum,
              }}
            >
              noeud
            </span>
            <span style={{ fontFamily: display, fontWeight: 700, fontSize: 27, color: P.azure }}>
              ;
            </span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {NAV.map((item, i) => {
              const active = i === 0;
              return (
                <div
                  key={item}
                  style={{
                    padding: "13px 14px",
                    borderRadius: 10,
                    backgroundColor: active ? P.paper : "transparent",
                    border: `1px solid ${active ? P.line : "transparent"}`,
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                  }}
                >
                  <span
                    style={{
                      width: 7,
                      height: 7,
                      borderRadius: 999,
                      backgroundColor: active ? P.azure : P.line,
                    }}
                  />
                  <span
                    style={{
                      fontFamily: display,
                      fontWeight: active ? 700 : 500,
                      fontSize: 19,
                      color: active ? P.ink : P.inkFaint,
                    }}
                  >
                    {item}
                  </span>
                </div>
              );
            })}
          </div>

          <div
            style={{
              marginTop: "auto",
              padding: 18,
              borderRadius: 12,
              border: `1px solid ${P.line}`,
              backgroundColor: P.paper,
            }}
          >
            <p style={{ fontFamily: mono, fontSize: 13, letterSpacing: 2, textTransform: "uppercase", color: P.inkFaint, margin: 0 }}>
              Open exposure
            </p>
            <p style={{ fontFamily: mono, fontSize: 26, color: P.ink, margin: "10px 0 0" }}>
              GHS 96M
            </p>
          </div>
        </div>

        {/* ---- main ---- */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          {/* top bar */}
          <div
            style={{
              height: 74,
              borderBottom: `1px solid ${P.line}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0 32px",
            }}
          >
            <span style={{ fontFamily: display, fontWeight: 700, fontSize: 22, color: P.ink }}>
              Exposure book
            </span>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <span
                style={{
                  fontFamily: mono,
                  fontSize: 14,
                  letterSpacing: 2,
                  textTransform: "uppercase",
                  color: P.verdant,
                  backgroundColor: "#e8f5f0",
                  borderRadius: 999,
                  padding: "8px 16px",
                }}
              >
                ● Live
              </span>
              <span
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 999,
                  backgroundColor: P.plum,
                  color: "#fff",
                  fontFamily: display,
                  fontWeight: 700,
                  fontSize: 15,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                DA
              </span>
            </div>
          </div>

          <div style={{ flex: 1, display: "flex", padding: 32, gap: 26 }}>
            {/* table */}
            <div style={{ flex: 1.35, display: "flex", flexDirection: "column" }}>
              <div
                style={{
                  display: "flex",
                  padding: "0 18px 14px",
                  borderBottom: `1px solid ${P.line}`,
                }}
              >
                {["Invoice", "Counterparty", "Amount", "Settles", "Marked in cedis"].map(
                  (h, i) => (
                    <span
                      key={h}
                      style={{
                        flex: i === 1 ? 1.3 : i === 4 ? 1.2 : 1,
                        fontFamily: mono,
                        fontSize: 13,
                        letterSpacing: 2,
                        textTransform: "uppercase",
                        color: P.inkFaint,
                        textAlign: i >= 2 ? "right" : "left",
                      }}
                    >
                      {h}
                    </span>
                  ),
                )}
              </div>

              <div style={{ position: "relative", marginTop: 6 }}>
                {BOOK.map((row, i) => {
                  // each invoice re-marks on its own cycle; the flash fades out
                  const pulse = 0.5 + 0.5 * Math.sin(TAU * (row.cyc * t + row.ph));
                  const marked = row.usd * (mid + 0.06 * Math.sin(TAU * (row.cyc * t + row.ph)));
                  return (
                    <div
                      key={row.ref}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        height: ROW_H,
                        padding: "0 18px",
                        borderRadius: 10,
                        backgroundColor: `rgba(74,143,212,${0.07 * pulse})`,
                        borderBottom: i === BOOK.length - 1 ? "none" : `1px solid ${P.line}`,
                      }}
                    >
                      <span style={{ flex: 1, fontFamily: mono, fontSize: 17, color: P.inkSoft }}>
                        {row.ref}
                      </span>
                      <span style={{ flex: 1.3, fontFamily: display, fontWeight: 500, fontSize: 17, color: P.ink }}>
                        {row.who}
                      </span>
                      <span style={{ flex: 1, fontFamily: mono, fontSize: 17, color: P.inkSoft, textAlign: "right" }}>
                        ${money(row.usd)}
                      </span>
                      <span style={{ flex: 1, fontFamily: mono, fontSize: 17, color: P.inkFaint, textAlign: "right" }}>
                        {row.days}d
                      </span>
                      <span
                        style={{
                          flex: 1.2,
                          fontFamily: mono,
                          fontSize: 18,
                          color: P.ink,
                          textAlign: "right",
                        }}
                      >
                        {money(Math.round(marked))}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* chart */}
              <div
                style={{
                  marginTop: "auto",
                  paddingTop: 22,
                  borderTop: `1px solid ${P.line}`,
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                  <span style={{ fontFamily: mono, fontSize: 13, letterSpacing: 2, textTransform: "uppercase", color: P.inkFaint }}>
                    Cedi commercial midrate · 90 days
                  </span>
                  <span style={{ fontFamily: mono, fontSize: 15, color: up ? P.flag : P.verdant }}>
                    {up ? "▲" : "▼"} {mid.toFixed(4)}
                  </span>
                </div>
                <svg viewBox={`0 0 ${CW} ${CH}`} width="100%" height={190} preserveAspectRatio="none" style={{ marginTop: 12 }}>
                  <defs>
                    <linearGradient id="hero-a" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={P.plum700} stopOpacity="0.14" />
                      <stop offset="100%" stopColor={P.plum700} stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path d={AREA} fill="url(#hero-a)" />
                  <path d={LINE} fill="none" stroke={P.plum700} strokeWidth="2.5" strokeLinejoin="round" />
                  <g opacity={tracerOp}>
                    <line x1={tracerX} x2={tracerX} y1="6" y2={CH - 18} stroke={P.line} strokeWidth="2" />
                    <circle cx={tracerX} cy={cy(tracerV)} r="6" fill={P.plum700} stroke="#fff" strokeWidth="2.5" />
                  </g>
                </svg>
              </div>
            </div>

            {/* route panel */}
            <div
              style={{
                flex: 1,
                border: `1px solid ${P.line}`,
                borderRadius: 16,
                padding: 24,
                backgroundColor: P.soft,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontFamily: display, fontWeight: 700, fontSize: 19, color: P.ink }}>
                  Route · $500,000
                </span>
                <span
                  style={{
                    fontFamily: mono,
                    fontSize: 12,
                    letterSpacing: 2,
                    textTransform: "uppercase",
                    color: P.azure,
                    backgroundColor: P.azureSoft,
                    borderRadius: 999,
                    padding: "7px 14px",
                  }}
                >
                  Bidding
                </span>
              </div>

              <div style={{ position: "relative", height: ROW_H * DEALERS.length, marginTop: 18 }}>
                {DEALERS.map((d, i) => {
                  const rate = rates[i];
                  const y = softRank(rates, i) * ROW_H;
                  const win = 1 / (1 + Math.exp((best - rate) / 0.0012));
                  return (
                    <div
                      key={d.label}
                      style={{
                        position: "absolute",
                        left: 0,
                        right: 0,
                        top: 0,
                        transform: `translateY(${y}px)`,
                        height: ROW_H - 8,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "0 16px",
                        borderRadius: 10,
                        backgroundColor: P.paper,
                        border: `1px solid ${win > 0.5 ? P.azure : P.line}`,
                        boxShadow: `0 ${2 + win * 8}px ${8 + win * 18}px -8px rgba(23,6,26,${0.05 + win * 0.12})`,
                      }}
                    >
                      <span style={{ display: "flex", alignItems: "center", gap: 11 }}>
                        <span
                          style={{
                            width: 7,
                            height: 7,
                            borderRadius: 999,
                            backgroundColor: win > 0.5 ? P.azure : P.line,
                          }}
                        />
                        <span style={{ fontFamily: mono, fontSize: 17, color: P.inkSoft }}>
                          {d.label}
                        </span>
                      </span>
                      <span style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <span
                          style={{
                            fontFamily: mono,
                            fontSize: 11,
                            letterSpacing: 2,
                            textTransform: "uppercase",
                            color: P.azure,
                            opacity: win,
                          }}
                        >
                          Best
                        </span>
                        <span style={{ fontFamily: mono, fontSize: 18, color: P.ink }}>
                          {rate.toFixed(4)}
                        </span>
                      </span>
                    </div>
                  );
                })}
              </div>

              <div
                style={{
                  marginTop: "auto",
                  paddingTop: 18,
                  borderTop: `1px solid ${P.line}`,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                }}
              >
                <span style={{ fontFamily: mono, fontSize: 13, letterSpacing: 2, textTransform: "uppercase", color: P.inkFaint }}>
                  Fee, disclosed
                </span>
                <span style={{ fontFamily: mono, fontSize: 19, color: P.ink }}>7.5 bps</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
