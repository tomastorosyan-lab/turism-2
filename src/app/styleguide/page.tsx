import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Inter, Literata } from "next/font/google";
import { queryCatalogTours } from "@/lib/catalog";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

const literata = Literata({
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

const shadowCard = "shadow-[0_1px_2px_rgba(42,37,32,0.07),0_10px_32px_rgba(42,37,32,0.08)]";
const shadowBtn = "shadow-[0_1px_2px_rgba(42,37,32,0.1)]";
const shadowBtnHover =
  "hover:shadow-[0_1px_2px_rgba(42,37,32,0.1),0_10px_28px_rgba(42,37,32,0.12)]";

export const metadata: Metadata = {
  title: "Фирстиль — демо",
  description: "Демонстрация утверждённого фирстиля: токены, типографика, UI-паттерны.",
  robots: { index: false, follow: false },
};

/** Синхронизируй с бренд-доком и :root в globals.css */
const swatches = [
  { role: "Фон страницы (canvas)", hex: "#F7F2EA", usage: "Body, фон витрины за карточками" },
  { role: "Поверхность карточки", hex: "#FFFCF8", usage: "Карточки, панели фильтров, модалки" },
  { role: "Основной текст", hex: "#2A2520", usage: "Заголовки, body, цены" },
  { role: "Вторичный текст", hex: "#6B6560", usage: "Подписи, мета, подсказки фильтров" },
  { role: "Граница", hex: "#D4CBC0", usage: "Обводки, разделители, неактивные чипы" },
  { role: "Primary CTA (pine-900)", hex: "#2C3F34", usage: "«Забронировать», ключевые кнопки" },
  { role: "Hover primary (pine-800)", hex: "#35493D", usage: "Hover primary-кнопок" },
  { role: "pine-700 (ссылки)", hex: "#3F5849", usage: "Текстовые ссылки, акценты" },
  { role: "pine-600 (природа / акцент)", hex: "#4D6B56", usage: "Слайдеры, вторичный акцент" },
  { role: "pine-100 (мягкие зоны)", hex: "#E8E3D9", usage: "Подложки, пустые состояния" },
  { role: "Успех", hex: "#3D6848", usage: "Подтверждено, заявка принята" },
  { role: "Предупреждение", hex: "#B07A28", usage: "Ожидание, уточнение без паники" },
  { role: "Ошибка", hex: "#B84440", usage: "Ошибка оплаты / валидации" },
] as const;

const checklist = [
  "Фон страницы — кремовый canvas (#F7F2EA), не холодный серый на всём экране без причины.",
  "Карточки и панели — поверхность #FFFCF8 или белый с тёплой обводкой #D4CBC0.",
  "Текст основной — #2A2520, вторичный — #6B6560; не смешивать лишние серые шкалы (например только zinc).",
  "Primary CTA — pine-900 / hover pine-800; фокус виден не только цветом (кольцо pine-600).",
  "Цены — tabular-nums и единое форматирование ₽.",
  "Заголовки витрины — сериф (Literata), формы и фильтры — гротеск (Inter); не более двух семейств без правила.",
  "Промо-бейджи не выглядят как агрессивная распродажа.",
  "Тени умбровые rgba(42,37,32,…), не чисто чёрный drop-shadow.",
  "Сетка и отступы — ритм 8px; колонка фильтров ~280px на desktop.",
  "Email и ЛК используют те же токены и типографику, что витрина.",
];

export default async function StyleguidePage() {
  const catalog = await queryCatalogTours({ sort: "popular", page: 1, limit: 1 });
  const demoTour = catalog.items[0];
  const detailHref = demoTour ? `/tury/${demoTour.id}` : "/tury-abkhazia";
  const bookingHref = demoTour ? `/booking/${demoTour.id}` : "/zayavka";

  return (
    <div className={`${inter.className} text-foreground -mx-4 -mt-6 md:-mx-6`}>
      {/* Герой — tone of voice §7 + призыв как у каталога */}
      <section className="rounded-b-2xl bg-gradient-to-b from-background to-[#EDE6DC] px-4 pb-12 pt-8 md:px-6">
        <p className="text-muted-foreground text-sm font-medium uppercase tracking-wide">Демо фирстиля · не индексируется</p>
        <h1
          className={`${literata.className} text-foreground mt-3 max-w-3xl text-[clamp(1.75rem,4vw,2.25rem)] font-semibold leading-[1.15] tracking-[-0.01em]`}
        >
          Туры в Абхазию — цены и условия без сюрпризов
        </h1>
        <p className="text-muted-foreground mt-4 max-w-2xl text-[17px] leading-relaxed">
          Позиционирование: «Мы помогаем спокойно выбрать и забронировать отдых в Абхазии — с понятной ценой, менеджером на
          связи и ясным статусом заявки».
        </p>
        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center">
          <Link
            href="/tury-abkhazia"
            className={`inline-flex min-h-[44px] items-center justify-center rounded-[12px] bg-pine-900 px-6 py-3 text-[15px] font-medium text-white transition-[background-color,box-shadow] duration-200 hover:bg-pine-800 ${shadowBtn} ${shadowBtnHover} focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pine-600`}
          >
            Перейти в каталог
          </Link>
          <p className="text-muted-foreground max-w-md text-sm leading-relaxed sm:text-[15px]">
            Менеджер подтвердит детали и статус заявки — без лишних звонков и навязанных доплат.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-[1100px] space-y-16 px-4 py-14 md:px-6">
        {/* 1. Позиционирование */}
        <section className={`border-border rounded-2xl border bg-card p-6 md:p-8 ${shadowCard}`}>
          <h2 className={`${literata.className} text-foreground text-[clamp(1.375rem,2.5vw,1.75rem)] font-semibold leading-snug`}>
            1. Позиционирование
          </h2>
          <ul className="text-muted-foreground mt-4 list-inside list-disc space-y-2 text-[15px] leading-relaxed">
            <li>
              <span className="text-foreground font-medium">Ясность</span> — что входит в цену, какие шаги после клика.
            </li>
            <li>
              <span className="text-foreground font-medium">Надёжность</span> — обещания честно, статус заявки и контакт
              понятны.
            </li>
            <li>
              <span className="text-foreground font-medium">Спокойствие</span> — без искусственной срочности и давления на
              бюджет.
            </li>
          </ul>
          <p className="text-muted-foreground mt-4 border-l-4 border-pine-600/40 pl-4 text-sm leading-relaxed">
            Коммуникация: спокойствие, ясность, доверие — без «горящих туров» и агрессивных триггеров.
          </p>
        </section>

        {/* 2. Характер бренда */}
        <section>
          <h2 className={`${literata.className} text-foreground text-[clamp(1.375rem,2.5vw,1.75rem)] font-semibold`}>
            2. Характер бренда
          </h2>
          <p className="text-foreground mt-3 text-[15px]">
            Внимательный, спокойно уверенный, ясный, тёплый без фамильярности, пунктуальный.
          </p>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <div className={`border-border rounded-xl border bg-card p-5 ${shadowCard}`}>
              <p className="text-pine-800 text-xs font-bold uppercase tracking-wider">Do</p>
              <ul className="text-muted-foreground mt-3 space-y-2 text-sm leading-relaxed">
                <li>«Вы», прямые формулировки о цене и сроках.</li>
                <li>Объяснять следующий шаг после заявки.</li>
                <li>Честно признавать ограничения.</li>
              </ul>
            </div>
            <div className={`border-border rounded-xl border bg-card p-5 ${shadowCard}`}>
              <p className="text-[#8a5348] text-xs font-bold uppercase tracking-wider">Don&apos;t</p>
              <ul className="text-muted-foreground mt-3 space-y-2 text-sm leading-relaxed">
                <li>Срочность ради конверсии, скрытые доплаты мелким шрифтом.</li>
                <li>Сленг и токсичный позитив.</li>
                <li>Обещания без канала связи и горизонта ответа.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 3. Палитра */}
        <section>
          <h2 className={`${literata.className} text-foreground text-[clamp(1.375rem,2.5vw,1.75rem)] font-semibold`}>
            3. Палитра
          </h2>
          <p className="text-muted-foreground mt-2 max-w-3xl text-[15px] leading-relaxed">
            Тёплый крем, умбровый текст, лесная зелень без бирюзы. Тень карточек:{" "}
            <code className="border-border rounded bg-pine-100/80 px-1.5 py-0.5 font-mono text-xs">
              0 1px 2px rgba(42,37,32,.07), 0 10px 32px rgba(42,37,32,.08)
            </code>
            . В каталоге используйте те же семантические классы, что и здесь (
            <code className="font-mono text-xs">foreground</code>, <code className="font-mono text-xs">border</code>,{" "}
            <code className="font-mono text-xs">card</code>, <code className="font-mono text-xs">pine-*</code>).
          </p>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {swatches.map((s) => (
              <li
                key={s.role}
                className={`border-border flex gap-3 overflow-hidden rounded-xl border bg-card ${shadowCard}`}
              >
                <div className="w-16 shrink-0 self-stretch min-h-[4.5rem]" style={{ backgroundColor: s.hex }} aria-hidden />
                <div className="py-3 pr-3">
                  <p className="text-foreground text-sm font-medium leading-snug">{s.role}</p>
                  <p className="text-muted-foreground font-mono text-xs">{s.hex}</p>
                  <p className="text-muted-foreground mt-1 text-xs leading-snug">{s.usage}</p>
                </div>
              </li>
            ))}
          </ul>
          <p className="text-muted-foreground mt-4 text-sm">
            <span className="text-foreground font-medium">Активный чип фильтра:</span> фон pine-700 (
            <code className="font-mono text-xs">#3F5849</code>) или pine-600 + белый текст — см. блок UI ниже.
          </p>
        </section>

        {/* 4. Типографика */}
        <section className={`border-border rounded-2xl border bg-card p-6 md:p-8 ${shadowCard}`}>
          <h2 className={`${literata.className} text-foreground text-[clamp(1.375rem,2.5vw,1.75rem)] font-semibold`}>
            4. Типографика
          </h2>
          <p className="text-muted-foreground mt-2 text-[15px]">Literata — заголовки витрины; Inter — UI и формы.</p>
          <div className="border-border mt-8 space-y-6 border-t pt-8">
            <div>
              <p className="text-muted-foreground text-xs uppercase tracking-wide">H1 · Literata · clamp 28–36px · 1.15</p>
              <p
                className={`${literata.className} text-foreground mt-1 text-[clamp(1.75rem,4vw,2.25rem)] font-semibold leading-[1.15]`}
              >
                Заголовок первого уровня
              </p>
            </div>
            <div>
              <p className="text-muted-foreground text-xs uppercase tracking-wide">H2 · 26–32px · 1.2</p>
              <p className={`${literata.className} text-foreground mt-1 text-[clamp(1.625rem,2.8vw,2rem)] font-semibold leading-[1.2]`}>
                Заголовок второго уровня
              </p>
            </div>
            <div>
              <p className="text-muted-foreground text-xs uppercase tracking-wide">H3 · 20–24px · 1.25</p>
              <p className={`${literata.className} text-foreground mt-1 text-[clamp(1.25rem,2vw,1.5rem)] font-semibold leading-[1.25]`}>
                Заголовок третьего уровня
              </p>
            </div>
            <div>
              <p className="text-muted-foreground text-xs uppercase tracking-wide">Body · 16–17px · 1.5–1.6</p>
              <p className="text-foreground mt-1 max-w-prose text-[17px] leading-relaxed">
                Основной текст для описаний и юридических блоков.
              </p>
            </div>
            <div>
              <p className="text-muted-foreground text-xs uppercase tracking-wide">Caption · 13–14px · 1.45</p>
              <p className="text-muted-foreground mt-1 text-[13px] leading-snug">Подпись к полю, срок ответа менеджера.</p>
            </div>
            <div>
              <p className="text-muted-foreground text-xs uppercase tracking-wide">Суммы и даты · tabular-nums</p>
              <p className="text-foreground mt-1 text-[17px] tabular-nums leading-relaxed">
                <span className="font-medium">45 900 ₽</span>
                <span className="text-border mx-2">·</span>
                <span>31 мая — 7 июня</span>
              </p>
            </div>
          </div>
        </section>

        {/* 5. Фото */}
        <section>
          <h2 className={`${literata.className} text-foreground text-[clamp(1.375rem,2.5vw,1.75rem)] font-semibold`}>
            5. Фото
          </h2>
          <div className={`border-border mt-4 rounded-xl border bg-card p-5 text-[15px] leading-relaxed ${shadowCard}`}>
            <p className="text-foreground">
              <span className="font-medium">Стиль:</span> дневной свет, естественная контрастность; широкие планы моря и гор,
              узнаваемые детали региона.
            </p>
            <p className="text-muted-foreground mt-3">
              <span className="text-foreground font-medium">Избегать:</span> пересатурация, стоковый «крик», HDR-сахар,
              кадры не из Абхазии.
            </p>
            <p className="text-muted-foreground mt-3">
              Сезон и погода — честно; люди без инста-шаблона, при необходимости репортаж.
            </p>
          </div>
        </section>

        {/* 6. UI: сетка, чипы, карточка */}
        <section>
          <h2 className={`${literata.className} text-foreground text-[clamp(1.375rem,2.5vw,1.75rem)] font-semibold`}>
            6. UI
          </h2>
          <p className="text-muted-foreground mt-2 max-w-3xl text-[15px]">
            Сетка ~280px + fluid; ритм 8px; скругления 10–12px; чипы — pill. Ниже — макет фильтров + карточка с вторичным
            «Подробнее» и primary «Забронировать» (min-height 44px).
          </p>

          <div className="mt-6 grid gap-4 lg:grid-cols-[280px_minmax(0,1fr)] lg:items-start">
            <aside className={`border-border rounded-xl border bg-card p-4 ${shadowCard}`}>
              <p className="text-muted-foreground text-[11px] font-bold uppercase tracking-[0.14em]">Фильтры</p>
              <p className="text-muted-foreground mt-3 text-xs leading-relaxed">Колонка 280px на desktop; на mobile — блок сверху.</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <button
                  type="button"
                  className="border-border bg-card text-foreground rounded-full border px-3 py-1.5 text-xs font-medium"
                >
                  Все
                </button>
                <button
                  type="button"
                  className="rounded-full border border-pine-700 bg-pine-700 px-3 py-1.5 text-xs font-medium text-white shadow-sm"
                >
                  Пицунда
                </button>
                <button
                  type="button"
                  className="border-border bg-card text-foreground rounded-full border px-3 py-1.5 text-xs font-medium"
                >
                  Сухум
                </button>
              </div>
            </aside>
            <div className="border-border rounded-xl border border-dashed border-pine-600/30 bg-pine-100/50 p-6 text-center text-sm text-pine-800">
              Сетка карточек туров
            </div>
          </div>

          <h3 className={`${literata.className} text-foreground mt-10 text-xl font-semibold`}>Карточка тура (паттерн)</h3>
          <p className="text-muted-foreground mt-2 max-w-2xl text-xs leading-relaxed">
            Разметка как в <code className="rounded bg-pine-100 px-1 font-mono text-[11px]">TourCard</code>: одна ссылка на
            страницу тура (клик по обложке и тексту), «Подробнее» — только подпись внутри неё; отдельная полоса — только
            бронь. Адреса берутся из первого тура каталога (
            <code className="font-mono text-[11px]">{detailHref}</code>,{" "}
            <code className="font-mono text-[11px]">{bookingHref}</code>
            ).
          </p>
          <div className="mt-4 max-w-md">
            <article
              className={`border-border flex h-full flex-col overflow-hidden rounded-xl border bg-card transition hover:-translate-y-px hover:shadow-[0_4px_14px_rgba(42,37,32,0.1)] ${shadowCard}`}
            >
              <Link
                href={detailHref}
                className="group flex min-h-0 flex-1 flex-col outline-none focus-visible:ring-2 focus-visible:ring-pine-600 focus-visible:ring-offset-2"
              >
                <div className="border-border relative aspect-[4/3] w-full overflow-hidden bg-pine-100">
                  <Image
                    src="/images/resorts/sukhum.jpg"
                    alt="Демо карточки: Сухум, набережная"
                    fill
                    className="object-cover transition duration-500 group-hover:scale-[1.02]"
                    sizes="(max-width: 768px) 100vw, 420px"
                  />
                  <div className="absolute left-2.5 top-2.5 flex flex-wrap gap-1">
                    <span className="rounded bg-white/90 px-2 py-0.5 text-[11px] font-semibold text-pine-900 shadow-sm">
                      Бестселлер
                    </span>
                    <span className="rounded bg-[#8B6914]/90 px-2 py-0.5 text-[11px] font-semibold text-white shadow-sm">
                      Скидка
                    </span>
                  </div>
                </div>
                <div className="flex flex-1 flex-col px-3.5 pb-3 pt-3">
                  <p className="text-[11px] font-medium leading-snug text-muted-foreground sm:text-xs">Сухум · море</p>
                  <h3 className={`${literata.className} text-foreground mt-1.5 text-[15px] font-semibold leading-snug sm:text-base`}>
                    Сухум, набережная
                  </h3>
                  <p className="text-muted-foreground mt-1 line-clamp-2 text-xs leading-relaxed sm:text-[13px]">
                    Проживание, завтраки — условия без сюрпризов.
                  </p>
                  <div className="text-foreground mt-2.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs">
                    <span className="inline-flex items-center gap-0.5 font-semibold" title="Демо рейтинга">
                      <span className="text-amber-500">★</span>
                      4,9
                    </span>
                    <span className="text-border">|</span>
                    <span className="text-muted-foreground">доступность демо</span>
                  </div>
                  <div className="border-border mt-auto flex flex-wrap items-end justify-between gap-2 border-t pt-3">
                    <div>
                      <p className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">от</p>
                      <p className="text-foreground text-lg font-bold tabular-nums leading-none sm:text-xl">45 900 ₽</p>
                      <p className="text-muted-foreground mt-0.5 text-[11px]">7 ночей</p>
                    </div>
                    <span className="rounded-lg border border-border bg-card px-3 py-2 text-center text-xs font-semibold text-pine-800 sm:text-sm">
                      Подробнее
                    </span>
                  </div>
                </div>
              </Link>
              <div className="border-border bg-pine-100/60 px-3.5 py-2.5">
                <Link
                  href={bookingHref}
                  className={`flex min-h-[44px] w-full items-center justify-center rounded-xl bg-pine-900 px-4 text-sm font-semibold text-white shadow-[0_1px_2px_rgba(42,37,32,0.1)] transition hover:bg-pine-800 hover:shadow-[0_1px_2px_rgba(42,37,32,0.12),0_8px_24px_rgba(42,37,32,0.12)] focus:outline-none focus-visible:ring-2 focus-visible:ring-pine-600 focus-visible:ring-offset-2`}
                >
                  Забронировать
                </Link>
              </div>
            </article>
            <p className="text-muted-foreground mt-3 text-xs leading-relaxed">
              Промо-бейджи — приглушённые; primary с лёгкой умбровой тенью. Без второго независимого линка «Подробнее» на тот же
              URL, что и бронь.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <button
              type="button"
              className={`rounded-[12px] bg-pine-900 px-5 py-3 text-sm font-medium text-white ${shadowBtn}`}
            >
              CTA default
            </button>
            <button
              type="button"
              className="rounded-[12px] bg-pine-800 px-5 py-3 text-sm font-medium text-white shadow-[0_1px_2px_rgba(42,37,32,0.1),0_10px_28px_rgba(42,37,32,0.12)]"
            >
              CTA hover
            </button>
            <button
              type="button"
              className="rounded-[12px] bg-pine-900/40 px-5 py-3 text-sm font-medium text-white"
              disabled
            >
              Disabled
            </button>
          </div>
        </section>

        {/* 7. Tone of voice */}
        <section className={`border-border rounded-2xl border border-pine-100 bg-gradient-to-br from-card to-pine-100/30 p-6 md:p-8 ${shadowCard}`}>
          <h2 className={`${literata.className} text-foreground text-[clamp(1.375rem,2.5vw,1.75rem)] font-semibold`}>
            7. Tone of voice
          </h2>
          <p className="text-foreground mt-4 text-[17px] font-medium leading-snug">
            Заголовок героя каталога: «Туры в Абхазию — цены и условия без сюрпризов».
          </p>
          <p className="text-muted-foreground mt-3 max-w-2xl text-[15px] leading-relaxed">
            Микротекст под основным CTA: «Менеджер подтвердит детали и статус заявки — без лишних звонков и навязанных
            доплат». То же сверху страницы в блоке-герое.
          </p>
        </section>

        {/* 8. Логотип */}
        <section>
          <h2 className={`${literata.className} text-foreground text-[clamp(1.375rem,2.5vw,1.75rem)] font-semibold`}>
            8. Логотип
          </h2>
          <p className="text-muted-foreground mt-3 max-w-3xl text-[15px] leading-relaxed">
            Словесный знак + опционально знак: береговая линия и силуэт хребта или монограмма «А». Основной цвет — pine-900
            на светлом, белый на тёмном primary. Не искажать пропорции, не ужимать поля, не класть на шумный фон без
            подложки, не добавлять градиенты вне версий гайда.
          </p>
        </section>

        {/* 9. Ограничения */}
        <section className={`border-border rounded-xl border bg-pine-100/40 p-5 ${shadowCard}`}>
          <h2 className={`${literata.className} text-foreground text-[clamp(1.25rem,2vw,1.5rem)] font-semibold`}>
            9. Ограничения
          </h2>
          <ul className="text-muted-foreground mt-3 list-inside list-disc space-y-1.5 text-sm leading-relaxed">
            <li>Не копировать визуальный стиль и названия конкурентов.</li>
            <li>Контраст и интерактивы — ориентир WCAG; ссылки различимы не только цветом.</li>
            <li>Одна система для лендинга, каталога, ЛК и email.</li>
          </ul>
        </section>

        {/* 10. Чеклист */}
        <section>
          <h2 className={`${literata.className} text-foreground text-[clamp(1.375rem,2.5vw,1.75rem)] font-semibold`}>
            10. Чеклист соответствия
          </h2>
          <ol className="mt-4 space-y-2">
            {checklist.map((item, i) => (
              <li
                key={i}
                className={`border-border flex gap-3 rounded-lg border bg-card px-4 py-3 text-sm leading-relaxed ${shadowCard}`}
              >
                <span className="text-pine-700 tabular-nums font-semibold">{i + 1}.</span>
                <span className="text-muted-foreground">{item}</span>
              </li>
            ))}
          </ol>
        </section>

        <p className="border-border text-muted-foreground border-t pt-10 text-center text-sm">
          <Link href="/tury-abkhazia" className="text-pine-800 font-medium underline decoration-pine-600/35 underline-offset-2 hover:decoration-pine-800">
            Открыть каталог
          </Link>
          {" · "}
          <Link href="/" className="text-pine-800 font-medium underline decoration-pine-600/35 underline-offset-2 hover:decoration-pine-800">
            На главную
          </Link>
        </p>
      </div>
    </div>
  );
}
