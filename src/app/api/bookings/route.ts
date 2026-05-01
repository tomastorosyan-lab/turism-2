import { NextResponse } from "next/server";
import { createBooking, readBookings } from "@/lib/bookings";

export async function GET() {
  const bookings = await readBookings();
  return NextResponse.json({ bookings });
}

export async function POST(request: Request) {
  const body = (await request.json()) as Record<string, string | number>;
  if (!body.name || !body.phone || !body.tourId || !body.tourTitle || !body.total) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const booking = await createBooking({
    tourId: String(body.tourId),
    tourTitle: String(body.tourTitle),
    name: String(body.name),
    phone: String(body.phone),
    total: Number(body.total),
  });

  return NextResponse.json({ booking }, { status: 201 });
}
