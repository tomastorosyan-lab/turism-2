import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-16 border-t border-pine-100 bg-white">
      <div className="mx-auto grid w-full max-w-6xl gap-3 px-4 py-8 text-sm text-pine-700">
        <p className="font-medium text-pine-900">AbkhaziaTrip.ru</p>
        <p>Сервис подбора туров в Абхазию для туристов из России.</p>
        <p>Прозрачная цена, поддержка менеджера и контроль статусов заявки.</p>
        <div className="flex flex-wrap gap-4 text-xs">
          <Link href="/oferta" className="hover:text-pine-900">
            Оферта
          </Link>
          <Link href="/privacy" className="hover:text-pine-900">
            Политика ПДн
          </Link>
          <Link href="/refunds" className="hover:text-pine-900">
            Отмены и возвраты
          </Link>
        </div>
      </div>
    </footer>
  );
}
