"use client";

import { useMemo, useState } from "react";
import { reviewsSeed } from "@/lib/site-content";
import { SITE_NAME } from "@/lib/brand";

type Tab = "all" | "photo" | "recent";

export function ReviewsMarketplaceSection() {
  const [tab, setTab] = useState<Tab>("all");

  const sorted = useMemo(() => {
    const list = [...reviewsSeed];
    if (tab === "recent") list.sort((a, b) => b.date.localeCompare(a.date));
    return list;
  }, [tab]);

  const tabs: { id: Tab; label: string }[] = [
    { id: "all", label: "Все" },
    { id: "photo", label: "С фото" },
    { id: "recent", label: "Самые поздние" },
  ];

  return (
    <section className="border-t border-zinc-200 py-12 md:py-16" aria-labelledby="reviews-mkt-heading">
      <h2 id="reviews-mkt-heading" className="text-xl font-bold tracking-tight text-zinc-900 md:text-2xl">
        Отзывы путешественников
      </h2>
      <p className="mt-2 max-w-2xl text-sm text-zinc-600">
        Опыт гостей {SITE_NAME} по поездкам в Абхазию (демо-подборка для макета сайта).
      </p>
      <div className="mt-5 flex flex-wrap gap-2">
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
              tab === t.id
                ? "border-pine-700 bg-pine-700 text-white"
                : "border-zinc-200 bg-white text-zinc-800 hover:border-zinc-400"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>
      <ul className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {sorted.map((r) => (
          <li
            key={r.id}
            className="flex flex-col rounded-xl border border-zinc-200 bg-white p-5 shadow-[0_1px_3px_rgba(0,0,0,0.06)]"
          >
            <div className="flex items-start justify-between gap-2">
              <p className="font-semibold text-zinc-900">{r.author}</p>
              <span className="shrink-0 text-amber-600">★ {r.rating}</span>
            </div>
            <p className="mt-1 text-xs text-zinc-500">
              {r.date} · {r.tourLabel}
            </p>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-zinc-800">{r.text}</p>
            <p className="mt-3 text-xs text-zinc-400">Отметили полезным — скоро</p>
          </li>
        ))}
      </ul>
      <div className="mt-6 flex justify-center">
        <button
          type="button"
          className="rounded-full border border-zinc-300 bg-white px-8 py-2.5 text-sm font-semibold text-zinc-800 hover:bg-zinc-50"
          disabled
        >
          + Ещё отзывы
        </button>
      </div>
    </section>
  );
}
