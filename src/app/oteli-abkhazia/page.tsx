import Link from "next/link";
import { resorts } from "@/lib/data";

export const metadata = {
  title: "Отели Абхазии - AbkhaziaTrip",
  description:
    "Каталог отелей Абхазии по курортам: Гагры, Пицунда, Сухум, Новый Афон.",
};

export default function HotelsPage() {
  return (
    <div className="grid gap-6">
      <h1 className="text-3xl font-semibold text-pine-900">Отели Абхазии</h1>
      <p className="max-w-3xl text-pine-700">
        Каталог для SEO-кластера “абхазия отели”. По каждому курорту показываем подборки и
        удобства для семейного, бюджетного и premium форматов.
      </p>
      <div className="grid gap-4 md:grid-cols-2">
        {resorts.map((resort) => (
          <article key={resort.slug} className="rounded-xl border border-pine-100 bg-white p-5">
            <h2 className="text-xl font-semibold text-pine-900">{resort.name}</h2>
            <p className="mt-1 text-sm text-pine-700">{resort.short}</p>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-pine-700">
              {resort.highlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <Link
              href={`/kurorty/${resort.slug}`}
              className="mt-4 inline-block rounded-full border border-pine-600 px-4 py-2 text-sm text-pine-700"
            >
              Смотреть курорт
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
