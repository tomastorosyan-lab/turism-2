import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { updateOperatorOffer } from "@/lib/operator-offers";

export async function PATCH(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const cookieStore = await cookies();
  const session = cookieStore.get("operator_session")?.value;
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await request.json()) as {
    title?: string;
    description?: string;
    image?: string;
    resort?: string;
    nights?: number;
    price?: number;
    availability?: string;
  };
  if (
    !body.title ||
    !body.description ||
    !body.image ||
    !body.resort ||
    typeof body.nights !== "number" ||
    typeof body.price !== "number" ||
    !["available", "limited", "sold_out"].includes(String(body.availability))
  ) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const { id } = await context.params;
  const updated = await updateOperatorOffer(id, {
    title: body.title.trim(),
    description: body.description.trim(),
    image: body.image.trim(),
    resort: body.resort.trim(),
    nights: body.nights,
    price: body.price,
    availability: body.availability as "available" | "limited" | "sold_out",
  });

  if (!updated) {
    return NextResponse.json({ error: "Offer not found" }, { status: 404 });
  }
  if (updated.operatorId !== session) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  return NextResponse.json({ offer: updated });
}
