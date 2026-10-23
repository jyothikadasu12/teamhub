
import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import { fetchEmployees } from "../services/employeeApi";
import type { Employee } from "../types/employee";
import type { RequestStatus } from "../types/request";

const PAGE_SIZE = 10;

async function fetchEmployeesPage(
  signal: AbortSignal
) {
  return fetchEmployees(signal);
}

interface UseInfiniteEmployeesResult {
  employees: Employee[];
  status: RequestStatus;
  error: string | null;
  loadingMore: boolean;
  hasMore: boolean;
  loadMore: () => void;
  retry: () => void;
}

export function useInfiniteEmployees(): UseInfiniteEmployeesResult {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [status, setStatus] = useState<RequestStatus>("idle");
  const [error, setError] = useState<string | null>(null);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const [skip, setSkip] = useState(0);
  const [retryCount, setRetryCount] = useState(0);

  const requestInProgress = useRef(false);

  useEffect(() => {
    const controller = new AbortController();
    requestInProgress.current = true;

    async function loadPage() {
      if (skip === 0) {
        setStatus("loading");
      } else {
        setLoadingMore(true);
      }

      setError(null);

      try {
        const page = await fetchEmployeesPage(
          controller.signal
        );

        if (controller.signal.aborted) {
          return;
        }

        setEmployees((previous) => {
          if (skip === 0) {
            return page;
          }

          const existingIds = new Set(previous.map((item) => item.id));
          const newEmployees = page.filter(
            (item) => !existingIds.has(item.id)
          );

          return [...previous, ...newEmployees];
        });

        setHasMore(page.length === PAGE_SIZE);
        setStatus("success");
      } catch (err: unknown) {
        if (controller.signal.aborted) {
          return;
        }

        setError(
          err instanceof Error
            ? err.message
            : "Unable to load employees."
        );

        if (skip === 0) {
          setStatus("error");
        }
      } finally {
        if (!controller.signal.aborted) {
          requestInProgress.current = false;
          setLoadingMore(false);
        }
      }
    }

    void loadPage();

    return () => {
      controller.abort();
      requestInProgress.current = false;
    };
  }, [skip, retryCount]);

  const loadMore = useCallback(() => {
    if (
      requestInProgress.current ||
      status !== "success" ||
      loadingMore ||
      !hasMore ||
      error
    ) {
      return;
    }

    requestInProgress.current = true;
    setLoadingMore(true);
    setSkip((currentSkip) => currentSkip + PAGE_SIZE);
  }, [status, loadingMore, hasMore, error]);

  const retry = useCallback(() => {
    setError(null);
    setRetryCount((count) => count + 1);
  }, []);

  return {
    employees,
    status,
    error,
    loadingMore,
    hasMore,
    loadMore,
    retry,
  };
}
