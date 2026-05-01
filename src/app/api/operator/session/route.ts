import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getOperatorById } from "@/lib/operator-auth";
import { readOffersByOperator } from "@/lib/operator-offers";

export async function GET() {
  const cookieStore = await cookies();
  const operatorId = cookieStore.get("operator_session")?.value;
  if (!operatorId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const operator = getOperatorById(operatorId);
  if (!operator) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const offers = await readOffersByOperator(operator.id);
  return NextResponse.json({
    operator: { id: operator.id, name: operator.name, email: operator.email },
    offers,
  });
}
