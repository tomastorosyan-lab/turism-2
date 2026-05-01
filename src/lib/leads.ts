import { promises as fs } from "node:fs";
import path from "node:path";

export type LeadRecord = {
  id: string;
  name: string;
  phone: string;
  destination: string;
  dates: string;
  people: string;
  budget: string;
  note: string;
  createdAt: string;
  status: "new" | "in_progress" | "done";
};

const dataDir = path.join(process.cwd(), "data");
const dataFile = path.join(dataDir, "leads.json");

async function ensureStore(): Promise<void> {
  await fs.mkdir(dataDir, { recursive: true });
  try {
    await fs.access(dataFile);
  } catch {
    await fs.writeFile(dataFile, "[]", "utf8");
  }
}

export async function readLeads(): Promise<LeadRecord[]> {
  await ensureStore();
  const content = await fs.readFile(dataFile, "utf8");
  return JSON.parse(content) as LeadRecord[];
}

export async function createLead(
  input: Omit<LeadRecord, "id" | "createdAt" | "status">
): Promise<LeadRecord> {
  const list = await readLeads();
  const lead: LeadRecord = {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    status: "new",
    ...input,
  };
  list.unshift(lead);
  await fs.writeFile(dataFile, JSON.stringify(list, null, 2), "utf8");
  return lead;
}

export async function updateLeadStatus(
  id: string,
  status: LeadRecord["status"]
): Promise<LeadRecord | null> {
  const list = await readLeads();
  const index = list.findIndex((lead) => lead.id === id);
  if (index === -1) return null;
  list[index] = { ...list[index], status };
  await fs.writeFile(dataFile, JSON.stringify(list, null, 2), "utf8");
  return list[index];
}
