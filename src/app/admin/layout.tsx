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
  MessageSquare,
  Settings,
  LogOut,
  Menu,
  ChevronDown,
  Landmark,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { getToken, adminLogout, getUserSnapshot, subscribeUser } from "@/lib/adminApi";
import { getInitials } from "@/lib/utils";
import ThemeToggle from "@/components/layout/ThemeToggle";

const NAV_ITEMS = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/berita", label: "Berita", icon: Newspaper },
  { href: "/admin/galeri", label: "Galeri", icon: Images },
  { href: "/admin/pengurus", label: "Pengurus RW", icon: Users },
  { href: "/admin/pengurus-rt", label: "Pengurus RT", icon: House },
  { href: "/admin/statistik", label: "Statistik", icon: BarChart3 },
  { href: "/admin/pesan", label: "Pesan", icon: MessageSquare },
  { href: "/admin/pengaturan", label: "Pengaturan", icon: Settings },
];

function isAuthRoute(pathname: string) {
  return pathname.startsWith("/admin/login");
}

function SidebarContent({
  collapsed,
  pathname,
  onNavigate,
}: {
  collapsed: boolean;
  pathname: string;
  onNavigate: () => void;
}) {
  return (
    <div className="flex h-full flex-col border-r border-slate-200 bg-white">
      {!collapsed && (
        <div className="wd-heading border-b border-slate-200 px-5 py-3.5 text-[11px] font-semibold uppercase tracking-[1.5px] text-gray-400">
          Menu
        </div>
      )}

      <nav className={cn("flex-1 overflow-y-auto p-3", collapsed && "pt-4")}>
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
                  "wd-heading group flex items-center gap-3 rounded-xs text-[13.5px] font-medium tracking-[0.3px] transition-colors",
                  collapsed ? "size-10 justify-center px-0" : "px-3 py-2.5",
                  active
                    ? "bg-brand-primary text-white shadow-sm"
                    : "text-slate-600 hover:bg-brand-light hover:text-brand-primary"
                )}
              >
                <item.icon className="size-4 shrink-0" />
                {!collapsed && item.label}
              </Link>
            );
          })}
        </div>
      </nav>
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
  const [profileOpen, setProfileOpen] = useState(false);

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

  return (
    <div className="min-h-screen bg-[#ededed]">
      {/* Topbar maroon */}
      <header className="sticky top-0 z-40 bg-brand-primary shadow-[0_2px_12px_rgba(0,0,0,0.2)]">
        <div className="flex h-[62px] items-center gap-2 px-4">
          <button
            className="cursor-pointer rounded-md border-none bg-transparent p-2 text-lg text-white transition-colors hover:bg-white/15"
            onClick={() => {
              if (window.innerWidth >= 1024) setSidebarOpen((o) => !o);
              else setMobileOpen(true);
            }}
            aria-label="Buka menu"
          >
            <Menu className="size-5" />
          </button>

          <Link href="/admin/dashboard" className="flex items-center gap-2.5 no-underline">
            <span className="flex size-10 items-center justify-center rounded-xs bg-white text-brand-primary shadow-[0_2px_8px_rgba(0,0,0,0.25)]">
              <Landmark className="size-5" />
            </span>
            <span className="leading-tight text-white">
              <span className="wd-heading block text-base font-bold tracking-[1px] uppercase">
                Admin RW 004
              </span>
              <span className="wd-heading block text-[10px] font-normal tracking-[2px] uppercase opacity-85">
                Panel Admin
              </span>
            </span>
          </Link>

          {/* Kanan: tema + akun */}
          <div className="ml-auto flex items-center gap-1.5">
            <ThemeToggle variant="navbar" />

            <div className="relative">
              <button
                type="button"
                onClick={() => setProfileOpen((o) => !o)}
                aria-label="Menu akun"
                className="flex cursor-pointer items-center gap-2.5 rounded-md border-none bg-white/10 px-2.5 py-1.5 text-white transition-colors hover:bg-white/20"
              >
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-white text-xs font-bold text-brand-primary">
                  {user ? getInitials(user.name) : "AD"}
                </span>
                <span className="hidden text-left leading-tight sm:block">
                  <span className="wd-heading block max-w-[140px] truncate text-[13px] font-semibold tracking-[0.3px]">
                    {user?.name ?? "Admin"}
                  </span>
                  <span className="block text-[10px] uppercase tracking-[1px] opacity-80">
                    Administrator
                  </span>
                </span>
                <ChevronDown
                  className={cn(
                    "size-3.5 transition-transform",
                    profileOpen && "rotate-180"
                  )}
                />
              </button>

              {profileOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40 cursor-default"
                    onClick={() => setProfileOpen(false)}
                  />
                  <div className="absolute right-0 top-full z-50 mt-2 w-60 overflow-hidden rounded-md border border-slate-200 bg-white shadow-xl">
                    <div className="border-b border-slate-100 px-4 py-3">
                      <p className="m-0 truncate text-sm font-bold text-slate-800">
                        {user?.name ?? "Admin"}
                      </p>
                      <p className="wd-heading m-0 text-[11px] uppercase tracking-[1px] text-gray-400">
                        Administrator RW 004
                      </p>
                    </div>
                    <Link
                      href="/admin/pengaturan"
                      className="flex items-center gap-2.5 px-4 py-2.5 text-sm font-medium text-slate-600 no-underline transition-colors hover:bg-brand-light hover:text-brand-primary"
                    >
                      <Settings className="size-4" />
                      Pengaturan
                    </Link>
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="flex w-full cursor-pointer items-center gap-2.5 border-t border-slate-100 border-t-solid bg-transparent px-4 py-2.5 text-sm font-medium text-red-600 transition-colors hover:bg-red-50"
                    >
                      <LogOut className="size-4" />
                      Keluar
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute inset-y-0 left-0 z-50 w-64 shadow-xl">
            <SidebarContent
              collapsed={false}
              pathname={pathname}
              onNavigate={() => setMobileOpen(false)}
            />
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <aside
        className={cn(
          "fixed bottom-0 left-0 top-[62px] z-30 hidden transition-[width] duration-300 lg:block",
          sidebarOpen ? "w-64" : "w-16"
        )}
      >
        <SidebarContent
          collapsed={!sidebarOpen}
          pathname={pathname}
          onNavigate={() => setMobileOpen(false)}
        />
      </aside>

      <div
        className={cn(
          "transition-[padding] duration-300",
          sidebarOpen ? "lg:pl-64" : "lg:pl-16"
        )}
      >
        <main className="p-4 lg:p-6">{children}</main>
        <footer className="border-t border-slate-200/70 px-4 py-4 pb-6 lg:px-6">
          <div className="flex flex-col items-center justify-between gap-1 sm:flex-row">
            <span className="wd-heading text-[12px] uppercase tracking-[0.5px] text-gray-500">
              Developed by KKN UYM Threeverse Bytewizard Team 2026
            </span>
            <span className="wd-heading text-[12px] uppercase tracking-[0.5px] text-gray-500">
              RW 004, Kelurahan Pabuaran
            </span>
          </div>
        </footer>
      </div>
    </div>
  );
}
