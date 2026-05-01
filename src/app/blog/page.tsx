import Link from "next/link";
import type { Metadata } from "next";
import { blogPosts } from "@/lib/data";
import { SITE_NAME, SITE_URL } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Гид по Абхазии",
  description: `Материалы ${SITE_NAME} о курортах, отелях, сезоне и турах в Абхазию — abkhaziatrip.ru.`,
  alternates: { canonical: `${SITE_URL}/blog` },
};

export default function BlogPage() {
  return (
    <div className="grid gap-6">
      <h1 className="text-3xl font-semibold text-pine-900">Гид по Абхазии</h1>
      <p className="max-w-3xl text-sm text-pine-700">
        Контент-хаб для SEO-кластеров верхнего и среднего интента: сезон, отели, цены, советы
        перед покупкой тура.
      </p>
      <div className="grid gap-4">
        {blogPosts.map((post) => (
          <article key={post.slug} className="rounded-xl border border-pine-100 bg-white p-5">
            <h2 className="text-xl font-semibold text-pine-900">{post.title}</h2>
            <p className="mt-2 text-sm text-pine-700">{post.excerpt}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span key={tag} className="rounded-full bg-pine-100 px-3 py-1 text-xs text-pine-900">
                  {tag}
                </span>
              ))}
            </div>
            <Link
              href={`/blog/${post.slug}`}
              className="mt-4 inline-block rounded-full border border-pine-600 px-4 py-2 text-sm text-pine-700"
            >
              Читать материал
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
