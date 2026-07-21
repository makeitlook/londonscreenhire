"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";
import { cn } from "@/lib/utils";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

/**
 * Calendar - dark-themed DayPicker for the LSH quote form.
 * Uses react-day-picker v8 classNames API.
 */
export function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col",
        month: "space-y-3",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-sm font-semibold text-white",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          "h-7 w-7 flex items-center justify-center rounded-[3px]",
          "text-[var(--lsh-grey-400)] hover:bg-[var(--lsh-charcoal-light)]",
          "hover:text-white transition-colors"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell:
          "text-[var(--lsh-grey-500)] w-9 font-normal text-[0.725rem] text-center",
        row: "flex w-full mt-1",
        cell: "h-9 w-9 text-center text-sm p-0 relative",
        day: cn(
          "h-9 w-9 p-0 font-normal rounded-[3px] text-white",
          "hover:bg-[var(--lsh-charcoal-light)] transition-colors",
          "aria-selected:opacity-100"
        ),
        day_selected:
          "bg-lsh-blue text-white hover:bg-lsh-blue hover:text-white focus:bg-lsh-blue",
        day_today: "text-lsh-blue font-semibold",
        day_outside: "text-[var(--lsh-grey-500)] opacity-40",
        day_disabled:
          "text-[var(--lsh-grey-500)] opacity-30 cursor-not-allowed hover:bg-transparent",
        day_range_middle:
          "aria-selected:bg-[var(--lsh-charcoal-light)] aria-selected:text-white",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: () => <ChevronLeft className="h-4 w-4" />,
        IconRight: () => <ChevronRight className="h-4 w-4" />,
      }}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";
