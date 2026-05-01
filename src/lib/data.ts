export type Tour = {
  id: string;
  title: string;
  image: string;
  resort: string;
  days: number;
  priceFrom: number;
  rating: number;
  audience: "budget" | "family" | "premium";
  description: string;
  cityDeparture: string[];
};

export type Resort = {
  slug: string;
  name: string;
  short: string;
  highlights: string[];
  /** Обложка курорта (статика в /public, напр. /images/resorts/...). */
  coverImage: string;
  coverImageAlt: string;
};

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  content: string[];
  tags: string[];
};

export const tours: Tour[] = [
  {
    id: "gagra-summer-7",
    title: "Гагра: летний отдых 7 ночей",
    image: "/tour-placeholder.svg",
    resort: "Гагра",
    days: 7,
    priceFrom: 68900,
    rating: 4.7,
    audience: "family",
    description:
      "Семейный пакет с трансфером, завтраками и подбором отеля рядом с морем.",
    cityDeparture: ["moskva", "spb", "ekaterinburg"],
  },
  {
    id: "pitsunda-budget-6",
    title: "Пицунда: бюджетный тур 6 ночей",
    image: "/tour-placeholder.svg",
    resort: "Пицунда",
    days: 6,
    priceFrom: 52900,
    rating: 4.5,
    audience: "budget",
    description:
      "Оптимальный вариант по цене: прозрачная стоимость, без скрытых доплат.",
    cityDeparture: ["moskva", "kazan"],
  },
  {
    id: "sukhum-premium-8",
    title: "Сухум Premium 8 ночей",
    image: "/tour-placeholder.svg",
    resort: "Сухум",
    days: 8,
    priceFrom: 149000,
    rating: 4.9,
    audience: "premium",
    description:
      "Премиальный формат с персональным менеджером, VIP-трансфером и concierge.",
    cityDeparture: ["moskva", "spb"],
  },
  {
    id: "new-athos-classic-7",
    title: "Новый Афон: классический тур 7 ночей",
    image: "/tour-placeholder.svg",
    resort: "Новый Афон",
    days: 7,
    priceFrom: 73900,
    rating: 4.6,
    audience: "family",
    description:
      "Сбалансированный отдых для пары или семьи, в том числе с детьми.",
    cityDeparture: ["moskva", "samara", "nizhniy-novgorod"],
  },
];

export const resorts: Resort[] = [
  {
    slug: "gagra",
    name: "Гагра",
    short: "Курорт с развитой инфраструктурой и широкой линейкой отелей.",
    highlights: ["Пляжи и набережная", "Семейные отели", "Удобная логистика"],
    coverImage: "/images/resorts/gagra.jpg",
    coverImageAlt:
      "Гагра, Абхазия: историческое здание Гагрипш среди пальм и субтропической растительности",
  },
  {
    slug: "pitsunda",
    name: "Пицунда",
    short: "Тихий курорт для спокойного отдыха и природных локаций.",
    highlights: ["Сосновые рощи", "Чистое море", "Спокойный формат отдыха"],
    coverImage: "/images/resorts/pitsunda.jpg",
    coverImageAlt:
      "Пицунда, Абхазия: вид на мыс, пляж, сосновый лес и курортную застройку с высоты",
  },
  {
    slug: "sukhum",
    name: "Сухум",
    short: "Городской формат отдыха с выбором премиальных и business-решений.",
    highlights: ["Городская инфраструктура", "Рестораны и сервис", "Premium-опции"],
    coverImage: "/images/resorts/sukhum.jpg",
    coverImageAlt:
      "Сухум, Абхазия: панорама города, набережная Чёрного моря и горы на горизонте",
  },
  {
    slug: "new-afon",
    name: "Новый Афон",
    short: "Комбинация природы, достопримечательностей и спокойного темпа.",
    highlights: ["Культурные объекты", "Природные маршруты", "Семейный формат"],
    coverImage: "/images/resorts/new-afon.jpg",
    coverImageAlt:
      "Новый Афон, Абхазия: павильон станции Псырцха у реки среди субтропической растительности",
  },
];

export const cityMap: Record<string, string> = {
  moskva: "Москвы",
  spb: "Санкт-Петербурга",
  kazan: "Казани",
  samara: "Самары",
  ekaterinburg: "Екатеринбурга",
  "nizhniy-novgorod": "Нижнего Новгорода",
};

export const blogPosts: BlogPost[] = [
  {
    slug: "kogda-luchshe-ekhat-v-abkhaziyu",
    title: "Когда лучше ехать в Абхазию: календарь сезона",
    excerpt: "Разбираем месяцы по погоде, ценам и загруженности курортов.",
    tags: ["сезон", "погода", "планирование"],
    content: [
      "Пик спроса на туры в Абхазию приходится на лето, поэтому лучшее окно для бронирования - весна.",
      "Для семейного отдыха оптимальны июнь и сентябрь: комфортная температура и меньше перегрузка курортов.",
      "Для бюджетного сегмента выгоднее смотреть предложения в мае и октябре.",
    ],
  },
  {
    slug: "oteli-abkhazia-dlya-semeynogo-otdyha",
    title: "Отели Абхазии для семейного отдыха",
    excerpt: "Критерии выбора и проверочные вопросы перед бронированием.",
    tags: ["отели", "семья", "курорты"],
    content: [
      "Перед выбором отеля фиксируйте обязательные параметры: расстояние до моря, питание, детская инфраструктура.",
      "Проверяйте условия отмены и возврата до оплаты, особенно в высокий сезон.",
      "Для семей рекомендуем выбирать объекты с прозрачными отзывами и подтвержденной логистикой трансфера.",
    ],
  },
  {
    slug: "kak-vybrat-tur-v-abkhaziyu-bez-skrytyh-platezhey",
    title: "Как выбрать тур в Абхазию без скрытых платежей",
    excerpt: "Чеклист прозрачной цены и условий до подтверждения брони.",
    tags: ["туры", "цена", "чеклист"],
    content: [
      "Сравнивайте предложения по формату 'цена под ключ': проживание, питание, трансфер, обязательные сборы.",
      "Любое отклонение цены на этапе подтверждения требует отдельного согласования.",
      "Запрашивайте письменную фиксацию условий отмены и сроков возврата.",
    ],
  },
];

export function formatRub(value: number): string {
  return new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "RUB",
    maximumFractionDigits: 0,
  }).format(value);
}

/** Короткая строка для витрины: «12,5 тыс. продано». */
export function formatApproxSold(n: number): string {
  const dec = (x: number) => String(x).replace(".", ",");
  if (n >= 1_000_000) {
    const v = n / 1_000_000;
    return `${dec(v >= 10 ? Math.round(v) : Math.round(v * 10) / 10)} млн продано`;
  }
  if (n >= 10_000) {
    const v = n / 1000;
    return `${dec(v >= 100 ? Math.round(v) : Math.round(v * 10) / 10)} тыс. продано`;
  }
  if (n >= 1000) {
    return `${dec(Math.round(n / 100) / 10)} тыс. продано`;
  }
  return `${n} продано`;
}

export function audienceLabel(audience: Tour["audience"]): string {
  if (audience === "budget") return "Бюджетный";
  if (audience === "family") return "Семейный";
  return "Премиум";
}
