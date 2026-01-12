"use client"
import { useDNSEngineData } from "@/app/dnsengine/useDNSEngineData";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Dot, ListTree, Logs, Rotate3D, Shield, Zap } from "lucide-react";
function CardIcon({ bgClass, children }: { bgClass: string; children: React.ReactNode }) {
  return (
    <div className={"rounded-lg p-3 " + bgClass}>
      <div className="w-6 h-6 text-white">{children}</div>
    </div>
  )
}

export function DNSEngineSectionCards() {
  const { data } = useDNSEngineData();
  return (
    <>
      <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-2">
        <Card className="@container/card">
          <CardHeader>
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-4">
                <CardIcon bgClass="bg-gradient-to-tr from-sky-500 to-indigo-500">
                  <Rotate3D />
                </CardIcon>
                <div>
                  <CardDescription>DNS Upstreaming</CardDescription>
                  <CardTitle className="text-2xl font-semibold text-white tabular-nums @[250px]/card:text-3xl">
                    {(data?.accepting_queries ? "Enabled" : "Disabled")}
                  </CardTitle>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardFooter>
            <p className="text-xs text-muted-foreground">DNS forwarding and interception status</p>
          </CardFooter>
        </Card>

        <Card className="@container/card">
          <CardHeader>
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-4">
                <CardIcon bgClass="bg-gradient-to-tr from-emerald-400 to-emerald-500">
                  <Zap />
                </CardIcon>
                <div>
                  <CardDescription>Query Performance</CardDescription>
                  <CardTitle className="text-2xl font-semibold text-white tabular-nums @[250px]/card:text-3xl flex items-center gap-2">
                    {(data?.blocked_queries ?? "Excellent").toLocaleString()}
                  </CardTitle>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardFooter>
            <p className="text-xs text-muted-foreground">Average response time for DNS queries</p>
          </CardFooter>
        </Card>
      </div>
      <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-3 @5xl/main:grid-cols-3">
        <Card className="@container/card">
          <CardHeader>
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-4">
                <CardIcon bgClass="border border-gradient-to-tr from-sky-500 to-indigo-500">
                  <Shield />
                </CardIcon>
                <div>
                  <CardDescription>DNS Policies</CardDescription>
                  <CardTitle className="text-xl font-semibold text-white tabular-nums @[250px]/card:text-xl">
                    <Dot className="inline-block ms-1 mb-1 w-2 h-2 mr-2 rounded-full bg-green-500" /> {(data?.total_queries ?? "Active").toLocaleString()}
                  </CardTitle>
                </div>
              </div>
            </div>
          </CardHeader>
        </Card>

        <Card className="@container/card">
          <CardHeader>
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-4">
                <CardIcon bgClass="border border-gradient-to-tr from-sky-500 to-indigo-500">
                  <ListTree />
                </CardIcon>
                <div>
                  <CardDescription>Blocklists</CardDescription>
                  <CardTitle className="text-xl font-semibold text-white tabular-nums @[250px]/card:text-xl">
                    <Dot className="inline-block ms-1 mb-1 w-2 h-2 mr-2 rounded-full bg-green-500" /> {(data?.total_queries ?? "Active").toLocaleString()}
                  </CardTitle>
                </div>
              </div>
            </div>
          </CardHeader>
        </Card>
        <Card className="@container/card">
          <CardHeader>
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-4">
                <CardIcon bgClass="border border-gradient-to-tr from-sky-500 to-indigo-500">
                  <Logs />
                </CardIcon>
                <div>
                  <CardDescription>Logging</CardDescription>
                  <CardTitle className="text-xl font-semibold text-white tabular-nums @[250px]/card:text-xl">
                    <Dot className="inline-block ms-1 mb-1 w-2 h-2 mr-2 rounded-full bg-green-500" /> {(data?.total_queries ?? "Active").toLocaleString()}
                  </CardTitle>
                </div>
              </div>
            </div>
          </CardHeader>
        </Card>
      </div>
    </>
  )
}
