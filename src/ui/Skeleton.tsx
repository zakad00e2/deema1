type SkeletonBlockProps = {
  className?: string;
};

type SkeletonLinesProps = {
  widths: string[];
  className?: string;
  lineClassName?: string;
};

export function SkeletonBlock({ className = "" }: SkeletonBlockProps) {
  return <div aria-hidden="true" className={`skeleton-shimmer ${className}`} />;
}

export function SkeletonLines({
  widths,
  className = "",
  lineClassName = "h-4 rounded-full",
}: SkeletonLinesProps) {
  return (
    <div aria-hidden="true" className={`flex flex-col gap-3 ${className}`}>
      {widths.map((width, index) => (
        <SkeletonBlock
          key={`${width}-${index}`}
          className={`${lineClassName} ${width}`}
        />
      ))}
    </div>
  );
}
