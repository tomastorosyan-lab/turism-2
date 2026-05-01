import { whyAbkhaziaTrip } from "@/lib/site-content";
import { SITE_NAME } from "@/lib/brand";

const icons = ["◆", "◇", "◎"] as const;

/** Блок «Почему выбирают» — трёхколоночная сетка как на крупных витринах туров. */
export function WhyMarketplaceSection() {
  const topThree = whyAbkhaziaTrip.items.slice(0, 3);

  return (
    <section className="py-12 md:py-16" aria-labelledby="why-mkt-heading">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">Travel ready</p>
        <h2 id="why-mkt-heading" className="mt-3 text-2xl font-bold tracking-tight text-zinc-900 md:text-3xl">
          Почему выбирают {SITE_NAME}?
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-zinc-600 md:text-base">{whyAbkhaziaTrip.subtitle}</p>
      </div>
      <ul className="mt-10 grid gap-6 md:grid-cols-3">
        {topThree.map((item, i) => (
          <li
            key={item.title}
            className="flex flex-col rounded-xl border border-zinc-200 bg-white p-6 text-center shadow-[0_1px_3px_rgba(0,0,0,0.06)]"
          >
            <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-pine-50 text-lg text-pine-800">
              {icons[i]}
            </span>
            <h3 className="mt-4 text-base font-bold text-zinc-900">{item.title}</h3>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-zinc-600">{item.body}</p>
          </li>
        ))}
      </ul>
      <div className="mx-auto mt-10 max-w-2xl rounded-xl border border-dashed border-zinc-200 bg-zinc-50 px-4 py-5 text-center text-sm text-zinc-700">
        Надёжный сервис подбора: менеджер, статус заявки в кабинете и понятные правила до оплаты.
      </div>
    </section>
  );
}
