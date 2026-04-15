type StatusType = "published" | "draft" | "featured" | "beginner" | "advanced" | "private" | "group" | "custom";

const styles: Record<StatusType, string> = {
  published: "bg-green-50 text-green-700 border-green-200",
  draft: "bg-[#f7f3ec] text-[#9a9590] border-[#e6e2db]",
  featured: "bg-[#745940]/10 text-[#745940] border-[#745940]/20",
  beginner: "bg-blue-50 text-blue-700 border-blue-200",
  advanced: "bg-purple-50 text-purple-700 border-purple-200",
  private: "bg-amber-50 text-amber-700 border-amber-200",
  group: "bg-teal-50 text-teal-700 border-teal-200",
  custom: "bg-[#f7f3ec] text-[#605b55] border-[#e6e2db]",
};

const labels: Record<StatusType, string> = {
  published: "Published",
  draft: "Draft",
  featured: "Featured",
  beginner: "Beginner",
  advanced: "Advanced",
  private: "Private",
  group: "Group",
  custom: "Custom",
};

interface StatusBadgeProps {
  status: StatusType;
  className?: string;
}

export default function StatusBadge({ status, className = "" }: StatusBadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 text-[10px] uppercase tracking-widest font-semibold border ${styles[status]} ${className}`}
    >
      {labels[status]}
    </span>
  );
}
