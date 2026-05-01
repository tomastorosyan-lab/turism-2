import type { Metadata } from "next";
import { queryCatalogTours } from "@/lib/catalog";
import { TourCatalog } from "@/components/catalog/tour-catalog";
import { WhyMarketplaceSection } from "@/components/sections/why-marketplace-section";
import { InterestingPlacesSection } from "@/components/sections/interesting-places-section";
import { ReviewsMarketplaceSection } from "@/components/sections/reviews-marketplace-section";
import { FaqSection } from "@/components/sections/faq-section";
import { TrustRatingsSection } from "@/components/sections/trust-ratings-section";
import { SITE_NAME, SITE_URL } from "@/lib/brand";

export const metadata: Metadata = {
  title: `${SITE_NAME} — туры и отдых в Абхазии из России`,
  description:
    "Туры в Абхазию онлайн: каталог, фильтры, цены от, отзывы. Подбор и бронь на abkhaziatrip.ru — прозрачные условия и менеджер.",
  alternates: { canonical: `${SITE_URL}/` },
};

export const dynamic = "force-dynamic";

export default async function Home() {
  const initial = await queryCatalogTours({ sort: "popular", page: 1, limit: 12 });
  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    name: SITE_NAME,
    url: SITE_URL,
    areaServed: { "@type": "Country", name: "Russia" },
    description:
      "Подбор туров и отдыха в Абхазии для туристов из России: официальный сайт abkhaziatrip.ru.",
    priceRange: "$$",
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />
      <div className="-mx-4 -mt-6 mb-0 rounded-b-2xl bg-white px-4 pb-10 pt-6 shadow-[0_1px_0_rgba(0,0,0,0.06)] md:-mx-6 md:px-6">
        <TourCatalog
          initial={initial}
          heading="Все туры и отдых в Абхазии"
          showIntro={false}
        />
      </div>

      <div className="mx-auto max-w-[1200px]">
        <WhyMarketplaceSection />
        <InterestingPlacesSection />
        <ReviewsMarketplaceSection />
        <FaqSection />
        <TrustRatingsSection />
      </div>
    </>
  );
}
