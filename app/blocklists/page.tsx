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
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { SheetWrapper } from "@/components/wrapper/sheet.wrapper"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"

export default function Page() {
    const lists = [
        { title: "Adware & Malware", entries: "45,234 entries", tag: "Community", updated: "2 hours ago", active: true },
        { title: "Adult Content", entries: "128,456 entries", tag: "Premium", updated: "1 day ago", active: true },
        { title: "Tracking Domains", entries: "67,890 entries", tag: "Community", updated: "3 hours ago", active: true },
        { title: "Phishing Sites", entries: "23,145 entries", tag: "Premium", updated: "5 days ago", active: false },
        { title: "Ransomware C&C", entries: "12,567 entries", tag: "Premium", updated: "1 hour ago", active: true },
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
                                                <BreadcrumbPage>Blocklists</BreadcrumbPage>
                                            </BreadcrumbItem>
                                        </BreadcrumbList>
                                    </Breadcrumb>
                                </div>
                            </div>
                            <div className="ms-auto">
                                <SheetWrapper triggerText="Add" header="Add Blocklist" description="Add a new blocklist" formId="blocklist-form">
                                    <form id="blocklist-form" onSubmit={async (e) => {
                                        e.preventDefault()
                                        const fd = new FormData(e.currentTarget as HTMLFormElement)
                                        const name = String(fd.get('name') || '')
                                        const source = String(fd.get('source') || '')
                                        const type = String(fd.get('type') || 'custom')
                                        const active = fd.get('active') === 'on'
                                        const entriesRaw = String(fd.get('entries') || '')
                                        const entries = entriesRaw.split(/\r?\n/).map(s => s.trim()).filter(Boolean)

                                        const payload = { name, source, type, active, entries }
                                        console.log('Create blocklist payload', payload)
                                        const p = new Promise<void>((resolve) => setTimeout(() => resolve(), 700))
                                        toast.promise(p, {
                                            loading: 'Adding blocklist...',
                                            success: 'Blocklist added',
                                            error: 'Error adding blocklist'
                                        })
                                        await p
                                            ; (e.currentTarget as HTMLFormElement).reset()
                                    }}>
                                        <div className="grid gap-4 p-4">
                                            <div className="grid gap-2">
                                                <Label htmlFor="name">Name</Label>
                                                <Input id="name" name="name" placeholder="e.g., My Custom Blocklist" required />
                                            </div>
                                            <div className="grid gap-2">
                                                <Label htmlFor="source">Source (URL or note)</Label>
                                                <Input id="source" name="source" placeholder="https://example.com/list.txt" />
                                            </div>
                                            <div className="grid gap-2">
                                                <Label htmlFor="type">Type</Label>
                                                <Select defaultValue="custom">
                                                    <SelectTrigger id="type" name="type" className="w-full">
                                                        <SelectValue placeholder="Select a type" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="community">Community</SelectItem>
                                                        <SelectItem value="premium">Premium</SelectItem>
                                                        <SelectItem value="custom">Custom</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <div className="grid gap-2">
                                                <Label htmlFor="entries">Entries (one per line)</Label>
                                                <textarea id="entries" name="entries" className="border-input min-h-32 rounded-md bg-transparent px-3 py-2" placeholder="example.com\nbad.example.org" />
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <input id="active" name="active" type="checkbox" defaultChecked className="size-4" />
                                                <Label htmlFor="active">Active</Label>
                                            </div>
                                        </div>
                                    </form>
                                </SheetWrapper>
                            </div>
                        </header>

                        <div className="py-6">
                            <h1 className="text-2xl font-semibold">Blocklists</h1>
                            <p className="text-muted-foreground">Manage DNS blocklists and content filters</p>
                        </div>

                        <div className="grid grid-cols-1 gap-4">
                            <div className="space-y-3 surface rounded-lg p-6 border-border">
                                <h2 className="text-lg font-semibold mb-3">Active Blocklists</h2>
                                <div className="space-y-3">
                                    {lists.map((l) => (
                                        <div key={l.title} className="flex items-center justify-between p-4 rounded-md bg-background/50 border border-border/50 hover:border-accent/50 transition-colors">
                                            <div className="flex items-center gap-4">
                                                <Checkbox checked={!!l.active} aria-label={l.title} />
                                                <div>
                                                    <div className="font-medium">{l.title}</div>
                                                    <div className="text-xs text-muted-foreground">{l.entries}</div>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <Badge variant="secondary">{l.tag}</Badge>
                                                <div className="text-xs text-muted-foreground">{l.updated}</div>
                                            </div>
                                        </div>
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
