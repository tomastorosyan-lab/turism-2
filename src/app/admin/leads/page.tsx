import { revalidatePath } from "next/cache";
import { readLeads, updateLeadStatus } from "@/lib/leads";

const labels = {
  new: "Новая",
  in_progress: "В работе",
  done: "Закрыта",
} as const;

export const dynamic = "force-dynamic";

export default async function AdminLeadsPage() {
  const leads = await readLeads();

  async function setStatus(formData: FormData) {
    "use server";
    const id = String(formData.get("id"));
    const status = formData.get("status");
    if (!["new", "in_progress", "done"].includes(String(status))) return;
    await updateLeadStatus(id, status as "new" | "in_progress" | "done");
    revalidatePath("/admin/leads");
    revalidatePath("/lichnyy-kabinet");
  }

  return (
    <div className="grid gap-6">
      <h1 className="text-3xl font-semibold text-pine-900">CRM: заявки</h1>
      <p className="text-sm text-pine-700">
        Локальная очередь лидов для обработки менеджером, контроля SLA и смены статусов.
      </p>

      {leads.length === 0 ? (
        <div className="rounded-xl border border-pine-100 bg-white p-5 text-sm text-pine-700">
          Пока нет заявок. Отправьте первую через страницу “Подбор тура”.
        </div>
      ) : (
        <div className="grid gap-4">
          {leads.map((lead) => (
            <article key={lead.id} className="rounded-xl border border-pine-100 bg-white p-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 className="text-lg font-semibold text-pine-900">{lead.name}</h2>
                <span className="rounded-full bg-pine-100 px-3 py-1 text-xs text-pine-900">
                  {labels[lead.status]}
                </span>
              </div>
              <div className="mt-3 grid gap-1 text-sm text-pine-700">
                <p>Телефон: {lead.phone}</p>
                <p>Направление: {lead.destination}</p>
                <p>Даты: {lead.dates || "не указаны"}</p>
                <p>Туристы: {lead.people || "не указано"}</p>
                <p>Бюджет: {lead.budget || "не указан"}</p>
                <p>Комментарий: {lead.note || "-"}</p>
                <p>Создано: {new Date(lead.createdAt).toLocaleString("ru-RU")}</p>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {(["new", "in_progress", "done"] as const).map((nextStatus) => (
                  <form key={nextStatus} action={setStatus}>
                    <input type="hidden" name="id" value={lead.id} />
                    <input type="hidden" name="status" value={nextStatus} />
                    <button
                      className="rounded-full border border-pine-600 px-3 py-1 text-xs text-pine-700"
                      type="submit"
                    >
                      {labels[nextStatus]}
                    </button>
                  </form>
                ))}
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
