import { afterEach, describe, expect, it, vi } from "vitest"

import { getBypassAttempts, getDashboardSummary } from "@/lib/api"
import type { ApiResponse, BypassAttemptsData, DashboardSummary } from "@/lib/types"

/** Stub global.fetch with a single JSON response envelope. */
function stubFetch<T>(body: ApiResponse<T>, status = 200) {
  const fetchMock = vi.fn().mockResolvedValue({
    status,
    json: async () => body,
  })
  vi.stubGlobal("fetch", fetchMock)
  return fetchMock
}

afterEach(() => {
  vi.unstubAllGlobals()
  vi.restoreAllMocks()
})

describe("getBypassAttempts", () => {
  it("unwraps the data envelope and hits /analytics/bypass", async () => {
    const data: BypassAttemptsData = {
      total_attempts: 12,
      unique_clients: 2,
      attempts: [
        {
          client_ip: "10.0.0.5",
          client_name: "kids-tablet",
          protocol: "doh",
          target: "cloudflare-dns.com",
          attempts: 9,
          last_attempt: "2026-07-19T10:00:00Z",
          blocked: true,
        },
      ],
    }
    const fetchMock = stubFetch<BypassAttemptsData>({ status: "success", data, error: null })

    const result = await getBypassAttempts()

    expect(result).toEqual(data)
    expect(fetchMock).toHaveBeenCalledTimes(1)
    const calledUrl = fetchMock.mock.calls[0][0] as string
    expect(calledUrl).toContain("/api/v1/analytics/bypass")
  })

  it("throws the API error message when the envelope reports an error", async () => {
    stubFetch<BypassAttemptsData>(
      { status: "error", data: null as unknown as BypassAttemptsData, error: "bypass telemetry offline" },
    )

    await expect(getBypassAttempts()).rejects.toThrow("bypass telemetry offline")
  })
})

describe("getDashboardSummary", () => {
  it("returns the parsed summary payload", async () => {
    const data: DashboardSummary = {
      total_queries: 100,
      blocked_queries: 10,
      allowed_queries: 90,
      redirected_queries: 0,
      block_rate_percent: 10,
    }
    const fetchMock = stubFetch<DashboardSummary>({ status: "success", data, error: null })

    const result = await getDashboardSummary()

    expect(result).toEqual(data)
    expect(fetchMock.mock.calls[0][0]).toContain("/api/v1/dashboard/summary")
  })
})
