import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { blogPosts } from "@/lib/data";
import { notFound } from "next/navigation";
import { SITE_NAME, SITE_URL } from "@/lib/brand";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((item) => item.slug === slug);
  if (!post) return { title: "Материал не найден" };
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `${SITE_URL}/blog/${slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      siteName: SITE_NAME,
      locale: "ru_RU",
      images: [{ url: post.coverImage, alt: post.coverImageAlt }],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = blogPosts.find((item) => item.slug === slug);
  if (!post) notFound();

  return (
    <article className="grid gap-8">
      <div className="overflow-hidden rounded-2xl border border-pine-100 bg-pine-900 shadow-lg">
        <div className="relative aspect-[21/9] min-h-[180px] w-full md:min-h-[220px]">
          <Image
            src={post.coverImage}
            alt={post.coverImageAlt}
            fill
            priority
            className="object-cover object-center"
            sizes="(max-width: 768px) 100vw, min(1200px, 100vw)"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-pine-950/85 via-transparent to-transparent" aria-hidden />
          <div className="absolute inset-x-0 bottom-0 p-5 md:p-8">
            <h1 className="max-w-4xl text-2xl font-semibold leading-tight text-white md:text-4xl">{post.title}</h1>
            <p className="mt-3 max-w-2xl text-sm text-white/95 md:text-base">{post.excerpt}</p>
          </div>
        </div>
      </div>

      <div className="grid gap-3 rounded-xl border border-pine-100 bg-white p-5 text-sm leading-relaxed text-pine-800 md:p-8 md:text-base">
        {post.content.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        {post.tags.map((tag) => (
          <span key={tag} className="rounded-full bg-pine-100 px-3 py-1 text-xs text-pine-900">
            {tag}
          </span>
        ))}
      </div>
      <Link
        href="/zayavka"
        className="w-fit rounded-full bg-pine-900 px-5 py-3 text-sm font-medium text-white hover:bg-pine-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-pine-600 focus-visible:ring-offset-2"
      >
        Подобрать тур с менеджером {SITE_NAME}
      </Link>
    </article>
  );
}
