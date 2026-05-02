"use client";

import { useFormState, useFormStatus } from "react-dom";
import { useId } from "react";
import type { OperatorOffer } from "@/lib/operator-offers";
import { TourCoverImage } from "@/components/catalog/tour-cover-image";
import { updatePartnerOffer, type PartnerOfferActionState } from "./actions";
import { formatRub } from "@/lib/data";

const initialState: PartnerOfferActionState = { ok: null, message: "" };

function availabilityLabel(v: OperatorOffer["availability"]): string {
  if (v === "available") return "Есть места";
  if (v === "limited") return "Мало мест";
  return "Нет мест";
}

function PartnerSubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex min-h-[44px] min-w-[160px] items-center justify-center rounded-full bg-pine-900 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-pine-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-pine-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {pending ? "Сохранение…" : "Сохранить изменения"}
    </button>
  );
}

const inputClass =
  "w-full min-h-11 rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 shadow-sm transition placeholder:text-zinc-400 focus:border-pine-600 focus:outline-none focus:ring-2 focus:ring-pine-600/25";

export function PartnerOfferCard({
  offer,
  updatedAtLabel,
}: {
  offer: OperatorOffer;
  /** Отформатировано на сервере — иначе toLocaleString даёт рассинхрон гидрации SSR/клиент. */
  updatedAtLabel: string;
}) {
  const [state, formAction] = useFormState(updatePartnerOffer, initialState);
  const baseId = useId();
  const titleId = `${baseId}-title`;
  const descId = `${baseId}-desc`;
  const imageId = `${baseId}-image`;
  const resortId = `${baseId}-resort`;
  const nightsId = `${baseId}-nights`;
  const priceId = `${baseId}-price`;
  const availId = `${baseId}-avail`;

  return (
    <article className="overflow-hidden rounded-2xl border border-zinc-200/90 bg-white shadow-md">
      <div className="border-b border-zinc-100 bg-zinc-50/80 px-4 py-3 md:flex md:items-center md:justify-between md:px-6">
        <div>
          <h2 className="text-base font-semibold text-pine-900 md:text-lg">{offer.title}</h2>
          <p className="mt-0.5 text-xs text-zinc-600">
            ID оффера: <span className="font-mono text-zinc-700">{offer.id}</span>
          </p>
        </div>
        <p className="mt-2 text-xs text-zinc-500 md:mt-0">
          На витрине:{" "}
          <span className="font-medium text-pine-800">{availabilityLabel(offer.availability)}</span>
          {" · "}
          {formatRub(offer.price)}
        </p>
      </div>

      <div className="grid gap-6 p-4 md:grid-cols-[minmax(0,220px)_1fr] md:gap-8 md:p-6">
        <div className="relative mx-auto aspect-[4/3] w-full max-w-[280px] shrink-0 overflow-hidden rounded-xl border border-zinc-200 bg-zinc-100 md:mx-0 md:max-w-none">
          <TourCoverImage src={offer.image} alt={`Превью: ${offer.title}`} className="h-full w-full object-cover" />
        </div>

        <form action={formAction} className="grid min-w-0 gap-4">
          <input type="hidden" name="offerId" value={offer.id} />

          <div
            className={
              state.ok === true
                ? "rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm md:px-4 md:py-3"
                : state.ok === false
                  ? "rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm md:px-4 md:py-3"
                  : "rounded-lg border border-zinc-100 bg-zinc-50/80 px-3 py-2 text-sm md:px-4 md:py-3"
            }
            role="status"
            aria-live="polite"
          >
            {state.message ? (
              <p className={state.ok === true ? "text-emerald-900" : "text-red-800"}>{state.message}</p>
            ) : (
              <p className="text-zinc-600">
                Заполните поля и нажмите «Сохранить». Изменения появятся на публичной витрине после сохранения.
              </p>
            )}
          </div>

          <div className="grid gap-4">
            <label htmlFor={titleId} className="grid gap-1.5">
              <span className="text-sm font-medium text-zinc-800">Название на витрине</span>
              <input
                id={titleId}
                name="title"
                required
                defaultValue={offer.title}
                className={inputClass}
                autoComplete="off"
              />
            </label>

            <label htmlFor={descId} className="grid gap-1.5">
              <span className="text-sm font-medium text-zinc-800">Описание</span>
              <textarea
                id={descId}
                name="description"
                required
                rows={4}
                defaultValue={offer.description}
                className={`${inputClass} resize-y min-h-[100px]`}
              />
            </label>

            <label htmlFor={imageId} className="grid gap-1.5">
              <span className="text-sm font-medium text-zinc-800">URL изображения</span>
              <input
                id={imageId}
                name="image"
                required
                type="text"
                inputMode="url"
                placeholder="https://… или /tour-placeholder.svg"
                defaultValue={offer.image}
                className={inputClass}
                spellCheck={false}
                autoComplete="off"
              />
              <span className="text-xs text-zinc-500">
                Прямая ссылка на картинку; для теста можно оставить плейсхолдер.
              </span>
            </label>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <label htmlFor={resortId} className="grid gap-1.5">
              <span className="text-sm font-medium text-zinc-800">Курорт</span>
              <input
                id={resortId}
                name="resort"
                required
                defaultValue={offer.resort}
                className={inputClass}
                autoComplete="off"
              />
            </label>

            <label htmlFor={nightsId} className="grid gap-1.5">
              <span className="text-sm font-medium text-zinc-800">Ночей</span>
              <div className="relative">
                <input
                  id={nightsId}
                  name="nights"
                  type="number"
                  required
                  min={1}
                  max={365}
                  step={1}
                  defaultValue={offer.nights}
                  className={`${inputClass} pr-14`}
                />
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-zinc-500">
                  ноч.
                </span>
              </div>
            </label>

            <label htmlFor={priceId} className="grid gap-1.5 sm:col-span-1">
              <span className="text-sm font-medium text-zinc-800">Цена «от», ₽</span>
              <div className="relative">
                <input
                  id={priceId}
                  name="price"
                  type="number"
                  required
                  min={0}
                  step={100}
                  defaultValue={offer.price}
                  className={`${inputClass} pr-10`}
                  inputMode="numeric"
                />
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm font-medium text-zinc-600">
                  ₽
                </span>
              </div>
            </label>

            <label htmlFor={availId} className="grid gap-1.5 sm:col-span-1">
              <span className="text-sm font-medium text-zinc-800">Наличие мест</span>
              <select
                id={availId}
                name="availability"
                required
                defaultValue={offer.availability}
                className={`${inputClass} cursor-pointer`}
              >
                <option value="available">Есть места</option>
                <option value="limited">Мало мест</option>
                <option value="sold_out">Нет мест</option>
              </select>
            </label>
          </div>

          <div className="flex flex-col gap-3 border-t border-zinc-100 pt-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-zinc-500">
              Последнее сохранение: <time dateTime={offer.updatedAt}>{updatedAtLabel}</time> (МСК)
            </p>
            <PartnerSubmitButton />
          </div>
        </form>
      </div>
    </article>
  );
}
