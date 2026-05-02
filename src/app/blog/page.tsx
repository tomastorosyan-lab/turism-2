import Image from "next/image";
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
    <div className="grid gap-8">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-semibold text-pine-900 md:text-4xl">Гид по Абхазии</h1>
        <p className="mt-3 text-sm text-pine-700 md:text-base">
          Контент-хаб для SEO-кластеров верхнего и среднего интента: сезон, отели, цены, советы перед покупкой тура.
          Иллюстрации — локальные фото курортов Абхазии.
        </p>
      </header>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {blogPosts.map((post) => (
          <article
            key={post.slug}
            className="flex flex-col overflow-hidden rounded-2xl border border-pine-100 bg-white shadow-sm transition hover:border-pine-200 hover:shadow-md"
          >
            <Link href={`/blog/${post.slug}`} className="relative aspect-[16/10] w-full shrink-0 bg-pine-100">
              <Image
                src={post.coverImage}
                alt={post.coverImageAlt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </Link>
            <div className="flex flex-1 flex-col p-5">
              <h2 className="text-lg font-semibold leading-snug text-pine-900">
                <Link href={`/blog/${post.slug}`} className="hover:text-pine-700">
                  {post.title}
                </Link>
              </h2>
              <p className="mt-2 line-clamp-3 text-sm text-pine-700">{post.excerpt}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span key={tag} className="rounded-full bg-pine-100 px-3 py-1 text-xs text-pine-900">
                    {tag}
                  </span>
                ))}
              </div>
              <Link
                href={`/blog/${post.slug}`}
                className="mt-4 inline-flex w-fit rounded-full border border-pine-600 px-4 py-2 text-sm font-medium text-pine-800 hover:bg-pine-50"
              >
                Читать материал
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
