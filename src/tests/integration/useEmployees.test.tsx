
import { afterEach, describe, expect, it, vi } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";

async function loadUseEmployees() {
  vi.resetModules();
  vi.stubEnv("VITE_API_BASE_URL", "https://example.test");

  const module = await import("../../hooks/useEmployee");
  return module.useEmployees;
}

afterEach(() => {
  vi.unstubAllGlobals();
  vi.unstubAllEnvs();
  vi.resetModules();
});

describe("useEmployees integration", () => {
  it("loads employee data successfully from the API service", async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({ users: [] }),
    });

    vi.stubGlobal("fetch", mockFetch);

    const useEmployees = await loadUseEmployees();
    const { result } = renderHook(() => useEmployees());

    await waitFor(() => {
      expect(result.current.status).toBe("success");
    });

    expect(result.current.employees).toEqual([]);
    expect(result.current.error).toBeNull();

    expect(mockFetch).toHaveBeenCalledWith(
      "https://example.test/users?limit=20",
      expect.objectContaining({
        signal: expect.anything(),
      })
    );
  });

  it("handles an HTTP server error", async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 500,
      json: async () => ({}),
    });

    vi.stubGlobal("fetch", mockFetch);

    const useEmployees = await loadUseEmployees();
    const { result } = renderHook(() => useEmployees());

    await waitFor(() => {
      expect(result.current.status).toBe("error");
    });

    expect(result.current.error).toBe(
      "Unable to load employees. Server returned 500."
    );
  });

  it("handles an unexpected API response", async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({ unexpected: [] }),
    });

    vi.stubGlobal("fetch", mockFetch);

    const useEmployees = await loadUseEmployees();
    const { result } = renderHook(() => useEmployees());

    await waitFor(() => {
      expect(result.current.status).toBe("error");
    });

    expect(result.current.error).toBe(
      "The API returned an unexpected response."
    );
  });
});
