import { NextResponse } from "next/server";
import {
  queryCatalogTours,
  type CatalogAudience,
  type CatalogDuration,
  type TourFormat,
} from "@/lib/catalog";

export const dynamic = "force-dynamic";

const sorts = new Set(["popular", "price-asc", "price-desc", "rating-desc"]);
const audiences = new Set<CatalogAudience>(["budget", "family", "premium"]);
const durations = new Set<CatalogDuration>(["", "lte5", "6to7", "gte8"]);
const spotlights = new Set(["", "recommended", "bestseller", "discount"]);
const formats = new Set<TourFormat | "">(["", "group", "individual"]);
const guideLangs = new Set(["", "ru", "en", "any"]);

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q") ?? undefined;
  const resort = searchParams.get("resort") ?? undefined;
  const audienceRaw = searchParams.get("audience") ?? "";
  const audience = audiences.has(audienceRaw as CatalogAudience)
    ? (audienceRaw as CatalogAudience)
    : "";
  const sortRaw = searchParams.get("sort") ?? "popular";
  const sort = sorts.has(sortRaw) ? (sortRaw as "popular" | "price-asc" | "price-desc" | "rating-desc") : "popular";
  const page = Number(searchParams.get("page") ?? "1");
  const limit = Number(searchParams.get("limit") ?? "12");
  const priceMinRaw = searchParams.get("priceMin");
  const priceMaxRaw = searchParams.get("priceMax");
  const priceMin = priceMinRaw != null && priceMinRaw !== "" ? Number(priceMinRaw) : undefined;
  const priceMax = priceMaxRaw != null && priceMaxRaw !== "" ? Number(priceMaxRaw) : undefined;
  const durationRaw = (searchParams.get("duration") ?? "") as CatalogDuration;
  const duration = durations.has(durationRaw) ? durationRaw : "";
  const spotlightRaw = searchParams.get("spotlight") ?? "";
  const spotlight = spotlights.has(spotlightRaw) ? (spotlightRaw as "recommended" | "bestseller" | "discount" | "") : "";
  const tourFormatRaw = searchParams.get("tourFormat") ?? "";
  const tourFormat = formats.has(tourFormatRaw as TourFormat | "") ? (tourFormatRaw as TourFormat | "") : "";
  const guideLangRaw = searchParams.get("guideLang") ?? "";
  const guideLang = guideLangs.has(guideLangRaw) ? (guideLangRaw as "ru" | "en" | "any" | "") : "";

  const result = await queryCatalogTours({
    q,
    resort,
    audience,
    sort,
    page: Number.isFinite(page) ? page : 1,
    limit: Number.isFinite(limit) ? limit : 12,
    priceMin: Number.isFinite(priceMin) ? priceMin : undefined,
    priceMax: Number.isFinite(priceMax) ? priceMax : undefined,
    duration: duration || undefined,
    spotlight: spotlight || undefined,
    tourFormat: tourFormat || undefined,
    guideLang: guideLang || undefined,
  });

  return NextResponse.json(result);
}
