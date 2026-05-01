import Link from "next/link";
import type { Metadata } from "next";
import { WhyAbkhaziaSection } from "@/components/sections/why-abkhazia-section";
import { FaqSection } from "@/components/sections/faq-section";
import { SITE_NAME, SITE_URL } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Отдых в Абхазии — пакеты и подбор",
  description:
    "Отдых в Абхазии с AbkhaziaTrip: море, курорты, отели и туры для туристов из России. Официальный сайт abkhaziatrip.ru.",
  alternates: { canonical: `${SITE_URL}/otdyh-abkhazia` },
};

export default function OtdyhPage() {
  return (
    <div className="grid gap-12">
      <header className="rounded-3xl bg-pine-900 px-6 py-12 text-white md:px-12 md:py-14">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-pine-200">{SITE_NAME}</p>
        <h1 className="mt-4 text-3xl font-semibold md:text-4xl">Отдых в Абхазии</h1>
        <p className="mt-4 max-w-2xl text-pine-100">
          P1-кластер по SEO-плану: от семейного пляжного отдыха до премиальных программ в Сухуме и на побережье.
          Бронирование и юридические условия — только на {SITE_URL.replace(/^https:\/\//, "")}.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/zayavka"
            className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-pine-900 hover:bg-pine-100"
          >
            Заявка на подбор отдыха
          </Link>
          <Link
            href="/tury-abkhazia"
            className="rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10"
          >
            Смотреть туры
          </Link>
          <Link
            href="/oteli-abkhazia"
            className="rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10"
          >
            Отели Абхазии
          </Link>
        </div>
      </header>

      <section className="grid gap-4 rounded-2xl border border-pine-100 bg-white p-6 shadow-sm md:grid-cols-3 md:p-8">
        <div>
          <h2 className="text-lg font-semibold text-pine-900">Цена и условия</h2>
          <p className="mt-2 text-sm text-pine-700">
            Фиксируем состав услуг и отмену до оплаты. Документы {SITE_NAME}:{" "}
            <Link href="/oferta" className="underline">
              оферта
            </Link>
            ,{" "}
            <Link href="/refunds" className="underline">
              возвраты
            </Link>
            .
          </p>
        </div>
        <div>
          <h2 className="text-lg font-semibold text-pine-900">Курорты</h2>
          <p className="mt-2 text-sm text-pine-700">
            Гагра, Пицунда, Сухум, Новый Афон — подбираем отель и логистику из России.
          </p>
          <Link href="/oteli-abkhazia" className="mt-3 inline-block text-sm font-medium text-pine-800 underline">
            Каталог отелей →
          </Link>
        </div>
        <div>
          <h2 className="text-lg font-semibold text-pine-900">Доверие</h2>
          <p className="mt-2 text-sm text-pine-700">
            SLA ответа менеджера в рабочее время, статусы заявки в личном кабинете на abkhaziatrip.ru.
          </p>
        </div>
      </section>

      <WhyAbkhaziaSection />
      <FaqSection />
    </div>
  );
}
