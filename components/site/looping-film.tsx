"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * A rendered film that behaves like part of the page rather than a video
 * player: it starts itself, loops, and shows no chrome.
 *
 * It only runs while on screen — an autoplaying loop left running behind the
 * fold is a battery cost for no benefit, and this audience reads on phones.
 * Where the visitor has asked for reduced motion we hand back a paused frame
 * with real controls instead.
 */
export function LoopingFilm({
  src,
  poster,
  ratio,
  label,
  className,
}: {
  src: string;
  poster?: string;
  /** CSS aspect-ratio, e.g. "2560 / 1120". */
  ratio: string;
  label: string;
  className?: string;
}) {
  const wrap = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const el = wrap.current;
    const vid = video.current;
    if (!el || !vid || reduced) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          void vid.play().catch(() => {});
        } else {
          vid.pause();
        }
      },
      { threshold: 0.1 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [reduced]);

  return (
    <div
      ref={wrap}
      className={cn("relative w-full overflow-hidden bg-plum-950", className)}
      style={{ aspectRatio: ratio }}
    >
      <video
        ref={video}
        className="absolute inset-0 h-full w-full object-cover"
        src={src}
        poster={poster}
        muted
        loop
        playsInline
        autoPlay={!reduced}
        controls={reduced}
        preload="metadata"
        aria-label={label}
      />
    </div>
  );
}
