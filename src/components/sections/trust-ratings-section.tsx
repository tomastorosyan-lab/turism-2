import { SITE_NAME } from "@/lib/brand";

/** Полоса агрегаторов в стиле доверия витрины (оценки — ориентиры для дизайна, не реклама агрегаторов). */
export function TrustRatingsSection() {
  return (
    <section className="border-t border-zinc-200 py-10 md:py-12" aria-label="Рейтинги и отзывы">
      <h2 className="text-center text-lg font-bold text-zinc-900 md:text-xl">Нам доверяют туристы</h2>
      <p className="mx-auto mt-2 max-w-2xl text-center text-sm text-zinc-600">
        Подбор туров в Абхазию на {SITE_NAME}: прозрачные условия и сопровождение для гостей из России.
      </p>
      <ul className="mt-8 flex flex-wrap items-center justify-center gap-6 md:gap-12">
        <li className="text-center">
          <p className="text-2xl font-bold text-zinc-900">4.8</p>
          <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">Google</p>
          <p className="text-xs text-zinc-500">отзывы гостей</p>
        </li>
        <li className="text-center">
          <p className="text-2xl font-bold text-zinc-900">5.0</p>
          <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">Яндекс</p>
          <p className="text-xs text-zinc-500">карты / поиск</p>
        </li>
        <li className="text-center">
          <p className="text-2xl font-bold text-zinc-900">4.7</p>
          <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">Отзывы</p>
          <p className="text-xs text-zinc-500">на сайте</p>
        </li>
      </ul>
      <p className="mt-6 text-center text-[11px] text-zinc-400">
        Цифры приведены как пример отображения; актуальные рейтинги уточняйте на площадках.
      </p>
    </section>
  );
}
