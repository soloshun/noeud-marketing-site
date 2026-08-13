import { Arrow, ButtonLink } from "@/components/ui/button";
import { Wordmark } from "@/components/ui/logo";
import { PHOTO_CREDITS } from "@/lib/photos";

const COLUMNS = [
  {
    heading: "Product",
    links: [
      ["Mark", "/#product"],
      ["Profile", "/#product"],
      ["Route", "/#product"],
      ["The film", "/#product"],
    ],
  },
  {
    heading: "Company",
    links: [
      ["Research", "/blog"],
      ["The pilot", "/#lifecycle"],
      ["For institutions", "/#institutions"],
      ["Fair questions", "/#questions"],
    ],
  },
  {
    heading: "Legal",
    links: [
      ["Privacy", "#"],
      ["Terms", "#"],
      ["Disclosures", "#"],
      ["Contact", "/#apply"],
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-plum-950 text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-sky-300/40 to-transparent"
      />

      {/* Closing call */}
      <div className="shell relative pb-16 pt-20 lg:pb-20 lg:pt-28">
        <div
          className="flex flex-col gap-8 border-b border-white/12 pb-16 lg:flex-row lg:items-end lg:justify-between lg:pb-20"
        >
          <h2 className="display-lg max-w-[13ch] text-white">
            The rate will move tomorrow, too.
          </h2>
          <div className="shrink-0">
            <ButtonLink href="/#apply" tone="sky" size="lg">
              Start the free 30-day pilot
              <Arrow />
            </ButtonLink>
            <p className="mt-3.5 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-white/35">
              No card · 30 days · your data leaves with you
            </p>
          </div>
        </div>

        {/* Directory */}
        <div className="grid gap-12 pt-14 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1.9fr)] lg:gap-20">
          <div>
            <Wordmark className="text-white" />
            <p className="mt-6 max-w-[34ch] text-[0.875rem] leading-relaxed text-white/55">
              Price discovery and FX risk control for African importers and
              exporters. From currency risk to currency reward.
            </p>
            <p className="aside-serif mt-6 text-[1.0625rem] text-white/40">
              We are not a bank. We never hold your money.
            </p>
          </div>

          <div className="grid gap-10 sm:grid-cols-3">
            {COLUMNS.map((col) => (
              <nav key={col.heading} aria-label={col.heading}>
                <p className="eyebrow text-white/30">{col.heading}</p>
                <ul className="mt-5 space-y-3">
                  {col.links.map(([label, href]) => (
                    <li key={label}>
                      <a
                        href={href}
                        className="group inline-flex items-center gap-1.5 text-[0.875rem] text-white/65 transition-colors hover:text-white"
                      >
                        {label}
                        <span className="h-px w-0 bg-sky-300 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-4" />
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-white/12 pt-7 text-[0.75rem] text-white/35 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 NOEUD. Accra · Tema, Ghana. All rights reserved.</p>
          <p className="aside-serif text-[0.9375rem] text-white/35">
            We publish research, not marketing.
          </p>
        </div>

        <p className="mt-6 text-[0.6875rem] leading-relaxed text-white/20">
          Photography: {PHOTO_CREDITS.join(", ")} — via Unsplash.
        </p>
      </div>
    </footer>
  );
}
