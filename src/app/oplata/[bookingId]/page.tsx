"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

export default function PaymentPage() {
  const params = useParams<{ bookingId: string }>();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function payNow() {
    setLoading(true);
    setMessage("");
    const response = await fetch(`/api/bookings/${params.bookingId}/pay`, { method: "POST" });
    if (!response.ok) {
      setMessage("Ошибка оплаты. Попробуйте снова.");
      setLoading(false);
      return;
    }
    setMessage("Оплата успешно проведена. Бронь подтверждена.");
    setLoading(false);
    router.push("/lichnyy-kabinet");
  }

  return (
    <div className="grid gap-6">
      <h1 className="text-3xl font-semibold text-pine-900">Оплата бронирования</h1>
      <div className="rounded-xl border border-pine-100 bg-white p-5 text-sm text-pine-700">
        <p>Это локальный контур оплаты для MVP. В production подключается эквайринг.</p>
        <p className="mt-1">ID брони: {params.bookingId}</p>
      </div>
      <button
        onClick={payNow}
        disabled={loading}
        className="w-fit rounded-full bg-pine-900 px-6 py-3 text-sm text-white disabled:opacity-60"
      >
        {loading ? "Проводим оплату..." : "Оплатить"}
      </button>
      {message ? <p className="text-sm text-pine-700">{message}</p> : null}
    </div>
  );
}
