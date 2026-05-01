import { readLeads } from "@/lib/leads";
import { readBookings } from "@/lib/bookings";
import { formatRub } from "@/lib/data";

export const dynamic = "force-dynamic";

const statusLabel: Record<string, string> = {
  new: "Новая",
  in_progress: "В работе",
  done: "Закрыта",
};

export default async function CabinetPage() {
  const leads = await readLeads();
  const bookings = await readBookings();

  return (
    <div className="grid gap-6">
      <h1 className="text-3xl font-semibold text-pine-900">Личный кабинет</h1>
      <p className="max-w-3xl text-sm text-pine-700">
        Статусы заявок и прозрачный путь клиента: отправка, обработка менеджером, подтверждение
        условий.
      </p>

      {leads.length === 0 ? (
        <div className="rounded-xl border border-pine-100 bg-white p-5 text-sm text-pine-700">
          Пока нет заявок. Начните с подбора тура.
        </div>
      ) : (
        <div className="grid gap-4">
          {leads.slice(0, 10).map((lead) => (
            <article key={lead.id} className="rounded-xl border border-pine-100 bg-white p-5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h2 className="text-lg font-semibold text-pine-900">{lead.destination}</h2>
                <span className="rounded-full bg-pine-100 px-3 py-1 text-xs text-pine-900">
                  {statusLabel[lead.status] ?? lead.status}
                </span>
              </div>
              <p className="mt-2 text-sm text-pine-700">Путешественники: {lead.people || "не указано"}</p>
              <p className="text-sm text-pine-700">Даты: {lead.dates || "уточняется менеджером"}</p>
              <p className="text-xs text-pine-600">
                Создано: {new Date(lead.createdAt).toLocaleString("ru-RU")}
              </p>
            </article>
          ))}
        </div>
      )}

      <section className="grid gap-4">
        <h2 className="text-2xl font-semibold text-pine-900">Бронирования и оплаты</h2>
        {bookings.length === 0 ? (
          <div className="rounded-xl border border-pine-100 bg-white p-5 text-sm text-pine-700">
            Пока нет подтвержденных броней.
          </div>
        ) : (
          bookings.slice(0, 10).map((booking) => (
            <article key={booking.id} className="rounded-xl border border-pine-100 bg-white p-5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-lg font-semibold text-pine-900">{booking.tourTitle}</h3>
                <span className="rounded-full bg-pine-100 px-3 py-1 text-xs text-pine-900">
                  {booking.status}
                </span>
              </div>
              <p className="mt-2 text-sm text-pine-700">Сумма: {formatRub(booking.total)}</p>
              <p className="text-xs text-pine-600">
                Создано: {new Date(booking.createdAt).toLocaleString("ru-RU")}
              </p>
            </article>
          ))
        )}
      </section>
    </div>
  );
}
