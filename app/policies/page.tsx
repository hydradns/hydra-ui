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
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { SheetWrapper } from "@/components/wrapper/sheet.wrapper"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
// no select used here yet
import { toast } from "sonner"

export default function Page() {
    const policies = [
        {
            title: "Corporate Network",
            desc: "Main policy for corporate network",
            tags: ["Malware Database", "Ad Blocklist"],
            updated: "2 hours ago",
            active: true,
        },
        {
            title: "Guest WiFi",
            desc: "Restricted policy for guest network",
            tags: ["Adult Content", "Ad Blocklist"],
            updated: "1 day ago",
            active: true,
        },
        {
            title: "Parental Controls",
            desc: "Family-friendly filtering rules",
            tags: ["Adult Content", "Gambling", "Violence"],
            updated: "3 days ago",
            active: true,
        },
        {
            title: "Dev Environment",
            desc: "Development environment access",
            tags: ["None"],
            updated: "1 week ago",
            active: false,
        },
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
                                                <BreadcrumbPage>Policies</BreadcrumbPage>
                                            </BreadcrumbItem>
                                        </BreadcrumbList>
                                    </Breadcrumb>
                                </div>
                            </div>
                            <div className="ms-auto">
                                <SheetWrapper triggerText="Create Policy" header="Create Policy" description="Add a new policy" formId="policy-form">
                                    <form id="policy-form" onSubmit={async (e) => {
                                        e.preventDefault()
                                        const fd = new FormData(e.currentTarget as HTMLFormElement)
                                        const name = String(fd.get('name') || '')
                                        const description = String(fd.get('description') || '')
                                        const groups = String(fd.get('groups') || '')
                                        const active = fd.get('active') === 'on'
                                        // collect blocklist checkboxes
                                        const blocklists = [] as string[]
                                        for (const key of ['Adware & Malware', 'Adult Content', 'Tracking Domains', 'Phishing Sites', 'Ransomware C&C']) {
                                            if (fd.get(key)) blocklists.push(key)
                                        }

                                        const payload = { name, description, groups: groups.split(',').map(s => s.trim()).filter(Boolean), active, blocklists }
                                        console.log('Create policy payload', payload)
                                        const p = new Promise<void>((resolve) => setTimeout(() => resolve(), 700))
                                        toast.promise(p, {
                                            loading: 'Creating policy...',
                                            success: 'Policy created',
                                            error: 'Error creating policy'
                                        })
                                        await p
                                            // reset form
                                            (e.currentTarget as HTMLFormElement).reset()
                                    }}>
                                        <div className="grid gap-4 p-4">
                                            <div className="grid gap-2">
                                                <Label htmlFor="name">Name</Label>
                                                <Input id="name" name="name" placeholder="e.g., Corporate Network" required />
                                            </div>
                                            <div className="grid gap-2">
                                                <Label htmlFor="description">Description</Label>
                                                <textarea id="description" name="description" className="border-input min-h-20 rounded-md bg-transparent px-3 py-2" placeholder="Short description" />
                                            </div>
                                            <div className="grid gap-2">
                                                <Label>Blocklists</Label>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                                    {['Adware & Malware', 'Adult Content', 'Tracking Domains', 'Phishing Sites', 'Ransomware C&C'].map((b) => (
                                                        <label key={b} className="flex items-center gap-2">
                                                            <Checkbox id={b} name={b} />
                                                            <span className="text-sm">{b}</span>
                                                        </label>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="grid gap-2">
                                                <Label htmlFor="groups">User Groups (comma separated)</Label>
                                                <Input id="groups" name="groups" placeholder="e.g., admins, guests" />
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <Checkbox id="active" name="active" defaultChecked />
                                                <Label htmlFor="active">Active</Label>
                                            </div>
                                        </div>
                                    </form>
                                </SheetWrapper>
                            </div>
                        </header>

                        <div className="py-6">
                            <h1 className="text-2xl font-semibold">Policies</h1>
                            <p className="text-muted-foreground">Create and manage DNS policies for different networks and users</p>
                        </div>

                        <div className="grid grid-cols-1 gap-4">
                            <div>
                                <div className="space-y-3 surface rounded-lg p-6 border-border">
                                    {policies.map((p) => (
                                        <Card key={p.title} className="mb-3 bg-transparent border">
                                            <CardHeader className="flex flex-row items-center justify-between gap-4 p-4">
                                                <div>
                                                    <CardTitle className="text-base">{p.title}</CardTitle>
                                                    <CardDescription className="text-muted-foreground">{p.desc}</CardDescription>
                                                    <div className="mt-3 flex flex-wrap gap-2">
                                                        {p.tags.map((t) => (
                                                            <Badge key={t} variant="secondary" className="px-2">{t}</Badge>
                                                        ))}
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <div className="text-sm text-muted-foreground">Updated</div>
                                                    <div className={`font-medium ${p.active ? "text-emerald-400" : "text-muted-foreground"}`}>{p.updated}</div>
                                                </div>
                                            </CardHeader>
                                        </Card>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}
