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
import {
  BookText,
  LayoutDashboard,
  ClipboardList,
  BookOpen,
  Shield,
  GraduationCap,
  LogOut,
  Loader2,
} from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { Button } from "./ui/button";
import useMe from "@/features/auth/hooks/use-me";
import Cookies from "js-cookie";

export function AppSidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const { data: me, isLoading } = useMe();

  const handleLogout = () => {
    Cookies.remove("access_token");
    router.push("/login");
  };

  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Button
                variant="ghost"
                size="lg"
                className="w-full justify-start gap-2 px-3 font-extrabold text-indigo-600 dark:text-indigo-400"
              >
                <BookOpen className="h-5 w-5" />
                <span>SIPNS Cendekia</span>
              </Button>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {isLoading ? (
              <div className="flex items-center justify-center py-6">
                <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
              </div>
            ) : (
              <>
                {/* Admin Menu */}
                {me?.role === "ADMIN" && (
                  <>
                    <SidebarMenuItem>
                      <SidebarMenuButton
                        onClick={() => router.push("/dashboard/admin")}
                        isActive={pathname === "/dashboard/admin"}
                      >
                        <Shield className="h-4 w-4" />
                        <span>Panel Admin</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </>
                )}

                {/* Teacher Menu */}
                {me?.role === "TEACHER" && (
                  <>
                    <SidebarMenuItem>
                      <SidebarMenuButton
                        onClick={() => router.push("/dashboard/teacher")}
                        isActive={pathname === "/dashboard/teacher"}
                      >
                        <LayoutDashboard className="h-4 w-4" />
                        <span>Dashboard Guru</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton
                        onClick={() => router.push(ROUTES.NILAI)}
                        isActive={
                          pathname === ROUTES.NILAI ||
                          pathname === ROUTES.CREATE_NILAI
                        }
                      >
                        <BookText className="h-4 w-4" />
                        <span>Kelola Nilai</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton
                        onClick={() => router.push(ROUTES.REKAP)}
                        isActive={pathname === ROUTES.REKAP}
                      >
                        <ClipboardList className="h-4 w-4" />
                        <span>Rekap Nilai Siswa</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </>
                )}

                {/* Student Menu */}
                {me?.role === "STUDENT" && (
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      onClick={() => router.push("/dashboard/student")}
                      isActive={pathname === "/dashboard/student"}
                    >
                      <GraduationCap className="h-4 w-4" />
                      <span>Dashboard Siswa</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )}
              </>
            )}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-border/40">
        <Button
          variant="outline"
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 text-rose-600 border-rose-200 hover:bg-rose-50 hover:text-rose-700 dark:text-rose-400 dark:border-rose-900/50 dark:hover:bg-rose-950/20"
        >
          <LogOut className="h-4 w-4" />
          <span>Keluar Akun</span>
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
