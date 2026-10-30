import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const textVariants = cva("", {
  variants: {
    variant: {
      h1: "font-heading text-4xl font-bold tracking-tight lg:text-5xl",
      h2: "font-heading text-3xl font-semibold tracking-tight",
      h3: "font-heading text-2xl font-semibold tracking-tight",
      h4: "font-heading text-xl font-semibold tracking-tight",
      p: "text-base leading-7",
      lead: "text-xl text-muted-foreground",
      muted: "text-sm text-muted-foreground",
      small: "text-xs font-medium leading-none",
      code: "rounded bg-muted px-1.5 py-0.5 font-mono text-sm",
    },
  },
  defaultVariants: { variant: "p" },
})

type TextProps = React.ComponentProps<"p"> & VariantProps<typeof textVariants>

function Text({ className, variant, ...props }: TextProps) {
  return <p className={cn(textVariants({ variant }), className)} {...props} />
}

export { Text, textVariants }
export type { TextProps }