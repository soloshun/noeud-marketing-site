import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/site/footer";
import { Nav } from "@/components/site/nav";
import { Arrow } from "@/components/ui/button";
import { POSTS } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Research",
  description:
    "Method notes on FX price discovery, currency risk and settlement in African trade corridors.",
};

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

export default function BlogIndex() {
  return (
    <>
      <Nav />
      <main className="flex-1 pt-[4.5rem]">
        <section className="border-b border-line bg-paper py-20 lg:py-28">
          <div className="shell">
            <p className="eyebrow text-azure-500">Research</p>
            <h1 className="display-lg mt-5 max-w-[18ch] text-plum-800">
              We publish research, not marketing.
            </h1>
            <p className="lede mt-6 max-w-[52ch]">
              Method notes on price discovery, currency risk and settlement in
              African trade corridors.
            </p>
          </div>
        </section>

        <section className="bg-paper py-4 lg:py-8">
          <div className="shell">
            <ul>
              {POSTS.map((post) => (
                <li key={post.slug} className="border-b border-line">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group grid gap-4 py-10 lg:grid-cols-[10rem_minmax(0,1fr)] lg:gap-12"
                  >
                    <div>
                      <p className="font-mono text-[0.625rem] uppercase tracking-[0.16em] text-azure-500">
                        {post.tag}
                      </p>
                      <p className="mt-2 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-ink-faint">
                        {formatDate(post.date)}
                      </p>
                    </div>

                    <div>
                      <h2 className="display-md max-w-[26ch] text-plum-800 transition-colors group-hover:text-plum-600">
                        {post.title}
                      </h2>
                      <p className="mt-3 max-w-[62ch] text-[0.9375rem] leading-relaxed text-ink-soft">
                        {post.dek}
                      </p>
                      <p className="mt-5 inline-flex items-center gap-2 text-[0.8125rem] font-medium text-plum-700">
                        Read
                        <Arrow className="transition-transform duration-300 group-hover:translate-x-1" />
                        <span className="ml-2 text-ink-faint">
                          {post.readingTime}
                        </span>
                      </p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
