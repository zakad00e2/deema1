import { useRef } from "react";
import { Upload, X } from "lucide-react";

// ─── Language tab toggle ──────────────────────────────────────────────────────

interface LangTabsProps {
  activeLang: "en" | "ar";
  onChange: (lang: "en" | "ar") => void;
}

export function LangTabs({ activeLang, onChange }: LangTabsProps) {
  return (
    <div className="inline-flex border border-[#e6e2db] mb-4">
      {(["en", "ar"] as const).map((lang) => (
        <button
          key={lang}
          type="button"
          onClick={() => onChange(lang)}
          className={`px-4 py-1.5 text-xs uppercase tracking-widest font-medium transition-colors ${
            activeLang === lang
              ? "bg-[#745940] text-white"
              : "bg-[#fdf9f2] text-[#9a9590] hover:text-[#605b55]"
          }`}
        >
          {lang === "en" ? "English" : "العربية"}
        </button>
      ))}
    </div>
  );
}

// ─── Base field wrapper ───────────────────────────────────────────────────────

interface FieldWrapperProps {
  label: string;
  htmlFor?: string;
  required?: boolean;
  helper?: string;
  error?: string;
  children: React.ReactNode;
}

export function FieldWrapper({ label, htmlFor, required, helper, error, children }: FieldWrapperProps) {
  return (
    <div className="space-y-1.5">
      <label
        htmlFor={htmlFor}
        className="block text-xs uppercase tracking-widest text-[#605b55] font-semibold"
      >
        {label}
        {required && <span className="text-[#745940] ml-1">*</span>}
      </label>
      {children}
      {helper && !error && <p className="text-xs text-[#9a9590] font-sans">{helper}</p>}
      {error && <p className="text-xs text-red-500 font-sans">{error}</p>}
    </div>
  );
}

// ─── Text input ───────────────────────────────────────────────────────────────

interface TextInputProps {
  id?: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  dir?: "ltr" | "rtl" | "auto";
}

export function TextInput({ id, value, onChange, placeholder, required, disabled, className = "", dir }: TextInputProps) {
  return (
    <input
      id={id}
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      required={required}
      disabled={disabled}
      dir={dir}
      className={`w-full bg-white border border-[#e6e2db] text-[#1c1c18] text-sm font-sans px-3 py-2.5 placeholder-[#c5c0bb] focus:outline-none focus:border-[#745940] disabled:opacity-50 disabled:bg-[#f7f3ec] transition-colors ${className}`}
    />
  );
}

// ─── Textarea ─────────────────────────────────────────────────────────────────

interface TextareaProps {
  id?: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  rows?: number;
  required?: boolean;
  dir?: "ltr" | "rtl" | "auto";
}

export function Textarea({ id, value, onChange, placeholder, rows = 4, required, dir }: TextareaProps) {
  return (
    <textarea
      id={id}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
      required={required}
      dir={dir}
      className="w-full bg-white border border-[#e6e2db] text-[#1c1c18] text-sm font-sans px-3 py-2.5 placeholder-[#c5c0bb] focus:outline-none focus:border-[#745940] resize-y transition-colors"
    />
  );
}

// ─── Select ───────────────────────────────────────────────────────────────────

interface SelectOption { value: string; label: string }

interface SelectProps {
  id?: string;
  value: string;
  onChange: (v: string) => void;
  options: SelectOption[];
  placeholder?: string;
}

export function Select({ id, value, onChange, options, placeholder }: SelectProps) {
  return (
    <select
      id={id}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full bg-white border border-[#e6e2db] text-[#1c1c18] text-sm font-sans px-3 py-2.5 focus:outline-none focus:border-[#745940] transition-colors appearance-none cursor-pointer"
      style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='none' viewBox='0 0 24 24'%3E%3Cpath d='M6 9l6 6 6-6' stroke='%239a9590' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 10px center" }}
    >
      {placeholder && <option value="">{placeholder}</option>}
      {options.map((o) => (
        <option key={o.value} value={o.value}>{o.label}</option>
      ))}
    </select>
  );
}

// ─── Toggle ───────────────────────────────────────────────────────────────────

interface ToggleProps {
  id?: string;
  checked: boolean;
  onChange: (v: boolean) => void;
  label?: string;
}

export function Toggle({ id, checked, onChange, label }: ToggleProps) {
  return (
    <label htmlFor={id} className="flex items-center gap-3 cursor-pointer select-none group">
      <div
        onClick={() => onChange(!checked)}
        className={`relative w-10 h-5 transition-colors duration-200 ${checked ? "bg-[#745940]" : "bg-[#e6e2db]"}`}
      >
        <div
          className={`absolute top-0.5 w-4 h-4 bg-white shadow-sm transition-transform duration-200 ${checked ? "translate-x-5" : "translate-x-0.5"}`}
        />
      </div>
      {label && <span className="text-sm text-[#605b55] font-sans">{label}</span>}
    </label>
  );
}

// ─── Image uploader (single) ───────────────────────────────────────────────────

interface ImageUploaderProps {
  value: string; // base64 or URL
  onChange: (v: string) => void;
  label?: string;
  aspectRatio?: string; // e.g. "aspect-video", "aspect-square"
}

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export function ImageUploader({ value, onChange, label, aspectRatio = "aspect-video" }: ImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const b64 = await fileToBase64(file);
    onChange(b64);
    e.target.value = "";
  }

  return (
    <div className="space-y-2">
      {label && (
        <p className="text-xs uppercase tracking-widest text-[#605b55] font-semibold">{label}</p>
      )}
      <div
        className={`${aspectRatio} w-full border-2 border-dashed border-[#e6e2db] hover:border-[#745940] transition-colors cursor-pointer relative bg-[#f7f3ec] group overflow-hidden`}
        onClick={() => inputRef.current?.click()}
      >
        {value ? (
          <>
            <img src={value} alt="" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <span className="text-white text-xs uppercase tracking-widest font-medium">Replace Image</span>
            </div>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); onChange(""); }}
              className="absolute top-2 right-2 bg-white/90 hover:bg-white p-1 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X className="w-3.5 h-3.5 text-[#1c1c18]" />
            </button>
          </>
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-[#9a9590] group-hover:text-[#745940] transition-colors">
            <Upload className="w-6 h-6" />
            <span className="text-xs uppercase tracking-widest font-medium">Upload Image</span>
            <span className="text-[10px] text-[#c5c0bb]">JPG, PNG, WebP</span>
          </div>
        )}
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFile}
      />
    </div>
  );
}

// ─── Multi-image uploader ─────────────────────────────────────────────────────

interface MultiImageUploaderProps {
  values: string[];
  onChange: (v: string[]) => void;
  label?: string;
  max?: number;
}

export function MultiImageUploader({ values, onChange, label, max = 10 }: MultiImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFiles(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    const b64s = await Promise.all(files.map(fileToBase64));
    onChange([...values, ...b64s].slice(0, max));
    e.target.value = "";
  }

  function remove(idx: number) {
    onChange(values.filter((_, i) => i !== idx));
  }

  return (
    <div className="space-y-2">
      {label && (
        <p className="text-xs uppercase tracking-widest text-[#605b55] font-semibold">{label}</p>
      )}
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
        {values.map((src, idx) => (
          <div key={idx} className="relative aspect-square bg-[#f7f3ec] group overflow-hidden">
            <img src={src} alt="" className="w-full h-full object-cover" />
            <button
              type="button"
              onClick={() => remove(idx)}
              className="absolute top-1 right-1 bg-black/60 hover:bg-black p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X className="w-3 h-3 text-white" />
            </button>
          </div>
        ))}
        {values.length < max && (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="aspect-square bg-[#f7f3ec] border-2 border-dashed border-[#e6e2db] hover:border-[#745940] flex flex-col items-center justify-center gap-1 text-[#9a9590] hover:text-[#745940] transition-colors"
          >
            <Upload className="w-4 h-4" />
            <span className="text-[9px] uppercase tracking-widest">Add</span>
          </button>
        )}
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={handleFiles}
      />
    </div>
  );
}

// ─── String list editor ───────────────────────────────────────────────────────

interface StringListEditorProps {
  values: string[];
  onChange: (v: string[]) => void;
  placeholder?: string;
  dir?: "ltr" | "rtl";
  addLabel?: string;
}

export function StringListEditor({ values, onChange, placeholder, dir, addLabel = "Add Item" }: StringListEditorProps) {
  function update(idx: number, val: string) {
    const next = [...values];
    next[idx] = val;
    onChange(next);
  }
  function remove(idx: number) {
    onChange(values.filter((_, i) => i !== idx));
  }
  function add() {
    onChange([...values, ""]);
  }

  return (
    <div className="space-y-2">
      {values.map((v, idx) => (
        <div key={idx} className="flex items-center gap-2">
          <input
            type="text"
            value={v}
            onChange={(e) => update(idx, e.target.value)}
            placeholder={placeholder}
            dir={dir}
            className="flex-1 bg-white border border-[#e6e2db] text-[#1c1c18] text-sm font-sans px-3 py-2 placeholder-[#c5c0bb] focus:outline-none focus:border-[#745940] transition-colors"
          />
          <button
            type="button"
            onClick={() => remove(idx)}
            className="text-[#9a9590] hover:text-red-500 transition-colors p-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={add}
        className="text-xs uppercase tracking-widest text-[#745940] border border-dashed border-[#745940]/40 hover:border-[#745940] px-3 py-2 w-full transition-colors hover:bg-[#745940]/5"
      >
        + {addLabel}
      </button>
    </div>
  );
}

// ─── Section divider ──────────────────────────────────────────────────────────

interface SectionDividerProps {
  title: string;
  description?: string;
}

export function SectionDivider({ title, description }: SectionDividerProps) {
  return (
    <div className="pt-4 pb-2 border-t border-[#e6e2db]">
      <h3 className="text-xs uppercase tracking-[0.24em] font-semibold text-[#1c1c18]">{title}</h3>
      {description && <p className="text-xs text-[#9a9590] mt-1 font-sans">{description}</p>}
    </div>
  );
}
