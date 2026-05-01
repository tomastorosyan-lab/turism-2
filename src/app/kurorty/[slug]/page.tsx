import Link from "next/link";
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
      <header className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-wider text-pine-600">
          {SITE_NAME} · Курорты Абхазии
        </p>
        <h1 className="mt-2 text-3xl font-semibold text-pine-900 md:text-4xl">{resort.name}</h1>
        <p className="mt-4 text-pine-700">{resort.short}</p>
        <Link
          href="/zayavka"
          className="mt-6 inline-flex rounded-full bg-pine-900 px-6 py-3 text-sm font-semibold text-white hover:bg-pine-700"
        >
          Заявка на подбор в {resort.name}
        </Link>
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
