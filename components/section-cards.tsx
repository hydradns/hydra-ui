import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useDashboardData } from "@/app/dashboard/useDashboardData"
import { Ban, Globe, Shield, TrendingUp, Zap } from "lucide-react";

function CardIcon({ bgClass, children }: { bgClass: string; children: React.ReactNode }) {
  return (
    <div className={"rounded-lg p-3 " + bgClass}>
      <div className="w-6 h-6 text-white">{children}</div>
    </div>
  )
}

export function SectionCards() {
  const { data } = useDashboardData()

  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      <Card className="@container/card">
        <CardHeader>
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-4">
              <CardIcon bgClass="bg-gradient-to-tr from-sky-500 to-indigo-500">
                <Globe />
              </CardIcon>
              <div>
                <CardDescription>Total Queries</CardDescription>
                <CardTitle className="text-2xl font-semibold text-white tabular-nums @[250px]/card:text-3xl">
                  {(data?.total_queries ?? 0).toLocaleString()}
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
              <CardIcon bgClass="bg-gradient-to-tr from-emerald-400 to-emerald-500">
                <Shield />
              </CardIcon>
              <div>
                <CardDescription>Blocked Queries</CardDescription>
                <CardTitle className="text-2xl font-semibold text-white tabular-nums @[250px]/card:text-3xl flex items-center gap-2">
                  {(data?.blocked_queries ?? 0).toLocaleString()}
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
              <CardIcon bgClass="bg-gradient-to-tr from-orange-400 to-rose-500">
                <Zap />
              </CardIcon>
              <div>
                <CardDescription>Query Speed</CardDescription>
                <CardTitle className="text-2xl font-semibold text-white tabular-nums @[250px]/card:text-3xl">
                  {(data?.avg_query_time_ms ?? 0).toLocaleString()} ms
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
              <CardIcon bgClass="bg-gradient-to-tr from-pink-400 to-fuchsia-500">
                <Ban />
              </CardIcon>
              <div>
                <CardDescription>Block Rate</CardDescription>
                <CardTitle className="text-2xl font-semibold text-white tabular-nums @[250px]/card:text-3xl">
                  {((data?.block_rate_percent ?? 0) as number).toFixed(2)}%
                </CardTitle>
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>
    </div>
  )
}
