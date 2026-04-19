import { useEffect, useState } from "react";
import { portfolioService } from "../data/portfolioService";
import type { PortfolioItem, ProjectCategory, PublishStatus } from "../data/types";
import type { AdminPage } from "../components/AdminLayout";
import ConfirmDialog from "../components/ConfirmDialog";
import StatusBadge from "../components/StatusBadge";
import { toast } from "../components/Toast";
import { getCategoryLabel, getCurrentSiteLocale } from "../../categoryLabels";
import {
  Plus,
  Search,
  ChevronUp,
  ChevronDown,
  Pencil,
  Trash2,
  ExternalLink,
  Eye,
  EyeOff,
  Star,
  StarOff,
  Filter,
} from "lucide-react";

interface PortfolioListPageProps {
  onNavigate: (page: AdminPage, id?: string) => void;
}

const STATUS_OPTIONS: { value: "all" | PublishStatus; label: string }[] = [
  { value: "all", label: "All Status" },
  { value: "published", label: "Published" },
  { value: "draft", label: "Draft" },
];

export default function PortfolioListPage({ onNavigate }: PortfolioListPageProps) {
  const siteLocale = getCurrentSiteLocale();
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<"all" | ProjectCategory>("all");
  const [statusFilter, setStatusFilter] = useState<"all" | PublishStatus>("all");
  const [featuredFilter, setFeaturedFilter] = useState<"all" | "featured">("all");
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [error, setError] = useState("");

  async function refresh() {
    const nextItems = await portfolioService.getAll();
    setItems(nextItems);
  }

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        setLoading(true);
        setError("");
        const nextItems = await portfolioService.getAll();
        if (!cancelled) {
          setItems(nextItems);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Failed to load projects.");
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

  const filtered = items.filter((item) => {
    const q = search.toLowerCase();
    const matchSearch =
      !q ||
      item.title.en.toLowerCase().includes(q) ||
      item.title.ar.includes(q) ||
      item.client.en.toLowerCase().includes(q) ||
      item.slug.includes(q);
    const matchCategory = categoryFilter === "all" || item.category === categoryFilter;
    const matchStatus = statusFilter === "all" || item.status === statusFilter;
    const matchFeatured = featuredFilter === "all" || (featuredFilter === "featured" && item.featured);
    return matchSearch && matchCategory && matchStatus && matchFeatured;
  });

  async function handleToggleStatus(id: string) {
    try {
      setBusyId(id);
      await portfolioService.toggleStatus(id);
      await refresh();
      toast.success("Status updated.");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to update status.");
    } finally {
      setBusyId(null);
    }
  }

  async function handleToggleFeatured(id: string) {
    try {
      setBusyId(id);
      await portfolioService.toggleFeatured(id);
      await refresh();
      toast.success("Featured status updated.");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to update featured status.");
    } finally {
      setBusyId(null);
    }
  }

  async function handleMoveUp(id: string) {
    try {
      setBusyId(id);
      await portfolioService.moveUp(id);
      await refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to move project.");
    } finally {
      setBusyId(null);
    }
  }

  async function handleMoveDown(id: string) {
    try {
      setBusyId(id);
      await portfolioService.moveDown(id);
      await refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to move project.");
    } finally {
      setBusyId(null);
    }
  }

  async function handleDelete() {
    if (!deleteId) return;
    try {
      setBusyId(deleteId);
      await portfolioService.remove(deleteId);
      await refresh();
      setDeleteId(null);
      toast.success("Project deleted.");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to delete project.");
    } finally {
      setBusyId(null);
    }
  }

  const hasFilters = search || categoryFilter !== "all" || statusFilter !== "all" || featuredFilter !== "all";
  const categoryOptions: { value: "all" | ProjectCategory; label: string }[] = [
    { value: "all", label: siteLocale === "ar" ? "جميع التصنيفات" : "All Categories" },
    { value: "executed", label: getCategoryLabel("executed", siteLocale) },
    { value: "reimagined", label: getCategoryLabel("reimagined", siteLocale) },
    { value: "conceptual", label: getCategoryLabel("conceptual", siteLocale) },
  ];

  if (loading) {
    return <div className="text-sm text-[#9a9590]">Loading portfolio projects...</div>;
  }

  if (error) {
    return <div className="border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>;
  }

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h2 className="text-base font-semibold text-[#1c1c18]">Portfolio Projects</h2>
          <p className="text-xs text-[#9a9590] mt-0.5">{items.length} total · {items.filter(i => i.status === "published").length} published</p>
        </div>
        <button
          onClick={() => onNavigate("portfolio-new")}
          className="flex items-center gap-1.5 bg-[#745940] text-white text-xs uppercase tracking-widest font-medium px-4 py-2.5 hover:bg-[#8a6d4e] transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          New Project
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 items-center">
        <div className="relative flex-1 min-w-48">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#9a9590]" />
          <input
            type="text"
            placeholder="Search by title, client, slug…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-8 pr-3 py-2 bg-white border border-[#e6e2db] text-sm font-sans text-[#1c1c18] placeholder-[#c5c0bb] focus:outline-none focus:border-[#745940] transition-colors"
          />
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <Filter className="w-3.5 h-3.5 text-[#9a9590]" />
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value as any)}
            className="bg-white border border-[#e6e2db] text-xs font-sans text-[#605b55] px-2 py-2 focus:outline-none focus:border-[#745940] transition-colors"
          >
            {categoryOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="bg-white border border-[#e6e2db] text-xs font-sans text-[#605b55] px-2 py-2 focus:outline-none focus:border-[#745940] transition-colors"
          >
            {STATUS_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
          <select
            value={featuredFilter}
            onChange={(e) => setFeaturedFilter(e.target.value as any)}
            className="bg-white border border-[#e6e2db] text-xs font-sans text-[#605b55] px-2 py-2 focus:outline-none focus:border-[#745940] transition-colors"
          >
            <option value="all">All Items</option>
            <option value="featured">Featured Only</option>
          </select>
          {hasFilters && (
            <button
              onClick={() => { setSearch(""); setCategoryFilter("all"); setStatusFilter("all"); setFeaturedFilter("all"); }}
              className="text-xs text-[#9a9590] hover:text-red-500 transition-colors"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-[#e6e2db] overflow-hidden">
        {/* Desktop table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#f1ede6] bg-[#f7f3ec]">
                <th className="px-4 py-3 text-left text-[10px] uppercase tracking-widest text-[#9a9590] font-semibold w-16">Order</th>
                <th className="px-4 py-3 text-left text-[10px] uppercase tracking-widest text-[#9a9590] font-semibold">Project</th>
                <th className="px-4 py-3 text-left text-[10px] uppercase tracking-widest text-[#9a9590] font-semibold">Category</th>
                <th className="px-4 py-3 text-left text-[10px] uppercase tracking-widest text-[#9a9590] font-semibold">Status</th>
                <th className="px-4 py-3 text-left text-[10px] uppercase tracking-widest text-[#9a9590] font-semibold">Featured</th>
                <th className="px-4 py-3 text-right text-[10px] uppercase tracking-widest text-[#9a9590] font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f7f3ec]">
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-12 text-center text-sm text-[#9a9590]">
                    {hasFilters ? "No results match your filters." : "No portfolio items yet."}
                  </td>
                </tr>
              )}
              {filtered.map((item, idx) => (
                <tr key={item.id} className="group hover:bg-[#faf8f4] transition-colors">
                  {/* Order */}
                  <td className="px-4 py-3">
                    <div className="flex flex-col gap-0.5">
                      <button
                        onClick={() => handleMoveUp(item.id)}
                        disabled={idx === 0 || busyId === item.id}
                        className="text-[#9a9590] hover:text-[#745940] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                      >
                        <ChevronUp className="w-3.5 h-3.5" />
                      </button>
                      <span className="text-xs text-[#9a9590] tabular-nums text-center">{item.sortOrder}</span>
                      <button
                        onClick={() => handleMoveDown(item.id)}
                        disabled={idx === filtered.length - 1 || busyId === item.id}
                        className="text-[#9a9590] hover:text-[#745940] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                      >
                        <ChevronDown className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                  {/* Project */}
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[#f7f3ec] shrink-0 overflow-hidden border border-[#f1ede6]">
                        {item.coverImage && (
                          <img src={item.coverImage} alt="" className="w-full h-full object-cover" />
                        )}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-[#1c1c18] truncate">{item.title.en}</p>
                        <p className="text-xs text-[#9a9590] truncate">{item.title.ar}</p>
                        <p className="text-[10px] text-[#c5c0bb] font-mono">{item.slug}</p>
                      </div>
                    </div>
                  </td>
                  {/* Category */}
                  <td className="px-4 py-3">
                    <span className="text-xs text-[#605b55]">{getCategoryLabel(item.category, siteLocale)}</span>
                    <p className="text-[10px] text-[#9a9590]">{item.year}</p>
                  </td>
                  {/* Status */}
                  <td className="px-4 py-3">
                    <StatusBadge status={item.status} />
                  </td>
                  {/* Featured */}
                  <td className="px-4 py-3">
                    {item.featured && <StatusBadge status="featured" />}
                  </td>
                  {/* Actions */}
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => handleToggleStatus(item.id)}
                        title={item.status === "published" ? "Set to Draft" : "Publish"}
                        className="p-1.5 text-[#9a9590] hover:text-[#745940] hover:bg-[#f7f3ec] transition-colors"
                      >
                        {item.status === "published" ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      </button>
                      <button
                        onClick={() => handleToggleFeatured(item.id)}
                        title={item.featured ? "Remove from Featured" : "Mark as Featured"}
                        className="p-1.5 text-[#9a9590] hover:text-amber-500 hover:bg-[#f7f3ec] transition-colors"
                      >
                        {item.featured ? <StarOff className="w-3.5 h-3.5" /> : <Star className="w-3.5 h-3.5" />}
                      </button>
                      <a
                        href={`/work/${item.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Preview on site"
                        className="p-1.5 text-[#9a9590] hover:text-[#605b55] hover:bg-[#f7f3ec] transition-colors"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                      <button
                        onClick={() => onNavigate("portfolio-edit", item.id)}
                        title="Edit"
                        className="p-1.5 text-[#9a9590] hover:text-[#745940] hover:bg-[#f7f3ec] transition-colors"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => setDeleteId(item.id)}
                        title="Delete"
                        className="p-1.5 text-[#9a9590] hover:text-red-500 hover:bg-[#f7f3ec] transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile cards */}
        <div className="md:hidden divide-y divide-[#f7f3ec]">
          {filtered.length === 0 && (
            <div className="px-4 py-10 text-center text-sm text-[#9a9590]">
              {hasFilters ? "No results match your filters." : "No portfolio items yet."}
            </div>
          )}
          {filtered.map((item) => (
            <div key={item.id} className="flex items-start gap-3 px-4 py-4">
              <div className="w-12 h-12 bg-[#f7f3ec] shrink-0 overflow-hidden">
                {item.coverImage && <img src={item.coverImage} alt="" className="w-full h-full object-cover" />}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-[#1c1c18] truncate">{item.title.en}</p>
                <div className="flex items-center gap-2 mt-1 flex-wrap">
                  <StatusBadge status={item.status} />
                  {item.featured && <StatusBadge status="featured" />}
                  <span className="text-[10px] text-[#9a9590]">{getCategoryLabel(item.category, siteLocale)}</span>
                </div>
              </div>
              <div className="flex gap-1 shrink-0">
                <button onClick={() => onNavigate("portfolio-edit", item.id)} className="p-1.5 text-[#9a9590] hover:text-[#745940] transition-colors">
                  <Pencil className="w-4 h-4" />
                </button>
                <button onClick={() => setDeleteId(item.id)} className="p-1.5 text-[#9a9590] hover:text-red-500 transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <ConfirmDialog
        open={!!deleteId}
        title="Delete Project"
        message="This action cannot be undone. The project will be permanently removed from the dashboard and the public site."
        confirmLabel="Delete Project"
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
}
