import * as React from "react"

import { cn } from "@/lib/utils"

function Badge({
  className,
  variant = "default",
  ...props
}: React.ComponentProps<"span"> & { variant?: "default" | "secondary" | "outline" | "success" | "warning" | "destructive" }) {
  return (
    <span
      data-slot="badge"
      className={cn(
        "inline-flex w-fit shrink-0 items-center justify-center gap-1 rounded-md px-2 py-0.5 text-xs font-medium whitespace-nowrap transition-colors [&>svg]:size-3 [&>svg]:shrink-0",
        variant === "default" &&
          "bg-brand-primary text-white",
        variant === "secondary" &&
          "bg-secondary text-secondary-foreground",
        variant === "outline" &&
          "border border-border bg-transparent text-foreground",
        variant === "success" &&
          "bg-emerald-100 text-emerald-800",
        variant === "warning" &&
          "bg-amber-100 text-amber-800",
        variant === "destructive" &&
          "bg-destructive/10 text-destructive",
        className
      )}
      {...props}
    />
  )
}

export { Badge }
