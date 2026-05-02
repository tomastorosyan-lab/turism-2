import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getOperatorById } from "@/lib/operator-auth";
import { readOffersByOperator } from "@/lib/operator-offers";
import { SITE_NAME, SITE_URL } from "@/lib/brand";
import { logoutPartner } from "./actions";
import { PartnerOfferCard } from "./partner-offer-card";

const ruDateTime = (iso: string) =>
  new Date(iso).toLocaleString("ru-RU", {
    dateStyle: "short",
    timeStyle: "short",
    timeZone: "Europe/Moscow",
  });

export const dynamic = "force-dynamic";

export default async function PartnerDashboardPage() {
  const cookieStore = await cookies();
  const operatorId = cookieStore.get("operator_session")?.value;
  if (!operatorId) redirect("/partner/login");

  const operator = getOperatorById(operatorId);
  if (!operator) redirect("/partner/login");

  const offers = await readOffersByOperator(operator.id);

  return (
    <div className="mx-auto max-w-5xl space-y-8 pb-12">
      <header className="space-y-4 border-b border-zinc-200 pb-6">
        <nav aria-label="Хлебные крошки" className="text-sm text-zinc-600">
          <ol className="flex flex-wrap items-center gap-1.5">
            <li>
              <Link href="/" className="text-pine-700 underline-offset-2 hover:underline">
                Главная
              </Link>
            </li>
            <li aria-hidden className="text-zinc-400">
              /
            </li>
            <li className="font-medium text-zinc-900">Кабинет партнёра</li>
          </ol>
        </nav>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0 space-y-2">
            <p className="text-xs font-semibold uppercase tracking-wide text-pine-700">{SITE_NAME}</p>
            <h1 className="text-2xl font-semibold tracking-tight text-pine-900 md:text-3xl">
              Офферы: {operator.name}
            </h1>
            <p className="max-w-2xl text-sm leading-relaxed text-zinc-600">
              Редактируйте карточки туров для витрины{" "}
              <a href={SITE_URL} className="font-medium text-pine-800 underline underline-offset-2">
                abkhaziatrip.ru
              </a>
              . Поля совпадают с тем, что видит турист; после сохранения данные обновляются на сайте.
            </p>
            <p className="text-xs text-zinc-500">
              Вход: <span className="font-mono text-zinc-700">{operator.email}</span>
            </p>
          </div>
          <form action={logoutPartner} className="shrink-0">
            <button
              type="submit"
              className="inline-flex min-h-[44px] w-full items-center justify-center rounded-full border border-zinc-300 bg-white px-5 py-2.5 text-sm font-medium text-zinc-800 shadow-sm transition hover:bg-zinc-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-pine-600 focus-visible:ring-offset-2 sm:w-auto"
            >
              Выйти из кабинета
            </button>
          </form>
        </div>
      </header>

      {offers.length === 0 ? (
        <div
          className="rounded-2xl border border-dashed border-zinc-300 bg-zinc-50 px-6 py-12 text-center"
          role="status"
        >
          <p className="text-base font-medium text-zinc-900">Пока нет офферов для этого аккаунта</p>
          <p className="mt-2 text-sm text-zinc-600">
            Обратитесь в поддержку {SITE_NAME}, чтобы привязать туры к вашему логину.
          </p>
          <Link
            href="/zayavka"
            className="mt-6 inline-flex min-h-[44px] items-center justify-center rounded-full bg-pine-900 px-5 text-sm font-semibold text-white hover:bg-pine-800"
          >
            Связаться
          </Link>
        </div>
      ) : (
        <section aria-labelledby="offers-heading" className="space-y-6">
          <h2 id="offers-heading" className="text-lg font-semibold text-pine-900">
            Ваши туры ({offers.length})
          </h2>
          <ul className="space-y-8">
            {offers.map((offer) => (
              <li key={offer.id}>
                <PartnerOfferCard offer={offer} updatedAtLabel={ruDateTime(offer.updatedAt)} />
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
