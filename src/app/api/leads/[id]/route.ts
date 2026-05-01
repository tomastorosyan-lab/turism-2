import { NextResponse } from "next/server";
import { updateLeadStatus } from "@/lib/leads";

export async function PATCH(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const body = (await request.json()) as { status?: string };
  const status = body.status;

  if (!status || !["new", "in_progress", "done"].includes(status)) {
    return NextResponse.json({ error: "Invalid status" }, { status: 400 });
  }

  const lead = await updateLeadStatus(id, status as "new" | "in_progress" | "done");
  if (!lead) {
    return NextResponse.json({ error: "Lead not found" }, { status: 404 });
  }

  return NextResponse.json({ lead });
}
