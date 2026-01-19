import Sidebar from "@/components/Sidebar";
import MobileNav from "@/components/MobileNav"; // <--- Import it

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-slate-50">
      {/* Mobile: Top Navigation */}
      <MobileNav />

      {/* Desktop: Side Navigation (Hidden on mobile) */}
      <div className="hidden md:block w-64 flex-shrink-0">
        <div className="fixed h-full w-64">
          <Sidebar />
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto">{children}</main>
    </div>
  );
}
