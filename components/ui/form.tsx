import * as React from "react";
import { cn } from "@/lib/utils";

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={cn(
        "h-11 rounded-2xl border border-white/10 bg-zinc-950/70 px-4 text-sm text-zinc-50 outline-none transition focus:border-[#d6ad55]",
        props.className,
      )}
    />
  );
}

export function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={cn(
        "min-h-28 rounded-2xl border border-white/10 bg-zinc-950/70 px-4 py-3 text-sm text-zinc-50 outline-none transition focus:border-[#d6ad55]",
        props.className,
      )}
    />
  );
}

export function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      className={cn(
        "h-11 rounded-2xl border border-white/10 bg-zinc-950/70 px-4 text-sm text-zinc-50 outline-none transition focus:border-[#d6ad55]",
        props.className,
      )}
    />
  );
}
