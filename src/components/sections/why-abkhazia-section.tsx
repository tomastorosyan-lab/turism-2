import { whyAbkhaziaTrip } from "@/lib/site-content";

export function WhyAbkhaziaSection() {
  return (
    <section className="rounded-2xl border border-pine-100 bg-gradient-to-b from-white to-pine-50/50 px-5 py-10 md:px-10 md:py-12" aria-labelledby="why-heading">
      <h2 id="why-heading" className="text-2xl font-semibold text-pine-900 md:text-3xl">
        {whyAbkhaziaTrip.title}
      </h2>
      <p className="mt-3 max-w-3xl text-pine-700">{whyAbkhaziaTrip.subtitle}</p>
      <ul className="mt-8 grid gap-6 md:grid-cols-2">
        {whyAbkhaziaTrip.items.map((item) => (
          <li key={item.title} className="rounded-xl border border-pine-100 bg-white p-5 shadow-sm">
            <h3 className="text-lg font-semibold text-pine-900">{item.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-pine-700">{item.body}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
