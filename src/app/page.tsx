import Link from "next/link";
import Image from "next/image";
import { blogPosts, formatRub, resorts } from "@/lib/data";
import { readOperatorOffers } from "@/lib/operator-offers";

export const dynamic = "force-dynamic";

export default async function Home() {
  const offers = await readOperatorOffers();
  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    name: "AbkhaziaTrip",
    url: "https://abkhaziatrip.ru",
    areaServed: "RU",
    description: "Сервис подбора туров в Абхазию с поддержкой менеджера.",
  };

  return (
    <div className="grid gap-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
      />
      <section className="rounded-2xl bg-pine-900 px-6 py-14 text-white md:px-12">
        <p className="text-sm uppercase tracking-[0.16em] text-pine-100">Abkhazia Trip Service</p>
        <h1 className="mt-4 max-w-3xl text-4xl leading-tight font-semibold md:text-5xl">
          Туристический сервис по турам в Абхазию
        </h1>
        <p className="mt-4 max-w-2xl text-base text-pine-100">
          Подбираем туры под бюджет, семейный и премиальный запрос. Прозрачные условия,
          поддержка менеджера, единый статус заявки и бронирования.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/zayavka" className="rounded-full bg-white px-6 py-3 text-sm font-medium text-pine-900">
            Подобрать тур
          </Link>
          <Link
            href="/tury-abkhazia"
            className="rounded-full border border-white/40 px-6 py-3 text-sm font-medium text-white"
          >
            Смотреть туры
          </Link>
        </div>
      </section>

      <section className="grid gap-4">
        <h2 className="text-2xl font-semibold text-pine-900">Популярные туры</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {offers.map((offer) => (
            <article key={offer.id} className="rounded-xl border border-pine-100 bg-white p-5">
              <Image
                src={offer.image}
                alt={offer.title}
                width={1200}
                height={700}
                className="h-44 w-full rounded-lg object-cover"
              />
              <p className="text-sm text-pine-600">{offer.resort}</p>
              <h3 className="mt-1 text-lg font-semibold text-pine-900">{offer.title}</h3>
              <p className="mt-2 text-sm text-pine-700">{offer.description}</p>
              <div className="mt-4 flex items-center justify-between text-sm">
                <span>от {formatRub(offer.price)}</span>
                <span>{offer.nights} ночей</span>
              </div>
              <Link
                href={`/booking/${offer.id}`}
                className="mt-3 inline-block rounded-full border border-pine-600 px-4 py-2 text-xs text-pine-700"
              >
                Перейти к брони
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="grid gap-4">
        <h2 className="text-2xl font-semibold text-pine-900">Курорты Абхазии</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {resorts.map((resort) => (
            <Link
              key={resort.slug}
              href={`/kurorty/${resort.slug}`}
              className="rounded-xl border border-pine-100 bg-white p-5 transition hover:border-pine-600"
            >
              <h3 className="text-lg font-semibold text-pine-900">{resort.name}</h3>
              <p className="mt-1 text-sm text-pine-700">{resort.short}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="grid gap-4">
        <h2 className="text-2xl font-semibold text-pine-900">Туры из городов</h2>
        <div className="flex flex-wrap gap-3 text-sm">
          <Link href="/tury-abkhazia/iz-moskva" className="rounded-full border border-pine-600 px-4 py-2">
            Из Москвы
          </Link>
          <Link href="/tury-abkhazia/iz-spb" className="rounded-full border border-pine-600 px-4 py-2">
            Из Санкт-Петербурга
          </Link>
          <Link href="/tury-abkhazia/iz-kazan" className="rounded-full border border-pine-600 px-4 py-2">
            Из Казани
          </Link>
        </div>
      </section>

      <section className="grid gap-4">
        <h2 className="text-2xl font-semibold text-pine-900">Полезные материалы</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {blogPosts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="rounded-xl border border-pine-100 bg-white p-5">
              <h3 className="text-base font-semibold text-pine-900">{post.title}</h3>
              <p className="mt-2 text-sm text-pine-700">{post.excerpt}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
