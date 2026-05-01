import type { Metadata } from "next";
import { queryCatalogTours } from "@/lib/catalog";
import { TourCatalog } from "@/components/catalog/tour-catalog";
import { SITE_URL } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Туры в Абхазию — каталог и бронирование",
  description:
    "Каталог туров в Абхазию на AbkhaziaTrip: фильтры по курорту и формату, сортировка, цены и бронь на abkhaziatrip.ru.",
  alternates: { canonical: `${SITE_URL}/tury-abkhazia` },
};

export const dynamic = "force-dynamic";

export default async function ToursPage() {
  const initial = await queryCatalogTours({ sort: "popular", page: 1, limit: 12 });

  return (
    <div>
      <TourCatalog
        initial={initial}
        heading="Туры в Абхазию"
        showSeoNote
        showIntro
      />
    </div>
  );
}
