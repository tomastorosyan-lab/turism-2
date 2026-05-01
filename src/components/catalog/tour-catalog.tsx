"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ButtonHTMLAttributes,
  type ReactNode,
} from "react";
import type { CatalogAudience, CatalogDuration, CatalogTour, TourFormat } from "@/lib/catalog";
import { TourCard } from "@/components/catalog/tour-card";
import { SITE_NAME } from "@/lib/brand";
import { formatRub } from "@/lib/data";

type InitialPayload = {
  items: CatalogTour[];
  total: number;
  page: number;
  limit: number;
  priceBounds: { min: number; max: number };
};

const sortOptions = [
  { value: "popular", label: "Популярные" },
  { value: "rating-desc", label: "По рейтингу" },
  { value: "price-asc", label: "Сначала дешевле" },
  { value: "price-desc", label: "Сначала дороже" },
] as const;

const resortChips: { value: string; label: string }[] = [
  { value: "", label: "Все" },
  { value: "gagra", label: "Гагра" },
  { value: "pitsunda", label: "Пицунда" },
  { value: "sukhum", label: "Сухум" },
  { value: "new-afon", label: "Новый Афон" },
];

const spotlightOptions: { value: "recommended" | "bestseller" | "discount"; label: string }[] = [
  { value: "recommended", label: "Рекомендуем" },
  { value: "bestseller", label: "Бестселлер" },
  { value: "discount", label: "Скидка" },
];

const durationOptions: { value: CatalogDuration; label: string }[] = [
  { value: "", label: "Любая" },
  { value: "lte5", label: "До 5 ночей" },
  { value: "6to7", label: "6–7 ночей" },
  { value: "gte8", label: "8+ ночей" },
];

const formatOptions: { value: "" | TourFormat; label: string }[] = [
  { value: "", label: "Любой" },
  { value: "group", label: "Групповой" },
  { value: "individual", label: "Индивидуальный" },
];

const guideOptions: { value: "" | "ru" | "en"; label: string }[] = [
  { value: "", label: "Любой" },
  { value: "ru", label: "Русскоговорящий гид — водитель" },
  { value: "en", label: "Англоговорящий гид — водитель" },
];

function buildQuery(params: {
  q: string;
  resort: string;
  audience: "" | CatalogAudience;
  sort: (typeof sortOptions)[number]["value"];
  page: number;
  limit: number;
  priceMin: number;
  priceMax: number;
  priceFullMin: number;
  priceFullMax: number;
  duration: CatalogDuration;
  spotlight: "" | "recommended" | "bestseller" | "discount";
  tourFormat: "" | TourFormat;
  guideLang: "" | "ru" | "en";
}) {
  const sp = new URLSearchParams();
  if (params.q.trim()) sp.set("q", params.q.trim());
  if (params.resort) sp.set("resort", params.resort);
  if (params.audience) sp.set("audience", params.audience);
  sp.set("sort", params.sort);
  sp.set("page", String(params.page));
  sp.set("limit", String(params.limit));
  if (params.priceMin > params.priceFullMin) sp.set("priceMin", String(Math.round(params.priceMin)));
  if (params.priceMax < params.priceFullMax) sp.set("priceMax", String(Math.round(params.priceMax)));
  if (params.duration) sp.set("duration", params.duration);
  if (params.spotlight) sp.set("spotlight", params.spotlight);
  if (params.tourFormat) sp.set("tourFormat", params.tourFormat);
  if (params.guideLang) sp.set("guideLang", params.guideLang);
  return sp.toString();
}

function FilterSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="border-b border-zinc-100 pb-4 last:border-b-0 last:pb-0">
      <p className="mb-2.5 text-[11px] font-bold uppercase tracking-[0.14em] text-zinc-400">{title}</p>
      {children}
    </div>
  );
}

function Chip({
  active,
  children,
  onClick,
  className = "",
  disabled,
  ...rest
}: {
  active: boolean;
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "type">) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={`rounded-full border px-3 py-1.5 text-left text-xs font-medium transition ${
        active
          ? "border-pine-700 bg-pine-700 text-white shadow-sm"
          : "border-zinc-200 bg-white text-zinc-800 hover:border-zinc-400"
      } disabled:cursor-not-allowed disabled:opacity-55 ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}

export function TourCatalog({
  initial,
  heading = "Все туры и отдых в Абхазии",
  showSeoNote = false,
  showIntro = true,
}: {
  initial: InitialPayload;
  /** Заголовок с количеством в правой колонке (как H1 витрины). */
  heading?: string;
  /** Развёрнутая SEO-справка — на посадочной /tury-abkhazia. */
  showSeoNote?: boolean;
  /** Подзаголовок под H1: на главной в стиле витрины можно отключить. */
  showIntro?: boolean;
}) {
  const bounds0 = initial.priceBounds;
  const [globalBounds] = useState(() => bounds0);
  const [q, setQ] = useState("");
  const [qDebounced, setQDebounced] = useState("");
  const [resort, setResort] = useState("");
  const [audience, setAudience] = useState<"" | CatalogAudience>("");
  const [sort, setSort] = useState<(typeof sortOptions)[number]["value"]>("popular");
  const [page, setPage] = useState(1);
  const [items, setItems] = useState<CatalogTour[]>(initial.items);
  const [total, setTotal] = useState(initial.total);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const skipNextFilterFetch = useRef(true);
  const [priceLo, setPriceLo] = useState(bounds0.min);
  const [priceHi, setPriceHi] = useState(bounds0.max);
  const [duration, setDuration] = useState<CatalogDuration>("");
  const [spotlight, setSpotlight] = useState<"" | "recommended" | "bestseller" | "discount">("");
  const [tourFormat, setTourFormat] = useState<"" | TourFormat>("");
  const [guideLang, setGuideLang] = useState<"" | "ru" | "en">("");

  const limit = 12;

  useEffect(() => {
    const t = setTimeout(() => setQDebounced(q), 320);
    return () => clearTimeout(t);
  }, [q]);

  const fetchPage = useCallback(
    async (nextPage: number, append: boolean) => {
      setLoading(true);
      setError(null);
      try {
        const qs = buildQuery({
          q: qDebounced,
          resort,
          audience,
          sort,
          page: nextPage,
          limit,
          priceMin: priceLo,
          priceMax: priceHi,
          priceFullMin: globalBounds.min,
          priceFullMax: globalBounds.max,
          duration,
          spotlight,
          tourFormat,
          guideLang,
        });
        const res = await fetch(`/api/catalog/tours?${qs}`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = (await res.json()) as InitialPayload;
        setTotal(data.total);
        setPage(data.page);
        if (append) {
          setItems((prev) => {
            const seen = new Set(prev.map((x) => x.id));
            const merged = [...prev];
            for (const it of data.items) {
              if (!seen.has(it.id)) merged.push(it);
            }
            return merged;
          });
        } else {
          setItems(data.items);
        }
      } catch {
        setError("Не удалось загрузить каталог. Проверьте сеть и попробуйте снова.");
      } finally {
        setLoading(false);
      }
    },
    [
      audience,
      duration,
      guideLang,
      globalBounds.max,
      globalBounds.min,
      priceHi,
      priceLo,
      qDebounced,
      resort,
      sort,
      spotlight,
      tourFormat,
    ]
  );

  useEffect(() => {
    if (skipNextFilterFetch.current) {
      skipNextFilterFetch.current = false;
      return;
    }
    setPage(1);
    void fetchPage(1, false);
  }, [qDebounced, resort, audience, sort, priceLo, priceHi, duration, spotlight, tourFormat, guideLang, fetchPage]);

  const canLoadMore = items.length < total;

  const loadMore = () => {
    if (!canLoadMore || loading) return;
    void fetchPage(page + 1, true);
  };

  const resetFilters = () => {
    setQ("");
    setQDebounced("");
    setResort("");
    setAudience("");
    setSort("popular");
    setPriceLo(globalBounds.min);
    setPriceHi(globalBounds.max);
    setDuration("");
    setSpotlight("");
    setTourFormat("");
    setGuideLang("");
  };

  const activeFilters = useMemo(
    () =>
      Boolean(
        qDebounced ||
          resort ||
          audience ||
          sort !== "popular" ||
          priceLo > globalBounds.min ||
          priceHi < globalBounds.max ||
          duration ||
          spotlight ||
          tourFormat ||
          guideLang
      ),
    [
      audience,
      duration,
      guideLang,
      globalBounds.max,
      globalBounds.min,
      priceHi,
      priceLo,
      qDebounced,
      resort,
      sort,
      spotlight,
      tourFormat,
    ]
  );

  const onPriceLo = (v: number) => {
    const n = Math.min(v, priceHi);
    setPriceLo(n);
  };
  const onPriceHi = (v: number) => {
    const n = Math.max(v, priceLo);
    setPriceHi(n);
  };

  const toggleSpotlight = (v: "recommended" | "bestseller" | "discount") => {
    setSpotlight((s) => (s === v ? "" : v));
  };

  const filterAside = (
    <aside className="w-full shrink-0 lg:sticky lg:top-20">
      <div className="rounded-xl border border-zinc-200 bg-white p-4 shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
        <FilterSection title="Поиск">
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Название, курорт…"
            className="w-full rounded-lg border border-zinc-200 bg-zinc-50/80 px-3 py-2.5 text-sm text-zinc-900 outline-none placeholder:text-zinc-400 focus:border-pine-600 focus:bg-white focus:ring-1 focus:ring-pine-600"
            autoComplete="off"
          />
        </FilterSection>

        <div className="mt-4 space-y-4">
          <FilterSection title="Подборки">
            <div className="flex flex-wrap gap-2">
              {spotlightOptions.map((o) => (
                <Chip key={o.value} active={spotlight === o.value} onClick={() => toggleSpotlight(o.value)}>
                  {o.label}
                </Chip>
              ))}
            </div>
          </FilterSection>

          <FilterSection title="Курорты">
            <div className="flex flex-wrap gap-2">
              {resortChips.map((o) => (
                <Chip key={o.label} active={resort === o.value} onClick={() => setResort(o.value)}>
                  {o.label}
                </Chip>
              ))}
            </div>
          </FilterSection>

          <FilterSection title="Дата заезда">
            <p className="mb-2 text-[11px] leading-relaxed text-zinc-500">
              Точные даты фиксируются при брони; здесь — ориентир по планированию.
            </p>
            <div className="flex flex-wrap gap-2">
              <Chip active={false} onClick={() => {}} className="opacity-60" disabled title="Скоро">
                Сегодня
              </Chip>
              <Chip active={false} onClick={() => {}} className="opacity-60" disabled title="Скоро">
                Завтра
              </Chip>
              <Chip active onClick={() => {}}>
                Все даты
              </Chip>
            </div>
          </FilterSection>

          <FilterSection title="Цена">
            <div className="grid gap-3">
              <div className="flex justify-between text-xs font-medium text-pine-700">
                <span>{formatRub(priceLo)}</span>
                <span>{formatRub(priceHi)}</span>
              </div>
              <input
                type="range"
                min={globalBounds.min}
                max={globalBounds.max}
                step={Math.max(1000, Math.round((globalBounds.max - globalBounds.min) / 200))}
                value={priceLo}
                onChange={(e) => onPriceLo(Number(e.target.value))}
                className="h-2 w-full cursor-pointer accent-pine-700"
                aria-label="Минимальная цена"
              />
              <input
                type="range"
                min={globalBounds.min}
                max={globalBounds.max}
                step={Math.max(1000, Math.round((globalBounds.max - globalBounds.min) / 200))}
                value={priceHi}
                onChange={(e) => onPriceHi(Number(e.target.value))}
                className="h-2 w-full cursor-pointer accent-pine-700"
                aria-label="Максимальная цена"
              />
            </div>
          </FilterSection>

          <FilterSection title="Длительность">
            <div className="flex flex-wrap gap-2">
              {durationOptions.map((o) => (
                <Chip key={o.label} active={duration === o.value} onClick={() => setDuration(o.value)}>
                  {o.label}
                </Chip>
              ))}
            </div>
          </FilterSection>

          <FilterSection title="Тур">
            <div className="flex flex-wrap gap-2">
              {formatOptions.map((o) => (
                <Chip key={o.label} active={tourFormat === o.value} onClick={() => setTourFormat(o.value)}>
                  {o.label}
                </Chip>
              ))}
            </div>
          </FilterSection>

          <FilterSection title="Гид">
            <div className="flex flex-wrap gap-2">
              {guideOptions.map((o) => (
                <Chip key={o.label} active={guideLang === o.value} onClick={() => setGuideLang(o.value)}>
                  {o.label}
                </Chip>
              ))}
              <Chip active={false} onClick={() => {}} disabled title="Скоро" className="opacity-50">
                Франкоговорящий гид
              </Chip>
              <Chip active={false} onClick={() => {}} disabled title="Скоро" className="opacity-50">
                Англоговорящий водитель
              </Chip>
            </div>
          </FilterSection>

          <FilterSection title="Формат отдыха">
            <div className="flex flex-wrap gap-2">
              <Chip active={audience === ""} onClick={() => setAudience("")}>
                Все
              </Chip>
              <Chip active={audience === "family"} onClick={() => setAudience("family")}>
                Семейный
              </Chip>
              <Chip active={audience === "budget"} onClick={() => setAudience("budget")}>
                Бюджет
              </Chip>
              <Chip active={audience === "premium"} onClick={() => setAudience("premium")}>
                Премиум
              </Chip>
            </div>
          </FilterSection>
        </div>

        {activeFilters ? (
          <button
            type="button"
            onClick={resetFilters}
            className="mt-4 w-full rounded-lg border border-zinc-300 bg-zinc-50 py-2.5 text-sm font-semibold text-zinc-900 transition hover:bg-zinc-100"
          >
            Сбросить фильтры
          </button>
        ) : null}
      </div>
    </aside>
  );

  return (
    <div className="grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)] lg:items-start lg:gap-8">
      {filterAside}

      <div className="min-w-0">
        <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <h1 className="text-2xl font-bold leading-tight tracking-tight text-zinc-900 md:text-3xl">
            {heading}{" "}
            <span className="whitespace-nowrap font-semibold text-zinc-500">
              ({total}
              {loading ? "…" : ""})
            </span>
          </h1>
          <label className="flex shrink-0 items-center gap-2 text-sm text-zinc-700">
            <span className="font-medium text-zinc-500">Сортировка</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as (typeof sortOptions)[number]["value"])}
              className="rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm font-medium text-zinc-900 outline-none focus:border-pine-600 focus:ring-1 focus:ring-pine-600"
            >
              {sortOptions.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </label>
        </div>

        {showIntro ? (
          showSeoNote ? (
            <p className="mb-6 max-w-3xl text-sm leading-relaxed text-zinc-600">
              Каталог {SITE_NAME}: фильтры не меняют URL — без дублей для поисковиков. Бронь и{" "}
              <a href="/zayavka" className="font-medium text-pine-800 underline underline-offset-2">
                заявка на подбор
              </a>
              .
            </p>
          ) : (
            <p className="mb-6 max-w-3xl text-sm leading-relaxed text-zinc-600">
              Онлайн-подбор туров в Абхазию для гостей из России — цены «от», менеджер и{" "}
              <a href="/zayavka" className="font-medium text-pine-800 underline underline-offset-2">
                индивидуальный запрос
              </a>
              .
            </p>
          )
        ) : null}

        {error ? (
          <p className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800" role="alert">
            {error}
          </p>
        ) : null}

        {loading && items.length === 0 ? (
          <p className="text-sm text-pine-600">Загружаем предложения…</p>
        ) : null}

        {!loading && items.length === 0 ? (
          <p className="rounded-xl border border-pine-100 bg-pine-50 px-4 py-10 text-center text-sm text-pine-800">
            По выбранным условиям туров нет. Измените фильтры или оставьте{" "}
            <a href="/zayavka" className="font-medium underline">
              заявку на подбор
            </a>
            .
          </p>
        ) : (
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 xl:gap-5">
            {items.map((tour) => (
              <li key={tour.id}>
                <TourCard tour={tour} />
              </li>
            ))}
          </ul>
        )}

        {canLoadMore ? (
          <div className="mt-8 flex justify-center">
            <button
              type="button"
              onClick={loadMore}
              disabled={loading}
              className="rounded-lg border-2 border-pine-200 bg-white px-10 py-3 text-sm font-semibold text-pine-900 shadow-sm transition hover:border-pine-400 hover:bg-pine-50 disabled:opacity-50"
            >
              {loading ? "Загрузка…" : "Показать ещё"}
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}

