import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-full border-2 border-transparent text-[15px] font-bold leading-5 transition-[background-color,border-color,color,box-shadow,transform,filter] duration-200 ease-out hover:-translate-y-px active:translate-y-0 disabled:pointer-events-none disabled:opacity-45 disabled:shadow-none [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        // Shield blue — navigation and discovery ("Shop now", "View products")
        default: "bg-primary text-primary-foreground hover:brightness-94",
        // Coral — conversion ("Add to cart", "Place order"); at most one per viewport
        cta: "bg-coral-strong text-on-coral hover:brightness-94",
        destructive:
          "bg-destructive text-white hover:brightness-94 focus-visible:ring-destructive dark:text-surface",
        // Outlined, sits beside a primary
        outline:
          "border-[1.5px] border-line-strong bg-surface-raised text-ink hover:border-ink",
        secondary:
          "bg-secondary text-secondary-foreground hover:brightness-97",
        ghost:
          "text-ink hover:translate-y-0 hover:bg-sky-soft hover:text-shield",
        link: "text-primary underline-offset-4 hover:translate-y-0 hover:underline",
      },
      size: {
        default: "h-12 px-5 has-[>svg]:px-4",
        sm: "h-10 gap-1.5 px-4 text-sm has-[>svg]:px-3.5",
        lg: "h-14 px-8 text-base has-[>svg]:px-6",
        icon: "size-11",
        "icon-sm": "size-10",
        "icon-lg": "size-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
