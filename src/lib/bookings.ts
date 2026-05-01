import { promises as fs } from "node:fs";
import path from "node:path";

export type BookingRecord = {
  id: string;
  tourId: string;
  tourTitle: string;
  name: string;
  phone: string;
  total: number;
  status: "draft" | "confirmed" | "paid" | "cancelled";
  createdAt: string;
};

const dataDir = path.join(process.cwd(), "data");
const dataFile = path.join(dataDir, "bookings.json");

async function ensureStore(): Promise<void> {
  await fs.mkdir(dataDir, { recursive: true });
  try {
    await fs.access(dataFile);
  } catch {
    await fs.writeFile(dataFile, "[]", "utf8");
  }
}

export async function readBookings(): Promise<BookingRecord[]> {
  await ensureStore();
  const content = await fs.readFile(dataFile, "utf8");
  return JSON.parse(content) as BookingRecord[];
}

export async function createBooking(
  input: Omit<BookingRecord, "id" | "createdAt" | "status">
): Promise<BookingRecord> {
  const list = await readBookings();
  const booking: BookingRecord = {
    id: crypto.randomUUID(),
    status: "confirmed",
    createdAt: new Date().toISOString(),
    ...input,
  };
  list.unshift(booking);
  await fs.writeFile(dataFile, JSON.stringify(list, null, 2), "utf8");
  return booking;
}

export async function updateBookingStatus(
  id: string,
  status: BookingRecord["status"]
): Promise<BookingRecord | null> {
  const list = await readBookings();
  const index = list.findIndex((item) => item.id === id);
  if (index === -1) return null;
  list[index] = { ...list[index], status };
  await fs.writeFile(dataFile, JSON.stringify(list, null, 2), "utf8");
  return list[index];
}
