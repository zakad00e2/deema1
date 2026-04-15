import { useState, useEffect } from "react";
import { portfolioService } from "../data/portfolioService";
import type { PortfolioItem, ProjectCategory, PublishStatus } from "../data/types";
import type { AdminPage } from "../components/AdminLayout";
import {
  LangTabs,
  FieldWrapper,
  TextInput,
  Textarea,
  Select,
  Toggle,
  ImageUploader,
  MultiImageUploader,
  StringListEditor,
  SectionDivider,
} from "../components/FormField";
import { toast } from "../components/Toast";
import { ArrowLeft, Save, ExternalLink, Loader2 } from "lucide-react";

interface PortfolioFormPageProps {
  editId?: string;
  onNavigate: (page: AdminPage, id?: string) => void;
}

function slugify(str: string) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function newItem(): Omit<PortfolioItem, "id" | "createdAt" | "updatedAt"> {
  return {
    slug: "",
    title: { en: "", ar: "" },
    shortDescription: { en: "", ar: "" },
    heroTitle: { en: "", ar: "" },
    heroIntro: { en: "", ar: "" },
    campaignOverview: { en: "", ar: "" },
    preEventMarketing: { en: [], ar: [] },
    launchEventExperience: { en: [], ar: [] },
    postEventMarketing: { en: [], ar: [] },
    campaignImpact: { en: [], ar: [] },
    coverImage: "",
    desktopImage: "",
    preEventImages: [],
    postEventImages: [],
    gallery: [],
    category: "executed",
    client: { en: "", ar: "" },
    year: String(new Date().getFullYear()),
    location: { en: "", ar: "" },
    services: { en: [], ar: [] },
    metrics: [],
    technologies: [],
    externalLink: "",
    featured: false,
    status: "draft",
    sortOrder: 99,
    nextProjectSlug: "",
    aspectClass: "aspect-[4/3]",
    spanClass: "md:col-span-6",
    badgeClassName: "",
    grayscale: false,
    notes: { en: [], ar: [] },
  };
}

export default function PortfolioFormPage({ editId, onNavigate }: PortfolioFormPageProps) {
  const isEditing = !!editId;
  const [lang, setLang] = useState<"en" | "ar">("en");
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(isEditing);
  const [loadError, setLoadError] = useState("");
  const [form, setForm] = useState<Omit<PortfolioItem, "id" | "createdAt" | "updatedAt">>(newItem());

  useEffect(() => {
    if (!editId) return;

    let cancelled = false;

    async function load() {
      try {
        setLoading(true);
        setLoadError("");
        const existing = await portfolioService.getById(editId);
        if (!existing) {
          throw new Error("Project not found.");
        }

        if (!cancelled) {
          const { id, createdAt, updatedAt, ...rest } = existing;
          setForm(rest);
        }
      } catch (err) {
        if (!cancelled) {
          setLoadError(err instanceof Error ? err.message : "Failed to load project.");
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
  }, [editId]);

  // Auto-generate slug from EN title (only when creating)
  useEffect(() => {
    if (!isEditing && form.title.en) {
      setForm((prev) => ({ ...prev, slug: slugify(prev.title.en) }));
    }
  }, [form.title.en, isEditing]);

  function set<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function setBilingual(key: "title" | "shortDescription" | "heroTitle" | "heroIntro" | "campaignOverview" | "client" | "location" | "duration" | "format" | "dates" | "ctaText", value: string) {
    setForm((prev) => ({
      ...prev,
      [key]: { ...(prev as any)[key], [lang]: value },
    }));
  }

  function setBilingualArray(key: "preEventMarketing" | "launchEventExperience" | "postEventMarketing" | "campaignImpact" | "services" | "notes", value: string[]) {
    setForm((prev) => ({
      ...prev,
      [key]: { ...(prev as any)[key], [lang]: value },
    }));
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!form.title.en.trim()) {
      toast.error("English title is required.");
      return;
    }
    if (!form.slug.trim()) {
      toast.error("Slug is required.");
      return;
    }
    setSaving(true);
    try {
      if (isEditing && editId) {
        await portfolioService.update(editId, form);
        toast.success("Project updated successfully.");
      } else {
        await portfolioService.create(form);
        toast.success("Project created successfully.");
      }
      onNavigate("portfolio");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to save. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return <div className="text-sm text-[#9a9590]">Loading project...</div>;
  }

  if (loadError) {
    return <div className="border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{loadError}</div>;
  }

  const dirAttr = lang === "ar" ? "rtl" : "ltr";

  const categoryOptions = [
    { value: "executed", label: "Executed" },
    { value: "reimagined", label: "Reimagined" },
    { value: "conceptual", label: "Conceptual" },
  ];

  const statusOptions = [
    { value: "draft", label: "Draft" },
    { value: "published", label: "Published" },
  ];

  const aspectOptions = [
    { value: "aspect-[16/9]", label: "16:9 Landscape" },
    { value: "aspect-[4/3]", label: "4:3" },
    { value: "aspect-square", label: "Square" },
    { value: "aspect-[3/4]", label: "3:4 Portrait" },
  ];

  const spanOptions = [
    { value: "md:col-span-4", label: "Small (4/12)" },
    { value: "md:col-span-6", label: "Medium (6/12)" },
    { value: "md:col-span-8", label: "Large (8/12)" },
    { value: "md:col-span-12", label: "Full (12/12)" },
  ];

  return (
    <form onSubmit={handleSave} className="space-y-6">
      {/* Page header */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => onNavigate("portfolio")}
            className="text-[#9a9590] hover:text-[#1c1c18] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h2 className="text-base font-semibold text-[#1c1c18]">
              {isEditing ? `Edit: ${form.title.en || "Untitled"}` : "New Portfolio Project"}
            </h2>
            <p className="text-xs text-[#9a9590] mt-0.5">
              {isEditing ? "Make changes and save to update." : "Fill in the details below to create a new project."}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {isEditing && form.slug && (
            <a
              href={`/work/${form.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-[#9a9590] border border-[#e6e2db] px-3 py-2.5 hover:border-[#745940] hover:text-[#745940] transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Preview
            </a>
          )}
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-1.5 bg-[#745940] text-white text-xs uppercase tracking-widest font-medium px-5 py-2.5 hover:bg-[#8a6d4e] disabled:opacity-50 transition-colors"
          >
            {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
            {saving ? "Saving…" : "Save Project"}
          </button>
        </div>
      </div>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* ── Main content (2/3) ────────────────────────────────────────── */}
        <div className="lg:col-span-2 space-y-6">

          {/* Language selector */}
          <div className="bg-white border border-[#e6e2db] p-5">
            <p className="text-xs uppercase tracking-widest text-[#9a9590] mb-3 font-semibold">Content Language</p>
            <LangTabs activeLang={lang} onChange={setLang} />
            <p className="text-xs text-[#9a9590] mt-2">Fill in both English and Arabic for all text fields.</p>
          </div>

          {/* Basic Info */}
          <div className="bg-white border border-[#e6e2db] p-5 space-y-4">
            <SectionDivider title="Basic Information" />
            <FieldWrapper label="Title" required>
              <TextInput
                value={form.title[lang]}
                onChange={(v) => setBilingual("title", v)}
                placeholder={lang === "en" ? "Project title" : "عنوان المشروع"}
                dir={dirAttr}
              />
            </FieldWrapper>
            <FieldWrapper label="Short Description" required>
              <Textarea
                value={form.shortDescription[lang]}
                onChange={(v) => setBilingual("shortDescription", v)}
                placeholder={lang === "en" ? "Short description (shown in portfolio grid)" : "وصف قصير (يظهر في شبكة المحفظة)"}
                rows={3}
                dir={dirAttr}
              />
            </FieldWrapper>
            <div className="grid grid-cols-2 gap-4">
              <FieldWrapper label="Client">
                <TextInput
                  value={form.client[lang]}
                  onChange={(v) => setBilingual("client", v)}
                  placeholder={lang === "en" ? "Client name" : "اسم العميل"}
                  dir={dirAttr}
                />
              </FieldWrapper>
              <FieldWrapper label="Year">
                <TextInput
                  value={form.year}
                  onChange={(v) => set("year", v)}
                  placeholder="2024"
                />
              </FieldWrapper>
            </div>
            <FieldWrapper label="Location">
              <TextInput
                value={form.location[lang]}
                onChange={(v) => setBilingual("location", v)}
                placeholder={lang === "en" ? "e.g. Launch Event / Dubai" : "مثال: فعالية إطلاق / دبي"}
                dir={dirAttr}
              />
            </FieldWrapper>
            <FieldWrapper label="External Link" helper="Optional case study or project URL">
              <TextInput
                value={form.externalLink}
                onChange={(v) => set("externalLink", v)}
                placeholder="https://..."
              />
            </FieldWrapper>
          </div>

          {/* Hero Content */}
          <div className="bg-white border border-[#e6e2db] p-5 space-y-4">
            <SectionDivider title="Hero Content" description="Displayed at the top of the case study page" />
            <FieldWrapper label="Hero Title">
              <TextInput
                value={form.heroTitle[lang]}
                onChange={(v) => setBilingual("heroTitle", v)}
                placeholder={lang === "en" ? "Bold hero headline" : "العنوان الرئيسي العريض"}
                dir={dirAttr}
              />
            </FieldWrapper>
            <FieldWrapper label="Hero Intro">
              <Textarea
                value={form.heroIntro[lang]}
                onChange={(v) => setBilingual("heroIntro", v)}
                placeholder={lang === "en" ? "Hero supporting paragraph" : "فقرة داعمة للعنوان"}
                rows={2}
                dir={dirAttr}
              />
            </FieldWrapper>
            <FieldWrapper label="Campaign Overview">
              <Textarea
                value={form.campaignOverview[lang]}
                onChange={(v) => setBilingual("campaignOverview", v)}
                placeholder={lang === "en" ? "Full campaign overview text" : "نص نظرة عامة كاملة على الحملة"}
                rows={5}
                dir={dirAttr}
              />
            </FieldWrapper>
          </div>

          {/* Campaign Sections */}
          <div className="bg-white border border-[#e6e2db] p-5 space-y-5">
            <SectionDivider title="Campaign Sections" />
            <FieldWrapper label="Pre-Event Marketing" helper="One item per line">
              <StringListEditor
                values={form.preEventMarketing[lang]}
                onChange={(v) => setBilingualArray("preEventMarketing", v)}
                placeholder={lang === "en" ? "Marketing activity" : "نشاط تسويقي"}
                dir={dirAttr}
                addLabel="Add Activity"
              />
            </FieldWrapper>
            <FieldWrapper label="Launch Event Experience">
              <StringListEditor
                values={form.launchEventExperience[lang]}
                onChange={(v) => setBilingualArray("launchEventExperience", v)}
                placeholder={lang === "en" ? "Event experience item" : "عنصر تجربة الفعالية"}
                dir={dirAttr}
                addLabel="Add Item"
              />
            </FieldWrapper>
            <FieldWrapper label="Post-Event Marketing">
              <StringListEditor
                values={form.postEventMarketing[lang]}
                onChange={(v) => setBilingualArray("postEventMarketing", v)}
                placeholder={lang === "en" ? "Post-event activity" : "نشاط ما بعد الفعالية"}
                dir={dirAttr}
                addLabel="Add Activity"
              />
            </FieldWrapper>
            <FieldWrapper label="Campaign Impact">
              <StringListEditor
                values={form.campaignImpact[lang]}
                onChange={(v) => setBilingualArray("campaignImpact", v)}
                placeholder={lang === "en" ? "Impact point" : "نقطة تأثير"}
                dir={dirAttr}
                addLabel="Add Impact"
              />
            </FieldWrapper>
          </div>

          {/* Services & Metrics */}
          <div className="bg-white border border-[#e6e2db] p-5 space-y-5">
            <SectionDivider title="Services & Metrics" />
            <FieldWrapper label="Services">
              <StringListEditor
                values={form.services[lang]}
                onChange={(v) => setBilingualArray("services", v)}
                placeholder={lang === "en" ? "Service name" : "اسم الخدمة"}
                dir={dirAttr}
                addLabel="Add Service"
              />
            </FieldWrapper>
            <FieldWrapper label="Notes / Tags" helper="Shown as category tags in portfolio grid">
              <StringListEditor
                values={form.notes[lang]}
                onChange={(v) => setBilingualArray("notes", v)}
                placeholder={lang === "en" ? "Tag" : "وسم"}
                dir={dirAttr}
                addLabel="Add Tag"
              />
            </FieldWrapper>
            {/* Metrics */}
            <div>
              <p className="text-xs uppercase tracking-widest text-[#605b55] font-semibold mb-2">Metrics</p>
              <div className="space-y-2">
                {form.metrics.map((m, idx) => (
                  <div key={idx} className="grid grid-cols-2 gap-2 items-center">
                    <input
                      type="text"
                      value={lang === "en" ? m.label.en : m.label.ar}
                      onChange={(e) => {
                        const next = [...form.metrics];
                        next[idx] = { ...m, label: { ...m.label, [lang]: e.target.value } };
                        set("metrics", next);
                      }}
                      placeholder={lang === "en" ? "Label" : "التسمية"}
                      dir={dirAttr}
                      className="bg-white border border-[#e6e2db] text-sm font-sans px-3 py-2 focus:outline-none focus:border-[#745940] transition-colors"
                    />
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={m.value}
                        onChange={(e) => {
                          const next = [...form.metrics];
                          next[idx] = { ...m, value: e.target.value };
                          set("metrics", next);
                        }}
                        placeholder="Value"
                        className="flex-1 bg-white border border-[#e6e2db] text-sm font-sans px-3 py-2 focus:outline-none focus:border-[#745940] transition-colors"
                      />
                      <button
                        type="button"
                        onClick={() => set("metrics", form.metrics.filter((_, i) => i !== idx))}
                        className="text-[#9a9590] hover:text-red-500 transition-colors px-2"
                      >
                        ×
                      </button>
                    </div>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => set("metrics", [...form.metrics, { label: { en: "", ar: "" }, value: "" }])}
                  className="text-xs uppercase tracking-widest text-[#745940] border border-dashed border-[#745940]/40 hover:border-[#745940] px-3 py-2 w-full transition-colors"
                >
                  + Add Metric
                </button>
              </div>
            </div>
          </div>

          {/* Images */}
          <div className="bg-white border border-[#e6e2db] p-5 space-y-5">
            <SectionDivider title="Images & Media" />
            <ImageUploader
              value={form.coverImage}
              onChange={(v) => set("coverImage", v)}
              label="Cover Image (Mobile)"
              aspectRatio="aspect-[4/3]"
            />
            <ImageUploader
              value={form.desktopImage}
              onChange={(v) => set("desktopImage", v)}
              label="Cover Image (Desktop) — Optional"
              aspectRatio="aspect-[16/9]"
            />
            <MultiImageUploader
              values={form.preEventImages}
              onChange={(v) => set("preEventImages", v)}
              label="Pre-Event Images"
              max={8}
            />
            <MultiImageUploader
              values={form.postEventImages}
              onChange={(v) => set("postEventImages", v)}
              label="Post-Event Images"
              max={8}
            />
            <MultiImageUploader
              values={form.gallery}
              onChange={(v) => set("gallery", v)}
              label="Gallery Images"
              max={12}
            />
          </div>
        </div>

        {/* ── Sidebar (1/3) ─────────────────────────────────────────────── */}
        <div className="space-y-4">

          {/* Status & Settings */}
          <div className="bg-white border border-[#e6e2db] p-5 space-y-4">
            <p className="text-xs uppercase tracking-widest text-[#1c1c18] font-semibold">Settings</p>
            <FieldWrapper label="Status">
              <Select
                value={form.status}
                onChange={(v) => set("status", v as PublishStatus)}
                options={statusOptions}
              />
            </FieldWrapper>
            <FieldWrapper label="Category" required>
              <Select
                value={form.category}
                onChange={(v) => set("category", v as ProjectCategory)}
                options={categoryOptions}
              />
            </FieldWrapper>
            <FieldWrapper label="Slug" required helper="Auto-generated from title. Must be unique.">
              <TextInput
                value={form.slug}
                onChange={(v) => set("slug", slugify(v))}
                placeholder="project-slug"
              />
            </FieldWrapper>
            <FieldWrapper label="Sort Order" helper="Lower = appears first">
              <TextInput
                value={String(form.sortOrder)}
                onChange={(v) => set("sortOrder", Number(v) || 99)}
                placeholder="1"
              />
            </FieldWrapper>
            <div className="flex items-center justify-between py-1">
              <span className="text-sm text-[#605b55]">Featured</span>
              <Toggle
                checked={form.featured}
                onChange={(v) => set("featured", v)}
              />
            </div>
            <div className="flex items-center justify-between py-1">
              <span className="text-sm text-[#605b55]">Grayscale in grid</span>
              <Toggle
                checked={form.grayscale}
                onChange={(v) => set("grayscale", v)}
              />
            </div>
          </div>

          {/* Grid display */}
          <div className="bg-white border border-[#e6e2db] p-5 space-y-4">
            <p className="text-xs uppercase tracking-widest text-[#1c1c18] font-semibold">Grid Display</p>
            <FieldWrapper label="Aspect Ratio">
              <Select
                value={form.aspectClass}
                onChange={(v) => set("aspectClass", v)}
                options={aspectOptions}
              />
            </FieldWrapper>
            <FieldWrapper label="Column Span">
              <Select
                value={form.spanClass}
                onChange={(v) => set("spanClass", v)}
                options={spanOptions}
              />
            </FieldWrapper>
          </div>

          {/* Next project */}
          <div className="bg-white border border-[#e6e2db] p-5 space-y-4">
            <p className="text-xs uppercase tracking-widest text-[#1c1c18] font-semibold">Navigation</p>
            <FieldWrapper label="Next Project Slug" helper="Slug of the next project to link to">
              <TextInput
                value={form.nextProjectSlug}
                onChange={(v) => set("nextProjectSlug", v)}
                placeholder="next-project-slug"
              />
            </FieldWrapper>
          </div>

          {/* Save action repeat */}
          <button
            type="submit"
            disabled={saving}
            className="w-full flex items-center justify-center gap-1.5 bg-[#745940] text-white text-xs uppercase tracking-widest font-medium px-5 py-3 hover:bg-[#8a6d4e] disabled:opacity-50 transition-colors"
          >
            {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
            {saving ? "Saving…" : "Save Project"}
          </button>
          <button
            type="button"
            onClick={() => onNavigate("portfolio")}
            className="w-full text-xs uppercase tracking-widest font-medium text-[#9a9590] border border-[#e6e2db] py-3 hover:bg-[#f7f3ec] transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
}
