"use client";

import * as React from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export function Dialog({
  open,
  onOpenChange,
  children,
  className,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
  className?: string;
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/70 p-4 backdrop-blur-md" onClick={() => onOpenChange(false)}>
      <div className={cn("relative max-h-[90vh] w-full max-w-4xl overflow-auto rounded-3xl border border-white/10 bg-zinc-950 shadow-2xl", className)} onClick={(event) => event.stopPropagation()}>
        <button className="absolute right-4 top-4 z-10 rounded-full border border-white/10 bg-white/10 p-2" onClick={() => onOpenChange(false)} aria-label="Close dialog">
          <X size={18} />
        </button>
        {children}
      </div>
    </div>
  );
}
