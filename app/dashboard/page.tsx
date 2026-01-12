"use client"
import type { Metadata } from "next";

// export const metadata: Metadata = {
//   title: "Dashboard",
// };

import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Chart01 } from "@/components/chart-01";
import { Chart02 } from "@/components/chart-02";
import { Chart03 } from "@/components/chart-03";
import { Chart04 } from "@/components/chart-04";
import { Chart05 } from "@/components/chart-05";
import { Chart06 } from "@/components/chart-06";
import { ActionButtons } from "@/components/action-buttons";
import { SectionCards } from "@/components/section-cards";
import { useEffect } from "react";
import api from "@/lib/api";

export default function Page() {
  useEffect(() => {
    api.get("/dashboard/summary").then((response) => {
      console.log("Dashboard summary data:", response.data);
    }).catch((error) => {
      console.error("Error fetching dashboard summary data:", error);
    });
  }, [])
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
              {/* <ActionButtons /> */}
            </header>
            <div className="overflow-hidden">
              <div className="@container/main flex flex-1 flex-col gap-2">
                <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                  <SectionCards />
                </div>
              </div>
              <div className="grid auto-rows-min @2xl:grid-cols-2 *:-ms-px *:-mt-px -m-px">
                <Chart01 />
                <Chart02 />
                <Chart03 />
                <Chart04 />
                <Chart05 />
                <Chart06 />
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
