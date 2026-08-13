import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer } from "@/components/site/footer";
import { Nav } from "@/components/site/nav";
import { POSTS, getPost } from "@/lib/posts";

export function generateStaticParams() {
  return POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return { title: post.title, description: post.dek };
}

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

export default async function PostPage({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <>
      <Nav />
      <main className="flex-1 pt-[4.5rem]">
        <article className="bg-paper py-20 lg:py-28">
          <div className="shell">
            <Link
              href="/blog"
              className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-ink-faint transition-colors hover:text-plum-700"
            >
              ← Research
            </Link>

            <header className="mt-10 max-w-[46rem]">
              <p className="flex items-center gap-4 font-mono text-[0.625rem] uppercase tracking-[0.16em]">
                <span className="text-azure-500">{post.tag}</span>
                <span className="text-ink-faint">{formatDate(post.date)}</span>
                <span className="text-ink-faint">{post.readingTime}</span>
              </p>
              <h1 className="display-lg mt-6 text-plum-800">{post.title}</h1>
              <p className="mt-6 font-serif text-[1.25rem] leading-[1.55] text-ink-soft">
                {post.dek}
              </p>
            </header>

            <div className="mt-12 max-w-[42rem] border-t border-line pt-12">
              {post.body.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 40)}
                  className="mb-6 text-[1.0625rem] leading-[1.75] text-ink-soft last:mb-0"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            <p className="mt-14 max-w-[42rem] border-t border-line pt-6 text-[0.8125rem] leading-relaxed text-ink-faint">
              NOEUD is not a bank and never holds your money. Nothing here is
              investment advice.
            </p>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
