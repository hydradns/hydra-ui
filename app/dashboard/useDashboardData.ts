// app/dashboard/useDashboardData.ts
"use client";

import api from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export interface DashboardData {
  total_queries: number;
  blocked_queries: number;
  avg_query_time_ms: number;
  block_rate_percent: number;
  query_volume_chart: {
    labels: string[];
    values: number[];
  };
  blocked_by_category: Record<string, number>;
  top_blocked_domains: string[];
  top_queried_domains: string[];
}

export function useDashboardData() {
  return useQuery<DashboardData>({
    queryKey: ["dashboardData"],
    queryFn: async () => {
      const res = await api.get("/dashboard/summary");
      // Some APIs wrap the payload in an outer `data` field (e.g. { data: { ... } }).
      // To make the hook robust against both shapes, return the inner payload
      // when present, otherwise return the response `data` as-is.
      const payload = res?.data;
      return payload && typeof payload === "object" && "data" in payload
        ? // @ts-ignore - payload may be `any` from axios, and `data` is the wrapped payload
          payload.data
        : payload;
    },
    refetchInterval: 5000,
  });
}
