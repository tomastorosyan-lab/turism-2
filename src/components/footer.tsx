import Link from "next/link";
import { SITE_NAME, SITE_URL } from "@/lib/brand";

const colExplore = [
  { href: "/tury-abkhazia", label: "Каталог туров" },
  { href: "/oteli-abkhazia", label: "Отели" },
  { href: "/otdyh-abkhazia", label: "Отдых" },
  { href: "/blog", label: "Гид и статьи" },
];

const colAccount = [
  { href: "/zayavka", label: "Подбор тура" },
  { href: "/lichnyy-kabinet", label: "Личный кабинет" },
  { href: "/partner/login", label: "Партнёрам" },
];

const colLegal = [
  { href: "/oferta", label: "Оферта" },
  { href: "/privacy", label: "Политика ПДн" },
  { href: "/refunds", label: "Отмены и возвраты" },
];

export function Footer() {
  return (
    <footer className="border-border mt-12 border-t bg-white">
      <div className="mx-auto grid w-full max-w-[1320px] gap-10 px-4 py-12 md:grid-cols-2 md:px-6 lg:grid-cols-4">
        <div>
          <p className="font-bold text-zinc-900">{SITE_NAME}</p>
          <a href={`${SITE_URL}/`} className="mt-1 block text-sm text-zinc-600 hover:underline">
            {SITE_URL.replace(/^https:\/\//, "")}
          </a>
          <p className="mt-4 text-sm leading-relaxed text-zinc-600">
            Подбор туров и отдыха в Абхазии для туристов из России: прозрачная цена и статусы заявки.
          </p>
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-zinc-400">Разделы</p>
          <ul className="mt-4 space-y-2 text-sm">
            {colExplore.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-zinc-700 hover:text-zinc-900 hover:underline">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-zinc-400">Сервис</p>
          <ul className="mt-4 space-y-2 text-sm">
            {colAccount.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-zinc-700 hover:text-zinc-900 hover:underline">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-zinc-400">Документы</p>
          <ul className="mt-4 space-y-2 text-sm">
            {colLegal.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-zinc-700 hover:text-zinc-900 hover:underline">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-zinc-100 bg-zinc-50/80">
        <div className="mx-auto flex max-w-[1320px] flex-col gap-3 px-4 py-6 text-xs text-zinc-500 md:flex-row md:items-center md:justify-between md:px-6">
          <p>© {new Date().getFullYear()} {SITE_NAME}. Все права защищены.</p>
          <p className="text-zinc-400">Оплата на сайте — через защищённые каналы партнёров банка.</p>
        </div>
      </div>
    </footer>
  );
}
