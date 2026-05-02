import { readOperatorOffers, type OperatorOffer } from "@/lib/operator-offers";
import { resortNameToSlug } from "@/lib/hotels-data";

export type CatalogAudience = "budget" | "family" | "premium";

export type TourFormat = "group" | "individual";

export type CatalogTour = {
  id: string;
  title: string;
  description: string;
  image: string;
  resort: string;
  resortSlug: string;
  nights: number;
  price: number;
  availability: OperatorOffer["availability"];
  rating: number;
  reviewCount: number;
  badges: string[];
  audience: CatalogAudience;
  cityDeparture: string[];
  /** Примерное число проданных мест для отображения (как на витринах-маркетплейсах). */
  soldApprox: number;
  tourFormat: TourFormat;
  guideLang: "ru" | "en" | "any";
  recommended: boolean;
  bestseller: boolean;
  discount: boolean;
  /** Короткие теги под заголовком карточки (курорт · тематика). */
  cardTags: string[];
};

type TourMeta = {
  rating: number;
  reviewCount: number;
  badges: string[];
  audience: CatalogAudience;
  cityDeparture: string[];
  soldApprox: number;
  tourFormat: TourFormat;
  guideLang: "ru" | "en" | "any";
  recommended: boolean;
  bestseller: boolean;
  discount: boolean;
  cardTags: string[];
};

/** Расширения карточек по id оффера (сид); для новых id — вывод из defaultMeta. */
const metaByOfferId: Record<string, TourMeta> = {
  "offer-sea-1": {
    rating: 4.8,
    reviewCount: 132,
    badges: ["Семейный", "Трансфер"],
    audience: "family",
    cityDeparture: ["moskva", "spb", "ekaterinburg"],
    soldApprox: 12500,
    tourFormat: "group",
    guideLang: "ru",
    recommended: true,
    bestseller: true,
    discount: false,
    cardTags: ["Гагра", "Семейный отдых"],
  },
  "offer-sea-2": {
    rating: 4.9,
    reviewCount: 89,
    badges: ["Премиум", "Менеджер 24/7"],
    audience: "premium",
    cityDeparture: ["moskva", "spb"],
    soldApprox: 3900,
    tourFormat: "individual",
    guideLang: "ru",
    recommended: true,
    bestseller: false,
    discount: false,
    cardTags: ["Сухум", "Премиум"],
  },
  "offer-mountain-1": {
    rating: 4.5,
    reviewCount: 256,
    badges: ["Бюджет", "Без скрытых платежей"],
    audience: "budget",
    cityDeparture: ["moskva", "kazan"],
    soldApprox: 5860,
    tourFormat: "group",
    guideLang: "any",
    recommended: false,
    bestseller: false,
    discount: true,
    cardTags: ["Пицунда", "Бюджет"],
  },
};

function inferAudience(offer: OperatorOffer): CatalogAudience {
  const t = `${offer.title} ${offer.description}`.toLowerCase();
  if (t.includes("premium") || t.includes("преми")) return "premium";
  if (t.includes("budget") || t.includes("бюджет")) return "budget";
  return "family";
}

function defaultMeta(offer: OperatorOffer): TourMeta {
  const badges: string[] = [];
  if (offer.availability === "limited") badges.push("Мало мест");
  if (offer.availability === "sold_out") badges.push("Нет мест");
  return {
    rating: 4.6,
    reviewCount: 48,
    badges,
    audience: inferAudience(offer),
    cityDeparture: ["moskva"],
    soldApprox: Math.max(120, offer.nights * 80),
    tourFormat: "group",
    guideLang: "ru",
    recommended: false,
    bestseller: false,
    discount: false,
    cardTags: [offer.resort, inferAudience(offer) === "premium" ? "Премиум" : "Тур"],
  };
}

export function offerToCatalogTour(offer: OperatorOffer): CatalogTour {
  const m = metaByOfferId[offer.id] ?? defaultMeta(offer);
  return {
    id: offer.id,
    title: offer.title,
    description: offer.description,
    image: offer.image,
    resort: offer.resort,
    resortSlug: resortNameToSlug(offer.resort),
    nights: offer.nights,
    price: offer.price,
    availability: offer.availability,
    rating: m.rating,
    reviewCount: m.reviewCount,
    badges: m.badges,
    audience: m.audience,
    cityDeparture: m.cityDeparture,
    soldApprox: m.soldApprox,
    tourFormat: m.tourFormat,
    guideLang: m.guideLang,
    recommended: m.recommended,
    bestseller: m.bestseller,
    discount: m.discount,
    cardTags: m.cardTags,
  };
}

export async function listCatalogTours(): Promise<CatalogTour[]> {
  const offers = await readOperatorOffers();
  return offers.map(offerToCatalogTour);
}

/** Одна карточка каталога по id оффера — для страницы тура и метаданных. */
export async function getCatalogTourById(id: string): Promise<CatalogTour | null> {
  const list = await listCatalogTours();
  return list.find((t) => t.id === id) ?? null;
}

export type CatalogDuration = "" | "lte5" | "6to7" | "gte8";

export type CatalogQuery = {
  q?: string;
  resort?: string;
  audience?: CatalogAudience | "";
  sort?: "popular" | "price-asc" | "price-desc" | "rating-desc";
  page?: number;
  limit?: number;
  priceMin?: number;
  priceMax?: number;
  duration?: CatalogDuration;
  spotlight?: "" | "recommended" | "bestseller" | "discount";
  tourFormat?: TourFormat | "";
  guideLang?: "ru" | "en" | "any" | "";
};

function matchesDuration(t: CatalogTour, d: CatalogDuration): boolean {
  if (!d) return true;
  if (d === "lte5") return t.nights <= 5;
  if (d === "6to7") return t.nights >= 6 && t.nights <= 7;
  return t.nights >= 8;
}

export async function queryCatalogTours(query: CatalogQuery): Promise<{
  items: CatalogTour[];
  total: number;
  page: number;
  limit: number;
  priceBounds: { min: number; max: number };
}> {
  const fullList = await listCatalogTours();
  const prices = fullList.map((t) => t.price);
  const priceBounds = {
    min: prices.length ? Math.min(...prices) : 0,
    max: prices.length ? Math.max(...prices) : 0,
  };

  let list = fullList;
  const q = query.q?.trim().toLowerCase();
  if (q) {
    list = list.filter(
      (t) =>
        t.title.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        t.resort.toLowerCase().includes(q) ||
        t.badges.some((b) => b.toLowerCase().includes(q))
    );
  }
  if (query.resort) {
    const r = query.resort.toLowerCase();
    list = list.filter((t) => t.resortSlug === r || t.resort.toLowerCase().includes(r));
  }
  if (query.audience) {
    list = list.filter((t) => t.audience === query.audience);
  }
  if (query.priceMin != null && Number.isFinite(query.priceMin)) {
    list = list.filter((t) => t.price >= query.priceMin!);
  }
  if (query.priceMax != null && Number.isFinite(query.priceMax)) {
    list = list.filter((t) => t.price <= query.priceMax!);
  }
  if (query.duration) {
    list = list.filter((t) => matchesDuration(t, query.duration!));
  }
  if (query.spotlight === "recommended") {
    list = list.filter((t) => t.recommended);
  } else if (query.spotlight === "bestseller") {
    list = list.filter((t) => t.bestseller);
  } else if (query.spotlight === "discount") {
    list = list.filter((t) => t.discount);
  }
  if (query.tourFormat) {
    list = list.filter((t) => t.tourFormat === query.tourFormat);
  }
  if (query.guideLang && query.guideLang !== "any") {
    list = list.filter((t) => t.guideLang === query.guideLang || t.guideLang === "any");
  }

  const sort = query.sort ?? "popular";
  list = [...list].sort((a, b) => {
    if (sort === "price-asc") return a.price - b.price;
    if (sort === "price-desc") return b.price - a.price;
    if (sort === "rating-desc") return b.rating - a.rating;
    const score = (x: CatalogTour) =>
      x.rating * 100 + (x.availability === "sold_out" ? 0 : 15) + x.reviewCount / 50;
    return score(b) - score(a);
  });

  const total = list.length;
  const page = Math.max(1, query.page ?? 1);
  const limit = Math.min(50, Math.max(1, query.limit ?? 12));
  const start = (page - 1) * limit;
  const items = list.slice(start, start + limit);
  return { items, total, page, limit, priceBounds };
}
