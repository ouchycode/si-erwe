"use client";

import { useEffect, useSyncExternalStore, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Newspaper,
  Images,
  Users,
  House,
  BarChart3,
  Inbox,
  MessageSquare,
  Settings,
  LogOut,
  Menu,
  PanelLeftClose,
  PanelLeftOpen,
  Landmark,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { getToken, adminLogout, getUserSnapshot, subscribeUser } from "@/lib/adminApi";
import { getInitials } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/berita", label: "Berita", icon: Newspaper },
  { href: "/admin/galeri", label: "Galeri", icon: Images },
  { href: "/admin/pengurus", label: "Pengurus RW", icon: Users },
  { href: "/admin/pengurus-rt", label: "Pengurus RT", icon: House },
  { href: "/admin/statistik", label: "Statistik", icon: BarChart3 },
  { href: "/admin/pengajuan", label: "Pengajuan", icon: Inbox },
  { href: "/admin/pesan", label: "Pesan", icon: MessageSquare },
  { href: "/admin/pengaturan", label: "Pengaturan", icon: Settings },
];

function isAuthRoute(pathname: string) {
  return pathname.startsWith("/admin/login");
}

function SidebarContent({
  collapsed,
  user,
  pathname,
  onLogout,
  onNavigate,
  onToggle,
}: {
  collapsed: boolean;
  user: { name: string } | null;
  pathname: string;
  onLogout: () => void;
  onNavigate: () => void;
  onToggle: () => void;
}) {
  return (
    <div className="flex h-full flex-col border-r border-slate-100 bg-white">
      <div
        className={cn(
          "flex items-center border-b border-slate-100",
          collapsed ? "flex-col gap-3 px-2 py-4" : "gap-3 px-5 py-5"
        )}
      >
        <div className="flex size-10 shrink-0 items-center justify-center rounded-xs bg-brand-primary text-white">
          <Landmark className="size-5" />
        </div>
        {!collapsed && (
          <div className="min-w-0 flex-1">
            <p className="text-sm font-bold leading-tight tracking-tight text-brand-primary">
              Admin RW 004
            </p>
          </div>
        )}
        <button
          className="hidden rounded-xs p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 lg:block"
          onClick={onToggle}
          aria-label={collapsed ? "Buka menu samping" : "Tutup menu samping"}
          title={collapsed ? "Buka menu" : "Tutup menu"}
        >
          {collapsed ? <PanelLeftOpen className="size-4" /> : <PanelLeftClose className="size-4" />}
        </button>
      </div>

      <nav className={cn("flex-1 overflow-y-auto px-3 pb-4", collapsed ? "mt-4" : "mt-3")}>
        <div className={cn("space-y-1", collapsed && "flex flex-col items-center gap-2")}>
          {NAV_ITEMS.map((item) => {
            const active =
              pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                title={collapsed ? item.label : undefined}
                onClick={onNavigate}
                className={cn(
                  "group flex items-center gap-3 rounded-xs text-sm font-medium transition-colors",
                  collapsed ? "size-10 justify-center px-0" : "px-3 py-2.5",
                  active
                    ? "bg-brand-light text-brand-primary"
                    : "text-slate-600 hover:bg-slate-50 hover:text-brand-primary"
                )}
              >
                <item.icon className="size-4 shrink-0" />
                {!collapsed && item.label}
              </Link>
            );
          })}
        </div>
      </nav>

      <div className={cn("border-t border-slate-100 px-3 py-3", collapsed && "flex justify-center px-2")}>
        {collapsed ? (
          <button
            className="flex size-10 items-center justify-center rounded-xs text-slate-400 transition-colors hover:bg-slate-50 hover:text-brand-primary"
            onClick={onLogout}
            aria-label="Keluar"
            title="Keluar"
          >
            <LogOut className="size-4" />
          </button>
        ) : (
          <div className="space-y-2">
            <div className="flex items-center gap-2 px-1">
              <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-brand-light text-xs font-semibold text-brand-primary">
                {user ? getInitials(user.name) : "AD"}
              </div>
              <p className="min-w-0 flex-1 truncate text-xs font-semibold text-slate-700">
                {user?.name ?? "Admin"}
              </p>
            </div>
            <button
              className="flex w-full items-center gap-2 rounded-xs px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-red-50 hover:text-red-600"
              onClick={onLogout}
            >
              <LogOut className="size-4" />
              Keluar
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  const user = useSyncExternalStore(subscribeUser, getUserSnapshot, () => null);
  useEffect(() => {
    if (!isAuthRoute(pathname) && !getToken()) {
      router.replace("/admin/login");
    }
  }, [pathname, router]);

  const authRoute = isAuthRoute(pathname);

  if (authRoute) {
    return <>{children}</>;
  }

  const handleLogout = async () => {
    await adminLogout();
    router.replace("/admin/login");
  };

  const sidebarProps = {
    user,
    pathname,
    onLogout: handleLogout,
    onNavigate: () => setMobileOpen(false),
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute inset-y-0 left-0 z-50 w-64 shadow-xl">
            <SidebarContent
              collapsed={false}
              onToggle={() => setMobileOpen(false)}
              {...sidebarProps}
            />
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-30 hidden transition-[width] duration-300 lg:block",
          sidebarOpen ? "w-64" : "w-16"
        )}
      >
        <SidebarContent
          collapsed={!sidebarOpen}
          onToggle={() => setSidebarOpen((o) => !o)}
          {...sidebarProps}
        />
      </aside>

      {/* Floating menu button (mobile) */}
      <button
        className="fixed top-4 left-4 z-40 flex size-9 items-center justify-center rounded-xs bg-white text-slate-700 shadow-md ring-1 ring-slate-200 transition-colors hover:bg-slate-100 lg:hidden"
        onClick={() => setMobileOpen(true)}
        aria-label="Buka menu"
      >
        <Menu className="size-5" />
      </button>

      <div
        className={cn(
          "transition-[padding] duration-300",
          sidebarOpen ? "lg:pl-64" : "lg:pl-16"
        )}
      >
        <main className="p-4 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
