// API response envelope
export interface ApiResponse<T> {
  status: "success" | "error"
  data: T
  error: string | null
}

// Dashboard
export interface DashboardSummary {
  total_queries: number
  blocked_queries: number
  allowed_queries: number
  redirected_queries: number
  block_rate_percent: number
}

// DNS Engine
export interface DnsEngineStatus {
  enabled: boolean
  accepting_queries: boolean
  last_error: string
}

export interface DnsMetrics {
  window_seconds: number
  queries: {
    total: number
    errors: number
    error_rate: number
  }
  latency_ms: {
    p50: number
    p95: number
    p99: number
  }
  grade: "excellent" | "good" | "degraded" | "bad" | "unknown"
}

export interface Resolver {
  id: string
  name: string
  address: string
  protocol: string
}

// Blocklists
export interface Blocklist {
  id: string
  name: string
  url: string
  format: string
  category: string
  domains_count: number
  enabled: boolean
  created_at: string
  updated_at: string
}

export interface BlocklistListData {
  total_blocklists: number
  total_domains: number
  active_lists: Blocklist[]
}

export interface CreateBlocklistRequest {
  id: string
  name: string
  url: string
  format: string
  category?: string
}

// Policies
export interface Policy {
  id: string
  name: string
  description: string
  category: string
  action: string
  redirect_ip?: string
  domains: string[]
  priority: number
  enabled: boolean
}

export interface PolicyListData {
  total_policies: number
  active_policies: number
  inactive_policies: number
  list: Policy[]
}

export interface CreatePolicyRequest {
  id: string
  name: string
  description?: string
  category?: string
  action: string
  redirect_ip?: string
  domains: string[]
  priority?: number
}

// Query Logs
export interface QueryLogEntry {
  id: number
  domain: string
  client_ip: string
  action: string
  timestamp: string
  is_suspicious: boolean
  threat_score: number
  detection_method?: string
  threat_reason?: string
}

// Analytics
export interface AnalyticsSummary {
  total_queries: number
  blocked_queries: number
  allowed_queries: number
  block_rate_percent: number
}

// Encrypted-DNS bypass attempts (DoH / DoT / DoQ)
// A "bypass attempt" is a client trying to reach an encrypted-DNS resolver
// directly so its queries never pass through HydraDNS filtering.
export type BypassProtocol = "doh" | "dot" | "doq"

export interface BypassAttempt {
  client_ip: string
  client_name?: string
  protocol: BypassProtocol
  // Resolver the client tried to reach, e.g. "cloudflare-dns.com".
  target: string
  attempts: number
  // ISO timestamp of the most recent attempt.
  last_attempt: string
  // Whether HydraDNS successfully blocked the bypass.
  blocked: boolean
}

export interface BypassAttemptsData {
  total_attempts: number
  unique_clients: number
  attempts: BypassAttempt[]
}
