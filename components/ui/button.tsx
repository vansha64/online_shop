import * as React from "react";
import { cn } from "@/lib/utils";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "secondary" | "ghost" | "outline";
  size?: "sm" | "default" | "lg" | "icon";
};

export function Button({ className, variant = "default", size = "default", ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-full font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 disabled:pointer-events-none disabled:opacity-50",
        variant === "default" && "bg-emerald-300 text-zinc-950 hover:bg-lime-300",
        variant === "secondary" && "bg-zinc-800 text-zinc-50 hover:bg-zinc-700",
        variant === "ghost" && "bg-transparent text-zinc-100 hover:bg-white/10",
        variant === "outline" && "border border-white/15 bg-white/5 text-zinc-50 hover:bg-white/10",
        size === "sm" && "h-9 px-4 text-sm",
        size === "default" && "h-11 px-5",
        size === "lg" && "h-12 px-7",
        size === "icon" && "h-11 w-11",
        className,
      )}
      {...props}
    />
  );
}
