import React from "react";
import {
  AbsoluteFill,
  Sequence,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import {
  C,
  DAYS,
  DECISION_RATE,
  MARKS,
  NOTIONAL,
  display,
  ghs,
  mono,
} from "./theme";
import { ActLabel, Caption, EASE, Ground, clamp } from "./ui";

/* ------------------------------------------------------------------ */
/* Act I — the invoice                                                 */
/* ------------------------------------------------------------------ */

const ACT1 = 0;
const ACT1_LEN = 125;

const Invoice: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const rise = spring({ frame, fps, config: { damping: 200, mass: 0.8 } });
  const y = interpolate(rise, [0, 1], [60, 0]);
  const o = interpolate(frame, [0, 18], [0, 1], { ...clamp, easing: EASE });
  const stampO = interpolate(frame, [46, 64], [0, 1], {
    ...clamp,
    easing: EASE,
  });
  const stampScale = interpolate(frame, [46, 66], [1.14, 1], {
    ...clamp,
    easing: EASE,
  });
  const exit = interpolate(frame, [ACT1_LEN - 20, ACT1_LEN], [1, 0], clamp);

  const row = (k: string, v: string, at: number) => {
    const ro = interpolate(frame, [at, at + 16], [0, 1], {
      ...clamp,
      easing: EASE,
    });
    return (
      <div
        key={k}
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          padding: "20px 0",
          borderTop: "1px solid rgba(255,255,255,0.10)",
          opacity: ro,
        }}
      >
        <span
          style={{
            fontFamily: mono,
            fontSize: 19,
            letterSpacing: 3,
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.42)",
          }}
        >
          {k}
        </span>
        <span style={{ fontFamily: mono, fontSize: 26, color: C.white }}>
          {v}
        </span>
      </div>
    );
  };

  return (
    <AbsoluteFill
      style={{
        alignItems: "center",
        justifyContent: "center",
        opacity: o * exit,
      }}
    >
      <div
        style={{
          width: 880,
          transform: `translateY(${y}px)`,
          backgroundColor: "rgba(255,255,255,0.05)",
          border: "1px solid rgba(255,255,255,0.12)",
          borderRadius: 28,
          padding: "44px 52px 40px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 30,
          }}
        >
          <span
            style={{
              fontFamily: mono,
              fontSize: 19,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.42)",
            }}
          >
            Export invoice · CO-4471
          </span>
          <span
            style={{
              fontFamily: mono,
              fontSize: 17,
              letterSpacing: 3,
              color: C.sky300,
              border: `1px solid ${C.sky300}55`,
              backgroundColor: `${C.sky300}18`,
              borderRadius: 999,
              padding: "7px 16px",
            }}
          >
            OPEN
          </span>
        </div>

        <p
          style={{
            fontFamily: display,
            fontWeight: 700,
            fontSize: 104,
            letterSpacing: -4,
            lineHeight: 1,
            color: C.white,
            margin: "0 0 34px",
          }}
        >
          USD 500,000
        </p>

        {row("Goods", "Cocoa beans · Tema", 26)}
        {row("Settles in", "47 days", 36)}
        {row("Rate you priced at", "12.41 GHS / USD", 46)}

        <div
          style={{
            marginTop: 34,
            opacity: stampO,
            transform: `scale(${stampScale})`,
            transformOrigin: "left center",
            display: "inline-flex",
            alignItems: "center",
            gap: 14,
            border: `1px solid ${C.sky300}66`,
            borderRadius: 14,
            padding: "14px 22px",
          }}
        >
          <span
            style={{
              fontFamily: mono,
              fontSize: 20,
              letterSpacing: 3,
              textTransform: "uppercase",
              color: C.sky200,
            }}
          >
            Marked by noeud · day 0
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};

/* ------------------------------------------------------------------ */
/* Act II — the drift                                                  */
/* ------------------------------------------------------------------ */

const ACT2 = 115;
const ACT2_LEN = 195;

const W = 1180;
const H = 420;
const LO = 12.34;
const HI = 13.14;
const yOf = (r: number) => H - 30 - ((r - LO) / (HI - LO)) * (H - 70);
const XS = MARKS.map((_, i) => (i / DAYS) * W);
const LINE = MARKS.map(
  (r, i) => `${i ? "L" : "M"} ${XS[i].toFixed(1)} ${yOf(r).toFixed(1)}`,
).join(" ");
const DEC_Y = yOf(DECISION_RATE);
const AREA = `${LINE} L ${W} ${DEC_Y.toFixed(1)} L 0 ${DEC_Y.toFixed(1)} Z`;

const Drift: React.FC = () => {
  const frame = useCurrentFrame();

  const t = interpolate(frame, [18, 150], [0, 1], { ...clamp, easing: EASE });
  const o = interpolate(frame, [0, 16], [0, 1], { ...clamp, easing: EASE });
  const exit = interpolate(frame, [ACT2_LEN - 20, ACT2_LEN], [1, 0], clamp);

  const day = Math.round(t * DAYS);
  const rateNow = MARKS[Math.min(MARKS.length - 1, day)];
  const loss = (rateNow - DECISION_RATE) * NOTIONAL;

  const markerX = interpolate(t, [0, 1], [0, W]);
  const markerY = yOf(rateNow);

  return (
    <AbsoluteFill
      style={{
        alignItems: "center",
        justifyContent: "center",
        opacity: o * exit,
      }}
    >
      <div style={{ width: W }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginBottom: 26,
          }}
        >
          <div>
            <p
              style={{
                fontFamily: mono,
                fontSize: 19,
                letterSpacing: 4,
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.42)",
                margin: 0,
              }}
            >
              Day {String(day).padStart(2, "0")} of {DAYS}
            </p>
            <p
              style={{
                fontFamily: display,
                fontWeight: 700,
                fontSize: 46,
                letterSpacing: -1.6,
                color: C.white,
                margin: "10px 0 0",
              }}
            >
              The rate you priced at is gone.
            </p>
          </div>
          <div style={{ textAlign: "right" }}>
            <p
              style={{
                fontFamily: mono,
                fontSize: 18,
                letterSpacing: 3,
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.42)",
                margin: 0,
              }}
            >
              USD / GHS
            </p>
            <p
              style={{
                fontFamily: mono,
                fontSize: 58,
                color: C.flagSoft,
                margin: "6px 0 0",
              }}
            >
              {rateNow.toFixed(2)}
            </p>
          </div>
        </div>

        <svg width={W} height={H} style={{ display: "block" }}>
          <defs>
            <linearGradient id="film-leak" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={C.flag} stopOpacity="0.5" />
              <stop offset="100%" stopColor={C.flag} stopOpacity="0.04" />
            </linearGradient>
            <clipPath id="film-clip">
              <rect x="0" y="0" width={Math.max(0.001, markerX)} height={H} />
            </clipPath>
          </defs>

          <line
            x1="0"
            x2={W}
            y1={DEC_Y}
            y2={DEC_Y}
            stroke="rgba(255,255,255,0.4)"
            strokeWidth="2"
            strokeDasharray="7 9"
          />
          <text
            x="4"
            y={DEC_Y - 26}
            fontFamily={mono}
            fontSize="19"
            letterSpacing="3"
            fill="rgba(255,255,255,0.5)"
          >
            PRICED AT 12.41
          </text>

          <g clipPath="url(#film-clip)">
            <path d={AREA} fill="url(#film-leak)" />
            <path
              d={LINE}
              fill="none"
              stroke={C.flagSoft}
              strokeWidth="4"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
          </g>

          <line
            x1={markerX}
            x2={markerX}
            y1="0"
            y2={H}
            stroke="rgba(255,255,255,0.22)"
            strokeWidth="2"
          />
          <circle cx={markerX} cy={markerY} r="18" fill={C.flag} opacity="0.24" />
          <circle cx={markerX} cy={markerY} r="7" fill={C.white} />
        </svg>

        <div
          style={{
            marginTop: 26,
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
            borderTop: "1px solid rgba(255,255,255,0.12)",
            paddingTop: 24,
          }}
        >
          <span
            style={{
              fontFamily: mono,
              fontSize: 21,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.45)",
            }}
          >
            Margin lost to the drift
          </span>
          <span
            style={{
              fontFamily: mono,
              fontSize: 76,
              color: C.flag,
              lineHeight: 1,
            }}
          >
            GHS {ghs(loss)}
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};

/* ------------------------------------------------------------------ */
/* Act III — the route                                                 */
/* ------------------------------------------------------------------ */

const ACT3 = 300;
const ACT3_LEN = 150;

const QUOTES = [
  { label: "Dealer 03", rate: 13.0363, best: true },
  { label: "Dealer 04", rate: 13.0236, best: false },
  { label: "Dealer 05", rate: 12.9968, best: false },
  { label: "Dealer 02", rate: 12.9779, best: false },
  { label: "Dealer 01", rate: 12.8913, best: false },
];

const RECOVERED = Math.round((13.0363 - 12.79) * NOTIONAL);

const Route: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const o = interpolate(frame, [0, 16], [0, 1], { ...clamp, easing: EASE });
  const exit = interpolate(frame, [ACT3_LEN - 18, ACT3_LEN], [1, 0], clamp);

  return (
    <AbsoluteFill
      style={{
        alignItems: "center",
        justifyContent: "center",
        opacity: o * exit,
      }}
    >
      <div style={{ width: 1080 }}>
        <p
          style={{
            fontFamily: display,
            fontWeight: 700,
            fontSize: 52,
            letterSpacing: -2,
            color: C.white,
            margin: "0 0 34px",
          }}
        >
          So we put the banks in competition instead.
        </p>

        {QUOTES.map((q, i) => {
          const at = 18 + i * 11;
          const s = spring({
            frame: frame - at,
            fps,
            config: { damping: 200, mass: 0.7 },
          });
          const x = interpolate(s, [0, 1], [70, 0]);
          const qo = interpolate(frame, [at, at + 14], [0, 1], {
            ...clamp,
            easing: EASE,
          });
          const win = q.best
            ? interpolate(frame, [86, 104], [0, 1], { ...clamp, easing: EASE })
            : 0;

          return (
            <div
              key={q.label}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "22px 28px",
                marginBottom: 12,
                borderRadius: 16,
                opacity: qo,
                transform: `translateX(${x}px)`,
                border: `1px solid ${q.best ? `rgba(155,215,240,${0.25 + win * 0.5})` : "rgba(255,255,255,0.09)"}`,
                backgroundColor: q.best
                  ? `rgba(155,215,240,${0.05 + win * 0.1})`
                  : "rgba(255,255,255,0.035)",
              }}
            >
              <span style={{ display: "flex", alignItems: "center", gap: 18 }}>
                <span
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: 999,
                    backgroundColor: q.best ? C.sky300 : "rgba(255,255,255,0.25)",
                  }}
                />
                <span
                  style={{
                    fontFamily: mono,
                    fontSize: 26,
                    color: "rgba(255,255,255,0.7)",
                  }}
                >
                  {q.label}
                </span>
              </span>
              <span style={{ display: "flex", alignItems: "center", gap: 22 }}>
                {q.best && (
                  <span
                    style={{
                      fontFamily: mono,
                      fontSize: 18,
                      letterSpacing: 3,
                      textTransform: "uppercase",
                      color: C.sky200,
                      opacity: win,
                    }}
                  >
                    Awarded
                  </span>
                )}
                <span
                  style={{
                    fontFamily: mono,
                    fontSize: 28,
                    color: q.best ? C.white : "rgba(255,255,255,0.5)",
                  }}
                >
                  {q.rate.toFixed(4)}
                </span>
              </span>
            </div>
          );
        })}

        <div
          style={{
            marginTop: 30,
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
            borderTop: "1px solid rgba(255,255,255,0.12)",
            paddingTop: 26,
            opacity: interpolate(frame, [100, 118], [0, 1], {
              ...clamp,
              easing: EASE,
            }),
          }}
        >
          <span
            style={{
              fontFamily: mono,
              fontSize: 21,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.45)",
            }}
          >
            Recovered vs. the house rate
          </span>
          <span
            style={{
              fontFamily: mono,
              fontSize: 72,
              color: C.sky200,
              lineHeight: 1,
            }}
          >
            +GHS{" "}
            {ghs(
              RECOVERED *
                interpolate(frame, [100, 132], [0, 1], {
                  ...clamp,
                  easing: EASE,
                }),
            )}
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};

/* ------------------------------------------------------------------ */
/* End card                                                            */
/* ------------------------------------------------------------------ */

const END = 440;
const END_LEN = 100;

const EndCard: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const s = spring({ frame, fps, config: { damping: 200, mass: 0.9 } });
  const y = interpolate(s, [0, 1], [34, 0]);
  const o = interpolate(frame, [0, 20], [0, 1], { ...clamp, easing: EASE });
  const lineW = interpolate(frame, [26, 60], [0, 380], {
    ...clamp,
    easing: EASE,
  });
  const subO = interpolate(frame, [40, 60], [0, 1], { ...clamp, easing: EASE });

  return (
    <AbsoluteFill
      style={{
        alignItems: "center",
        justifyContent: "center",
        opacity: o,
      }}
    >
      <div style={{ textAlign: "center", transform: `translateY(${y}px)` }}>
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "center",
          }}
        >
          <span
            style={{
              fontFamily: display,
              fontWeight: 900,
              fontSize: 92,
              letterSpacing: -4,
              color: C.white,
            }}
          >
            noeud
          </span>
          <span
            style={{
              fontFamily: display,
              fontWeight: 900,
              fontSize: 92,
              letterSpacing: -4,
              color: C.sky300,
            }}
          >
            ;
          </span>
        </div>

        <div
          style={{
            width: lineW,
            height: 1,
            backgroundColor: "rgba(255,255,255,0.25)",
            margin: "44px auto",
          }}
        />

        <p
          style={{
            fontFamily: display,
            fontWeight: 700,
            fontSize: 68,
            letterSpacing: -2.6,
            color: C.white,
            margin: 0,
            opacity: subO,
          }}
        >
          Keep the margin you priced.
        </p>
        <p
          style={{
            fontFamily: mono,
            fontSize: 22,
            letterSpacing: 5,
            textTransform: "uppercase",
            color: C.sky300,
            marginTop: 30,
            opacity: subO,
          }}
        >
          Accra · Tema · for African trade
        </p>
      </div>
    </AbsoluteFill>
  );
};

/* ------------------------------------------------------------------ */

export const NoeudFilm: React.FC = () => (
  <Ground>
    <Sequence from={ACT1} durationInFrames={ACT1_LEN}>
      <ActLabel index="01" title="The invoice" at={6} />
      <Invoice />
      <Caption text="You agree a price in dollars." at={72} />
    </Sequence>

    <Sequence from={ACT2} durationInFrames={ACT2_LEN}>
      <ActLabel index="02" title="The drift" at={6} />
      <Drift />
      <Caption
        text="Forty-seven days later, a rate nobody quoted you has taken the margin."
        at={150}
      />
    </Sequence>

    <Sequence from={ACT3} durationInFrames={ACT3_LEN}>
      <ActLabel index="03" title="The route" at={6} />
      <Route />
      <Caption
        text="Licensed banks bid. The best price wins. Our fee is on the ticket."
        at={118}
      />
    </Sequence>

    <Sequence from={END} durationInFrames={END_LEN}>
      <EndCard />
    </Sequence>
  </Ground>
);
