import Image from "next/image";
import Link from "next/link";
import { resorts } from "@/lib/data";
import { interestingPlacesSeed } from "@/lib/site-content";

const resortBySlug = Object.fromEntries(resorts.map((r) => [r.slug, r]));

/** Горизонтальный блок «Интересные места» в духе витрин-маркетплейсов. */
export function InterestingPlacesSection() {
  return (
    <section className="py-10 md:py-14" aria-labelledby="places-heading">
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <h2 id="places-heading" className="text-xl font-bold tracking-tight text-zinc-900 md:text-2xl">
          Интересные места
        </h2>
        <Link href="/blog" className="text-sm font-semibold text-pine-800 hover:underline">
          Смотреть все
        </Link>
      </div>
      <div className="-mx-4 flex gap-3 overflow-x-auto pb-2 pl-4 pr-4 md:-mx-0 md:pl-0 md:pr-0">
        {interestingPlacesSeed.map((p) => {
          const rs = resortBySlug[p.slug];
          return (
            <Link
              key={p.slug}
              href={p.href}
              className="flex w-[min(200px,72vw)] shrink-0 flex-col overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm transition hover:border-zinc-300 hover:shadow-md"
            >
              <div className="relative aspect-[4/3] w-full bg-gradient-to-br from-pine-100 to-pine-50">
                {rs ? (
                  <Image
                    src={rs.coverImage}
                    alt={rs.coverImageAlt}
                    fill
                    className="object-cover"
                    sizes="200px"
                  />
                ) : null}
              </div>
              <div className="p-3">
                <p className="text-sm font-semibold leading-snug text-zinc-900">{p.name}</p>
                <p className="mt-1 text-xs text-zinc-600">{p.hint}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
