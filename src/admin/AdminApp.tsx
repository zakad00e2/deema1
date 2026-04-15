import { useState, useCallback } from "react";
import LoginGate from "./components/LoginGate";
import AdminLayout, { type AdminPage } from "./components/AdminLayout";
import { ToastProvider } from "./components/Toast";
import OverviewPage from "./pages/OverviewPage";
import PortfolioListPage from "./pages/PortfolioListPage";
import PortfolioFormPage from "./pages/PortfolioFormPage";
import WorkshopListPage from "./pages/WorkshopListPage";
import WorkshopFormPage from "./pages/WorkshopFormPage";

interface AdminRoute {
  page: AdminPage;
  entityId?: string;
}

function parseRoute(pathname: string): AdminRoute {
  // /admin/portfolio/new
  if (pathname === "/admin/portfolio/new") return { page: "portfolio-new" };
  // /admin/portfolio/:id/edit
  const portfolioEditMatch = pathname.match(/^\/admin\/portfolio\/([^/]+)\/edit$/);
  if (portfolioEditMatch) return { page: "portfolio-edit", entityId: portfolioEditMatch[1] };
  // /admin/portfolio
  if (pathname === "/admin/portfolio") return { page: "portfolio" };
  // /admin/workshops/new
  if (pathname === "/admin/workshops/new") return { page: "workshops-new" };
  // /admin/workshops/:id/edit
  const workshopEditMatch = pathname.match(/^\/admin\/workshops\/([^/]+)\/edit$/);
  if (workshopEditMatch) return { page: "workshops-edit", entityId: workshopEditMatch[1] };
  // /admin/workshops
  if (pathname === "/admin/workshops") return { page: "workshops" };
  // /admin (overview)
  return { page: "overview" };
}

function routeToPath(page: AdminPage, id?: string): string {
  switch (page) {
    case "portfolio": return "/admin/portfolio";
    case "portfolio-new": return "/admin/portfolio/new";
    case "portfolio-edit": return id ? `/admin/portfolio/${id}/edit` : "/admin/portfolio";
    case "workshops": return "/admin/workshops";
    case "workshops-new": return "/admin/workshops/new";
    case "workshops-edit": return id ? `/admin/workshops/${id}/edit` : "/admin/workshops";
    default: return "/admin";
  }
}

const PAGE_TITLES: Record<AdminPage, string> = {
  overview: "Overview",
  portfolio: "Portfolio",
  "portfolio-new": "New Project",
  "portfolio-edit": "Edit Project",
  workshops: "Workshops",
  "workshops-new": "New Workshop",
  "workshops-edit": "Edit Workshop",
};

const PAGE_BREADCRUMBS: Partial<Record<AdminPage, string>> = {
  "portfolio-new": "Portfolio",
  "portfolio-edit": "Portfolio",
  "workshops-new": "Workshops",
  "workshops-edit": "Workshops",
};

export default function AdminApp() {
  const [route, setRoute] = useState<AdminRoute>(() =>
    parseRoute(window.location.pathname)
  );

  const navigate = useCallback((page: AdminPage, id?: string) => {
    const path = routeToPath(page, id);
    window.history.pushState({}, "", path);
    setRoute({ page, entityId: id });
  }, []);

  return (
    <LoginGate>
      <ToastProvider />
      <AdminLayout
        currentPage={route.page}
        pageTitle={PAGE_TITLES[route.page]}
        breadcrumb={PAGE_BREADCRUMBS[route.page]}
        onNavigate={navigate}
      >
        {route.page === "overview" && <OverviewPage onNavigate={navigate} />}
        {route.page === "portfolio" && <PortfolioListPage onNavigate={navigate} />}
        {route.page === "portfolio-new" && <PortfolioFormPage onNavigate={navigate} />}
        {route.page === "portfolio-edit" && <PortfolioFormPage editId={route.entityId} onNavigate={navigate} />}
        {route.page === "workshops" && <WorkshopListPage onNavigate={navigate} />}
        {route.page === "workshops-new" && <WorkshopFormPage onNavigate={navigate} />}
        {route.page === "workshops-edit" && <WorkshopFormPage editId={route.entityId} onNavigate={navigate} />}
      </AdminLayout>
    </LoginGate>
  );
}
