import { NextResponse } from "next/server";
import { createLead, readLeads } from "@/lib/leads";

export async function GET() {
  const leads = await readLeads();
  return NextResponse.json({ leads });
}

export async function POST(request: Request) {
  const body = (await request.json()) as Record<string, string>;
  const required = ["name", "phone", "destination"];
  const missing = required.filter((key) => !body[key]?.trim());
  if (missing.length > 0) {
    return NextResponse.json(
      { error: `Missing fields: ${missing.join(", ")}` },
      { status: 400 }
    );
  }

  const lead = await createLead({
    name: body.name.trim(),
    phone: body.phone.trim(),
    destination: body.destination.trim(),
    dates: body.dates?.trim() ?? "",
    people: body.people?.trim() ?? "",
    budget: body.budget?.trim() ?? "",
    note: body.note?.trim() ?? "",
  });

  return NextResponse.json({ lead }, { status: 201 });
}
