export const metadata = {
  title: "Публичная оферта - AbkhaziaTrip",
  description: "Публичная оферта сервиса подбора туров в Абхазию.",
};

export default function OfertaPage() {
  return (
    <article className="grid gap-4">
      <h1 className="text-3xl font-semibold text-pine-900">Публичная оферта</h1>
      <div className="rounded-xl border border-pine-100 bg-white p-5 text-sm text-pine-800">
        <p>
          Сервис AbkhaziaTrip действует как информационный посредник и агент в пределах условий,
          указанных в оферте и карточке конкретного продукта.
        </p>
        <p className="mt-3">
          Момент подтверждения услуги определяется присвоением заявке статуса confirmed после
          подтверждения партнером. Условия отмены и возврата фиксируются в карточке тура.
        </p>
        <p className="mt-3">
          Полный юридический текст оферты формируется перед публикацией в production и
          согласовывается с юристом.
        </p>
      </div>
    </article>
  );
}
