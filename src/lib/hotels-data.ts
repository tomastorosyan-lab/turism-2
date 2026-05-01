export type Hotel = {
  id: string;
  name: string;
  slug: string;
  resortSlug: string;
  resortName: string;
  rating: number;
  reviewCount: number;
  priceFrom: number;
  tags: string[];
  short: string;
  beachMeters?: number;
};

/** Демо-каталог отелей Абхазии для UI и SEO-хаба /oteli-abkhazia (данные вымышленные, без копипаста). */
export const hotels: Hotel[] = [
  {
    id: "h-gagra-breeze",
    name: "Санрайз Гагра Парк",
    slug: "sanrayz-gagra-park",
    resortSlug: "gagra",
    resortName: "Гагра",
    rating: 4.7,
    reviewCount: 214,
    priceFrom: 4200,
    tags: ["Семья", "Пляж", "Завтрак"],
    short: "2-я линия, бассейн, детская зона — удобно для отдыха с детьми в Гагре.",
    beachMeters: 350,
  },
  {
    id: "h-pitsunda-pine",
    name: "Пицунда Панорама",
    slug: "pitsunda-panorama",
    resortSlug: "pitsunda",
    resortName: "Пицунда",
    rating: 4.6,
    reviewCount: 156,
    priceFrom: 3800,
    tags: ["Спокойствие", "Сосны", "Полупансион"],
    short: "Тихий корпус у сосновой рощи, подходит для спокойного отдыха у моря.",
    beachMeters: 600,
  },
  {
    id: "h-sukhum-atrium",
    name: "Атриум Сухум",
    slug: "atrium-suhum",
    resortSlug: "sukhum",
    resortName: "Сухум",
    rating: 4.8,
    reviewCount: 302,
    priceFrom: 5500,
    tags: ["Премиум", "СПА", "Сити"],
    short: "Городской премиум: ресторан, СПА, трансфер до пляжной зоны.",
    beachMeters: 1200,
  },
  {
    id: "h-afon-cliff",
    name: "Афонский Бриз",
    slug: "afonskiy-briz",
    resortSlug: "new-afon",
    resortName: "Новый Афон",
    rating: 4.5,
    reviewCount: 98,
    priceFrom: 4100,
    tags: ["Экскурсии", "Природа", "Семья"],
    short: "Рядом с достопримечательностями Нового Афона, комфорт для семейных маршрутов.",
    beachMeters: 800,
  },
  {
    id: "h-gagra-value",
    name: "Гагра Вэлью Инн",
    slug: "gagra-value-inn",
    resortSlug: "gagra",
    resortName: "Гагра",
    rating: 4.3,
    reviewCount: 441,
    priceFrom: 2900,
    tags: ["Бюджет", "Пляж 10 мин"],
    short: "Доступный формат для молодёжи и пар: чистые номера, честные фото и описание.",
    beachMeters: 650,
  },
  {
    id: "h-pitsunda-lux",
    name: "Мыс Питиус Лодж",
    slug: "mys-pitius-lodge",
    resortSlug: "pitsunda",
    resortName: "Пицунда",
    rating: 4.9,
    reviewCount: 67,
    priceFrom: 9200,
    tags: ["Премиум", "Вид на море", "Вилла"],
    short: "Малоэтажный премиум с видом на море — для отдыха без суеты в Пицунде.",
    beachMeters: 120,
  },
];

const resortSlugByName: Record<string, string> = {
  Гагра: "gagra",
  Пицунда: "pitsunda",
  Сухум: "sukhum",
  "Новый Афон": "new-afon",
};

export function resortNameToSlug(name: string): string {
  return resortSlugByName[name] ?? "abkhazia";
}
