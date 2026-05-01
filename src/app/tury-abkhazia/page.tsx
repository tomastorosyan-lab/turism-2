import Link from "next/link";
import Image from "next/image";
import { formatRub } from "@/lib/data";
import { readOperatorOffers } from "@/lib/operator-offers";

export const metadata = {
  title: "Туры в Абхазию - AbkhaziaTrip",
  description: "Подбор туров в Абхазию с прозрачной ценой и поддержкой менеджера.",
};

export const dynamic = "force-dynamic";

export default async function ToursPage() {
  const offers = await readOperatorOffers();

  return (
    <div className="grid gap-6">
      <h1 className="text-3xl font-semibold text-pine-900">Туры в Абхазию</h1>
      <p className="max-w-3xl text-pine-700">
        Коммерческий хаб по ключевому кластеру SEO: туры в Абхазию, семейные и премиальные
        предложения, быстрый подбор через менеджера.
      </p>
      <div className="grid gap-4">
        {offers.map((offer) => (
          <article key={offer.id} className="rounded-xl border border-pine-100 bg-white p-5">
            <Image
              src={offer.image}
              alt={offer.title}
              width={1200}
              height={700}
              className="h-48 w-full rounded-lg object-cover"
            />
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h2 className="text-xl font-semibold text-pine-900">{offer.title}</h2>
              <span className="text-sm text-pine-600">наличие: {offer.availability}</span>
            </div>
            <p className="mt-2 text-sm text-pine-700">{offer.description}</p>
            <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-pine-900">
              <span>Курорт: {offer.resort}</span>
              <span>Длительность: {offer.nights} ночей</span>
              <span className="font-semibold">от {formatRub(offer.price)}</span>
            </div>
            <Link
              href={`/booking/${offer.id}`}
              className="mt-4 inline-block rounded-full bg-pine-900 px-5 py-2 text-sm text-white"
            >
              Забронировать
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
