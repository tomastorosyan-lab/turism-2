export const metadata = {
  title: "Отмены и возвраты - AbkhaziaTrip",
  description: "Условия отмены и возврата по заявкам и подтвержденным бронированиям.",
};

export default function RefundsPage() {
  return (
    <article className="grid gap-4">
      <h1 className="text-3xl font-semibold text-pine-900">Отмены и возвраты</h1>
      <div className="rounded-xl border border-pine-100 bg-white p-5 text-sm text-pine-800">
        <p>До подтверждения бронирования отмена выполняется без штрафа.</p>
        <p className="mt-3">
          После подтверждения условия возврата зависят от тарифа и сроков до даты заезда.
        </p>
        <p className="mt-3">
          Срок решения по заявке на возврат - до 24 часов, фактический возврат - 3-10 рабочих
          дней в зависимости от эквайринга.
        </p>
      </div>
    </article>
  );
}
