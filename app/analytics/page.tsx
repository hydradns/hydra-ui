"use client"

import * as React from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import { SectionCards } from "@/components/section-cards"
import { Chart01 } from "@/components/chart-01"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"

export default function Page() {
    const topDomains = [
        { domain: "tracker.doubleclick.net", reason: "Ads", count: 1240 },
        { domain: "analytics.google.com", reason: "Tracking", count: 1120 },
        { domain: "malicious-site.com", reason: "Malware", count: 980 },
        { domain: "phishing-attempt.ru", reason: "Phishing", count: 850 },
    ]

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <div className="px-4 md:px-6 lg:px-8 @container">
                    <div className="w-full max-w-7xl mx-auto">
                        <header className="flex flex-wrap gap-3 min-h-20 py-4 shrink-0 items-center transition-all ease-linear border-b">
                            <div className="flex flex-1 items-center gap-2">
                                <SidebarTrigger className="-ms-1" />
                                <div className="max-lg:hidden lg:contents">
                                    <Separator orientation="vertical" className="me-2 data-[orientation=vertical]:h-4" />
                                    <Breadcrumb>
                                        <BreadcrumbList>
                                            <BreadcrumbItem className="hidden md:block">
                                                <BreadcrumbLink href="#">Home</BreadcrumbLink>
                                            </BreadcrumbItem>
                                            <BreadcrumbSeparator className="hidden md:block" />
                                            <BreadcrumbItem>
                                                <BreadcrumbPage>Analytics</BreadcrumbPage>
                                            </BreadcrumbItem>
                                        </BreadcrumbList>
                                    </Breadcrumb>
                                </div>
                            </div>
                        </header>

                        <div className="py-6">
                            <h1 className="text-2xl font-semibold">Analytics & Audit Logs</h1>
                            <p className="text-muted-foreground">Real-time DNS query metrics and security events</p>
                        </div>

                        <div className="py-4">
                            <SectionCards />
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <Chart01 />
                            <div className="space-y-4">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Top Blocked Domains</CardTitle>
                                    </CardHeader>
                                    <div className="p-4">
                                        <div className="space-y-3">
                                            {topDomains.map((d) => (
                                                <div key={d.domain} className="flex items-center justify-between">
                                                    <div>
                                                        <div className="font-medium">{d.domain}</div>
                                                        <div className="text-xs text-muted-foreground">{d.reason}</div>
                                                    </div>
                                                    <div className="text-red-400 font-semibold">{d.count.toLocaleString()}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </Card>
                            </div>
                        </div>
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}
