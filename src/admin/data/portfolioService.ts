import type { PortfolioItem, PublishStatus } from "./types";
import { seedPortfolioItems } from "./seedData";

const STORAGE_KEY = "admin_portfolio_v1";

function load(): PortfolioItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as PortfolioItem[];
  } catch {
    // ignore parse errors
  }
  // First-run seed
  save(seedPortfolioItems);
  return seedPortfolioItems;
}

function save(items: PortfolioItem[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

// ─── Public API ────────────────────────────────────────────────────────────────

export const portfolioService = {
  /** Returns all portfolio items (admin view — published and drafts). */
  getAll(): PortfolioItem[] {
    return load().sort((a, b) => a.sortOrder - b.sortOrder);
  },

  /** Returns only published items (for use by public pages). */
  getPublished(): PortfolioItem[] {
    return load()
      .filter((i) => i.status === "published")
      .sort((a, b) => a.sortOrder - b.sortOrder);
  },

  getById(id: string): PortfolioItem | undefined {
    return load().find((i) => i.id === id);
  },

  getBySlug(slug: string): PortfolioItem | undefined {
    return load().find((i) => i.slug === slug);
  },

  create(item: Omit<PortfolioItem, "id" | "createdAt" | "updatedAt">): PortfolioItem {
    const items = load();
    const newItem: PortfolioItem = {
      ...item,
      id: `portfolio-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    save([...items, newItem]);
    return newItem;
  },

  update(id: string, patch: Partial<Omit<PortfolioItem, "id" | "createdAt">>): PortfolioItem | null {
    const items = load();
    const idx = items.findIndex((i) => i.id === id);
    if (idx === -1) return null;
    const updated: PortfolioItem = {
      ...items[idx],
      ...patch,
      updatedAt: new Date().toISOString(),
    };
    items[idx] = updated;
    save(items);
    return updated;
  },

  remove(id: string): boolean {
    const items = load();
    const filtered = items.filter((i) => i.id !== id);
    if (filtered.length === items.length) return false;
    save(filtered);
    return true;
  },

  toggleStatus(id: string): PortfolioItem | null {
    const item = load().find((i) => i.id === id);
    if (!item) return null;
    const nextStatus: PublishStatus = item.status === "published" ? "draft" : "published";
    return portfolioService.update(id, { status: nextStatus });
  },

  toggleFeatured(id: string): PortfolioItem | null {
    const item = load().find((i) => i.id === id);
    if (!item) return null;
    return portfolioService.update(id, { featured: !item.featured });
  },

  /** Move item up in sort order (lower number = higher in list). */
  moveUp(id: string): void {
    const items = portfolioService.getAll();
    const idx = items.findIndex((i) => i.id === id);
    if (idx <= 0) return;
    // Swap sortOrder with previous
    const prev = items[idx - 1];
    const curr = items[idx];
    portfolioService.update(curr.id, { sortOrder: prev.sortOrder });
    portfolioService.update(prev.id, { sortOrder: curr.sortOrder });
  },

  moveDown(id: string): void {
    const items = portfolioService.getAll();
    const idx = items.findIndex((i) => i.id === id);
    if (idx === -1 || idx >= items.length - 1) return;
    const next = items[idx + 1];
    const curr = items[idx];
    portfolioService.update(curr.id, { sortOrder: next.sortOrder });
    portfolioService.update(next.id, { sortOrder: curr.sortOrder });
  },

  /** Reset to seed data (dev/admin utility). */
  reset(): void {
    save(seedPortfolioItems);
  },
};
