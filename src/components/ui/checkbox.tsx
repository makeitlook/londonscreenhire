"use client";

import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      "peer h-[18px] w-[18px] shrink-0 rounded-[3px]",
      "border border-[var(--lsh-border-dark)] bg-[var(--lsh-charcoal-light)]",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lsh-blue",
      "focus-visible:ring-offset-1 focus-visible:ring-offset-[var(--lsh-charcoal)]",
      "disabled:cursor-not-allowed disabled:opacity-50",
      "data-[state=checked]:bg-lsh-blue data-[state=checked]:border-lsh-blue",
      "data-[state=checked]:text-white transition-colors",
      className
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator className="flex items-center justify-center text-current">
      <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
