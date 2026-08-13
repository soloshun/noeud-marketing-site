import { Eyebrow } from "@/components/ui/button";
import { LoopingFilm } from "@/components/site/looping-film";
import { Reveal } from "@/components/ui/reveal";

const CHAPTERS = [
  ["01", "The invoice", "You agree a price in dollars."],
  ["02", "The drift", "A rate nobody quoted you takes the margin."],
  ["03", "The route", "Licensed banks bid. The best price wins."],
];

export function Film() {
  return (
    <section className="border-t border-line bg-paper py-24 lg:py-32">
      <div className="shell">
        <Reveal className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Eyebrow className="text-azure-500">The film</Eyebrow>
            <h2 className="display-lg mt-5 max-w-[16ch] text-plum-800">
              One invoice, from priced to settled.
            </h2>
          </div>
          <p className="max-w-[32ch] font-serif text-[1.0625rem] leading-relaxed text-ink-soft lg:pb-2 lg:text-right">
            Eighteen seconds on where the margin goes — and what it takes to get
            it back.
          </p>
        </Reveal>
      </div>

      <div className="mt-12 lg:mt-16">
        <LoopingFilm
          src="/noeud-film.mp4"
          poster="/noeud-film-poster.jpg"
          ratio="1920 / 1080"
          label="NOEUD brand film: a $500,000 export invoice priced at 12.41 GHS per USD, the rate drifting to 13.03 over 47 days, and licensed banks competing to recover the margin."
        />
      </div>

      <div className="shell">
        <dl className="mt-10 grid gap-8 sm:grid-cols-3">
          {CHAPTERS.map(([n, title, body]) => (
            <div key={n} className="border-t border-line pt-4">
              <dt className="flex items-center gap-3">
                <span className="font-mono text-[0.75rem] text-azure-500">
                  {n}
                </span>
                <span className="font-display text-[1.0625rem] font-bold text-plum-800">
                  {title}
                </span>
              </dt>
              <dd className="mt-2 text-[0.875rem] leading-relaxed text-ink-soft">
                {body}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
