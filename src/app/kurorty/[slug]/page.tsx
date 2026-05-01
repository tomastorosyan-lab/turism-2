import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { formatRub, resorts } from "@/lib/data";
import { readOperatorOffers } from "@/lib/operator-offers";
import { offerToCatalogTour } from "@/lib/catalog";
import { TourCard } from "@/components/catalog/tour-card";
import { hotels } from "@/lib/hotels-data";
import { SITE_NAME, SITE_URL } from "@/lib/brand";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const resort = resorts.find((item) => item.slug === slug);
  if (!resort) return { title: "Курорт" };
  return {
    title: `Отдых и туры — ${resort.name}`,
    description: `Курорт ${resort.name}: туры и отели в Абхазии через ${SITE_NAME}. Подбор на abkhaziatrip.ru.`,
    alternates: { canonical: `${SITE_URL}/kurorty/${slug}` },
    openGraph: {
      images: [{ url: resort.coverImage, alt: resort.coverImageAlt }],
    },
  };
}

export default async function ResortPage({ params }: Props) {
  const { slug } = await params;
  const resort = resorts.find((item) => item.slug === slug);
  if (!resort) notFound();
  const offers = await readOperatorOffers();
  const resortTours = offers
    .filter((item) => item.resort === resort.name)
    .map(offerToCatalogTour);
  const resortHotels = hotels.filter((h) => h.resortSlug === slug);

  return (
    <div className="grid gap-10">
      <header className="overflow-hidden rounded-3xl border border-pine-100/80 bg-pine-900 shadow-lg">
        <div className="relative aspect-[21/9] min-h-[200px] w-full md:aspect-[24/9] md:min-h-[260px]">
          <Image
            src={resort.coverImage}
            alt={resort.coverImageAlt}
            fill
            priority
            className="object-cover object-center"
            sizes="(max-width: 768px) 100vw, min(1200px, 100vw)"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-pine-950/90 via-pine-950/35 to-transparent" aria-hidden />
          <div className="absolute inset-x-0 bottom-0 p-5 md:p-8">
            <p className="text-xs font-semibold uppercase tracking-wider text-white/90">
              {SITE_NAME} · Курорты Абхазии
            </p>
            <h1 className="mt-2 max-w-3xl text-3xl font-semibold text-white md:text-4xl">{resort.name}</h1>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/95 md:text-base">{resort.short}</p>
            <Link
              href="/zayavka"
              className="mt-6 inline-flex rounded-full bg-white px-6 py-3 text-sm font-semibold text-pine-900 shadow-md hover:bg-pine-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              Заявка на подбор в {resort.name}
            </Link>
          </div>
        </div>
      </header>

      <section className="rounded-2xl border border-pine-100 bg-white p-6 shadow-sm" aria-labelledby="why-resort">
        <h2 id="why-resort" className="text-xl font-semibold text-pine-900">
          Почему выбирают {resort.name}
        </h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-pine-700">
          {resort.highlights.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="grid gap-4" aria-labelledby="tours-resort">
        <h2 id="tours-resort" className="text-2xl font-semibold text-pine-900">
          Туры по курорту
        </h2>
        {resortTours.length === 0 ? (
          <p className="text-sm text-pine-700">
            Витрина туров обновляется.{" "}
            <Link href="/tury-abkhazia" className="font-medium underline">
              Все туры
            </Link>
          </p>
        ) : (
          <ul className="grid gap-5 md:grid-cols-2">
            {resortTours.map((tour) => (
              <li key={tour.id}>
                <TourCard tour={tour} />
              </li>
            ))}
          </ul>
        )}
      </section>

      {resortHotels.length > 0 ? (
        <section className="grid gap-4" aria-labelledby="hotels-resort">
          <h2 id="hotels-resort" className="text-2xl font-semibold text-pine-900">
            Отели в {resort.name}
          </h2>
          <ul className="grid gap-3 md:grid-cols-2">
            {resortHotels.map((h) => (
              <li key={h.id} className="rounded-xl border border-pine-100 bg-white p-4 text-sm shadow-sm">
                <p className="font-semibold text-pine-900">{h.name}</p>
                <p className="mt-1 text-pine-700">{h.short}</p>
                <p className="mt-2 text-pine-600">
                  ★ {h.rating.toFixed(1)} · от {formatRub(h.priceFrom)} / сутки
                </p>
                <Link href="/zayavka" className="mt-2 inline-block text-sm font-medium text-pine-800 underline">
                  Заявка на отель
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  );
}
