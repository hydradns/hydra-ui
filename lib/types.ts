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

export interface CreateResolverRequest {
  id: string
  name: string
  address: string
  protocol: string
}

export type UpdateResolverRequest = Partial<Omit<CreateResolverRequest, "id">>

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

export type UpdateBlocklistRequest = Partial<Omit<CreateBlocklistRequest, "id">> & {
  enabled?: boolean
}

// Curated categories (bundled threat/content groups the operator can toggle)
export interface Category {
  id: string
  name: string
  description: string
  enabled: boolean
  domains_count: number
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
  // Optional scheduling + client scoping (backend CRUD adds these)
  schedule?: string
  client_scope?: string
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
  schedule?: string
  client_scope?: string
}

export type UpdatePolicyRequest = Partial<Omit<CreatePolicyRequest, "id">> & {
  enabled?: boolean
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

// Settings (control-plane engine configuration)
export interface Settings {
  engine_enabled: boolean
  block_page_enabled: boolean
  cache_enabled: boolean
  cache_ttl_seconds: number
  upstream_timeout_ms: number
  log_retention_days: number
}

export type UpdateSettingsRequest = Partial<Settings>
