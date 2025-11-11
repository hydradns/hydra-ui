"use client"

// export const metadata: Metadata = {
//   title: "Dashboard",
// };

import { ActionButtons } from "@/components/action-buttons";
import { AppSidebar } from "@/components/app-sidebar";
import { Chart06 } from "@/components/chart-06";
import { DNSEngineSectionCards } from "@/components/dns-engine-section-cards";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { SheetWrapper } from "@/components/wrapper/sheet.wrapper";
import { motion } from "framer-motion";

const dnsServers = [
  { name: "Google", ip: "8.8.8.8", status: "active", latency: "2ms" },
  { name: "Cloudflare", ip: "1.1.1.1", status: "active", latency: "3ms" },
  { name: "Local", ip: "192.168.1.3", status: "standby", latency: "5ms" },
]


export default function Page() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div className="px-4 md:px-6 lg:px-8 @container">
          <div className="w-full max-w-7xl mx-auto">
            <header className="flex flex-wrap gap-3 min-h-20 py-4 shrink-0 items-center transition-all ease-linear border-b">
              {/* Left side */}
              <div className="flex flex-1 items-center gap-2">
                <SidebarTrigger className="-ms-1" />
                <div className="max-lg:hidden lg:contents">
                  <Separator
                    orientation="vertical"
                    className="me-2 data-[orientation=vertical]:h-4"
                  />
                  <Breadcrumb>
                    <BreadcrumbList>
                      <BreadcrumbItem className="hidden md:block">
                        <BreadcrumbLink href="#">Home</BreadcrumbLink>
                      </BreadcrumbItem>
                      <BreadcrumbSeparator className="hidden md:block" />
                      <BreadcrumbItem>
                        <BreadcrumbPage>Dashboard</BreadcrumbPage>
                      </BreadcrumbItem>
                    </BreadcrumbList>
                  </Breadcrumb>
                </div>
              </div>
              {/* Right side */}
            </header>
            <div className="flex justify-between items-center px-6" >
              <div>
                <h1 className="text-2xl font-semibold mt-6 mb-2">DNS Engine</h1>
                <p className="mb-6 text-muted-foreground">
                  Manage DNS servers and records
                </p>
              </div>
              <div>
                <SheetWrapper triggerText="Add DNS Resolver" header="Add DNS Resolver" description="Add a new DNS resolver to the list">
                  <div className="grid flex-1 auto-rows-min gap-6 px-4">
                    <div className="grid gap-3">
                      <Label htmlFor="dns-resolver-name">Name</Label>
                      <Input id="dns-resolver-name" placeholder="e.g., Google DNS" />
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="dns-resolver-ip">IP Address</Label>
                      <Input id="dns-resolver-ip" placeholder="e.g., 8.8.8.8" />
                    </div>
                  </div>
                </SheetWrapper>
              </div>
            </div>
            <div className="overflow-hidden">
              <div className="@container/main flex flex-1 flex-col gap-2">
                <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                  <DNSEngineSectionCards />
                </div>
              </div>
            </div>
            <div className="grid auto-rows-min @2xl:grid-cols-2 *:-ms-px *:-mt-px -m-px">
              <Chart06 />
              <motion.div
                className="surface rounded-lg p-6 border-border"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h2 className="text-lg font-semibold text-foreground mb-4">DNS Resolvers</h2>
                <div className="space-y-3">
                  {dnsServers.map((server, i) => (
                    <motion.div
                      key={i}
                      className="flex items-center justify-between p-4 rounded-md bg-background/50 border border-border/50 hover:border-accent/50 transition-colors hover:bg-background/70"
                      whileHover={{ x: 2 }}
                    >
                      <div className="flex-1">
                        <p className="text-sm font-medium text-foreground">{server.name}</p>
                        <p className="text-xs text-foreground/50 font-mono">{server.ip}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-xs text-foreground/60">Latency</p>
                          <p className="text-sm font-semibold text-accent">{server.latency}</p>
                        </div>
                        <div
                          className={`w-2 h-2 rounded-full ${server.status === "active" ? "bg-green-500" : "bg-amber-500"}`}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
