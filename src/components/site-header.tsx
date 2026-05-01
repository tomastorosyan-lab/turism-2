"use client";

import Link from "next/link";
import { useState } from "react";
import { SITE_NAME, SITE_URL } from "@/lib/brand";

const links = [
  { href: "/tury-abkhazia", label: "Каталог" },
  { href: "/blog", label: "Блог" },
  { href: "/", label: "Главная" },
  { href: "/oteli-abkhazia", label: "Отели" },
  { href: "/oferta", label: "Оферта" },
  { href: "/partner/login", label: "Партнёрам" },
  { href: "/zayavka", label: "Подбор тура" },
  { href: "/admin/leads", label: "CRM" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white">
      <div className="mx-auto flex w-full max-w-[1320px] items-center justify-between gap-3 px-4 py-3 md:px-6">
        <Link
          href="/"
          className="flex min-w-0 flex-col leading-tight focus:outline-none focus-visible:ring-2 focus-visible:ring-pine-600 focus-visible:ring-offset-2 rounded-md"
        >
          <span className="truncate text-lg font-bold tracking-tight text-zinc-900 md:text-xl">{SITE_NAME}</span>
          <span className="hidden truncate text-[11px] text-zinc-500 sm:block">{SITE_URL.replace(/^https:\/\//, "")}</span>
        </Link>
        <nav className="hidden flex-wrap items-center justify-end gap-x-1 lg:flex xl:gap-x-2">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-md px-2 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50 hover:text-zinc-900 xl:px-2.5"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/lichnyy-kabinet"
            className="ml-1 rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm font-semibold text-zinc-900 hover:border-zinc-300"
          >
            Кабинет
          </Link>
        </nav>
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-lg border border-zinc-200 px-3 py-2 text-sm font-medium text-zinc-900 lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "Закрыть" : "Меню"}
        </button>
      </div>
      {open ? (
        <nav id="mobile-nav" className="border-t border-zinc-100 bg-white px-4 py-3 lg:hidden">
          <ul className="grid gap-1 text-sm font-medium text-zinc-800">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="block rounded-lg px-3 py-2.5 hover:bg-zinc-50"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/lichnyy-kabinet"
                className="block rounded-lg px-3 py-2.5 font-semibold hover:bg-zinc-50"
                onClick={() => setOpen(false)}
              >
                Кабинет
              </Link>
            </li>
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
