"use client";

import { useMemo, useState } from "react";
import { hotels, type Hotel } from "@/lib/hotels-data";
import { HotelCard } from "@/components/hotels/hotel-card";

const resortFilters = [
  { value: "", label: "Все курорты" },
  { value: "gagra", label: "Гагра" },
  { value: "pitsunda", label: "Пицунда" },
  { value: "sukhum", label: "Сухум" },
  { value: "new-afon", label: "Новый Афон" },
];

const sortOptions = [
  { value: "rating", label: "По рейтингу" },
  { value: "price-asc", label: "Цена ↑" },
  { value: "price-desc", label: "Цена ↓" },
] as const;

export function HotelCatalog() {
  const [q, setQ] = useState("");
  const [resort, setResort] = useState("");
  const [sort, setSort] = useState<(typeof sortOptions)[number]["value"]>("rating");
  const [visible, setVisible] = useState(6);

  const filtered = useMemo(() => {
    let list: Hotel[] = [...hotels];
    const qq = q.trim().toLowerCase();
    if (qq) {
      list = list.filter(
        (h) =>
          h.name.toLowerCase().includes(qq) ||
          h.short.toLowerCase().includes(qq) ||
          h.tags.some((t) => t.toLowerCase().includes(qq))
      );
    }
    if (resort) {
      list = list.filter((h) => h.resortSlug === resort);
    }
    list.sort((a, b) => {
      if (sort === "price-asc") return a.priceFrom - b.priceFrom;
      if (sort === "price-desc") return b.priceFrom - a.priceFrom;
      return b.rating - a.rating;
    });
    return list;
  }, [q, resort, sort]);

  const slice = filtered.slice(0, visible);
  const canMore = visible < filtered.length;

  return (
    <div className="grid gap-6">
      <div className="rounded-2xl border border-pine-100 bg-white p-4 shadow-sm md:p-6">
        <div className="grid gap-3 md:grid-cols-3">
          <label className="grid gap-1 text-sm">
            <span className="text-pine-700">Поиск по отелям</span>
            <input
              type="search"
              value={q}
              onChange={(e) => {
                setQ(e.target.value);
                setVisible(6);
              }}
              className="rounded-xl border border-pine-200 px-3 py-2 outline-none focus:border-pine-600 focus:ring-1 focus:ring-pine-600"
              placeholder="Название, тег…"
            />
          </label>
          <label className="grid gap-1 text-sm">
            <span className="text-pine-700">Курорт</span>
            <select
              value={resort}
              onChange={(e) => {
                setResort(e.target.value);
                setVisible(6);
              }}
              className="rounded-xl border border-pine-200 bg-white px-3 py-2 outline-none focus:border-pine-600 focus:ring-1 focus:ring-pine-600"
            >
              {resortFilters.map((o) => (
                <option key={o.label} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </label>
          <label className="grid gap-1 text-sm">
            <span className="text-pine-700">Сортировка</span>
            <select
              value={sort}
              onChange={(e) =>
                setSort(e.target.value as (typeof sortOptions)[number]["value"])
              }
              className="rounded-xl border border-pine-200 bg-white px-3 py-2 outline-none focus:border-pine-600 focus:ring-1 focus:ring-pine-600"
            >
              {sortOptions.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="rounded-xl border border-pine-100 bg-pine-50 px-4 py-8 text-center text-sm text-pine-800">
          Отелей не найдено. Попробуйте другой запрос или оставьте заявку — подберём вручную.
        </p>
      ) : (
        <ul className="grid gap-5 md:grid-cols-2">
          {slice.map((h) => (
            <li key={h.id}>
              <HotelCard hotel={h} />
            </li>
          ))}
        </ul>
      )}

      {canMore ? (
        <div className="flex justify-center">
          <button
            type="button"
            onClick={() => setVisible((v) => v + 6)}
            className="rounded-full border border-pine-300 bg-white px-8 py-3 text-sm font-medium text-pine-900 hover:bg-pine-50"
          >
            Показать ещё
          </button>
        </div>
      ) : null}
    </div>
  );
}
