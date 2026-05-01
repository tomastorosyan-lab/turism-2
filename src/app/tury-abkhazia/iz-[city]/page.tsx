import Link from "next/link";
import type { Metadata } from "next";
import { cityMap } from "@/lib/data";
import { listCatalogTours } from "@/lib/catalog";
import { TourCard } from "@/components/catalog/tour-card";
import { notFound } from "next/navigation";
import { SITE_NAME, SITE_URL } from "@/lib/brand";

type Props = {
  params: Promise<{ city: string }>;
};

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city } = await params;
  const cityName = cityMap[city];
  if (!cityName) return { title: "Туры" };
  return {
    title: `Туры в Абхазию из ${cityName}`,
    description: `Подбор туров в Абхазию из ${cityName} на ${SITE_NAME}: цены, курорты, заявка на abkhaziatrip.ru.`,
    alternates: { canonical: `${SITE_URL}/tury-abkhazia/iz-${city}` },
  };
}

export default async function ToursByCityPage({ params }: Props) {
  const { city } = await params;
  const cityName = cityMap[city];
  if (!cityName) notFound();
  const all = await listCatalogTours();
  const matched = all.filter((t) => t.cityDeparture.includes(city));

  return (
    <div className="grid gap-8">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-semibold text-pine-900 md:text-4xl">Туры в Абхазию из {cityName}</h1>
        <p className="mt-4 text-pine-700">
          Региональная посадочная {SITE_NAME} под запросы «туры в абхазию из {cityName}». Ниже — предложения с
          вылетом/логистикой из вашего региона; полный каталог — на{" "}
          <Link href="/tury-abkhazia" className="font-medium underline">
            странице туров
          </Link>
          .
        </p>
        <Link
          href="/zayavka"
          className="mt-6 inline-flex rounded-full bg-pine-900 px-6 py-3 text-sm font-semibold text-white hover:bg-pine-700"
        >
          Заявка на подбор из {cityName}
        </Link>
      </header>

      {matched.length === 0 ? (
        <p className="rounded-xl border border-pine-100 bg-pine-50 px-4 py-6 text-sm text-pine-800">
          Для этого города в демо-каталоге нет отдельной выборки — оставьте{" "}
          <Link href="/zayavka" className="font-medium underline">
            заявку
          </Link>
          , менеджер {SITE_NAME} подберёт рейсы и трансфер.
        </p>
      ) : (
        <ul className="grid gap-5 md:grid-cols-2">
          {matched.map((tour) => (
            <li key={tour.id}>
              <TourCard tour={tour} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
