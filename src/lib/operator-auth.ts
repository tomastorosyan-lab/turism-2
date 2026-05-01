export type OperatorAccount = {
  id: string;
  name: string;
  email: string;
  accessCode: string;
};

export const operatorAccounts: OperatorAccount[] = [
  {
    id: "op-sea-sun",
    name: "SeaSun Travel",
    email: "partner@seasun.example",
    accessCode: "ABKHAZIA-2026",
  },
  {
    id: "op-mountain",
    name: "Mountain Coast Tours",
    email: "ops@mountaincoast.example",
    accessCode: "PARTNER-COAST-26",
  },
];

export function validateOperator(email: string, accessCode: string): OperatorAccount | null {
  const normalizedEmail = email.trim().toLowerCase();
  const normalizedCode = accessCode.trim();
  return (
    operatorAccounts.find(
      (account) =>
        account.email.toLowerCase() === normalizedEmail && account.accessCode === normalizedCode
    ) ?? null
  );
}

export function getOperatorById(id: string): OperatorAccount | null {
  return operatorAccounts.find((account) => account.id === id) ?? null;
}
