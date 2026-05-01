"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function PartnerLoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    const formData = new FormData(event.currentTarget);
    const payload = {
      email: String(formData.get("email") || ""),
      code: String(formData.get("code") || ""),
    };

    const response = await fetch("/api/operator/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      setError("Неверный email или код доступа.");
      setLoading(false);
      return;
    }
    router.push("/partner/dashboard");
  }

  return (
    <div className="mx-auto grid w-full max-w-xl gap-6">
      <h1 className="text-3xl font-semibold text-pine-900">Вход для туроператора</h1>
      <p className="text-sm text-pine-700">
        Кабинет партнера для обновления цен, наличия и контроля актуальности офферов.
      </p>
      <form onSubmit={onSubmit} className="grid gap-4 rounded-xl border border-pine-100 bg-white p-5">
        <label className="grid gap-1 text-sm">
          Email партнера
          <input name="email" required className="rounded-md border border-pine-100 px-3 py-2" />
        </label>
        <label className="grid gap-1 text-sm">
          Код доступа
          <input name="code" required className="rounded-md border border-pine-100 px-3 py-2" />
        </label>
        <button
          type="submit"
          disabled={loading}
          className="w-fit rounded-full bg-pine-900 px-5 py-2 text-sm text-white disabled:opacity-60"
        >
          {loading ? "Входим..." : "Войти"}
        </button>
        {error ? <p className="text-sm text-red-700">{error}</p> : null}
      </form>
      <div className="rounded-xl border border-pine-100 bg-pine-100/40 p-4 text-xs text-pine-800">
        <p>Демо-доступы:</p>
        <p>partner@seasun.example / ABKHAZIA-2026</p>
        <p>ops@mountaincoast.example / PARTNER-COAST-26</p>
      </div>
    </div>
  );
}
