import { NextResponse } from "next/server";
import { validateOperator } from "@/lib/operator-auth";

export async function POST(request: Request) {
  const body = (await request.json()) as { email?: string; code?: string };
  if (!body.email || !body.code) {
    return NextResponse.json({ error: "Email and code are required" }, { status: 400 });
  }

  const operator = validateOperator(body.email, body.code);
  if (!operator) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true, operator: { id: operator.id, name: operator.name } });
  response.cookies.set("operator_session", operator.id, {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
    path: "/",
    maxAge: 60 * 60 * 12,
  });
  return response;
}
