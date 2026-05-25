import AppShellHeader from "@/components/layout/AppShellHeader";

export default function AppsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <AppShellHeader />
      <main className="flex-1">{children}</main>
    </div>
  );
}
