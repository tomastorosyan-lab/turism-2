"use client";

import { FormEvent, useState } from "react";

export default function RequestPage() {
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setMessage("");

    const formData = new FormData(event.currentTarget);
    const payload = Object.fromEntries(formData.entries());

    const response = await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      setStatus("error");
      setMessage("Не удалось отправить заявку. Проверьте поля и попробуйте снова.");
      return;
    }

    event.currentTarget.reset();
    setStatus("done");
    setMessage("Заявка принята. Менеджер свяжется с вами в SLA.");
  }

  return (
    <div className="grid gap-6">
      <h1 className="text-3xl font-semibold text-pine-900">Подбор тура в Абхазию</h1>
      <p className="max-w-2xl text-sm text-pine-700">
        Заполните форму, и менеджер подберет варианты по бюджету, датам и формату отдыха.
      </p>

      <form onSubmit={onSubmit} className="grid gap-4 rounded-xl border border-pine-100 bg-white p-5">
        <label className="grid gap-1 text-sm">
          Имя *
          <input name="name" required className="rounded-md border border-pine-100 px-3 py-2" />
        </label>
        <label className="grid gap-1 text-sm">
          Телефон *
          <input name="phone" required className="rounded-md border border-pine-100 px-3 py-2" />
        </label>
        <label className="grid gap-1 text-sm">
          Курорт/направление *
          <input
            name="destination"
            required
            placeholder="Гагра, Пицунда, Сухум..."
            className="rounded-md border border-pine-100 px-3 py-2"
          />
        </label>
        <div className="grid gap-4 md:grid-cols-3">
          <label className="grid gap-1 text-sm">
            Даты
            <input name="dates" className="rounded-md border border-pine-100 px-3 py-2" />
          </label>
          <label className="grid gap-1 text-sm">
            Количество туристов
            <input name="people" className="rounded-md border border-pine-100 px-3 py-2" />
          </label>
          <label className="grid gap-1 text-sm">
            Бюджет
            <input name="budget" className="rounded-md border border-pine-100 px-3 py-2" />
          </label>
        </div>
        <label className="grid gap-1 text-sm">
          Комментарий
          <textarea name="note" rows={4} className="rounded-md border border-pine-100 px-3 py-2" />
        </label>
        <button
          disabled={status === "loading"}
          className="w-fit rounded-full bg-pine-900 px-6 py-3 text-sm font-medium text-white disabled:opacity-60"
        >
          {status === "loading" ? "Отправляем..." : "Отправить заявку"}
        </button>
        {message ? <p className="text-sm text-pine-700">{message}</p> : null}
      </form>
    </div>
  );
}
