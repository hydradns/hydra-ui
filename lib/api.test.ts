import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"

import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  getUserTokens,
  createUserToken,
  rotateUserToken,
  revokeUserToken,
  getAuditEvents,
} from "@/lib/api"

const BASE = "http://localhost:8080/api/v1"

// Builds a fake fetch Response whose json() yields the success envelope.
function okResponse<T>(data: T) {
  return {
    status: 200,
    json: async () => ({ status: "success", data, error: null }),
  } as unknown as Response
}

function errorResponse(message: string) {
  return {
    status: 200,
    json: async () => ({ status: "error", data: null, error: message }),
  } as unknown as Response
}

function fetchMock() {
  return vi.fn<typeof fetch>()
}

describe("api RBAC methods", () => {
  beforeEach(() => {
    localStorage.clear()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it("getUsers issues a GET to /users and unwraps data", async () => {
    const payload = { total_users: 1, users: [{ id: "u1", username: "root", role: "admin" }] }
    const spy = fetchMock().mockResolvedValue(okResponse(payload))
    vi.stubGlobal("fetch", spy)

    const result = await getUsers()

    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy.mock.calls[0][0]).toBe(`${BASE}/users`)
    // No explicit method means a GET.
    expect(spy.mock.calls[0][1]?.method).toBeUndefined()
    expect(result).toEqual(payload)
  })

  it("createUser POSTs the JSON body with a JSON content-type", async () => {
    const created = { id: "u2", username: "jane", role: "operator" }
    const spy = fetchMock().mockResolvedValue(okResponse(created))
    vi.stubGlobal("fetch", spy)

    await createUser({ username: "jane", password: "s3cret", role: "operator" })

    const [url, init] = spy.mock.calls[0]
    expect(url).toBe(`${BASE}/users`)
    expect(init?.method).toBe("POST")
    expect(JSON.parse(init?.body as string)).toEqual({
      username: "jane",
      password: "s3cret",
      role: "operator",
    })
    expect((init?.headers as Record<string, string>)["Content-Type"]).toBe("application/json")
  })

  it("updateUser PATCHes /users/:id with the partial body", async () => {
    const spy = fetchMock().mockResolvedValue(okResponse({ id: "u2", username: "jane", role: "admin" }))
    vi.stubGlobal("fetch", spy)

    await updateUser("u2", { role: "admin", enabled: false })

    const [url, init] = spy.mock.calls[0]
    expect(url).toBe(`${BASE}/users/u2`)
    expect(init?.method).toBe("PATCH")
    expect(JSON.parse(init?.body as string)).toEqual({ role: "admin", enabled: false })
  })

  it("deleteUser sends a DELETE to /users/:id", async () => {
    const spy = fetchMock().mockResolvedValue(okResponse({}))
    vi.stubGlobal("fetch", spy)

    await deleteUser("u9")

    expect(spy.mock.calls[0][0]).toBe(`${BASE}/users/u9`)
    expect(spy.mock.calls[0][1]?.method).toBe("DELETE")
  })

  it("getUserTokens GETs the per-user token collection", async () => {
    const tokens = [{ id: "t1", name: "ci", prefix: "hyd_", role: "operator", revoked: false }]
    const spy = fetchMock().mockResolvedValue(okResponse(tokens))
    vi.stubGlobal("fetch", spy)

    const result = await getUserTokens("u2")

    expect(spy.mock.calls[0][0]).toBe(`${BASE}/users/u2/tokens`)
    expect(result).toEqual(tokens)
  })

  it("createUserToken POSTs the token request and returns the one-time secret", async () => {
    const secret = { token: { id: "t2", name: "ci", prefix: "hyd_", role: "operator", revoked: false }, secret: "hyd_live_abc" }
    const spy = fetchMock().mockResolvedValue(okResponse(secret))
    vi.stubGlobal("fetch", spy)

    const result = await createUserToken("u2", { name: "ci", expires_in_days: 90 })

    const [url, init] = spy.mock.calls[0]
    expect(url).toBe(`${BASE}/users/u2/tokens`)
    expect(init?.method).toBe("POST")
    expect(JSON.parse(init?.body as string)).toEqual({ name: "ci", expires_in_days: 90 })
    expect(result.secret).toBe("hyd_live_abc")
  })

  it("rotateUserToken POSTs to the rotate sub-resource", async () => {
    const spy = fetchMock().mockResolvedValue(
      okResponse({ token: { id: "t2", name: "ci", prefix: "hyd_", role: "operator", revoked: false }, secret: "hyd_live_new" }),
    )
    vi.stubGlobal("fetch", spy)

    const result = await rotateUserToken("u2", "t2")

    expect(spy.mock.calls[0][0]).toBe(`${BASE}/users/u2/tokens/t2/rotate`)
    expect(spy.mock.calls[0][1]?.method).toBe("POST")
    expect(result.secret).toBe("hyd_live_new")
  })

  it("revokeUserToken DELETEs the specific token", async () => {
    const spy = fetchMock().mockResolvedValue(okResponse({}))
    vi.stubGlobal("fetch", spy)

    await revokeUserToken("u2", "t2")

    expect(spy.mock.calls[0][0]).toBe(`${BASE}/users/u2/tokens/t2`)
    expect(spy.mock.calls[0][1]?.method).toBe("DELETE")
  })

  it("getAuditEvents encodes pagination and filters into the query string", async () => {
    const spy = fetchMock().mockResolvedValue(
      okResponse({ total: 0, page: 2, page_size: 25, events: [] }),
    )
    vi.stubGlobal("fetch", spy)

    await getAuditEvents({ page: 2, page_size: 25, actor: "root", action: "user.create" })

    const url = spy.mock.calls[0][0] as string
    expect(url.startsWith(`${BASE}/audit?`)).toBe(true)
    const qs = new URLSearchParams(url.split("?")[1])
    expect(qs.get("page")).toBe("2")
    expect(qs.get("page_size")).toBe("25")
    expect(qs.get("actor")).toBe("root")
    expect(qs.get("action")).toBe("user.create")
  })

  it("getAuditEvents omits the query string when no params are given", async () => {
    const spy = fetchMock().mockResolvedValue(
      okResponse({ total: 0, page: 1, page_size: 25, events: [] }),
    )
    vi.stubGlobal("fetch", spy)

    await getAuditEvents()

    expect(spy.mock.calls[0][0]).toBe(`${BASE}/audit`)
  })

  it("attaches a bearer token from localStorage when present", async () => {
    localStorage.setItem("hydra_token", "session-jwt")
    const spy = fetchMock().mockResolvedValue(okResponse({ total_users: 0, users: [] }))
    vi.stubGlobal("fetch", spy)

    await getUsers()

    const headers = spy.mock.calls[0][1]?.headers as Record<string, string>
    expect(headers["Authorization"]).toBe("Bearer session-jwt")
  })

  it("throws with the server message when the envelope is an error", async () => {
    const spy = fetchMock().mockResolvedValue(errorResponse("forbidden: admin required"))
    vi.stubGlobal("fetch", spy)

    await expect(createUser({ username: "x", password: "y", role: "admin" })).rejects.toThrow(
      "forbidden: admin required",
    )
  })
})
