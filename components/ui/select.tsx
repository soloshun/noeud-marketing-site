"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useId, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * A listbox that matches the rest of the form, since the native control can't
 * be styled and looks foreign next to everything else.
 *
 * It still submits like a native select — the value rides along in a hidden
 * input — and it keeps the keyboard contract people expect: arrows to move,
 * Enter to choose, Escape to close, Home/End to jump.
 */
export function Select({
  name,
  label,
  options,
  defaultValue,
}: {
  name: string;
  label: string;
  options: string[];
  defaultValue?: string;
}) {
  const [value, setValue] = useState(defaultValue ?? options[0]);
  const [open, setOpen] = useState(false);
  const [cursor, setCursor] = useState(() =>
    Math.max(0, options.indexOf(defaultValue ?? options[0])),
  );
  const root = useRef<HTMLDivElement>(null);
  const listId = useId();

  useEffect(() => {
    if (!open) return;
    const onPointer = (e: MouseEvent) => {
      if (!root.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onPointer);
    return () => document.removeEventListener("mousedown", onPointer);
  }, [open]);

  const choose = (i: number) => {
    setValue(options[i]);
    setCursor(i);
    setOpen(false);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (!open && (e.key === "Enter" || e.key === " " || e.key === "ArrowDown")) {
      e.preventDefault();
      setOpen(true);
      return;
    }
    if (!open) return;

    if (e.key === "Escape") {
      e.preventDefault();
      setOpen(false);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setCursor((c) => Math.min(options.length - 1, c + 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setCursor((c) => Math.max(0, c - 1));
    } else if (e.key === "Home") {
      e.preventDefault();
      setCursor(0);
    } else if (e.key === "End") {
      e.preventDefault();
      setCursor(options.length - 1);
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      choose(cursor);
    }
  };

  return (
    <div ref={root} className="relative">
      <input type="hidden" name={name} value={value} readOnly />

      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={label}
        onClick={() => setOpen((v) => !v)}
        onKeyDown={onKeyDown}
        className={cn(
          "flex h-11 w-full items-center justify-between rounded-lg border bg-paper px-3.5 text-left text-[0.9375rem] text-ink outline-none transition-colors",
          open ? "border-plum-400 ring-2 ring-plum-100" : "border-line hover:border-plum-300",
        )}
      >
        <span>{value}</span>
        <svg
          viewBox="0 0 12 12"
          aria-hidden="true"
          className={cn(
            "h-3 w-3 shrink-0 text-ink-faint transition-transform duration-200",
            open && "rotate-180",
          )}
        >
          <path
            d="M2.5 4.5 6 8l3.5-3.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            id={listId}
            role="listbox"
            aria-label={label}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-0 right-0 top-[calc(100%+0.375rem)] z-20 overflow-hidden rounded-lg border border-line bg-paper py-1 card-float"
          >
            {options.map((option, i) => {
              const selected = option === value;
              return (
                <li key={option} role="option" aria-selected={selected}>
                  <button
                    type="button"
                    onClick={() => choose(i)}
                    onMouseEnter={() => setCursor(i)}
                    className={cn(
                      "flex w-full items-center justify-between px-3.5 py-2.5 text-left text-[0.875rem] transition-colors",
                      i === cursor ? "bg-plum-50 text-plum-800" : "text-ink-soft",
                    )}
                  >
                    {option}
                    {selected && (
                      <svg viewBox="0 0 12 12" className="h-3 w-3 text-azure-500">
                        <path
                          d="M2 6.5 4.8 9 10 3.5"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </button>
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
