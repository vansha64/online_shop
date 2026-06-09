import * as React from "react";
import { cn } from "@/lib/utils";

export function Badge({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn("inline-flex items-center rounded-full bg-lime-300 px-3 py-1 text-xs font-black text-zinc-950", className)}
      {...props}
    />
  );
}
