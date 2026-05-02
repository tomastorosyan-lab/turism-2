import Link from "next/link";

export default function TourNotFound() {
  return (
    <div className="mx-auto max-w-lg rounded-2xl border border-zinc-200 bg-white px-6 py-14 text-center shadow-sm">
      <h1 className="text-2xl font-semibold text-pine-900">Тур не найден</h1>
      <p className="mt-3 text-sm leading-relaxed text-zinc-600">
        Такого предложения нет или оно снято с витрины. Выберите тур в каталоге или оставьте заявку на подбор.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
        <Link
          href="/tury-abkhazia"
          className="inline-flex min-h-[44px] items-center justify-center rounded-full bg-pine-900 px-6 text-sm font-semibold text-white hover:bg-pine-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-pine-600 focus-visible:ring-offset-2"
        >
          Каталог туров
        </Link>
        <Link
          href="/zayavka"
          className="inline-flex min-h-[44px] items-center justify-center rounded-full border border-zinc-300 bg-white px-6 text-sm font-semibold text-zinc-800 hover:bg-zinc-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-pine-600 focus-visible:ring-offset-2"
        >
          Заявка на подбор
        </Link>
      </div>
    </div>
  );
}
