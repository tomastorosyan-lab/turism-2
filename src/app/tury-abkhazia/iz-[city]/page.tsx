import { cityMap, formatRub } from "@/lib/data";
import { readOperatorOffers } from "@/lib/operator-offers";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ city: string }>;
};

export default async function ToursByCityPage({ params }: Props) {
  const { city } = await params;
  const cityName = cityMap[city];
  if (!cityName) notFound();
  const cityTours = await readOperatorOffers();

  return (
    <div className="grid gap-6">
      <h1 className="text-3xl font-semibold text-pine-900">Туры в Абхазию из {cityName}</h1>
      <p className="max-w-3xl text-sm text-pine-700">
        Региональная SEO-страница под коммерческий интент. Актуальные предложения по ценам и
        форматам отдыха.
      </p>
      <div className="grid gap-4">
        {cityTours.map((tour) => (
          <article key={tour.id} className="rounded-xl border border-pine-100 bg-white p-5">
            <h2 className="text-lg font-semibold text-pine-900">{tour.title}</h2>
            <p className="mt-1 text-sm text-pine-700">{tour.description}</p>
            <p className="mt-3 text-sm font-semibold text-pine-900">от {formatRub(tour.price)}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
