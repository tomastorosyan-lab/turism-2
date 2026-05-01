import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import Image from "next/image";
import { getOperatorById } from "@/lib/operator-auth";
import { readOffersByOperator, updateOperatorOffer } from "@/lib/operator-offers";

export const dynamic = "force-dynamic";

export default async function PartnerDashboardPage() {
  const cookieStore = await cookies();
  const operatorId = cookieStore.get("operator_session")?.value;
  if (!operatorId) redirect("/partner/login");

  const operator = getOperatorById(operatorId);
  if (!operator) redirect("/partner/login");
  const operatorAccount = operator;

  const offers = await readOffersByOperator(operatorAccount.id);

  async function updateOfferAction(formData: FormData) {
    "use server";
    const offerId = String(formData.get("offerId"));
    const title = String(formData.get("title"));
    const description = String(formData.get("description"));
    const image = String(formData.get("image"));
    const resort = String(formData.get("resort"));
    const nights = Number(formData.get("nights"));
    const availability = String(formData.get("availability"));
    const price = Number(formData.get("price"));
    if (
      !title ||
      !description ||
      !image ||
      !resort ||
      !Number.isFinite(nights) ||
      !["available", "limited", "sold_out"].includes(availability) ||
      !Number.isFinite(price)
    ) {
      return;
    }
    const updated = await updateOperatorOffer(offerId, {
      title,
      description,
      image,
      resort,
      nights,
      availability: availability as "available" | "limited" | "sold_out",
      price,
    });
    if (!updated || updated.operatorId !== operatorAccount.id) return;
    revalidatePath("/partner/dashboard");
  }

  async function logoutAction() {
    "use server";
    const store = await cookies();
    store.set("operator_session", "", {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
      path: "/",
      maxAge: 0,
    });
    redirect("/partner/login");
  }

  return (
    <div className="grid gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-3xl font-semibold text-pine-900">
          Партнерская админка: {operatorAccount.name}
        </h1>
        <form action={logoutAction}>
          <button className="rounded-full border border-pine-600 px-4 py-2 text-sm text-pine-700" type="submit">
            Выйти
          </button>
        </form>
      </div>
      <p className="text-sm text-pine-700">
        Обновляйте все поля карточки товара: картинку, название, описание, цену, курорт, ночи и
        наличие. Изменения сразу попадают в витрину.
      </p>
      <div className="grid gap-4">
        {offers.map((offer) => (
          <article key={offer.id} className="rounded-xl border border-pine-100 bg-white p-5">
            <Image
              src={offer.image || "/tour-placeholder.svg"}
              alt={offer.title}
              width={1200}
              height={700}
              className="h-40 w-full rounded-lg object-cover"
            />
            <form action={updateOfferAction} className="mt-4 grid gap-3 md:grid-cols-2">
              <input type="hidden" name="offerId" value={offer.id} />
              <label className="grid gap-1 text-xs text-pine-700 md:col-span-2">
                Название
                <input
                  defaultValue={offer.title}
                  name="title"
                  className="rounded border border-pine-100 px-2 py-1"
                />
              </label>
              <label className="grid gap-1 text-xs text-pine-700 md:col-span-2">
                Описание
                <textarea
                  defaultValue={offer.description}
                  name="description"
                  rows={3}
                  className="rounded border border-pine-100 px-2 py-1"
                />
              </label>
              <label className="grid gap-1 text-xs text-pine-700 md:col-span-2">
                Ссылка на картинку
                <input
                  defaultValue={offer.image}
                  name="image"
                  className="rounded border border-pine-100 px-2 py-1"
                />
              </label>
              <label className="grid gap-1 text-xs text-pine-700">
                Курорт
                <input
                  defaultValue={offer.resort}
                  name="resort"
                  className="rounded border border-pine-100 px-2 py-1"
                />
              </label>
              <label className="grid gap-1 text-xs text-pine-700">
                Ночей
                <input
                  defaultValue={offer.nights}
                  name="nights"
                  type="number"
                  className="rounded border border-pine-100 px-2 py-1"
                />
              </label>
              <label className="grid gap-1 text-xs text-pine-700">
                Цена
                <input
                  defaultValue={offer.price}
                  name="price"
                  type="number"
                  className="rounded border border-pine-100 px-2 py-1"
                />
              </label>
              <label className="grid gap-1 text-xs text-pine-700">
                Наличие
                <select
                  defaultValue={offer.availability}
                  name="availability"
                  className="rounded border border-pine-100 px-2 py-1"
                >
                  <option value="available">Доступно</option>
                  <option value="limited">Осталось мало</option>
                  <option value="sold_out">Нет мест</option>
                </select>
              </label>
              <div className="flex items-end justify-between text-xs text-pine-600 md:col-span-2">
                <span>Обновлено: {new Date(offer.updatedAt).toLocaleString("ru-RU")}</span>
                <button
                  type="submit"
                  className="rounded-full border border-pine-600 px-3 py-1 text-xs text-pine-700"
                >
                  Сохранить
                </button>
              </div>
            </form>
          </article>
        ))}
      </div>
    </div>
  );
}
