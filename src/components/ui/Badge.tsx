import { cn } from "@/lib/utils";
import type { HTMLAttributes, ReactNode } from "react";

type Variant = "default" | "success" | "warning" | "danger" | "info" | "secondary" | "outline";

const variants: Record<Variant, string> = {
  default: "bg-slate-100 text-slate-700",
  success: "bg-emerald-100 text-emerald-800",
  warning: "bg-amber-100 text-amber-800",
  danger: "bg-red-100 text-red-800",
  info: "bg-blue-100 text-blue-800",
  secondary: "bg-slate-100 text-slate-800 hover:bg-slate-200",
  outline: "text-slate-900 border border-slate-200 hover:bg-slate-100",
};

export function Badge({
  variant = "default",
  className,
  children,
  ...rest
}: HTMLAttributes<HTMLSpanElement> & { variant?: Variant; children: ReactNode }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        variants[variant],
        className
      )}
      {...rest}
    >
      {children}
    </span>
  );
}
