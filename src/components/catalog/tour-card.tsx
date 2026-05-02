import Link from "next/link";
import type { CatalogTour } from "@/lib/catalog";
import { formatApproxSold, formatRub } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { TourCoverImage } from "@/components/catalog/tour-cover-image";

function availabilityLabel(a: CatalogTour["availability"]): string {
  if (a === "available") return "Есть места";
  if (a === "limited") return "Мало мест";
  return "Нет мест";
}

export function TourCard({ tour }: { tour: CatalogTour }) {
  const soldOut = tour.availability === "sold_out";

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.05)] transition hover:-translate-y-px hover:shadow-[0_4px_14px_rgba(0,0,0,0.08)]">
      <Link href={`/booking/${tour.id}`} className="flex flex-1 flex-col outline-none focus-visible:ring-2 focus-visible:ring-pine-600 focus-visible:ring-offset-2">
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-zinc-100">
          <TourCoverImage
            src={tour.image || "/tour-placeholder.svg"}
            alt={tour.title}
            width={480}
            height={360}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          <div className="absolute left-2.5 top-2.5 flex max-w-[calc(100%-4.5rem)] flex-wrap gap-1">
            {tour.bestseller ? (
              <Badge variant="onImage" className="rounded px-2 py-0.5 text-[11px] font-semibold">
                Бестселлер
              </Badge>
            ) : null}
            {tour.discount ? (
              <Badge variant="onImage" className="rounded bg-rose-600/90 px-2 py-0.5 text-[11px] font-semibold text-white">
                Скидка
              </Badge>
            ) : null}
            {tour.recommended && !tour.bestseller ? (
              <Badge variant="onImage" className="rounded px-2 py-0.5 text-[11px] font-semibold">
                Рекомендуем
              </Badge>
            ) : null}
          </div>
          <div className="absolute right-2.5 top-2.5">
            <Badge variant={soldOut ? "warning" : "onImage"} className="rounded px-2 py-0.5 text-[11px]">
              {availabilityLabel(tour.availability)}
            </Badge>
          </div>
        </div>
        <div className="flex flex-1 flex-col px-3 pb-3 pt-2.5 sm:px-3.5 sm:pb-3.5 sm:pt-3">
          <p className="text-[11px] font-medium leading-snug text-zinc-500 sm:text-xs">
            {tour.cardTags.join(" · ")}
          </p>
          <h3 className="mt-1.5 text-[15px] font-semibold leading-snug text-zinc-900 sm:text-base">{tour.title}</h3>
          <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-zinc-600 sm:text-[13px]">{tour.description}</p>
          <div className="mt-2.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-zinc-800">
            <span className="inline-flex items-center gap-0.5 font-semibold" title="Рейтинг по отзывам">
              <span className="text-amber-500">★</span>
              {tour.rating.toFixed(1)}
            </span>
            <span className="text-zinc-300">|</span>
            <span className="text-zinc-500">{formatApproxSold(tour.soldApprox)}</span>
          </div>
          <div className="mt-auto flex flex-wrap items-end justify-between gap-2 border-t border-zinc-100 pt-3">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-wide text-zinc-400">от</p>
              <p className="text-lg font-bold leading-none text-zinc-900 sm:text-xl">{formatRub(tour.price)}</p>
              <p className="mt-0.5 text-[11px] text-zinc-500">{tour.nights} ночей</p>
            </div>
            <span className="rounded-lg bg-pine-900 px-4 py-2 text-center text-xs font-semibold text-white sm:text-sm">
              Забронировать
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
