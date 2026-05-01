import type { ReactNode } from "react";

type Variant = "default" | "accent" | "muted" | "warning" | "outline" | "onImage";

const variants: Record<Variant, string> = {
  default: "bg-pine-100 text-pine-800",
  accent: "bg-pine-700 text-white",
  muted: "bg-stone-100 text-stone-700",
  warning: "bg-amber-100 text-amber-900",
  outline: "border border-pine-200 bg-white text-pine-800",
  onImage: "bg-black/55 text-white backdrop-blur-[2px]",
};

export function Badge({
  children,
  variant = "default",
  className = "",
}: {
  children: ReactNode;
  variant?: Variant;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
