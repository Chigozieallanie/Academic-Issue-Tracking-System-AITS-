"use client";

import { Link, useLocation } from "react-router-dom";
import "./global.css";

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
} from "@/components/ui/sidebar";

export function DashboardSidebar({ children }) {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <Sidebar className="bg-black text-white">
          <SidebarHeader className="border-b border-white/10 px-6 py-3 bg-primary">
            <Link to="/dashboard" className="flex items-center gap-2 font-semibold">
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
                  <Link to="/dashboard">
                    <span className="h-5 w-5">🏠</span>
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
                  <Link to="/dashboard/issues">
                    <span className="h-5 w-5">📋</span>
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
                  <Link to="/dashboard/assigned">
                    <span className="h-5 w-5">✅</span>
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
                  <Link to="/dashboard/analytics">
                    <span className="h-5 w-5">📊</span>
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
                  <Link to="/dashboard/help">
                    <span className="h-5 w-5">❓</span>
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
                  <Link to="/dashboard/profile">
                    <span className="h-5 w-5">👤</span>
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
                  <Link to="/dashboard/settings">
                    <span className="h-5 w-5">⚙️</span>
                    <span>Settings</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild className="hover:bg-white/10 text-white hover:text-white">
                  <Link to="/login">
                    <span className="h-5 w-5">🚪</span>
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
  );
}
