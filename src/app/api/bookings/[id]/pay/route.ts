import { NextResponse } from "next/server";
import { updateBookingStatus } from "@/lib/bookings";

export async function POST(
  _request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const booking = await updateBookingStatus(id, "paid");
  if (!booking) return NextResponse.json({ error: "Booking not found" }, { status: 404 });
  return NextResponse.json({ booking });
}
