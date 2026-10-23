
import type { Employee } from "../types/employee";

export interface ApiUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  image?: string;
  company?: {
    title?: string;
    department?: string;
  };
  address?: {
    city?: string;
  };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function mapEmployee(value: unknown): Employee {
  if (!isRecord(value)) {
    throw new Error("An employee record has an invalid format.");
  }

  const { id, firstName, lastName, email } = value;

  if (
    typeof id !== "number" ||
    typeof firstName !== "string" ||
    typeof lastName !== "string" ||
    typeof email !== "string"
  ) {
    throw new Error("An employee record is missing required fields.");
  }

  const company = isRecord(value.company) ? value.company : {};
  const address = isRecord(value.address) ? value.address : {};

  const title =
    typeof company.title === "string"
      ? company.title
      : "Team Member";

  const department =
    typeof company.department === "string"
      ? company.department
      : "General";

  const city =
    typeof address.city === "string"
      ? address.city
      : "Not specified";

  const avatar =
    typeof value.image === "string"
      ? value.image
      : `https://i.pravatar.cc/120?u=${id}`;

  return {
    id,
    name: `${firstName} ${lastName}`,
    role: title,
    department,
    email,
    location: city,
    status: "Active",
    avatar,
  };
}
