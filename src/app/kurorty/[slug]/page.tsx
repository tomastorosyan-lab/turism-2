import Image from "next/image";
import { notFound } from "next/navigation";
import { resorts, formatRub } from "@/lib/data";
import { readOperatorOffers } from "@/lib/operator-offers";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function ResortPage({ params }: Props) {
  const { slug } = await params;
  const resort = resorts.find((item) => item.slug === slug);
  if (!resort) notFound();
  const offers = await readOperatorOffers();

  const resortTours = offers.filter((item) => item.resort === resort.name);

  return (
    <div className="grid gap-6">
      <h1 className="text-3xl font-semibold text-pine-900">{resort.name}</h1>
      <p className="max-w-3xl text-pine-700">{resort.short}</p>

      <section className="rounded-xl border border-pine-100 bg-white p-5">
        <h2 className="text-xl font-semibold text-pine-900">Почему выбирают {resort.name}</h2>
        <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-pine-700">
          {resort.highlights.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="grid gap-4">
        <h2 className="text-xl font-semibold text-pine-900">Туры по курорту</h2>
        {resortTours.length === 0 ? (
          <p className="text-sm text-pine-700">Витрина туров обновляется.</p>
        ) : (
          resortTours.map((tour) => (
            <article key={tour.id} className="rounded-xl border border-pine-100 bg-white p-5">
              <Image
                src={tour.image}
                alt={tour.title}
                width={1200}
                height={700}
                className="h-44 w-full rounded-lg object-cover"
              />
              <h3 className="text-lg font-semibold text-pine-900">{tour.title}</h3>
              <p className="mt-1 text-sm text-pine-700">{tour.description}</p>
                <p className="mt-3 text-sm font-semibold text-pine-900">от {formatRub(tour.price)}</p>
            </article>
          ))
        )}
      </section>
    </div>
  );
}
