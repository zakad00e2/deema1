import { useEffect, useState } from "react";
import { portfolioService } from "../data/portfolioService";
import { workshopService } from "../data/workshopService";
import type { AdminPage } from "../components/AdminLayout";
import { Images, BookOpen, Globe, Star, FileEdit, Plus, ExternalLink } from "lucide-react";

interface OverviewPageProps {
  onNavigate: (page: AdminPage, id?: string) => void;
}

export default function OverviewPage({ onNavigate }: OverviewPageProps) {
  const [portfolioItems, setPortfolioItems] = useState<any[]>([]);
  const [workshopItems, setWorkshopItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        setLoading(true);
        setError("");
        const [portfolio, workshops] = await Promise.all([
          portfolioService.getAll(),
          workshopService.getAll(),
        ]);

        if (!cancelled) {
          setPortfolioItems(portfolio);
          setWorkshopItems(workshops);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Failed to load dashboard data.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) {
    return <div className="text-sm text-[#9a9590]">Loading dashboard data...</div>;
  }

  if (error) {
    return <div className="border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>;
  }

  const pPublished = portfolioItems.filter((i) => i.status === "published").length;
  const pDraft = portfolioItems.filter((i) => i.status === "draft").length;
  const pFeatured = portfolioItems.filter((i) => i.featured).length;

  const wPublished = workshopItems.filter((i) => i.status === "published").length;
  const wDraft = workshopItems.filter((i) => i.status === "draft").length;
  const wFeatured = workshopItems.filter((i) => i.featured).length;

  const recentPortfolio = [...portfolioItems]
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, 4);

  const recentWorkshops = [...workshopItems]
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, 3);

  return (
    <div className="space-y-8">
      {/* Welcome strip */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h2 className="text-lg font-semibold text-[#1c1c18]">Good to see you</h2>
          <p className="text-sm text-[#9a9590] mt-0.5">
            You are managing {portfolioItems.length} portfolio projects and {workshopItems.length} workshops.
          </p>
        </div>
        <div className="flex gap-2 shrink-0">
          <button
            onClick={() => onNavigate("portfolio-new")}
            className="flex items-center gap-1.5 bg-[#745940] text-white text-xs uppercase tracking-widest font-medium px-4 py-2.5 hover:bg-[#8a6d4e] transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            New Project
          </button>
          <button
            onClick={() => onNavigate("workshops-new")}
            className="flex items-center gap-1.5 bg-[#1c1c18] text-white text-xs uppercase tracking-widest font-medium px-4 py-2.5 hover:bg-[#2e2e2a] transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            New Workshop
          </button>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={<Images className="w-4 h-4 text-[#745940]" />} label="Portfolio Items" value={portfolioItems.length} sub={`${pPublished} published · ${pDraft} draft`} />
        <StatCard icon={<Globe className="w-4 h-4 text-green-600" />} label="Published Projects" value={pPublished} sub="Live on public site" color="green" />
        <StatCard icon={<Star className="w-4 h-4 text-amber-500" />} label="Featured Projects" value={pFeatured} sub="Highlighted items" color="amber" />
        <StatCard icon={<BookOpen className="w-4 h-4 text-[#745940]" />} label="Workshops" value={workshopItems.length} sub={`${wPublished} published · ${wDraft} draft`} />
      </div>

      {/* Workshop stats */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        <StatCard icon={<Globe className="w-4 h-4 text-green-600" />} label="Published Workshops" value={wPublished} sub="Live on public site" color="green" />
        <StatCard icon={<Star className="w-4 h-4 text-amber-500" />} label="Featured Workshops" value={wFeatured} sub="Featured as main" color="amber" />
        <StatCard icon={<FileEdit className="w-4 h-4 text-[#9a9590]" />} label="Total Drafts" value={pDraft + wDraft} sub="Hidden from public" />
      </div>

      {/* Content overview: two columns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Portfolio */}
        <div className="bg-white border border-[#e6e2db]">
          <div className="px-5 py-4 border-b border-[#f1ede6] flex items-center justify-between">
            <h3 className="text-xs uppercase tracking-widest font-semibold text-[#1c1c18]">Recent Portfolio</h3>
            <button
              onClick={() => onNavigate("portfolio")}
              className="text-xs text-[#745940] hover:underline"
            >
              View all
            </button>
          </div>
          <div className="divide-y divide-[#f7f3ec]">
            {recentPortfolio.length === 0 && (
              <div className="px-5 py-8 text-center">
                <p className="text-sm text-[#9a9590]">No portfolio items yet.</p>
                <button onClick={() => onNavigate("portfolio-new")} className="mt-2 text-xs text-[#745940] hover:underline">Add your first project</button>
              </div>
            )}
            {recentPortfolio.map((item) => (
              <div key={item.id} className="flex items-center gap-3 px-5 py-3 group">
                <div className="w-10 h-10 bg-[#f7f3ec] shrink-0 overflow-hidden">
                  {item.coverImage && (
                    <img src={item.coverImage} alt="" className="w-full h-full object-cover" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-[#1c1c18] truncate font-medium">{item.title.en}</p>
                  <p className="text-xs text-[#9a9590] capitalize">{item.category} · {item.year}</p>
                </div>
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className={`text-[10px] uppercase tracking-widest px-1.5 py-0.5 ${item.status === "published" ? "text-green-700 bg-green-50" : "text-[#9a9590] bg-[#f7f3ec]"}`}>
                    {item.status}
                  </span>
                  <button
                    onClick={() => onNavigate("portfolio-edit", item.id)}
                    className="text-[#9a9590] hover:text-[#745940] transition-colors"
                  >
                    <FileEdit className="w-3.5 h-3.5" />
                  </button>
                  <a
                    href={`/work/${item.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#9a9590] hover:text-[#745940] transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
          <div className="px-5 py-3 border-t border-[#f1ede6]">
            <button
              onClick={() => onNavigate("portfolio-new")}
              className="text-xs text-[#745940] uppercase tracking-widest hover:underline flex items-center gap-1"
            >
              <Plus className="w-3 h-3" />
              Add New Project
            </button>
          </div>
        </div>

        {/* Workshops */}
        <div className="bg-white border border-[#e6e2db]">
          <div className="px-5 py-4 border-b border-[#f1ede6] flex items-center justify-between">
            <h3 className="text-xs uppercase tracking-widest font-semibold text-[#1c1c18]">Workshops</h3>
            <button
              onClick={() => onNavigate("workshops")}
              className="text-xs text-[#745940] hover:underline"
            >
              View all
            </button>
          </div>
          <div className="divide-y divide-[#f7f3ec]">
            {recentWorkshops.length === 0 && (
              <div className="px-5 py-8 text-center">
                <p className="text-sm text-[#9a9590]">No workshops yet.</p>
                <button onClick={() => onNavigate("workshops-new")} className="mt-2 text-xs text-[#745940] hover:underline">Add your first workshop</button>
              </div>
            )}
            {recentWorkshops.map((ws) => (
              <div key={ws.id} className="flex items-center gap-3 px-5 py-3 group">
                <div className="w-10 h-10 bg-[#f7f3ec] shrink-0 overflow-hidden">
                  {ws.coverImage && (
                    <img src={ws.coverImage} alt="" className="w-full h-full object-cover" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-[#1c1c18] truncate font-medium">{ws.title.en}</p>
                  <p className="text-xs text-[#9a9590] capitalize">{ws.workshopType} · {ws.format.en}</p>
                </div>
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className={`text-[10px] uppercase tracking-widest px-1.5 py-0.5 ${ws.status === "published" ? "text-green-700 bg-green-50" : "text-[#9a9590] bg-[#f7f3ec]"}`}>
                    {ws.status}
                  </span>
                  <button
                    onClick={() => onNavigate("workshops-edit", ws.id)}
                    className="text-[#9a9590] hover:text-[#745940] transition-colors"
                  >
                    <FileEdit className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="px-5 py-3 border-t border-[#f1ede6]">
            <button
              onClick={() => onNavigate("workshops-new")}
              className="text-xs text-[#745940] uppercase tracking-widest hover:underline flex items-center gap-1"
            >
              <Plus className="w-3 h-3" />
              Add New Workshop
            </button>
          </div>
        </div>
      </div>

      {/* Quick links */}
      <div className="bg-[#1c1c18] p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <p className="text-white text-sm font-medium">Public site is live</p>
          <p className="text-[#9a9590] text-xs mt-0.5">Changes save instantly to localStorage and reflect on reload.</p>
        </div>
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-xs uppercase tracking-widest text-[#745940] border border-[#745940]/40 hover:border-[#745940] px-4 py-2 transition-colors whitespace-nowrap"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          View Public Site
        </a>
      </div>
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
  sub,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  sub?: string;
  color?: "green" | "amber";
}) {
  const borderColor = color === "green" ? "border-green-200" : color === "amber" ? "border-amber-200" : "border-[#e6e2db]";
  return (
    <div className={`bg-white border ${borderColor} px-4 py-4`}>
      <div className="flex items-center gap-2 mb-2">{icon}<span className="text-xs uppercase tracking-widest text-[#9a9590] font-medium">{label}</span></div>
      <p className="text-3xl font-semibold text-[#1c1c18] font-sans tabular-nums">{value}</p>
      {sub && <p className="text-xs text-[#9a9590] mt-1">{sub}</p>}
    </div>
  );
}
