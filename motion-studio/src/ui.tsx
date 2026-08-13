import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { C, display, mono } from "./theme";

export const EASE = Easing.bezier(0.16, 1, 0.3, 1);

export const clamp = {
  extrapolateLeft: "clamp",
  extrapolateRight: "clamp",
} as const;

/** Deep plum ground with the same fine grid the product surfaces use. */
export const Ground: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <AbsoluteFill style={{ backgroundColor: C.plum950 }}>
    <AbsoluteFill
      style={{
        backgroundImage:
          "linear-gradient(to right, rgba(255,255,255,0.045) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.045) 1px, transparent 1px)",
        backgroundSize: "80px 80px",
      }}
    />
    <AbsoluteFill
      style={{
        background:
          "radial-gradient(1100px 700px at 15% -10%, rgba(155,215,240,0.16), transparent 65%), radial-gradient(900px 600px at 95% 110%, rgba(74,16,57,0.7), transparent 60%)",
      }}
    />
    {children}
  </AbsoluteFill>
);

/** Small-caps act label, top-left, consistent across every scene. */
export const ActLabel: React.FC<{ index: string; title: string; at: number }> =
  ({ index, title, at }) => {
    const frame = useCurrentFrame();
    const o = interpolate(frame, [at, at + 14], [0, 1], {
      ...clamp,
      easing: EASE,
    });
    const x = interpolate(frame, [at, at + 20], [-18, 0], {
      ...clamp,
      easing: EASE,
    });

    return (
      <div
        style={{
          position: "absolute",
          top: 76,
          left: 96,
          display: "flex",
          alignItems: "center",
          gap: 18,
          opacity: o,
          transform: `translateX(${x}px)`,
        }}
      >
        <span
          style={{
            fontFamily: mono,
            fontSize: 20,
            letterSpacing: 4,
            color: C.sky300,
          }}
        >
          {index}
        </span>
        <span
          style={{
            width: 46,
            height: 1,
            backgroundColor: "rgba(255,255,255,0.25)",
          }}
        />
        <span
          style={{
            fontFamily: mono,
            fontSize: 20,
            letterSpacing: 5,
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.55)",
          }}
        >
          {title}
        </span>
      </div>
    );
  };

/** Bottom caption — the sentence the scene is making. */
export const Caption: React.FC<{ text: string; at: number }> = ({
  text,
  at,
}) => {
  const frame = useCurrentFrame();
  const o = interpolate(frame, [at, at + 18], [0, 1], {
    ...clamp,
    easing: EASE,
  });
  const y = interpolate(frame, [at, at + 24], [22, 0], {
    ...clamp,
    easing: EASE,
  });

  return (
    <div
      style={{
        position: "absolute",
        bottom: 78,
        left: 96,
        right: 96,
        opacity: o,
        transform: `translateY(${y}px)`,
      }}
    >
      <p
        style={{
          fontFamily: display,
          fontWeight: 600,
          fontSize: 40,
          letterSpacing: -1,
          color: C.white,
          margin: 0,
        }}
      >
        {text}
      </p>
    </div>
  );
};

/** The knot mark, drawn to match the site's logo exactly. */
export const Mark: React.FC<{ size: number; color?: string }> = ({
  size,
  color = C.white,
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path
      d="M6.2 8.4 12 4.6l5.8 3.8v7.2L12 19.4l-5.8-3.8Z"
      stroke={color}
      strokeWidth="1.5"
      strokeLinejoin="round"
      opacity="0.35"
    />
    <path
      d="M12 4.6v6.9m0 0 5.8 4.1M12 11.5l-5.8 4.1"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <circle cx="12" cy="4.6" r="1.9" fill={color} />
    <circle cx="17.8" cy="15.6" r="1.9" fill={color} />
    <circle cx="6.2" cy="15.6" r="1.9" fill={color} />
  </svg>
);
