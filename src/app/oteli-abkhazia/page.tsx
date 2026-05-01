import Link from "next/link";
import type { Metadata } from "next";
import { HotelCatalog } from "@/components/hotels/hotel-catalog";
import { SITE_NAME, SITE_URL } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Отели Абхазии — каталог и заявка",
  description:
    "Отели и курорты Абхазии на AbkhaziaTrip: фильтры, рейтинги и цены для туристов из России. Официальный каталог abkhaziatrip.ru.",
  alternates: { canonical: `${SITE_URL}/oteli-abkhazia` },
};

export default function HotelsPage() {
  return (
    <div className="grid gap-8">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-semibold text-pine-900 md:text-4xl">Отели Абхазии</h1>
        <p className="mt-4 text-pine-700">
          Каталог под SEO-кластер «абхазия отели»: карточки с рейтингом, тегами и ценой за сутки. Данные для демо —
          замените на интеграцию с поставщиком; CTA ведёт на заявку {SITE_NAME}.
        </p>
        <p className="mt-3 text-sm text-pine-600">
          Курортные хабы: см. также разделы{" "}
          <Link href="/kurorty/gagra" className="font-medium underline">
            курортов
          </Link>
          .
        </p>
      </header>
      <HotelCatalog />
    </div>
  );
}
