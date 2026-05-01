import type { Metadata } from "next";
import { SITE_NAME, SITE_URL } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Политика обработки персональных данных",
  description: `Политика ПДн ${SITE_NAME} — abkhaziatrip.ru.`,
  alternates: { canonical: `${SITE_URL}/privacy` },
};

export default function PrivacyPage() {
  return (
    <article className="grid gap-4">
      <h1 className="text-3xl font-semibold text-pine-900">Политика конфиденциальности</h1>
      <div className="rounded-xl border border-pine-100 bg-white p-5 text-sm text-pine-800">
        <p>
          Мы обрабатываем персональные данные только для обработки заявок, коммуникаций,
          сопровождения бронирования и исполнения требований законодательства.
        </p>
        <p className="mt-3">
          Принимаются только минимально необходимые данные: имя, контакты, параметры поездки.
          Платежные реквизиты в полном виде не хранятся.
        </p>
        <p className="mt-3">
          Пользователь может запросить доступ, исправление или удаление данных через форму
          поддержки.
        </p>
      </div>
    </article>
  );
}
