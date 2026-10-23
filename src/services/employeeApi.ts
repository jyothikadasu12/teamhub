
import { mapEmployee } from "../utils/mapEmployee";
import type { Employee } from "../types/employee";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

interface ApiResponse {
  users: unknown[];
}

function isApiResponse(value: unknown): value is ApiResponse {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const users = (value as Record<string, unknown>).users;
  return Array.isArray(users);
}

export async function fetchEmployees(
  signal?: AbortSignal
): Promise<Employee[]> {
  const response = await fetch(`${API_BASE_URL}/users?limit=20`, { signal });

  if (!response.ok) {
    throw new Error(
      `Unable to load employees. Server returned ${response.status}.`
    );
  }

  const data: unknown = await response.json();

  if (!isApiResponse(data)) {
    throw new Error("The API returned an unexpected response.");
  }

  return data.users.map(mapEmployee);
}
