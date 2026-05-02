import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCatalogTourById, type CatalogTour, type TourFormat } from "@/lib/catalog";
import { SITE_NAME, SITE_URL } from "@/lib/brand";
import { formatApproxSold, formatRub } from "@/lib/data";
import { TourCoverImage } from "@/components/catalog/tour-cover-image";
import { Badge } from "@/components/ui/badge";

type Props = { params: Promise<{ tourId: string }> };

function availabilityLabel(a: CatalogTour["availability"]): string {
  if (a === "available") return "Есть места";
  if (a === "limited") return "Мало мест";
  return "Нет мест";
}

function formatTourFormat(f: TourFormat): string {
  if (f === "group") return "Групповой тур";
  return "Индивидуальный формат";
}

function formatGuideLang(g: CatalogTour["guideLang"]): string {
  if (g === "ru") return "Русскоговорящий гид";
  if (g === "en") return "Англоговорящий гид";
  return "По ситуации / уточняется";
}

function audienceLabel(a: CatalogTour["audience"]): string {
  if (a === "premium") return "Премиум";
  if (a === "budget") return "Бюджет";
  return "Семейный";
}

function absoluteTourImageUrl(src: string): string {
  const s = src?.trim() || "/tour-placeholder.svg";
  if (/^https?:\/\//i.test(s)) return s;
  const path = s.startsWith("/") ? s : `/${s}`;
  return `${SITE_URL}${path}`;
}

function metaDescription(tour: CatalogTour): string {
  const plain = tour.description.replace(/\s+/g, " ").trim();
  if (plain.length <= 158) return plain;
  return `${plain.slice(0, 155)}…`;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tourId } = await params;
  const tour = await getCatalogTourById(tourId);
  if (!tour) {
    return { title: `Тур не найден | ${SITE_NAME}` };
  }
  const title = `${tour.title} — тур в Абхазию от ${formatRub(tour.price)}`;
  const description = metaDescription(tour);
  const canonical = `${SITE_URL}/tury/${tourId}`;
  const ogImage = absoluteTourImageUrl(tour.image);

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: SITE_NAME,
      locale: "ru_RU",
      type: "website",
      images: [{ url: ogImage, alt: tour.title }],
    },
  };
}

export default async function TourProductPage({ params }: Props) {
  const { tourId } = await params;
  const tour = await getCatalogTourById(tourId);
  if (!tour) notFound();

  const soldOut = tour.availability === "sold_out";
  const bookingHref = `/booking/${tour.id}`;
  const resortHref = `/kurorty/${tour.resortSlug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: tour.title,
    description: tour.description,
    image: absoluteTourImageUrl(tour.image),
    sku: tour.id,
    brand: { "@type": "Brand", name: SITE_NAME },
    offers: {
      "@type": "Offer",
      url: `${SITE_URL}/tury/${tour.id}`,
      priceCurrency: "RUB",
      price: tour.price,
      availability:
        tour.availability === "sold_out"
          ? "https://schema.org/OutOfStock"
          : tour.availability === "limited"
            ? "https://schema.org/LimitedAvailability"
            : "https://schema.org/InStock",
      seller: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="mx-auto max-w-5xl pb-28 md:pb-12">
        <nav aria-label="Хлебные крошки" className="mb-6 text-sm text-zinc-600">
          <ol className="flex flex-wrap items-center gap-1.5">
            <li>
              <Link href="/" className="text-pine-700 underline-offset-2 hover:underline">
                Главная
              </Link>
            </li>
            <li aria-hidden className="text-zinc-400">
              /
            </li>
            <li>
              <Link href="/tury-abkhazia" className="text-pine-700 underline-offset-2 hover:underline">
                Каталог туров
              </Link>
            </li>
            <li aria-hidden className="text-zinc-400">
              /
            </li>
            <li className="max-w-[min(100%,48ch)] truncate font-medium text-zinc-900">{tour.title}</li>
          </ol>
        </nav>

        <header className="overflow-hidden rounded-2xl border border-zinc-200/90 bg-white shadow-md">
          <div className="grid gap-0 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
            <div className="relative aspect-[4/3] w-full bg-zinc-100 md:aspect-auto md:min-h-[320px]">
              <TourCoverImage
                src={tour.image || "/tour-placeholder.svg"}
                alt={tour.title}
                width={1200}
                height={800}
                priority
                className="h-full w-full object-cover"
                sizes="(max-width: 768px) 100vw, 55vw"
              />
              <div className="pointer-events-none absolute left-3 top-3 flex max-w-[calc(100%-5rem)] flex-wrap gap-1.5">
                {tour.bestseller ? (
                  <Badge variant="onImage" className="rounded-md px-2.5 py-1 text-xs font-semibold shadow-sm">
                    Бестселлер
                  </Badge>
                ) : null}
                {tour.discount ? (
                  <Badge variant="onImage" className="rounded-md bg-rose-600/95 px-2.5 py-1 text-xs font-semibold text-white shadow-sm">
                    Скидка
                  </Badge>
                ) : null}
                {tour.recommended && !tour.bestseller ? (
                  <Badge variant="onImage" className="rounded-md px-2.5 py-1 text-xs font-semibold shadow-sm">
                    Рекомендуем
                  </Badge>
                ) : null}
              </div>
              <div className="pointer-events-none absolute right-3 top-3">
                <Badge variant={soldOut ? "warning" : "onImage"} className="rounded-md px-2.5 py-1 text-xs font-semibold shadow-sm">
                  {availabilityLabel(tour.availability)}
                </Badge>
              </div>
            </div>

            <div className="flex flex-col justify-center gap-4 p-5 md:p-8">
              <p className="text-xs font-medium uppercase tracking-wide text-pine-700">Тур в Абхазию</p>
              <h1 className="text-2xl font-semibold leading-tight tracking-tight text-pine-900 md:text-3xl">{tour.title}</h1>
              <p className="text-sm text-zinc-600">{tour.cardTags.join(" · ")}</p>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
                <span className="inline-flex items-center gap-1 font-semibold text-zinc-900" title="Рейтинг по отзывам">
                  <span className="text-amber-500" aria-hidden>
                    ★
                  </span>
                  {tour.rating.toFixed(1)}
                  <span className="font-normal text-zinc-500">({tour.reviewCount} отзывов)</span>
                </span>
                <span className="text-zinc-300" aria-hidden>
                  |
                </span>
                <span className="text-zinc-600">{formatApproxSold(tour.soldApprox)}</span>
              </div>

              <div className="rounded-xl border border-zinc-100 bg-zinc-50/80 px-4 py-3">
                <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">Цена «от» за программу</p>
                <p className="mt-1 text-3xl font-bold text-pine-900">{formatRub(tour.price)}</p>
                <p className="mt-1 text-sm text-zinc-600">{tour.nights} ночей · курорт {tour.resort}</p>
              </div>

              <div className="hidden flex-col gap-3 md:flex md:flex-row md:flex-wrap">
                {soldOut ? (
                  <Link
                    href="/zayavka"
                    className="inline-flex min-h-[44px] w-full items-center justify-center rounded-full border-2 border-pine-700 bg-white px-6 py-3 text-center text-sm font-semibold text-pine-900 shadow-sm transition hover:bg-pine-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-pine-600 focus-visible:ring-offset-2 md:w-auto md:flex-1"
                  >
                    Подобрать альтернативу
                  </Link>
                ) : (
                  <>
                    <Link
                      href={bookingHref}
                      className="inline-flex min-h-[44px] flex-1 items-center justify-center rounded-full bg-pine-900 px-6 py-3 text-center text-sm font-semibold text-white shadow-sm transition hover:bg-pine-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-pine-600 focus-visible:ring-offset-2"
                    >
                      Забронировать онлайн
                    </Link>
                    <Link
                      href="/zayavka"
                      className="inline-flex min-h-[44px] flex-1 items-center justify-center rounded-full border border-zinc-300 bg-white px-6 py-3 text-center text-sm font-semibold text-zinc-800 shadow-sm transition hover:bg-zinc-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-pine-600 focus-visible:ring-offset-2"
                    >
                      Заявка на подбор
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </header>

        <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_280px] lg:items-start lg:gap-10">
          <div className="space-y-8">
            <section aria-labelledby="tour-about" className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm md:p-7">
              <h2 id="tour-about" className="text-lg font-semibold text-pine-900">
                О туре
              </h2>
              <div className="prose-tour mt-4 max-w-none text-sm leading-relaxed text-zinc-700 [&_p+p]:mt-3">
                {(() => {
                  const parts = tour.description
                    .split("\n")
                    .map((p) => p.trim())
                    .filter(Boolean);
                  if (parts.length > 1) {
                    return parts.map((para, i) => <p key={i}>{para}</p>);
                  }
                  return <p>{parts[0] ?? tour.description}</p>;
                })()}
              </div>
            </section>

            <section aria-labelledby="tour-params" className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm md:p-7">
              <h2 id="tour-params" className="text-lg font-semibold text-pine-900">
                Параметры
              </h2>
              <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
                <div className="rounded-xl border border-zinc-100 bg-zinc-50/80 px-4 py-3">
                  <dt className="text-xs font-medium uppercase tracking-wide text-zinc-500">Ночей</dt>
                  <dd className="mt-1 font-semibold text-zinc-900">{tour.nights}</dd>
                </div>
                <div className="rounded-xl border border-zinc-100 bg-zinc-50/80 px-4 py-3">
                  <dt className="text-xs font-medium uppercase tracking-wide text-zinc-500">Курорт</dt>
                  <dd className="mt-1 font-semibold text-zinc-900">
                    <Link href={resortHref} className="text-pine-800 underline underline-offset-2 hover:text-pine-900">
                      {tour.resort}
                    </Link>
                  </dd>
                </div>
                <div className="rounded-xl border border-zinc-100 bg-zinc-50/80 px-4 py-3">
                  <dt className="text-xs font-medium uppercase tracking-wide text-zinc-500">Формат</dt>
                  <dd className="mt-1 font-semibold text-zinc-900">{formatTourFormat(tour.tourFormat)}</dd>
                </div>
                <div className="rounded-xl border border-zinc-100 bg-zinc-50/80 px-4 py-3">
                  <dt className="text-xs font-medium uppercase tracking-wide text-zinc-500">Сегмент</dt>
                  <dd className="mt-1 font-semibold text-zinc-900">{audienceLabel(tour.audience)}</dd>
                </div>
                <div className="rounded-xl border border-zinc-100 bg-zinc-50/80 px-4 py-3">
                  <dt className="text-xs font-medium uppercase tracking-wide text-zinc-500">Гид / сопровождение</dt>
                  <dd className="mt-1 font-semibold text-zinc-900">{formatGuideLang(tour.guideLang)}</dd>
                </div>
                <div className="rounded-xl border border-zinc-100 bg-zinc-50/80 px-4 py-3">
                  <dt className="text-xs font-medium uppercase tracking-wide text-zinc-500">Наличие мест</dt>
                  <dd className="mt-1 font-semibold text-zinc-900">{availabilityLabel(tour.availability)}</dd>
                </div>
              </dl>
            </section>

            <section aria-labelledby="tour-faq" className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm md:p-7">
              <h2 id="tour-faq" className="text-lg font-semibold text-pine-900">
                Что учесть перед бронью
              </h2>
              <ul className="mt-4 list-inside list-disc space-y-2 text-sm text-zinc-700 marker:text-pine-600">
                <li>Точные даты и состав услуг фиксируются с менеджером после заявки.</li>
                <li>Цена «от» — ориентир; итог зависит от дат вылета и доступности отелей.</li>
                <li>Условия оплаты и отмены — в разделе{" "}
                  <Link href="/oferta" className="font-medium text-pine-800 underline underline-offset-2">
                    оферта
                  </Link>
                  .
                </li>
              </ul>
            </section>
          </div>

          <aside className="space-y-4 lg:sticky lg:top-24">
            <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
              <p className="text-sm font-semibold text-zinc-900">Нужна помощь с выбором?</p>
              <p className="mt-2 text-sm leading-relaxed text-zinc-600">
                Менеджер уточнит даты, трансфер и формат отдыха под ваш запрос.
              </p>
              <Link
                href="/zayavka"
                className="mt-4 inline-flex min-h-[44px] w-full items-center justify-center rounded-full border border-pine-700 bg-pine-50 px-4 py-2.5 text-sm font-semibold text-pine-900 transition hover:bg-pine-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-pine-600 focus-visible:ring-offset-2"
              >
                Оставить заявку
              </Link>
            </div>
            <div className="rounded-2xl border border-dashed border-zinc-200 bg-zinc-50/80 p-4 text-xs leading-relaxed text-zinc-600">
              <p className="font-medium text-zinc-800">{SITE_NAME}</p>
              <p className="mt-1">
                Бронь и оплата проходят на защищённых страницах сайта. Детали заказа можно уточнить до оплаты.
              </p>
            </div>
          </aside>
        </div>
      </div>

      {/* Мобильная панель CTA */}
      <div
        className="fixed bottom-0 left-0 right-0 z-40 border-t border-zinc-200 bg-white/95 p-3 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] backdrop-blur-md md:hidden"
        style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
      >
        <div className="mx-auto flex max-w-5xl gap-2">
          {soldOut ? (
            <Link
              href="/zayavka"
              className="inline-flex min-h-[48px] flex-1 items-center justify-center rounded-full bg-pine-900 px-4 text-sm font-semibold text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-pine-600 focus-visible:ring-offset-2"
            >
              Подобрать альтернативу
            </Link>
          ) : (
            <>
              <Link
                href={bookingHref}
                className="inline-flex min-h-[48px] flex-[1.2] items-center justify-center rounded-full bg-pine-900 px-4 text-sm font-semibold text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-pine-600 focus-visible:ring-offset-2"
              >
                Забронировать
              </Link>
              <Link
                href="/zayavka"
                className="inline-flex min-h-[48px] flex-1 items-center justify-center rounded-full border border-zinc-300 bg-white px-3 text-sm font-semibold text-zinc-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-pine-600 focus-visible:ring-offset-2"
              >
                Подбор
              </Link>
            </>
          )}
        </div>
      </div>
    </>
  );
}
