import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold tracking-wide transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-glow-orange hover:shadow-[0_0_50px_hsl(25_95%_53%/0.5)] hover:-translate-y-0.5 hover:scale-[1.02]",
        destructive:
          "bg-destructive text-destructive-foreground shadow-glow-red hover:shadow-[0_0_50px_hsl(0_72%_51%/0.5)] hover:-translate-y-0.5 hover:scale-[1.02]",
        outline:
          "border border-primary/30 bg-transparent text-foreground backdrop-blur-sm hover:bg-primary/10 hover:border-primary/50 hover:-translate-y-0.5",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 hover:-translate-y-0.5",
        ghost:
          "text-foreground hover:bg-accent hover:text-accent-foreground",
        link:
          "text-primary underline-offset-4 hover:underline",
        premium:
          "relative overflow-hidden bg-gradient-to-r from-primary to-orange-400 text-primary-foreground shadow-glow-orange hover:shadow-[0_0_60px_hsl(25_95%_53%/0.6)] hover:-translate-y-1 hover:scale-[1.03] before:absolute before:inset-0 before:bg-gradient-to-r before:from-white/20 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity",
        "premium-red":
          "relative overflow-hidden bg-gradient-to-r from-destructive to-red-400 text-destructive-foreground shadow-glow-red hover:shadow-[0_0_60px_hsl(0_72%_51%/0.6)] hover:-translate-y-1 hover:scale-[1.03] before:absolute before:inset-0 before:bg-gradient-to-r before:from-white/20 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity",
        glass:
          "bg-white/5 backdrop-blur-md border border-white/10 text-foreground hover:border-white/20 hover:bg-white/10 hover:-translate-y-0.5",
        hero:
          "relative overflow-hidden bg-gradient-to-r from-primary via-orange-400 to-primary bg-[length:200%_100%] text-primary-foreground shadow-glow-orange hover:shadow-[0_0_80px_hsl(25_95%_53%/0.7)] hover:-translate-y-1 hover:scale-[1.03]",
      },
      size: {
        default: "h-11 px-6 py-2",
        sm: "h-9 rounded-lg px-4 text-xs",
        lg: "h-14 rounded-2xl px-10 text-base",
        xl: "h-16 rounded-2xl px-12 text-lg",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
