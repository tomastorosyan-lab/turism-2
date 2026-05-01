import Link from "next/link";
import { formatRub } from "@/lib/data";
import type { Hotel } from "@/lib/hotels-data";
import { Badge } from "@/components/ui/badge";

export function HotelCard({ hotel }: { hotel: Hotel }) {
  return (
    <article className="flex h-full flex-col rounded-2xl border border-pine-100/80 bg-white p-5 shadow-md transition hover:border-pine-200 hover:shadow-lg">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-pine-600">{hotel.resortName}</p>
          <h3 className="mt-1 text-lg font-semibold text-pine-900">{hotel.name}</h3>
        </div>
        <span className="flex shrink-0 items-center gap-1 rounded-lg bg-pine-50 px-2 py-1 text-sm font-medium text-pine-900">
          ★ {hotel.rating.toFixed(1)}
          <span className="font-normal text-pine-600">({hotel.reviewCount})</span>
        </span>
      </div>
      <p className="mt-3 text-sm text-pine-700">{hotel.short}</p>
      {typeof hotel.beachMeters === "number" ? (
        <p className="mt-2 text-xs text-pine-600">До пляжа: ~{hotel.beachMeters} м</p>
      ) : null}
      <div className="mt-3 flex flex-wrap gap-1.5">
        {hotel.tags.map((t) => (
          <Badge key={t} variant="muted">
            {t}
          </Badge>
        ))}
      </div>
      <div className="mt-auto flex flex-wrap items-end justify-between gap-3 pt-4">
        <div>
          <p className="text-xs text-pine-600">от / сутки</p>
          <p className="text-lg font-semibold text-pine-900">{formatRub(hotel.priceFrom)}</p>
        </div>
        <div className="flex flex-col items-end gap-2">
          <Link
            href={`/kurorty/${hotel.resortSlug}`}
            className="text-sm font-medium text-pine-700 underline-offset-2 hover:underline"
          >
            Курорт
          </Link>
          <Link
            href="/zayavka"
            className="rounded-full bg-pine-900 px-4 py-2 text-sm font-medium text-white hover:bg-pine-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-pine-600 focus-visible:ring-offset-2"
          >
            Заявка на отель
          </Link>
        </div>
      </div>
    </article>
  );
}
