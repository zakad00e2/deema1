import { useState, useEffect } from "react";
import { workshopService } from "../data/workshopService";
import type { WorkshopItem, WorkshopType, PublishStatus } from "../data/types";
import type { AdminPage } from "../components/AdminLayout";
import {
  LangTabs,
  FieldWrapper,
  TextInput,
  Textarea,
  Select,
  Toggle,
  ImageUploader,
  StringListEditor,
  SectionDivider,
} from "../components/FormField";
import { toast } from "../components/Toast";
import { ArrowLeft, Save, Loader2 } from "lucide-react";

interface WorkshopFormPageProps {
  editId?: string;
  onNavigate: (page: AdminPage, id?: string) => void;
}

function slugify(str: string) {
  return str.toLowerCase().replace(/[^a-z0-9\s-]/g, "").trim().replace(/\s+/g, "-").replace(/-+/g, "-");
}

function newWorkshop(): Omit<WorkshopItem, "id" | "createdAt" | "updatedAt"> {
  return {
    slug: "",
    title: { en: "", ar: "" },
    shortSummary: { en: "", ar: "" },
    fullDescription: { en: "", ar: "" },
    coverImage: "",
    workshopType: "private",
    duration: { en: "", ar: "" },
    format: { en: "", ar: "" },
    whatYoullLearn: { en: [], ar: [] },
    dates: { en: "", ar: "" },
    ctaText: { en: "Enquire Now", ar: "استفسر الآن" },
    ctaLink: "/contact#contact-form",
    level: { en: "", ar: "" },
    featured: false,
    status: "draft",
    sortOrder: 99,
  };
}

export default function WorkshopFormPage({ editId, onNavigate }: WorkshopFormPageProps) {
  const isEditing = !!editId;
  const [lang, setLang] = useState<"en" | "ar">("en");
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(isEditing);
  const [loadError, setLoadError] = useState("");
  const [form, setForm] = useState<Omit<WorkshopItem, "id" | "createdAt" | "updatedAt">>(newWorkshop());

  useEffect(() => {
    if (!editId) return;

    let cancelled = false;

    async function load() {
      try {
        setLoading(true);
        setLoadError("");
        const existing = await workshopService.getById(editId);
        if (!existing) {
          throw new Error("Workshop not found.");
        }

        if (!cancelled) {
          const { id, createdAt, updatedAt, ...rest } = existing;
          setForm(rest);
        }
      } catch (err) {
        if (!cancelled) {
          setLoadError(err instanceof Error ? err.message : "Failed to load workshop.");
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

  useEffect(() => {
    if (!isEditing && form.title.en) {
      setForm((prev) => ({ ...prev, slug: slugify(prev.title.en) }));
    }
  }, [form.title.en, isEditing]);

  function set<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function setBilingual(key: "title" | "shortSummary" | "fullDescription" | "duration" | "format" | "dates" | "ctaText" | "level", value: string) {
    setForm((prev) => ({ ...prev, [key]: { ...(prev as any)[key], [lang]: value } }));
  }

  function setBilingualArray(key: "whatYoullLearn", value: string[]) {
    setForm((prev) => ({ ...prev, [key]: { ...(prev as any)[key], [lang]: value } }));
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!form.title.en.trim()) { toast.error("English title is required."); return; }
    if (!form.slug.trim()) { toast.error("Slug is required."); return; }
    setSaving(true);
    try {
      if (isEditing && editId) {
        await workshopService.update(editId, form);
        toast.success("Workshop updated successfully.");
      } else {
        await workshopService.create(form);
        toast.success("Workshop created successfully.");
      }
      onNavigate("workshops");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to save. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  const dirAttr = lang === "ar" ? "rtl" : "ltr";

  if (loading) {
    return <div className="text-sm text-[#9a9590]">Loading workshop...</div>;
  }

  if (loadError) {
    return <div className="border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{loadError}</div>;
  }

  const typeOptions: { value: WorkshopType; label: string }[] = [
    { value: "private", label: "Private" },
    { value: "group", label: "Group" },
    { value: "beginner", label: "Beginner" },
    { value: "advanced", label: "Advanced" },
    { value: "custom", label: "Custom" },
  ];

  const statusOptions = [
    { value: "draft", label: "Draft" },
    { value: "published", label: "Published" },
  ];

  return (
    <form onSubmit={handleSave} className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-3">
          <button type="button" onClick={() => onNavigate("workshops")} className="text-[#9a9590] hover:text-[#1c1c18] transition-colors">
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h2 className="text-base font-semibold text-[#1c1c18]">
              {isEditing ? `Edit: ${form.title.en || "Untitled"}` : "New Workshop"}
            </h2>
            <p className="text-xs text-[#9a9590] mt-0.5">Manage bilingual workshop content.</p>
          </div>
        </div>
        <button
          type="submit"
          disabled={saving}
          className="flex items-center gap-1.5 bg-[#745940] text-white text-xs uppercase tracking-widest font-medium px-5 py-2.5 hover:bg-[#8a6d4e] disabled:opacity-50 transition-colors"
        >
          {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
          {saving ? "Saving…" : "Save Workshop"}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main */}
        <div className="lg:col-span-2 space-y-6">

          {/* Language tabs */}
          <div className="bg-white border border-[#e6e2db] p-5">
            <p className="text-xs uppercase tracking-widest text-[#9a9590] mb-3 font-semibold">Content Language</p>
            <LangTabs activeLang={lang} onChange={setLang} />
          </div>

          {/* Basic Info */}
          <div className="bg-white border border-[#e6e2db] p-5 space-y-4">
            <SectionDivider title="Basic Information" />
            <FieldWrapper label="Title" required>
              <TextInput value={form.title[lang]} onChange={(v) => setBilingual("title", v)} placeholder={lang === "en" ? "Workshop title" : "عنوان ورشة العمل"} dir={dirAttr} />
            </FieldWrapper>
            <FieldWrapper label="Short Summary" required>
              <Textarea value={form.shortSummary[lang]} onChange={(v) => setBilingual("shortSummary", v)} placeholder={lang === "en" ? "Brief summary shown in cards" : "ملخص قصير يظهر في البطاقات"} rows={2} dir={dirAttr} />
            </FieldWrapper>
            <FieldWrapper label="Full Description">
              <Textarea value={form.fullDescription[lang]} onChange={(v) => setBilingual("fullDescription", v)} placeholder={lang === "en" ? "Full workshop description" : "وصف كامل لورشة العمل"} rows={5} dir={dirAttr} />
            </FieldWrapper>
            <FieldWrapper label="Level / Audience" helper="e.g. Beginners, Advanced, All levels">
              <TextInput value={form.level[lang]} onChange={(v) => setBilingual("level", v)} placeholder={lang === "en" ? "Beginners" : "المبتدئين"} dir={dirAttr} />
            </FieldWrapper>
          </div>

          {/* Logistics */}
          <div className="bg-white border border-[#e6e2db] p-5 space-y-4">
            <SectionDivider title="Logistics" />
            <div className="grid grid-cols-2 gap-4">
              <FieldWrapper label="Duration">
                <TextInput value={form.duration[lang]} onChange={(v) => setBilingual("duration", v)} placeholder={lang === "en" ? "3–4 hours" : "٣–٤ ساعات"} dir={dirAttr} />
              </FieldWrapper>
              <FieldWrapper label="Format">
                <TextInput value={form.format[lang]} onChange={(v) => setBilingual("format", v)} placeholder={lang === "en" ? "Group workshop" : "ورشة عمل جماعية"} dir={dirAttr} />
              </FieldWrapper>
            </div>
            <FieldWrapper label="Dates / Scheduling Text">
              <TextInput value={form.dates[lang]} onChange={(v) => setBilingual("dates", v)} placeholder={lang === "en" ? "Dates announced by Deema" : "يتم الإعلان عن المواعيد من قبل ديما"} dir={dirAttr} />
            </FieldWrapper>
          </div>

          {/* What you'll learn */}
          <div className="bg-white border border-[#e6e2db] p-5 space-y-4">
            <SectionDivider title="What Attendees Will Learn" />
            <StringListEditor
              values={form.whatYoullLearn[lang]}
              onChange={(v) => setBilingualArray("whatYoullLearn", v)}
              placeholder={lang === "en" ? "Learning point" : "نقطة تعلم"}
              dir={dirAttr}
              addLabel="Add Learning Point"
            />
          </div>

          {/* CTA */}
          <div className="bg-white border border-[#e6e2db] p-5 space-y-4">
            <SectionDivider title="Call to Action" />
            <FieldWrapper label="CTA Button Text">
              <TextInput value={form.ctaText[lang]} onChange={(v) => setBilingual("ctaText", v)} placeholder={lang === "en" ? "Enquire Now" : "استفسر الآن"} dir={dirAttr} />
            </FieldWrapper>
            <FieldWrapper label="CTA Link" helper="Link the button goes to">
              <TextInput value={form.ctaLink} onChange={(v) => set("ctaLink", v)} placeholder="/contact#contact-form" />
            </FieldWrapper>
          </div>

          {/* Cover Image */}
          <div className="bg-white border border-[#e6e2db] p-5">
            <SectionDivider title="Cover Image" />
            <div className="mt-4">
              <ImageUploader value={form.coverImage} onChange={(v) => set("coverImage", v)} aspectRatio="aspect-[4/3]" />
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <div className="bg-white border border-[#e6e2db] p-5 space-y-4">
            <p className="text-xs uppercase tracking-widest text-[#1c1c18] font-semibold">Settings</p>
            <FieldWrapper label="Status">
              <Select value={form.status} onChange={(v) => set("status", v as PublishStatus)} options={statusOptions} />
            </FieldWrapper>
            <FieldWrapper label="Type">
              <Select value={form.workshopType} onChange={(v) => set("workshopType", v as WorkshopType)} options={typeOptions} />
            </FieldWrapper>
            <FieldWrapper label="Slug" required helper="Auto-generated from title">
              <TextInput value={form.slug} onChange={(v) => set("slug", slugify(v))} placeholder="workshop-slug" />
            </FieldWrapper>
            <FieldWrapper label="Sort Order" helper="Lower = appears first">
              <TextInput value={String(form.sortOrder)} onChange={(v) => set("sortOrder", Number(v) || 99)} placeholder="1" />
            </FieldWrapper>
            <div className="flex items-center justify-between py-1">
              <span className="text-sm text-[#605b55]">Featured</span>
              <Toggle checked={form.featured} onChange={(v) => set("featured", v)} />
            </div>
          </div>

          <button
            type="submit"
            disabled={saving}
            className="w-full flex items-center justify-center gap-1.5 bg-[#745940] text-white text-xs uppercase tracking-widest font-medium px-5 py-3 hover:bg-[#8a6d4e] disabled:opacity-50 transition-colors"
          >
            {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
            Save Workshop
          </button>
          <button
            type="button"
            onClick={() => onNavigate("workshops")}
            className="w-full text-xs uppercase tracking-widest font-medium text-[#9a9590] border border-[#e6e2db] py-3 hover:bg-[#f7f3ec] transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
}
