import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

const base =
  "group/btn inline-flex items-center justify-center gap-2 rounded-full text-[0.9375rem] font-medium leading-none transition-[background-color,color,border-color,box-shadow,transform] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-plum-400 focus-visible:ring-offset-2 disabled:opacity-55";

const tones = {
  plum: "bg-plum-800 text-white hover:bg-plum-700 active:bg-plum-900 shadow-[0_1px_2px_rgba(35,6,26,0.16)]",
  sky: "bg-sky-300 text-plum-950 hover:bg-sky-200 active:bg-sky-400",
  outline:
    "border border-line bg-paper text-ink hover:border-plum-300 hover:bg-plum-50",
  ghostOnDark:
    "border border-white/20 bg-white/5 text-white hover:border-white/40 hover:bg-white/10",
  white: "bg-white text-plum-900 hover:bg-plum-50",
} as const;

const sizes = {
  sm: "h-9 px-4",
  md: "h-11 px-5",
  lg: "h-[3.25rem] px-7 text-base",
} as const;

type Common = {
  tone?: keyof typeof tones;
  size?: keyof typeof sizes;
  children: ReactNode;
  className?: string;
};

export function Button({
  tone = "plum",
  size = "md",
  className,
  children,
  ...props
}: Common & ComponentProps<"button">) {
  return (
    <button
      className={cn(base, tones[tone], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  );
}

export function ButtonLink({
  tone = "plum",
  size = "md",
  className,
  children,
  ...props
}: Common & ComponentProps<"a">) {
  return (
    <a className={cn(base, tones[tone], sizes[size], className)} {...props}>
      {children}
    </a>
  );
}

/** The arrow that nudges on hover — used on every forward action. */
export function Arrow({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className={cn(
        "h-[0.85em] w-[0.85em] transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/btn:translate-x-1",
        className,
      )}
    >
      <path
        d="M3 8h9.5M8.5 4l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Eyebrow({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p className={cn("eyebrow text-plum-500", className)}>{children}</p>
  );
}
