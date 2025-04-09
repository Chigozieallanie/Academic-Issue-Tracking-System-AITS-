"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BarChart, CheckSquare, ClipboardList, HelpCircle, Home, LogOut, Settings, User } from "lucide-react"
import'./global.css';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

export function DashboardSidebar({ children }) {
  const pathname = usePathname()

  const isActive = (path) => {
    return pathname === path
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <Sidebar className="bg-black text-white">
          <SidebarHeader className="border-b border-white/10 px-6 py-3 bg-primary">
            <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
              <span className="text-white text-xl">AcadTrack</span>
            </Link>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={isActive("/dashboard")}
                  className="hover:bg-white/10 data-[active=true]:bg-primary data-[active=true]:text-white"
                >
                  <Link href="/dashboard">
                    <Home className="h-5 w-5" />
                    <span>Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={isActive("/dashboard/issues")}
                  className="hover:bg-white/10 data-[active=true]:bg-primary data-[active=true]:text-white"
                >
                  <Link href="/dashboard/issues">
                    <ClipboardList className="h-5 w-5" />
                    <span>All Issues</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={isActive("/dashboard/assigned")}
                  className="hover:bg-white/10 data-[active=true]:bg-primary data-[active=true]:text-white"
                >
                  <Link href="/dashboard/assigned">
                    <CheckSquare className="h-5 w-5" />
                    <span>Assigned to Me</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={isActive("/dashboard/analytics")}
                  className="hover:bg-white/10 data-[active=true]:bg-primary data-[active=true]:text-white"
                >
                  <Link href="/dashboard/analytics">
                    <BarChart className="h-5 w-5" />
                    <span>Analytics</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={isActive("/dashboard/help")}
                  className="hover:bg-white/10 data-[active=true]:bg-primary data-[active=true]:text-white"
                >
                  <Link href="/dashboard/help">
                    <HelpCircle className="h-5 w-5" />
                    <span>Help & Support</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter className="border-t border-white/10 bg-primary/80">
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={isActive("/dashboard/profile")}
                  className="hover:bg-white/10 data-[active=true]:bg-black data-[active=true]:text-white"
                >
                  <Link href="/dashboard/profile">
                    <User className="h-5 w-5" />
                    <span>Profile</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={isActive("/dashboard/settings")}
                  className="hover:bg-white/10 data-[active=true]:bg-black data-[active=true]:text-white"
                >
                  <Link href="/dashboard/settings">
                    <Settings className="h-5 w-5" />
                    <span>Settings</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild className="hover:bg-white/10 text-white hover:text-white">
                  <Link href="/login">
                    <LogOut className="h-5 w-5" />
                    <span>Logout</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>
        <div className="flex-1 bg-white">
          <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-primary/5 px-6">
            <SidebarTrigger className="text-primary hover:bg-primary/10 hover:text-primary" />
            <div className="ml-auto flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="relative h-8 w-8 rounded-full bg-primary text-white">
                  <span className="absolute inset-0 flex items-center justify-center text-sm font-medium">JS</span>
                </div>
                <div className="hidden text-sm font-medium md:block">Dr. John Smith</div>
              </div>
            </div>
          </header>
          <main className="p-6">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  )
}
