import { afterEach, describe, expect, it, vi } from "vitest"

import { allowDomain, blockDomain, getQueryLogs } from "@/lib/api"

function jsonOk(data: unknown) {
  return {
    ok: true,
    status: 200,
    json: async () => ({ status: "success", data, error: null }),
  } as unknown as Response
}

function stubFetch(data: unknown) {
  const fetchMock = vi.fn(() => Promise.resolve(jsonOk(data)))
  vi.stubGlobal("fetch", fetchMock)
  return fetchMock
}

function lastUrl(fetchMock: ReturnType<typeof vi.fn>) {
  return String(fetchMock.mock.calls.at(-1)?.[0])
}

afterEach(() => {
  vi.unstubAllGlobals()
  vi.clearAllMocks()
})

describe("getQueryLogs", () => {
  it("hits /analytics/logs with default pagination when no filters are given", async () => {
    const fetchMock = stubFetch({ items: [], total: 0, page: 1, page_size: 50 })
    await getQueryLogs()
    const url = lastUrl(fetchMock)
    expect(url).toContain("/api/v1/analytics/logs")
    expect(url).toContain("page=1")
    expect(url).toContain("page_size=50")
  })

  it("serializes provided filters and omits empty / action=all", async () => {
    const fetchMock = stubFetch({ items: [], total: 0, page: 2, page_size: 50 })
    await getQueryLogs({
      domain: "evil",
      client: "10.0.0.5",
      action: "block",
      suspicious: true,
      page: 2,
    })
    const url = lastUrl(fetchMock)
    expect(url).toContain("domain=evil")
    expect(url).toContain("client=10.0.0.5")
    expect(url).toContain("action=block")
    expect(url).toContain("suspicious=true")
    expect(url).toContain("page=2")
  })

  it("does not emit action=all or a false suspicious flag", async () => {
    const fetchMock = stubFetch({ items: [], total: 0, page: 1, page_size: 50 })
    await getQueryLogs({ action: "all", suspicious: false })
    const url = lastUrl(fetchMock)
    expect(url).not.toContain("action=all")
    expect(url).not.toContain("suspicious")
  })
})

describe("allowDomain / blockDomain", () => {
  it("allowDomain POSTs an ALLOW policy scoped to the domain", async () => {
    const fetchMock = stubFetch({ id: "quick-allow-evil-com" })
    await allowDomain("evil.com")
    const [url, opts] = fetchMock.mock.calls.at(-1) as [string, RequestInit]
    expect(String(url)).toContain("/api/v1/policies")
    expect(opts.method).toBe("POST")
    const body = JSON.parse(String(opts.body))
    expect(body.action).toBe("ALLOW")
    expect(body.domains).toEqual(["evil.com"])
    expect(body.id).toBe("quick-allow-evil-com")
  })

  it("blockDomain POSTs a BLOCK policy scoped to the domain", async () => {
    const fetchMock = stubFetch({ id: "quick-block-evil-com" })
    await blockDomain("evil.com")
    const [, opts] = fetchMock.mock.calls.at(-1) as [string, RequestInit]
    const body = JSON.parse(String(opts.body))
    expect(body.action).toBe("BLOCK")
    expect(body.domains).toEqual(["evil.com"])
  })
})
