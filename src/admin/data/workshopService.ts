import type { WorkshopItem, PublishStatus } from "./types";
import { seedWorkshopItems } from "./seedData";

const STORAGE_KEY = "admin_workshops_v1";

function load(): WorkshopItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as WorkshopItem[];
  } catch {
    // ignore parse errors
  }
  save(seedWorkshopItems);
  return seedWorkshopItems;
}

function save(items: WorkshopItem[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

export const workshopService = {
  getAll(): WorkshopItem[] {
    return load().sort((a, b) => a.sortOrder - b.sortOrder);
  },

  getPublished(): WorkshopItem[] {
    return load()
      .filter((i) => i.status === "published")
      .sort((a, b) => a.sortOrder - b.sortOrder);
  },

  getFeatured(): WorkshopItem | undefined {
    return load().find((i) => i.featured && i.status === "published");
  },

  getGroupPublished(): WorkshopItem[] {
    return load()
      .filter((i) => i.status === "published" && (i.workshopType === "beginner" || i.workshopType === "advanced" || i.workshopType === "group"))
      .sort((a, b) => a.sortOrder - b.sortOrder);
  },

  getById(id: string): WorkshopItem | undefined {
    return load().find((i) => i.id === id);
  },

  getBySlug(slug: string): WorkshopItem | undefined {
    return load().find((i) => i.slug === slug);
  },

  create(item: Omit<WorkshopItem, "id" | "createdAt" | "updatedAt">): WorkshopItem {
    const items = load();
    const newItem: WorkshopItem = {
      ...item,
      id: `workshop-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    save([...items, newItem]);
    return newItem;
  },

  update(id: string, patch: Partial<Omit<WorkshopItem, "id" | "createdAt">>): WorkshopItem | null {
    const items = load();
    const idx = items.findIndex((i) => i.id === id);
    if (idx === -1) return null;
    const updated: WorkshopItem = {
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

  toggleStatus(id: string): WorkshopItem | null {
    const item = load().find((i) => i.id === id);
    if (!item) return null;
    const nextStatus: PublishStatus = item.status === "published" ? "draft" : "published";
    return workshopService.update(id, { status: nextStatus });
  },

  toggleFeatured(id: string): WorkshopItem | null {
    const item = load().find((i) => i.id === id);
    if (!item) return null;
    return workshopService.update(id, { featured: !item.featured });
  },

  moveUp(id: string): void {
    const items = workshopService.getAll();
    const idx = items.findIndex((i) => i.id === id);
    if (idx <= 0) return;
    const prev = items[idx - 1];
    const curr = items[idx];
    workshopService.update(curr.id, { sortOrder: prev.sortOrder });
    workshopService.update(prev.id, { sortOrder: curr.sortOrder });
  },

  moveDown(id: string): void {
    const items = workshopService.getAll();
    const idx = items.findIndex((i) => i.id === id);
    if (idx === -1 || idx >= items.length - 1) return;
    const next = items[idx + 1];
    const curr = items[idx];
    workshopService.update(curr.id, { sortOrder: next.sortOrder });
    workshopService.update(next.id, { sortOrder: curr.sortOrder });
  },

  reset(): void {
    save(seedWorkshopItems);
  },
};
