import Link from "next/link";

const links = [
  { href: "/", label: "Главная" },
  { href: "/tury-abkhazia", label: "Туры" },
  { href: "/oteli-abkhazia", label: "Отели" },
  { href: "/blog", label: "Гид" },
  { href: "/lichnyy-kabinet", label: "Кабинет" },
  { href: "/partner/login", label: "Партнерам" },
  { href: "/zayavka", label: "Подбор тура" },
  { href: "/admin/leads", label: "CRM" },
];

export function Header() {
  return (
    <header className="border-b border-pine-100 bg-white">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="text-xl font-semibold text-pine-900">
          AbkhaziaTrip
        </Link>
        <nav className="flex flex-wrap items-center gap-4 text-sm text-pine-700">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-pine-900">
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
