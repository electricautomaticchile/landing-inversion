import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { fetchLeads, submitLead, updateLeadStatus } from "@/lib/api/client";

function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

describe("backend API client", () => {
  let fetchMock: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("posts landing leads to the backend API", async () => {
    fetchMock.mockResolvedValueOnce(
      jsonResponse({
        success: true,
        data: {
          id: "lead-a",
          type: "investor",
          status: "new",
          name: "Ana",
          email: "ana@example.com",
          createdAt: "2026-06-03T00:00:00Z",
          updatedAt: "2026-06-03T00:00:00Z",
        },
      }),
    );

    await submitLead({
      type: "investor",
      name: "Ana",
      email: "ana@example.com",
      organization: "Acme",
      message: "Quiero informacion",
      extra: { ticket: "USD 10K - 25K" },
      turnstileToken: "token",
    });

    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [url, init] = fetchMock.mock.calls[0] as [string, RequestInit];
    expect(url).toBe("http://localhost:4000/api/leads");
    expect(init.credentials).toBe("include");
    expect(init.method).toBe("POST");
    expect(JSON.parse(init.body as string)).toMatchObject({
      type: "investor",
      email: "ana@example.com",
      extra: { ticket: "USD 10K - 25K" },
    });
  });

  it("serializes lead filters for server-side pagination", async () => {
    fetchMock.mockResolvedValueOnce(
      jsonResponse({
        success: true,
        data: { items: [], total: 0, offset: 50, limit: 25, hasMore: false, page: 3, pageSize: 25 },
      }),
    );

    await fetchLeads({
      offset: 50,
      limit: 25,
      type: "distributor",
      status: "contacted",
      from: "2026-06-01",
      to: "2026-06-03",
      search: "energia",
    });

    const [calledUrl] = fetchMock.mock.calls[0] as [string, RequestInit];
    const url = new URL(calledUrl);
    expect(url.pathname).toBe("/api/leads");
    expect(url.searchParams.get("offset")).toBe("50");
    expect(url.searchParams.get("limit")).toBe("25");
    expect(url.searchParams.get("type")).toBe("distributor");
    expect(url.searchParams.get("status")).toBe("contacted");
    expect(url.searchParams.get("search")).toBe("energia");
  });

  it("sends a CSRF token when updating lead status", async () => {
    fetchMock
      .mockResolvedValueOnce(jsonResponse({ success: true, data: { token: "csrf-token" } }))
      .mockResolvedValueOnce(
        jsonResponse({
          success: true,
          data: {
            id: "lead-a",
            type: "investor",
            status: "qualified",
            name: "Ana",
            email: "ana@example.com",
            createdAt: "2026-06-03T00:00:00Z",
            updatedAt: "2026-06-03T00:00:01Z",
          },
        }),
      );

    await updateLeadStatus("lead-a", "qualified");

    expect(fetchMock).toHaveBeenCalledTimes(2);
    const [csrfUrl] = fetchMock.mock.calls[0] as [string, RequestInit];
    const [updateUrl, updateInit] = fetchMock.mock.calls[1] as [string, RequestInit];
    expect(csrfUrl).toBe("http://localhost:4000/api/auth/csrf-token");
    expect(updateUrl).toBe("http://localhost:4000/api/leads/lead-a/status");
    expect((updateInit.headers as Headers).get("X-CSRF-Token")).toBe("csrf-token");
    expect(JSON.parse(updateInit.body as string)).toEqual({ status: "qualified" });
  });
});
