import Link from "next/link";
import { redirect } from "next/navigation";
import { createBooking } from "@/lib/bookings";
import { formatRub } from "@/lib/data";
import { readOperatorOffers } from "@/lib/operator-offers";

type Props = {
  params: Promise<{ tourId: string }>;
};

export default async function BookingPage({ params }: Props) {
  const { tourId } = await params;
  const offers = await readOperatorOffers();
  const tour = offers.find((item) => item.id === tourId);
  if (!tour) return <p className="text-sm text-pine-700">Тур не найден.</p>;
  const selectedTour = tour;

  async function submitBooking(formData: FormData) {
    "use server";
    const name = String(formData.get("name") || "");
    const phone = String(formData.get("phone") || "");
    if (!name || !phone) return;
    const booking = await createBooking({
      name,
      phone,
      tourId: selectedTour.id,
      tourTitle: selectedTour.title,
      total: selectedTour.price,
    });
    redirect(`/oplata/${booking.id}`);
  }

  return (
    <div className="grid gap-6">
      <nav aria-label="Хлебные крошки" className="text-sm text-zinc-600">
        <ol className="flex flex-wrap items-center gap-1.5">
          <li>
            <Link href={`/tury/${selectedTour.id}`} className="text-pine-700 underline-offset-2 hover:underline">
              Страница тура
            </Link>
          </li>
          <li aria-hidden className="text-zinc-400">
            /
          </li>
          <li className="font-medium text-zinc-900">Бронирование</li>
        </ol>
      </nav>
      <h1 className="text-3xl font-semibold text-pine-900">Бронирование тура</h1>
      <article className="rounded-xl border border-pine-100 bg-white p-5">
        <h2 className="text-xl font-semibold text-pine-900">{selectedTour.title}</h2>
        <p className="mt-1 text-sm text-pine-700">{selectedTour.description}</p>
        <p className="mt-3 text-sm font-semibold text-pine-900">Итог: {formatRub(selectedTour.price)}</p>
      </article>
      <form action={submitBooking} className="grid gap-4 rounded-xl border border-pine-100 bg-white p-5">
        <label className="grid gap-1 text-sm">
          Имя
          <input name="name" required className="rounded-md border border-pine-100 px-3 py-2" />
        </label>
        <label className="grid gap-1 text-sm">
          Телефон
          <input name="phone" required className="rounded-md border border-pine-100 px-3 py-2" />
        </label>
        <button className="w-fit rounded-full bg-pine-900 px-6 py-3 text-sm text-white" type="submit">
          Подтвердить бронь
        </button>
      </form>
    </div>
  );
}
