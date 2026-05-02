"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getOperatorById } from "@/lib/operator-auth";
import { readOffersByOperator, updateOperatorOffer } from "@/lib/operator-offers";

export type PartnerOfferActionState = {
  ok: boolean | null;
  message: string;
};

export async function updatePartnerOffer(
  _prev: PartnerOfferActionState,
  formData: FormData
): Promise<PartnerOfferActionState> {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get("operator_session")?.value;
  if (!sessionId) {
    return { ok: false, message: "Сессия недействительна. Войдите снова." };
  }
  const operator = getOperatorById(sessionId);
  if (!operator) {
    return { ok: false, message: "Доступ запрещён." };
  }

  const offerId = String(formData.get("offerId") ?? "").trim();
  const mine = await readOffersByOperator(operator.id);
  if (!offerId || !mine.some((o) => o.id === offerId)) {
    return { ok: false, message: "Оффер не найден или недоступен для этого аккаунта." };
  }

  const title = String(formData.get("title") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const image = String(formData.get("image") ?? "").trim();
  const resort = String(formData.get("resort") ?? "").trim();
  const nights = Number(formData.get("nights"));
  const availability = String(formData.get("availability") ?? "");
  const price = Number(formData.get("price"));

  if (!title) {
    return { ok: false, message: "Укажите название тура." };
  }
  if (!description) {
    return { ok: false, message: "Добавьте описание для витрины." };
  }
  if (!image) {
    return { ok: false, message: "Укажите URL изображения или /tour-placeholder.svg." };
  }
  if (!resort) {
    return { ok: false, message: "Укажите курорт." };
  }
  if (!Number.isFinite(nights) || nights < 1 || nights > 365) {
    return { ok: false, message: "Число ночей: от 1 до 365." };
  }
  if (!["available", "limited", "sold_out"].includes(availability)) {
    return { ok: false, message: "Выберите корректное наличие мест." };
  }
  if (!Number.isFinite(price) || price < 0 || price > 100000000) {
    return { ok: false, message: "Укажите цену в рублях (от 0)." };
  }

  const updated = await updateOperatorOffer(offerId, {
    title,
    description,
    image,
    resort,
    nights: Math.round(nights),
    availability: availability as "available" | "limited" | "sold_out",
    price: Math.round(price),
  });

  if (!updated) {
    return { ok: false, message: "Не удалось сохранить. Попробуйте ещё раз." };
  }

  revalidatePath("/partner/dashboard");
  return { ok: true, message: "Сохранено. Карточка на сайте обновлена." };
}

export async function logoutPartner(): Promise<void> {
  const store = await cookies();
  store.set("operator_session", "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });
  redirect("/partner/login");
}
