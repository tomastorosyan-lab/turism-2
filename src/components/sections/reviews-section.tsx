import { reviewsSeed } from "@/lib/site-content";
import { SITE_NAME } from "@/lib/brand";

export function ReviewsSection() {
  return (
    <section className="grid gap-6" aria-labelledby="reviews-heading">
      <div>
        <h2 id="reviews-heading" className="text-2xl font-semibold text-pine-900 md:text-3xl">
          Отзывы о поездках через {SITE_NAME}
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-pine-700">
          Мнения туристов из России об отдыхе в Абхазии и работе сервиса на abkhaziatrip.ru (демо-выборка для
          ознакомления).
        </p>
      </div>
      <ul className="grid gap-4 md:grid-cols-3">
        {reviewsSeed.map((r) => (
          <li
            key={r.id}
            className="flex flex-col rounded-2xl border border-pine-100 bg-white p-5 shadow-sm"
          >
            <div className="flex items-center justify-between gap-2">
              <p className="font-medium text-pine-900">{r.author}</p>
              <span className="text-sm text-amber-700">★ {r.rating}</span>
            </div>
            <p className="text-xs text-pine-600">
              {r.city} · {r.date} · {r.tourLabel}
            </p>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-pine-800">{r.text}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
