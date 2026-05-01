import type { Metadata } from "next";
import { SITE_NAME, SITE_URL } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Заявка на подбор тура в Абхазию",
  description: `Оставьте заявку — менеджер ${SITE_NAME} подберёт тур и отдых в Абхазии. Официальный сайт abkhaziatrip.ru.`,
  alternates: { canonical: `${SITE_URL}/zayavka` },
};

export default function ZayavkaLayout({ children }: { children: React.ReactNode }) {
  return children;
}
