import * as React from "react"

import { cn } from "@/lib/utils"
import { Info, CircleCheck, TriangleAlert, CircleX } from "lucide-react"

const alertVariants = {
  default: "border-border text-foreground",
  info: "border-sky-300 bg-sky-50 text-sky-900",
  success: "border-emerald-300 bg-emerald-50 text-emerald-900",
  warning: "border-amber-300 bg-amber-50 text-amber-900",
  destructive: "border-red-300 bg-red-50 text-red-900",
}

const icons = {
  default: Info,
  info: Info,
  success: CircleCheck,
  warning: TriangleAlert,
  destructive: CircleX,
}

function Alert({
  className,
  variant = "default",
  ...props
}: React.ComponentProps<"div"> & { variant?: keyof typeof alertVariants }) {
  const Icon = icons[variant]
  return (
    <div
      data-slot="alert"
      role="alert"
      className={cn(
        "relative flex w-full items-start gap-3 rounded-xs border p-4 text-sm",
        alertVariants[variant],
        className
      )}
      {...props}
    >
      <Icon className="mt-0.5 size-4 shrink-0" />
      <div className="flex-1">{props.children}</div>
    </div>
  )
}

function AlertTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-title"
      className={cn("font-medium leading-5", className)}
      {...props}
    />
  )
}

function AlertDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-description"
      className={cn("mt-1 text-sm opacity-90", className)}
      {...props}
    />
  )
}

export { Alert, AlertTitle, AlertDescription }
