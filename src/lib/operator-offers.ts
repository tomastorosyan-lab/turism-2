import { promises as fs } from "node:fs";
import path from "node:path";

export type OperatorOffer = {
  id: string;
  operatorId: string;
  title: string;
  description: string;
  image: string;
  resort: string;
  nights: number;
  price: number;
  availability: "available" | "limited" | "sold_out";
  updatedAt: string;
};

const dataDir = path.join(process.cwd(), "data");
const dataFile = path.join(dataDir, "operator-offers.json");

const seedOffers: OperatorOffer[] = [
  {
    id: "offer-sea-1",
    operatorId: "op-sea-sun",
    title: "Гагра Family 7N",
    description: "Семейный пакет с трансфером, завтраками и отелем рядом с морем.",
    image: "/tour-placeholder.svg",
    resort: "Гагра",
    nights: 7,
    price: 72400,
    availability: "available",
    updatedAt: new Date().toISOString(),
  },
  {
    id: "offer-sea-2",
    operatorId: "op-sea-sun",
    title: "Сухум Premium 8N",
    description: "Премиальный отдых с персональным менеджером и VIP-поддержкой.",
    image: "/tour-placeholder.svg",
    resort: "Сухум",
    nights: 8,
    price: 161000,
    availability: "limited",
    updatedAt: new Date().toISOString(),
  },
  {
    id: "offer-mountain-1",
    operatorId: "op-mountain",
    title: "Пицунда Budget 6N",
    description: "Бюджетный формат без скрытых доплат и с прозрачными условиями.",
    image: "/tour-placeholder.svg",
    resort: "Пицунда",
    nights: 6,
    price: 54900,
    availability: "available",
    updatedAt: new Date().toISOString(),
  },
];

async function ensureStore(): Promise<void> {
  await fs.mkdir(dataDir, { recursive: true });
  try {
    await fs.access(dataFile);
  } catch {
    await fs.writeFile(dataFile, JSON.stringify(seedOffers, null, 2), "utf8");
  }
}

export async function readOperatorOffers(): Promise<OperatorOffer[]> {
  await ensureStore();
  const content = await fs.readFile(dataFile, "utf8");
  const raw = JSON.parse(content) as Partial<OperatorOffer>[];
  const normalized: OperatorOffer[] = raw.map((item, index) => ({
    id: item.id ?? `offer-${index + 1}`,
    operatorId: item.operatorId ?? "op-sea-sun",
    title: item.title ?? "Тур в Абхазию",
    description: item.description ?? "Описание уточняется туроператором.",
    image: item.image && item.image.trim() ? item.image : "/tour-placeholder.svg",
    resort: item.resort ?? "Абхазия",
    nights: typeof item.nights === "number" ? item.nights : 7,
    price: typeof item.price === "number" ? item.price : 0,
    availability:
      item.availability === "available" ||
      item.availability === "limited" ||
      item.availability === "sold_out"
        ? item.availability
        : "available",
    updatedAt: item.updatedAt ?? new Date().toISOString(),
  }));
  await fs.writeFile(dataFile, JSON.stringify(normalized, null, 2), "utf8");
  return normalized;
}

export async function readOffersByOperator(operatorId: string): Promise<OperatorOffer[]> {
  const list = await readOperatorOffers();
  return list.filter((item) => item.operatorId === operatorId);
}

export async function updateOperatorOffer(
  offerId: string,
  payload: {
    title: string;
    description: string;
    image: string;
    resort: string;
    nights: number;
    price: number;
    availability: OperatorOffer["availability"];
  }
): Promise<OperatorOffer | null> {
  const list = await readOperatorOffers();
  const index = list.findIndex((item) => item.id === offerId);
  if (index === -1) return null;
  list[index] = {
    ...list[index],
    title: payload.title,
    description: payload.description,
    image: payload.image,
    resort: payload.resort,
    nights: payload.nights,
    price: payload.price,
    availability: payload.availability,
    updatedAt: new Date().toISOString(),
  };
  await fs.writeFile(dataFile, JSON.stringify(list, null, 2), "utf8");
  return list[index];
}
