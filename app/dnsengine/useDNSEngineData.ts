// app/dashboard/useDashboardData.ts
"use client";

import api from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export interface DNSEngineData {
  accepting_queries: boolean;
  enabled: boolean;
  last_error: string | null;
}

export function useDNSEngineData() {
  return useQuery<DNSEngineData>({
    queryKey: ["dnsEngineData"],
    queryFn: async () => {
      const res = await api.get("/dns/engine");
      // Some APIs wrap the payload in an outer `data` field (e.g. { data: { ... } }).
      // To make the hook robust against both shapes, return the inner payload
      // when present, otherwise return the response `data` as-is.
      const payload = res?.data;
      return payload && typeof payload === "object" && "data" in payload
        ? // @ts-ignore - payload may be `any` from axios, and `data` is the wrapped payload
          payload.data
        : payload;
    },
    refetchInterval: 3000,
  });
}
