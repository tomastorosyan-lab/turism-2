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
    openGraph: { title: post.title, description: post.excerpt, siteName: SITE_NAME, locale: "ru_RU" },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = blogPosts.find((item) => item.slug === slug);
  if (!post) notFound();

  return (
    <article className="grid gap-6">
      <header className="grid gap-3">
        <h1 className="text-3xl font-semibold text-pine-900">{post.title}</h1>
        <p className="text-sm text-pine-700">{post.excerpt}</p>
      </header>
      <div className="grid gap-3 rounded-xl border border-pine-100 bg-white p-5 text-sm text-pine-800">
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
      <Link href="/zayavka" className="w-fit rounded-full bg-pine-900 px-5 py-3 text-sm text-white">
        Подобрать тур с менеджером
      </Link>
    </article>
  );
}
