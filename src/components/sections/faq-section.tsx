import { faqSeed } from "@/lib/site-content";
import { SITE_NAME } from "@/lib/brand";

export function FaqSection() {
  return (
    <section className="border-t border-zinc-200 py-12 md:py-16" aria-labelledby="faq-heading">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-400">FAQ</p>
      <h2 id="faq-heading" className="mt-2 text-xl font-bold tracking-tight text-zinc-900 md:text-2xl">
        Частые вопросы
      </h2>
      <p className="mt-2 max-w-2xl text-sm text-zinc-600">Бронирование и оплата туров в Абхазию через {SITE_NAME}.</p>
      <div className="mt-8 divide-y divide-zinc-100 rounded-xl border border-zinc-200 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
        {faqSeed.map((item) => (
          <details key={item.id} className="group p-4 md:p-5">
            <summary className="cursor-pointer list-none font-semibold text-zinc-900 outline-none marker:content-none [&::-webkit-details-marker]:hidden">
              <span className="flex items-center justify-between gap-2">
                {item.question}
                <span className="text-zinc-400 transition group-open:rotate-180">▼</span>
              </span>
            </summary>
            <p className="mt-3 text-sm leading-relaxed text-zinc-600">{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
