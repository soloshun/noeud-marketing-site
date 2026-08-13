"use client";

import { motion } from "motion/react";
import { useId } from "react";

/**
 * Africa, projected equirectangularly from real coastal waypoints:
 *   x = (lon + 20) * 6.2,  y = (40 - lat) * 6.2
 *
 * The corridors carry pulses that run continuously — SMIL `animateMotion`
 * rather than JS, so the loop never stalls, costs no main thread, and keeps
 * running while the rest of the page animates.
 */
const K = 6.2;
const px = (lon: number) => (lon + 20) * K;
const py = (lat: number) => (40 - lat) * K;

const COAST: [number, number][] = [
  [-5.9, 35.8], [10.2, 37.0], [20.0, 32.1], [30.0, 31.2], [32.5, 29.9],
  [37.2, 19.6], [43.3, 12.6], [51.4, 11.8], [45.3, 2.0], [39.7, -4.0],
  [39.3, -6.8], [40.6, -14.5], [34.9, -19.8], [32.6, -25.9], [31.0, -29.9],
  [20.0, -34.8], [18.4, -33.9], [14.5, -22.9], [13.2, -8.8], [11.9, -4.8],
  [9.7, 4.0], [5.5, 4.3], [0.0, 5.6], [-4.0, 5.3], [-13.2, 8.5],
  [-17.5, 14.7], [-16.0, 18.1], [-16.5, 22.0], [-9.6, 30.4],
];

export const AFRICA_OUTLINE =
  COAST.map(
    ([lon, lat], i) =>
      `${i ? "L" : "M"} ${px(lon).toFixed(1)} ${py(lat).toFixed(1)}`,
  ).join(" ") + " Z";

const HOME = { lon: -0.19, lat: 5.6 };

const NODES = [
  { name: "Dakar", lon: -17.5, lat: 14.7, dur: 5.2 },
  { name: "Abidjan", lon: -4.0, lat: 5.3, dur: 3.4 },
  { name: "Lagos", lon: 3.4, lat: 6.5, dur: 3.1 },
  { name: "Casablanca", lon: -7.6, lat: 33.6, dur: 6.4 },
  { name: "Cairo", lon: 31.2, lat: 30.0, dur: 7.1 },
  { name: "Nairobi", lon: 36.8, lat: -1.3, dur: 6.6 },
  { name: "Dar es Salaam", lon: 39.3, lat: -6.8, dur: 6.9 },
  { name: "Johannesburg", lon: 28.0, lat: -26.2, dur: 7.6 },
];

function arc(a: { lon: number; lat: number }, b: { lon: number; lat: number }) {
  const x1 = px(a.lon);
  const y1 = py(a.lat);
  const x2 = px(b.lon);
  const y2 = py(b.lat);
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.hypot(dx, dy) || 1;
  const bow = len * 0.22;
  return `M ${x1.toFixed(1)} ${y1.toFixed(1)} Q ${(mx - (dy / len) * bow).toFixed(1)} ${(my + (dx / len) * bow).toFixed(1)} ${x2.toFixed(1)} ${y2.toFixed(1)}`;
}

type Props = {
  className?: string;
  /** Stroke/fill weight of the landmass. */
  tone?: "light" | "dark";
  /** Show city labels around the ring. */
  labels?: boolean;
};

export function CorridorField({
  className,
  tone = "dark",
  labels = false,
}: Props) {
  const uid = useId().replace(/:/g, "");
  const ink = tone === "dark" ? "#9bd7f0" : "#4a8fd4";
  const land =
    tone === "dark" ? "rgba(255,255,255,0.22)" : "rgba(74,16,57,0.24)";
  const landFill =
    tone === "dark" ? "rgba(255,255,255,0.035)" : "rgba(74,16,57,0.035)";

  const hx = px(HOME.lon);
  const hy = py(HOME.lat);

  return (
    <svg
      viewBox="0 0 460 480"
      className={className}
      role="img"
      aria-label="NOEUD's trade corridors radiating from Accra and Tema across Africa"
    >
      <defs>
        <linearGradient id={`${uid}-arc`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={ink} stopOpacity="0.75" />
          <stop offset="100%" stopColor={ink} stopOpacity="0.12" />
        </linearGradient>
        {NODES.map((n, i) => (
          <path key={n.name} id={`${uid}-p${i}`} d={arc(HOME, n)} fill="none" />
        ))}
      </defs>

      <motion.path
        d={AFRICA_OUTLINE}
        fill={landFill}
        stroke={land}
        strokeWidth="1.1"
        strokeLinejoin="round"
        initial={{ opacity: 0, pathLength: 0 }}
        whileInView={{ opacity: 1, pathLength: 1 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1] }}
      />

      {NODES.map((n, i) => (
        <use
          key={`arc-${n.name}`}
          href={`#${uid}-p${i}`}
          stroke={`url(#${uid}-arc)`}
          strokeWidth="1.1"
          strokeLinecap="round"
          fill="none"
        />
      ))}

      {/* Pulses — the part that never stops */}
      {NODES.map((n, i) => (
        <circle key={`pulse-${n.name}`} r="2.6" fill={ink}>
          <animateMotion
            dur={`${n.dur}s`}
            begin={`${i * 0.55}s`}
            repeatCount="indefinite"
            rotate="auto"
          >
            <mpath href={`#${uid}-p${i}`} />
          </animateMotion>
          <animate
            attributeName="opacity"
            values="0;1;1;0"
            keyTimes="0;0.12;0.8;1"
            dur={`${n.dur}s`}
            begin={`${i * 0.55}s`}
            repeatCount="indefinite"
          />
        </circle>
      ))}

      {NODES.map((n, i) => (
        <g key={n.name}>
          <circle cx={px(n.lon)} cy={py(n.lat)} r="2.8" fill={ink} opacity="0.9" />
          <circle
            cx={px(n.lon)}
            cy={py(n.lat)}
            r="2.8"
            fill="none"
            stroke={ink}
            strokeWidth="1"
            opacity="0.45"
            className="[animation:noeud-pulse-ring_3.4s_ease-out_infinite]"
            style={{
              transformBox: "fill-box",
              transformOrigin: "center",
              animationDelay: `${i * 0.42}s`,
            }}
          />
          {labels && (
            <text
              x={px(n.lon) + 8}
              y={py(n.lat) + 3.5}
              fontSize="9"
              letterSpacing="1.1"
              fill={tone === "dark" ? "rgba(255,255,255,0.45)" : "rgba(22,18,27,0.4)"}
              className="font-mono"
            >
              {n.name.toUpperCase()}
            </text>
          )}
        </g>
      ))}

      {/* Home */}
      <circle cx={hx} cy={hy} r="11" fill={ink} opacity="0.14" />
      <circle
        cx={hx}
        cy={hy}
        r="11"
        fill="none"
        stroke={ink}
        strokeWidth="1"
        opacity="0.5"
        className="[animation:noeud-pulse-ring_2.8s_ease-out_infinite]"
        style={{ transformBox: "fill-box", transformOrigin: "center" }}
      />
      <circle
        cx={hx}
        cy={hy}
        r="4.5"
        fill={tone === "dark" ? "#ffffff" : "#4a1039"}
      />
      {labels && (
        <text
          x={hx - 9}
          y={hy + 20}
          textAnchor="end"
          fontSize="9.5"
          letterSpacing="1.3"
          fill={tone === "dark" ? "rgba(255,255,255,0.62)" : "rgba(22,18,27,0.55)"}
          className="font-mono"
        >
          ACCRA · TEMA
        </text>
      )}
    </svg>
  );
}
