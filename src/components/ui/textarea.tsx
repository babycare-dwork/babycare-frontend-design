import * as React from "react"

import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "border-input placeholder:text-muted-foreground focus-visible:border-ring aria-invalid:border-destructive aria-invalid:focus-visible:ring-destructive flex field-sizing-content min-h-24 w-full rounded-md border-[1.5px] bg-card px-5 py-3 text-base text-ink transition-[color,border-color,box-shadow] duration-150 ease-out outline-none hover:border-ink-muted focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-45",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
