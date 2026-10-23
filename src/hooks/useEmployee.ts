
import { useEffect, useState } from "react";
import { fetchEmployees } from "../services/employeeApi";
import type { Employee } from "../types/employee";
import type { RequestStatus } from "../types/request";

interface UseEmployeesResult {
  employees: Employee[];
  status: RequestStatus;
  error: string | null;
  retry: () => void;
}

export function useEmployees(): UseEmployeesResult {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [status, setStatus] = useState<RequestStatus>("idle");
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    async function loadEmployees() {
      setStatus("loading");
      setError(null);

      try {
        const data = await fetchEmployees(controller.signal);

        if (!controller.signal.aborted) {
          setEmployees(data);
          setStatus("success");
        }
      } catch (err: unknown) {
        if (controller.signal.aborted) {
          return;
        }

        const message =
          err instanceof Error
            ? err.message
            : "Something went wrong while loading employees.";

        setError(message);
        setStatus("error");
      }
    }

    void loadEmployees();

    return () => {
      controller.abort();
    };
  }, [retryCount]);

  function retry() {
    setRetryCount((count) => count + 1);
  }

  return { employees, status, error, retry };
}
