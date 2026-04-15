import { useState } from "react";
import { authService } from "../data/authService";
import {
  LayoutDashboard,
  Images,
  BookOpen,
  ExternalLink,
  LogOut,
  Menu,
  X,
  ChevronRight,
} from "lucide-react";

export type AdminPage =
  | "overview"
  | "portfolio"
  | "portfolio-new"
  | "portfolio-edit"
  | "workshops"
  | "workshops-new"
  | "workshops-edit";

interface AdminLayoutProps {
  children: React.ReactNode;
  currentPage: AdminPage;
  pageTitle: string;
  breadcrumb?: string;
  onNavigate: (page: AdminPage, id?: string) => void;
}

const navItems = [
  { id: "overview" as AdminPage, label: "Overview", icon: LayoutDashboard, href: "/admin" },
  { id: "portfolio" as AdminPage, label: "Portfolio", icon: Images, href: "/admin/portfolio" },
  { id: "workshops" as AdminPage, label: "Workshops", icon: BookOpen, href: "/admin/workshops" },
];

export default function AdminLayout({
  children,
  currentPage,
  pageTitle,
  breadcrumb,
  onNavigate,
}: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  function handleLogout() {
    authService.logout();
    window.location.reload();
  }

  const activeSection = currentPage.split("-")[0] as AdminPage;

  return (
    <div className="min-h-screen bg-[#f7f3ec] flex font-sans">
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`fixed top-0 left-0 h-full w-60 bg-[#1c1c18] z-50 flex flex-col transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="px-5 py-5 border-b border-[#2e2e2a] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#745940] flex items-center justify-center shrink-0">
              <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
                <rect x="2" y="2" width="7" height="7" fill="white" opacity="0.9" />
                <rect x="11" y="2" width="7" height="7" fill="white" opacity="0.5" />
                <rect x="2" y="11" width="7" height="7" fill="white" opacity="0.5" />
                <rect x="11" y="11" width="7" height="7" fill="white" opacity="0.9" />
              </svg>
            </div>
            <div>
              <p className="text-white text-sm font-semibold leading-tight">Athr Admin</p>
              <p className="text-[#605b55] text-[10px] uppercase tracking-widest leading-tight">Dashboard</p>
            </div>
          </div>
          <button
            className="lg:hidden text-[#605b55] hover:text-white transition-colors"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          <p className="px-2 text-[9px] uppercase tracking-[0.2em] text-[#4a4844] mb-3">Content</p>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm transition-all text-left ${
                  isActive
                    ? "bg-[#745940] text-white"
                    : "text-[#9a9590] hover:text-white hover:bg-[#242420]"
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span className="font-medium">{item.label}</span>
                {isActive && <ChevronRight className="w-3 h-3 ml-auto opacity-60" />}
              </button>
            );
          })}
        </nav>

        <div className="px-3 py-4 border-t border-[#2e2e2a] space-y-1">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-3 py-2.5 text-sm text-[#9a9590] hover:text-white hover:bg-[#242420] transition-all"
          >
            <ExternalLink className="w-4 h-4 shrink-0" />
            <span>View Public Site</span>
          </a>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-[#9a9590] hover:text-red-400 hover:bg-[#242420] transition-all"
          >
            <LogOut className="w-4 h-4 shrink-0" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col lg:ml-60">
        <header className="sticky top-0 z-30 bg-[#fdf9f2] border-b border-[#e6e2db] px-4 md:px-8 py-3 flex items-center gap-4">
          <button
            className="lg:hidden text-[#605b55] hover:text-[#1c1c18] transition-colors"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="flex-1 min-w-0">
            {breadcrumb && (
              <p className="text-[10px] uppercase tracking-widest text-[#9a9590] mb-0.5">{breadcrumb}</p>
            )}
            <h1 className="text-base font-semibold text-[#1c1c18] truncate">{pageTitle}</h1>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-[#9a9590] hover:text-[#745940] transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              View Site
            </a>
            <div className="w-px h-4 bg-[#e6e2db]" />
            <button
              onClick={handleLogout}
              className="text-xs text-[#9a9590] hover:text-red-500 transition-colors flex items-center gap-1.5"
            >
              <LogOut className="w-3.5 h-3.5" />
              Sign Out
            </button>
          </div>
        </header>

        <main className="flex-1 px-4 md:px-8 py-6 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
