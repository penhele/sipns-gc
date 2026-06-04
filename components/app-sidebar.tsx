"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { ROUTES } from "@/constants/route";
import { ArrowUpRight, BookText, LayoutDashboard, ClipboardList, BookOpen } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { Button } from "./ui/button";

export function AppSidebar() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarHeader >
        <SidebarMenu>

          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Button variant={"ghost"} size={'lg'}>

                <BookOpen />
                SIPSN
              </Button>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                onClick={() => router.push(ROUTES.HOME)}
                isActive={pathname === ROUTES.HOME}
              >
                <LayoutDashboard />
                Dashboard
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                onClick={() => router.push(ROUTES.NILAI)}
                isActive={pathname === ROUTES.NILAI || pathname === ROUTES.CREATE_NILAI}
              >
                <BookText />
                Kelola Nilai
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                onClick={() => router.push(ROUTES.REKAP)}
                isActive={pathname === ROUTES.REKAP}
              >
                <ClipboardList />
                Rekap Nilai Siswa
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar >
  );
}
